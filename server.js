const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/calcular', (req, res) => {
  const { lotes, combisLlenas } = req.body;

  let totalEntradas = 0;
  let ganancia = 0;

  for (const lote of lotes) {
    const precio = Number(lote.precio);
    const cantidad = Number(lote.cantidad);

    if (!isNaN(precio) && !isNaN(cantidad)) {
      totalEntradas += cantidad;
      ganancia += 0.07 * precio * cantidad;
    }
  }

  if (totalEntradas >= 10) ganancia += 10000;
  if (totalEntradas >= 1) ganancia += 0;

  ganancia += (parseInt(combisLlenas) || 0) * 20000;

  res.json({
    ganancia,
    totalEntradas,
    bonoPiso: totalEntradas >= 10,
    entraGratis: totalEntradas >= 1,
    bonoCombi: (parseInt(combisLlenas) || 0) > 0
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
