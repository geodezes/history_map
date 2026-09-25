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
	
	
	// Тайлы OSM переведены на HTTPS: по http браузер блокирует загрузку на сайте с https (mixed content).
	// Поддомены {s}.tile.openstreetmap.org устарели, OSM рекомендует единый адрес tile.openstreetmap.org.
	// create openstreetmap base layer  убрать .grayscale для обычной OSM
	var osmG = new L.tileLayer.grayscale('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
	map.addLayer(osmG);
	
	var osm = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
	//map.addLayer(osm);
	
	var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});

	var darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
	});
	
	map.attributionControl.addAttribution('При поддержке <a href="https://xn--80afcdbalict6afooklqi5o.xn--p1ai/">Фонд Президентских грантов</a>');
	//map.attributionControl.addAttribution('&copy <a href="https://irkobl.ru/sites/oknio/">Служба по охране объектов культурного наследия Иркутской области</a>');
	//map.attributionControl.addAttribution('&copy <a href="http://labs.easyblog.it/stefano-cudini/">Stefano Cudini</a>');
	//map.attributionControl.addAttribution('&copy <a herf="https://maydemirx.github.io/leaflet-tag-filter-button/">Mehmet Aydemir</a>');
	//map.attributionControl.addAttribution('&copy <a>2020 ptma@163.com</a>');
	//map.attributionControl.addAttribution('&copy <a herf="http://fsf.org/">Free Software Foundation</a>');		
	// Leaflet.TextPath Copyright (c) 2012 Makina Corpus
	/* 	(C) 2007 Free Software Foundation, Inc. <http://fsf.org/> */



	var baseLayers = {
	"Серая карта": osmG,	
	"OpenStreetMap": osm,
	"Спутник": satelliteLayer,
	"Темная карта": darkLayer
	};
	
// layer quartals stripes
var stripes = new L.StripePattern({weight: 1, color: "#d6ca97", angle: 100}); stripes.addTo(map);
	
