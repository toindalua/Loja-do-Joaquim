const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const pedido = req.body;
  console.log('Novo pedido recebido:', pedido);
  res.status(201).json({ mensagem: 'Pedido recebido com sucesso!' });
});

module.exports = router;
