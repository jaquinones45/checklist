import db from "../config/database";

import lodash from "lodash";

class typeSystemModel {

  static module_id = 1

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

  static async getTypeSystemNameDB(
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

  static async getComponentNameDB(
    client_id:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [type_component].id,
            [type_component].name
          FROM [component]
          INNER JOIN [type_component] ON [type_component].id = [component].type_component_id
          WHERE [component].client_id = ${client_id}
            AND [component].deleted = 0
            AND [type_component].deleted = 0
          GROUP BY [type_component].id, [type_component].name
          ORDER BY [type_component].name ASC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getComponentNameDB: ", error);
        reject(error);
      }
    });
  }

  static async getFormNameDB(
    client_id:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [form].id,
            [form].name,
            [question].id AS question_id,
            [question].question,
            [type_component].id AS type_component_id,
            [type_component].name AS type_component_name,
            1 AS type_question_id,
			      '' AS notes
          FROM [form]
          INNER JOIN [question] ON [question].form_id = [form].id
          INNER JOIN [client] ON [client].country_id = [form].country_id
          INNER JOIN [type_component] ON [type_component].id = [question].type_component_id
          WHERE [client].id = ${client_id}
            AND [form].deleted = 0
            AND [question].deleted = 0
          ORDER BY [form].name ASC
        `
        const result = await conn.query(query);
        // lodash
        const data = lodash
          .chain(result.recordset)
          .groupBy('id')
          .map((value_parent, key_parent) => ({
            id: parseInt(key_parent),
            name: value_parent[0].name,
              components: lodash
              .chain(value_parent)
              .groupBy('type_component_id')
              .map((value, key) => ({
                id: parseInt(key),
                name: value[0].type_component_name,
                questions: value
              }))
              .value()
          }))
          .value();
        // retornar los datos
        resolve(data);
      } catch (error) {
        console.error("An error ocurred getFormNameDB: ", error);
        reject(error);
      }
    });
  }

  static async getTypeQuestionNameDB(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [type_question].id,
            [type_question].alias AS name,
            [type_question].default_value
          FROM [type_question]
          ORDER BY [type_question].name ASC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTypeQuestionNameDB: ", error);
        reject(error);
      }
    });
  }

  static async getTypeSystemDB(
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
            [system].id, 
            [type_system].id AS type_system_id, 
            [type_system].name, 
            [system].quantity_revision, 
            [system].last_date, 
            [plant].id AS plant_id,
            [plant].name AS planta,
            [plant].client_id
          FROM [system]
          INNER JOIN [plant] ON [plant].id = [system].plant_id
          INNER JOIN [type_system] ON [type_system].id = [system].type_system_id
          WHERE [plant].client_id = ${client_id}
            AND ${name 
              ? `[type_system].name LIKE '%${plant_id}%'`
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
          ORDER BY [system].id DESC
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

  static async getTypeSystemRevisionDB(
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
            [revision].system_id,
            [revision].form_id,
            [form].name AS form_name
          FROM [revision]
          INNER JOIN [form] ON [form].id = [revision].form_id
          WHERE [revision].system_id = ${type_system_id}
            AND [revision].deleted = 0
            AND [form].deleted = 0
          ORDER BY [revision].id DESC
        `
        const result = await conn.query(query);        
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTypeSystemRevisionDB: ", error);
        reject(error);
      }
    });
  }

  static async getOneTypeSystemRevisionDB(
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
        const result = await conn.query(query);
        // lodash
        const data = lodash
          .chain(result.recordset)
          .groupBy('id')
          .map((value, key) => ({
            id: parseInt(key),
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

        // retornar los datos
        resolve(data[0]);
      } catch (error) {
        console.error("An error ocurred getOneTypeSystemRevisionDB: ", error);
        reject(error);
      }
    });
  }

  static async saveTypeSystemDB(
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
        console.error("An error ocurred saveTypeSystemDB: ", error);
        reject(error);
      }
    });
  }

  static async saveTypeSystemRevisionDB(
    responsable:any | undefined,
    date:any | undefined,
    hours:any | undefined,
    status:any | undefined,
    system_id:any | undefined,
    form_id:any | undefined,
    components:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const insert_revision = `
          INSERT INTO [revision] 
            (responsable, date, hours, status, system_id, form_id)
          VALUES
            ('${responsable}', '${this.convertDateTime(new Date(date))}', ${hours}, '${status}', ${system_id}, ${form_id})
        `
        await conn.query(insert_revision);
        //
        const select_revision = `
          SElECT
            id,
            status
          FROM [revision]
          WHERE system_id = ${system_id}
            AND deleted = 0
          ORDER BY id DESC
        `
        console.log(select_revision)
        const result_revision = await conn.query(select_revision);
        // Actualizar la ultima revision
        if (status == 'completed') {
          const quantity_revision = result_revision.recordset.filter(item => item.status === 'completed').length;
          console.log(quantity_revision)
          const query = `
            UPDATE [system] SET
              quantity_revision = ${quantity_revision},
              last_date = '${this.convertDateTime(new Date())}'
            WHERE id = ${system_id}
          `
          console.log(query)
          await conn.query(query);
          //
        }
        this.insertQuestionRevision(result_revision.recordset[0].id, components)
        // retornar la respuesta
        resolve({
          message: `Se creo la revisión asignada a <b>${responsable}</b> exitosamente.`,
          success: true
        });
      } catch (error) {
        console.error("An error ocurred saveTypeSystemRevisionDB: ", error);
        reject(error);
      }
    });
  }


  static async updateTypeSystemDB(
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
        console.error("An error ocurred updateTypeSystemDB: ", error);
        reject(error);
      }
    });
  }

  static async updateTypeSystemRevisionDB(
    id:any | undefined,
    responsable:any | undefined,
    date:any | undefined,
    hours:any | undefined,
    status:any | undefined,
    system_id:any | undefined,
    form_id:any | undefined,
    components:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: `Se actualizo la revisión asignada a <b>${responsable}</b> exitosamente.`, success: true , error: '' }

        const query = `
          UPDATE [revision] SET
            responsable = '${responsable}',
            date = '${this.convertDateTime(new Date(date))}',
            hours = '${hours}',
            status = '${status}',
            system_id = ${system_id},
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
            WHERE system_id = ${system_id}
              AND status = '${status}'
              AND deleted = 0
          `
          const resul_type_system = await conn.query(select_type_system);

          const query = `
            UPDATE [system] SET
              quantity_revision = ${resul_type_system.recordset.length},
              last_date = '${this.convertDateTime(new Date())}'
            WHERE id = ${system_id}
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
        this.insertQuestionRevision(id, components)
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred updateTypeSystemRevisionDB: ", error);
        reject(error);
      }
    });
  }
  
  static async insertQuestionRevision(
    revision_id:number,
    components:[]
  ) {
    const conn = await db.connect();
    components.forEach(async (component:any) => {
      component.questions.forEach(async (question:any) => {
        const query = `
          INSERT INTO [question_revision] 
            (notes, type_question_id, question_id, revision_id)
          VALUES
            ('${question.notes}', ${question.type_question_id}, ${question.question_id}, ${revision_id})
        `
        await conn.query(query);
      })
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

export default typeSystemModel;
