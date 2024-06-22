import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// prettier-ignore
const resources = {
  en: {
    translation: {
      "start":"WORDS GAME",
      "title": "Words game",
      "message": "Find the word from {{count}} letters",
      "score": "Score",
      "time": "Time",
      "stopBtn": "Stop Time",
      "askBtn": "Ask a letter",
      "startGameBtn":"Start Game",
      "rules":"Game Rules",
      "drkMode": "DarkMode",
      "lgtMode": "LightMode",
      "rulesTitle": "Game Rules",
      "rulesText":"The game starts with a total of 150 points.You will encounter questions ranging from 4 to 10 letters.For each letter you ask for, 10 points will be deducted.You can use the stop time button, which will start a question timer. During this period, you cannot ask for letters, but you must guess the word.For every word guessed correctly, you will earn 10 points.The game ends when you run out of points, the game time finishes, or all questions are answered.",
      "rulesBtn":"Got it!"
    },
  },
    ro: {
      translation: {
        "start":"JOCUL CUVINTELOR",
        "title": "Jocul Cuvintelor",
        "message": "Gaseste cuvantul din {{count}} litere",
        "score": "Scor",
        "time": "Timp",
        "stopBtn": "Opreste Timpul",
        "askBtn": "Cere o litera",
        "startGameBtn":"Start Joc",
        "rules":"Reguli Joc",
        "drkMode": "Mod Intunecat",
        "lgtMode": "Mod Luminos",
        "rulesTitle": "Regulile Jocului",
         "rulesText": "Jocul începe cu un total de 150 de puncte.Veți întâlni întrebări care variază de la 4 la 10 litere.Pentru fiecare literă solicitată, se vor scădea 10 puncte.Puteți folosi butonul de oprire a timpului, care va porni un cronometru pentru întrebare. În această perioadă, nu puteți solicita litere, dar trebuie să ghiciți cuvântul.Pentru fiecare cuvânt ghicit corect, veți câștiga 10 puncte.Jocul se încheie când rămâneți fără puncte, timpul de joc se termină sau toate întrebările sunt finalizate.",
         "rulesBtn":"Am inteles!"
      }
    }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
