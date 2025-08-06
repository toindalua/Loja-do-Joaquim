const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /categorias — lista todas as categorias
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, nome FROM categorias ORDER BY nome');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar categorias:', err);
    res.status(500).json({ erro: 'Erro ao buscar categorias' });
  }
});

// GET /categorias/:nome — busca produtos por nome da categoria
router.get('/:nome', async (req, res) => {
  const nomeCategoria = req.params.nome;

  try {
    const categoria = await db.query(
      'SELECT id FROM categorias WHERE LOWER(nome) = LOWER($1)',
                                     [nomeCategoria]
    );

    if (categoria.rows.length === 0) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    const categoriaId = categoria.rows[0].id;

    const produtos = await db.query(
      'SELECT * FROM produtos WHERE categoria_id = $1',
      [categoriaId]
    );

    res.json(produtos.rows);
  } catch (err) {
    console.error('Erro ao buscar produtos por categoria:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

module.exports = router;
