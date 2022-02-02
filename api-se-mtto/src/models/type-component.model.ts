import db from "../config/database";

class typeComponentModel {

  static async getTypeComponentDB(
    name:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [type_component].id, 
            [type_component].name
          FROM [type_component]
          WHERE 1 = 1
            AND ${name 
              ? `[type_component].name LIKE '%${name}%'`
              : '[type_component].name IS NOT NULL'
            }
          ORDER BY [type_component].id DESC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTypeComponentDB: ", error);
        reject(error);
      }
    });
  }

  static async saveTypeComponentDB(
    name:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [type_component]
          WHERE name = '${name}'
            AND deleted = 0
        `
        const result_validate = await conn.query(validate);
        if (result_validate.recordset.length) result.error = `El nombre ${name} ya esta registrado`
        else {
          const query = `
            INSERT INTO [type_component]
              (name)
            VALUES
              ('${name}')
          `
          await conn.query(query);
          
          result.message = `Se creo el componente <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred saveTypeComponentDB: ", error);
        reject(error);
      }
    });
  }

  static async updateTypeComponentDB(
    id:any | undefined,
    name:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [type_component]
          WHERE name = '${name}'
            AND deleted = 0
            AND id != ${id}
        `
        const result_validate = await conn.query(validate);

        if (result_validate.recordset.length) result.error = `El nombre <b>${name}</b> ya esta registrado`
        else {
          const query = `
            UPDATE [type_component] SET
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
        console.error("An error ocurred updateTypeComponentDB: ", error);
        reject(error);
      }
    });
  }
}

export default typeComponentModel;
