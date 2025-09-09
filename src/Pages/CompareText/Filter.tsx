import image from "../../assets/Spelling, Check, Text.png";
function Filter() {
  return (
    <div className=" w-full flex items-center gap-1 py-[26px] mb-[25px] border-b border-b-lightGray3 max-sm:text-[12px]">
      <img src={image} alt="Image" className="w-6 h-6 max-sm:w-4 max-sm:h-4" />
      <p className="text-dark-Blue font-bold leading-5 text-[16px]">
        ტექსტის შედარება
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <g clipPath="url(#clip0_2046_486)">
          <path
            d="M4.3225 4.66797L7 7.33964L9.6775 4.66797L10.5 5.49047L7 8.99047L3.5 5.49047L4.3225 4.66797Z"
            fill="#132450"
            fillOpacity="0.7"
          />
        </g>
        <defs>
          <clipPath id="clip0_2046_486">
            <rect
              width="14"
              height="14"
              fill="white"
              transform="matrix(-1 0 0 1 14 0)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default Filter;
