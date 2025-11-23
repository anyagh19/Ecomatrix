// socket/server.js
import { createServer } from "http";
import SocketService from './socketService.js'


// const httpServer = createServer();

// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// httpServer.listen(4001, () => {
//   console.log("Socket server running on port 4001");
// });


async function init() {
    const socketService = new SocketService()
    const httpserver = createServer();
    const port = process.env.PORT || 8000;

    socketService.io.attach(httpserver)

    httpserver.listen(port, () => {
        console.log(`server port is ${port}`);
    });

    socketService.initListener()
}
init()