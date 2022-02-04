import db from "../config/database";

import lodash from "lodash";

class formModel {

  static async getTypeComponentNameDB(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [type_component].id,
            [type_component].name
          FROM [type_component]
          WHERE [type_component].deleted = 0
          ORDER BY [type_component].name ASC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTypeComponentNameDB: ", error);
        reject(error);
      }
    });
  }

  static async getCountryNameDB(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [country].id,
            [country].name
          FROM [country]
          WHERE [country].deleted = 0
          ORDER BY [country].name ASC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getCountryNameDB: ", error);
        reject(error);
      }
    });
  }

  static async getOneFormDB(
    id:any | undefined,
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
            [revision].form_id
          FROM [revision]
          WHERE [revision].id = ${id}
            AND [revision].deleted = 0
          ORDER BY [revision].id DESC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset[0]);
      } catch (error) {
        console.error("An error ocurred getOneFormDB: ", error);
        reject(error);
      }
    });
  }
  
  static async getFormDB(
    name:any | undefined, 
    country_id:any | undefined, 
    type_component_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            [form].id, 
            [form].name, 
            [country].id AS country_id, 
            [country].name AS country_name
          FROM [form]
          INNER JOIN [country] ON [country].id = [form].country_id
          WHERE [form].deleted = 0
            AND [country].deleted = 0
            AND ${name 
              ? `[form].name LIKE '%${name}%'`
              : '[form].name IS NOT NULL'
            }
            AND ${country_id 
              ? `[form].country_id = ${country_id}`
              : '[form].country_id IS NOT NULL'
            }
          ORDER BY [form].id DESC
        `
        const result = await conn.query(query);
        // retornar los datos
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getFormDB: ", error);
        reject(error);
      }
    });
  }

  static async saveFormDB(
    name:any | undefined, 
    country_id:any | undefined, 
    type_component_id:any | undefined, 
    questions:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [form]
          WHERE name = '${name}'
            AND type_component_id = ${type_component_id}
            AND deleted = 0
        `
        const result_validate = await conn.query(validate);
        if (result_validate.recordset.length) result.error = `El nombre ${name} ya esta registrado`
        else {
          const query = `
            INSERT INTO [form] 
              (name, country_id, type_component_id)
            VALUES
              ('${name}', ${country_id}, ${type_component_id})
          `
          await conn.query(query);

          const select_form = `
            SElECT
              id
            FROM [form]
            WHERE name = '${name}'
              AND type_component_id = ${type_component_id}
              AND country_id = ${country_id}
              AND deleted = 0
            ORDER BY id DESC
          `
          const result_form = await conn.query(select_form);
          this.insertFormQuestion(result_form.recordset[0].id, questions)
            
          result.message = `Se creo la lista de revisión <b>${name}</b> exitosamente.`
          result.success = true
        }
        
        
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred saveFormDB: ", error);
        reject(error);
      }
    });
  }

  static async saveFormQuestionDB(
    name:any | undefined, 
    question:any | undefined, 
    form_id:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [question]
          WHERE name = '${name}'
            AND form_id = ${form_id}
            AND deleted = 0
        `
        const result_validate = await conn.query(validate);
        if (result_validate.recordset.length) result.error = `El nombre ${name} ya esta registrado`
        else {
          const query = `
            INSERT INTO [question] 
              (name, question, form_id)
            VALUES
              ('${name}', '${question}', ${form_id})
          `
          await conn.query(query);
          
          result.message = `Se creo la pregunta <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred saveFormQuestionDB: ", error);
        reject(error);
      }
    });
  }

  static async updateFormDB(
    id:any | undefined,
    name:any | undefined, 
    country_id:any | undefined, 
    type_component_id:any | undefined,
    questions:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [form]
          WHERE name = '${name}'
            AND deleted = 0
            AND id != ${id}
        `
        const result_validate = await conn.query(validate);

        if (result_validate.recordset.length) result.error = `El nombre <b>${name}</b> ya esta registrado`
        else {
          const query = `
            UPDATE [form] SET
              name = '${name}',
              country_id = ${country_id},
              type_component_id = ${type_component_id}
            WHERE id = ${id}
          `
          await conn.query(query);

          // Eliminar las preguntas
          const deleted = `
            DELETE FROM [question] 
            WHERE form_id = ${id};
          `
          await conn.query(deleted);

          this.insertFormQuestion(id, questions)
          
          result.message = `Se actualizo la lista de revisión <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred updateFormDB: ", error);
        reject(error);
      }
    });
  }

  static async updateFormQuestionDB(
    id:any | undefined,
    name:any | undefined, 
    question:any | undefined, 
    form_id:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const result = { message: '', success: false , error: '' }

        const validate = `
          SElECT 
            id 
          FROM [question]
          WHERE name = '${name}'
            AND form_id = ${form_id}
            AND deleted = 0
            AND id != ${id}
        `
        const result_validate = await conn.query(validate);

        if (result_validate.recordset.length) result.error = `El nombre <b>${name}</b> ya esta registrado`
        else {
          const query = `
            UPDATE [question] SET
              name = '${name}',
              question = '${question}',
              form_id = '${form_id}'
            WHERE id = ${id}
          `
          await conn.query(query);
          
          result.message = `Se actualizo la pregunta <b>${name}</b> exitosamente.`
          result.success = true
        }
        // retornar la respuesta
        resolve(result);
      } catch (error) {
        console.error("An error ocurred updateFormQuestionDB: ", error);
        reject(error);
      }
    });
  }

  static async insertFormQuestion(
    form_id:number,
    questions:[]
  ) {
    const conn = await db.connect();
    questions.forEach(async (question:any) => {
      const query = `
        INSERT INTO [question] 
          (name, question, form_id)
        VALUES
          ('${question.name}', ${question.question}, ${form_id})
      `
      await conn.query(query);
    })
  }
}

export default formModel;
