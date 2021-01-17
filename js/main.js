    //для фильтра
	let checkboxStates
	//create leaflet map
	var map = new L.Map('map', {
	center: new L.LatLng(52.2839771, 104.2877651),
	zoom: 14
	});
	// create openstreetmap base layer  
	var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
	map.addLayer(osm);
	
// loadGeoJson(quartals) from geoserver
function loadGeoJsonQ(response2) { 
console.log(response2); 
quartals.addData(response2);
map.addLayer(quartals); 
}; 
// create wfs layer quartals
var quartals = new L.GeoJSON(null,{
				//layer style
				style: function (feature) {
        return {
				color: 'white',
				stroke: 1,
				dashArray: 4,
				fillColor: '#9ACD32',
				fillOpacity: 0.2,
				}			 
				},
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 300};
                layer.bindPopup("<b>"+"Квартал №"+feature.properties.quarter+"</b>"
				,popupOptions);
				}
});
map.addLayer(quartals);
// loadGeoJson(quartals) from geoserver
var geoJsonUrlQ ='http://79.141.65.187:8080/geoserver/ows'; 
var defaultParametersQ = { 
  service: 'WFS', 
  version: '2.0.0', 
  request: 'GetFeature', 
  typeName: 'quarters', 
  outputFormat: 'application/json',
  format_options : 'callback:getJson',
  SrsName : 'EPSG:4326'
  }; 
var parametersQ = L.Util.extend(defaultParametersQ); 
console.log(geoJsonUrlQ + L.Util.getParamString(parametersQ)); 

var ajax = $.ajax({ 
  url: geoJsonUrlQ + L.Util.getParamString(parametersQ), 
  datatype: 'json', 
  jsonCallback: 'getJson', 
  success: [loadGeoJsonQ]
  }); 
 
	
	
	
	/* Пожар */
	var fireLine = L.tileLayer.wms('http://79.141.65.187:8080/geoserver/ows?', {
              format: 'image/png',
              layers: 'fireLine',
              transparent: 'true'
             }).addTo(map);
	var firePoli = L.tileLayer.wms('http://79.141.65.187:8080/geoserver/ows?', {
              format: 'image/png',
              layers: 'firePoli',
              transparent: 'true'
             }).addTo(map);
	var fireGroup = L.layerGroup([fireLine, firePoli]).addTo(map);

	/*Leaflet.Control.Search GeoCoding - OSM Nominatim */	
	/*  map.addControl( new L.Control.Search({
		url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
		jsonpParam: 'json_callback',
		propertyName: 'display_name',
		propertyLoc: ['lat','lon'],
		marker: L.circleMarker([0,0],{radius:30}),
		autoCollapse: true,
		autoType: false,
		minLength: 2
	}) ); */
	

//Geolocation
/* L.control.locate().addTo(map);  */

//добавление векторного слоя
function loadGeoJsonSP(response) { 
 console.log(response); 
	//geojsonLayerWells.addData(response); 
 
 //filter
 for (let input of document.querySelectorAll('input')) {
  //Listen to 'change' event of all inputs
  input.onchange = (e) => {
    geojsonStateProtection.clearLayers()
  	updateCheckboxStates()
    geojsonStateProtection.addData(response)   
  }
}
 map.addLayer(geojsonStateProtection); 
 /***** INIT ******/
 updateCheckboxStates()
 geojsonStateProtection.addData(response)
}; 



 //filter
function updateCheckboxStates() {
	checkboxStates = {
  	Matereals: [],
    gos: [],
	Archstyle: []
  }
  
	for (let input of document.querySelectorAll('input')) {
  	if(input.checked) {
    	switch (input.className) {
      	case 'go': checkboxStates.gos.push(input.value); break
        case 'Material': checkboxStates.Matereals.push(input.value); break
		case 'Architectu': checkboxStates.Archstyle.push(input.value); break
      }
    }
  }
}







