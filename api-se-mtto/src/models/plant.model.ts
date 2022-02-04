import db from "../config/database";

class plantModel {

  static async getPlantDB(
    name:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [plant].id, 
            [plant].name,
            [plant].client_id
          FROM [plant]
          WHERE [plant].client_id = ${client_id}
            AND ${name 
              ? `[plant].name LIKE '%${name}%'`
              : '[plant].name IS NOT NULL'
            }
          ORDER BY [plant].id DESC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getPlantDB: ", error);
        reject(error);
      }
    });
  }

  static async savePlantDB(
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
          FROM [plant]
          WHERE client_id = ${client_id}
            AND name = '${name}'
            AND deleted = 0
        `
        const result_validate = await conn.query(validate);
        if (result_validate.recordset.length) result.error = `El nombre <b>${name}</b> ya esta registrado`
        else {
          const query = `
            INSERT INTO [plant] 
              (name, client_id)
            VALUES
              ('${name}', ${client_id})
          `
          await conn.query(query);

          result.message = `Se creo la planta <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred savePlantDB: ", error);
        reject(error);
      }
    });
  }

  static async updatePlantDB(
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
          FROM [plant]
          WHERE client_id = ${client_id}
            AND name = '${name}'
            AND deleted = 0
            AND id != ${id}
        `
        const result_validate = await conn.query(validate);

        if (result_validate.recordset.length) result.error = `El nombre <b>${name}</b> ya esta registrado`
        else {
          const query = `
            UPDATE [plant] SET
              name = '${name}'
            WHERE id = ${id}
          `
          await conn.query(query);

          result.message = `Se actualizo la planta <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred updatePlantDB: ", error);
        reject(error);
      }
    });
  }
}

export default plantModel;
