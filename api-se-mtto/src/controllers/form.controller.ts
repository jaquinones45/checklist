import formModel from "../models/form.model";

import _ from "lodash"

class formController {

  static async getTypeComponentName(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await formModel.getTypeComponentNameDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTypeComponentName: ",error);
        reject(error);
      }
    })
  }

  static async getCountryName(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await formModel.getCountryNameDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getCountryNameDB: ",error);
        reject(error);
      }
    })
  }

  static async getOneForm(
    id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await formModel.getOneFormDB(
          id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getOneForm: ",error);
        reject(error);
      }
    })
  }

  static async getForm(
    name:any | undefined, 
    country_id:any | undefined, 
    type_component_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await formModel.getFormDB(
          name, country_id, type_component_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getForm: ",error);
        reject(error);
      }
    })
  }

  static async saveForm(
    name:any | undefined, 
    country_id:any | undefined, 
    type_component_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await formModel.saveFormDB(
          name, country_id, type_component_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveForm: ",error);
        reject(error);
      }
    })
  }

  static async updateForm(
    id:any | undefined, 
    name:any | undefined, 
    country_id:any | undefined, 
    type_component_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await formModel.updateFormDB(
          id, name, country_id, type_component_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateForm: ",error);
        reject(error);
      }
    })
  }

}

export default formController;