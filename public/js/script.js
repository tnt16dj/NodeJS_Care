$(window).load(function(){

    $('#jsonAnswer').empty();

    switch(window.location.pathname) {

        case '/eligiblecoverage':
            getCoverage();
            break;

        case '/estimatecost':
            getCostEstimate();
            break;

    }

});


function getCoverage() {
    var request = $.ajax({
        url: '/CoverageAll',
        type: "GET",
        dataType: "html"
    });

    request.done(function(msg) {
        alert(msg)
        $('#jsonAnswer').append(msg);

        // do something
        var data = $.parseJSON($("#jsonAnswer").html());
        var coverage = new Coverage(data);

        buildCoverageHTML = function(coverage) {
        $(".coverage-section").remove();

        var plugin = new CoveragePlugin(coverage);

        // Adds the demographic section
        plugin.addEligibleMetadataSection();
        plugin.addDemographicsSection();
        plugin.addInsuranceSection1();
        plugin.addInsuranceSection2();
        plugin.addInsuranceSection3();
        plugin.addPlanMaximumMinimumDeductibles();
        plugin.addPlanCoinsurance();
        plugin.addPlanCopayment();
        plugin.addPlanDisclaimer();
        plugin.addAdditionalInsurancePolicies();
        plugin.addGenericServices();


        $('#eligibleContent').append(plugin.coverageSection);
        };

        buildCoverageHTML(coverage);

    });
        request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
    });

}



function getCostEstimate() {
    var request = $.ajax({
        url: '/CostEstimate',
        type: "GET",
        dataType: "json"
    });

    request.done(function(msg) {
        //var returnedData = JSON.parse(msg);

        alert(JSON.stringify(msg.cost_estimates[0]))
        var provider_price = msg.cost_estimates[0].provider_price
        var cost_estimate = msg.cost_estimates[0].cost_estimate
        var service_type = msg.cost_estimates[0].cost_estimate_equation.deductible[0].service_type
        alert("Provider Price: " + provider_price + "\nCost Estimate: " + cost_estimate + "\nService Type: " + service_type)
        //alert(jsonobj.cost_estimates[0].cost_estimate)
        $('#jsonAnswer').append(msg);

    });
        request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
    });

}
