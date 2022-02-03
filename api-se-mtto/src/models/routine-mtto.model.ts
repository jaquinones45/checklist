import db from "../config/database";

import lodash, { groupBy } from "lodash";

class routineMttoModel {

  static module_id = 1

  static async getPlantDB(
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

  static async getTypeSystemDB(
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [type_system].id,
            [type_system].name
          FROM [type_system]
          WHERE [type_system].client_id = ${client_id}
          ORDER BY [type_system].name ASC
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
            [revision].type_component_id,
            [type_component].name AS type_component_name,
            [revision].form_id,
            [form].name AS form_name
          FROM [revision]
          INNER JOIN [system] ON [system].id = [revision].system_id
          INNER JOIN [type_system] ON [type_system].id = [system].type_system_id
          INNER JOIN [plant] ON [plant].id = [system].plant_id
          INNER JOIN [type_component] ON [type_component].id = [revision].type_component_id
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
          ORDER BY [system].last_date DESC
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

  static async getRoutineMttoRevisionDB(
    type_system_id:any | undefined, 
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
            [revision].type_system_id,
            [revision].type_component_id,
            [type_component].name AS type_component_name,
            [revision].form_id,
            [form].name AS form_name
          FROM [revision]
          INNER JOIN [type_component] ON [type_component].id = [revision].type_component_id
          INNER JOIN [form] ON [form].id = [revision].form_id
          WHERE [revision].type_system_id = ${type_system_id}
            AND [revision].deleted = 0
            AND [type_component].deleted = 0
            AND [form].deleted = 0
          ORDER BY [revision].id DESC
        `
        const result = await conn.query(query);        
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getRoutineMttoRevisionDB: ", error);
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
            [revision].type_system_id,
            [question_revision].notes,
            [question_revision].type_question_id,
            [type_question].alias AS type_question_name,
            [question_revision].question_id,
            [question].name AS question_name,
            [question].question,
            [revision].component_id,
            [component].name AS component_name,
            [component].country,
            [revision].form_id,
            [form].name AS form_name
          FROM [revision]
          INNER JOIN [question_revision] ON [question_revision].revision_id = [revision].id
          INNER JOIN [question] ON [question].id = [question_revision].question_id
          INNER JOIN [type_question] ON [type_question].id = [question_revision].type_question_id
          INNER JOIN [component] ON [component].id = [revision].component_id
          INNER JOIN [form] ON [form].id = [revision].form_id
          WHERE [revision].id = ${revision_id}
            AND [revision].deleted = 0
          ORDER BY [revision].id DESC
        `
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
            country: value[0].country,
            type_system_id: value[0].type_system_id,
            component_id: value[0].component_id,
            component_name: value[0].component_name,
            form_id: value[0].form_id,
            form_name: value[0].form_name,
            total: value.length,
            questions: value
          }))
          .value();

