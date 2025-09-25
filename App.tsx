import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';
import CycleStage from './components/CycleStage';
import type { SimulationCycle } from './types';
import { SCENARIOS } from './constants';

const Arrow: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="flex items-center justify-center min-h-[50px] md:flex-1 md:min-h-0 md:min-w-[50px] lg:min-w-[100px] px-2">
    <ArrowRight
      className={`hidden md:block w-8 h-8 md:w-12 md:h-12 transition-colors duration-750 ease-in-out ${isActive ? 'text-violet-500 animate-nudge-right' : 'text-slate-300'}`}
      strokeWidth={2.5}
    />
     <ArrowDown
      className={`block md:hidden w-8 h-8 transition-colors duration-750 ease-in-out ${isActive ? 'text-violet-500 animate-nudge-down' : 'text-slate-300'}`}
      strokeWidth={2.5}
    />
  </div>
);

const App: React.FC = () => {
  const [simulationData, setSimulationData] = useState<SimulationCycle | null>(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);

  const advanceStage = useCallback(() => {
    if (currentStage < 3) {
      setCurrentStage(prev => prev + 1);
    } else {
      // Last stage has finished
      setIsSimulating(false);
    }
  }, [currentStage]);


  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const scenarioId = e.target.value;
    setSelectedScenarioId(scenarioId);
    
    if (scenarioId) {
        const selectedScenario = SCENARIOS.find(s => s.id === scenarioId);
        if (selectedScenario) {
            setSimulationData(selectedScenario.cycle);
            setIsSimulating(false);
            setCurrentStage(-1);
        }
    } else {
        setSimulationData(null);
    }
  };


  const startSimulation = useCallback(() => {
    if (!simulationData) return;
    setCurrentStage(0);
    setIsSimulating(true);
  }, [simulationData]);

  const resetSimulation = useCallback(() => {
    setSimulationData(null);
    setIsSimulating(false);
    setCurrentStage(-1);
    setSelectedScenarioId('');
  }, []);
  
  const isSimulationOver = !isSimulating && currentStage !== -1;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-violet-600">
            Cycle Fonctionnel de l'Ordinateur
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Une simulation interactive du cycle Entrée → Traitement → Stockage → Sortie.
          </p>
        </header>

        <main>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-md">
                    <label htmlFor="scenario-select" className="text-2xl font-bold text-center text-violet-600 mb-4 block">1. Choisissez une situation à simuler</label>
                    <select
                        id="scenario-select"
                        value={selectedScenarioId}
                        onChange={handleScenarioChange}
                        className="w-full p-3 bg-white text-slate-700 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    >
                        <option value="">-- Sélectionnez un scénario --</option>
                        {SCENARIOS.map((scenario) => (
                          <option key={scenario.id} value={scenario.id}>{scenario.title}</option>
                        ))}
                    </select>
                </div>
            </div>

          {simulationData && (
            <div className="mt-8 bg-white rounded-xl p-6 border border-slate-200/80 shadow-md">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-violet-600 mb-2">2. Simulation</h3>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 lg:gap-4">
                  <div className="w-full md:basis-1/4">
                    <CycleStage 
                        title={simulationData.input.title}
                        description={simulationData.input.description}
                        icon={simulationData.input.icon}
                        isActive={isSimulating && currentStage === 0}
                        isCompleted={currentStage > 0 || isSimulationOver}
                        onAnimationComplete={currentStage === 0 ? advanceStage : undefined}
                    />
                  </div>
                  <Arrow isActive={currentStage >= 1} />
                  <div className="w-full md:basis-5/12 p-4 border-2 border-dashed border-violet-300 rounded-lg flex flex-col gap-2 justify-center">
                      <CycleStage 
                          title={simulationData.processing.title}
                          description={simulationData.processing.description}
                          icon={simulationData.processing.icon}
                          isActive={isSimulating && currentStage === 1}
                          isCompleted={currentStage > 1 || isSimulationOver}
                          onAnimationComplete={currentStage === 1 ? advanceStage : undefined}
                      />
                      <div className="flex justify-center items-center gap-4 my-1">
                        <ArrowDown className={`w-6 h-6 transition-colors duration-750 ${currentStage >= 2 ? 'text-green-500 animate-nudge-down' : 'text-slate-300'}`} strokeWidth={2.5}/>
                        <ArrowUp className={`w-6 h-6 transition-colors duration-750 ${currentStage >= 2 ? 'text-green-500 animate-nudge-up' : 'text-slate-300'}`} strokeWidth={2.5}/>
                      </div>
                      <CycleStage 
                          title={simulationData.storage.title}
                          description={simulationData.storage.description}
                          icon={simulationData.storage.icon}
                          isActive={isSimulating && currentStage === 2}
                          isCompleted={currentStage > 2 || isSimulationOver}
                          onAnimationComplete={currentStage === 2 ? advanceStage : undefined}
                      />
                  </div>
                  <Arrow isActive={currentStage >= 3} />
                  <div className="w-full md:basis-1/4">
                    <CycleStage 
                        title={simulationData.output.title}
                        description={simulationData.output.description}
                        icon={simulationData.output.icon}
                        isActive={isSimulating && currentStage === 3}
                        isCompleted={isSimulationOver}
                        onAnimationComplete={currentStage === 3 ? advanceStage : undefined}
                    />
                  </div>
              </div>

              <div className="mt-8 flex justify-center">
                {!isSimulating && currentStage === -1 ? (
                   <button 
                     onClick={startSimulation}
                     className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90 text-slate-900 font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-200 hover:scale-105"
                   >
                     Démarrer la simulation
                   </button>
                ) : isSimulating ? (
                    <div className="text-lg text-violet-600 flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-t-violet-500 border-r-violet-500 border-b-violet-500 border-l-transparent rounded-full animate-spin"></div>
                      Simulation en cours...
                    </div>
                ) : (
                    <button 
                      onClick={resetSimulation}
                      className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-200 hover:scale-105"
                    >
                      Choisir une autre simulation
                    </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;