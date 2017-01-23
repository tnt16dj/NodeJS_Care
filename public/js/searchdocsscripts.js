
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

function searchdoc(site) {
    var zipform = $("#zip").val();
    var insurersform = $("#insurers").val();
    var cptform = $("#cpt").val();
    var request = $.ajax({
        url: site,
        type: "GET",
        data: { zip: zipform, insurers: insurersform, cpt: cptform},
        dataType: "json"
    });

    request.done(function(msg) {
       //console.log(msg)
       var nmsg = JSON.parse(msg);
      // console.log(nmsg)
       var finaldiv = ""
         for (i = 0, ilen = nmsg.docs.length; i<ilen; i++){
           console.log(ilen)
            var div = makeDiv(nmsg.docs[i],$("#docpanel"))
            console.log(div)
            finaldiv = finaldiv + div
         }
         $("#docpanel").show();
         $("#docpanel").append(finaldiv)
         //$("#data").append(msg);
     });
     request.fail(function(jqXHR, textStatus) {
  alert( "Request failed: " + textStatus );
});
}

function makeDiv(obj,div){
  var $ajaxForm = $(div)
  $("#name", $ajaxForm).html(obj.first_name + ' ' + obj.last_name)
  $("#specialty", $ajaxForm).html(obj.specialty)
  $("#phone", $ajaxForm).html(obj.phone)
  $("#website", $ajaxForm).html(obj.website)
  $("#degree", $ajaxForm).html(obj.degree)
  $("#description", $ajaxForm).html(obj.description)
  return $ajaxForm.html()

}
