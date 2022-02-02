import { GraphShortCycleFindings } from "./graph-short-cycle-findings";
import { ShortCycleFindings } from "./short-cycle-findings";

export interface ResponseShortCycleFindings {
  shortCycleFindings: ShortCycleFindings[];
  percentage: number;
  graphShortCycleFindings: GraphShortCycleFindings[];
}
