import { Filter } from "./filter";

export interface ResponseFilters {
  stations: Filter[];
  types: Filter[];
  notes: Filter[];
  equipos: Filter[];
}
