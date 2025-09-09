import load from "../../assets/load.png";

interface LoaderProps {
  progress: number;
}

function Loader({ progress }: LoaderProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex items-center justify-center gap-4 p-4 border border-lightGray2 rounded-lg bg-white">
        <img className="w-[40px] h-[40px]" src={load} alt="load" />

        <div className="flex flex-col">
          <p className="text-brown leading-4 text-[10px]">
            Converting...Thank you For your Patience
          </p>
          <div className="flex items-center gap-2">
            <p className="text-arsenic leading-7 text-[16px] font-bold">
              {progress}%
            </p>

            <div className="w-[160px] h-[8px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
