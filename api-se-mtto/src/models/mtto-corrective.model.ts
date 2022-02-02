import db from "../config/database";


class mttoCorrectiveModel {

  static async getPlantNameDB(
    client_id:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [plant].id,
            [plant].name
          FROM [plant]
          WHERE [plant].client_id = ${client_id}
          ORDER BY [plant].name ASC
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

  static async getEquipmentNameDB(
    client_id:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [equipment].id,
            [equipment].name
          FROM [equipment]
          WHERE [equipment].client_id = ${client_id}
            AND [equipment].deleted = 0
          ORDER BY [equipment].name ASC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getEquipmentNameDB: ", error);
        reject(error);
      }
    });
  }

  static async getMttoCorrectiveDB(
    description:any | undefined,
    plant_id:any | undefined,
    equipment_id:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [mtto_corrective].id, 
            [mtto_corrective].description, 
            [mtto_corrective].notes, 
            [mtto_corrective].hours, 
            [mtto_corrective].plant_id,
            [plant].name AS plant_name,
            [mtto_corrective].equipment_id,
            [equipment].name AS equipment_name,
            [plant].client_id
          FROM [mtto_corrective]
          INNER JOIN [plant] ON [plant].id = [mtto_corrective].plant_id
          INNER JOIN [equipment] ON [equipment].id = [mtto_corrective].equipment_id
          WHERE [mtto_corrective].client_id = ${client_id}
            AND ${description 
              ? `[mtto_corrective].description LIKE '%${description}%'`
              : '[mtto_corrective].description IS NOT NULL'
            }
            AND ${plant_id 
              ? `[mtto_corrective].plant_id = ${plant_id}`
              : '[mtto_corrective].plant_id IS NOT NULL'
            }
            AND ${plant_id 
              ? `[mtto_corrective].equipment_id = ${equipment_id}`
              : '[mtto_corrective].equipment_id IS NOT NULL'
            }
          ORDER BY [mtto_corrective].id DESC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getMttoCorrectiveDB: ", error);
        reject(error);
      }
    });
  }

  static async saveMttoCorrectiveDB(
    description:any | undefined,
    notes:any | undefined,
    hours:any | undefined,
    plant_id:any | undefined,
    equipment_id:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const query = `
          INSERT INTO [mtto_corrective] 
            (description, notes, hours, plant_id, equipment_id, client_id)
          VALUES
            ('${description}', '${notes}', ${hours}, ${plant_id}, ${equipment_id}, ${client_id})
        `
        await conn.query(query);
        // retornar la respuesta
        resolve({ message: `Se creo el mantenimiento correctivo exitosamente.`, success: true , error: '' });
      } catch (error) {
        console.error("An error ocurred saveMttoCorrectiveDB: ", error);
        reject(error);
      }
    });
  }

  static async updateMttoCorrectiveDB(
    id:any | undefined,
    description:any | undefined,
    notes:any | undefined,
    hours:any | undefined,
    plant_id:any | undefined,
    equipment_id:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const query = `
          UPDATE [mtto_corrective] SET
            description = '${description}',
            notes = '${notes}',
            hours = ${hours},
            plant_id = ${plant_id},
            equipment_id = ${equipment_id},
            client_id = ${client_id}
          WHERE id = ${id}
        `
        await conn.query(query);
        // retornar la respuesta
        resolve({ message: `Se edito el mantenimiento correctivo exitosamente.`, success: true , error: '' });
      } catch (error) {
        console.error("An error ocurred updateMttoCorrectiveDB: ", error);
        reject(error);
      }
    });
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

export default mttoCorrectiveModel;
