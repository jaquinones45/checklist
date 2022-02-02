import countryModel from "../models/country.model";

import _ from "lodash"

class countryController {

  static async getCountry(
    name:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await countryModel.getCountryDB(
          name
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getCountry: ",error);
        reject(error);
      }
    })
  }

  static async saveCountry(
    name:any | undefined, 
    alias:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await countryModel.saveCountryDB(
          name, alias
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveCountry: ",error);
        reject(error);
      }
    })
  }

  static async updateCountry(
    id:any | undefined,
    name:any | undefined,
    alias:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await countryModel.updateCountryDB(
          id, name, alias
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateCountry: ",error);
        reject(error);
      }
    })
  }

}

export default countryController;