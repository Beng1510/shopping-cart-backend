const express = require('express')
const { getProducts, updateProduct} = require('./product.controller')
const router = express.Router()




router.get('/', getProducts)
router.put('/:id',  updateProduct)


module.exports = router