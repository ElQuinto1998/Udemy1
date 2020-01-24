const productRoutes = require('./products-route');
const userRoutes = require('./users-route');

module.exports = app => {
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/products', productRoutes);
};
