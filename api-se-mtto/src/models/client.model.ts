import db from "../config/database";

class clientModel {

  static async getCountryNameDB(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            [country].id, 
            [country].name
          FROM [country]
          WHERE [country].deleted = 0 
          ORDER BY [country].id DESC
        `;
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getCountryNameDB: ", error);
        reject(error);
      }
    });
  }

  static async getClientDB(
    name:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            [client].id, 
            [client].name,
            [country].id AS country_id,
            [country].name AS country_name
          FROM [client]
          INNER JOIN [country] ON [country].id = [client].country_id
          WHERE [client].deleted = 0
            AND [country].deleted = 0 
            AND ${name 
              ? `[client].name LIKE '%${name}%'`
              : "[client].name IS NOT NULL"
            }
          ORDER BY [client].id DESC
        `;
        const result = await conn.query(query);
        
        const data:any = []
        await Promise.all(result.recordset.map(async (item:any) => {
          const count_plant = await this.queryCountClient(item.id, 'plant')
          const count_component = await this.queryCountClient(item.id, 'component')
          const count_equipment = await this.queryCountClient(item.id, 'equipment')

          data.push({
            id: item.id,
            name: item.name,
            country_id: item.name,
            country_name: item.country_name,
            count_plant: count_plant,
            count_component: count_component,
            count_equipment: count_equipment
          })
        }))
        // retornar los datos
        resolve(data);
      } catch (error) {
        console.error("An error ocurred getClientDB: ", error);
        reject(error);
      }
    });
  }

  static async saveClientDB(
    name: any | undefined,
    country_id: any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [client]
          WHERE name = '${name}'
            AND deleted = 0
        `
        const result_validate = await conn.query(validate);
        if (result_validate.recordset.length) result.error = `El nombre ${name} ya esta registrado`
        else {
          const query = `
            INSERT INTO [client] 
              (name, country_id) 
            VALUES 
              ('${name}', ${country_id})
          `
          await conn.query(query)
           
          result.message = `Se creo el usuario <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar los datos
        resolve(result);
      } catch (error) {
        console.error("An error ocurred saveClientDB: ", error);
        reject(error);
      }
    });
  }

  static async updateClientDB(
    id: any | undefined,
    name: any | undefined,
    country_id: any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [client]
          WHERE name = '${name}'
            AND deleted = 0
            AND id != ${id}
        `
        const result_validate = await conn.query(validate);

        if (result_validate.recordset.length) result.error = `El nombre <b>${name}</b> ya esta registrado`
        else {
          const query = `
            UPDATE [client] SET 
              name='${name}',
              country_id=${country_id}
            WHERE id = ${id}
          `
          await conn.query(query)
          
          result.message = `Se actualizo el usuario <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred updateClientDB: ", error);
        reject(error);
      }
    });
  }

  static async deleteClientDB(
    id: any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          UPDATE [client] SET 
            deleted='${new Date().getTime()}' 
          WHERE id = ${id}
        `
        await conn.query(query)
        // retornar los datos
        resolve("Se elimino el usuario exitosamente.");
      } catch (error) {
        console.error("An error ocurred deleteClientDB: ", error);
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
          FROM [client] AS us 
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

  static async queryCountClient(id:number, table:any) {
    const conn = await db.connect();
    const query = `
      SELECT
        COUNT(id) AS count
      FROM [${table}]
      WHERE client_id = ${id}
        AND deleted = 0
    `;
    const result = await conn.query(query);
    if (result.recordset) return result.recordset[0].count
    else return 0
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

export default clientModel;
