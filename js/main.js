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
//map.addLayer(quartals); 
}; 
// create wfs layer quartals
var quartals = new L.GeoJSON(null,{
				//layer style
				style: function (feature) {
        return {
				color: '#9ACD32',//'white',
				stroke: 0.1,
				weight: 1,
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
//map.addLayer(quartals);
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
             })//.addTo(map);
	var firePoli = L.tileLayer.wms('http://79.141.65.187:8080/geoserver/ows?', {
              format: 'image/png',
              layers: 'firePoli',
              transparent: 'true'
             })//.addTo(map);
	var fireGroup = L.layerGroup([fireLine, firePoli])//.addTo(map);


	

//Geolocation
/* L.control.locate().addTo(map);  */

//добавление векторного слоя
function loadGeoJson(response) { 
 console.log(response); 
 geojsonStateProtection.addData(response);
 geojsonMaterial.addData(response);
 map.addLayer(geojsonStateProtection,geojsonMaterial);
}; 


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
		  fillOpacity: 0.5,
		  stroke: 0.1
        }
			};
			
	},	
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 300};
                layer.bindPopup(
				(feature.properties.Photo!="-" ? '<img src="pictures/'+ feature.properties.Photo +'"style="width:100%;height:100%;">':"")
				+"<dt>"+"<b>"+"Название:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Name+"</dd>"
				+"<dt>"+"<b>"+"Описание:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Descriptio+"</dd>"
				+"<dt>"+"<b>"+"Категория охраны:"+"</b>"+"</dt>"+"<dd>"+feature.properties.go+"</dd>"
				+"<dt>"+"<b>"+"Материал:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Material+"</dd>"
				+"<dt>"+"<b>"+"Дата постройки:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Date+"</dd>"
				+"<dt>"+"<b>"+"Архитектурный стиль:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Architectu+"</dd>"
				+"<dt>"+"<b>"+"Адрес по решениям и постановлениям:"+"</b>"+"</dt>"+"<dd>"+feature.properties.faddress+"</dd>"
				+"<dt>"+"<b>"+"Адрес:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Address+"</dd>"
				+ (feature.properties["3D model"]!="-" ? "<a href='#' id='btnShowModal' onclick='openModal(\""+feature.properties["3D model"]+"\");'><b>3D модель</b></a>" : "")
                    ,popupOptions);
				layer.options.tags=
				[feature.properties.Material,
				(feature.properties.go == "ГО н"?"Вновь выявленые":""),(feature.properties.go=="ГО р"?"Регионального значения":""),(feature.properties.go=="ГО ф" ? "Федерального значения":""),(feature.properties.go == "ГО м" ? "Муниципального значения":""),
				(feature.properties.Architectu !="-" ? feature.properties.Architectu : 'Не опеделен'),
				(feature.properties["3D model"]!="-" ? '3d модель' : ''),
				(feature.properties.Photo!="-" ? 'Фото' : '')];
				var searchTwo = layer.feature.properties;
				searchTwo.addressName = searchTwo.Name + " | " + searchTwo.faddress;
          
				},
	});
 //map.addLayer(geojsonStateProtection);

				
    var materialFilterButton = L.control.tagFilterButton({
      data: ['дерево','камень','песчаник','песчаник/дерево','камень/дерево'],
      icon: '<img src="images/m_filter.svg">',
      filterOnEveryClick: true
    }).addTo(map);
    
    var stateProtectionFilterButton = L.control.tagFilterButton({
      data: ['Вновь выявленые','Регионального значения','Федерального значения','Муниципального значения'],
			icon: '<img src="images/sp_filter.svg">',	
      filterOnEveryClick: true
    }).addTo(map);
  
     
    var archStyleFilterButton = L.control.tagFilterButton({
      data: ['Эклектика','Модерн','Классицизм','Сибирское барокко','Конструктивизм','Не опеделен'],
      icon: '<img src="images/style_filter.svg">',
      filterOnEveryClick: true
    }).addTo(map);
	
	var dopFilterButton = L.control.tagFilterButton({
      data: ['Фото','3d модель'],
      icon: '<img src="images/dop_filter.svg">',
      filterOnEveryClick: true
    }).addTo(map);
  
    materialFilterButton.addToReleated(stateProtectionFilterButton);
	  materialFilterButton.addToReleated(archStyleFilterButton);
    materialFilterButton.addToReleated(dopFilterButton);
	//stateProtectionFilterButton.addToReleated(archStyleFilterButton);
	//archStyleFilterButton.addToReleated(dopFilterButton);

    jQuery('.easy-button-button').click(function() {
        target = jQuery('.easy-button-button').not(this);
        target.parent().find('.tag-filter-tags-container').css({
            'display' : 'none',
        });
    });
  /*tag filter*/
  
  
  /* Leaflet.Control.Search */
  var searchControl = new L.Control.Search({
    layer: geojsonStateProtection,
    propertyName: 'addressName',
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
  
    e.layer.setStyle({ fillColor: '#3f0', color: '#0f0' });
    if (e.layer._popup)
      e.layer.openPopup();
  
  }).on('search:collapsed', function(e) {
  
    featuresLayer.eachLayer(function(layer) { //restore feature color
      featuresLayer.resetStyle(layer);
    });
  });
  
  map.addControl(searchControl); //inizialize search control
  /* Leaflet.Control.Search */
  


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
				layer.options.tags=[feature.properties.Material,feature.properties.go,feature.properties.Architectu];
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
			
     }
     
 });

 //map.addLayer(geojsonMaterial);
 
  
  
 //add json layers 
 var parameters = L.Util.extend(defaultParameters); 
 console.log(geoJsonUrl + L.Util.getParamString(parameters)); 

 var ajax = $.ajax({ 
  url: geoJsonUrl + L.Util.getParamString(parameters), 
  datatype: 'json', 
  jsonCallback: 'getJson', 
  success: [loadGeoJson]
  }); 
 
 
 
 //legenda
var baseLayers = {
   /*  "OpenStreetMap": osm */
		"Категория государственной охраны": geojsonStateProtection,
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
 
	
	