import { CostoRiesgoActual } from "./consto-riesgo-actual";

export interface ResponseCostoRiesgoActual {
  costoRiesgoActual: CostoRiesgoActual[];
  lineOutTargetTotal: number;
  totalAllLines: number;
}
