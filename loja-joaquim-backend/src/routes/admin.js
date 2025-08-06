const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /admin — ações administrativas
router.post('/', async (req, res) => {
  const { acao, dados } = req.body;

  if (!acao || !dados) {
    return res.status(400).json({ erro: 'Ação e dados são obrigatórios' });
  }

  try {
    if (acao === 'adicionarProduto') {
      const { nome, preco, descricao, imagem, subcategoria_id } = dados;

      const result = await db.query(
        `INSERT INTO produtos (nome, preco, descricao, imagem, subcategoria_id)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nome, preco, descricao, imagem, subcategoria_id]
      );

      return res.status(201).json({ mensagem: 'Produto adicionado', produto: result.rows[0] });
    }

    if (acao === 'adicionarSubcategoria') {
      const { nome, categoria_id } = dados;

      const result = await db.query(
        `INSERT INTO subcategorias (nome, categoria_id)
         VALUES ($1, $2) RETURNING *`,
        [nome, categoria_id]
      );

      return res.status(201).json({ mensagem: 'Subcategoria adicionada', subcategoria: result.rows[0] });
    }

    return res.status(400).json({ erro: 'Ação desconhecida' });
  } catch (err) {
    console.error('Erro na ação administrativa:', err);
    res.status(500).json({ erro: 'Erro ao processar ação administrativa' });
  }
});

module.exports = router;
