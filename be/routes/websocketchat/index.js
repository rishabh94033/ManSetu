// backend/websocketServer.js
import { WebSocketServer } from "ws"

import url from "url"

const wss = new WebSocketServer({ port: 8080 })
const rooms = {} // { roomId: [clients...] }

wss.on("connection", (ws, req) => {
  const { query } = url.parse(req.url, true)
  const roomId = query.roomId
  const userId = query.userId

  if (!roomId || !userId) {
    ws.close()
    return
  }

  if (!rooms[roomId]) rooms[roomId] = []
  rooms[roomId].push({ ws, userId })

  console.log(`✅ User ${userId} joined room ${roomId}`)

  ws.on("message", (msg) => {
    const data = JSON.parse(msg)
    console.log(`📩 Message from ${userId}:`, data.text)

    // Broadcast to everyone in the same room
    rooms[roomId].forEach((client) => {
      if (client.ws.readyState === ws.OPEN) {
        client.ws.send(
          JSON.stringify({
            senderId: userId,
            text: data.text,
            timestamp: Date.now(),
          })
        )
      }
    })
  })

  ws.on("close", () => {
    rooms[roomId] = rooms[roomId].filter((client) => client.ws !== ws)
    console.log(`❌ User ${userId} left room ${roomId}`)
  })
})

console.log("🚀 WebSocket server running on ws://localhost:8080")