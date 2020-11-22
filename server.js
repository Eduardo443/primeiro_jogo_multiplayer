import express from "express"
import http from "http"
import createGame from "./public/game.js"
import io from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = io(server)

app.use(express.static('public'))

const game = createGame()
game.start()

game.subscribe((command) => {
    console.log(`Emitting ${command.type}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`Player connected on Server With Id: ${playerId}`)

    game.addPlayer({playerId: playerId})
    // console.log(game.state)

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId: playerId})
        console.log(`player desconnected: ${playerId}`)
    })

    sockets.on('move-player', command => {
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })
})

server.listen(8080, () => {
    console.log('Server listening for the 8080 port')
}) 