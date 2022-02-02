import dashboardModel from "../models/dashboard.model";

import _ from "lodash"

class dashboardController {

  static async getTopSession(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await dashboardModel.getTopSessionDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTopSession: ",error);
        reject(error);
      }
    })
  }
}

export default dashboardController;