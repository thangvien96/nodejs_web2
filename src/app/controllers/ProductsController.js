const db = require('./../../config/db')

const table = 'products'

class productsController {
  index(req,res,next){
    //res.render('home');
    let sql = 'SELECT * FROM ' + table
    db.query(sql, (err, response) => {
        if (err) next(err);
        //res.json(response)
        res.render('home',{products: response});
    })
  }

  show(req,res){
    console.log("log===",req.params.slug);
    //res.send('News detail');
    let sql = 'SELECT * FROM ' + table + ' WHERE id="'+req.params.slug +'";';
    db.query(sql, (err, response) => {
        if (err) next(err);
        res.json(response);
        //res.render('products/show');
    });
  }

  // get sản phẩm
  create(req,res,next){
    res.render('products/create');
  }

  // post sản phẩm
  store(req,res,next){
    console.log("log===",req.body);
    res.json({alert: true});
  }
}

module.exports = new productsController;