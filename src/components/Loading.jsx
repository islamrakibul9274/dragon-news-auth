const Loading = () => {
  return (
    <div className="flex min-h-[50vh] justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
