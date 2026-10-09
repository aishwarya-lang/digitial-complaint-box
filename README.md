# College Digital Complaint Box - Enterprise Web Application

A full-stack, enterprise-grade Digital Complaint Management Portal built for colleges with role-based access control, real-time WebSockets notifications, 24-hour SLA auto-escalation engine, live in-app chat, AI category suggestions, duplicate complaint detection, analytics, and glassmorphic UI.

---

## 🌟 Key Features

1. **4 User Roles & Custom Portals**:
   - 🎓 **Student**: Submit complaints with AI auto-categorization, duplicate warnings, anonymous toggle, PDF receipt download, and live tracking timeline.
   - 🏫 **Department Staff**: Department-filtered inbox, workflow status management, staff assignment, resolution proof upload.
   - 🏛️ **Principal**: High-level KPI metrics, SLA escalation alert center, graphical charts (Recharts), supervisor chat view, PDF & Excel exports.
   - ⚙️ **Admin**: User account CRUD & block controls, Department CRUD, Category manager, Audit logs, Database JSON backups.

2. **⚡ Automated 24-Hour SLA Escalation Engine**:
   - Automatically tracks the age of open complaints.
   - If no first response/acknowledgment occurs within 24 hours, the complaint status updates to `ESCALATED`, highlighted with red glowing alerts, and sends real-time alerts to the Principal.
   - Includes a **One-Click Demo SLA Trigger** button in the Department Staff dashboard for instant testing.

3. **💬 Real-Time WebSockets Notifications & Live In-App Chat**:
   - Instant broadcast of new complaints, status changes, SLA escalations, and chat messages.
   - Direct messaging thread for each complaint between Student and Department Staff, with a read-only supervisor monitoring mode for the Principal.

4. **🤖 AI & Utility Features**:
   - **AI Auto-Category Suggestion**: Keyword matching engine that suggests complaint categories as students type.
   - **Duplicate Detection**: Identifies matching active complaints to prevent spam.
   - **PDF Receipt & Excel Export**: Instant client-side generation using `jsPDF` and `xlsx`.

---

## 🔑 Quick Demo Login Credentials

The server automatically seeds pre-configured demo accounts:

| Role | Username / Reg No | Password | Access / Department |
| :--- | :--- | :--- | :--- |
| **Student** | `STU1001` | `password123` | Computer Science |
| **Department Staff** | `STAFF_CS` | `password123` | Computer Science Dept Inbox |
| **Department Staff** | `STAFF_MECH` | `password123` | Mechanical Dept Inbox |
| **Principal** | `PRINCIPAL` | `password123` | Executive Analytics & SLA Monitor |
| **Admin** | `ADMIN` | `password123` | System Control & User Management |

---

## 🚀 How to Run Locally

### 1. Start the Backend Server (Express + WebSockets on Port 5000)
```bash
cd server
npm start
```

### 2. Start the Frontend Client (Vite + React on Port 3000)
```bash
cd client
npm run dev
```

Open your browser at `http://localhost:3000` to access the application!
