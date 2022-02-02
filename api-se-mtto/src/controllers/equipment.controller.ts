import equipmentModel from "../models/equipment.model";

import _ from "lodash"

class equipmentController {

  static async getEquipment(
    name:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await equipmentModel.getEquipmentDB(
          name, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getEquipment: ",error);
        reject(error);
      }
    })
  }

  static async saveEquipment(
    name:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await equipmentModel.saveEquipmentDB(
          name, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveEquipment: ",error);
        reject(error);
      }
    })
  }

  static async updateEquipment(
    id:any | undefined, 
    name:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await equipmentModel.updateEquipmentDB(
          id, name, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateEquipment: ",error);
        reject(error);
      }
    })
  }

}

export default equipmentController;