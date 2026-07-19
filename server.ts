import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface DevoteeMessage {
  id: string;
  name: string;
  email: string;
  category: 'devotee' | 'partner';
  subcategory?: string;
  message: string;
  videoUrl?: string;
  timestamp: string;
  read: boolean;
}

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

// Ensure data directory and messages file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
}

// Middleware
app.use(express.json());

// Helper to read messages from disk
function readMessages(): DevoteeMessage[] {
  try {
    const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading messages:", err);
    return [];
  }
}

// Helper to write messages to disk
function writeMessages(messages: DevoteeMessage[]) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error("Error writing messages:", err);
  }
}

// API Routes
// 1. Get all messages
app.get("/api/messages", (req, res) => {
  const messages = readMessages();
  res.json(messages);
});

// 2. Submit a message
app.post("/api/messages", (req, res) => {
  const { name, email, category, subcategory, message, videoUrl } = req.body;

  if (!name || !email || !category || !message) {
    res.status(400).json({ error: "Missing required fields: name, email, category, and message are required." });
    return;
  }

  const messages = readMessages();
  const newMessage: DevoteeMessage = {
    id: Math.random().toString(36).substring(2, 11),
    name,
    email,
    category,
    subcategory,
    message,
    videoUrl: videoUrl || "",
    timestamp: new Date().toISOString(),
    read: false
  };

  messages.unshift(newMessage); // Add new message to the top
  writeMessages(messages);

  res.status(201).json({ success: true, message: newMessage });
});

// 3. Mark a message as read
app.post("/api/messages/:id/read", (req, res) => {
  const { id } = req.params;
  const messages = readMessages();
  const index = messages.findIndex(m => m.id === id);

  if (index !== -1) {
    messages[index].read = true;
    writeMessages(messages);
    res.json({ success: true, message: messages[index] });
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

// 4. Delete a message
app.delete("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const messages = readMessages();
  const filtered = messages.filter(m => m.id !== id);

  if (messages.length !== filtered.length) {
    writeMessages(filtered);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

// 5. Proxy Cloudinary image to bypass iframe sandboxing & referrer restrictions
app.get("/api/proxy-logo", async (req, res) => {
  try {
    const imageUrl = "https://res.cloudinary.com/dkc9ru68y/image/upload/v1784473606/1000106994_o3kgkw.png";
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day
    res.send(buffer);
  } catch (err) {
    console.error("Error proxying logo image:", err);
    res.status(500).send("Error loading image");
  }
});

app.get("/api/proxy-lord-image", async (req, res) => {
  try {
    const imageUrl = "https://res.cloudinary.com/dkc9ru68y/image/upload/v1784473045/31abb20452ad3ab0f1c4a0b0b89c085e_ymbbh4.jpg";
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day
    res.send(buffer);
  } catch (err) {
    console.error("Error proxying Lord image:", err);
    res.status(500).send("Error loading image");
  }
});

async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} (http://localhost:${PORT})`);
  });
}

setupVite();
