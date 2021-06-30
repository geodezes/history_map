	//create leaflet map
	var map = new L.Map('map', {
	center: new L.LatLng(52.2839771, 104.2877651),
	zoom: 14,
	zoomControl:false
	});
	
	L.control.zoom({
    position: 'bottomright'
}).addTo(map);
	
	// create openstreetmap base layer  убрать .grayscale для обычной OSM
	var osmG = new L.tileLayer.grayscale('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
	map.addLayer(osmG);
	
		
	map.attributionControl.addAttribution('При поддержке <a href="https://xn--80afcdbalict6afooklqi5o.xn--p1ai/">Фонд Президентских грантов</a>');
	map.attributionControl.addAttribution('&copy <a href="https://irkobl.ru/sites/oknio/">Служба по охране объектов культурного наследия Иркутской области</a>');
	map.attributionControl.addAttribution('&copy <a href="http://labs.easyblog.it/stefano-cudini/">Stefano Cudini</a>');
	map.attributionControl.addAttribution('&copy <a herf="https://maydemirx.github.io/leaflet-tag-filter-button/">Mehmet Aydemir</a>');
	map.attributionControl.addAttribution('&copy <a>2020 ptma@163.com</a>');
	

////////////////////////////////////////////////////////////////////////////////////

var stripes = new L.StripePattern({weight: 1, color: "#d6ca97", angle: 100}); stripes.addTo(map);
	
// loadGeoJson(quartals) from geoserver
function loadGeoJsonQ(response2) { 
//console.log(response2); 
quartals.addData(response2);
}; 
// create wfs layer quartals
var quartals = new L.GeoJSON(null,{
				//layer style
				style: {
					//stroke: false,
					weight: 0.3,
					color: "#d6ca97",
					fillPattern: stripes,
					fillOpacity: 1,	
					zIndex: -1
				},
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup("<b>"+"Квартал №"+feature.properties.quarter+"</b>"
				,popupOptions);		
				layer.on({
					click: zoomToFeature
				});
				
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
 ////////////////////////////////////////////////////////////////////////////////
 
 
  // loadGeoJson(Fasadnik) from geoserver
function loadGeoJsonF(responseF) { 
console.log(responseF); 
Fasadnik.addData(responseF);
}; 
// create wfs layer Fasadnik
var Fasadnik = new L.GeoJSON(null,{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [27, 27],
                        iconAnchor: [15, 13],
                        popupAnchor:  [1, -24]
						}
				});
				//Грузим иконки
				var fsadnikIcon = new LeafIcon({iconUrl: 'images/icon/fasadnik_old.svg'});	
			
				return new L.marker(latlng, {icon: fsadnikIcon});
               },
				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(feature.properties.nameF
				,popupOptions
				);
				}
});


 
 // loadGeoJson(Fasadnik) from geoserver
var geoJsonUrlF ='http://79.141.65.187:8080/geoserver/ows'; 
var defaultParametersF = { 
  service: 'WFS', 
  version: '2.0.0', 
  request: 'GetFeature', 
  typeName: 'Fasadnik', 
  outputFormat: 'application/json',
  format_options : 'callback:getJson',
  SrsName : 'EPSG:4326'
  }; 
var parametersF = L.Util.extend(defaultParametersF); 
console.log(geoJsonUrlF + L.Util.getParamString(parametersF)); 

var ajax = $.ajax({ 
  url: geoJsonUrlF + L.Util.getParamString(parametersF), 
  datatype: 'json', 
  jsonCallback: 'getJson', 
  success: [loadGeoJsonF]
  }); 
 
/////////////////////////////////////////////////////////////////////////////////
 
 // loadGeoJson(Events) from geoserver
