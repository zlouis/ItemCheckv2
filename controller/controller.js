var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

router.get('/scraping', function(req, res){

  request('https://www.costco.com/LG-86%22-Class-(85.6%22-Diag.)-4K-Ultra-HD-LED-LCD-TV.product.100361021.html', function(error, response, html) {

    var $ = cheerio.load(html)
     var reviews;
     var json ={
        reviews:"",
      };

      $('#reviews-text').filter(function(){

        var data=$(this);

        reviews = data.text();

        json.reviews=reviews;

        if(json.reviews === "Reviews") {
          console.log("reviewd checked")
        } else {
          console.log("didn't work")
        }

      })


  })
})
module.exports = router;
