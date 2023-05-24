const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

let jornada = '38';
let partidos = [];

// Función para realizar el web scraping y actualizar los datos
const actualizarDatos = async () => {
  try {
    // Realizar la consulta HTTP a la página web
    const respuesta = await axios.get('https://www.resultados-futbol.com/primera2023/grupo1/jornada' + jornada);

    // Cargar el HTML en Cheerio
    const $ = cheerio.load(respuesta.data);

    // Limpiar la lista de partidos
    partidos = [];

    // Extraer los datos necesarios utilizando los selectores de Cheerio
    $('tr.vevent').each((i, el) => {
      const equipo1 = $(el).find('td.equipo1 a:nth-child(2)').text();
      const equipo2 = $(el).find('td.equipo2 a:nth-child(2)').text();
      const imgEq1 = $(el).find('td.equipo1 a img').attr('src');
      const imgEq2 = $(el).find('td.equipo2 a img').attr('src');
      const fechacompleta = $(el).find('td.fecha').text().trim();
      const fecha = fechacompleta.slice(0, 9);
      const hora = fechacompleta.slice(9, fechacompleta.length).trimStart().slice(0, 5);
      const estado = fechacompleta.slice(9, fechacompleta.length).trimStart().slice(5, fechacompleta.length).trimStart();
      const resultado = $(el).find('td.rstd a.url span.clase').text();
      const partido = {
        equipo1,
        equipo2,
        imgEq1,
        imgEq2,
        fecha,
        hora,
        estado,
        resultado
      };
      partidos.push(partido);
    });
  } catch (error) {
    // Manejar errores
    console.error(error);
  }
};

// Tarea programada para actualizar los datos cada minuto
const task = cron.schedule('* * * * *', () => {
  console.log('actualizando datos')
  actualizarDatos();
});

task.start(); // Inicia la tarea programada

// Exportar la función para consultar los datos actualizados
const consultarWebScraping = (req, res) => {
  res.json({
    jornada,
    partidos
  });
};

module.exports = {
  consultarWebScraping
};