function loadGeoJsonE(responseE) { 
console.log(responseE); 
eventFire.addData(responseE);
eventEmergency.addData(responseE);
}; 
// create wfs layer Events
var eventFire = new L.GeoJSON(null,{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [27, 27],
                        iconAnchor: [13, 27],
                        popupAnchor:  [1, -24]
						}
				});
				//Грузим иконки
				var emegencyIcon = new LeafIcon({iconUrl: 'images/icon/eventEmergency.svg'}),
					fireIcon= new LeafIcon({iconUrl: 'images/icon/eventFire.svg'});
				//выбор иконки в зависимости от типа события
				var eventType=feature.properties.eventname;
				if(eventType=="emergency"){
                return L.marker(latlng, {icon: emegencyIcon});}
				else if (eventType=="fire"){
                return L.marker(latlng, {icon: fireIcon});}
            },
				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup("<dt>"+"<b>"+"Дата события:"+"</b>"+"</dt>"+"<dd>"+feature.properties.eventdate+"</dd>"
				+"<dt>"+"<b>"+"Описание:"+"</b>"+"</dt>"+"<dd>"+feature.properties.eventdis+"</dd>"
				,popupOptions
				);
				},
				filter: function (feature, layer){if (feature.properties.eventname === "fire")return true;}
});
/* map.addLayer(eventFire); */

// create wfs layer Events
var eventEmergency = new L.GeoJSON(null,{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [27, 27],
                        iconAnchor: [13, 27],
                        popupAnchor:  [1, -24]
						}
				});
				//Грузим иконки
				var emegencyIcon = new LeafIcon({iconUrl: 'images/icon/eventEmergency.svg'}),
					fireIcon= new LeafIcon({iconUrl: 'images/icon/eventFire.svg'});
				//выбор иконки в зависимости от типа события
				var eventType=feature.properties.eventname;
				if(eventType=="emergency"){
                return L.marker(latlng, {icon: emegencyIcon});}
				else if (eventType=="fire"){
                return L.marker(latlng, {icon: fireIcon});}
            },
				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup("<dt>"+"<b>"+"Дата события:"+"</b>"+"</dt>"+"<dd>"+feature.properties.eventdate+"</dd>"
				+"<dt>"+"<b>"+"Описание:"+"</b>"+"</dt>"+"<dd>"+feature.properties.eventdis+"</dd>"
				,popupOptions
				);
				},
				filter: function (feature, layer){if (feature.properties.eventname === "emergency")return true;}
});
/* map.addLayer(eventEmergency); */

// loadGeoJson(Events) from geoserver
var geoJsonUrlE ='http://79.141.65.187:8080/geoserver/ows'; 
var defaultParametersE = { 
  service: 'WFS', 
  version: '2.0.0', 
  request: 'GetFeature', 
  typeName: 'Events', 
  outputFormat: 'application/json',
  format_options : 'callback:getJson',
  SrsName : 'EPSG:4326'
  }; 
var parametersE = L.Util.extend(defaultParametersE); 
console.log(geoJsonUrlE + L.Util.getParamString(parametersE)); 

var ajax = $.ajax({ 
  url: geoJsonUrlE + L.Util.getParamString(parametersE), 
  datatype: 'json', 
  jsonCallback: 'getJson', 
  success: [loadGeoJsonE]
  }); 
 
///////////////////////////////////////////////////////////////////	
	
	/* Пожар */
	var fireLine = L.tileLayer.wms('http://79.141.65.187:8080/geoserver/ows?', {
              format: 'image/png',
              layers: 'fireLine',
              transparent: 'true'
             });
	var firePoli = L.tileLayer.wms('http://79.141.65.187:8080/geoserver/ows?', {
              format: 'image/png',
              layers: 'firePoli',
              transparent: 'true'
             });
	var fireGroup = L.layerGroup([fireLine, firePoli]);

////////////////////////////////////////////////////////////////	

//Geolocation
/* L.control.locate().addTo(map);  */

//////////////////////////////////////////////////////////////

//добавление векторного слоя
function loadGeoJson(response) { 
 //console.log(response); 
 geojsonStateProtectionN.addData(response);
 geojsonStateProtectionR.addData(response);
 geojsonStateProtectionF.addData(response);
 geojsonStateProtectionM.addData(response); 

 
 map.addLayer(geojsonStateProtectionN);
 map.addLayer(geojsonStateProtectionR);
 map.addLayer(geojsonStateProtectionF);
 map.addLayer(geojsonStateProtectionM);
}; 


 ///////////////////
