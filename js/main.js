	//create leaflet map
	var map = new L.Map('map', {
	center: new L.LatLng(52.2839771, 104.2877651),
	zoom: 14,
	zoomControl:false
	});
	
	L.control.zoom({
    position: 'bottomright'
}).addTo(map);

	map.addControl(new L.Control.Fullscreen({
		title: {
			'false': 'Полноэкранный режим',
			'true': 'Выйти из полноэкранного режима'
		}
	}));
	
	
	// create openstreetmap base layer  убрать .grayscale для обычной OSM
	var osmG = new L.tileLayer.grayscale('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
	map.addLayer(osmG);
	
	map.attributionControl.addAttribution('При поддержке <a href="https://xn--80afcdbalict6afooklqi5o.xn--p1ai/">Фонд Президентских грантов</a>');
	//map.attributionControl.addAttribution('&copy <a href="https://irkobl.ru/sites/oknio/">Служба по охране объектов культурного наследия Иркутской области</a>');
	//map.attributionControl.addAttribution('&copy <a href="http://labs.easyblog.it/stefano-cudini/">Stefano Cudini</a>');
	//map.attributionControl.addAttribution('&copy <a herf="https://maydemirx.github.io/leaflet-tag-filter-button/">Mehmet Aydemir</a>');
	//map.attributionControl.addAttribution('&copy <a>2020 ptma@163.com</a>');
	//map.attributionControl.addAttribution('&copy <a herf="http://fsf.org/">Free Software Foundation</a>');		
	// Leaflet.TextPath Copyright (c) 2012 Makina Corpus
	/* 	(C) 2007 Free Software Foundation, Inc. <http://fsf.org/> */

////////////////////////////////////////////////////////////////////////////////////
/*var sidebar = L.Control.Sidebar('sidebar', {
    position: 'left'
});

map.addControl(sidebar);
*/

// layer quartals stripes
var stripes = new L.StripePattern({weight: 1, color: "#d6ca97", angle: 100}); stripes.addTo(map);
	
// create wfs layer quartals
var quartals = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=quarters&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
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
 
 ////////////////////////////////////////////////////////////////////////////////
 
 
// create wfs layer Fasadnik
var Fasadnik = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=Fasadnik&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [27, 27],
                        iconAnchor: [15, 13],
                        popupAnchor:  [0, -12]
						}
				});
				//Грузим иконки
				var fsadnikIcon = new LeafIcon({iconUrl: 'images/icon/fasadnik_old.svg'});	
			
				return new L.marker(latlng, {icon: fsadnikIcon,title:"Фасадник"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				"<dt>"+(feature.properties.zd_gov!="-" ? "<a href='https://fasadnik.org'>Фасадник</a>" : "")+"</dt>"
				+"<dt>"+feature.properties.nameF+"</dt>"
				,popupOptions
				);
				}
				
});


/////////////////////////////////////////////////////////////////////////////////

//markercluster 
var markersFasadnik = L.markerClusterGroup({
	disableClusteringAtZoom: 16,
	spiderfyOnMaxZoom : false ,
	polygonOptions: {color: '#808080' }
});
Fasadnik.on('data:loaded', function () {
    markersFasadnik.addLayer(Fasadnik);
    //console.log(markersBar);
    //map.addLayer(markers);
});


/* markers.addLayer(Fasadnik);
map.addLayer(markers); */
 
////////////////////////////////////////////////// 



// create wfs layer Zdaniy_govoryt
var Zdaniy_govoryt = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=Zdaniy_govoryt&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafZdGovIcon = L.Icon.extend({
						options: {
						iconSize: [18, 18],
                        iconAnchor: [15, 5],
                        popupAnchor:  [0, -5]
						}
				});
				//Грузим иконки
				var zdGovIcon = new LeafZdGovIcon({iconUrl: 'images/icon/zg-logo.svg'});	
			
				return new L.marker(latlng, {icon: zdGovIcon,title:"Здания говорят"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 300};
                layer.bindPopup(
				(feature.properties.zd_gov!="-" ? "<a href='https://www.irkologia.ru/zg#"+feature.properties.zd_link+"'>"+feature.properties.zd_name+"</a>" : "")
				+(feature.properties.zd_gov!="-" ? "<audio controls><source src='https://irkologia.ru/assets/zg/"+feature.properties.zd_gov+".mp3' type='audio/mpeg'></audio>" : "")
				,popupOptions
				);
				}
				
});

