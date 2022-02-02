import { RiskLevel } from "./risk-level";

export interface ResponseRiskLevel {
  riskLevel: RiskLevel[];
  percentageVHigh: number;
  percentageMid: number;
  percentageLow: number;
  percentageHigh: number;
}
