const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
	query,
	getById,
	update,
};

async function query(filterBy = {}) {
	
	const criteria = _buildCriteria(filterBy);

	const sort = { [filterBy.sort]: 1 };
	const collection = await dbService.getCollection('product');
	try {
		
		const products = await collection.find(criteria).sort(sort).toArray();
		
		
	
		return products;
	} catch (err) {
		console.log('ERROR: cannot find products');
		throw err;
	}
}

async function getById(productId) {
	const collection = await dbService.getCollection('product');
	try {
		const product = await collection.findOne({ _id: ObjectId(productId) });
		return product;
	} catch (err) {
		console.log(`ERROR: while finding product ${productId}`);
		throw err;
	}
}



async function update(product) {
	const collection = await dbService.getCollection('product');
	product._id = ObjectId(product._id);
	

	try {
		await collection.updateOne({ _id: product._id }, { $set: product });
		return product;
	} catch (err) {
		console.log(`ERROR: cannot update product ${product._id}`);
		throw err;
	}
}



// function _buildCriteria(filter) {
// 	const criteria = {};
// 	if (filter.name) criteria.name = { $regex: filter.name };
// 	if (filter.type) criteria.type = filter.type;
// 	if (filter.region) criteria.region = filter.region;
// 	return criteria;
// }
