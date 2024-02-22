const CustomDivider = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1 border-t border-dark-blue-gray border-opacity-50"></div>
      <p className="body-two-text">{title}</p>
      <div className="flex-1 border-t border-dark-blue-gray border-opacity-50"></div>
    </div>
  );
};

export default CustomDivider;
