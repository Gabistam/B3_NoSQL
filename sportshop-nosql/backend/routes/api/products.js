// backend/routes/api/products.js
const express = require('express');
const router = express.Router();
const productService = require('../../services/product');

// GET /api/products - Récupérer tous les produits avec filtres optionnels
router.get('/', async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      search: req.query.search
    };

    const products = await productService.getProducts(filters);

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits',
      error: error.message
    });
  }
});

// GET /api/products/:id - Récupérer un produit par son ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du produit',
      error: error.message
    });
  }
});

// POST /api/products - Créer un nouveau produit
router.post('/', async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);

    res.status(201).json({
      success: true,
      message: 'Produit créé avec succès',
      data: newProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création du produit',
      error: error.message
    });
  }
});

// PUT /api/products/:id - Mettre à jour un produit
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Produit mis à jour avec succès',
      data: updatedProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour du produit',
      error: error.message
    });
  }
});

// DELETE /api/products/:id - Supprimer un produit
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Produit supprimé avec succès',
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du produit',
      error: error.message
    });
  }
});

// POST /api/products/:id/reviews - Ajouter un avis à un produit
router.post('/:id/reviews', async (req, res) => {
  try {
    const { userId, userName, rating, comment } = req.body;

    if (!userId || !userName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis (userId, userName, rating, comment)'
      });
    }

    const updatedProduct = await productService.addReview(req.params.id, {
      userId,
      userName,
      rating,
      comment,
      date: new Date()
    });

    res.json({
      success: true,
      message: 'Avis ajouté avec succès',
      data: updatedProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de l\'ajout de l\'avis',
      error: error.message
    });
  }
});

// POST /api/products/search - Recherche avancée de produits
router.post('/search', async (req, res) => {
  try {
    const { query, options } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Le paramètre de recherche est requis'
      });
    }

    const products = await productService.searchProducts(query, options);

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche de produits',
      error: error.message
    });
  }
});

// GET /api/products/stats - Obtenir des statistiques sur les produits
router.get('/stats', async (req, res) => {
  try {
    const stats = await productService.getProductStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message
    });
  }
});

// GET /api/products/:id/similar - Obtenir des produits similaires
router.get('/:id/similar', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const similarProducts = await productService.getSimilarProducts(req.params.id, limit);

    res.json({
      success: true,
      count: similarProducts.length,
      data: similarProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits similaires',
      error: error.message
    });
  }
});

module.exports = router;