function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 3,
			color: 'yellow',
			dashArray: '',
			fillOpacity: 1
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

}


function resetHighlight(e) {
    geojsonStateProtectionR.resetStyle(e.target);
}

function resetHighlight(e) {
    geojsonStateProtectionN.resetStyle(e.target);
}

function resetHighlight(e) {
    geojsonStateProtectionF.resetStyle(e.target);
}

function resetHighlight(e) {
    geojsonStateProtectionM.resetStyle(e.target);
}


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
////////////////////




//слой отображающий категорию гос охраны Регеональные
 var geojsonStateProtectionR = new L.GeoJSON(null,{
				//стиль слоя		 
				style: goStyle,
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250
                };
                layer.bindPopup(
				(feature.properties.Photo!="-" ? '<img src="photos/'+ feature.properties.Photo +'"style="width:240;">':"")
				+"<dt>"+"<b>"+feature.properties.Name+"</b>"+"</dt>"//+"<dd>"+feature.properties.Name+"</dd>"
				+/*"<dt>"+"<b>"+"Описание:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Descriptio+"</dd>"*/(feature.properties.Descriptio!="-"?"<dd>"+feature.properties.Descriptio+"</dd>":"")
				+"<dt>"+"<b>"+"Категория охраны:"+"</b>"+"</dt>"+"<dd>"+(feature.properties.go=="ГО р"?"Регионального значения":"")+"</dd>"
				+"<dt>"+"<b>"+"Материал:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Material+"</dd>"
				+"<dt>"+"<b>"+"Дата постройки:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Date+"</dd>"
				+"<dt>"+"<b>"+"Архитектурный стиль:"+"</b>"+"</dt>"+"<dd>"+(feature.properties.Architectu!="-"?feature.properties.Architectu:"Не определен")+"</dd>"
				+(feature.properties.faddress!="-"?"<dt>"+"<b>"+"Адрес по решениям и постановлениям:"+"</b>"+"</dt>"+"<dd>"+feature.properties.faddress+"</dd>":"")
				+(feature.properties.Address!="-"?"<dt>"+"<b>"+"Адрес:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Address+"</dd>":"")
				+ (feature.properties["3D model"]!="-" ? "<a href='#' id='btnShowModal' onclick='openModal(\""+feature.properties["3D model"]+"\");'><b>3D модель</b></a>" : "")
                    ,popupOptions);
				//Теги фильтров
				layer.options.tags=
				[feature.properties.Material,
				(feature.properties.go == "ГО н"?"Вновь выявленные":""),(feature.properties.go=="ГО р"?"Регионального значения":""),(feature.properties.go=="ГО ф" ? "Федерального значения":""),(feature.properties.go == "ГО м" ? "Муниципального значения":""),
				(feature.properties.Architectu !="-" ? feature.properties.Architectu : 'Не опеделен'),
				(feature.properties["3D model"]!="-" ? '3d модель' : ''),
				/* (feature.properties.Photo!="-" ? 'Фото' : ''),(feature.properties.Descriptio != "-" ? 'Описание':"") */];
				//Поиск по 2 колонкам
				var searchTwo = layer.feature.properties;
				searchTwo.addressName = searchTwo.Name + " " + searchTwo.faddress;
				
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight
				});
				
				//geojsonStateProtectionR.options.time = feature.properties.time;
				},
				
				filter: function (feature, layer){if (feature.properties.go === "ГО р")return true;}
	});
 //map.addLayer(geojsonStateProtection);


