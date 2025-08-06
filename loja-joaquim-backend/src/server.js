const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const produtosRouter = require('./routes/produtos');
const categoriasRouter = require('./routes/categorias');
const subcategoriasRouter = require('./routes/subcategorias');
const pedidosRouter = require('./routes/pedidos');
const adminRouter = require('./routes/admin'); // ⬅️ MOVIDO AQUI

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/produtos', produtosRouter);
app.use('/categorias', categoriasRouter);
app.use('/pedidos', pedidosRouter);
app.use('/subcategorias', subcategoriasRouter);
app.use('/admin', adminRouter); // ⬅️ MOVIDO AQUI

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
