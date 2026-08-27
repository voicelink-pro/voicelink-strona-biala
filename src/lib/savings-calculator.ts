export const HOURS_PER_FTE_MONTH = 168;
export const TARGET_NO_SHOW_RATE = 3;

export type ScenarioId = "conservative" | "realistic" | "maximal";

export interface ScenarioAssumptions {
  id: ScenarioId;
  label: string;
  description: string;
  aiTakeover: number;
}

export const SCENARIOS: Record<ScenarioId, ScenarioAssumptions> = {
  conservative: {
    id: "conservative",
    label: "Konserwatywny",
    description: "VoiceLink przejmuje 60% rozmów. No-show spada do 3%.",
    aiTakeover: 60,
  },
  realistic: {
    id: "realistic",
    label: "Realistyczny",
    description: "VoiceLink przejmuje 85% rozmów. No-show spada do 3%.",
    aiTakeover: 85,
  },
  maximal: {
    id: "maximal",
    label: "Maksymalny",
    description: "VoiceLink przejmuje 99% rozmów. No-show spada do 3%.",
    aiTakeover: 99,
  },
};

export const DEFAULT_CALCULATOR_INPUTS: CalculatorInputs = {
  dailyCalls: 50,
  avgCallMinutes: 5,
  workDays: 22,
  monthlyVisits: 600,
  employees: 2,
  employerCost: 7500,
  noShowRate: 20,
  visitValue: 200,
  aiTakeover: SCENARIOS.realistic.aiTakeover,
};

export interface CalculatorInputs {
  dailyCalls: number;
  avgCallMinutes: number;
  workDays: number;
  monthlyVisits: number;
  employees: number;
  employerCost: number;
  noShowRate: number;
  aiTakeover: number;
  visitValue: number;
}

export interface CalculatorResults {
  monthlyCallMinutes: number;
  monthlyCallHours: number;
  recoveredHours: number;
  fteEquivalent: number;
  totalReceptionHours: number;
  hourlyCost: number;
  costPerCall: number;
  timeValue: number;
  lostVisits: number;
  recoveredVisits: number;
  noShowLoss: number;
  recoveredRevenue: number;
  economicEffectMonthly: number;
  economicEffectYearly: number;
}

export function calculateSavings(input: CalculatorInputs): CalculatorResults {
  const monthlyCallMinutes = input.dailyCalls * input.avgCallMinutes * input.workDays;
  const monthlyCallHours = monthlyCallMinutes / 60;
  const recoveredHours = monthlyCallHours * (input.aiTakeover / 100);
  const fteEquivalent = recoveredHours / HOURS_PER_FTE_MONTH;

  const totalReceptionHours = input.employees * HOURS_PER_FTE_MONTH;
  const hourlyCost =
    totalReceptionHours > 0 ? (input.employees * input.employerCost) / totalReceptionHours : 0;
  const costPerCall = (hourlyCost / 60) * input.avgCallMinutes;

  const timeValue = recoveredHours * hourlyCost;

  const lostVisits = input.monthlyVisits * (input.noShowRate / 100);
  const remainingNoShowVisits = input.monthlyVisits * (TARGET_NO_SHOW_RATE / 100);
  const recoveredVisits = Math.max(0, lostVisits - remainingNoShowVisits);
  const noShowLoss = lostVisits * input.visitValue;
  const recoveredRevenue = recoveredVisits * input.visitValue;

  const economicEffectMonthly = timeValue + recoveredRevenue;
  const economicEffectYearly = economicEffectMonthly * 12;

  return {
    monthlyCallMinutes,
    monthlyCallHours,
    recoveredHours,
    fteEquivalent,
    totalReceptionHours,
    hourlyCost,
    costPerCall,
    timeValue,
    lostVisits,
    recoveredVisits,
    noShowLoss,
    recoveredRevenue,
    economicEffectMonthly,
    economicEffectYearly,
  };
}

export function matchScenario(aiTakeover: number): ScenarioId | "custom" {
  const match = Object.values(SCENARIOS).find((scenario) => scenario.aiTakeover === aiTakeover);
  return match?.id ?? "custom";
}
