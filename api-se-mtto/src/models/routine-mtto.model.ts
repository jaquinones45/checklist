import db from "../config/database";

import lodash from "lodash";

class routineMttoModel {

  static async getRoutineMttoDB(
    name:any | undefined, 
    plant_id:any | undefined, 
    date:any | undefined, 
    client_id:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [revision].id, 
            [type_system].name, 
            [system].quantity_revision, 
            [system].last_date, 
            [plant].id AS plant_id,
            [plant].name AS planta_name,
            [plant].client_id,
            [revision].responsable,
            [revision].date,
            [revision].hours,
            [revision].status,
            [revision].form_id,
            [form].name AS form_name
          FROM [revision]
          INNER JOIN [system] ON [system].id = [revision].system_id
          INNER JOIN [type_system] ON [type_system].id = [system].type_system_id
          INNER JOIN [plant] ON [plant].id = [system].plant_id
          INNER JOIN [form] ON [form].id = [revision].form_id
          WHERE [plant].client_id = ${client_id}
            AND ${name 
              ? `[type_system].name LIKE '%${name}%'`
              : '[type_system].name IS NOT NULL'
            }
            AND ${plant_id 
              ? `[system].plant_id = ${plant_id}`
              : '[system].plant_id IS NOT NULL'
            }
            ${date 
              ? `AND [system].last_date = '${this.convertDateTime(new Date(date))}'`
              : ''
            }
          ORDER BY [revision].id DESC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getRoutineMttoDB: ", error);
        reject(error);
      }
    });
  }

  static async getOneRoutineMttoRevisionDB(
    revision_id:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [revision].id, 
            [revision].responsable, 
            [revision].date, 
            [revision].hours, 
            [revision].status,
            [revision].system_id,
            [type_system].name AS type_system_name,
            [question_revision].notes,
            [question_revision].type_question_id,
            [type_question].alias AS type_question_name,
            [question_revision].question_id,
            [question].name AS question_name,
            [question].question,
            [revision].form_id,
            [form].name AS form_name,
            [type_component].name AS type_component_name
          FROM [revision]
          INNER JOIN [question_revision] ON [question_revision].revision_id = [revision].id
          INNER JOIN [question] ON [question].id = [question_revision].question_id
          INNER JOIN [type_question] ON [type_question].id = [question_revision].type_question_id
          INNER JOIN [form] ON [form].id = [revision].form_id
          INNER JOIN [system] ON [system].id = [revision].system_id
          INNER JOIN [type_system] ON [type_system].id = [system].type_system_id
          INNER JOIN [type_component] ON [type_component].id = [question].type_component_id
          WHERE [revision].id = ${revision_id}
            AND [revision].deleted = 0
          ORDER BY [revision].id DESC
        `
        console.log(query)
        const result = await conn.query(query);
        // lodash
        const data = lodash
          .chain(result.recordset)
          .groupBy('id')
          .map((value, key) => ({
            id: key,
            responsable: value[0].responsable,
            date: value[0].date,
            hours: value[0].hours,
            status: value[0].status,
            system_id: value[0].system_id,
            type_system_name: value[0].type_system_name,
            form_id: value[0].form_id,
            form_name: value[0].form_name,
            total: value.length,
            questions: value
          }))
          .value();
          console.log(data)
        // retornar los datos
        resolve(data[0]);
      } catch (error) {
        console.error("An error ocurred getOneRoutineMttoRevisionDB: ", error);
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

export default routineMttoModel;
