import { Injectable } from "@angular/core";
import * as d3 from "d3";
const moment = require("moment-timezone");

const formatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  minimumFractionDigits: 0,
});

@Injectable()
export class FuncionesGenerales {
  constructor() {}

  color_green = "#34db43";
  color_yellow = "#f2c94c";
  color_orange = "orange";
  color_red = "#ff3c5f";
  color_blue = "#1561C0";
  color_gray = "#F7F7F7";

  locale = d3.timeFormatLocale({
    dateTime: "%a %b %e %X %Y",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    shortDays: ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    shortMonths: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  });
  formatterNumber(number: number) {
    return formatter.format(number);
  }

  formatNumberSiple(number: number) {
    return new Intl.NumberFormat("de-DE").format(number);
  }

  formaterDateShort(date) {
    return moment.utc(date).format("DD-MM-YYYY");
  }
  formaterDateLong(date) {
    return moment.utc(date).format("DD-MM-YYYY HH:mm");
  }
  validateNumber(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]+/g, '').trimLeft();
    let start = event.target.selectionStart;
    event.target.selectionStart = start;
    event.target.selectionEnd = start;
    return event.target.value;
  }

  validateNumberDecimal(event: any) {
    event.target.value = event.target.value.replace(/[^0-9.]+/g, '').trimLeft();
    let start = event.target.selectionStart;
    event.target.selectionStart = start;
    event.target.selectionEnd = start;
    return event.target.value;
  }
}
