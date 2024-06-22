import { useEffect } from "react";
import Swal from "sweetalert2";

export function Score({ score, translate }) {
  useEffect(() => {
    if (score <= 0) {
      Swal.fire({
        text: "Nu mai aveti puncte ☹, doriti sa jucati din nou?",
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
  }, [score]);
  return (
    <h3 className="score">
      📣{translate("score")} {score}p
    </h3>
  );
}
