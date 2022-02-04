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

  static async getSystemNameDB(
    plant_id:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [system].id,
            [type_system].name
          FROM [system]
          INNER JOIN [type_system] ON [type_system].id = [system].type_system_id
          WHERE [system].plant_id = ${plant_id}
            AND [system].deleted = 0
            AND [type_system].deleted = 0
          ORDER BY [type_system].name ASC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getSystemNameDB: ", error);
        reject(error);
      }
    });
  }
  static async getComponentNameDB(
    type_system_id:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [type_component_system].id,
            [type_component].name
          FROM [type_component_system]
          INNER JOIN [type_component] ON [type_component].id = [type_component_system].type_component_id
          WHERE [type_component_system].type_system_id = ${type_system_id}
          ORDER BY [type_component].name ASC
        `
        console.log(query)
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
    date:any | undefined, 
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [mtto_corrective].id,
            [mtto_corrective].responsable, 
            [mtto_corrective].date, 
            [mtto_corrective].hours, 
            [mtto_corrective].equipment, 
            [mtto_corrective].description, 
            [mtto_corrective].notes, 
            [mtto_corrective].plant_id,
            [plant].name AS plant_name,
            [plant].client_id,
            [type_component_system].id AS type_component_system_id,
            [type_component_system].type_component_id,
            [type_component].name AS type_component_name,
            [type_component_system].type_system_id,
            [type_system].name AS type_system_name
          FROM [mtto_corrective]
          INNER JOIN [plant] ON [plant].id = [mtto_corrective].plant_id
          INNER JOIN [type_component_system] ON [type_component_system].id = [mtto_corrective].type_component_system_id
          INNER JOIN [type_component] ON [type_component].id = [type_component_system].type_component_id
          INNER JOIN [type_system] ON [type_system].id = [type_component_system].type_system_id
          WHERE [mtto_corrective].client_id = ${client_id}
            AND ${description 
              ? `[mtto_corrective].description LIKE '%${description}%'`
              : '[mtto_corrective].description IS NOT NULL'
            }
            AND ${plant_id 
              ? `[mtto_corrective].plant_id = ${plant_id}`
              : '[mtto_corrective].plant_id IS NOT NULL'
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
    responsable:any | undefined,
    date:any | undefined,
    hours:any | undefined,
    description:any | undefined,
    notes:any | undefined,
    equipment:any | undefined,
    plant_id:any | undefined,
    type_component_system_id:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const query = `
          INSERT INTO [mtto_corrective] 
            (responsable, date, hours, description, notes, equipment, plant_id, type_component_system_id, client_id)
          VALUES
            ('${responsable}', '${this.convertDateTime(new Date(date))}', ${hours}, '${description}', '${notes}', '${equipment}', ${plant_id}, ${type_component_system_id}, ${client_id})
        `
        console.log(query)
        await conn.query(query);
        // retornar la respuesta
        resolve({ message: `Se creo el mantenimiento correctivo asignado a <b>${responsable}</b> exitosamente.`, success: true , error: '' });
      } catch (error) {
        console.error("An error ocurred saveMttoCorrectiveDB: ", error);
        reject(error);
      }
    });
  }

  static async updateMttoCorrectiveDB(
    id:any | undefined,
    responsable:any | undefined,
    date:any | undefined,
    hours:any | undefined,
    description:any | undefined,
    notes:any | undefined,
    equipment:any | undefined,
    plant_id:any | undefined,
    type_component_system_id:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const query = `
          UPDATE [mtto_corrective] SET
            responsable = '${responsable}',
            date = '${this.convertDateTime(new Date(date))}',
            hours = ${hours},
            description = '${description}',
            notes = '${notes}',
            equipment = '${equipment}',
            plant_id = ${plant_id},
            type_component_system_id = ${type_component_system_id},
            client_id = ${client_id}
          WHERE id = ${id}
        `
        console.log(query)
        await conn.query(query);
        // retornar la respuesta
        resolve({ message: `Se edito el mantenimiento correctivo asignado a <b>${responsable}</b> exitosamente.`, success: true , error: '' });
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