////////////////////////////////////////слой с видео не доделан
/*
var irkutckCool = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=irkutskCoolSity&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafirkutckCoolSityIcon = L.Icon.extend({
						options: {
						iconSize: [18, 18],
                        iconAnchor: [15, 5],
                        popupAnchor:  [0, -5]
						}
				});
				//Грузим иконки не верные
				var irkutckCoolSityIcon = new LeafirkutckCoolSityIcon({iconUrl: 'images/icon/zg-logo.svg'});	
			
				return new L.marker(latlng, {icon: irkutckCoolSityIcon,title:"Здания говорят"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 300};
                layer.bindPopup(
				(feature.properties.name)
				+(feature.properties.webadress!="-" ? "<video width='280' controls='controls' ><source src='hudmuz.mp4'>" : '')
				,popupOptions
				);
				}
				
});
map.addLayer(irkutckCool);
*/
////////////////////////////////////////////////////

// create wfs layer Events
var eventFire = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=Events&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
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
					fireIcon= new LeafIcon({iconUrl: 'images/icon/eventFire.svg'}),
					expIcon= new LeafIcon({iconUrl: 'images/icon/eventExp.svg'});
				//выбор иконки в зависимости от типа события
				var eventType=feature.properties.eventname;
				if(eventType=="emergency"){
                return L.marker(latlng, {icon: emegencyIcon});}
				else if (eventType=="fire"){
                return L.marker(latlng, {icon: fireIcon});}
				else if (eventType=="histCultExp2022"){
                return L.marker(latlng, {icon: expIcon});}
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
/*map.addLayer(eventFire);*/

// create wfs layer Events
var eventEmergency = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=Events&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
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


////////////////////////////////////////////////////////////////////////////////
 
 
// create wfs layer Historical and cultural expertise  2022
var histCultExp2022 = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=histCultExp2022&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [15, 15],
                        iconAnchor: [7, 6],
                        popupAnchor:  [0, -6]
						}
				});
				//Грузим иконки
				var iconExpIcon = new LeafIcon({iconUrl: 'images/icon/iconExp.svg'});	
			
				return new L.marker(latlng, {icon: iconExpIcon,title:"Экспертиза"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				"<dt>"+feature.properties.eventdis+"</dt>"
				,popupOptions
				);
				}
				
});

/*map.addLayer(histCultExp2022);*/

// create wfs layer Historical and cultural expertise  2023
var histCultExp2023 = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=histCultExp2023&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [15, 15],
                        iconAnchor: [7, 6],
                        popupAnchor:  [0, -6]
						}
				});
				//Грузим иконки
				var iconExpIcon = new LeafIcon({iconUrl: 'images/icon/iconExp.svg'});	
			
				return new L.marker(latlng, {icon: iconExpIcon,title:"Экспертиза"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				"<dt>"+feature.properties.eventdis+"</dt>"
				,popupOptions
				);
				}
				
});

/*map.addLayer(histCultExp2023);*/


// create wfs layer Historical and cultural expertise  2024
var histCultExp2024 = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=histCultExp2024&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [15, 15],
                        iconAnchor: [7, 6],
                        popupAnchor:  [0, -6]
						}
				});
				//Грузим иконки
				var iconExpIcon = new LeafIcon({iconUrl: 'images/icon/iconExp.svg'});	
			
				return new L.marker(latlng, {icon: iconExpIcon,title:"Экспертиза"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				"<dt>"+feature.properties.eventdis+"</dt>"
				,popupOptions
				);
				}
				
});

//map.addLayer(histCultExp2024);


/////////////////////////////////////////////////////////////////

// create wfs layer negativ Historical and cultural expertise
var negativHCE2022 = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=negativHCE2022&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [15, 15],
                        iconAnchor: [7, 6],
                        popupAnchor:  [0, -6]
						}
				});
				//Грузим иконки
				var iconNegativExpIcon = new LeafIcon({iconUrl: 'images/icon/iconNegativExp.svg'});	
			
				return new L.marker(latlng, {icon: iconNegativExpIcon,title:"Отрицательная Экспертиза"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				"<dt>"+feature.properties.discrhce+"</dt>"
				,popupOptions
				);
				}
				
});

