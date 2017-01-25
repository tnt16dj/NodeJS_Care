module.exports = function(app)
{ var bodyParser = require('body-parser');
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  var $ = require("jquery")
  var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyC8Shjrx_lysyOitfIwTzuWfQuAhAdnAUk'
      });
  var PokitDok = require('pokitdok-nodejs');
  var pokitdok = new PokitDok("x02cKLF1AizlQLAxGuGK", "mxSZvfioaodIRhobswPAazgRVojOvIuZpb6HBng3");
  var Eligible = require('eligible-node');
  var eligible = Eligible({
      apiKey: 'SbdQJVVtHq_cphPqloPIMgfqGMt8XewHM-Ka',
      isTest: true
  });
function estimatecost(price){

  eligible.Coverage.costEstimates({
    provider_npi: '0123456789', //'0123456789',
    provider_price: price, //'1500.50',
    service_type: '98', //stype
    network: 'IN',
    level: 'INDIVIDUAL',
    payer_id: '00001',
    member_id: 'COST_ESTIMATES_001'
  })
  .then(function(costEstimates) {
    console.log(costEstimates);
    cost_estimate = costEstimates.CostEstimates.cost_estimates[0].cost_estimate
    obj.docs[i].cost_estimate = cost_estimate
    //return cost_estimate
  //PARSE COST ESTIMATES STRUCT AND RETURN COST ESTIMATE res.send(costEstimates);
  })
  .catch(function(e) {
    //
    console.log(e);
  });
  console.log("GET ESTIMATE\n" + obj)

}

app.post('/providerAvgPrice',urlencodedParser,function(req,res1) {
  var avgprice = ""
    zipcode = req.body.zip
    cpt = req.body.cpt
    obj = req.body.obj
    console.log(cpt + " " + zipcode)
    pokitdok.cashPrices({
            zip_code: zipcode,
            cpt_code: cpt
        }, function (err, res2) {
        if (err) {
            return console.log(err, res1.statusCode);
        }
        // print the cpt, geo_zip and average price

            avgprice = res2.data[0].average_price;
            var response = {data: obj, price: avgprice}
            res1.send(response);


    });
    //res.send(response);
})

app.post('/getEstimate',urlencodedParser,function(req,res) {
  console.log("This is the request for get estimate")
    console.log(req)
    idx = req.body.index
    price = req.body.avgprice
      eligible.Coverage.costEstimates({
        provider_npi: '0123456789', //'0123456789',
        provider_price: price, //'1500.50',
        service_type: '98', //stype
        network: 'IN',
        level: 'INDIVIDUAL',
        payer_id: '00001',
        member_id: 'COST_ESTIMATES_001'
      })
      .then(function(costEstimates) {
        ///console.log("Cost Estimate returned")

        //console.log(costEstimates);
        //res.send({cost_estimate: "405.00", index: "0"})
        var cst_estimate = costEstimates.cost_estimates[0].cost_estimate
        //console.log("This is the cost estimate: " + cst_estimate)
      //  obj.cost_estimate = cost_estimate;
      //  obj.index = idx

          var response = {index: idx, cost_estimate: cst_estimate}
          console.log(response)
          res.send(response)
        })
      .catch(function(e) {
        //
        console.log("ERROR OCCURED")
        console.log(e);
      });


})




     app.post('/searchdoc',urlencodedParser,function(req,res){
       zip = req.body.zip
       cpt = req.body.cpt
       //zip = req.data.zip
       //cpt = req.data.cpt
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
                var obj = {}
                obj.first_name = checkstr(provider.first_name)
                obj.last_name = checkstr(provider.last_name)
                obj.degree = checkstr(provider.degree)
                obj.description = checkstr(provider.description)
                obj.website = checkstr(provider.website_url)
                obj.phone = checkstr(provider.phone)
                obj.address = checkstr(provider.locations.address_lines)
                obj.npi = checkstr(provider.npi)
                obj.specialty = checkstr(provider.specialty[0])
                obj.lat = ""
                obj.long = ""
                obj.index = i
                jsonarr.docs.push(obj)
                //console.log(stringify(jsonarr));
              }

            }
            var jsonarrstr = JSON.stringify(jsonarr);
            console.log(jsonarrstr)
            res.json(jsonarrstr)
        });
     });
}
