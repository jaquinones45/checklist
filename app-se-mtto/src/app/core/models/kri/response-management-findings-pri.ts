import { FindingsByGroup } from "./findings-by-group";
import { ManagementFindingsPri } from "./management-findings-pri";
export interface ResponseManagementFindingsPri {
  managementFindingsPri: ManagementFindingsPri[];
  totalAllFindings: number;
  totalManagedFindings: number;
  totalPercentage: number;
  findingsByGroup: FindingsByGroup[]
}