/* map.addLayer(negativHCE2022); */
/////////////////////////////////////////////////////////////////

// create wfs layer negativ Historical and cultural expertise
var negativHCE2023 = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=negativHCE2023&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [15, 15],
                        iconAnchor: [7, 6],
                        popupAnchor:  [0, -6]
						}
				});
				//Грузим иконки
				var iconNegativExpIcon = new LeafIcon({iconUrl: 'images/icon/iconNegativExp.svg'});	
			
				return new L.marker(latlng, {icon: iconNegativExpIcon,title:"Отрицательная Экспертиза"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				"<dt>"+feature.properties.discrhce+"</dt>"
				,popupOptions
				);
				}
				
});

/* map.addLayer(negativHCE2023); */

// create wfs layer negativ Historical and cultural expertise
var negativHCE2024 = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=negativHCE2024&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [15, 15],
                        iconAnchor: [7, 6],
                        popupAnchor:  [0, -6]
						}
				});
				//Грузим иконки
				var iconNegativExpIcon = new LeafIcon({iconUrl: 'images/icon/iconNegativExp.svg'});	
			
				return new L.marker(latlng, {icon: iconNegativExpIcon,title:"Отрицательная Экспертиза"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				"<dt>"+feature.properties.discrhce+"</dt>"
				,popupOptions
				);
				}
				
});

//map.addLayer(negativHCE2024);

////геолакация
L.geolet({ position: 'bottomright', title:'Где я?' }).addTo(map);


/* Ппаздник */
/* выставка 2025 */
/* "Выставка в интерьере" */
var holidayCaffe2025 = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=holidayCaffe2025&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [20, 20],
                        iconAnchor: [7, 6],
                        popupAnchor:  [0, -6]
						}
				});
				//Грузим иконки
				var holidayCaffe = new LeafIcon({iconUrl: 'images/icon/holidayCaffe2025.svg'});	
			
				return new L.marker(latlng, {icon: holidayCaffe,title:"Выставка в интерьере"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				"Выставка в интерьере"
				,popupOptions
				);
				}
				
});

map.addLayer(holidayCaffe2025);


/* "Выставка в экстерьере" */
var holidayStreet2025 = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=holidayStreet2025&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				pointToLayer: function(feature, latlng) {
                //стиль иконок
				var LeafIcon = L.Icon.extend({
						options: {
						iconSize: [15, 15],
                        iconAnchor: [7, 6],
                        popupAnchor:  [0, -6]
						}
				});
				//Грузим иконки
				var holidayStreet = new LeafIcon({iconUrl: 'images/icon/holidayStreet2025.svg'});	
			
				return new L.marker(latlng, {icon: holidayStreet,title:"Выставка в экстерьере"});
               },
			   				
				//create popup
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				"Выставка в экстерьере"
				,popupOptions
				);
				}
				
});

map.addLayer(holidayStreet2025);

///////////////////////////////////////////////////////////////////	
	
	/* Пожар */
	var fireLine = L.tileLayer.wms('https://historymap.online:8443/geoserver/ows?', {
              format: 'image/png',
              layers: 'fireLine',
              transparent: 'true'
             });
	var firePoli = L.tileLayer.wms('https://historymap.online:8443/geoserver/ows?', {
              format: 'image/png',
              layers: 'firePoli',
              transparent: 'true'
             });
	var fireGroup = L.layerGroup([fireLine, firePoli]);




 /*Подсветка при наведении- ломает фильтр*/

function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 7,
			opacity: .9,
			color: 'Chocolate',
			dashArray: '',
			fillOpacity: 1
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

}


function resetHighlight(e) {
    oldNameStreet.resetStyle(e.target);
}




