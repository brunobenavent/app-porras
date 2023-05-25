const axios = require('axios');
const cheerio = require('cheerio');

let partidos = []
const actualizarDatos = async (jornada) => {
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
        const stringFechaHoraEstado = $(el).find('td.fecha').text().replace(/\s+/g, ' ').trim();
        const fecha = stringFechaHoraEstado.slice(0, 9);
        let hora;
        let estado;
        if (stringFechaHoraEstado.length === 22) {
          hora = '';
          estado = 'sin comenzar';
        } else {
          hora = stringFechaHoraEstado.slice(9, stringFechaHoraEstado.length).trimStart().slice(0, 5);
          estado = stringFechaHoraEstado.slice(9, stringFechaHoraEstado.length).trimStart().slice(5, stringFechaHoraEstado.length).trimStart();
        }
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
      return partidos

    } catch (error) {
      // Manejar errores
      console.error(error);
    }
  };

  module.exports = {
    actualizarDatos
  }