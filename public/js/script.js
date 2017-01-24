$(window).load(function(){

    $('#jsonAnswer').empty();

    switch(window.location.pathname) {

        case '/eligiblecoverage':
            getCoverage();

        case '/estimatecost':
            getCostEstimate();

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
        dataType: "html"
    });

    request.done(function(msg) {
        alert(msg);
        $('#jsonAnswer').append(msg);

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