// create wfs layer quartals
var quartals = new L.geoJson.ajax("layers/quartals.geojson",{
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
 
 
/* =====================================================================
   ОБЩИЕ ФУНКЦИИ ДЛЯ СОЗДАНИЯ СЛОЁВ
   Раньше каждый точечный слой описывался отдельным блоком из 20–30 строк,
   которые отличались только файлом, иконкой и текстом попапа.
   Теперь слои создаются через функции ниже, а различия задаются параметрами.
   Вид иконок, попапов и кластеров не изменился.
   ===================================================================== */

// Иконка Leaflet. size — размер, anchor — точка привязки к координате,
// popupAnchor — смещение попапа относительно точки привязки
function makeIcon(url, size, anchor, popupAnchor) {
	return L.icon({iconUrl: url, iconSize: size, iconAnchor: anchor, popupAnchor: popupAnchor});
}

// Точечный слой GeoJSON с иконкой и попапом.
// opts.icon     — иконка (makeIcon) или функция feature -> иконка
// opts.title    — всплывающая подсказка у маркера
// opts.popup    — функция feature -> HTML попапа
// opts.maxWidth — ширина попапа (по умолчанию 250)
// opts.filter   — необязательный фильтр объектов
function markerLayer(url, opts) {
	var options = {
		pointToLayer: function (feature, latlng) {
			var icon = (typeof opts.icon === 'function') ? opts.icon(feature) : opts.icon;
			if (!icon) return; // объект без подходящей иконки не выводится (как было раньше)
			var markerOptions = {icon: icon};
			if (opts.title) markerOptions.title = opts.title;
			return L.marker(latlng, markerOptions);
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup(opts.popup(feature), {maxWidth: opts.maxWidth || 250});
		}
	};
	if (opts.filter) options.filter = opts.filter;
	return new L.geoJson.ajax(url, options);
}

// Кластеризация маркеров. customIcons = true включает жёлтые кластеры
// (классы marker-cluster-smallg / mediumg / largeg), как у малых форм
function clusterGroup(color, customIcons) {
	var options = {
		disableClusteringAtZoom: 16,
		spiderfyOnMaxZoom: false,
		polygonOptions: {color: color}
	};
	if (customIcons) {
		options.iconCreateFunction = function (cluster) {
			var childCount = cluster.getChildCount();
			var c = ' marker-cluster-' + (childCount < 10 ? 'smallg' : childCount < 100 ? 'mediumg' : 'largeg');
			return new L.DivIcon({html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40)});
		};
	}
	return L.markerClusterGroup(options);
}

// Слой, который после загрузки данных помещается в кластер
function clusteredLayer(layer, color, customIcons) {
	var cluster = clusterGroup(color, customIcons);
	layer.on('data:loaded', function () { cluster.addLayer(layer); });
	return cluster;
}

// Строка попапа «заголовок + значение» в формате <dt>/<dd>
function popupRow(title, value) {
	return "<dt><b>" + title + "</b></dt><dd>" + value + "</dd>";
}

// Блок из трёх фотографий для lightbox: имя(1).jpg, имя(2).jpg и имя.jpg.
// HTML сохранён без изменений, чтобы галерея работала так же, как раньше
function photoGallery(baseUrl, name) {
	return '<div><a class="example-image-link" href="' + baseUrl + name + '(1).jpg" data-lightbox="example-1"><img class="example-image"</a>'
		+ '<a class="example-image-link" href="' + baseUrl + name + '(2).jpg" data-lightbox="example-1"><img class="example-image"</a>'
		+ '<a class="example-image-link" href="' + baseUrl + name + '.jpg" data-lightbox="example-1"><img class="example-image"'
		+ ' src="' + baseUrl + name + '.jpg" style=max-width:240 alt="' + name + '" /></a></div>';
}

var PHOTO_URL = 'https://444226.selcdn.ru/historymap.online/';

/* ===================== Партнёры ===================== */

// Фасадник
var Fasadnik = markerLayer("layers/Fasadnik.geojson", {
	icon: makeIcon('images/icon/fasadnik_old.svg', [27, 27], [15, 13], [0, -12]),
	title: "Фасадник",
	popup: function (feature) {
		return "<dt>" + (feature.properties.zd_gov != "-" ? "<a href='https://fasadnik.org'>Фасадник</a>" : "") + "</dt>"
			+ "<dt>" + feature.properties.nameF + "</dt>";
	}
});
var markersFasadnik = clusteredLayer(Fasadnik, '#808080', false);

// Здания говорят
var Zdaniy_govoryt = markerLayer("layers/Zdaniy_govoryt.geojson", {
	icon: makeIcon('images/icon/zg-logo.svg', [18, 18], [15, 5], [0, -5]),
	title: "Здания говорят",
	maxWidth: 300,
	popup: function (feature) {
		var p = feature.properties;
		if (p.zd_gov == "-") return "";
		return "<a href='https://www.irkologia.ru/zg#" + p.zd_link + "'>" + p.zd_name + "</a>"
			+ "<audio controls><source src='https://irkologia.ru/assets/zg/" + p.zd_gov + ".mp3' type='audio/mpeg'></audio>";
	}
});

/* ===================== События (пожары и ЧС) ===================== */

// Оба слоя берут данные из одного файла Events.geojson и отличаются только фильтром
var eventIcons = {
	fire: makeIcon('images/icon/eventFire.svg', [27, 27], [13, 27], [1, -24]),
	emergency: makeIcon('images/icon/eventEmergency.svg', [27, 27], [13, 27], [1, -24])
};
function eventLayer(eventName) {
	return markerLayer("layers/Events.geojson", {
		icon: eventIcons[eventName],
		popup: function (feature) {
			return popupRow("Дата события:", feature.properties.eventdate)
				+ popupRow("Описание:", feature.properties.eventdis);
		},
		filter: function (feature) { return feature.properties.eventname === eventName; }
	});
}
var eventFire = eventLayer("fire");
var eventEmergency = eventLayer("emergency");

/* ===================== ГИКЭ ===================== */

// Историко-культурные экспертизы: запланированные (histCultExpГГГГ)
// и отрицательные (negativHCEГГГГ). Чтобы добавить новый год,
// достаточно положить файлы в layers/ и дописать год в overlaysTree
var expIcon = makeIcon('images/icon/iconExp.svg', [15, 15], [7, 6], [0, -6]);
var negativExpIcon = makeIcon('images/icon/iconNegativExp.svg', [15, 15], [7, 6], [0, -6]);

function histCultExpLayer(year) {
	return markerLayer("layers/histcultexp" + year + ".geojson", {
		icon: expIcon,
		title: "Экспертиза",
		popup: function (feature) { return "<dt>" + feature.properties.eventdis + "</dt>"; }
	});
}
function negativHCELayer(year) {
	return markerLayer("layers/negativHCE" + year + ".geojson", {
		icon: negativExpIcon,
		title: "Отрицательная Экспертиза",
		popup: function (feature) { return "<dt>" + feature.properties.discrhce + "</dt>"; }
	});
}
var histCultExp2022 = histCultExpLayer(2022), negativHCE2022 = negativHCELayer(2022);
var histCultExp2023 = histCultExpLayer(2023), negativHCE2023 = negativHCELayer(2023);
var histCultExp2024 = histCultExpLayer(2024), negativHCE2024 = negativHCELayer(2024);
////геолакация
L.geolet({ position: 'bottomright', title:'Где я?' }).addTo(map);


/* Ппаздник */
/* выставка 2025 */
/* "Выставка в интерьере" */
/* var holidayCaffe2025 = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=holidayCaffe2025&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
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

map.addLayer(holidayCaffe2025); */


/* "Выставка в экстерьере" */
/* var holidayStreet2025 = new L.geoJson.ajax("https://historymap.online:8443/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=holidayStreet2025&outputFormat=application%2Fjson&format_options=callback%3AgetJson&SrsName=EPSG%3A4326",{
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

map.addLayer(holidayStreet2025); */

///////////////////////////////////////////////////////////////////	




	
	/* Пожар */
	var fireLine = new L.geoJson.ajax("layers/fireLine.geojson",{
				//layer style
				//style: {
					stroke: true,
					weight: 0.3,
					color: "#900509",
					//zIndex: -1
				//},
	});
	var firePoli = new L.geoJson.ajax("layers/firePoli.geojson",{
					color: "#900509",	
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

 var oldNameStreet = new L.geoJson.ajax("layers/oldNameStreet.geojson",{
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
 var geojsonStateProtection = new L.geoJson.ajax("layers/okn.geojson",{
				//стиль слоя		 
				style: goStyle,
				//стиль всплывающих окон
				onEachFeature: function (feature, layer) {
				popupOptions = {maxWidth: 250
				};
				layer.bindPopup(
				(feature.properties.Photo!="-" ? photoGallery(PHOTO_URL, feature.properties.Photo) : "") // фото через общую функцию photoGallery
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
	
	
	
	/* Праздник 2026 */
var arch_day_2026_line = new L.geoJson.ajax("layers/arch_day_2026_line.geojson",{
				//layer style
					stroke: true,
					dashed: true,
					weight: 4.3,
					color: "#731824",					
	});
/* map.addLayer(arch_day_2026_line) */


var arch_day_2026_point = new L.geoJson.ajax("layers/arch_day_2026_point.geojson",{
				pointToLayer: function(feature, latlng) {
				//стиль иконок

					return L.circleMarker(latlng, {
					  radius: 6,
					  fillColor: '#731824',
					  color: '#fff',
					  weight: 2,
					  fillOpacity: 0.9
					});
					
				},
							
				//create popup
				onEachFeature: function (feature, layer) {
				popupOptions = {maxWidth: 250};
				layer.bindPopup(
				"<dt>"+feature.properties.disc+"</dt>"
				,popupOptions
				);
				layer.bindTooltip(
				"<dt>"+feature.properties.fid+"</dt>",
				);
				}
				
});
/* map.addLayer(arch_day_2026_point) */

var arch_day_2026 = L.layerGroup([arch_day_2026_point, arch_day_2026_line]);
	
	
	/* ===================== Малые архитектурные формы ===================== */
	// Ворота, элементы из песчаника и брандмауэры: одинаковый попап
	// (фото, тип, примечание), фотографии лежат в папке vorota/
	function minFormPopup(feature) {
		var p = feature.properties;
		return (p.PhotoName != "-" ? photoGallery(PHOTO_URL + 'vorota/', p.PhotoName) : "")
			+ p.type
			+ (p.Note != '-' ? "<dd>" + p.Note + "</dd>" : "");
	}

	var gate = markerLayer("layers/gate.geojson", {
		icon: makeIcon('images/icon/gate.svg', [27, 27], [12, 14], [2, -11]),
		title: "Ворота",
		popup: minFormPopup
	});
	var wall = markerLayer("layers/wall.geojson", {
		icon: makeIcon('images/icon/wall.svg', [27, 27], [12, 14], [2, -11]),
		title: "Элементы песчаника", // исправлена опечатка «Элименты песчаниа»
		popup: minFormPopup
	});
	var firewall = markerLayer("layers/firewall.geojson", {
		icon: makeIcon('images/icon/firewall.svg', [27, 27], [12, 14], [4, -13]),
		title: "Брандма́уэр",
		popup: minFormPopup
	});

/* малые архитектурные формы: ворота, песчаник, брандмауэры */
var minForm = new L.layerGroup([gate, wall, firewall]);

// Кластеры с жёлтыми значками
var markersGate = clusteredLayer(gate, '#ebd57f', true);
var markersWall = clusteredLayer(wall, '#ebd57f', true);
var markersFirewall = clusteredLayer(firewall, '#ebd57f', true);
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
  
	// Исправлено: раньше здесь была несуществующая переменная featuresLayer, и при закрытии поиска возникала ошибка.
	// Теперь после закрытия поиска подсвеченный жёлтым ОКН возвращает обычный стиль
	geojsonStateProtection.eachLayer(function(layer) { //restore feature color
	  geojsonStateProtection.resetStyle(layer);
	});
  });
  
  map.addControl(searchControl); //inizialize search control 
  /* Leaflet.Control.Search */
  
		
////////////////////////////////////////////////////////////////


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
						/* //выставка на праздник 2025 года//
						{label: 'Выставка', collapsed: false, children: [
						{label: '<img src="images/icon/holidayStreet2025.svg" style="width:15px;height:15px;"> Выставка в экстерьере', layer: holidayStreet2025},
						{label: '<img src="images/icon/holidayCaffe2025.svg" style="width:15px;height:15px;"> Выставка в интерьере', layer: holidayCaffe2025},
						]}, */
						{label: 'День архитектурного наследия', collapsed: true, children: [
							{label: '<img src="images/icon/holidayStreet2025.svg" style="width:15px;height:15px;"> 2026', layer: arch_day_2026},
							/* {label: '<img src="images/icon/holidayCaffe2025.svg" style="width:15px;height:15px;"> Выставка в интерьере', layer: holidayCaffe2025}, */
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

L.control.layers(baseLayers, null, {position: 'topright'}).addTo(map);


var guidess = $.guides({
  distance: 50,
  guides: [
		//Анонс изменений
		{html: 'Статус ОКН указан на 1 января 2026 года'
		},
		{
		element: $('#demo.navBtn'),
		html: 'Понять, как пользоваться картой.'
		},
		]
});
guidess.start();


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
 
