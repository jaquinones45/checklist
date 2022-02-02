export interface ResponseHistory {
  nombre_estacion: string;
  nombre_equipo: string;
  disponibilidad: number;
  confiabilidad: number;
  disp_marcha: number;
  his_disponibilidad: His[];
  his_confiabilidad: His[];
  his_disp_marcha: His[];
}

export interface His {
  date: Date;
  value: number;
}
