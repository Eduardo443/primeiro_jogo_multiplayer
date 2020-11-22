export default function createKetboardListener(document) {
    const state = {
      observers: [],
      playerId: null
    }

    function registerPlayerId(playerId){
      state.playerId = playerId
    }

    function subscribe(observerFunction) {
      state.observers.push(observerFunction);
    }

    function notifyAll(command) {
      for (const observersFunction of state.observers) {
        observersFunction(command);
      }
    }

    document.addEventListener("keydown", handleKeydown)

    function handleKeydown(event) {
      const keyPressed = event.key

      const command = {
        type: 'move-player',
        playerId: state.playerId,
        keyPressed,
      };

      notifyAll(command);
    }

    return {
      subscribe,
      registerPlayerId
    }
}
