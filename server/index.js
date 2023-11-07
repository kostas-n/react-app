const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
	cors: {
		origin: "http://localhost:3000"
	}
});

app.use(cors())

socketIO.on('connection', (socket) => {
	socket.on("NEW_REPLY", data => {
		socket.broadcast.emit("NEW_REPLY_POSTED", data);
		console.log("New reply broadcast");
	})
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});