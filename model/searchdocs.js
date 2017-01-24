module.exports = function(app)
{ var bodyParser = require('body-parser');
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  var $ = require("jquery")
  var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyC8Shjrx_lysyOitfIwTzuWfQuAhAdnAUk'
      });
  var PokitDok = require('pokitdok-nodejs');
  var pokitdok = new PokitDok("x02cKLF1AizlQLAxGuGK", "mxSZvfioaodIRhobswPAazgRVojOvIuZpb6HBng3");
  var stringify = require('node-stringify');


function getPrices(zipcode,cptcode){
      pokitdok.cashPrices({
              zip_code: zipcode,
              cpt_code: cptcode
          }, function (err, res) {
          if (err) {
              return console.log(err, res.statusCode);
          }
          // print the cpt, geo_zip and average price

              var price = res.data[0].average_price;
              console.log(price);

      });
};
     app.get('/searchdoc',urlencodedParser,function(req,res){
        //cpt = req.query.cpt
        var zip = req.body.zip
        console.log(req.body.cpt)
        console.log(req.body.insurers)
        function checkstr(string){
          if (typeof string == "undefined"){
            string = ""
            return string
          }
          return string
        }
        pokitdok.providers({
            zipcode: zip,
            radius: '100mi',
            limit: 100
        }, function(err, res2){
            if(err) {
                return console.log(err, res2.statusCode);
            }
            // res.data is a list of results
            var jsonarr = {};
            jsonarr.docs = [];
            for(var i=0, ilen=res2.data.length; i < ilen; i++) {
                var provider = res2.data[i].provider;

                if (typeof provider.first_name !== "undefined"){
                console.log(provider.first_name + ' ' + provider.last_name);
                var obj = {}
                obj.first_name = checkstr(provider.first_name)
                obj.last_name = checkstr(provider.last_name)
                obj.degree = checkstr(provider.degree)
                obj.description = checkstr(provider.description)
                obj.website = checkstr(provider.website_url)
                obj.phone = checkstr(provider.phone)
                console.log(provider.locations.address_lines)
                obj.address = checkstr(provider.locations.address_lines)
                obj.npi = checkstr(provider.npi)
                obj.specialty = checkstr(provider.specialty[0])
                obj.lat = ""
                obj.long = ""
                jsonarr.docs.push(obj)
                //console.log(stringify(jsonarr));
              }

            }
            var jsonarrstr = JSON.stringify(jsonarr);
            console.log(jsonarrstr)
            res.json(jsonarrstr)
        });
        //console.log(cpt)


        //res.json("{}");
        //res.render('homepage',{uname:username})
     });
/*     app.get('/about',function(req,res){
        res.render('about.html');
    });
*/
}
