import { Duration, DateTime as Fecha, Interval } from "../plugins/luxon.js";

const fechaDeAhoraSinFormatear = Fecha.now();

const fechaDeAhoraISO = fechaDeAhoraSinFormatear.toISO();

const fechaDeAhoraSolo = fechaDeAhoraSinFormatear.toFormat("dd-MM-yyyy");

const horaDeFechaDeAhoraFormato12Horas =
  fechaDeAhoraSinFormatear.toFormat("hh:mm:ss a");

const fechaEspecifica = Fecha.local(2023, 3, 15, 14, 30);

const diaDeSemanaFechaEspecifica = fechaEspecifica.weekdayLong;

const fechaEspecificaFormateada = fechaEspecifica.toFormat("MMMM dd, yyyy");

const numeroDeDiasParaEl1DeEneroDelProximoAnyo = Math.floor(
  Interval.fromDateTimes(
    fechaDeAhoraSinFormatear,
    Fecha.local(fechaDeAhoraSinFormatear.year + 1, 1, 1)
  ).length("days")
);

/* INTERMEDIOS */
const sumarDiasHorasFechaActual = fechaDeAhoraSinFormatear
  .plus({
    days: 7,
    hours: 3,
  })
  .toFormat("dd-MM-yyyy HH:mm");
const restar2MesesFechaActual = fechaDeAhoraSinFormatear
  .minus({ months: 2 })
  .toFormat("dd-MM-yyyy HH:mm");
const zonaHorariaUTC = fechaDeAhoraSinFormatear.setZone("UTC");
const zonaHorariaNuevaYork =
  fechaDeAhoraSinFormatear.setZone("America/New_York");
const zonaHorariaTokio = fechaDeAhoraSinFormatear.setZone("Asia/Tokyo");
const { days, hours, minutes } = Interval.fromDateTimes(
  Fecha.local(fechaDeAhoraSinFormatear.year, 5, 11),
  fechaDeAhoraSinFormatear
)
  .toDuration(["days", "hours", "minutes"])
  .toObject();
const fechaDeMiCumpleanyos = Fecha.local(fechaDeAhoraSinFormatear.year, 5, 11);
const fechaFutura = Fecha.local(fechaDeAhoraSinFormatear.year + 2, 5, 11);
// En esta comparación, no usaremos hasSame porque son distintos años, y aunque tengan el mismo mes o día, siempre dirá que es false.
// Lo compararemos a pelo -> fechaDeMiCumpleanyos.month === fechaFutura.month

/* ¡¡¡¡¡¡¡¡¡¡AVANZADOS!!!!!!!!!! */
const fechaDeInicioDeTrabajo = Fecha.local(2021, 9, 13);
const fechaDeFinDeTrabajo = Fecha.fromISO("2024-11-18T16:15:00");

const calcularDiasLaborales = () => {
  const totalDias = Math.floor(
    Interval.fromDateTimes(fechaDeInicioDeTrabajo, fechaDeFinDeTrabajo)
      .splitBy({ day: 1 })
      .reduce(
        (
          acumulador,
          {
            start: {
              c: { day: dia, month: mes, year: anyo },
            },
          }
        ) =>
          Fecha.local(anyo, mes, dia).weekday !== 6 &&
          Fecha.local(anyo, mes, dia).weekday !== 7
            ? ++acumulador
            : acumulador,
        0
      )
  );
  return totalDias;
};

