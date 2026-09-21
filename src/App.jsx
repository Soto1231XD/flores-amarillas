import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroScreen from "./components/IntroScreen";
import BloomTransition from "./components/BloomTransition";
import MusicPlayer from "./components/MusicPlayer";
import Welcome from "./sections/Welcome";
import FlowerReveal from "./sections/FlowerReveal";
import Reasons from "./sections/Reasons";
import VirtualBouquet from "./sections/VirtualBouquet";
import Letter from "./sections/Letter";
import FinalSurprise from "./sections/FinalSurprise";

const STAGES = {
  INTRO: "intro",
  BLOOM: "bloom",
  MAIN: "main",
};

function App() {
  const [stage, setStage] = useState(STAGES.INTRO);

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === STAGES.INTRO && (
          <IntroScreen key="intro" onDiscover={() => setStage(STAGES.BLOOM)} />
        )}
      </AnimatePresence>

      {stage === STAGES.BLOOM && (
        <BloomTransition onComplete={() => setStage(STAGES.MAIN)} />
      )}

      {stage === STAGES.MAIN && (
        <main>
          <Welcome />
          <FlowerReveal />
          <Reasons />
          <VirtualBouquet />
          <Letter />
          <FinalSurprise />
          <MusicPlayer />
        </main>
      )}
    </>
  );
}

export default App;
