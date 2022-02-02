import db from "../config/database";

class usersModel {

  static async getUserDB(
    search:any | undefined, 
    role_id:any | undefined, 
    position_id:any | undefined, 
    users_id:any | undefined, 
    turn_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            us.id, 
            us.name, 
            us.email, 
            us.phone, 
            us.status, 
            us.role_id, 
            ro.name AS role, 
            us.position_id, 
            po.name AS position 
          FROM [users] AS us 
          INNER JOIN [role] AS ro ON ro.id = us.role_id 
          LEFT JOIN [position] AS po ON po.id = us.position_id 
          WHERE us.deleted = 0 
            AND ro.deleted = 0
            AND ${search 
              ? `us.name LIKE '%${search}%'`
              : "us.name IS NOT NULL"
            }
            AND ${role_id 
              ? `us.role_id = ${role_id}`
              : "us.role_id IS NOT NULL"
            }
            ${position_id 
              ? `AND us.position_id = ${position_id}`
              : ""
            }
          ORDER BY us.id DESC
        `;
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getUserDB: ", error);
        reject(error);
      }
    });
  }

  static async saveUserDB(
    name: any | undefined,
    email: any | undefined,
    password: any | undefined, 
    phone: any | undefined,
    status: any | undefined,
    role_id: any | undefined,
    position_id: any | undefined,
    users_id: any | undefined,
    turn_id: any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          INSERT INTO [users] 
            (name,email,password,phone,status,deleted,role_id,position_id) 
          VALUES 
            ('${name}','${email}','${password}','${phone}',${(status ? 1 : 0)}, 0, ${role_id}, '${position_id}')
        `
        await conn.query(query)
        // retornar los datos
        resolve("Se creo el usuario exitosamente.");
      } catch (error) {
        console.error("An error ocurred saveUserDB: ", error);
        reject(error);
      }
    });
  }

  static async updateUserDB(
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
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        let pass = ''
        if (password) pass = ` password='${password}',`
        const query = `
          UPDATE [users] SET 
            name='${name}', 
            email='${email}', 
            ${pass}
            phone='${phone}', 
            status='${status}', 
            role_id=${role_id}, 
            position_id=${position_id} 
          WHERE id = ${id}
        `
        await conn.query(query)
        // retornar los datos
        resolve("Se actualizo el usuario exitosamente.");
      } catch (error) {
        console.error("An error ocurred updateUserDB: ", error);
        reject(error);
      }
    });
  }

  static async deleteUserDB(
    id: any | undefined,
    users_id: any | undefined,
    turn_id: any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          UPDATE [users] SET 
            deleted='${new Date().getTime()}' 
          WHERE id = ${id}
        `
        await conn.query(query)
        // retornar los datos
        resolve("Se elimino el usuario exitosamente.");
      } catch (error) {
        console.error("An error ocurred deleteUserDB: ", error);
        reject(error);
      }
    });
  }
  
  static async getSelectAllDB(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            us.id, 
            us.name
          FROM [users] AS us 
          INNER JOIN [role] AS ro ON ro.id = us.role_id 
          WHERE us.status = 1 
            AND ro.status = 1
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getSelectAllDB: ", error);
        reject(error);
      }
    });
  }

  static convertDateTimeStartEnd(timestamp: any, type: any) {
    let date = new Date(parseInt(timestamp));
    if (type == "start")
      return (
        date.getFullYear() +
        "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + date.getDate()).slice(-2) +
        " 00:00:00.000"
      );
    if (type == "end")
      return (
        date.getFullYear() +
        "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + date.getDate()).slice(-2) +
        " 23:59:59.000"
      );
  }

  static convertDateTime(date: Date) {
    return (
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2)
    );
  }
}

export default usersModel;
