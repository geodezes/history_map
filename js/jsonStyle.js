var goStyle=function (feature) {
		           var go = feature.properties.go;
		           var m=feature.properties.Material;
				   var ast=feature.properties.Architectu;
      if (go == "ГО н" && m=="дерево" && ast=="Эклектика") {
        return {
          color: "Peru",
          fillOpacity: 0.5,
		      fillColor: "Khaki",
		      weight: 1.5,
			  fill: 'url(stripes/eklektika.gif)'
        }; 
      }
	  else if (go == "ГО н" && m=="дерево" && ast=="Модерн") {
        return {
          color: "Peru",
          fillOpacity: 0.5,
		      fillColor: "Khaki",
		      weight: 1.5,
			  fill: 'url(stripes/modern.gif)'
        }; 
      }
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
      else if (go == "ГО н" && m=="камень") {
        return {
          color: "Gray",
          fillOpacity: 0.5,
		      fillColor: "Khaki",
		      weight: 1.5
        }; 
      }
      else if (go == "ГО н" && m=="песчаник") {
        return {
          color: "Orange",
          fillOpacity: 0.5,
		      fillColor: "Khaki",
		      weight: 2
        }; 
      }
      else if (go == "ГО н" && m=="камень/дерево") {
        return {
          color: "Brown",
          fillOpacity: 0.5,
		      fillColor: "Khaki",
		      weight: 1.5
        }; 
      }
      else if (go == "ГО н" && m == "песчаник/дерево") {
        return {
          color: "Olive",
          fillOpacity: 0.5,
          fillColor: "Khaki",
          weight: 1.5
        };
      }
      else if (go == "ГО р" && m=="дерево") {
        return {
          color: "Peru",
          fillOpacity: 0.5,
		      fillColor: "Coral",
		      weight: 1.5
        }; 
      }
      else if (go == "ГО р" && m=="камень") {
        return {
          color: "Gray",
          fillOpacity: 0.5,
		      fillColor: "Coral",
		      weight: 1.5
        }; 
      }
      else if (go == "ГО р" && m=="песчаник") {
        return {
          color: "Orange",
          fillOpacity: 0.5,
		      fillColor: "Coral",
		      weight: 1.5
        }; 
      }
      else if (go == "ГО р" && m=="камень/дерево") {
        return {
          color: "Brown",
          fillOpacity: 0.5,
		      fillColor: "Coral",
		      weight: 1.5
        }; 
      }
      else if (go == "ГО р" && m == "песчаник/дерево") {
        return {
          color: "Olive",
          fillOpacity: 0.5,
          fillColor: "Coral",
          weight: 1.5
        };
      }
      else if (go == "ГО ф" && m == "дерево") {
        return {
          color: "Peru",
          fillOpacity: 0.5,
          fillColor: "Crimson",
          weight: 1.5
        };
      }
      else if (go == "ГО ф" && m == "камень") {
        return {
          color: "Gray",
          fillOpacity: 0.5,
          fillColor: "Crimson",
          weight: 1.5
        };
      }
      else if (go == "ГО ф" && m == "песчаник") {
        return {
          color: "Orange",
          fillOpacity: 0.5,
          fillColor: "Crimson",
          weight: 1.5
        };
      }
      else if (go == "ГО ф" && m == "камень/дерево") {
        return {
          color: "Brown",
          fillOpacity: 0.5,
          fillColor: "Crimson",
          weight: 1.5
        };
      }
      else if (go == "ГО ф" && m == "песчаник/дерево") {
        return {
          color: "Olive",
          fillOpacity: 0.5,
          fillColor: "Crimson",
          weight: 1.5
        };
      }
        else if (go == "ГО м" && m == "дерево") {
        return {
          color: "Peru",
          fillOpacity: 0.5,
          fillColor: "YellowGreen",
          weight: 1.5
        };
      }
      else if (go == "ГО м" && m == "камень") {
        return {
          color: "Gray",
          fillOpacity: 0.5,
          fillColor: "YellowGreen",
          weight: 1.5
        };
      }
      else if (go == "ГО м" && m == "песчаник") {
        return {
          color: "Orange",
          fillOpacity: 0.5,
          fillColor: "Crimson",
          weight: 1.5
        };
      }
      else if (go == "ГО м" && m == "камень/дерево") {
        return {
          color: "Brown",
          fillOpacity: 0.5,
          fillColor: "YellowGreen",
          weight: 1.5
        };
      }
      else if (go == "ГО м" && m == "песчаник/дерево")
        return {
          color: "Olive",
          fillOpacity: 0.5,
          fillColor: "YellowGreen",
          weight: 1.5
        };
			
	}