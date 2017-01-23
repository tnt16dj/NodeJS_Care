module.exports = function(app)
{   var Eligible = require('eligible-node');


    //or, pass them as object:
    var eligible = Eligible({
        apiKey: 'SbdQJVVtHq_cphPqloPIMgfqGMt8XewHM-Ka',
        isTest: true
    });

    app.get('/CoverageAll',function(req,res) {

        eligible.Coverage.all({
          payer_id: '0101001',
          provider_last_name: 'Doe',
          provider_first_name: 'John',
          provider_npi: '0123456789',
          member_id: 'cost_estimates_001',
          member_first_name: 'Todd',
          member_last_name: 'Tkach',
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