        // retornar los datos
        resolve(data[0]);
      } catch (error) {
        console.error("An error ocurred getOneRoutineMttoRevisionDB: ", error);
        reject(error);
      }
    });
  }

  static async saveRoutineMttoDB(
    name:any | undefined,
    plant_id:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [type_system]
          WHERE client_id = ${client_id}
            AND name = '${name}'
            AND plant_id = ${plant_id}
            AND deleted = 0
        `
        const result_validate = await conn.query(validate);
        if (result_validate.recordset.length) result.error = `El nombre ${name} ya esta asociado a la planta`
        else {
          const query = `
            INSERT INTO [type_system] 
              (name, module_id, plant_id, client_id)
            VALUES
              ('${name}', ${this.module_id}, ${plant_id}, ${client_id})
          `
          await conn.query(query);
          
          result.message = `Se creo el tipo de sistema ${name} exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred saveRoutineMttoDB: ", error);
        reject(error);
      }
    });
  }

  static async saveRoutineMttoRevisionDB(
    responsable:any | undefined,
    date:any | undefined,
    hours:any | undefined,
    status:any | undefined,
    type_system_id:any | undefined,
    component_id:any | undefined, 
    form_id:any | undefined,
    questions:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const insert_revision = `
          INSERT INTO [revision] 
            (responsable, date, hours, status, type_system_id, component_id, form_id)
          VALUES
            ('${responsable}', '${this.convertDateTime(new Date(date))}', ${hours}, '${status}', ${type_system_id}, ${component_id}, ${form_id})
        `
        await conn.query(insert_revision);
        //
        const select_revision = `
          SElECT
            id,
            status
          FROM [revision]
          WHERE type_system_id = ${type_system_id}
            AND component_id = ${component_id}
            AND form_id = ${form_id}
            AND deleted = 0
          ORDER BY id DESC
        `
        const result_revision = await conn.query(select_revision);
        // Actualizar la ultima revision
        if (status == 'completed') {
          const quantity_revision = result_revision.recordset.filter(item => item.status === 'completed').length;
          const query = `
            UPDATE [type_system] SET
              quantity_revision = ${quantity_revision},
              last_date = '${this.convertDateTime(new Date())}'
            WHERE id = ${type_system_id}
          `
          await conn.query(query);
          //
        }
        
        this.insertQuestionRevision(result_revision.recordset[0].id, questions)
        // retornar la respuesta
        resolve({
          message: `Se creo la revisión asignado a <b>${responsable}</b> exitosamente.`,
          success: true
        });
      } catch (error) {
        console.error("An error ocurred saveRoutineMttoRevisionDB: ", error);
        reject(error);
      }
    });
  }


  static async updateRoutineMttoDB(
    id:any | undefined,
    name:any | undefined,
    plant_id:any | undefined,
    client_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [type_system]
          WHERE client_id = ${client_id}
            AND name = '${name}'
            AND plant_id = ${plant_id}
            AND deleted = 0
            AND id != ${id}
        `
        const result_validate = await conn.query(validate);

        if (result_validate.recordset.length) result.error = `El nombre ${name}  ya esta asociado a la planta`
        else {
          const query = `
            UPDATE [type_system] SET
              name = '${name}',
              plant_id = ${plant_id},
              client_id = ${client_id}
            WHERE id = ${id}
          `
          await conn.query(query);

          result.message = `Se actualizo el tipo de sistema ${name} exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred updateRoutineMttoDB: ", error);
        reject(error);
      }
    });
  }

  static async updateRoutineMttoRevisionDB(
    id:any | undefined,
    responsable:any | undefined,
    date:any | undefined,
    hours:any | undefined,
    status:any | undefined,
    type_system_id:any | undefined,
    component_id:any | undefined, 
    form_id:any | undefined,
    questions:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: `Se actualizo la revisión asignado a <b>${responsable}</b> exitosamente.`, success: true , error: '' }

        const query = `
          UPDATE [revision] SET
            responsable = '${responsable}',
            date = '${this.convertDateTime(new Date(date))}',
            hours = '${hours}',
            status = '${status}',
            type_system_id = ${type_system_id}
            component_id = ${component_id}
            form_id = ${form_id}
          WHERE id = ${id}
        `
        await conn.query(query);
        // Actualizar la ultima revision
        if (status == 'completed') {
          const select_type_system = `
            SELECT
              id
            FROM [revision]
            WHERE type_system_id = ${type_system_id}
              AND component_id = ${component_id}
              AND form_id = ${form_id}
              AND status = '${status}'
              AND deleted = 0
          `
          const resul_type_system = await conn.query(select_type_system);

          const query = `
            UPDATE [type_system] SET
              quantity_revision = ${resul_type_system.recordset.length},
              last_date = '${this.convertDateTime(new Date())}'
            WHERE id = ${type_system_id}
          `
          await conn.query(query);
        }
        // Eliminar las preguntas
        const deleted = `
          DELETE FROM [question_revision] 
          WHERE [question_revision].revision_id = ${id};
        `
        await conn.query(deleted);
        // 
        this.insertQuestionRevision(id, questions)
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred updateRoutineMttoRevisionDB: ", error);
        reject(error);
      }
    });
  }
  
  static async insertQuestionRevision(
    revision_id:number,
    questions:[]
  ) {
    const conn = await db.connect();
    questions.forEach(async (question:any) => {
      const query = `
        INSERT INTO [question_revision] 
          (notes, type_question_id, question_id, revision_id)
        VALUES
          ('${question.notes}', ${question.type_question_id}, ${question.question_id}, ${revision_id})
      `
      await conn.query(query);
    })
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
