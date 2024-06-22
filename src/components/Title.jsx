import { useTranslation } from "react-i18next";

export function Title({ questionSize }) {
  const { t } = useTranslation();

  let message = "";

  if (questionSize < 6) {
    message = (
      <p style={{ color: "rgb(0,200,0)", fontWeight: "300" }}>
        {t("message", { count: questionSize })}
      </p>
    );
  } else if (questionSize < 8) {
    message = (
      <p style={{ color: "rgb(202, 150, 53)", fontWeight: "300" }}>
        {t("message", { count: questionSize })}
      </p>
    );
  } else {
    message = (
      <p style={{ color: "rgb(255, 0, 53)", fontWeight: "300" }}>
        {t("message", { count: questionSize })}
      </p>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h4>🎮{t("title")}</h4>
      {message}
    </div>
  );
}
