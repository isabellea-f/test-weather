const backgrounds = {
    1000: "sun.jpg",

    
    1003: "partlyCloudy.jpg",
    1006: "cloudy.jpg",
    1009: "overcast.jpg",


    1030: "mist.jpg",
    1063: "rainycloud.jpg",
    1066: "rainycloud.jpg",
    1069: "rainycloud.jpg",
    1072:"rainycloud.jpg",

    1087: "stormy.jpg",
    1114: "snowy.jpg",
    1117: "snowy.jpg",
    1135: "foggy.jpg",
    1147: "foggy.jpg",

    1150: "rain.jpg",
    1153: "rain.jpg",
    1168: "rain.jpg",
    1171: "rain.jpg",
    1180: "rain.jpg",
    1183: "rain.jpg",
    1186: "rain.jpg",
    1189: "rain.jpg",
    1192: "rain.jpg",
    1195: "rain.jpg",
    1198: "rain.jpg",
    1201: "rain.jpg",
    1204: "rain.jpg",
    1207: "rain.jpg",
    
    1210: "snowy.jpg",
    1213: "snowy.jpg",
    1216: "snowy.jpg",
    1219: "snowy.jpg",
    1222: "snowy.jpg",
    1225: "snowy.jpg",
    1237: "icy.jpg",
    1240: "rain.jpg",
    1243: "rain.jpg",
    1246: "rain.jpg",
    1249: "rain.jpg",
    1252: "rain.jpg",
    1255: "snow.jpg",
    1258: "snow.jpg",
    1261: "rain.jpg",
    1264: "rain.jpg",
    1273: "rain.jpg",
    1276: "stormy.jpg",
    1279: "snowy.jpg",
    1282: "snowy.jpg"

};

  /* Dynamic background */
    const currentConditionCode = result.current.condition.code;
    let background = backgrounds[currentConditionCode];

    document.body.style.backgroundImage = "url('images/" + background + "')";
 