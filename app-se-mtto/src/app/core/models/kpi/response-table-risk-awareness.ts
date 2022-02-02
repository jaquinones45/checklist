import { TableRiskAwareness } from "./table-risk-awareness";

export interface ResponseTableRiskAwareness {
  activitiesExecuted: number;
  activitiesScheduled: number;
  riskAwareness: TableRiskAwareness[];
  totalPercentage: number;
}