function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
////////////////////

 var oldNameStreet = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=oldNameStreet&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				//стиль слоя		 
				style: 
									            {
                color: 'Chocolate',
                weight: 5,
                opacity: .5,
                dashArray: '20,15',
                lineJoin: 'round'
            }
				
				,
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250
                };
                layer.bindPopup(
				(feature.properties['1869streetName'] !="-"? "<dt>"+"&#9899 "+"Планъ губернскаго города Иркутска 1869г:"+"</dt>"+"<dd>"+"<b>"+feature.properties['1869streetName'] +"</b>"+"</dd>":"")
				+(feature.properties['1869streetName'] !="-"? "<dt>"+"&#9899 "+"Планъ губернскаго города Иркутска 1880г с плана 1872г:"+"</dt>"+"<dd>"+"<b>"+feature.properties['1880streetName'] +"</b>"+"</dd>":"")
				+(feature.properties['1940streetName'] !="-"? "<dt>"+"&#9899 "+"План города Иркутска 1940г:"+"</dt>"+"<dd>"+"<b>"+feature.properties['1940streetName'] +"</b>"+"</dd>":"")
                    ,popupOptions);
				
				 /* layer.setText(feature.properties['1869streetName']); */
				
					layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight
				});
				
				layer.on('mouseover', function () {
					this.setText('     '+feature.properties['1869streetName']+'     ', {repeat: true, attributes:  { style: "fill: White; font-family: system-ui; font-size: 18; stroke: Maroon; font-weight: bold; stroke-width: 1;" }});
				});

				layer.on('mouseout', function () {
					this.setText(null);
				});
				
				},
				
	});
	/* map.addLayer(oldNameStreet); */

//слой отображающий ОКН
 var geojsonStateProtection = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=okn&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
				//стиль слоя		 
				style: goStyle,
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250
                };
                layer.bindPopup(
				(feature.properties.Photo!="-" ? '<div><a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/'+ feature.properties.Photo+'(1).jpg" data-lightbox="example-1"><img class="example-image"</a>'
				+'<a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/'+ feature.properties.Photo+'(2).jpg" data-lightbox="example-1"><img class="example-image"</a>'
				+'<a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/'+ feature.properties.Photo+'.jpg" data-lightbox="example-1"><img class="example-image"'
				+' src="https://444226.selcdn.ru/historymap.online/'+ feature.properties.Photo +'.jpg" style=max-width:240 alt="'+ feature.properties.Photo +'" /></a></div>':"")
				+ (feature.properties["3D model"]!="-" ? "<a href='#' id='btnShowModal' onclick='openModal(\""+feature.properties["3D model"]+"\");'><b>&#128270  Посмотреть 3D модель</b></a>" : "")
				+"<dt>"+"<b>"+feature.properties.Name+"</b>"+"</dt>"
				/*+"<dd>"+feature.properties.Name+"</dd>"*/
				/*+"<dt>"+"<b>"+"Описание:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Descriptio+"</dd>"*/
				+(feature.properties.Descriptio!="-"?"<dd>"+feature.properties.Descriptio+"</dd>":"")
				+"<dt>"+"<b>"+"Категория охраны:"+"</b>"+"</dt>"+"<dd>"+(feature.properties.go == "ГО н"?"Вновь выявленные":"")+(feature.properties.go=="ГО р"?"Регионального значения":"")+(feature.properties.go=="ГО ф" ? "Федерального значения":"")+(feature.properties.go == "ГО м" ? "Муниципального значения":"")+"</dd>"
				+"<dt>"+"<b>"+"Материал:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Material+"</dd>"
				+"<dt>"+"<b>"+"Дата постройки:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Date+"</dd>"
				+"<dt>"+"<b>"+"Архитектурный стиль:"+"</b>"+"</dt>"+"<dd>"+(feature.properties.Architectu!="-"?feature.properties.Architectu:"Не определен")+"</dd>"
				+(feature.properties.faddress!="-"?"<dt>"+"<b>"+"Адрес по решениям и постановлениям:"+"</b>"+"</dt>"+"<dd>"+feature.properties.faddress+"</dd>":"")
				+(feature.properties.Address!="-"?"<dt>"+"<b>"+"Адрес:"+"</b>"+"</dt>"+"<dd>"+feature.properties.Address+"</dd>":"")
				+(feature.properties.statusChange!="-"? "<dt>"+"<b>"+"Изменения статуса:"+"</b>"+"</dt>"+"<dd>"+feature.properties.statusChange+"</dd>":"")
                    ,popupOptions);
				//Теги фильтров
				layer.options.tags=
				[feature.properties.Material,
				(feature.properties.go == "ГО н"?"Вновь выявленные":""),(feature.properties.go=="ГО р"?"Регионального значения":""),(feature.properties.go=="ГО ф" ? "Федерального значения":""),(feature.properties.go == "ГО м" ? "Муниципального значения":""),
				(feature.properties.Architectu !="-" ? feature.properties.Architectu : 'Не опеделен'),
				(feature.properties["3D model"]!="-" ? '3d модель' : ''),
				(feature.properties.statusChange !="-" ? 'исключен/утрачен' : ''),
				//теги этажей для фильтра
				(feature.properties.floors=="1"?"1 этаж":""),
				(feature.properties.floors=="1.5"?"1.5 этажа":""),
				(feature.properties.floors=="2"?"2 этажа":""),
				(feature.properties.floors=="2.5"?"2.5 этажа":""),
				(feature.properties.floors=="3"?"3 этажа":""),
				(feature.properties.floors=="4"?"4 этажа":""),
				(feature.properties.floors=="5"?"5 этажей":""),
				(feature.properties.floors<"1"?"Не определена":""),
				/* (feature.properties.Photo!="-" ? 'Фото' : ''),(feature.properties.Descriptio != "-" ? 'Описание':"") */];
				//Поиск по 2 колонкам
				
				var searchTree = layer.feature.properties;
				searchTree.streetHouseName = searchTree.Name + " " + searchTree.street + " " + searchTree.house;
				
				/*
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight
				});
				*/
				
				//geojsonStateProtection.options.time = feature.properties.time;
				},
				
	});
 //map.addLayer(geojsonStateProtection);
	//////////////////////////////////////////////////////////////
	
	/* ворота */
	
	 var gate = new L.geoJson.ajax("layers/gate.geojson",{

			pointToLayer: function(feature, latlng) {
               //стиль иконок
			var LeafGateIcon = L.Icon.extend({
						options: {
						iconSize: [27, 27],
                        iconAnchor: [12, 14],
                        popupAnchor:  [2, -11]
						}
			});
				//Грузим иконки
				var gateIcon = new LeafGateIcon({iconUrl: 'images/icon/gate.svg'});	
				return new L.marker(latlng, {icon: gateIcon,title:"Ворота"});
			},
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				(feature.properties.PhotoName!="-" ? '<div><a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName+'(1).jpg" data-lightbox="example-1"><img class="example-image"</a>'
				+'<a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName+'(2).jpg" data-lightbox="example-1"><img class="example-image"</a>'
				+'<a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName+'.jpg" data-lightbox="example-1"><img class="example-image"'
				+' src="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName +'.jpg" style=max-width:240 alt="'+ feature.properties.PhotoName +'" /></a></div>':"")
				+(feature.properties.type)
				+(feature.properties.Note!='-' ? "<dd>"+feature.properties.Note+"</dd>":"")
                 ,popupOptions
				 );
				},
				
	});
