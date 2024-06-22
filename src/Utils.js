export function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function convertFromMiliseconds(time) {
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const seconds = Math.floor(time / 1000) % 60;

  return { minutes, seconds };
}

export function Timer(initialStartTime, dispatch, intervalRef, timerType) {
  let timer = initialStartTime;
  //clear any previous interval
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  intervalRef.current = setInterval(() => {
    timer -= 1000;
    const { minutes, seconds } = convertFromMiliseconds(timer);

    if (timerType === "game") {
      dispatch({ type: "SET_GAME_TIMER", payload: timer });
    } else if (timerType === "question") {
      dispatch({ type: "SET_QUESTION_TIMER", payload: timer });
    }

    dispatch({
      type: "SET_DISPLAY_MINUTES",
      payload: { minutes, timerType }
    });
    dispatch({
      type: "SET_DISPLAY_SECONDS",
      payload: { seconds, timerType }
    });
    //clear interval when the time reach 0
    if (timer === 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      dispatch({ type: "SET_QUESTION_TIME", payload: false });
      return;
    }
    //return the new gameTime as an update state
    return timer;
  }, 1000);
}
