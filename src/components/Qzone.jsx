const Qzone = () => {
  return (
    <div className="p-4 bg-gray-100 rounded w-full">
      <h2 className="font-semibold text-lg mb-3">Q-Zone</h2>
      <div className="flex flex-col justify-center items-center gap-4">
        <div>
          <img src="/assets/swimming.png" alt="Swimming" className="w-full rounded" />
        </div>
        <div>
          <img src="/assets/class.png" alt="Class" className="w-full rounded" />
        </div>
        <div>
          <img src="/assets/playground.png" alt="Playground" className="w-full rounded" />
        </div>
      </div>
    </div>
  );
};

export default Qzone;