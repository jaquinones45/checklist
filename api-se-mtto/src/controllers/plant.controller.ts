import plantModel from "../models/plant.model";

import _ from "lodash"

class plantController {

  static async getPlant(
    name:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await plantModel.getPlantDB(
          name, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getPlant: ",error);
        reject(error);
      }
    })
  }

  static async savePlant(
    name:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await plantModel.savePlantDB(
          name, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred savePlant: ",error);
        reject(error);
      }
    })
  }

  static async updatePlant(
    id:any | undefined, 
    name:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await plantModel.updatePlantDB(
          id, name, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updatePlant: ",error);
        reject(error);
      }
    })
  }

}

export default plantController;