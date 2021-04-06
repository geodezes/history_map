var goStyle = function(feature) {
        switch (feature.properties.go+"|"+feature.properties.Material+"|"+feature.properties.Architectu) {
            
//вновь выявленые
			//дерево
			case 'ГО н|дерево|Эклектика': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО н|дерево|Модерн': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО н|дерево|Сибирское барокко': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО н|дерево|Классицизм': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО н|дерево|Конструктивизм': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО н|дерево|-': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										};							
			
			
			//камень
			
			case 'ГО н|камень|Эклектика': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО н|камень|Модерн': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО н|камень|Сибирское барокко': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО н|камень|Классицизм': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО н|камень|Конструктивизм': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО н|камень|-': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										};					
			
			//песчаник
			
			case 'ГО н|песчаник|Эклектика': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО н|песчаник|Модерн': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО н|песчаник|Сибирское барокко': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО н|песчаник|Классицизм': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО н|песчаник|Конструктивизм': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО н|песчаник|-': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										};					
			
			//камень/дерево
			
			case 'ГО н|камень/дерево|Эклектика': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО н|камень/дерево|Модерн': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО н|камень/дерево|Сибирское барокко': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО н|камень/дерево|Классицизм': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО н|камень/дерево|Конструктивизм': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО н|камень/дерево|-': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										};					
			
			//песчаник/дерево
			
			case 'ГО н|песчаник/дерево|Эклектика': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО н|песчаник/дерево|Модерн': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО н|песчаник/дерево|Сибирское барокко': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО н|песчаник/дерево|Классицизм': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО н|песчаник/дерево|Конструктивизм': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО н|песчаник/дерево|-': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Khaki",
										weight: 2,
										};					
			
			//регионального значения
			
			case 'ГО р|дерево|Эклектика': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО р|дерево|Модерн': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО р|дерево|Сибирское барокко': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО р|дерево|Классицизм': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО р|дерево|Конструктивизм': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО р|дерево|-': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										};							
			
			
			//камень
			
			case 'ГО р|камень|Эклектика': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО р|камень|Модерн': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО р|камень|Сибирское барокко': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО р|камень|Классицизм': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО р|камень|Конструктивизм': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО р|камень|-': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										};					
			
			//песчаник
			
			case 'ГО р|песчаник|Эклектика': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО р|песчаник|Модерн': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО р|песчаник|Сибирское барокко': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО р|песчаник|Классицизм': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО р|песчаник|Конструктивизм': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО р|песчаник|-': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										};					
			
			//камень/дерево
			
			case 'ГО р|камень/дерево|Эклектика': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО р|камень/дерево|Модерн': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО р|камень/дерево|Сибирское барокко': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО р|камень/дерево|Классицизм': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО р|камень/дерево|Конструктивизм': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО р|камень/дерево|-': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										};					
			
			//песчаник/дерево
			
			case 'ГО р|песчаник/дерево|Эклектика': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО р|песчаник/дерево|Модерн': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО р|песчаник/дерево|Сибирское барокко': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО р|песчаник/дерево|Классицизм': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО р|песчаник/дерево|Конструктивизм': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО р|песчаник/дерево|-': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Coral",
										weight: 2,
										};			
			
			//федерального значения
			
			case 'ГО ф|дерево|Эклектика': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО ф|дерево|Модерн': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО ф|дерево|Сибирское барокко': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО ф|дерево|Классицизм': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО ф|дерево|Конструктивизм': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО ф|дерево|-': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										};							
			
			
			//камень
			
			case 'ГО ф|камень|Эклектика': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО ф|камень|Модерн': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО ф|камень|Сибирское барокко': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО ф|камень|Классицизм': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО ф|камень|Конструктивизм': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО ф|камень|-': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										};					
			
			//песчаник
			
			case 'ГО ф|песчаник|Эклектика': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО ф|песчаник|Модерн': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО ф|песчаник|Сибирское барокко': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО ф|песчаник|Классицизм': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО ф|песчаник|Конструктивизм': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО ф|песчаник|-': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										};					
			
			//камень/дерево
			
			case 'ГО ф|камень/дерево|Эклектика': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО ф|камень/дерево|Модерн': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО ф|камень/дерево|Сибирское барокко': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО ф|камень/дерево|Классицизм': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО ф|камень/дерево|Конструктивизм': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО ф|камень/дерево|-': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										};					
			
			//песчаник/дерево
			
			case 'ГО ф|песчаник/дерево|Эклектика': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО ф|песчаник/дерево|Модерн': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО ф|песчаник/дерево|Сибирское барокко': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО ф|песчаник/дерево|Классицизм': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО ф|песчаник/дерево|Конструктивизм': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО ф|песчаник/дерево|-': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "Crimson",
										weight: 2,
										};			
			
			//муниципального значения
			
						case 'ГО м|дерево|Эклектика': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО м|дерево|Модерн': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО м|дерево|Сибирское барокко': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО м|дерево|Классицизм': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО м|дерево|Конструктивизм': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО м|дерево|-': return {
										color: "Peru",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										};							
			
			
			//камень
			
			case 'ГО м|камень|Эклектика': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО м|камень|Модерн': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО м|камень|Сибирское барокко': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО м|камень|Классицизм': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО м|камень|Конструктивизм': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО м|камень|-': return {
										color: "Gray",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										};					
			
			//песчаник
			
			case 'ГО м|песчаник|Эклектика': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО м|песчаник|Модерн': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО м|песчаник|Сибирское барокко': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО м|песчаник|Классицизм': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО м|песчаник|Конструктивизм': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО м|песчаник|-': return {
										color: "Orange",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										};					
			
			//камень/дерево
			
			case 'ГО м|камень/дерево|Эклектика': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО м|камень/дерево|Модерн': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО м|камень/дерево|Сибирское барокко': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО м|камень/дерево|Классицизм': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО м|камень/дерево|Конструктивизм': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО м|камень/дерево|-': return {
										color: "Brown",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										};					
			
			//песчаник/дерево
			
			case 'ГО м|песчаник/дерево|Эклектика': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/eklektika.png)'
										};
			case 'ГО м|песчаник/дерево|Модерн': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/modern.png)'
										};
			case 'ГО м|песчаник/дерево|Сибирское барокко': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/barokko.png)'
										};
			case 'ГО м|песчаник/дерево|Классицизм': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/klassicizm.png)'
										};
			case 'ГО м|песчаник/дерево|Конструктивизм': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										fill: 'url(images/stripes/konstruktivizm.png)'
										};
			case 'ГО м|песчаник/дерево|-': return {
										color: "Olive",
										fillOpacity: 1,
										fillColor: "YellowGreen",
										weight: 2,
										};			
			
			
			
           
   		}
		
		
}