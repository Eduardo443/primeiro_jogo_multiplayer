export default function createGame() {
    const state = {
      players: {},
      fruits: {},
      screen:{
          height: 10,
          width: 10
      }
    };

    function addPlayer(command){
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY
        
        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command){
        const playerId = command.playerId
        delete state.players[playerId]
    }


    function addfruit(command){
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY
        
        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removefruit(command){
        const fruitId = command.fruitId
        delete state.fruits[fruitId]
    }


    function movePlayer(command) {
      console.log(`game.movePlayer() => moving ${command.playerId} with ${command.keyPressed}`);

      const acceptedMoves = {
        ArrowUp(player){
            console.log('moving player Up')
            if (player.x - 1 >= 0) {
                player.y -= 1;
            }
        },
        ArrowDown(player){
            console.log('moving player Down')
            if (player.x + 1 < state.screen.width) {
                player.y += 1;
            }
        },
        ArrowRight(player){
            console.log('moving player Right')
            if (player.y + 1 < state.screen.width) {
                player.x += 1;
            }
        },
        ArrowLeft(player){
            console.log('moving player Left')
            if (player.x - 1 >= 0) {
                player.x -= 1;
            }
        }
      }

      const keyPressed = command.keyPressed;
      const playerId = command.playerId
      const player = state.players[playerId];
      const moveFunction = acceptedMoves[keyPressed]

      if (player && moveFunction){
        moveFunction(player)
        checkForfruitCollision(playerId)
      }
    }

    function checkForfruitCollision(playerId) {
        const player = state.players[playerId]

        for(const fruitId in state.fruits){
            const fruit = state.fruits[fruitId]
            console.log(`checking ${playerId} and ${fruitId}`)

            if(player.x === fruit.x && player.y === fruit.y){
                console.log('collision')
                removefruit({fruitId})
            }
        }
    }

    return {
      movePlayer,
      addPlayer,
      removePlayer,
      addfruit,
      removefruit,
      state
    }
}