import usersModel from "../models/users.model";

import _ from "lodash"

class usersController {

  static async getUser(
    search:any | undefined, 
    role_id:any | undefined, 
    position_id:any | undefined, 
    users_id:any | undefined, 
    turn_id:any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await usersModel.getUserDB(
          search, role_id, position_id, users_id, turn_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getUser: ",error);
        reject(error);
      }
    })
  }

  static async saveUser(
    name: any | undefined,
    email: any | undefined,
    password: any | undefined, 
    phone: any | undefined,
    status: any | undefined,
    role_id: any | undefined,
    position_id: any | undefined,
    users_id: any | undefined,
    turn_id: any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await usersModel.saveUserDB(
          name, email, password, phone, status, role_id, position_id, users_id, turn_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getEventSegment: ",error);
        reject(error);
      }
    })
  }

  static async updateUser(
    id: any | undefined,
    name: any | undefined,
    email: any | undefined,
    password: any | undefined, 
    phone: any | undefined,
    status: any | undefined,
    role_id: any | undefined,
    position_id: any | undefined,
    users_id: any | undefined,
    turn_id: any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await usersModel.updateUserDB(
          id, name, email, password, phone, status, role_id, position_id, users_id, turn_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred updateUser: ",error);
        reject(error);
      }
    })
  }

  static async deleteUser(
    id: any | undefined,
    users_id: any | undefined,
    turn_id: any | undefined,
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await usersModel.deleteUserDB(
          id, users_id, turn_id
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred deleteUser: ",error);
        reject(error);
      }
    })
  }

  static async getSelectAll(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await usersModel.getSelectAllDB()

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getSelectAll: ",error);
        reject(error);
      }
    })
  }

}

export default usersController;