module.exports = function(app)
{   var Eligible = require('eligible-node');


    //or, pass them as object:
    var eligible = Eligible({
        apiKey: 'SbdQJVVtHq_cphPqloPIMgfqGMt8XewHM-Ka',
        isTest: true
    });
  /*   app.post('/homepage',urlencodedParser,function(req,res){
        var username = req.body.uname;
        console.log(username)
        res.render('homepage',{uname:username})
     });*/
     app.get('/mytabledata',function(req,res){
       eligible.Payer.all({
         endpoint: 'coverage',
      }).then(function(payers) {
        console.log(payers);
        res.send(payers)
      })

     })
/*     app.get('/about',function(req,res){
        res.render('about.html');
    });
*/

    app.get('/CoverageAll',function(req,res) {

        eligible.Coverage.all({
          payer_id: '00001',
          provider_last_name: 'Doe',
          provider_first_name: 'John',
          provider_npi: '0123456789',
          member_id: 'AETNA00DEP_ACPOSII',
          member_first_name: 'IDA',
          member_last_name: 'FRANKLIN',
          member_dob: '1701-12-12',
          service_type: '30',
        })
        .then(function(coverage) {
          console.log(coverage);
          res.send(coverage);
        })
        .catch(function(e) {
          //
          alert('error in coverage call');
        });
        
    })
}
