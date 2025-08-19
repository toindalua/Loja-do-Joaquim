const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /subcategorias — lista todas as subcategorias
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.id, s.nome, c.nome AS categoria
      FROM subcategorias s
      JOIN categoria_subcategoria cs ON s.id = cs.subcategoria_id
      JOIN categorias c ON cs.categoria_id = c.id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar subcategorias:', err);
    res.status(500).json({ erro: 'Erro ao buscar subcategorias' });
  }
});

// GET /subcategorias/:id/produtos — lista produtos de uma subcategoria
router.get('/:id/produtos', async (req, res) => {
  const subcategoriaId = req.params.id;

  try {
    const result = await db.query(`
      SELECT 
        p.id,
        p.nome AS name,
        p.preco AS price,
        p.imagem AS image,
        s.nome AS subcategory,
        c.nome AS category
      FROM produtos p
      JOIN subcategorias s ON p.subcategoria_id = s.id
      JOIN categorias c ON s.categoria_id = c.id
      WHERE p.subcategoria_id = $1
    `, [subcategoriaId]);

    const produtosFormatados = result.rows.map(prod => ({
      ...prod,
      availableSizes: ['P', 'M', 'G', 'GG'],
    }));

    res.json(produtosFormatados);
  } catch (err) {
    console.error('Erro ao buscar produtos por subcategoria:', err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

module.exports = router;
