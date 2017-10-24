// Node Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var logger = require('morgan');
var request = require('request');
var cheerio = require('cheerio');
var methodOverride = require('method-override')
var fs = require("fs");
var hbs = require('hbs');
// Set up Express
var app = express();
var router = express.Router();

//handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))



// Set up Mysql
var con = mysql.createConnection({
  host: "t89yihg12rw77y6f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: " cebmfhhuvj75vrcv",
  password: "eg0mum62akjhzikk",
});

//conecting to mysql
con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected to the matrix..");
});

con.query('CREATE DATABASE IF NOT EXISTS warehouse', function (err) {
    if (err) throw err;
    con.query('USE warehouse', function (err) {
        if (err) throw err;
        con.query('CREATE TABLE IF NOT EXISTS storage('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'link VARCHAR(255),'
            + 'item VARCHAR(255),'
            + 'stock VARCHAR(255)'
            +  ')', function (err) {
                if (err) throw err;
            });
    });
});

// Parse application/x-www-form-urlencoded
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));



//post to database with link
app.post('/submit', function (req, res) {
   var createLink = {
    link: req.body.link,
   }
   var createItem = {

   }
    con.query('INSERT INTO links SET ?', createLink,
        function (err, result) {
            if (err) throw err;
            console.log(req.body)
            res.send('Link added to database with ID: ' + result.insertId);
        }
    );
});

//GET ROUTE for scraping second link
router.get('/scrape');

//scrape second link
app.post('/scrape', function(req, res){

  url = req.body.link;
  var createUrl = {
    link: req.body.link
  }
  var createItem= {
    item: req.body.item
  }
  var createJson= {
    reviews:"",
  }

//starts to scrape the user input link
   request(url, function(err, response, html) {

      if(!err){
       var $= cheerio.load(html);

      var reviews;
      var json ={
        reviews:"",
      };
      //captures target
      $('#reviews-text').filter(function(){
        //Holds data
        var data=$(this)




        reviews = data.text();
        createJson=reviews;
        json.reviews=reviews;

        if(json.reviews === "Reviews") {
          console.log("reviewed checked and item has review")
        } else {
          console.log("No reviews availible")


        }

     

      })
        var sql= "INSERT INTO storage (link, item, stock) VALUES ('" +createUrl.link +"','"+createItem.item+"','"+json.reviews+"')"
        con.query(sql,
        function (err, result) {
            if (err) throw err;
            console.log(req.body)
            res.send('Link added to database with ID: ' + result.insertId + " " + "go to /index to see database");
        }
    );
    }



  })
// res.send('Check your console!')

// res.sendfile('views/forms.html')
})


//prints database to page
app.get('/index', function(req,res) {

    con.query('SELECT * FROM storage;', function(err, data) {
      if (err) throw err;

      //test it
      //console.log('The solution is: ', data);

      //test it
      //res.send(data);

      res.render('index', {storage : data});
    });
});

//delete data entry
app.delete('/delete', function(req,res){
    con.query('DELETE FROM storage WHERE id = ?', [req.body.id], function(err, result) {
      if (err) throw err;
      res.redirect('/index');
    });
});

// Open Server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});

