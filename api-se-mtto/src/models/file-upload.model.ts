import db from "../config/database";

class fileUploadModel {

  static async saveFileUploadDB(
    client_id:any | undefined, 
    plant_id:any | undefined, 
    file:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
      
        // retornar los datos
        resolve(true);
      } catch (error) {
        console.error("An error ocurred ∫: ", error);
        reject(error);
      }
    });
  }
}

export default fileUploadModel;
