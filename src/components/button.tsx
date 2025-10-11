type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 text-white bg-cyan-800 hover:bg-cyan-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
