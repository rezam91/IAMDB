import loadingPath from '../assets/images/time.png'

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-[40px]">
      <img
        src={loadingPath}
        alt="Loading..."
        className="w-[40px] h-[40px] animate-spin"
      />
    </div>
  );
};

export default LoadingSpinner
