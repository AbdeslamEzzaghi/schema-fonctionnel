export interface CycleStep {
  title: string;
  description: string;
  icon: string;
}

export interface SimulationCycle {
  input: CycleStep;
  processing: CycleStep;
  storage: CycleStep;
  output: CycleStep;
}

export interface Scenario {
  id: string;
  title: string;
  cycle: SimulationCycle;
}
