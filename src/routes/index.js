const routes = app => {
    app.get('/', (req, res) => {
        res.send('Hola');
    });

    app.get('/info', (req, res) => {
        res.send('Pagina informativa prueba');
    });

    app.get('*', (req, res) => {
        res.status(404).send('Not found');
    });
};

module.exports = routes;