//слой отображающий категорию гос охраны
 var geojsonStateProtection = new L.GeoJSON(null,{
				//стиль слоя
				style: function (feature) {
		           var go = feature.properties.go;
      if (go == "ГО н") {
        return {
          color: "yellow",
          fillOpacity: 0.5,
		  stroke: 0.1
        }; 
      }
      else if (go == "ГО р") {
        return {
          color: "orange",
          fillOpacity: 0.5,
		  stroke: 0.1		  
        };
      } else if (go == "ГО ф") {
        return {
          color: "red",
          fillOpacity: 0.5,
		  stroke: 0.1
        };
      } else {
        return {
          color: "green",
		  illOpacity: 0.5,
		  stroke: 0.1
        }
			};
			
	},	
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 300};
                layer.bindPopup("<dt>"+"<b>"+"Название:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Name+"</dd>"
				+"<dt>"+"<b>"+"Описание:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Descriptio+"</dd>"
				+"<dt>"+"<b>"+"Категория охраны:"+"</b>"+"</dt>"+"<dd>"+feature.properties.go+"</dd>"
				+"<dt>"+"<b>"+"Материал:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Material+"</dd>"
				+"<dt>"+"<b>"+"Дата постройки:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Date+"</dd>"
				+"<dt>"+"<b>"+"Архитектурный стиль:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Architectu+"</dd>"
				+"<dt>"+"<b>"+"Адрес по решениям и постановлениям:"+"</b>"+"</dt>"+"<dd>"+feature.properties.faddress+"</dd>"
				+"<dt>"+"<b>"+"Адрес:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Address+"</dd>"
				+ (feature.properties["3D model"]!="-" ? "<a href='#' id='btnShowModal' onclick='openModal(\""+feature.properties["3D model"]+"\");'><b>3D модель</b></a>" : "")
                    ,popupOptions);
				},
				
				
				
				
				
				 //filter
				filter: function (feature) {
				const isMaterealChecked = checkboxStates.Matereals.includes(feature.properties.Material)
				const isGoChecked = checkboxStates.gos.includes(feature.properties.go)
				const isArchitectuChecked = checkboxStates.Archstyle.includes(feature.properties.Architectu)
				return isMaterealChecked && isGoChecked && isArchitectuChecked //only true if both are true
				}
				
	});
 map.addLayer(geojsonStateProtection);




 //для получения векторного слоя 
 var geoJsonUrl ='http://79.141.65.187:8080/geoserver/ows'; 
 var defaultParameters = { 
  service: 'WFS', 
  version: '2.0.0', 
  request: 'GetFeature', 
  typeName: 'okn', 
  outputFormat: 'application/json',
  format_options : 'callback:getJson',
  SrsName : 'EPSG:4326'
  }; 



//second layer отображает матереал постройки
//работает при отключеном фильтре (filter 2)

 function loadGeoJsonM(response1) { 

 console.log(response1); 
 geojsonMaterial.addData(response1);
 //filter 2
 /* for (let input1 of document.querySelectorAll('input')) {
  //Listen to 'change' event of all inputs
  input1.onchange = (e) => {
    geojsonMaterial.clearLayers()
  	updateCheckboxStates1()
    geojsonMaterial.addData(response1)   
  }
} */
 
 map.addLayer(geojsonMaterial); 
}; 


 var geojsonMaterial = new L.GeoJSON(null,{
				
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 300};
                layer.bindPopup("<dt>"+"Название:"+"</dt>"+"<dd>"+feature.properties.Name+"</dd>"
				+"<dt>"+"Категория охраны:"+"</dt>"+"<dd>"+feature.properties.go+"</dd>"
				+"<dt>"+"Материал:"+"</dt>"+"<dd>"+feature.properties.Material+"</dd>"
				+"<dt>"+"Дата постройки:"+"</dt>"+"<dd>"+feature.properties.Date+"</dd>"
				+"<dt>"+"Архитектурный стиль:"+"</dt>"+"<dd>"+feature.properties.Architectu+"</dd>"
				+"<dt>"+"Адрес по решениям и постановлениям:"+"</dt>"+"<dd>"+feature.properties.faddress+"</dd>"
				+"<dt>"+"Адрес:"+"</dt>"+"<dd>"+feature.properties.Address+"</dd>"
				+ (feature.properties["3D model"]!="-" ? "<a href='#' id='btnShowModal' onclick='openModal(\""+feature.properties["3D model"]+"\");'><b>3D модель</b></a>" : "")
                    ,popupOptions);
				},
				
				style: function (feature) {
		           var mat = feature.properties.Material;

      if (mat == "дерево") {

        return {
          color: "Chocolate",
          fillOpacity: 0.5,
		  stroke: 0.1
        }; 
      }
      else if (mat == "камень") {
        return {
          color: "Gray",
          fillOpacity: 0.5,
		  stroke: 0.1
        };
      } else if (mat == "песчаник") {
        return {
          color: "LightSeaGreen",
          fillOpacity: 0.5,
		  stroke: 0.1
        };
		
	  } else if (mat == "песчаник/дерево") {
        return {
          color: "BlueViolet",
          fillOpacity: 0.5,
		  stroke: 0.1
		};  
	  } else if (mat == "камень/дерево") {
        return {
          color: "DodgerBlue",
		      fillOpacity: 0.5,
			  stroke: 0.1
        };
      } else {
        return {
          color: "green"
		  
        }
			};
			
     },
			//filter 2
			/* filter: function (feature) {
				const isMaterealChecked1 = checkboxStates1.Matereals1.includes(feature.properties.Material)
				const isGoChecked1 = checkboxStates1.gos1.includes(feature.properties.go)
				const isArchitectuChecked1 = checkboxStates1.Archstyle1.includes(feature.properties.Architectu)
				return isMaterealChecked && isGoChecked && isArchitectuChecked //only true if both are true
				} */
     
 });

 map.addLayer(geojsonMaterial);
 
   //filter 2
  /* function updateCheckboxStates1() {
	checkboxStates1 = {
  	Matereals1: [],
    gos1: [],
	Archstyle1: []
  }
  
	for (let input of document.querySelectorAll('input')) {
  	if(input.checked) {
    	switch (input.className) {
      	case 'go': checkboxStates1.gos1.push(input.value); break
        case 'Material': checkboxStates1.Matereals1.push(input.value); break
		case 'Architectu': checkboxStates1.Archstyle1.push(input.value); break
      }
    }
  }
} */
  
  
 //add json layers 
 var parameters = L.Util.extend(defaultParameters); 
 console.log(geoJsonUrl + L.Util.getParamString(parameters)); 

 var ajax = $.ajax({ 
  url: geoJsonUrl + L.Util.getParamString(parameters), 
  datatype: 'json', 
  jsonCallback: 'getJson', 
  success: [loadGeoJsonSP, loadGeoJsonM]
  }); 
 
 
 
 //legenda
