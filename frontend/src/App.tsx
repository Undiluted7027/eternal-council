import { useGameStore } from './store/gameStore';
import { StatsPanel } from './components/game/StatsPanel';
import { SceneScreen } from './screens/SceneScreen';
import { DecisionScreen } from './screens/DecisionScreen';
import { DivergenceScreen } from './screens/DivergenceScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { EraIntro } from './screens/EraIntro';

// Placeholder TitleScreen (can be moved to screens/TitleScreen.tsx later)
const TitleScreen = () => {
  const startGame = useGameStore(s => s.startGame);
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-stone-900 text-roman-gold">
      <h1 className="text-6xl font-serif mb-8">THE ETERNAL COUNCIL</h1>
      <button
        onClick={startGame}
        className="px-8 py-3 bg-roman-red text-white font-serif text-xl rounded border-2 border-roman-gold hover:bg-red-900 transition-colors"
      >
        Begin Journey
      </button>
    </div>
  );
};


function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-950 font-sans select-none">
      {/* Persistent UI */}
      {currentScreen !== 'TITLE' && <StatsPanel />}

      {/* Screen Router */}
      {currentScreen === 'TITLE' && <TitleScreen />}
      {currentScreen === 'ERA_INTRO' && <EraIntro />}
      {currentScreen === 'SCENE' && <SceneScreen />}
      {currentScreen === 'DECISION' && <DecisionScreen />}
      {currentScreen === 'DIVERGENCE' && <DivergenceScreen />}
      {currentScreen === 'RESULTS' && <ResultsScreen />}
    </div>
  );
}

export default App;