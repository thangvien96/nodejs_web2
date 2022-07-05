const newsRouter = require('./news');
const productsRouter = require('./products');
const adminRouter = require('./admin');

function route(app){
  app.get('/', (req, res) => {
    res.render('home');
  });
  
  app.get('/about.html', (req, res) => {
    res.render('about');
  });
}

module.exports = route;
