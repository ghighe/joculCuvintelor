import { useCallback, useRef, useEffect } from "react";
import { useGameContext } from "../stateManagement";
import Swal from "sweetalert2";
import { swalSuccess } from "../Alerts";

export function QuizQuestion({ disableButton, increaseScore }) {
  const { state, dispatch } = useGameContext();

  const questionAnswer = Array.from(
    state.questions[state.questionIndex].answer
  );
  const placeholderArray =
    state.questions[state.questionIndex].placeholder.split(" ");

  let index = useRef(-1);
  const handleKeyDown = useCallback(
    (event) => {
      if (event.code.startsWith("Key")) {
        const keyPressed = event.key;
        if (questionAnswer.includes(keyPressed)) {
          index.current = questionAnswer.indexOf(keyPressed, index.current + 1);
        } else {
          Swal.fire({
            text: `Letter "${keyPressed}" is not part of the hidden word`,
            icon: "warning",
            confirmButtonText: "Try again"
          });
          return;
        }
        if (index.current !== -1) {
          placeholderArray[index.current] = keyPressed;
          const updatedPlaceholder = placeholderArray.join(" ");
          const stateIndex = state.questionIndex;
          dispatch({
            type: "SET_QUESTIONS",
            payload: { stateIndex, updatedPlaceholder }
          });
          //check win on key press
          if (updatedPlaceholder.trim() === questionAnswer.join(" ")) {
            increaseScore();
            disableButton("stopTimeButton", true);
            disableButton("askForLetterButton", true);
            disableButton("nextQuestionButton", false); //this will be enabled
            dispatch({ type: "SET_QUESTION_TIME", payload: false });
            Swal.fire(swalSuccess);
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questionAnswer, state.questions, state.questionIndex, dispatch]
  );

  useEffect(() => {
    if (state.stopTimeButton) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, state.stopTimeButton]);

  return (
    <>
      <div className="question">
        {state.questions[state.questionIndex].question}
      </div>
      <div className="answer">
        {state.questions[state.questionIndex].placeholder}
      </div>
    </>
  );
}
