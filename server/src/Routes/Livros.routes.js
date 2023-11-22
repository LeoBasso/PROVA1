const express = require('express');

const livrosController = require('../controllers/LivrosController');

const router = express.Router();

router.get('/livros', livrosController.getAllLivros);

router.post('/livros', livrosController.createLivros);

router.put('/livros/:id', livrosController.updateLivros);

router.delete('/livros/:id', livrosController.deleteLivros);

module.exports = router;
