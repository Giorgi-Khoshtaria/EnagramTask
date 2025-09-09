import { useReducer, useEffect } from "react";
import plusIcon from "../../assets/plusIcon.svg";
import arrows from "../../assets/arrows.svg";
import rotateArrow from "../../assets/Arrow, Rotate.png";
import Loader from "./Loader";
import type { State } from "../../types/types";
import type { Action } from "../../types/types";
import Nav from "./Nav";

const initialState: State = {
  text1: "",
  text2: "",
  highlighted1: "",
  highlighted2: "",
  loading: false,
  progress: 0,
  comparisonDone: false,
  needsRecompare: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TEXT1":
      return {
        ...state,
        text1: action.payload,
        needsRecompare: state.comparisonDone,
        highlighted1: state.comparisonDone ? "" : state.highlighted1,
        highlighted2: state.comparisonDone ? "" : state.highlighted2,
        comparisonDone: state.comparisonDone ? false : state.comparisonDone,
      };

    case "SET_TEXT2":
      return {
        ...state,
        text2: action.payload,
        needsRecompare: state.comparisonDone,
        highlighted1: state.comparisonDone ? "" : state.highlighted1,
        highlighted2: state.comparisonDone ? "" : state.highlighted2,
        comparisonDone: state.comparisonDone ? false : state.comparisonDone,
      };

    case "START_LOADING":
      return { ...state, loading: true, progress: 0 };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
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

      return {
        ...state,
        highlighted1,
        highlighted2,
        loading: false,
        progress: 100,
        comparisonDone: true,
        needsRecompare: false,
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default function CompareText() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    let interval: number | undefined;
    if (state.loading) {
      let progress = 0;
      interval = window.setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            dispatch({ type: "COMPARE_TEXTS" });
          }, 300);
        } else {
          dispatch({ type: "SET_PROGRESS", payload: progress });
        }
      }, 150);
    }
    return () => clearInterval(interval);
  }, [state.loading]);

  const handleCompare = () => {
    if (!state.text1.trim() || !state.text2.trim()) return;
    dispatch({ type: "START_LOADING" });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-start bg-white">
      <div className="px-6 pt-6 w-full">
        <div className="hidden w-full max-md:flex">
          <Nav />
        </div>
        <div className="pb-4 border-b border-lightGray flex flex-wrap  gap-4 items-center justify-between max-[420px]:flex-col max-[420px]:items-start">
          <div className="flex items-center gap-6 max-[420px]:flex-col max-[420px]:w-full">
            <select
              defaultValue="ka"
              className="border border-lightGray rounded-lg leading-[22px] w-[135px] text-arsenic px-3 py-2 max-[420px]:w-full"
            >
              <option value="ka">ქართული</option>
              <option value="en">English</option>
            </select>

            <div className="flex items-center gap-2  max-[420px]:w-full">
              <input
                type="checkbox"
                id="preserveFormat"
                className="w-5 h-5 border  border-gray-400 rounded-sm accent-blue-500"
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
            className="bg-brown flex gap-2 items-center justify-center py-[10px] px-4 rounded-lg text-white leading-7 hover:bg-brown/80 transition max-[420px]:w-full"
          >
            <img src={plusIcon} alt="plusIcon" />
            ახლის გახსნა
          </button>
        </div>
      </div>

      {state.loading ? (
        <div className="flex items-center justify-center w-full mt-[216px]">
          <Loader progress={state.progress} />
        </div>
      ) : (
        <div className="p-6 flex flex-col items-center w-full gap-8 transition-opacity duration-300 max-md:p-7">
          <div className="flex items-center justify-between gap-4 w-full max-sm:flex-col ">
            <div className="relative w-full">
              {state.comparisonDone && (
                <div
                  className="absolute inset-0 p-3 text-lg leading-6 text-gray-700 whitespace-pre-wrap break-words pointer-events-none"
                  dangerouslySetInnerHTML={{
                    __html: state.highlighted1,
                  }}
                />
              )}
              <textarea
                value={state.text1}
                onChange={(e) =>
                  dispatch({ type: "SET_TEXT1", payload: e.target.value })
                }
                className={`p-3 bg-light-blue  w-full h-[432px] max-sm:h-[190px] rounded-lg resize-none text-lg leading-6 caret-black focus:outline-none ${
                  state.comparisonDone ? "text-transparent" : "text-gray-700"
                }`}
                placeholder="დაიწყე წერა..."
              />
            </div>

            <img src={arrows} alt="arrows" className="mx-2 max-sm:rotate-90" />

            <div className="relative w-full">
              {state.comparisonDone && (
                <div
                  className="absolute inset-0 p-3 text-lg leading-6 text-gray-700 whitespace-pre-wrap break-words pointer-events-none"
                  dangerouslySetInnerHTML={{
                    __html: state.highlighted2,
                  }}
                />
              )}
              <textarea
                value={state.text2}
                onChange={(e) =>
                  dispatch({ type: "SET_TEXT2", payload: e.target.value })
                }
                className={`p-3 bg-light-blue  w-full h-[432px] max-sm:h-[190px] rounded-lg resize-none text-lg leading-6 caret-black focus:outline-none ${
                  state.comparisonDone ? "text-transparent" : "text-gray-700"
                }`}
                placeholder="დაიწყე წერა..."
              />
            </div>
          </div>

          <button
            onClick={handleCompare}
            disabled={!state.text1.trim() || !state.text2.trim()}
            className={`py-[10px] px-6 rounded-lg text-lg transition flex items-center justify-center gap-2 ${
              state.text1.trim() && state.text2.trim()
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {state.needsRecompare ? (
              <div className="flex items-center gap-1">
                <img src={rotateArrow} alt="recompare" className="w-5 h-5" />
                <p className="text-white leading-7 "> შედარება</p>
              </div>
            ) : (
              "შედარება"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
