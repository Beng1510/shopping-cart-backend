const productService = require('./product.service')

  
async function getProducts(req, res) {
    
    const products = await productService.query(req.query)
    console.log('products',products);
    res.send(products)
}

async function updateProduct(req, res) {
    const product = req.body;
    await productService.update(product)
    res.send(product)
}


module.exports = {
    getProducts,
    updateProduct
}