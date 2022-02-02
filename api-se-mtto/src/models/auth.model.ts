import db from "../config/database";

class authModel {

  static async saveAuthLoginDB(
    email:any | undefined, 
    password:any | undefined, 
    rememberMe:any | undefined,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            id, 
            name, 
            email, 
            phone, 
            last_login, 
            role_id
          FROM [users] 
          WHERE [users].email = '${email}'
            AND [users].password = '${password}'
            AND [users].deleted = 0
        `
        const list_user = await conn.query(query)
        const data:any = {role : {}, user : {}, users_id: 0, client_id: 0, is_admin: false}
        let success = false
        if (list_user.recordset.length > 0) {
          // Agregamos la información del usuario al data user
          data.user = list_user.recordset[0]
          data.users_id = list_user.recordset[0].id
          // Obtener el rol
          const select_role = `
            SELECT 
              * 
            FROM [role] 
            WHERE id = ${list_user.recordset[0].role_id}
          `
          const list_role = await conn.query(select_role)
          // Validamos si hay registros del rol
          if (list_role.recordset) data.role = list_role.recordset[0]

          success = true
        }
        if (list_user.recordset[0].role_id != 1) {
          // Obtener el cliente
          const select_client = `
            SELECT 
              client_id 
            FROM [client_users] 
            WHERE [client_users].users_id = ${list_user.recordset[0].id}
              AND [client_users].deleted = 0
          `
          const list_client = await conn.query(select_client)
          if (list_client.recordset[0].client_id) data.client_id = list_client.recordset[0].client_id
          data.is_admin = false
        } else data.is_admin = true
        // retornar los datos
        resolve({
          data: data,
          message: data.users_id ? 'Se logueo exitosamente.' : 'Las credenciales son incorrectas.',
          success
        });
      } catch (error) {
        console.error("An error ocurred saveAuthLoginDB: ", error);
        reject(error);
      }
    });
  }

  static async getAuthLogoutDB(
    users_id:any | undefined, 
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        const update = `
          UPDATE [users] SET 
            last_login = '${new Date()}'
          WHERE id = ${users_id}
        `
        await conn.query(update)
        // retornar los datos
        resolve("Se cerro la sesión exitosamente.");
      } catch (error) {
        console.error("An error ocurred getAuthLogoutDB: ", error);
        reject(error);
      }
    });
  }
}

export default authModel;
