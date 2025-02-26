export const Heading = ({
  children,
  heading,
  className,
}: {
  children: React.ReactNode;
  heading: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}) => {
  switch (heading) {
    case 'primary':
      return (
        <h1
          className={`text-4xl font-bold mb-8 w-full text-center ${className}`}
        >
          {children}
        </h1>
      );
    case 'secondary':
      return (
        <h2
          className={`text-4xl font-bold mb-8 border-b border-gray-700 max-w-fit ${className}`}
        >
          {children}
        </h2>
      );
    case 'tertiary':
      return (
        <h3 className={`text-2xl semi-bold mb-1 ${className}`}>{children}</h3>
      );
  }
};
