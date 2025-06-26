// backend/services/product.js
const Product = require('../models/product');

// Récupérer tous les produits avec filtrage optionnel
const getProducts = async (filters = {}) => {
  try {
    let query = {};
    
    // Filtrer par catégorie
    if (filters.category) {
      query.$or = [
        { category: new RegExp(filters.category, 'i') },
        { sport: new RegExp(filters.category, 'i') }
      ];
    }
    
    // Filtrer par recherche textuelle
    if (filters.search) {
      query.$text = { $search: filters.search };
    }
    
    return await Product.find(query);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
};

// Récupérer un produit par son ID
const getProductById = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit ${id}:`, error);
    throw error;
  }
};

// Créer un nouveau produit
const createProduct = async (productData) => {
  try {
    const newProduct = new Product(productData);
    return await newProduct.save();
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    throw error;
  }
};

// Mettre à jour un produit
const updateProduct = async (id, productData) => {
  try {
    return await Product.findByIdAndUpdate(
      id,
      productData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du produit ${id}:`, error);
    throw error;
  }
};

// Supprimer un produit
const deleteProduct = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Erreur lors de la suppression du produit ${id}:`, error);
    throw error;
  }
};

// Ajouter un avis à un produit
const addReview = async (productId, reviewData) => {
  try {
    const product = await Product.findById(productId);
    
    if (!product) {
      throw new Error('Produit non trouvé');
    }
    
    product.reviews.push(reviewData);
    
    // Recalculer la note moyenne
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating = totalRating / product.reviews.length;
    
    return await product.save();
  } catch (error) {
    console.error(`Erreur lors de l'ajout de l'avis au produit ${productId}:`, error);
    throw error;
  }
};

// Recherche avancée de produits
const searchProducts = async (query, options = {}) => {
  try {
    const { 
      minPrice = 0, 
      maxPrice = Number.MAX_SAFE_INTEGER,
      sortBy = 'name',
      sortOrder = 'asc',
      limit = 20
    } = options;
    
    // Construire la requête
    const searchQuery = {
      $text: { $search: query },
      price: { $gte: minPrice, $lte: maxPrice }
    };
    
    // Déterminer l'ordre de tri
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Exécuter la requête
    return await Product.find(searchQuery)
      .sort(sort)
      .limit(limit);
  } catch (error) {
    console.error('Erreur lors de la recherche de produits:', error);
    throw error;
  }
};



// Exporter uniquement les fonctions qui sont définies
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  searchProducts
};