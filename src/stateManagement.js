import { useReducer, createContext, useContext } from "react";
import { gameData } from "./gameData";

const initalState = {
  isGameStarted: false,
  questions: gameData,
  questionIndex: 0,
  wordIndexArray: [],
  score: 150,
  disabledButton: false,
  gameTime: 10 * 60 * 1000,
  questionTime: 30 * 1000,
  displayGameMinutes: "10",
  displayGameSeconds: "00",
  displayQuestionMinutes: "00",
  displayQuestionSeconds: "30",
  language: "en",
  isBckChanged: false,
  stopTimeButton: false,
  isArrayShuffled: false,
  askForLetterButton: false,
  nextQuestionButton: false,
  isQuestionTime: false
};

function gameStateReducer(state, action) {
  switch (action.type) {
    case "START_GAME":
      return { ...state, isGameStarted: action.value };
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: state.questions.map((question, i) => {
          if (i === action.payload.stateIndex) {
            return {
              ...question,
              placeholder: action.payload.updatedPlaceholder
            };
          }
          return question;
        })
      };
    case "SET_QUESTION_INDEX":
      return {
        ...state,
        questionIndex:
          state.questionIndex < state.questions.length - 1
            ? state.questionIndex + 1
            : window.location.reload()
      };
    case "SET_INDEX_ARRAY":
      return { ...state, wordIndexArray: action.payload };

    case "SET_DISABLE_BUTTON":
      return { ...state, [action.payload.buttonName]: action.payload.value };

    case "SET_IS_BACKGROUND_CHANGED":
      return { ...state, isBckChanged: action.value };

    case "SET_INCREASE_SCORE":
      return { ...state, score: state.score + 10 };

    case "SET_LANGUAGE":
      return { ...state, language: action.value };

    case "SET_DECREASE_SCORE":
      return { ...state, score: state.score - 10 };

    case "SET_GAME_TIMER":
      return { ...state, gameTime: action.payload };

    case "SET_QUESTION_TIMER":
      return { ...state, questionTime: action.payload };

    case "SET_QUESTION_TIME":
      return { ...state, isQuestionTime: action.payload };

    case "SET_IS_ARRAY_SHUFFLED":
      return { ...state, isArrayShuffled: action.value };

    case "RESET_QUESTION_TIMER":
      return { ...state, questionTime: initalState.questionTime };

    case "SET_DISPLAY_MINUTES":
      if (action.payload.timerType === "game") {
        return {
          ...state,
          displayMinutes:
            action.payload.minutes < 10
              ? "0" + action.payload.minutes
              : action.payload.minutes
        };
      } else {
        return {
          ...state,
          displayQuestionMinutes:
            action.payload.minutes < 10
              ? "0" + action.payload.minutes
              : action.payload.minutes
        };
      }

    case "SET_DISPLAY_SECONDS":
      if (action.payload.timerType === "game") {
        return {
          ...state,
          displaySeconds:
            action.payload.seconds < 10
              ? "0" + action.payload.seconds
              : action.payload.seconds
        };
      } else {
        return {
          ...state,
          displayQuestionSeconds:
            action.payload.seconds < 10
              ? "0" + action.payload.seconds
              : action.payload.seconds
        };
      }

    default:
      return state;
  }
}

const gameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameStateReducer, initalState);

  return (
    <gameContext.Provider value={{ state, dispatch }}>
      {children}
    </gameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(gameContext);
};
