import * as mssql from 'mssql';
require('dotenv').config();
let poolConn: mssql.ConnectionPool;

const connect = async () => {
  try {
    if(poolConn) return poolConn;
    else {
      const sqlConfig: mssql.config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        server: `${process.env.DB_HOST}`,
        port: parseInt(process.env.DB_PORT as string),
        pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000
        },
        options: { 
          trustServerCertificate: true,
        },
      }

      const pool = new mssql.ConnectionPool(sqlConfig);
      poolConn = await pool.connect();
      const dateNow = await poolConn.query(`SELECT GETDATE() as 'date_now'`);
      console.log(`Database connect at: ${dateNow.recordset[0].date_now}`);
    }
    return poolConn;
  } catch (error) {
    console.log(`Error in connect: ${error}`);
    throw error;
  }
}

export default {
  connect
}