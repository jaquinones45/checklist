import { MechanicalIntegrity } from "./mechanical-integrity";

export interface ResponseMechanicalIntegrity {
  percentage: number;
  mechanicalIntegrity: MechanicalIntegrity[];
}