/*  map.addLayer(gate); */
	
	/* Песчаник */
	
	 var wall = new L.geoJson.ajax("layers/wall.geojson",{

			pointToLayer: function(feature, latlng) {
               //стиль иконок
			var LeafWallIcon = L.Icon.extend({
						options: {
						iconSize: [27, 27],
                        iconAnchor: [12, 14],
                        popupAnchor:  [2, -11]
						}
			});
				//Грузим иконки
				var wallIcon = new LeafWallIcon({iconUrl: 'images/icon/wall.svg'});	
				return new L.marker(latlng, {icon: wallIcon,title:"Элименты песчаниа"});
			},
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				(feature.properties.PhotoName!="-" ? '<div><a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName+'(1).jpg" data-lightbox="example-1"><img class="example-image"</a>'
				+'<a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName+'(2).jpg" data-lightbox="example-1"><img class="example-image"</a>'
				+'<a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName+'.jpg" data-lightbox="example-1"><img class="example-image"'
				+' src="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName +'.jpg" style=max-width:240 alt="'+ feature.properties.PhotoName +'" /></a></div>':"")
				+(feature.properties.type)
				+(feature.properties.Note!='-' ? "<dd>"+feature.properties.Note+"</dd>":"")
                 ,popupOptions
				 );
				},
				
	});
