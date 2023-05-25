const cron = require('node-cron');
const { actualizarDatos } = require('../helpers/actualizar-datos');

// Función para realizar el web scraping y actualizar los datos
const consultarWebScraping = async(req, res) => {
  let jornada = req.params.jornada
  
  
  // Realizar la primera actualización de los datos
  partidos = await actualizarDatos(jornada);

  // Tarea programada para actualizar los datos cada minuto
  const task = cron.schedule('* * * * *', async () => {
  partidos = await actualizarDatos(jornada);
  console.log('Actualizando datos…');
  });

  task.start(); // Inicia la tarea programada

  res.json({
    jornada,
    partidos
  });
};



// Exportar la función para consultar los datos actualizados

module.exports = {
  consultarWebScraping,
};
