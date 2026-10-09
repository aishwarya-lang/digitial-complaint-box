const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { checkAndEscalateSLAs } = require('./services/slaService');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const deptRoutes = require('./routes/deptRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const server = http.createServer(app);

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });
const connectedClients = new Set();

wss.on('connection', (ws) => {
  connectedClients.add(ws);
  console.log('[WebSocket] Client connected. Active clients:', connectedClients.size);

  ws.on('close', () => {
    connectedClients.delete(ws);
    console.log('[WebSocket] Client disconnected. Active clients:', connectedClients.size);
  });
});

// Broadcast helper for real-time alerts
function broadcast(data) {
  const payload = JSON.stringify(data);
  connectedClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

// Attach broadcast helper to express app
app.set('broadcast', broadcast);

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/departments', deptRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root route status page to prevent "Cannot GET /" errors
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Digital Complaint Box API Server</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
          .card { background: #1e293b; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 600px; width: 100%; border: 1px solid #334155; }
          h1 { color: #6366f1; margin-top: 0; font-size: 1.8rem; }
          .badge { background: #10b981; color: #fff; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 0.8rem; }
          a { color: #818cf8; text-decoration: none; font-weight: 600; }
          a:hover { text-decoration: underline; }
          ul { background: #0f172a; padding: 16px 24px; border-radius: 10px; list-style: none; margin: 20px 0; }
          li { margin: 8px 0; font-family: monospace; font-size: 0.95rem; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🚀 Campus Voice API Server</h1>
          <p><span class="badge">ONLINE</span> Express REST & WebSocket Server is active on port 5000.</p>
          <p>Please open the frontend application in your browser at:</p>
          <p style="font-size: 1.2rem; font-weight: bold; background: #334155; padding: 12px; border-radius: 8px; text-align: center;">
            👉 <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>
          </p>
          <h3>Available API Endpoints:</h3>
          <ul>
            <li>✅ GET <a href="/api/health">/api/health</a></li>
            <li>✅ GET <a href="/api/departments">/api/departments</a></li>
            <li>✅ GET <a href="/api/analytics">/api/analytics</a></li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'Digital Complaint Box Enterprise API',
    timestamp: new Date().toISOString(),
    clientsConnected: connectedClients.size
  });
});

// Periodic 24-Hour SLA Check Job (runs every 60 seconds)
setInterval(() => {
  try {
    checkAndEscalateSLAs(broadcast);
  } catch (err) {
    console.error('Error running background SLA check:', err);
  }
}, 60000);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Digital Complaint Box Server live on port ${PORT}`);
  console.log(`📡 WebSockets listening for real-time complaint updates`);
  console.log(`=======================================================`);
});