/*  map.addLayer(wall); */
	
	/* ворота */
	
	 var firewall = new L.geoJson.ajax("layers/firewall.geojson",{

			pointToLayer: function(feature, latlng) {
               //стиль иконок
			var LeafFwallIcon = L.Icon.extend({
						options: {
						iconSize: [27, 27],
                        iconAnchor: [12, 14],
                        popupAnchor:  [4, -13]
						}
			});
				//Грузим иконки
				var firewallIcon = new LeafFwallIcon({iconUrl: 'images/icon/firewall.svg'});	
				return new L.marker(latlng, {icon: firewallIcon,title:"Брандма́уэр"});
			},
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 250};
                layer.bindPopup(
				(feature.properties.PhotoName!="-" ? '<div><a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName+'(1).jpg" data-lightbox="example-1"><img class="example-image"</a>'
				+'<a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName+'(2).jpg" data-lightbox="example-1"><img class="example-image"</a>'
				+'<a class="example-image-link" href="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName+'.jpg" data-lightbox="example-1"><img class="example-image"'
				+' src="https://444226.selcdn.ru/historymap.online/vorota/'+ feature.properties.PhotoName +'.jpg" style=max-width:240 alt="'+ feature.properties.PhotoName +'" /></a></div>':"")
				+(feature.properties.type)
				+(feature.properties.Note!='-' ? "<dd>"+feature.properties.Note+"</dd>":"")
                 ,popupOptions
				 );
				},
				
	});
/*  map.addLayer(firewall); */
	

/* малые архитектурные формы: ворота, песчаник, брандмауэры */
var minForm = new L.layerGroup([gate,wall,firewall])

//markercluster ворота
var markersGate = L.markerClusterGroup({
	disableClusteringAtZoom: 16,
	spiderfyOnMaxZoom : false ,
	polygonOptions: {color: '#ebd57f' },
	
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();

		var c = ' marker-cluster-';
		if (childCount < 10) {
			c += 'smallg';
		} else if (childCount < 100) {
			c += 'mediumg';
		} else {
			c += 'largeg';
		}

		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
	},
			
});
gate.on('data:loaded', function () {
    markersGate.addLayer(gate);
    //console.log(markersBar);
   // map.addLayer(markers);
});

//markercluster стены
var markersWall = L.markerClusterGroup({
	disableClusteringAtZoom: 16,
	spiderfyOnMaxZoom : false ,
	polygonOptions: {color: '#ebd57f' },
	
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();

		var c = ' marker-cluster-';
		if (childCount < 10) {
			c += 'smallg';
		} else if (childCount < 100) {
			c += 'mediumg';
		} else {
			c += 'largeg';
		}

		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
	},
			
});
wall.on('data:loaded', function () {
    markersWall.addLayer(wall);
    //console.log(markersBar);
   // map.addLayer(markers);
});

//markercluster брандмауэры
var markersFirewall = L.markerClusterGroup({
	disableClusteringAtZoom: 16,
	spiderfyOnMaxZoom : false ,
	polygonOptions: {color: '#ebd57f' },
	
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();

		var c = ' marker-cluster-';
		if (childCount < 10) {
			c += 'smallg';
		} else if (childCount < 100) {
			c += 'mediumg';
		} else {
			c += 'largeg';
		}

		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
	},
			
});
firewall.on('data:loaded', function () {
    markersFirewall.addLayer(firewall);
    //console.log(markersBar);
   // map.addLayer(markers);
});



/* Скрываем точечный слой в зависимости от масштаба */
/* zsh = new ZoomShowHide();
zsh.addTo(map);
minForm.min_zoom = 15;
zsh.addLayer(minForm);
 */

	//////////////////////////////////////////////////////////////
 
	/*tag filter*/	
		var floorsFilterButton = L.control.tagFilterButton({
      data: ['1 этаж','1.5 этажа','2 этажа','2.5 этажа','3 этажа','4 этажа','5 этажей','Не определена'],
      icon: "<p>"+"Этажность"+"</p>",
      filterOnEveryClick: true
    }).addTo(map);
	
    var materialFilterButton = L.control.tagFilterButton({
      data: ['дерево','камень','песчаник','песчаник/дерево','камень/дерево'],
      icon: "<p>"+"Материал"+"</p>",
      filterOnEveryClick: true
    }).addTo(map);
    
    var stateProtectionFilterButton = L.control.tagFilterButton({
      data: ['Вновь выявленные','Регионального значения','Федерального значения','Муниципального значения','исключен/утрачен'],
			icon: "<p>"+"Статус"+"</p>",	
      filterOnEveryClick: true
    }).addTo(map);
	
     
    var archStyleFilterButton = L.control.tagFilterButton({
      data: ['Эклектика','Модерн','Классицизм','Сибирское барокко','Конструктивизм','Не опеделен'],
      icon: "<p>"+"Стиль"+"</p>",
      filterOnEveryClick: true
    }).addTo(map);
	
	
	var dopFilterButton = L.control.tagFilterButton({
      data: [/* 'Фото' ,*/'3d модель'/*, 'Описание' */],
      icon: "<p>"+"3D"+"</p>",
      filterOnEveryClick: true
    }).addTo(map);
	

  
    materialFilterButton.addToReleated(stateProtectionFilterButton);
	materialFilterButton.addToReleated(archStyleFilterButton);
    materialFilterButton.addToReleated(dopFilterButton);
	materialFilterButton.addToReleated(floorsFilterButton);


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
    layer: geojsonStateProtection,
    propertyName: 'streetHouseName',
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
  
		
////////////////////////////////////////////////////////////////
 //
	
