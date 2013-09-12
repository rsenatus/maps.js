/**************************************************************************
* name : handle_map-unpack.js V1.0                                        *
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
* contact : contact@getinit.fr                                            *
**************************************************************************/
//
// PREAMBULE
//
// Ce fichier utilise l'encodage UTF8.
// Nous allons voir dans ce fichier l'utilisation de la librairie maps.js.
//
// Le programme se déroule dans le sens descendant c'est à dire qu'il suffit de descendre
// au fur et à mesure pour avancer. Ce sens peut s'inverser dans certaines fonctions.
// Nous n'aborderons pas directement javascript. Exemple nous n'expliquerons pas un
// for( .. in ..).
// 
// CONVENTIONS GENERALES
// On utilisera l'abréviation "js" au lieu de "javascript".
//
// Dans la mesure du possible on s'efforcera de ne pas utiliser un vocabulaire technique.
// Exemple : au lieu "d'instanciation de class", on dira simplement "démarrage".
// Par contre une "encapsulation" ne se dit pas seulement en programmation. On l'utilisera. 
//
// Les éléments entre crochet "[]" sont OPTIONNELS.
//
// CONVENTIONS SUR LES FONCTIONS
// La majorité des fonctions utilisées ont un nom qui COMMENCE par "get" ou "set". 
// la fonction "get" retourne une valeur. La fonction "set" définit une valeur.
// 
// Le nommage est en chameau (camel case). Exemple : getPays(arrContinent, strPays).
//
// CONVENTIONS SUR LES TABLEAUX
// Les tableaux/array utilisés dans le programme sont des tableaux d'objet.
//
// PHASES DE DEVELOPPEMENT DU SCRIPT
//
// Nous avons 5 phases :
// 1 - phase pré démarrage.
// 2 - phase définition des variables de maps et de google maps. 
// 3 - phase initialisation (init) de la map.
// 4 - phase gestion des événements d'initialisation de map.
// 5 - phase principale (main) - Gestion des evénements du programme. 
//
// Pour finir nous verrons également : 
// 6 - arrMonde.
// 7 - markers MouseOver.
// 8 - liste des méthodes de map utilisées dans ce programme.
//

//**************************************************************************
//
// 1 - PHASE : PRE-DEMARRAGE.
//
//**************************************************************************
//
// Cette ligne demande à javascript d'être plus stricte. Si j'écris i=8 au lieu de var i=8 j'ai une erreur. 
"use strict"

