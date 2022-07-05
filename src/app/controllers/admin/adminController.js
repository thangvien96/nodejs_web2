const db = require('./../../../config/db');
var fs = require('fs');

const table = 'products'

class adminController {
  index(req,res,next){
    if (req.session.username != undefined) {
        res.render('home', { user: req.session.username });
    }
    else {
        res.redirect('/admin/login');
    }
  }

  authentication(req,res,next){
    if (req.session.username != undefined) {
        next();
    }
    else {
      res.redirect('/admin/login');
    }
  }

  getLogin(req,res,next){
    res.render('admin/login');
  }

  postLogin(req,res,next){
    //console.log("body post==========",req.body);
    let username = req.body.email;
    let password = req.body.password;
    console.log(username + "===" + password);
    let sql = "SELECT * FROM ql_user WHERE username='" + username + "' AND password='" + password + "'";
    db.query(sql, (err, response) => {
        if (err) throw err;
        //res.json(response)
        //console.log(response);
        if(response.length > 0){
          req.session.username = response[0].username;
          res.redirect('/');
        }else{
          res.render('admin/login',{msg : "Thông tin tài khoản bị sai rồi"});
        }
    })
  }
  
  logout(req,res,next){
    req.session.destroy();
    res.redirect('/admin/login');
  }

  getProducts(req,res,next){
    let sql = 'SELECT * FROM ' + table
    db.query(sql, (err, response) => {
        if (err) next(err);
        res.json(response);
    })
  }

  profile(req,res,next){
    res.render('admin/profile');
  }

  uploadfile(req,res,next){
    console.log('file===',req.file);
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    let img = fs.readFileSync(req.file.path);
    let encode_image = img.toString('base64');
    //console.log('encode_image===', encode_image);
    fs.writeFile("./src/public/images/" + req.file.originalname, encode_image, 'base64', function(err) {
      console.log(err);
      if(err) res.send('Lỗi rồi');
      else res.send('Thành công');
    });
  }
}

module.exports = new adminController;