const lodash = require("lodash");
import db from './config/database';
class common {
  static replaceString(string: any) {
    let split_string = string.split(",");
    let newString = "";
    let i = split_string.indexOf("Cove%C3%B1as");
    if (i > -1) string[i] = "Coveñas";
    if (split_string.length > 1) {
      split_string.forEach(
        (item: any) =>
          (newString = newString.concat(
            "'" + this.replaceEstation(item) + "', "
          ))
      );
      newString = newString.slice(0, -2);
    } else
      newString = newString.concat(
        "'" + this.replaceEstation(split_string[0]) + "'"
      );
    return newString;
  }

  static replaceEstation(estation: any) {
    let split_estation = estation.split(",");
    let i = split_estation.indexOf("Cove%C3%B1as");
    if (i > -1) estation[i] = "Coveñas";
    if (split_estation.length > 1) return estation.replace(",", '","');
    return estation;
  }

  static getStringLike(string: string, variable: string) {
    let split_string = string.split(",");
    let newString = "";
    split_string.forEach(
      (item) =>
        (newString = newString.concat(
          variable + " LIKE '%" + this.replaceEstation(item) + "%' OR "
        ))
    );
    return newString.slice(0, -4);
  }
  static getGroups(arr: any, propG1: any, propG2 = "", tipo = "cant") {
    return lodash
      .chain(arr)
      .groupBy(propG1)
      .toPairs()
      .map((s: any) => {
        return lodash.zipObject([propG1, "children"], s);
      })
      .map((s: any) => {
        s.name = s[propG1];
        if (tipo == "cant") s.value = lodash.sumBy(s.children, "cant");
        if (tipo == "ordenes") {
          s.planeado = lodash.sumBy(s.children, "planeado");
          s.programado = lodash.sumBy(s.children, "programado");
          s.ejecutado = lodash.sumBy(s.children, "ejecutado");
          if (s.planeado > 0) s.cump_plan = s.ejecutado / s.programado;
          else s.cump_plan = 0;
          if (s.programado > 0) s.cump_programa = s.ejecutado / s.programado;
          else s.cump_programa = 0;
        }
        if (propG2 != "")
          s.children = this.getGroups(s.children, propG2, "", tipo);
        delete s[propG1];
        return s;
      })
      .sort((a: any, b: any) => b.value - a.value)
      .value();
  }
  static sumHistory(datos: any) {
    const res: any = [],
      temp: any = [];

    datos.forEach((d: any) => {
      d.history.forEach((x: any) => {
        temp.push(x);
      });
    });
    const grupo = lodash.groupBy(temp, "name");
    Object.keys(grupo).forEach((k) => {
      res.push({ name: k, cant: lodash.sumBy(grupo[k], "cant") });
    });
    return res;
  }
  static getHistoryMonth(datos: any, meses: any) {
    return datos.map((d: any) => {
      const histo: any = [];
      meses.forEach((f: any) => {
        const temp = d.children.find((x: any) => x.date == f.date);
        if (temp != undefined) histo.push({ name: f.date, cant: temp.cant });
        else histo.push({ name: f.date, cant: 0 });
      });
      d.history = histo;
      delete d.children;
      return d;
    });
  }
  static getHistorySemana(datos: any, fechas: any, tipo = "cant") {
    const histo: any = [];
    const semanas = lodash.groupBy(fechas, "week");

    Object.keys(semanas).forEach((k) => {
      const yw = k.split(",");

      const temp = datos.filter((x: any) => x.year == yw[0] && x.week == yw[1]);
      if (temp.length > 0)
        histo.push({
          name: k,
          ...temp[0],
          inicio: semanas[k][0].fecha,
          fin: semanas[k][semanas[k].length - 1].fecha,
        });
      else {
        if (tipo == "cant")
          histo.push({
            name: k,
            cant: 0,
            inicio: semanas[k][0].fecha,
            fin: semanas[k][semanas[k].length - 1].fecha,
          });
        if (tipo == "ordenes")
          histo.push({
            name: k,
            planeado: 0,
            programado: 0,
            ejecutado: 0,
            cump_plan: 0,
            cump_programa: 0,
            inicio: semanas[k][0].fecha,
            fin: semanas[k][semanas[k].length - 1].fecha,
          });
      }
    });
    return histo;
  }
  static async getArrayFechas(inicio: any, fin: any) {
    const ini = new Date(inicio);
    const end = new Date(fin);
    let fechas = [];
    while (ini.getTime() <= end.getTime()) {
      fechas.push(new Date(ini.getTime()).toISOString().split("T")[0]);
      ini.setDate(ini.getDate() + 1);
    }
    try {
      const temp = [];
      for (const fecha of fechas) {
        const dato: any = await this.getSemanaDB(fecha);
        temp.push({ fecha: fecha, week: dato[0].year + "," + dato[0].week });
      }

      return temp;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Método que contiene los scripts para retornar filtrados la semana de la fecha
   */
  static async getSemanaDB(fecha: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        let querySql = `SELECT DATEPART(WEEK,'${fecha}') as week,YEAR('${fecha}') as year`;

        const result = await conn.query(querySql);
        resolve(result.recordset);
      } catch (error) {
        console.error(`An error ocurred in getSemanaDB: ${error}`);
        reject(error);
      }
    });
  }

  /**
   * Método que contiene los scripts para retornar todo de cada tabla
   */
  static async getTodoDB(tabla: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();

        let querySql = `SELECT * FROM ${tabla}`;

        const result = await conn.query(querySql);
        resolve(result.recordset);
      } catch (error) {
        console.error(`An error ocurred in getTodoDB ${tabla}: ${error}`);
        reject(error);
      }
    });
  }
}

module.exports = common;
