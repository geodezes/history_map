	//create leaflet map
	var map = new L.Map('map', {
	center: new L.LatLng(52.2839771, 104.2877651),
	zoom: 14,
	zoomControl:false
	});
	
	L.control.zoom({
    position: 'bottomright'
}).addTo(map);

	map.addControl(new L.Control.Fullscreen());
	
	
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

map.addLayer(negativHCE2022);
/////////////////////////////////////////////////////////////////

////геолакация
L.geolet({ position: 'bottomright', title:'Где я?' }).addTo(map);

///Скрываем точечный слой экспертизы при отдалении
///
/*
zsh = new ZoomShowHide();
zsh.addTo(map);
histCultExp2022.min_zoom = 15;
zsh.addLayer(histCultExp2022);
*/
/* Zdaniy_govoryt.min_zoom = 14;
zsh.addLayer(Zdaniy_govoryt); */

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
 /*
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
    geojsonStateProtection.resetStyle(e.target);
}

*/


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
////////////////////




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

		var guides = $.guides({
	distance: 50,
	guides: [
		{
			html: '<button type="button" id="demo" class="demo btn btn-success">Start demo</button>'
		}, {
			html: 'Здесь вы можете узнать где в Иркутске находятся объекты культурного наследия. Узнать из чего они сделаны и какой у них архитектурный стиль'
		}, {
			element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div > section'),
			html: 'Здесь можно посмотреть условные обозначения, а так же включить дополнительные слои с интересными данными'
		}, {
			element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div:nth-child(4)'),
			html: 'Выбрать ОКН по статусу государственной охраны'
		}, {
			element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div:nth-child(5)'),
			html: 'Отфильтровать по архитектурному стилю'
		}, {
			element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div:nth-child(6)'),
			html: 'Отобразит здания на которые есть 3D модели'
		}, {
			element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div:nth-child(7)'),
			html: 'Поиск'
		},  {
			element: $('#map > div.leaflet-control-container > div.leaflet-bottom.leaflet-right > div:nth-child(1)'),
			html: 'Геолокация'
		}, {
			element: $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div.leaflet-control-fullscreen.leaflet-bar.leaflet-control'),
			html: 'Полноэкранный режим'
		}]
	});
guides.start();

/////////////////

		var baseTree =
			{
				label: 'Условные обозначения',
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
						{label: 'ГИК экспертизы 2023', collapsed: true, children: [
						{label: '<img src="images/icon/iconExp.svg" style="width:15px;height:15px;"> Запланированые на 2023', layer: histCultExp2023},
						]},
						{label: 'ГИК экспертизы 2022', collapsed: true, children: [
						{label: '<img src="images/icon/iconExp.svg" style="width:15px;height:15px;"> Запланированые на 2022', layer: histCultExp2022},
						{label: '<img src="images/icon/iconNegativExp.svg" style="width:15px;height:15px;"> Отрицательные за 2022', layer: negativHCE2022},
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
						{label: 'Прочие', collapsed: true, children: [
						{label: '<img src="images/icon/quartals_legend.svg" style="width:20px;height:20px;"> "Границы кварталов'},
						]},
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
 
