import authModel from "../models/auth.model";

import _ from "lodash"

class authController {

  static async saveAuthLogin(
    email:any | undefined, 
    password:any | undefined, 
    rememberMe:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await authModel.saveAuthLoginDB(
          email, password, rememberMe
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveAuthLogin: ",error);
        reject(error);
      }
    })
  }

  static async getAuthLogout(
    users_id:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await authModel.getAuthLogoutDB(
          users_id 
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getAuthLogout: ",error);
        reject(error);
      }
    })
  }

}

export default authController;