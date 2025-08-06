const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /produtos – Listar todos
router.get('/', async (req, res) => {
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
    `);

    const produtosFormatados = result.rows.map(prod => ({
      ...prod,
      availableSizes: ['P', 'M', 'G', 'GG']
    }));

    res.json(produtosFormatados);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

// POST /produtos – Criar novo
router.post('/', async (req, res) => {
  const { name, price, image, subcategory } = req.body;

  try {
    const subcatResult = await db.query('SELECT id FROM subcategorias WHERE nome = $1', [subcategory]);
    if (subcatResult.rowCount === 0) {
      return res.status(400).json({ erro: 'Subcategoria não encontrada' });
    }

    const subcategoria_id = subcatResult.rows[0].id;

    const result = await db.query(
      'INSERT INTO produtos (nome, preco, imagem, subcategoria_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, image, subcategoria_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    res.status(500).json({ erro: 'Erro ao adicionar produto' });
  }
});

// PUT /produtos/:id – Editar produto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, image, subcategory } = req.body;

  try {
    const subcatResult = await db.query('SELECT id FROM subcategorias WHERE nome = $1', [subcategory]);
    if (subcatResult.rowCount === 0) {
      return res.status(400).json({ erro: 'Subcategoria não encontrada' });
    }

    const subcategoria_id = subcatResult.rows[0].id;

    const result = await db.query(
      `UPDATE produtos 
       SET nome = $1, preco = $2, imagem = $3, subcategoria_id = $4 
       WHERE id = $5 RETURNING *`,
      [name, price, image, subcategoria_id, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ erro: 'Produto não encontrado' });

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao editar produto:', err);
    res.status(500).json({ erro: 'Erro ao editar produto' });
  }
});

// DELETE /produtos/:id – Deletar produto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) return res.status(404).json({ erro: 'Produto não encontrado' });

    res.json({ mensagem: 'Produto excluído com sucesso', produto: result.rows[0] });
  } catch (err) {
    console.error('Erro ao excluir produto:', err);
    res.status(500).json({ erro: 'Erro ao excluir produto' });
  }
});

module.exports = router;
