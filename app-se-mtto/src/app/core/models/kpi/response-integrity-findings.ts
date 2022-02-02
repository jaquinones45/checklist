import { IntegrityFindings } from "./integrity-findings";

export interface ResponseIntegrityFindings {
  integrityFindings: IntegrityFindings[];
  totalInspection: number;
  totalIntegrity: number;
  totalMaintenance: number;
  totalReg: number;
}
