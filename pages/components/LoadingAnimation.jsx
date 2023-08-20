const LoadingAnimation = () => {
  return (
    <div className="flex items-center space-x-2 animate-pulse">
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#d392fe] to-[#50db4a] animate-spin"></div>
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#d392fe] to-[#50db4a] animate-spin"></div>
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#d392fe] to-[#50db4a] animate-spin"></div>
    </div>
  );
};

export default LoadingAnimation;
