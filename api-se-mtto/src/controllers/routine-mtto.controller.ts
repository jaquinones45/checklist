import routineMttoModel from "../models/routine-mtto.model";

import _ from "lodash"

class routineMttoController {

  static async getPlant(
    client_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await routineMttoModel.getPlantDB(
          client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getPlant: ",error);
        reject(error);
      }
    })
  }

  static async getTypeSystem(
    client_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await routineMttoModel.getTypeSystemDB(
          client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTypeSystem: ",error);
        reject(error);
      }
    })
  }

  static async getRoutineMtto(
    name:any | undefined, 
    plant_id:any | undefined, 
    date:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await routineMttoModel.getRoutineMttoDB(
          name, plant_id, date, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getRoutineMtto: ",error);
        reject(error);
      }
    })
  }

  static async getRoutineMttoRevision(
    type_system_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await routineMttoModel.getRoutineMttoRevisionDB(
          type_system_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getRoutineMttoRevision: ",error);
        reject(error);
      }
    })
  }

  static async getOneRoutineMttoRevision(
    revision_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await routineMttoModel.getOneRoutineMttoRevisionDB(
          revision_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getOneRoutineMttoRevision: ",error);
        reject(error);
      }
    })
  }

  static async saveRoutineMtto(
    name:any | undefined, 
    plant_id:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await routineMttoModel.saveRoutineMttoDB(
          name, plant_id, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveRoutineMtto: ",error);
        reject(error);
      }
    })
  }

  static async saveRoutineMttoRevision(
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
        const res = await routineMttoModel.saveRoutineMttoRevisionDB(
          responsable, date, hours, status, type_system_id, component_id, form_id, questions
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveRoutineMtto: ",error);
        reject(error);
      }
    })
  }

  static async updateRoutineMtto(
    id:any | undefined, 
    name:any | undefined, 
    plant_id:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await routineMttoModel.updateRoutineMttoDB(
          id, name, plant_id, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateRoutineMtto: ",error);
        reject(error);
      }
    })
  }

  static async updateRoutineMttoRevision(
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
        const res = await routineMttoModel.updateRoutineMttoRevisionDB(
          id, responsable, date, hours, status, type_system_id, component_id, form_id, questions
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateRoutineMttoRevision: ",error);
        reject(error);
      }
    })
  }

}

export default routineMttoController;