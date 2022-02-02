import typeComponentModel from "../models/type-component.model";

import _ from "lodash"

class typeComponentController {

  static async getTypeComponent(
    name:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeComponentModel.getTypeComponentDB(
          name
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTypeComponent: ",error);
        reject(error);
      }
    })
  }

  static async saveTypeComponent(
    name:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeComponentModel.saveTypeComponentDB(
          name
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveTypeComponent: ",error);
        reject(error);
      }
    })
  }

  static async updateTypeComponent(
    id:any | undefined, 
    name:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await typeComponentModel.updateTypeComponentDB(
          id, name
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateTypeComponent: ",error);
        reject(error);
      }
    })
  }

}

export default typeComponentController;