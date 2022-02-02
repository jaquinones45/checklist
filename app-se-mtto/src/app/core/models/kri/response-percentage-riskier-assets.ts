import { PercentageRiskierAssets } from "./percentage-riskier-assets";
import { TableRisk } from "./table-risk";

export interface ResponsePercentageRiskierAssets {
  percentageRiskierAssets: PercentageRiskierAssets[];
  accomplish: number;
  tableRisk: TableRisk[];
  totalRiskUsdYr: number;
}
