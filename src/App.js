import { JoculCuvintelor } from "./components/JoculCuvintelor";
import Form from "react-bootstrap/Form";
import { useGameContext } from "./stateManagement";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { OverLay } from "./components/Overlay";

export default function App() {
  const { state, dispatch } = useGameContext();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (state.isBckChanged) {
      body.style.backgroundColor = "#FFFFFF";
      body.style.color = "#000000";
    } else {
      body.style.backgroundColor = "#000000";
      body.style.color = "#FFFFFF";
    }
    //cleanup function when unmount component
    return () => {
      body.style.backgroundColor = "";
      body.style.color = "";
    };
  }, [state.isBckChanged]);

  function changeLanguageHandler(e) {
    dispatch({ type: "SET_LANGUAGE", value: e.target.value });
    i18n.changeLanguage(e.target.value);
  }

  function changeBckHandler(e) {
    dispatch({ type: "SET_IS_BACKGROUND_CHANGED", value: e.target.checked });
  }

  return (
    <>
      <div className="options">
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label={t(state.isBckChanged ? "lgtMode" : "drkMode")}
            onChange={changeBckHandler}
          />
        </Form>
        <select
          className="dropdown"
          onChange={changeLanguageHandler}
          value={state.language}
        >
          <option value="en">En</option>
          <option value="ro">Ro</option>
        </select>
      </div>
      <div className="App">
        {!state.isGameStarted && <OverLay />}
        {state.isGameStarted && <JoculCuvintelor />}
      </div>
    </>
  );
}
