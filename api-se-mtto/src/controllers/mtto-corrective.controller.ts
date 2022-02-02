import mttoCorrectiveModel from "../models/mtto-corrective.model";

import _ from "lodash"

class mttoCorrectiveController {

  static async getPlantName(
    client_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttoCorrectiveModel.getPlantNameDB(
          client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getPlant: ",error);
        reject(error);
      }
    })
  }

  static async getEquipmentName(
    client_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttoCorrectiveModel.getEquipmentNameDB(
          client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getEquipmentName: ",error);
        reject(error);
      }
    })
  }

  static async getMttoCorrective(
    name:any | undefined, 
    plant_id:any | undefined, 
    date:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttoCorrectiveModel.getMttoCorrectiveDB(
          name, plant_id, date, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getMttoCorrective: ",error);
        reject(error);
      }
    })
  }

  static async saveMttoCorrective(
    description:any | undefined,
    notes:any | undefined,
    hours:any | undefined,
    plant_id:any | undefined,
    equipment_id:any | undefined,
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttoCorrectiveModel.saveMttoCorrectiveDB(
          description, notes, hours, plant_id, equipment_id, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveMttoCorrective: ",error);
        reject(error);
      }
    })
  }

  static async updateMttoCorrective(
    id:any | undefined, 
    description:any | undefined,
    notes:any | undefined,
    hours:any | undefined,
    plant_id:any | undefined,
    equipment_id:any | undefined,
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttoCorrectiveModel.updateMttoCorrectiveDB(
          id, description, notes, hours, plant_id, equipment_id, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateMttoCorrective: ",error);
        reject(error);
      }
    })
  }

}

export default mttoCorrectiveController;