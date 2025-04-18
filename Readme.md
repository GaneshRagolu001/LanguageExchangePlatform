---

```markdown
# 🌍 Language Exchange Platform

A full-featured language exchange web application that connects people worldwide to practice and improve their language skills through real-time chat and intelligent matching.

---

## 🚀 Features

- 🔐 **Authentication** using PHP & JWT
- 👤 **User Profiles** with customization (bio, profile picture, age, gender, etc.)
- 🌐 **Language Proficiency Tracking** (native/learning with levels)
- 🤝 **Smart Matching Algorithm** based on languages and proficiency
- 💬 **Real-Time Chat** using PHP WebSockets (Ratchet)
- 💾 **Persistent Chat History** stored using PDO
- 🎨 **Responsive Frontend** built with React and Tailwind CSS
- ✅ RESTful APIs for frontend-backend communication

---

## 🛠️ Tech Stack

| Frontend     | Backend       | Real-Time         | Database |
| ------------ | ------------- | ----------------- | -------- |
| React.js     | PHP (Vanilla) | Ratchet WebSocket | MySQL    |
| Tailwind CSS | JWT Auth      |                   | PDO      |

---

## 🧩 Database Schema

### Exported SQL File

All tables are included in the `database/language_exchange.sql` file.

### Tables Used

1. **users** – stores user accounts
2. **profiles** – extended profile info
3. **languages** – list of supported languages
4. **user_languages** – tracks what each user knows/learns
5. **matches** – stores matched users
6. **messages** – real-time and stored chat messages
7. **refresh_tokens** (optional) – for JWT refresh flow

---

## 🧪 Setup Instructions

### ✅ Backend Setup (PHP)

1. Install XAMPP (or any PHP + MySQL stack)
2. Clone this repo and copy the backend files to your XAMPP `htdocs` folder:

```

C:\xampp\htdocs\language-exchange

```

3. Start Apache and MySQL via XAMPP Control Panel
4. Open `http://localhost/phpmyadmin`
5. Create a new database: `language_exchange`
6. Import the SQL file:

- Go to **Import**
- Choose `database/language_exchange.sql`
- Click **Go**

> ✅ Done! Your backend and DB are ready.

---

### ✅ Frontend Setup (React + Tailwind CSS)

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev  # or npm start
   ```

> You should now be able to access the frontend at `http://localhost:5173` or similar.

---

### 🔌 Start WebSocket Server

To enable real-time messaging, start the Ratchet WebSocket server:

```bash
php websocket-server.php
```

Make sure it's running and accessible to the frontend via `ws://localhost:8080` (or your configured port).

---

## 🗃 Project Structure

```
language-exchange/
├── backend/
│   ├── auth/
│   ├── controllers/
│   ├── websocket-server.php
│   └── ...
├── frontend/
│   ├── src/
│   └── ...
├── database/
│   └── language_exchange.sql
├── README.md
```

---

## 👥 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📧 Contact

Built by **Your Name**  
📬 your@email.com

---

```

```
