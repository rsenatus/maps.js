﻿/**************************************************************************
* name : maps.js V1.0                                        *
* Cett oeuvre est mise à disposition selon les termes de la Licence       *
* Creative Commons Attribution 3 (BY NC SA) - Pas d’utilisation           *
* commerciale - Partage dans les mêmes conditions 3.0 France.             *
* http://creativecommons.org/licenses/by-nc-sa/3.0/fr/                    *
*                                                                         *
* Vous devez inclure ce fichier en cas de redistribution.                 *
* Vous n'avez pas le droit d'utiliser la clé map du propriétaire.         *
* Vous devez afin d'utiliser le logiciel en créer un gratuitement sur     *
* le site de google. En cas d'utilisation de la clé de l'auteur,          *
* les requêtes que vous avez effectuées avec cette clé                    *
* vous incombent.                                                         *
*                                                                         *
* contact : contact@getinit.fr, rsenatus@free.fr                          *
**************************************************************************/


function Map(containerID, options){
  var geocoder = new google.maps.Geocoder();
  var icon1 = "/images/m-markeryellow.png";
  var icon2 = "/images/m-markerblue.png"; 
  var initLatLngObj = {lat: 48.8533559, lng: 2.3758022};
  var map = new Object();
  var zoomLevelToSwapMapStyle = 7; 
  var defZoom = 7;
  var maxZoom = 16;
  var mDebug = false;
  var mapOptions = new Object(); 
  var styleMacro = [
    { featureType : "poi",
      stylers : [
        { visibility: "off" }
      ]
    },
    { featureType: "road",
      elementType: "geometry",
      stylers: [
        { visibility: "simplified" }
      ]
    },
    { featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },
    { featureType: "water",
      elementType: "all"
    },
    { featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        { visibility: "simplified" }
      ]
    }
  ];
  
  var styleMicro = [
    { featureType : "poi",
      stylers : [
        { visibility: "off" }
      ]
    },
    { featureType: "road",
      elementType: "geometry",
      stylers: [
        { visibility: "simplified" }
      ]
    },
    { featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "on" }
      ]
    },
    { featureType: "water",
      elementType: "all",
      stylers: [
        { color: "#383838" }
      ]
    },
    { featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        { visibility: "simplified" }
      ]
    }
  ];

    this.goTo = function (varData, zoom, callback){ goTo(varData, zoom, callback);}; 
    function goTo(varData, zoom, callback){
      var objLatLng = new Object();
      var targetZoom = zoom;
        
        function proceed() {
          if (typeof targetZoom == "undefined") targetZoom = defZoom;
          map.setZoom(targetZoom); 
          map.setCenter(objLatLng);
        }
      
        switch(typeof varData){
          case "string":
              geoCodeRequest(varData, function(results, status, lat, lng){
                  if (lat) {
                    objLatLng = getGoogleLatLng({lat: lat, lng: lng});
                    proceed(); 
                  }
              });
            break;
          case "object":
              objLatLng = getGoogleLatLng({lat : varData.lat, lng: varData.lng});  //new google.maps.LatLng(varData.lat, varData.lng); 
            break;
          default:
              objLatLng = getGoogleLatLng(initLatLngObj); 
            break; 
        }

        if (typeof varData != "string") {
          proceed(); 
        }
        
        if (typeof callback == "function") callback(); 
    }
  
    this.zoomIn = function (){ zoomIn();}; 
    function zoomIn(){
        var zoom = map.getZoom() + 1;
        if(zoom <= maxZoom) map.setZoom(zoom);
    }
    
    this.zoomOut = function (){ zoomOut();}; 
    function zoomOut(){
        var zoom = map.getZoom() - 1;
        if(zoom <= maxZoom) map.setZoom(zoom);
    }
    
    this.setZoom = function(nbrZoomVal){
        if(nbrZoomVal <= maxZoom) map.setZoom(nbrZoomVal); 
    }
 
    this.handleMapEvent = function(event, callback){ handleMapEvent(event, callback); }; 
    function handleMapEvent(event, callback){
        google.maps.event.addListener(map, event, function(e){
          if(typeof callback == "function") callback(e); 
        });   
    }
        
    this.geoCodeRequest = function(destination, callback){ geoCodeRequest(destination, callback); }; 
    function geoCodeRequest(destination, callback){
      geocoder.geocode( { 'address': destination}, function (results, status){
          switch (status) {
            case "OK":
                var lat = parseFloat(results[0].geometry.location.lat()); //.ob
                var lng = parseFloat(results[0].geometry.location.lng()); //.pb
                msg("lat : "+lat+" lng : "+lng);
                if (typeof callback == "function") callback (results, status, lat, lng);
              break;
            default:
                msg("Error on location position : "+ lastPosition); 
                if (typeof callback == "function") callback (results, status, false, false);
              break;
          }
      });
    }
            
    this.addMarker = function(arrObjMarker, callback){
        var arrNoLatLng = new Array(); 
        var lastPosition = new Number(); 
        
            function updateLatLng(results, status, lat, lng){
              arrNoLatLng.pop();
                switch (status) {
                  case "OK":
                      arrObjMarker[lastPosition].lat = lat;
                      arrObjMarker[lastPosition].lng = lng; 
                    break;
                }
                
              checkLatLng(); 
            }
            
            function addDefaultEventHandlerOnMarker(marker) {
              google.maps.event.addListener(marker, 'mouseover', function() {
                this.setIcon(icon2);
              });
                    
              google.maps.event.addListener(marker, 'mouseout', function() {
                this.setIcon(icon1);
              });
            }
            
            function putMarker(arrObjMarker, callback){
                var i = new Number();
                var l = new Number(); 

                  for (i =0 , l=arrObjMarker.length; i<l; i++ ) {
                    var location = getGoogleLatLng({lat: parseFloat(arrObjMarker[i].lat), lng: parseFloat(arrObjMarker[i].lng)});
                    var m = new google.maps.Marker({
                          position: location,
                          map: map
                        });
                    //determinons quel marker icon utilisé.
                    for (var propertie in arrObjMarker[i]) {
                      switch (propertie) {
                        case "marker":
                            icon1 = arrObjMarker[i][propertie];
                          break;
                        case "markerOver":
                            icon2 = arrObjMarker[i][propertie]; 
                          break; 
                      }
                    }
                    
                    m.setIcon(icon1);
                    addDefaultEventHandlerOnMarker(m); 
                    
                    msg("item: "        +i
                        +" lat : "      +parseFloat(arrObjMarker[i].lat)
                        +" lang : "     +parseFloat(arrObjMarker[i].lng)
                        +" icon1 : "    +icon1
                        +" icon2 : "    +icon2
                        +" location (obj latlng) : "+location);
                    
                    arrObjMarker[i].m = m; 
                  }
                if (typeof callback == "function") callback (arrObjMarker);
            }    
        
            function checkLatLng() {
                if (arrNoLatLng.length > 0) {
                    lastPosition = arrNoLatLng[arrNoLatLng.length-1].position;
                    if (typeof arrObjMarker[lastPosition].xlocation == "string" && arrObjMarker[lastPosition].xlocation.length > 0) {
                      geoCodeRequest(arrObjMarker[lastPosition].xlocation, function(results, status, lat, lng){                      
                        updateLatLng(results, status, lat, lng); 
                      });
                    }
                }else{
                  msg("end geocode request");
                  putMarker(arrObjMarker, callback); 
                }
            }
        
            function main() {
              for(var cursor=0, l=arrObjMarker.length; cursor < l; cursor++) {
                if (isNaN(parseInt(arrObjMarker[cursor].lat)) || arrObjMarker[cursor].lat == "undefined" || isNaN(parseInt(arrObjMarker[cursor].lng)) || arrObjMarker[cursor].lng == "undefined") {
                  arrNoLatLng.push({position: (cursor)});
                }
              }
              
              checkLatLng(); 
            } 

        if (typeof arrObjMarker != "object") msg("map.addMarker : not an array object");
        else main();             
    }
        
    function msg(strMsg, obj){
      if (mDebug) console.log("debug : "+ strMsg);
      if (mDebug && obj) console.debug("debug : "+ obj); 
    }
        
    function maptrigger(event) {
      google.maps.event.trigger(map, event); 
    }
    
    function removeMapEvent(event) {
      google.maps.event.removeListener(map, event);
    }
    
    function getGoogleLatLng(objLatLng){
      return new google.maps.LatLng(objLatLng.lat, objLatLng.lng); 
    }
    
    function setMapStyle(){
      if(map.getZoom() < zoomLevelToSwapMapStyle){
        map.setMapTypeId('Macro');
      }else{
        map.setMapTypeId('Micro');
      }
    }
  
    function main(){
      if(typeof(containerID) != "string" || document.getElementById(containerID) == null)
        msg("container error");
      else
      //Update default init params
      if (options) {
        mapOptions = options; 
        for (var params in mapOptions) {
          switch(params){
            case "center":
                if((typeof mapOptions[params].lat == "number") && (typeof mapOptions[params].lng == "number")) initLatLngObj = mapOptions[params];              
              break;
            case "defZoom":
                if(typeof mapOptions[params]== "number" && mapOptions[params] > 0) defZoom = mapOptions[params]; 
              break;
            //case "maxZoom":
            //    if(typeof mapOptions[params]== "number" && mapOptions[params] < 19) maxZoom = mapOptions[params]; 
            //  break;
            case "styleMacro":
                if (typeof mapOptions[params] == "array") styleMacro = mapOptions[params]; 
              break;
            case "styleMicro":
                if (typeof mapOptions[params] == "array") styleMicro = mapOptions[params]; 
              break;
            case "zoomLevelToSwapMapStyle":
              if (typeof mapOptions[params] == "number") zoomLevelToSwapMapStyle = mapOptions[params]; 
            break;
            case "debug":
              if (mapOptions[params]) mDebug = mapOptions[params];
            break;
          }
        } 
      }
      
      //Updatable params. 
      mapOptions.center = getGoogleLatLng(initLatLngObj);
      mapOptions.zoom = defZoom;
      
      //UnUpdatable params.
      mapOptions.mapTypeControl = false;
      
      //map init. 
      map = new google.maps.Map(document.getElementById(containerID), mapOptions);
      msg("Loading google map"); 
      //style options
      var styledMacroType = new google.maps.StyledMapType(styleMacro, {name: 'Macro'});
      var styledMicroType = new google.maps.StyledMapType(styleMicro, {name: 'Micro'});
      
      //style map
      map.mapTypes.set('Macro', styledMacroType);
      map.mapTypes.set('Micro', styledMicroType);
      setMapStyle(); 
      
      //Default map event handler
      google.maps.event.addListener(map, 'zoom_changed', function() {
        if(map.getZoom() > maxZoom)  map.setZoom(maxZoom);
        msg("Actual zoom :" +map.getZoom()); 
        setMapStyle(); 
      });
      
      if (mDebug) msg("debug is on. You should turn it off"); 
    }
  
  main(); 
}

