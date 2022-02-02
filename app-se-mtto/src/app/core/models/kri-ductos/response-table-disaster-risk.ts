import { DataTableDisasterRisk } from "./data-table-disaster-risk";

export interface ResponseTableDisasterRisk {
  table: DataTableDisasterRisk[];
  totalPercentageMayor: number;
  totalPercentageMenor: number;
}
