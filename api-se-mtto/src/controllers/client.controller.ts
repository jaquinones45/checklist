import clientModel from "../models/client.model";

import _ from "lodash"

class clientController {

  static async getCountryName(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await clientModel.getCountryNameDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getCountryName: ",error);
        reject(error);
      }
    })
  }

  static async getClient(
    name:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await clientModel.getClientDB(
          name
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getClient: ",error);
        reject(error);
      }
    })
  }

  static async saveClient(
    name: any | undefined,
    country_id: any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await clientModel.saveClientDB(
          name, country_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getEventSegment: ",error);
        reject(error);
      }
    })
  }

  static async updateClient(
    id: any | undefined,
    name: any | undefined,
    country_id: any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await clientModel.updateClientDB(
          id, name, country_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateClient: ",error);
        reject(error);
      }
    })
  }

  static async deleteClient(
    id: any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await clientModel.deleteClientDB(
          id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred deleteClient: ",error);
        reject(error);
      }
    })
  }

  static async getSelectAll(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await clientModel.getSelectAllDB()

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getSelectAll: ",error);
        reject(error);
      }
    })
  }

}

export default clientController;