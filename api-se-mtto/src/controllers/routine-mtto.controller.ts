import routineMttoModel from "../models/routine-mtto.model";

import _ from "lodash"

class routineMttoController {

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
}

export default routineMttoController;