export function Button({ styles, children, onClick, isDisabled }) {
  return (
    <button className={styles} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
}
