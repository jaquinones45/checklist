import { StaticEquipmentMaintenance } from "./static-equipment-maintenance";

export interface ResponseStaticEquipmentMaintenance {
  staticEquipmentMaintenance: StaticEquipmentMaintenance[];
  totalOrdersClosed: number;
  totalOrdersCreated: number;
  totalPercentage: number;
}
