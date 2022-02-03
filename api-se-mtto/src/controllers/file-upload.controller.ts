import fileUploadModel from "../models/file-upload.model";

import _ from "lodash"

class fileUploadController {

  static async saveFileUpload(
    client_id:any | undefined, 
    plan_id:any | undefined, 
    file:any | undefined, 
  ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await fileUploadModel.saveFileUploadDB(
          client_id, plan_id, file
        )
        resolve(res);
      } catch (error) {
        console.error("An error ocurred saveFileUpload: ",error);
        reject(error);
      }
    })
  }

}

export default fileUploadController;