//слой отображающий категорию гос охраны Выявленые
 var geojsonStateProtectionN = new L.GeoJSON(null,{
				//стиль слоя
				style: goStyle,	
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				(feature.properties.Photo!="-" ? '<img src="photos/'+ feature.properties.Photo +'"style="width:240;">':"")
				+"<dt>"+"<b>"+feature.properties.Name+"</b>"+"</dt>"//+"<dd>"+feature.properties.Name+"</dd>"
				+/*"<dt>"+"<b>"+"Описание:"+"</b>"+"</dt>"+*/(feature.properties.Descriptio!="-"?"<dd>"+feature.properties.Descriptio+"</dd>":"")
				+"<dt>"+"<b>"+"Категория охраны:"+"</b>"+"</dt>"+"<dd>"+(feature.properties.go == "ГО н"?"Вновь выявленные":"")+"</dd>"
				+"<dt>"+"<b>"+"Материал:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Material+"</dd>"
				+"<dt>"+"<b>"+"Дата постройки:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Date+"</dd>"
				+"<dt>"+"<b>"+"Архитектурный стиль:"+"</b>"+"</dt>"+"<dd>"+(feature.properties.Architectu!="-"?feature.properties.Architectu:"Не определен")+"</dd>"
				+(feature.properties.faddress!="-"?"<dt>"+"<b>"+"Адрес по решениям и постановлениям:"+"</b>"+"</dt>"+"<dd>"+feature.properties.faddress+"</dd>":"")
				+(feature.properties.Address!="-"?"<dt>"+"<b>"+"Адрес:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Address+"</dd>":"")
				+ (feature.properties["3D model"]!="-" ? "<a href='#' id='btnShowModal' onclick='openModal(\""+feature.properties["3D model"]+"\");'><b>3D модель</b></a>" : "")
                    ,popupOptions);
				//Теги фильтров
				layer.options.tags=
				[feature.properties.Material,
				(feature.properties.go == "ГО н"?"Вновь выявленные":""),(feature.properties.go=="ГО р"?"Регионального значения":""),(feature.properties.go=="ГО ф" ? "Федерального значения":""),(feature.properties.go == "ГО м" ? "Муниципального значения":""),
				(feature.properties.Architectu !="-" ? feature.properties.Architectu : 'Не опеделен'),
				(feature.properties["3D model"]!="-" ? '3d модель' : ''),
				/* (feature.properties.Photo!="-" ? 'Фото' : ''),(feature.properties.Descriptio != "-" ? 'Описание':"") */];
				//Поиск по 2 колонкам
				var searchTwo = layer.feature.properties;
				searchTwo.addressName = searchTwo.Name + " " + searchTwo.faddress;
				
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight
				});
				
				//geojsonStateProtectionN.options.time = feature.properties.time;
          
				},
				
				filter: function (feature, layer){if (feature.properties.go === "ГО н")return true;}
	});
 //map.addLayer(geojsonStateProtection);
 
 //слой отображающий категорию гос охраны Федеральные
 var geojsonStateProtectionF = new L.GeoJSON(null,{
				//стиль слоя
				style: goStyle,	
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				(feature.properties.Photo!="-" ? '<img src="photos/'+ feature.properties.Photo +'"style="width:240;">':"")
				+"<dt>"+"<b>"+feature.properties.Name+"</b>"+"</dt>"//+"<dd>"+feature.properties.Name+"</dd>"
				+/*"<dt>"+"<b>"+"Описание:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Descriptio+"</dd>"*/(feature.properties.Descriptio!="-"?"<dd>"+feature.properties.Descriptio+"</dd>":"")
				+"<dt>"+"<b>"+"Категория охраны:"+"</b>"+"</dt>"+"<dd>"+(feature.properties.go=="ГО ф" ? "Федерального значения":"")+"</dd>"
				+"<dt>"+"<b>"+"Материал:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Material+"</dd>"
				+"<dt>"+"<b>"+"Дата постройки:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Date+"</dd>"
				+"<dt>"+"<b>"+"Архитектурный стиль:"+"</b>"+"</dt>"+"<dd>"+(feature.properties.Architectu!="-"?feature.properties.Architectu:"Не определен")+"</dd>"
				+(feature.properties.faddress!="-"?"<dt>"+"<b>"+"Адрес по решениям и постановлениям:"+"</b>"+"</dt>"+"<dd>"+feature.properties.faddress+"</dd>":"")
				+(feature.properties.Address!="-"?"<dt>"+"<b>"+"Адрес:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Address+"</dd>":"")
				+ (feature.properties["3D model"]!="-" ? "<a href='#' id='btnShowModal' onclick='openModal(\""+feature.properties["3D model"]+"\");'><b>3D модель</b></a>" : "")
                    ,popupOptions);
				//Теги фильтров
				layer.options.tags=
				[feature.properties.Material,
				(feature.properties.go == "ГО н"?"Вновь выявленные":""),(feature.properties.go=="ГО р"?"Регионального значения":""),(feature.properties.go=="ГО ф" ? "Федерального значения":""),(feature.properties.go == "ГО м" ? "Муниципального значения":""),
				(feature.properties.Architectu !="-" ? feature.properties.Architectu : 'Не опеделен'),
				(feature.properties["3D model"]!="-" ? '3d модель' : ''),
				/* (feature.properties.Photo!="-" ? 'Фото' : ''),(feature.properties.Descriptio != "-" ? 'Описание':"") */];
				//Поиск по 2 колонкам
				var searchTwo = layer.feature.properties;
				searchTwo.addressName = searchTwo.Name + " " + searchTwo.faddress;
				
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight
				});
				
				//geojsonStateProtectionF.options.time = feature.properties.time;
          
				},
				
				filter: function (feature, layer){if (feature.properties.go === "ГО ф")return true;}
	});
	
	//слой отображающий категорию гос охраны Муницыпальные
 var geojsonStateProtectionM = new L.GeoJSON(null,{
				//стиль слоя
				style: goStyle,	
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				(feature.properties.Photo!="-" ? '<img src="photos/'+ feature.properties.Photo +'"style="width:240;">':"")
				+"<dt>"+"<b>"+feature.properties.Name+"</b>"+"</dt>"//+"<dd>"+feature.properties.Name+"</dd>"
				+/*"<dt>"+"<b>"+"Описание:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Descriptio+"</dd>"*/(feature.properties.Descriptio!="-"?"<dd>"+feature.properties.Descriptio+"</dd>":"")
				+"<dt>"+"<b>"+"Категория охраны:"+"</b>"+"</dt>"+"<dd>"+(feature.properties.go == "ГО м" ? "Муниципального значения":"")+"</dd>"
				+"<dt>"+"<b>"+"Материал:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Material+"</dd>"
				+"<dt>"+"<b>"+"Дата постройки:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Date+"</dd>"
				+"<dt>"+"<b>"+"Архитектурный стиль:"+"</b>"+"</dt>"+"<dd>"+(feature.properties.Architectu!="-"?feature.properties.Architectu:"Не определен")+"</dd>"
				+(feature.properties.faddress!="-"?"<dt>"+"<b>"+"Адрес по решениям и постановлениям:"+"</b>"+"</dt>"+"<dd>"+feature.properties.faddress+"</dd>":"")
				+(feature.properties.Address!="-"?"<dt>"+"<b>"+"Адрес:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Address+"</dd>":"")
				+ (feature.properties["3D model"]!="-" ? "<a href='#' id='btnShowModal' onclick='openModal(\""+feature.properties["3D model"]+"\");'><b>3D модель</b></a>" : "")
                    ,popupOptions);
				//Теги фильтров
				layer.options.tags=
				[feature.properties.Material,
				(feature.properties.go == "ГО н"?"Вновь выявленные":""),(feature.properties.go=="ГО р"?"Регионального значения":""),(feature.properties.go=="ГО ф" ? "Федерального значения":""),(feature.properties.go == "ГО м" ? "Муниципального значения":""),
				(feature.properties.Architectu !="-" ? feature.properties.Architectu : 'Не опеделен'),
				(feature.properties["3D model"]!="-" ? '3d модель' : ''),
				/* (feature.properties.Photo!="-" ? 'Фото' : ''),(feature.properties.Descriptio != "-" ? 'Описание':"") */];
				//Поиск по 2 колонкам
				var searchTwo = layer.feature.properties;
				searchTwo.addressName = searchTwo.Name + " " + searchTwo.faddress;
				
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight
				});
				
				//geojsonStateProtectionM.options.time = feature.properties.time;
          
				},
				
				filter: function (feature, layer){if (feature.properties.go === "ГО м")return true;}
	});
	
	
	
	//Группа слоев гос охрана

	/* geojsonStateProtectionF.options.time = geojsonStateProtectionF.feature.properties.time;
	geojsonStateProtectionM.options.time = geojsonStateProtectionM.feature.properties.time;
	geojsonStateProtectionN.options.time = geojsonStateProtectionN.feature.properties.time;
	geojsonStateProtectionR.options.time = geojsonStateProtectionR.feature.properties.time; */
	var goGroup = L.featureGroup([geojsonStateProtectionF,geojsonStateProtectionM,geojsonStateProtectionN,geojsonStateProtectionR]);
	
	

	
	/* <!-- слайдер время SliderControl--> */
	
	 /* 	var sliderControl = L.control.sliderControl({
			layer:goGroup,
			range: true,
			timeAttribute : 'times'
		});
		map.addControl(sliderControl);
		sliderControl.startSlider();  */
		
	/* <!-- слайдер время SliderControl --> */

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

	 //add json layers 
	 var parameters = L.Util.extend(defaultParameters); 
	 console.log(geoJsonUrl + L.Util.getParamString(parameters)); 

	 var ajax = $.ajax({ 
	  url: geoJsonUrl + L.Util.getParamString(parameters), 
	  datatype: 'json', 
	  jsonCallback: 'getJson', 
	  success: [loadGeoJson]
	  }); 
	  
	
	//////////////////////////////////////////////////////////////
 
	/*tag filter*/	
    var materialFilterButton = L.control.tagFilterButton({
      data: ['дерево','камень','песчаник','песчаник/дерево','камень/дерево'],
      icon: '<img src="images/m_filter.svg">',
      filterOnEveryClick: true
    }).addTo(map);
    
    var stateProtectionFilterButton = L.control.tagFilterButton({
      data: ['Вновь выявленные','Регионального значения','Федерального значения','Муниципального значения'],
			icon: '<img src="images/sp_filter.svg">',	
      filterOnEveryClick: true
    }).addTo(map);
	
     
    var archStyleFilterButton = L.control.tagFilterButton({
      data: ['Эклектика','Модерн','Классицизм','Сибирское барокко','Конструктивизм','Не опеделен'],
      icon: '<img src="images/style_filter.svg">',
      filterOnEveryClick: true
    }).addTo(map);
	
	
	/*var FilterButton = L.control.tagFilterButton({
      data: ['Вновь выявленные','Регионального значения','Федерального значения','Муниципального значения','дерево','камень','песчаник','песчаник/дерево','камень/дерево','Эклектика','Модерн','Классицизм','Сибирское барокко','Конструктивизм','Не опеделен'],
			icon: '<img src="images/filter.svg">',	
      filterOnEveryClick: true
    }).addTo(map);
	*/
	var dopFilterButton = L.control.tagFilterButton({
      data: [/* 'Фото' ,*/'3d модель'/*, 'Описание' */],
      icon: '<img src="images/dop_filter.svg">',
      filterOnEveryClick: true
    }).addTo(map);
  
    materialFilterButton.addToReleated(stateProtectionFilterButton);
	materialFilterButton.addToReleated(archStyleFilterButton);
    materialFilterButton.addToReleated(dopFilterButton);


    jQuery('.easy-button-button').click(function() {
        target = jQuery('.easy-button-button').not(this);
        target.parent().find('.tag-filter-tags-container').css({
            'display' : 'none',
        });
    });
	/*tag filter*/
 
