export default function Button({ children, onClick, ...props }) {
  return (
    <button className="btn" onClick={onClick} {...props}>
      {children}
    </button>
  );
}
