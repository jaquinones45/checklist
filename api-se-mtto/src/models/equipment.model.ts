import db from "../config/database";

class equipmentModel {

  static async getEquipmentDB(
    name:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [equipment].id, 
            [equipment].name,
            [equipment].client_id
          FROM [equipment]
          WHERE [equipment].client_id = ${client_id}
            AND ${name 
              ? `[equipment].name LIKE '%${name}%'`
              : '[equipment].name IS NOT NULL'
            }
          ORDER BY [equipment].id DESC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getEquipmentDB: ", error);
        reject(error);
      }
    });
  }

  static async saveEquipmentDB(
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
          FROM [equipment]
          WHERE client_id = ${client_id}
            AND name = '${name}'
            AND deleted = 0
        `
        const result_validate = await conn.query(validate);
        if (result_validate.recordset.length) result.error = `El nombre ${name} ya esta registrado`
        else {
          const query = `
            INSERT INTO [equipment] 
              (name, client_id)
            VALUES
              ('${name}', ${client_id})
          `
          await conn.query(query);
          
          result.message = `Se creo el equipo <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred saveEquipmentDB: ", error);
        reject(error);
      }
    });
  }

  static async updateEquipmentDB(
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
          FROM [equipment]
          WHERE client_id = ${client_id}
            AND name = '${name}'
            AND deleted = 0
            AND id != ${id}
        `
        const result_validate = await conn.query(validate);

        if (result_validate.recordset.length) result.error = `El nombre <b>${name}</b> ya esta registrado`
        else {
          const query = `
            UPDATE [equipment] SET
              name = '${name}'
            WHERE id = ${id}
          `
          await conn.query(query);
          
          result.message = `Se actualizo el equipo <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred updateEquipmentDB: ", error);
        reject(error);
      }
    });
  }
}

export default equipmentModel;