/////////////////////////////////////////////////////////////////////////////////////////// 
  
  /* Leaflet.Control.Search */
	var searchControl = new L.Control.Search({
    layer: goGroup,
    propertyName: 'addressName',
    marker: false,
	//position: 'topleft',
    moveToLocation: function(latlng, title, map) {
      //map.fitBounds( latlng.layer.getBounds() );
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });
  
  searchControl.on('search:locationfound', function(e) {
  
    //console.log('search:locationfound', );
  
    //map.removeLayer(this._markerSearch)
  
    e.layer.setStyle({ color: 'yellow' });
    if (e.layer._popup)
      e.layer.openPopup();
  
  }).on('search:collapsed', function(e) {
  
    featuresLayer.eachLayer(function(layer) { //restore feature color
      featuresLayer.resetStyle(layer);
    });
  });
  
  map.addControl(searchControl); //inizialize search control 
  /* Leaflet.Control.Search */
  
/////////////////////////////////////////////////////////////////////////////////// 

/* <!-- Castom legend можно добовлять картинки--> */
	const legend = L.control.Legend({
            position: "topright",
			title: "Условные обозначения",
            collapsed: true,
            symbolWidth: 24,
            opacity: 1,
            column: 1,
            legends: [ {
                label: "Вновь выявленные",
				layers: geojsonStateProtectionN,
                type: "polygon",
				sides: 4,
                fillColor: "#f8d900",
				fillOpacity: 0.8
            }, {
                label: "Регионального значения",
				layers: geojsonStateProtectionR,
                type: "polygon",
				sides: 4,
                fillColor: "#d76d51",
				fillOpacity: 0.8
            }, {
                label: "Федерального значения",
				layers: geojsonStateProtectionF,
                type: "polygon",
				sides: 4,
                fillColor: "#ad2851",
				fillOpacity: 0.8
            }, {
                label: "Муниципального значения",
				layers: geojsonStateProtectionM,
                type: "polygon",
				sides: 4,
                fillColor: "YellowGreen",
				fillOpacity: 0.8
            }, {
                label: "Камень",
                type: "polygon",
				sides: 4,
                color: "Gray",
				weight: 1.5
            }, {
                label: "Дерево",
                type: "polygon",
				sides: 4,
                color: "Peru",
				weight: 1.5
            }, {
                label: "Песчаник",
                type: "polygon",
				sides: 4,
                color: "Orange",
				weight: 1.5
            }, {
                label: "Камень/Дерево",
                type: "polygon",
				sides: 4,
                color: "Brown",
				weight: 1.5
            }, {
                label: "Песчаник/Дерево",
                type: "polygon",
				sides: 4,
                color: "Olive",
				weight: 1.5
            }, {
                label: "Эклектика",
                type: "image",
				url: 'images/icon/eklektika.svg',
            }, {
                label: "Сибирское барокко",
                type: "image",
				url: 'images/icon/barokko.svg',
            }, {
                label: "Модерн",
                type: "image",
				url: 'images/icon/modern.svg',
            }, {
                label: "Конструктивизм",
                type: "image",
				url: 'images/icon/konstruktivizm.svg',
            }, {
                label: "Классицизм",
                type: "image",
				url: 'images/icon/klassicizm.svg',
            }, {
                label: "Границы кварталов",
                type: "image",
				url: 'images/icon/quartals_legend.svg',
				layers: quartals,
            }, {
                label: "Пожар 1879 года",
                type: "polygon",
				sides: 4,
                color: "DarkRed",
				weight: 3,
				fillColor: "DarkRed",
				fillOpacity: 0.2,
				layers: fireGroup,
				inactive: true
            }, {
                label: "Пожары",
                type: "image",
				url: 'images/icon/eventFire.svg',
				layers: eventFire,
				inactive: true
            }, {
                label: "ЧС",
                type: "image",
				url: 'images/icon/eventEmergency.svg',
				layers: eventEmergency,
				inactive: true
            }, {
                label: "Фасадник",
                type: "image",
				url: 'images/icon/fasadnik_old.svg',
				layers: Fasadnik,
				inactive: true
            }
			
			]
        })
        .addTo(map);
/* <!-- Castom legend --> */

////////////////////////////////////////////////////////////////////////////////////////////////
 
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
 
	
	