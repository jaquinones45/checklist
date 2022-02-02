import { DataTableManagementIncorrectOpGroupByDate } from "./data-table-management-incorrect-op-group-by-date";
import { DataGraphManagementIncorrectOpGroupByDate } from "./data-graph-management-incorrect-op-group-by-date";

export interface ResponseTableManagementIncorrectOpGroupByDate {
  table: DataTableManagementIncorrectOpGroupByDate[];
  graph: DataGraphManagementIncorrectOpGroupByDate[];
  total: number;
  totalPercentage: number;
}
