import { useGameContext } from "../stateManagement";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { ACTIONTYPES } from "../ActionTypes";

export function Time({ children, stylee }) {
  const { state, dispatch } = useGameContext();
  const currentAnswer = state.questions[state.questionIndex].answer;

  useEffect(() => {
    const currentQuestionIndex = state.questionIndex;
    //we are checking here the question timer and game timer and display popups because we should avoid to send many parameters to Timer() function
    if (state.questionTime === 0) {
      dispatch({
        type: ACTIONTYPES.SET_DISABLE_BUTTON,
        payload: { buttonName: "nextQuestionButton", value: false }
      });
      dispatch({
        type: ACTIONTYPES.SET_QUESTIONS,
        payload: {
          stateIndex: currentQuestionIndex,
          updatedPlaceholder: currentAnswer
        }
      });
    } else if (state.gameTime === 0) {
      Swal.fire({
        text: `Timpul jocului s-a sfarsit, doriti sa jucati din nou?`,
        icon: "question",
        confirmButtonText: "Da",
        showCancelButton: true,
        cancelButtonText: "Nu",
        cancelButtonColor: "grey"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.questionTime, state.gameTime]);

  return <h3 className={stylee}>{children}</h3>;
}
