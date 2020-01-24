const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
    const {title, description, price, images, userId} = req.body;

    try {
        const product = await Products.create({
            title,
            description,
            price,
            images,
            user: userId
        });
        res.send({status: 'OK', data: product})
    } catch (e) {
        console.log('Error ', e);
        res.status(500).send({status: 'ERROR', data: e.message});
    }
};

const deleteProduct = (req, res) => {

};

const getProducts = async (req, res) => {
    try {
        const products = await Products.find().populate('user', 'username email data role').select('title description price');
        res.send({status: 'OK', data: products})
    } catch (e) {
        onsole.log('Error ', e);
        res.status(500).send({status: 'ERROR', data: e.message});
    }
};

const getProductsByUser = async (req, res) => {
    try {
        const products = await Products.find(
            {user: req.params.userId}
        );
        res.send({status: 'OK', data: products})
    } catch (e) {
        console.log('Error ', e);
        res.status(500).send({status: 'ERROR', data: e.message});
    }
};

module.exports = {createProduct, deleteProduct, getProducts, getProductsByUser};
