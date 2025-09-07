import React, { useReducer } from "react";
import plusIcon from "../../assets/plusIcon.svg";
import arrows from "../../assets/arrows.svg";

type State = {
  text1: string;
  text2: string;
  highlighted1: string;
  highlighted2: string;
};

type Action =
  | { type: "SET_TEXT1"; payload: string }
  | { type: "SET_TEXT2"; payload: string }
  | { type: "COMPARE_TEXTS" }
  | { type: "RESET" };

const initialState: State = {
  text1: "",
  text2: "",
  highlighted1: "",
  highlighted2: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TEXT1":
      return { ...state, text1: action.payload };
    case "SET_TEXT2":
      return { ...state, text2: action.payload };
    case "COMPARE_TEXTS": {
      const chars1 = state.text1.split("");
      const chars2 = state.text2.split("");
      let highlighted1 = "";
      let highlighted2 = "";

      const maxLength = Math.max(chars1.length, chars2.length);

      for (let i = 0; i < maxLength; i++) {
        const c1 = chars1[i] || "";
        const c2 = chars2[i] || "";

        if (c1 === c2) {
          highlighted1 += `<span>${c1}</span>`;
          highlighted2 += `<span>${c2}</span>`;
        } else if (c1 && !c2) {
          highlighted1 += `<span class="bg-red-200 text-red-600 font-semibold">${c1}</span>`;
        } else if (!c1 && c2) {
          highlighted2 += `<span class="bg-green-200 text-green-600 font-semibold">${c2}</span>`;
        } else {
          highlighted1 += `<span class="bg-red-200 text-red-600 font-semibold">${c1}</span>`;
          highlighted2 += `<span class="bg-green-200 text-green-600 font-semibold">${c2}</span>`;
        }
      }

      return { ...state, highlighted1, highlighted2 };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default function CompareText() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="w-full min-h-screen flex flex-col items-start bg-white">
      <div className="px-6 pt-6 w-full">
        <div className="pb-4 border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <select
              defaultValue="ka"
              className="border border-gray-300 rounded-lg leading-[22px] text-gray-700 px-3 py-2"
            >
              <option value="ka">ქართული</option>
              <option value="en">English</option>
            </select>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="preserveFormat"
                className="w-5 h-5 border border-gray-400 rounded-sm accent-blue-500"
              />
              <label
                htmlFor="preserveFormat"
                className="text-sm leading-[22px] tracking-wide text-gray-700"
              >
                ფორმატის შენარჩუნება
              </label>
            </div>
          </div>

          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="bg-brown flex gap-2 items-center py-[10px] px-4 rounded-lg text-white leading-7 hover:bg-brown/80 transition"
          >
            <img src={plusIcon} alt="plusIcon" />
            ახლის გახსნა
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center w-full gap-8">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="relative w-full">
            <div
              className="absolute inset-0 p-3 text-lg leading-6 text-gray-700 whitespace-pre-wrap break-words pointer-events-none"
              dangerouslySetInnerHTML={{
                __html: state.highlighted1 || state.text1,
              }}
            />
            <textarea
              value={state.text1}
              onChange={(e) =>
                dispatch({ type: "SET_TEXT1", payload: e.target.value })
              }
              className="p-3 bg-transparent border border-gray-300 w-full h-[432px] rounded-lg resize-none text-lg leading-6 text-transparent caret-black focus:outline-none"
              placeholder="დაიწყე წერა..."
            />
          </div>

          <img src={arrows} alt="arrows" className="mx-2" />

          <div className="relative w-full">
            <div
              className="absolute inset-0 p-3 text-lg leading-6 text-gray-700 whitespace-pre-wrap break-words pointer-events-none"
              dangerouslySetInnerHTML={{
                __html: state.highlighted2 || state.text2,
              }}
            />
            <textarea
              value={state.text2}
              onChange={(e) =>
                dispatch({ type: "SET_TEXT2", payload: e.target.value })
              }
              className="p-3 bg-transparent border border-gray-300 w-full h-[432px] rounded-lg resize-none text-lg leading-6 text-transparent caret-black focus:outline-none"
              placeholder="დაიწყე წერა..."
            />
          </div>
        </div>

        <button
          onClick={() => dispatch({ type: "COMPARE_TEXTS" })}
          disabled={!state.text1.trim() || !state.text2.trim()}
          className={`py-[10px] px-6 rounded-lg text-lg transition
    ${
      state.text1.trim() && state.text2.trim()
        ? "bg-blue-600 text-white hover:bg-blue-500"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
        >
          შედარება
        </button>
      </div>
    </div>
  );
}
