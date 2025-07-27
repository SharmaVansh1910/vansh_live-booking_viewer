# Live Bookings Viewer

A real-time **Live Bookings Viewer** built as part of a full-stack development challenge.  
It demonstrates **real-time updates** using **Node.js, Express.js, and Socket.IO** with a simple frontend.

---

## 🚀 Features
- Real-time booking updates (auto-generated every 5 seconds).
- Instant display of new bookings without page reloads.
- In-memory storage of bookings on the server.
- Simple and clean UI.

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js, Socket.IO  
- **Frontend:** HTML, CSS, JavaScript  
- **Database:** In-memory array (no external DB required)

---

## 📂 Project Structure
```
live-bookings-viewer/
├── server.js        # Backend server with Socket.IO
├── public/
│   ├── index.html   # Frontend HTML
│   ├── style.css    # Styling
│   └── script.js    # Client-side JS (handles real-time updates)
├── package.json     # Dependencies and scripts
└── README.md        # Project documentation
```

---

## 🔧 Setup & Usage

### 1. Clone the Repository
```bash
git clone <your-repo-link>
cd live-bookings-viewer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

### 4. Open the App
In your browser, navigate to:
```
http://localhost:3000
```

You’ll see a **Live Bookings Viewer** page.  
Every 5 seconds, a new booking will appear at the top of the list in real-time.

---

## 📸 Demo Preview
- **Bookings List:** Displays venue name, party size, and booking time.
- **Real-Time Updates:** New bookings automatically appear without refresh.

---

## 🤝 Notes
- No external database needed , data is stored in memory during server runtime.
- For deployment, host the backend on any Node-compatible server (e.g., Vercel, Heroku, or Render).

---

### Author
**Vansh Sharma**  
*Full Stack Developer*
