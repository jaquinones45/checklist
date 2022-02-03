import componentModel from "../models/component.model";

import _ from "lodash"

class componentController {

  static async getComponent(
    name:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await componentModel.getComponentDB(
          name, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getComponent: ",error);
        reject(error);
      }
    })
  }

  static async getTypeComponentName(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await componentModel.getTypeComponentNameDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTypeComponentName: ",error);
        reject(error);
      }
    })
  }

  static async saveComponent(
    name:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await componentModel.saveComponentDB(
          name, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveComponent: ",error);
        reject(error);
      }
    })
  }

  static async updateComponent(
    id:any | undefined, 
    name:any | undefined, 
    client_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await componentModel.updateComponentDB(
          id, name, client_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateComponent: ",error);
        reject(error);
      }
    })
  }

}

export default componentController;