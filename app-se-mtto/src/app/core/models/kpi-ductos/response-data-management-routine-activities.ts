import { DataManagementRoutineActivities } from "./data-management-routine-activities";

export interface ResponseDataManagementRoutineActivities {
  dataManagementRoutineActivities: DataManagementRoutineActivities[];
  scheduledOrders: number;
  closedOrders: number;
  percentagesRoutineActivities: number;
}
