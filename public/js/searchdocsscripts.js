
$(document).ready(function(){/* google maps -----------------------------------------------------*/
google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {

  $("#docpanel").hide();
  var latlng = new google.maps.LatLng(40.4402568, -80.0001176);

  var mapOptions = {
    center: latlng,
    scrollWheel: false,
    zoom: 13
  };

  var marker = new google.maps.Marker({
    position: latlng,
    url: '/',
    animation: google.maps.Animation.DROP
  });

  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  marker.setMap(map);

};
/* end google maps -----------------------------------------------------*/
});
var latlongs = [{lat: 40.4402568, long: -80.0001176},
  {lat: 40.4378242, long: -79.9926758},
{lat: 40.4411909, long: -80.0004856},
{lat: 40.4528774, long: -80.0069309},
{lat: 40.441291, long: -79.9945702},
{lat: 40.4548452, long: -79.9756326}]
function markmap(lat, long, map){
    var latlng = new google.maps.LatLng(lat, lat);

    var marker = new google.maps.Marker({
      position: latlng,
      url: '/',
      animation: google.maps.Animation.DROP
    });

    //var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    marker.setMap(map);
}
function searchdoc(site) {
    var zipform = $("#zip").val();
    var insurersform = $("#insurers").val();
    var cptform = $("#cpt").val();
  
    var request = $.ajax({
        url: site,
        type: "POST",
        data: { zip: zipform, insurers: insurersform, cpt: cptform},
        dataType: "json"
    });

    request.done(function(msg) {
       //console.log(msg)
       var nmsg = JSON.parse(msg);
      // console.log(nmsg)
      cntr = new google.maps.LatLng(40.4475255, -79.9933976)
      var mapOptions = {
        center: cntr,
        scrollWheel: false,
        zoom: 13
      };
      var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
       var finaldiv = ""
         for (i = 0, ilen = nmsg.docs.length; i<ilen; i++){
           console.log(ilen)
            var div = makeDiv(nmsg.docs[i],$("#docpanel"), i)

            //map stuff
            markmap(latlongs[i].lat, latlongs[i].long, map)
            var latlng = new google.maps.LatLng(latlongs[i].lat, latlongs[i].long);
            var marker = new google.maps.Marker({
              position: latlng,
              url: '/',
              animation: google.maps.Animation.DROP
            });
            marker.setMap(map);
            console.log(div)
            finaldiv = finaldiv + div
         }
         $("#docpanel").show();
         $("#docpanel").html(finaldiv)
         getPrice(msg, zipform, cptform)
     });
     request.fail(function(jqXHR, textStatus) {
  alert( "Request failed: " + textStatus );
});
}

function getPrice(jsonarray, zipform, cptform){
    console.log("ingetprice")
    var request = $.ajax({
    url: "/providerAvgPrice",
    type: "POST",
    data: { obj: jsonarray, zip: zipform, cpt: cptform},
    dataType: "json"
    });request.done(function(msg) {
       console.log(msg)
       getEstimate(msg,msg.price);


     });
     request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
    });

}
function getEstimate(jsonarray, price){
    console.log("ingetestimate")
    console.log(jsonarray)
    console.log(JSON.parse(jsonarray.data))
    jsonarray2 = JSON.parse(jsonarray.data)
    var price = jsonarray.price
    var costestimatenid = []
    for(var i=0, ilen=jsonarray2.docs.length; i < ilen; i++){
    var request = $.ajax({
    url: "/getEstimate",
    type: "POST",
    data: {avgprice: price, index: jsonarray2.docs[i].npi},
    dataType: "json"
    });request.done(function(msg) {
       var nmsg = msg;
       console.log(nmsg)
       var npi = msg.index
       var cost_estimate = msg.cost_estimate
       for (j=0; j<5; j++){
         if ($('#'+j ).html() == ""){
           newcost = cost_estimate + j
       $('#'+j ).html("$" + newcost + ".00")
          }
        }
       //console.lmsg)
     });
   }
     request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
    });

}

function makeDiv(obj,div, i){
  var $ajaxForm = $(div)
  var directions = 'https://www.google.com/maps/dir/Presto,+PA+15142/One+PNC+Plaza,+Fifth+Avenue,+Pittsburgh,+PA/@40.4139288,-80.0947609,13z/am=t/data=!4m14!4m13!1m5!1m1!1s0x88345817060792ff:0xe91018e978c1ef85!2m2!1d-80.1177335!2d40.3863715!1m5!1m1!1s0x8834f156e2bfacd5:0xfd479dd7cd90a46f!2m2!1d-80.000496!2d40.4412198!5i1'
  $("#name", $ajaxForm).html(obj.first_name + ' ' + obj.last_name + '<span class="cost_estimate" id = \"' +i +'\"></span>')
  $("#specialty", $ajaxForm).html(obj.specialty + '<span class="cost_estimate"><a href=\"'+directions+'\">directions</a></span>')
  $("#phone", $ajaxForm).html(obj.phone)
  $("#website", $ajaxForm).html(obj.website)
  $("#degree", $ajaxForm).html(obj.degree)
  $("#description", $ajaxForm).html(obj.description)
  return $ajaxForm.html()

}
