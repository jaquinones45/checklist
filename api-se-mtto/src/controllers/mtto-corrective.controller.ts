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

  static async getSystemName(
    plant_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttoCorrectiveModel.getSystemNameDB(
          plant_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getSystemName: ",error);
        reject(error);
      }
    })
  }

  static async getComponentName(
    type_system_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttoCorrectiveModel.getComponentNameDB(
          type_system_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getComponentName: ",error);
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
    description:any | undefined, 
    plant_id:any | undefined, 
    date:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttoCorrectiveModel.getMttoCorrectiveDB(
          description, plant_id, date, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getMttoCorrective: ",error);
        reject(error);
      }
    })
  }

  static async saveMttoCorrective(
    responsable:any | undefined,
    date:any | undefined,
    hours:any | undefined,
    description:any | undefined,
    notes:any | undefined,
    equipment:any | undefined,
    plant_id:any | undefined,
    type_component_system_id:any | undefined,
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttoCorrectiveModel.saveMttoCorrectiveDB(
          responsable, date, hours, description, notes, equipment, plant_id, type_component_system_id, client_id
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
    responsable:any | undefined,
    date:any | undefined,
    hours:any | undefined,
    description:any | undefined,
    notes:any | undefined,
    equipment:any | undefined,
    plant_id:any | undefined,
    type_component_system_id:any | undefined,
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttoCorrectiveModel.updateMttoCorrectiveDB(
          id, responsable, date, hours, description, notes, equipment, plant_id, type_component_system_id, client_id
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