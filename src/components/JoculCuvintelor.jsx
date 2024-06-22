import { useEffect, useRef } from "react";
import { useGameContext } from "../stateManagement";
import { useTranslation } from "react-i18next";
import { Timer, shuffleArray } from "../Utils";
import Swal from "sweetalert2";
import { swalSuccess, swalFinishGame } from "../Alerts";
import { ACTIONTYPES } from "../ActionTypes";
import { Score } from "./Score";
import { QuizQuestion } from "./QuizQuestion";
import { Time } from "./Time";
import { Title } from "./Title";
import { Button } from "./Button";

export function JoculCuvintelor() {
  const { state, dispatch } = useGameContext();
  const { t } = useTranslation();
  const currentQuestionSize = state.questions[state.questionIndex].size;
  const gameIntervalRef = useRef(null);
  const questionIntervalRef = useRef(null);

  useEffect(() => {
    const newIndexArray = Array.from(
      { length: currentQuestionSize },
      (_, index) => index
    );
    dispatch({ type: ACTIONTYPES.SET_INDEX_ARRAY, payload: newIndexArray });
    disableButton("nextQuestionButton", true);
    disableButton("stopTimeButton", false);
    disableButton("askForLetterButton", false);
    //initalize the timer useEffect()
    Timer(state.gameTime, dispatch, gameIntervalRef, "game");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (questionIntervalRef.current) clearInterval(gameIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.questionIndex]);

  function nextQuestion() {
    if (questionIntervalRef.current) clearInterval(questionIntervalRef.current);
    Timer(state.gameTime, dispatch, gameIntervalRef, "game");
    dispatch({ type: ACTIONTYPES.SET_QUESTION_INDEX });
    dispatch({ type: ACTIONTYPES.SET_QUESTION_TIME, payload: false });
    dispatch({ type: ACTIONTYPES.RESET_QUESTION_TIMER });
    dispatch({ type: ACTIONTYPES.SET_IS_ARRAY_SHUFFLED, value: false });
  }

  function increaseScore() {
    dispatch({ type: ACTIONTYPES.SET_INCREASE_SCORE });
  }

  function decreaseScore() {
    dispatch({ type: ACTIONTYPES.SET_DECREASE_SCORE });
  }

  function disableButton(buttonName, value) {
    dispatch({
      type: ACTIONTYPES.SET_DISABLE_BUTTON,
      payload: { buttonName, value }
    });
  }

  //event handler function
  function onAskLetter() {
    let randIndex;
    const currentQuestion = state.questions[state.questionIndex].answer;
    const currentPlaceholder =
      state.questions[state.questionIndex].placeholder.split(" ");
    const isShuffled = state.isArrayShuffled;
    if (!isShuffled) {
      const newArr = shuffleArray(state.wordIndexArray);
      dispatch({ type: ACTIONTYPES.SET_INDEX_ARRAY, payload: newArr });
      dispatch({ type: ACTIONTYPES.SET_IS_ARRAY_SHUFFLED, value: true });
    }
    if (state.wordIndexArray.length > 0) {
      const newShuffledArray = [...state.wordIndexArray];
      randIndex = newShuffledArray.pop();
      dispatch({
        type: ACTIONTYPES.SET_INDEX_ARRAY,
        payload: newShuffledArray
      });
      decreaseScore();
    }
    const randomLetter = currentQuestion.charAt(randIndex);
    currentPlaceholder[randIndex] = randomLetter;
    const updatedPlaceholder = currentPlaceholder.join(" ");

    const stateIndex = state.questionIndex;
    const isLastQuestion = stateIndex === state.questions.length - 1;

    dispatch({
      type: ACTIONTYPES.SET_QUESTIONS,
      payload: { stateIndex, updatedPlaceholder }
    });
    if (currentPlaceholder.join("") === currentQuestion) {
      increaseScore();
      Swal.fire(swalSuccess);
      disableButton("stopTimeButton", true);
      disableButton("askForLetterButton", true);
      disableButton("nextQuestionButton", false); //this will be enabled
      //check if it's the last question and ask user to play again
      if (isLastQuestion) {
        setTimeout(() => {
          Swal.fire(swalFinishGame).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 2000);
      }
    }
  }

  function onStopTime() {
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    Timer(state.questionTime, dispatch, questionIntervalRef, "question");
    disableButton("askForLetterButton", true);
    disableButton("stopTimeButton", true);
    dispatch({ type: ACTIONTYPES.SET_QUESTION_TIME, payload: true });
  }

  return (
    <main>
      <>
        <Score score={state.score} translate={t} />
        <Time stylee="gameTimer" timerType="game" translate={t}>
          ⏲{t("time")}: {state.displayMinutes}:{state.displaySeconds}
        </Time>
        <Title questionSize={currentQuestionSize} />
        <QuizQuestion
          disableButton={disableButton}
          increaseScore={increaseScore}
        />
        {state.isQuestionTime && (
          <Time stylee="questionTimer" timerType="question">
            ❔{state.displayQuestionMinutes}:{state.displayQuestionSeconds}
          </Time>
        )}
        <div className="action_buttons">
          <Button onClick={onStopTime} isDisabled={state.stopTimeButton}>
            ⏱{t("stopBtn")}
          </Button>
          <Button onClick={onAskLetter} isDisabled={state.askForLetterButton}>
            🔤{t("askBtn")}
          </Button>
          {state.questionIndex !== state.questions.length - 1 && (
            <Button
              onClick={nextQuestion}
              isDisabled={state.nextQuestionButton}
            >
              ⏭
            </Button>
          )}
        </div>
      </>
    </main>
  );
}
