Ejercicios básicos
1. Crear un objeto DateTime de la fecha actual y mostrarlo en diferentes formatos

  Usa DateTime.now() para obtener la fecha y hora actual.
  Formatea la salida en:
    ISO estándar.
    Sólo la fecha (dd-MM-yyyy).
    Hora en formato de 12 horas (AM/PM).

2. Crear una fecha específica
  Crea un objeto DateTime para el 15 de marzo de 2023 a las 14:30 horas.
  Muestra el día de la semana de esa fecha.
  Formatea la fecha en el formato MMMM dd, yyyy.

3. Calcular la diferencia entre dos fechas
  Calcula cuántos días faltan para el 1 de enero del próximo año.
  Muestra la diferencia en días y semanas.


Ejercicios intermedios

4. Manipular fechas
  Usa plus y minus para:
  Sumar 7 días y 3 horas a la fecha actual.
  Restar 2 meses de la fecha actual.
  Muestra las nuevas fechas en formato dd-MM-yyyy HH:mm.

5. Conversión de zonas horarias
  Muestra la hora actual en las zonas horarias:
    UTC.
    Hora de Nueva York (EST).
    Hora de Tokio (JST).

6. Duraciones y períodos
  Calcula cuánto tiempo ha pasado desde tu última fecha de cumpleaños hasta hoy.
  Usa Duration para obtener los resultados en:
    Días.
    Horas.
    Minutos.

7. Comparar fechas
  Crea dos fechas específicas (por ejemplo, tu cumpleaños y una fecha futura).
  Comprueba cuál es más reciente usando DateTime y muestra el resultado.
  Muestra si ambas fechas están en el mismo mes.


Ejercicios avanzados

8. Días laborables entre dos fechas
  Crea dos fechas específicas.
  Calcula cuántos días laborables (lunes a viernes) hay entre ambas.

9. Listar días de un mes
  Crea una función que reciba un año y un mes como parámetros.
  Genera una lista de todas las fechas de ese mes, indicando qué día de la semana es cada una.

10. Formato personalizado con idiomas
  Formatea la fecha actual en diferentes idiomas:
    Español.
    Francés.
    Alemán.
  Usa el formato DDDD (día completo con fecha).

11. Cronómetro o temporizador
  Usa Duration para crear un temporizador que cuente hacia atrás desde 5 minutos.
  Muestra el tiempo restante en minutos y segundos.


Ejercicio final: Aplicación práctica

Crea una función que reciba la fecha de nacimiento de una persona y calcule:
  Su edad exacta (en años, meses y días).
  Cuántos días faltan para su próximo cumpleaños.
  Qué día de la semana será su próximo cumpleaños.
