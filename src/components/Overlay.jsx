import { Button } from "./Button";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../stateManagement";
import { ACTIONTYPES } from "../ActionTypes";
import Swal from "sweetalert2";

export function OverLay() {
  const { t } = useTranslation();
  const { dispatch } = useGameContext();

  function onStartGame() {
    dispatch({ type: ACTIONTYPES.START_GAME, value: true });
  }

  function onReadRules() {
    Swal.fire({
      title: t("rulesTitle"),
      html: t("rulesText"),
      icon: "info",
      confirmButtonText: t("rulesBtn")
    });
  }

  return (
    <div className="overlay">
      <h3 id="overlay-text">{t("start")}🎮</h3>
      <div className="overlay_btn">
        <Button onClick={onStartGame}>📤{t("startGameBtn")}</Button>
        <Button onClick={onReadRules}>📕{t("rules")}</Button>
      </div>
    </div>
  );
}
