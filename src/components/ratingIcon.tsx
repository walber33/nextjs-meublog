export const RatingIcon = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`
       p-2 min-w-10 min-h-10 aspect-square rounded-full border-2 border-gray-700 bg-gray-50 text-gray-700 font-bold flex items-center justify-center 
        ${className}`}
    >
      {children}
    </p>
  );
};
