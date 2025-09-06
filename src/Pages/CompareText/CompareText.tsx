import React from "react";
import plusIcon from "../../assets/plusIcon.svg";
import arrows from "../../assets/arrows.svg";
function CompareText() {
  return (
    <div className="w-full min-h-screen flex flex-col items-start">
      <div className="px-6 pt-6 w-full ">
        <div className="pb-4 border-b  border-b-lightGray   flex items-center justify-between">
          <div className="flex items-center gap-6">
            <select
              defaultValue="ka"
              className="  border border-lightGray rounded-lg  leading-[22px] text-arsenic 
            pl-3.5 pr-2 py-2 flex items-center justify-between"
            >
              <option value="ka">ქართული</option>
              <option value="en">ინგლისური</option>
            </select>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="preserveFormat"
                className="w-5 h-5 appearance-none border border-lightGray rounded-sm checked:bg-blue-500"
              />
              <label
                htmlFor="preserveFormat"
                className="text-sm leading-[22px] tracking-[0.14px] text-arsenic"
              >
                ფორმატის შენარჩუნება
              </label>
            </div>
          </div>
          <div>
            <button className="bg-brown cursor-pointer flex gap-1  items-center py-[10px] pr-4 pl-3 rounded-[6px] text-white leading-7 ">
              <img src={plusIcon} alt="plusIcon" />
              ახლის გახსნა
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center w-full gap-8">
        <div className="flex items-center justify-between gap-[10px] w-full">
          <textarea
            className="p-3 bg-light-blue w-full h-[432px] rounded-lg resize-none text-[18px] text-arsenic leading-[26px] focus:outline-0 placeholder:text-[18px] placeholder:leading-[26px] placeholder:text-brown"
            placeholder="დაიწყე წერა..."
          ></textarea>

          <img src={arrows} alt="arrows" />

          <textarea
            className="p-3 bg-light-blue w-full h-[432px] rounded-lg resize-none text-[18px] text-arsenic leading-[26px] focus:outline-0 placeholder:text-[18px] placeholder:leading-[26px] placeholder:text-brown"
            placeholder="დაიწყე წერა..."
          ></textarea>
        </div>
        <button className="py-[10px] px-4 rounded-[6px] bg-brown text-white leading-7 text-[18px]">
          შედარება
        </button>
      </div>
    </div>
  );
}

export default CompareText;
