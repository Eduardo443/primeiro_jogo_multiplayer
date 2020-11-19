export default function createKetboardListener(document) {
    const state = {
      observers: [],
    };

    function subscribe(observerFunction) {
      state.observers.push(observerFunction);
    }

    function notifyAll(command) {
      console.log(`KeyBoardListener => Notiflying ${state.observers.length} observers`);

      for (const observersFunction of state.observers) {
        observersFunction(command);
      }
    }

    document.addEventListener("keydown", handleKeydown);

    function handleKeydown(event) {
      const keyPressed = event.key;

      const command = {
        playerId: "player1",
        keyPressed,
      };

      notifyAll(command);
    }

    return {
      subscribe,
    };
}
