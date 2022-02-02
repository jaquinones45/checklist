import db from "../config/database";

class countryModel {

  static async getCountryDB(
    name:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [country].id, 
            [country].name,
            [country].alias
          FROM [country]
          WHERE 1 = 1
            AND ${name 
              ? `[country].name LIKE '%${name}%'`
              : '[country].name IS NOT NULL'
            }
          ORDER BY [country].id DESC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getCountryDB: ", error);
        reject(error);
      }
    });
  }

  static async saveCountryDB(
    name:any | undefined,
    alias:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [country]
          WHERE name = '${name}'
            AND deleted = 0
        `
        const result_validate = await conn.query(validate);
        if (result_validate.recordset.length) result.error = `El nombre ${name} ya esta registrado`
        else {
          const query = `
            INSERT INTO [country] 
              (name, alias)
            VALUES
              ('${name}', '${alias}')
          `
          await conn.query(query);
          
          result.message = `Se creo el país <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred saveCountryDB: ", error);
        reject(error);
      }
    });
  }

  static async updateCountryDB(
    id:any | undefined,
    name:any | undefined,
    alias:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [country]
          WHERE name = '${name}'
            AND deleted = 0
            AND id != ${id}
        `
        const result_validate = await conn.query(validate);

        if (result_validate.recordset.length) result.error = `El nombre <b>${name}</b> ya esta registrado`
        else {
          const query = `
            UPDATE [country] SET
              name = '${name}',
              alias = '${alias}'
            WHERE id = ${id}
          `
          await conn.query(query);
          
          result.message = `Se actualizo el país <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred updateCountryDB: ", error);
        reject(error);
      }
    });
  }
}

export default countryModel;