var baseLayers = {
   /*  "OpenStreetMap": osm */
		"Категория государственной охраны(Фильтр)": geojsonStateProtection,
		"Материал": geojsonMaterial
};
var overlays = {
    /* "Объекты культурного наследия": geojsonStateProtection, */
	"Территория пострадавшая от пожара 1879 года": fireGroup,
	"Кварталы": quartals
	/* "Материал": geojsonMaterial */};
L.control.layers(baseLayers, overlays).addTo(map);



//info legenda
/* var infolegend = L.control({ position: "bottomleft"});
  
infolegend.onAdd = function(map) {	
  var div = L.DomUtil.create("div", "infolegend");

  div.innerHTML += "<h4>Категория охраны</h4>";
  div.innerHTML += '<i style="background: yellow"></i><span>Выявленые</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>Региональные</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>Федеральные</span><br>';
  div.innerHTML += '<i style="background: green"></i><span>Муниципальные</span><br>';
  div.innerHTML += "<h4>Материал постройки</h4>";
  div.innerHTML += '<i style="background: Chocolate"></i><span>Из дерева</span><br>';
  div.innerHTML += '<i style="background: Gray"></i><span>Из каменя</span><br>';
  div.innerHTML += '<i style="background: LightSeaGreen"></i><span>Из песчаника</span><br>';
  div.innerHTML += '<i style="background: BlueViolet"></i><span>Из песчаника и дерева</span><br>';
  div.innerHTML += '<i style="background: DodgerBlue"></i><span>Из камня и дерева</span><br>';
  return div;
};

infolegend.addTo(map);
 */






/* Leaflet.Control.Search */
var searchControl = new L.Control.Search({
		layer: geojsonStateProtection,
		propertyName: ['Name','faddress'],
		marker: false,
		moveToLocation: function(latlng, title, map) {
			//map.fitBounds( latlng.layer.getBounds() );
			var zoom = map.getBoundsZoom(latlng.layer.getBounds());
  			map.setView(latlng, zoom); // access the zoom
		}
	});

	searchControl.on('search:locationfound', function(e) {
		
		//console.log('search:locationfound', );

		//map.removeLayer(this._markerSearch)

		e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
		if(e.layer._popup)
			e.layer.openPopup();

	}).on('search:collapsed', function(e) {

		featuresLayer.eachLayer(function(layer) {	//restore feature color
			featuresLayer.resetStyle(layer);
		});	
	});
	
	map.addControl( searchControl );  //inizialize search control
	
	
 
 
// 3D model popup window

function openModal(modelName)
{
	var loadingProgress = document.getElementById("loadingProgress");
	
	loadingProgress.innerText = 'Загрузка...';	
	
	var modal = document.getElementById("modalOverlayId");
	modal.classList.remove('is-inactive');
	modal.classList.add('is-active');

	window.loadModel(modelName, /*onStatus:*/ function(text) {
		loadingProgress.innerText = text;	
	});
}
 
function closeModal()
{
	var modal = document.getElementById("modalOverlayId");
	modal.classList.remove('is-active');
	modal.classList.add('is-inactive');
}
 
	
	