///////////////// 

		var baseTree =
			{
				label: 'Условные обозначения<div class="tree" id="tree"></div>',
				collapsed: true,
				children: [
						{label: 'Категория гос. охраны', collapsed: true, children: [
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:#f8d900 ;fill-opacity:0.8" /></svg> Вновь выявленные'},
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:YellowGreen ;fill-opacity:0.8" /></svg> Муниципального здания'},
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:#d76d51 ;fill-opacity:0.8" /></svg> Регионального здания'},
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:#ad2851 ;fill-opacity:0.8" /></svg> Федерального здания'},
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:DarkGray ;fill-opacity:0.8" /></svg> Исключен/Утрачен'}, 
						]},	
						{label: 'Материал постройки', collapsed: true, children: [
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:none; stroke-width:3;stroke: Gray" /></svg> Камень'},
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:none; stroke-width:3;stroke: Peru" /></svg> Дерево'},
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:none; stroke-width:3;stroke: Orange" /></svg> Песчаник'},
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:none; stroke-width:3;stroke: Brown" /></svg> Камень/Дерево'},
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:none; stroke-width:3;stroke: Olive" /></svg> Песчаник/Дерево'},
						]},
						{label: 'Архитектурный стиль', collapsed: true, children: [
						{label: '<img src="images/icon/eklektika.svg" style="width:20px;height:20px;"> Эклектика'},
						{label: '<img src="images/icon/barokko.svg" style="width:20px;height:20px;"> Сибирское барокко'},
						{label: '<img src="images/icon/modern.svg" style="width:20px;height:20px;"> Модерн'},
						{label: '<img src="images/icon/konstruktivizm.svg" style="width:20px;height:20px;"> Конструктивизм'},
						{label: '<img src="images/icon/klassicizm.svg" style="width:20px;height:20px;"> Классицизм'},
						]},
				]	
			};



        var overlaysTree = 
			{
				label: 'Доп. слои',
				collapsed: true,
				children: [		
						{label: 'Выставка', collapsed: false, children: [
						{label: '<img src="images/icon/holidayStreet2025.svg" style="width:15px;height:15px;"> Выставка в экстерьере', layer: holidayStreet2025},
						{label: '<img src="images/icon/holidayCaffe2025.svg" style="width:15px;height:15px;"> Выставка в интерьере', layer: holidayCaffe2025},
						]},
						{label: 'ГИКЭ', collapsed: true, children: [
							{label: 'ГИК экспертизы 2024', collapsed: true, children: [
							{label: '<img src="images/icon/iconExp.svg" style="width:15px;height:15px;"> Запланированые на 2024', layer: histCultExp2024},
							{label: '<img src="images/icon/iconNegativExp.svg" style="width:15px;height:15px;"> Отрицательные за 2024', layer: negativHCE2024},
							]},
							{label: 'ГИК экспертизы 2023', collapsed: true, children: [
							{label: '<img src="images/icon/iconExp.svg" style="width:15px;height:15px;"> Запланированые на 2023', layer: histCultExp2023},
							{label: '<img src="images/icon/iconNegativExp.svg" style="width:15px;height:15px;"> Отрицательные за 2023', layer: negativHCE2023},
							]},
							{label: 'ГИК экспертизы 2022', collapsed: true, children: [
							{label: '<img src="images/icon/iconExp.svg" style="width:15px;height:15px;"> Запланированые на 2022', layer: histCultExp2022},
							{label: '<img src="images/icon/iconNegativExp.svg" style="width:15px;height:15px;"> Отрицательные за 2022', layer: negativHCE2022},
							]},
						]},
						{label: 'Партнеры', collapsed: true, children: [
						{label: '<img src="images/icon/zg-logo.svg" style="width:15px;height:15px;"> Здания говорят', layer: Zdaniy_govoryt},
						{label: '<img src="images/icon/fasadnik_old.svg" style="width:15px;height:15px;"> Фасадник', layer: markersFasadnik},
						]},
						{label: 'События', collapsed: true, children: [
						{label: '<img src="images/icon/eventFire.svg" style="width:15px;height:15px;"> Пожары', layer: eventFire},
						{label: '<img src="images/icon/eventEmergency.svg" style="width:15px;height:15px;"> ЧС', layer: eventEmergency},
						{label: '<svg width="15" height="15"><rect width="15" height="15" style="fill:DarkRed ;fill-opacity:0.2; stroke-width:3;stroke: DarkRed" /></svg> Пожар 1879 года', layer: fireGroup},
						]},
						{label: '<img src="images/icon/gate.svg" style="width:15px;height:15px;"> Ворота', layer: markersGate},
						{label: '<img src="images/icon/firewall.svg" style="width:15px;height:15px;"> Брандма́уэры', layer: markersFirewall},
						{label: '<img src="images/icon/wall.svg" style="width:15px;height:15px;"> Песчаник', layer: markersWall},
						{label: '<img src="images/icon/oldStreet.svg" style="width:15px;height:15px;"> Исторические названия улиц', layer: oldNameStreet},
						{label: '<img src="images/icon/quartals_legend.svg" style="width:20px;height:20px;"> "Границы кварталов'},
				]
			};


		        var lay = L.control.layers.tree( 
		          baseTree, 
		          overlaysTree,
            {
                namedToggle: true,
                selectorBack: false,
                closedSymbol: '&#8862',
                openedSymbol: '&#8863',
               // collapseAll: 'Скрыть всё',
              //  expandAll: 'Показать всё',
                collapsed: false,
            });

        lay.addTo(map)/*.collapseTree().expandSelected().collapseTree(true);
        L.DomEvent.on(L.DomUtil.get('onlysel'), 'click', function() {
            lay.collapseTree(true).expandSelected(true);
        })*/;  


