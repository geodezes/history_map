/* =====================================================================
   СТИЛЬ ПОЛИГОНОВ ОКН (слой okn.geojson)
   Раньше здесь был оператор switch на 120 вариантов (около 900 строк):
   4 категории охраны × 5 материалов × 6 вариантов стиля. Все варианты
   собирались по одному правилу, поэтому они заменены тремя таблицами:
     - цвет заливки зависит от категории охраны (поле go);
     - цвет контура зависит от материала (поле Material);
     - fill зависит от архитектурного стиля (поле Architectu).
   Результат для каждого объекта такой же, как раньше.
   ===================================================================== */

// Цвет заливки по категории государственной охраны
var GO_FILL_COLORS = {
	'ГО н': '#f8d900',     // вновь выявленные
	'ГО м': 'YellowGreen', // муниципального значения
	'ГО р': '#d76d51',     // регионального значения
	'ГО ф': '#ad2851'      // федерального значения
};

// Цвет контура по материалу постройки
var MATERIAL_COLORS = {
	'дерево': 'Peru',
	'камень': 'Gray',
	'песчаник': 'Orange',
	'камень/дерево': 'Brown',
	'песчаник/дерево': 'Olive'
};

// Значение fill по архитектурному стилю ('-' — стиль не определён, fill не задаётся).
// Примечание: в Leaflet опция fill означает «заливать ли полигон» (true/false),
// картинку штриховки она не подставляет — строка просто считается как true.
// Значения оставлены как были, чтобы вид карты не изменился
var ARCH_FILLS = {
	'Эклектика': 'url(images/stripes/eklektika.png)',
	'Модерн': 'url(images/stripes/modern.png)',
	'Сибирское барокко': 'url(images/stripes/barokko.png)',
	'Классицизм': 'url(images/stripes/klassicizm.png)',
	'Конструктивизм': 'url(images/stripes/konstruktivizm.png)',
	'-': null
};

var goStyle = function (feature) {
	var p = feature.properties;

	// Исключённые или утраченные объекты (statusChange заполнено) — серые
	if (p.statusChange != "-") {
		return {
			color: "gray",
			fillOpacity: 1,
			fillColor: "DarkGrey",
			weight: 2
		};
	}

	var fillColor = GO_FILL_COLORS[p.go];
	var color = MATERIAL_COLORS[p.Material];
	var hasArch = Object.prototype.hasOwnProperty.call(ARCH_FILLS, p.Architectu);

	// Сочетание, которого нет в таблицах: стиль не задаётся и Leaflet
	// использует стиль по умолчанию (так же работал прежний switch без default)
	if (!fillColor || !color || !hasArch) return undefined;

	var style = {
		color: color,
		fillOpacity: 1,
		fillColor: fillColor,
		weight: 2
	};
	if (ARCH_FILLS[p.Architectu]) style.fill = ARCH_FILLS[p.Architectu];
	return style;
};
