import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import CompareText from "./Pages/CompareText/CompareText";
import SpellChecker from "./Pages/SpellChecher/SpellChecker";
import SpeechToText from "./Pages/SpeachToText/SpeactToText";
import TextToSpeech from "./Pages/TextToSpeach/TextTospeech";
import PdfConversion from "./Pages/PdfConversion/PdfConversion";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <CompareText />,
        },
        {
          path: "/spell-checker",
          element: <SpellChecker />,
        },
        {
          path: "/speech-to-text",
          element: <SpeechToText />,
        },
        {
          path: "/text-to-speech",
          element: <TextToSpeech />,
        },
        {
          path: "/pdf-conversion",
          element: <PdfConversion />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
