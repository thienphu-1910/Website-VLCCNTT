
//grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
const DeviceStatusCard = ({ children }) => {
  return (
    <div className="bg-white rounded-xl h-40 w-100">
      {children}
    </div>
  );
}

export default DeviceStatusCard;