const listarDiasDeUnMes = (anyo, mes) => {
  try {
    if (typeof anyo !== "number") throw new Error("Año debe ser un entero!");
    /*
    Si mes es menor de 1, Math.max pillará el 1, ya que 1 será el número más grande.
    Si mes es mayor de 12, Math.max pillará el número que es mayor que 12, pero después
    el Math.min pillará el número que es menor, en este caso el 12. Y así no sale del rango.

    Ejemplo: mes = 0, primero pasará por el Math.max, que hará el max? Pues comparar lo que
    me ha venido por parámetro(mes que es 0) y el 1, cual es más grande el 0 o el 1? pues el 1.
    Después pasará por el Math.min, ya tenemos el 1, ahora cual es menor, el 1 o el 12? El 1.
    Pues entonces Math.min pillará el 1.

    Otro caso: Ahora mes = 13, primero pasará por el Math.max, que hará el max? Pilla el 13,
    porque es 13 es mayor que el 1(Math.max(13,1) => 13). Después pasa por el Math.min, cual
    es menor entre 13 y 12? 12. Pues mes = 12.

    Y si pasa normal? mes = 2. Pasa por el Math.max, 2 es mayor que 1? Si, pues coge el 2.
    Ahora el Math.min, 2 es menor que 12? Si, pues mes = 2.

    Y si es 12 pues agarra 12.
    */
    mes = Math.min(Math.max(mes, 1), 12);
    const primerDia = Fecha.local(anyo, mes);
    const ultimoDia = Fecha.local(anyo, mes, primerDia.daysInMonth).endOf(
      "day"
    ); // endOf Pilla hasta el final del dia, sino tenemos el error de que pilla hasta el día 30 teniendo 31 dias.
    const arrayDiasDelMes = Interval.fromDateTimes(
      primerDia,
      ultimoDia
    ).splitBy({
      day: 1,
    });
    return arrayDiasDelMes.map(
      ({
        start: { weekdayLong: diaSemana, day: numeroDia, monthLong: mes },
      }) => ({
        diaSemana,
        numeroDia,
        mes,
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};
const listaFechasActualDiferentesIdiomas = (idiomas) =>
  idiomas
    .map(
      (idioma) =>
        `\t- ${idioma.toUpperCase()}: ${fechaDeAhoraSinFormatear
          .setLocale(idioma)
          .toFormat("DDDD")}`
    )
    .join("\n");

let temporizador = Duration.fromObject({ minutes: 5, seconds: 0 });
const cuentaAtras = () => {
  const stringTemporizador = `Tiempo restante temporizador: ${temporizador.minutes} minutos y ${temporizador.seconds} segundos`;
  if (temporizador.minutes >= 1 && temporizador.seconds === 0) {
    temporizador = temporizador.plus({ minutes: -1, seconds: 59 });
  } else if (temporizador.seconds >= 1) {
    temporizador = temporizador.minus({ seconds: 1 });
  } else {
    clearInterval(contador);
  }
  return stringTemporizador;
};
const contador = setInterval(() => console.log(`${cuentaAtras()}`), 1000);

/** ¡¡¡¡¡¡¡¡¡BOLA EXTRA!!!!!!!! */

const obtenerDatosCumple = (fechaNacimiento) => {
  try {
    if (typeof fechaNacimiento !== "object" || !fechaNacimiento.isLuxonDateTime)
      throw new Error("La fecha introducida por parámetro no es de tipo fecha");
    const cumpleEsteAnyo = Fecha.local(
      fechaDeAhoraSinFormatear.year,
      fechaNacimiento.month,
      fechaNacimiento.day
    );
    // Comprobar si el cumpleaños ya ha pasado, antes de agregar un año.
    // Si no ha pasado o incluso es hoy, pues pilla la variable cumpleEsteAnyo.
    const fechaProximoCumpleanyos =
      cumpleEsteAnyo < fechaDeAhoraSinFormatear
        ? cumpleEsteAnyo.plus({ years: 1 })
        : cumpleEsteAnyo;
    const {
      years: anyosQueTienes,
      months: mesesQueTienes,
      days: diasQueTienes,
    } = Interval.fromDateTimes(fechaNacimiento, fechaDeAhoraSinFormatear)
      .toDuration(["years", "months", "days"])
      .toObject();
    const { days: diasQueFaltanProximoCumpleanyos } = Interval.fromDateTimes(
      fechaDeAhoraSinFormatear,
      fechaProximoCumpleanyos
    )
      .toDuration("days")
      .toObject();
    const diaDeLaSemanaProximoCumpleanyos = fechaProximoCumpleanyos.weekdayLong;
    return `
    \t- Tu edad exacta es: ${anyosQueTienes} años, ${mesesQueTienes} meses y ${Math.floor(
      diasQueTienes
    )} dias.
    \t- Faltan para tu próximo cumpleaños: ${Math.floor(
      diasQueFaltanProximoCumpleanyos
    )} dias.
    \t- Día de la semana de tu próximo cumpleaños: ${diaDeLaSemanaProximoCumpleanyos}.
    `;
  } catch (e) {
    console.log(e.message);
  }
};

console.log(
  `
  Fecha ahora (sin formatear): ${fechaDeAhoraSinFormatear}\n
  Fecha ISO estándar: ${fechaDeAhoraISO}\n
  Sólo la fecha (dd-MM-yyyy): ${fechaDeAhoraSolo}\n
  Hora en formato de 12 horas (AM/PM): ${horaDeFechaDeAhoraFormato12Horas}\n
  Objeto DateTime para el 15 de marzo de 2023 a las 14:30 horas: ${fechaEspecifica}\n
  Día de la semana de la fecha específica: ${diaDeSemanaFechaEspecifica}\n
  Formatea la fecha en el formato MMMM dd, yyyy: ${fechaEspecificaFormateada}\n
  Días que faltan para el 1 de enero del próximo año: ${numeroDeDiasParaEl1DeEneroDelProximoAnyo}\n
  Sumar 7 días y 3 horas a la fecha actual: ${sumarDiasHorasFechaActual}\n
  Restar 2 meses de la fecha actual: ${restar2MesesFechaActual}\n
  Zona horaria UTC: ${zonaHorariaUTC}\n
  Zona horaria Nueva York: ${zonaHorariaNuevaYork}\n
  Zona horaria Tokio: ${zonaHorariaTokio}\n
  Tiempo que ha pasado desde tu última fecha de cumpleaños hasta hoy: ${days} días, ${hours} horas y ${Math.floor(
    minutes
  )} minutos.\n
  Cuál de las fechas es más reciente, (${fechaDeMiCumpleanyos} - O - ${fechaFutura}): ${
    fechaDeMiCumpleanyos < fechaFutura ? fechaFutura : fechaDeMiCumpleanyos
  }\n
  Ambas fechas (${fechaDeMiCumpleanyos} - y - ${fechaFutura}) están en el mismo mes? ${
    fechaDeMiCumpleanyos.month === fechaFutura.month ? "SI" : "NO"
  }\n
  Días laborables (lunes a viernes) entre las fechas ${fechaDeInicioDeTrabajo} - y -
  ${fechaDeFinDeTrabajo}: ${calcularDiasLaborales()}\n
  Lista de todas las fechas del mes de mayo del 2024: \n${listarDiasDeUnMes(
    2024,
    5
  )
    .map(
      ({ diaSemana, numeroDia, mes }) =>
        `\t- ${diaSemana}, ${numeroDia} de ${mes}`
    )
    .join("\n")}\n
  Formato personalizado con idiomas:
  ${listaFechasActualDiferentesIdiomas(["es", "fr", "de"])}\n
  Vamos a calcular algunos datos de tu fecha de cumpleaños:
  ${obtenerDatosCumple(Fecha.local(1999, 5, 11))}
  `
);
