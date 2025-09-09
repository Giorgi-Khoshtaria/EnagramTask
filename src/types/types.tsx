export interface State {
  text1: string;
  text2: string;
  highlighted1: string;
  highlighted2: string;
  loading: boolean;
  progress: number;
  comparisonDone: boolean;
  needsRecompare: boolean;
}

export type Action =
  | { type: "SET_TEXT1"; payload: string }
  | { type: "SET_TEXT2"; payload: string }
  | { type: "START_LOADING" }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "COMPARE_TEXTS" }
  | { type: "RESET" };
