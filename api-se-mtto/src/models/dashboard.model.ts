import db from "../config/database";

class dashboardModel {

  static async getTopSessionDB(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = ``;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getUsersDB: ", error);
        reject(error);
      }
    });
  }
}

export default dashboardModel;
