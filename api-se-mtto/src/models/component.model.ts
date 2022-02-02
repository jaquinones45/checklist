import db from "../config/database";

class componentModel {

  static async getComponentDB(
    name:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [component].id, 
            [component].name,
            [component].client_id
          FROM [component]
          WHERE [component].client_id = ${client_id}
            AND ${name 
              ? `[component].name LIKE '%${name}%'`
              : '[component].name IS NOT NULL'
            }
          ORDER BY [component].id DESC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getComponentDB: ", error);
        reject(error);
      }
    });
  }

  static async saveComponentDB(
    name:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [component]
          WHERE client_id = ${client_id}
            AND name = '${name}'
            AND deleted = 0
        `
        const result_validate = await conn.query(validate);
        if (result_validate.recordset.length) result.error = `El nombre ${name} ya esta registrado`
        else {
          const query = `
            INSERT INTO [component] 
              (name, client_id)
            VALUES
              ('${name}', ${client_id})
          `
          await conn.query(query);
          
          result.message = `Se creo el componente <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred saveComponentDB: ", error);
        reject(error);
      }
    });
  }

  static async updateComponentDB(
    id:any | undefined,
    name:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [component]
          WHERE client_id = ${client_id}
            AND name = '${name}'
            AND deleted = 0
            AND id != ${id}
        `
        const result_validate = await conn.query(validate);

        if (result_validate.recordset.length) result.error = `El nombre <b>${name}</b> ya esta registrado`
        else {
          const query = `
            UPDATE [component] SET
              name = '${name}'
            WHERE id = ${id}
          `
          await conn.query(query);
          
          result.message = `Se actualizo el componente <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred updateComponentDB: ", error);
        reject(error);
      }
    });
  }
}

export default componentModel;
