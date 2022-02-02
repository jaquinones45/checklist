import { TableIlicitas } from "./table-ilicitas";
import { TableIlicitasCerradas } from "./table-ilicitas-cerradas";
import { TableIlicitasIdentificadas } from "./table-ilicitas-identidicadas";

export interface ResponseTableIlicitas {
  percentage: number;
  tableIlicitas: TableIlicitas[];
  tableIlicitasPorDuctos: TableIlicitas[];
  tableIlicitasIdentificadas: TableIlicitasIdentificadas[];
  tableIlicitasCerradas: TableIlicitasCerradas[];
}
