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
const zonaHorariaNuevaYork = fechaDeAhoraSinFormatear.setZone("EST");
const zonaHorariaTokio = fechaDeAhoraSinFormatear.setZone("JST");
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

const getDiasDeTrabajo = () => {
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
  const primerDia = Fecha.local(anyo, mes);
  const ultimoDia = Fecha.local(anyo, mes, primerDia.daysInMonth).endOf("day");
  const arrayDiasDelMes = Interval.fromDateTimes(primerDia, ultimoDia).splitBy({
    day: 1,
  });
  return arrayDiasDelMes.map(
    ({
      start: { weekdayLong: diaSemana, day: numeroDia, monthLong: mes },
    }) => ({ diaSemana, numeroDia, mes })
  );
};
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

const calcularDatosDeCumpleanyos = (fechaNacimiento) => {
  try {
    if (typeof fechaNacimiento !== "object" || !fechaNacimiento.isLuxonDateTime)
      throw new Error("La fecha introducida por parámetro no es de tipo fecha");
    const fechaProximoCumpleanyos = Fecha.local(
      fechaDeAhoraSinFormatear.year + 1,
      fechaNacimiento.month,
      fechaNacimiento.day
    );
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
  ${fechaDeFinDeTrabajo}: ${getDiasDeTrabajo()}\n
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
  \t- Español: ${fechaDeAhoraSinFormatear.setLocale("es").toFormat("DDDD")}\n
  \t- Francés: ${fechaDeAhoraSinFormatear.setLocale("fr").toFormat("DDDD")}\n
  \t- Aleman: ${fechaDeAhoraSinFormatear.setLocale("de").toFormat("DDDD")}\n
  Vamos a calcular algunos datos de tu fecha de cumpleaños:
  ${calcularDatosDeCumpleanyos(Fecha.local(1999, 5, 11))}
  `
);