function getInit_HandleMap(){
//**************************************************************************
//
// 2 - PHASE : DEFINITION DES VARIABLES DE MAPS ET DE GOOGLE MAPS.
//
//**************************************************************************
//
// Avant de démarrer la map, nous devons définir 10 variables.
// Rassurez-vous les 10 sont optionnelles.
//
// Nous les numerotons et  les abordons dans l'ordre que je vous conseille de les créer.
//
// 1: [ styleMicro ]
// 2: [ styleMacro ]
// un "style" est une représentation visuelle de la map.
// par exemple je veux que la mer sur la map soit "jaune" et je ne veux pas afficher le nom des routes, etc...
// maps.js dispose de deux "styles" visuels prédéfinis. un micro et un macro.
// La valeur par défaut de chacun est un style que j'ai prédéfini.
// Vous pouvez les changer ou les "reset/annuler". 
//
// Il est possible de définir le styleMicro ET/OU le styleMacro 
// OU d'annuler l'un des deux styles. 
// Ou d'annuler les deux styles prédéfinis. 
//
// Pourquoi deux styles visuels ?
// A une certaine distance (donc de zoom) ce n'est pas forcément nécessaire d'afficher certains détails sur la map.
// Il est possible alors de déterminer avec "zoomLevelToSwapMapStyle" (option 9) quand changer de style visuel. 
// A un certain zoom, on passera donc du styleMacro au styleMicro.
//
// REMARQUE:
// a) si: styleMicro = styleMacro;  dans ce cas pas de changement de style
// b) si: styleMicro = ["whatEverNotDefine"] ou styleMacro = [""]; le visuel de la map sera le visuel par défaut 
// défini par Google.
//
// 3: [ center ]
// Ce paramètre est la position de la map au démarrage. Elle est aussi la position par défaut de la map.
// Sa valeur par défaut est {lat: 48.8533559, lng: 2.3758022}.
//
// 4: [ defZoom ]
// Niveau de zoom au démarrage de la map. Elle est aussi le niveau de zoom par défaut. Sa valeur par défaut est 7. 
//
// REMARQUE:
// la notion de "position par défaut" et "zoom par défaut" sera explicitée plus bas. Pour le moment, 
// c'est juste intéressant de les noter. On y reviendra. 
//
// 5: [ panControl ]
// 6: [ zoomControl ]
// 7: [ scaleControl ]
// 8: [ streetViewControl ]
// Affiche ou pas les contrôles standards de google maps. Leur valeur par défaut est false. 
//
// 9: [zoomLevelToSwapMapStyle]
// Niveau de zoom ou on passe de styleMacro a styleMicro. La valeur par défaut est 5 (zoom 5). 
//
// 10: [mapOptions]
// Objet dont les membres/propriétes sont les variables (1-9) précédemment citées. 
//
// 
//
// Nous commencons par la création d'un style visuel Micro.
  var styleMicro = [
    { featureType : "poi",
      stylers : [
        { visibility: "off" }
      ]
    },
    { featureType: "road",
      elementType: "geometry",
      stylers: [ 
        { hue: "#000000" },
        { lightness: 0 },
        { saturation : -100 },
        { gamma: 0.1 }, 
        { visibility: "simplified" }
      ]
    },
    { featureType: "road",
      elementType: "labels",
      stylers: [
        { lightness: 10 },
        { saturation : -100 },
        { gamma: 0.7 }, 
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

// Pour l'exemple on définit les membres de mapOptions.   
  var mapOptions = {
    center: {lat: 48.8533559, lng: 2.3758022},      
    defZoom: 8,                                     
    panControl: true,                                
    zoomControl: true,                              
    scaleControl: false,                            
    streetViewControl: false,                       
    styleMacro: ["none"],                            
    styleMicro: styleMicro,                         
    zoomLevelToSwapMapStyle: 8                      
  }; 
  
//**************************************************************************
//
// 3 - PHASE : INITIALISATION DE la map (INIT).
//
//**************************************************************************
//
// Instanciation de l'objet map. Il faut absolument définir un container (c'est à dire le DIV dans le fichier HTML
// qui va recevoir la map) et sa taille avant d'instancier la map.
  
  var map = new Map("map_canvas", mapOptions);


// REMARQUE : var map = new Map("map_canvas") suffit largement.
// Pretez attention a l'id de la DIV. Un conflit de nom peut surgir avec les variables utilisés par google maps. 
// "map_canvas" est un bon choix. 
//
//**************************************************************************
//
// 4 - PHASE : GESTION DES EVENEMENTS INITIALISATION DE MAP.
//
//**************************************************************************
//
// Ts les "Event" définis dans la docs "google maps api v3"/google.maps.event sont disponibles.
// Dans notre cas on attend que la map ait fini de loader pour continuer le programme.
// Le callback retourne un objet event nommé ici "e" (mais qu'on utilise pas). 
  map.handleMapEvent('tilesloaded', function(e){
    continueWithMarker();
  });
  

// On passe un tableau d'objet à la méthode addMarker de notre objet map.
//
// - Si le tableau dispose du couple {lat: xx.xxxx, lng: yy.yyyy}, alors le marker est positione selon les 
// coordonnes lat/lng. 
// - Si le tableau ne dispose pas du couple  {lat: xx.xxxx, lng: yy.yyyy} la methode addMarker fait une 
// demande de geolocalisation en fonction du membre/propriete : "xlocation" dans le tableau passé. 
// exemple [{xlocation: "adresse a determiner la position"}].
//
// En fin de traitement, la méthode "addMarker" nous retourne le MÊME tableau MAIS avec un nouveau 
// membre/propriété "m" pour chaque objet. "m" est la référence Marker pour chaque objet.
// Exemple : la ligne 0 de arrDepart aura une réference marker = arrDepart[0].m. 
  function continueWithMarker() { 
    map.addMarker(arrMonde, function(arrMondeWithMarker){
      
      arrMonde = arrMondeWithMarker;
      arrMondeWithMarker = null; 
      $(window).trigger("EndMarker");
      
      //des que tous les marker sont crées, nous passons à la fonction "main". Le coeur de module. 
      main(); 
    });
  }

  
//**************************************************************************
//
// 5 - PHASE : PRINCIPALES (MAIN) - GESTION DES EVENEMENTS DU PROGRAMME (COTE FONCTIONNEL)
//
//**************************************************************************
//
// Nous commencons par placer des listener sur les "marker" et sur les "select" .
// Et nous laissons la propagation se faire.
//
  function main() {
    handleMarkerClick();
    handleSelectEvent();
  }
  
  function handleMarkerClick(){
      function init() {
        var zoom = 13;
          //
          // N'OUBLIEZ PAS DE LIRE PLUS BAS : ARRMONDE. 
          //
          for (var i=0, l=arrMonde.length; i<l; i++ ) {
            var m = arrMonde[i].m;
            
            // setTitle est une méthode propre aux markers de google maps.
            m.setTitle(arrMonde[i].societe);
            
            // On utilise le namespace google.maps.event pour attacher un listener sur chaque marker de chaque ligne
            // du tableau.
            google.maps.event.addListener(m,'click',function(e){
                // L'orsqu'on clique sur un marker on se positionne dessus et on zoom.
                // Nous allons utiliser la méthode goTo([destination]) de notre objet map pour cela.
                //
                // Elle prend 3 paramètres :
                //
                // 1: [ DESTINATION ]: un string (ex : map.goTo("paris")) OU un objet 
                // (Ex : map.goTo({lat: xx.xxx, lng: yy.yyyy}).
                //
                // REMARQUE :
                // "destination" est optionnelle. 
                // Si on fait simplement un map.goTo() Dans ce cas on se positionne sur les 
                // coordonnées lat, lng d'initialisation. La position "center" (option d'initialisation 3) initiale 
                // est la position par défaut de la map. 
                // 
                // 2: [ ZOOM ]: le niveau de zoom que l'on souhaite. 
                // Dans le cas contraire le "defZoom" (option d'initialisation 4) est utilisé.
                //
                // 3: [ CALLBACK ]: une fonction callback. Pour le moment on ne va pas l'utiliser.
                //
                map.goTo({lat: this.getPosition().lat(), lng: this.getPosition().lng()}, zoom);
            }); 
          }
      }
    init(); 
  }

//**************************************************************************
//
// 5 - PHASE : PRINCIPALES (MAIN) - GESTION DES EVENEMENTS DU PROGRAMME (COTE FONCTIONNEL / 2)
//
//**************************************************************************  
//
// Cette partie est uniquement du javascript. 
// Nous ne nous y attarderons pas trop. 
// Pour résumer, chaque fois que vous cliquez sur un
// des 3 select de la page web une fonction correspondante est appelée. 
//
// Si on click sur le select "continent", la map se place sur le continent en question. 
// Si on click sur le select "pays", la map se positionne sur le pays.
// si on click sur le select "ville", la map se positionne sur la ville.
//
// POur le positionnement de la map sur un continent 
// nous utilisons un autre array/tableau. Cela nous permet juste d'avoir plus de flexibilité sur 
// l'affichage. On aurait pu faire un map.goTo("europe"); 
//
 
  function handleSelectEvent() {
    $(window).on("EndContinentChange", function(e, data){
        goToContinent(data); 
    }); 
  
    $(window).on("EndPaysChange", function(e, data){
        goToPays(data);
    });
    
    $(window).on("EndVilleChange", function(e, data){
        goToVille(data);
    }); 
  }
    
  function goToContinent(data) {
      var continentName = data.continent;
      
        if (continentName != "Continent") {
          var row = getRowWithKeyValue(arrContinent, "nom", continentName);
          map.goTo({lat: row[0].lat, lng: row[0].lng});
          
        }else{
          map.goTo(); 
        } 
  }
  
  function goToPays(data){
      var paysName = data.pays;
        if (paysName != "Pays") {
          map.goTo(paysName);
        }else{
          goToContinent(data); 
        } 
  }
  
  function goToVille(data){
      var continentName = data.continent;
      var paysName = data.pays;
      var villeName = data.ville; 
      
        if (villeName != "Ville") {
          var arrContinent = getRowWithKeyValue(arrMonde, "continent", continentName);
          var arrPays = getRowWithKeyValue(arrContinent, "pays", paysName);
          var arrVille = getRowWithKeyValue(arrPays, "ville", villeName);
          map.goTo({lat : arrVille[0].lat, lng: arrVille[0].lng}, 13); 
        }else{
          goToContinent(pays); 
        } 
  }
}

//**************************************************************************
//
// 6 - ARRMONDE
//
//**************************************************************************
//
// Lorsque vous utilisez un tableau d'objet pour générer les markers
// 1 - soit tous les objets disposent des membres "lat" et "lng" (ex: [{lat : xx.xxx, lng: yy.yyyy}])
// 2 - soit l'objet dispose de la propriété "xlocation" (ex: [{xlocation: "string adresse à géolocaliser"}])
// Le positionnement du marker utilise l'un ou l'autre. La prédominance va a lat/lng. 
// 
// le tableau est de la forme : 
// [
// {lat: xx.xxxxxx, lng: yy.yyyy, marker: '/path/name.ext', markerOver: '/path/name.ext'},
// {xlocation: "adresse/lieu a geolocaliser"}, 
// {lat: xx.xxxxxx, lng: yy.yyyy}
// ]
// 

//**************************************************************************
//
// 7 - MARKER / MOUSEOVER
//
//**************************************************************************
//
// Par défaut maps.js utilise les markers fournis dans le zip.
// Ces markers doivent être placés dans un sous dossier "images".
// Il est possible de personnaliser l'icone de chaque objet (donc de chaque marker) du tableau passé à la
// methode addMarker de map.
//
// pour ce faire l'objet du tableau doit contenir la propriété "marker" et "markerOver"
// (ex: {marker: "/path/images.jpg", markerOver: "/path/imagesOver.png"})
//
// Le swap en cas de mouseOver est géré par la méthode addMarker.
// Si vous ne voulez pas de swap, définissez la même image pour "marker" et "markerOver". 

//**************************************************************************
//
// 8 - LISTE DES METHODES DE MAP UTILISEES DANS CE PROGRAMME
//
//**************************************************************************
//
// Pour notre demonstration, nous avons utilisé 3 méthodes uniquement : 
//
// map.handleMapEvent('Event', callback(e))
// map.addMarker(arrXLocationOULatLng, callback(arrXLocationOULatLngWithMarkerReference))
// map.goTo("strDestination ou {lat/lng}", intZoom, callback(e))
//
// 

//**************************************************************************
//
// 9 - EXTRAS
//
//**************************************************************************
//
// map dispose aussi des méthodes : 
// geoCodeRequest()
// zoomIn()
// zoomOut()
// setZoom()
