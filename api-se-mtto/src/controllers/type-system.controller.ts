import typeSystemModel from "../models/type-system.model";

import _ from "lodash"

class typeSystemController {

  static async getPlantName(
    client_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeSystemModel.getPlantNameDB(
          client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getPlant: ",error);
        reject(error);
      }
    })
  }

  static async getTypeSystemName(
    client_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeSystemModel.getTypeSystemNameDB(
          client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTypeSystem: ",error);
        reject(error);
      }
    })
  }

  static async getTypeSystem(
    name:any | undefined, 
    plant_id:any | undefined, 
    date:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeSystemModel.getTypeSystemDB(
          name, plant_id, date, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTypeSystem: ",error);
        reject(error);
      }
    })
  }

  static async getTypeSystemRevision(
    type_system_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeSystemModel.getTypeSystemRevisionDB(
          type_system_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTypeSystemRevision: ",error);
        reject(error);
      }
    })
  }

  static async getOneTypeSystemRevision(
    revision_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeSystemModel.getOneTypeSystemRevisionDB(
          revision_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getOneTypeSystemRevision: ",error);
        reject(error);
      }
    })
  }

  static async saveTypeSystem(
    name:any | undefined, 
    plant_id:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeSystemModel.saveTypeSystemDB(
          name, plant_id, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveTypeSystem: ",error);
        reject(error);
      }
    })
  }

  static async saveTypeSystemRevision(
    responsable:any | undefined,
    date:any | undefined,
    hours:any | undefined,
    status:any | undefined,
    type_system_id:any | undefined,
    component_id:any | undefined, 
    form_id:any | undefined,
    questions:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeSystemModel.saveTypeSystemRevisionDB(
          responsable, date, hours, status, type_system_id, component_id, form_id, questions
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveTypeSystem: ",error);
        reject(error);
      }
    })
  }

  static async updateTypeSystem(
    id:any | undefined, 
    name:any | undefined, 
    plant_id:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeSystemModel.updateTypeSystemDB(
          id, name, plant_id, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateTypeSystem: ",error);
        reject(error);
      }
    })
  }

  static async updateTypeSystemRevision(
    id:any | undefined,
    responsable:any | undefined,
    date:any | undefined,
    hours:any | undefined,
    status:any | undefined,
    type_system_id:any | undefined,
    component_id:any | undefined, 
    form_id:any | undefined,
    questions:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeSystemModel.updateTypeSystemRevisionDB(
          id, responsable, date, hours, status, type_system_id, component_id, form_id, questions
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateTypeSystemRevision: ",error);
        reject(error);
      }
    })
  }

}

export default typeSystemController;