var guidess = $.guides({
  distance: 50,
  guides: [
		//Анонс изменений
		{html: 'На карту добавленна выставка, запланированая ИРО ВООПИК в рамках празднования Международного дня охраны памятников и исторических мест (с 20 по 30 апреля 2025 года), согласована, получено разрешение от службы по охране объектов культурного наследия Иркутской области'
		},
		{
		element: $('#demo.navBtn'),
		html: 'Понять, как пользоваться картой.'
		},
		]
});
guidess.start();


/* var guidesAnons = $.guides({
  distance: 50,
  guides: [
	{
      html: 'Добавили слой с историческими названиями улиц'
		}]
});
guidesAnons.start();
 */

$('#demo').guides({
  distance: 50,
  guides: [
	{
      element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div.leaflet-control-layers-expanded'),
      html: 'Здесь можно посмотреть условные обозначения. Включить дополнительные слои с интересными данными.',
		}, {
      element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div:nth-child(2)'),
      html: 'Ознакомиться с этажностью ОКН.'
		}, {
      element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div:nth-child(3)'),
      html: 'Использовать фильтр по материалу постройки.'
		}, {
      element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div:nth-child(4)'),
      html: 'Выбрать ОКН по статусу государственной охраны.'
		}, {
      element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div:nth-child(5)'),
      html: 'Посмотреть архитектурный стиль.'
		}, {
      element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div:nth-child(6)'),
      html: 'Отобразить здания с 3D моделями.'
		}, {
      element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div:nth-child(7)'),
      html: 'Поиск по адресу и нименованию ОКН'
		}, {
      element: $('#map > div.leaflet-control-container > div.leaflet-bottom.leaflet-right > div:nth-child(1)'),
      html: 'Узнать, где вы сейчас находитесь.'
		}, {
      element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div.leaflet-control-fullscreen.leaflet-bar.leaflet-control'),
      html: 'Включить полноэкранный режим.'
		}]
});
/* 	guides.start(); */

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
 
