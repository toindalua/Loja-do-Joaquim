const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todas subcategorias com categorias
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.id, s.nome, cs.categoria_id, c.nome AS categoria
      FROM subcategorias s
      LEFT JOIN categoria_subcategoria cs ON s.id = cs.subcategoria_id
      LEFT JOIN categorias c ON cs.categoria_id = c.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar subcategorias' });
  }
});

// Criar subcategoria com múltiplas categorias
router.post('/', async (req, res) => {
  const { nome, categorias } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO subcategorias(nome) VALUES($1) RETURNING id',
      [nome]
    );
    const subcategoriaId = result.rows[0].id;

    for (const categoriaId of categorias) {
      await db.query(
        'INSERT INTO categoria_subcategoria(categoria_id, subcategoria_id) VALUES($1, $2)',
        [categoriaId, subcategoriaId]
      );
    }

    res.status(201).json({ id: subcategoriaId, nome, categorias });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar subcategoria' });
  }
});

// Atualizar subcategoria e categorias associadas
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, categorias } = req.body;

  try {
    await db.query('UPDATE subcategorias SET nome=$1 WHERE id=$2', [nome, id]);
    await db.query('DELETE FROM categoria_subcategoria WHERE subcategoria_id=$1', [id]);

    for (const categoriaId of categorias) {
      await db.query(
        'INSERT INTO categoria_subcategoria(categoria_id, subcategoria_id) VALUES($1, $2)',
        [categoriaId, id]
      );
    }

    res.json({ id, nome, categorias });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar subcategoria' });
  }
});

// Deletar subcategoria
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM subcategorias WHERE id=$1', [id]);
    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar subcategoria' });
  }
});

module.exports = router;
