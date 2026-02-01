import { useGameStore } from './store/gameStore';
import { StatsPanel } from './components/game/StatsPanel';
import { SceneScreen } from './screens/SceneScreen';
import { DecisionScreen } from './screens/DecisionScreen';
import { DivergenceScreen } from './screens/DivergenceScreen';

// Placeholder Screens (You will flesh these out next)
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

const EraIntro = () => {
  const setScreen = useGameStore(s => s.setScreen);
  return (
    <div className="h-screen flex items-center justify-center bg-black/90 text-white">
      <div className="text-center max-w-2xl">
        <h2 className="text-4xl font-serif text-roman-gold mb-4">ERA I: THE RUBICON</h2>
        <p className="text-lg mb-8">49 BC. Caesar stands at the river...</p>
        <button 
          onClick={() => setScreen('SCENE')}
          className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-colors"
        >
          Enter the Forum
        </button>
      </div>
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
    </div>
  );
}

export default App;