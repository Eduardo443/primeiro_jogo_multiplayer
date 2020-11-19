import express from "express"
import http from "http"
import createGame from "./public/game.js"
import io from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = io(server)

app.use(express.static('public'))

//test adding player manualy
const game = createGame()
game.addfruit({fruitId: 'fruit1', fruitX: 1, fruitY: 0})
game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0})
game.addfruit({fruitId: 'fruit2', fruitX: 8, fruitY: 8})
game.addPlayer({playerId: 'player2', playerX: 6, playerY: 5})
 // end -------------------

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`Player connected on Server With Id: ${playerId}`)

    socket.emit('setup', game.state)
})

server.listen(8080, () => {
    console.log('Server listening for the 8080 port')
}) 