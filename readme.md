# 💬 FullStack Chat App

A **real-time chat application** built with the MERN stack and powered by **Socket.IO** for live messaging. Clean, modern UI with theme customization, authentication, and user presence indicators — all in one place.

---

## 🚀 Features

- 🧑‍💬 Real-time 1-to-1 chat with Socket.IO
- 🔒 JWT-based authentication
- 🌸 Theme switcher (DaisyUI + Zustand)
- 💡 Online/offline presence status
- 🖼️ Image attachments in chat
- 🌈 Responsive design
- 🧠 Zustand for state management
- ⚙️ Clean folder structure with reusable components

---

## 🛠️ Tech Stack

### Frontend
- React + Vite ⚡
- TailwindCSS + DaisyUI 💅
- Zustand (state management)
- Axios

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.IO for real-time communication
- bcrypt + JWT for authentication

---

## 📸 UI Preview

| Login / Signup | Chat Interface | Settings |
|----------------|----------------|----------|
| ![Login](https://asset.cloudinary.com/dak8vdcux/edbeee6301d129d3ec76dc7a73a09912) | ![Chat](https://asset.cloudinary.com/dak8vdcux/dc702f2d9eb67c0a923e13a5c68af6e8) | ![Theme](https://asset.cloudinary.com/dak8vdcux/229dc633fab9fd1b317d65d85693b3fa) |

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/NeerajSh-16/fullstack-chat-app.git
cd fullstack-chat-app
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env # and update MongoDB URI + JWT_SECRET
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables

Backend `.env`:

```
PORT=5001
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

Frontend `.env`:

```
VITE_API_BASE_URL=http://localhost:5001/api
```

---

## 📦 Seeding the Database

You can seed the DB with dummy users using:

```bash
node src/seeds/user.seeds.js
```

---

## 🏛️ Socket.IO Architecture

```text
Frontend (React) --- emits/messages ---> Socket.IO (Server) --- broadcasts/messages ---> Other clients
                        ^                                                |
                        |------------------------------------------------|
```

- On login, each user establishes a socket connection
- Messages are emitted to server via `socket.emit('sendMessage', {...})`
- Server listens and rebroadcasts to target user via `socket.to(id).emit(...)`

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

---

## 📜 License

MIT © [Neeraj Sharma](https://github.com/NeerajSh-16)

---

## 💬 Contact

- Twitter: [@zhestoki.y](https://twitter.com/zhestoki.y)
- LinkedIn: [linkedin.com/in/neerajsh](https://linkedin.com/in/neerajsh)

---

### ⭐ If you like this project, don’t forget to give it a star on GitHub!

