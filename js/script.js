function degToCompass(degrees) {
    var val = ((degrees / 22.5) + .5);
    var arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return arr[(val % 16)];
}

function convertCtoF(C) {
    return Math.round(C * 1.8 + 32);
}

function convertFtoC(F) {
    return Math.round((F - 32) / 1.8);
}

function convertMPHtoKPH(speed) {
    return Math.round(speed * 1.609344);
}

function convertKPHtoMPH(speed) {
    return Math.round(speed / 1.609344);
}



$(document).ready(function () {
    var apiKey = 'd6a38e3ab7ef4b0aed9cb9e2c9ca92e9';
    var apiURL = 'http://api.openweathermap.org/data/2.5/weather';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $.getJSON(apiURL,
                {
                    APPID: apiKey,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    units: "imperial"
                }, function (data) {
                    $("#city").append(data["name"] + ", " +data["sys"]["country"]);

                    $(".owf").addClass(function () {
                        return "owf-" + data["cod"];
                    });

                    $("#condition").append(data["weather"]["description"]);
                    $("#temperature").append(Math.round(data["main"]["temp"]) + "&deg; F");
                    $("#humidity").append(data["main"]["humidity"] + "%");
                    $("#wind").append(Math.round(data["wind"]["speed"]) + " MPH");

                    $('a').click(function () {
                        if ($(this).text() === "Imperial") {
                            $("#temperature").html(convertFtoC(data["main"]["temp"]) + "&deg; C");
                            $("#wind").html("Wind Speed: " + convertMPHtoKPH(data["wind"]["speed"]) + " KPH");
                            $(this).text("Metric");
                        }
                        else if ($(this).text() === "Metric") {
                            $("#temperature").html(convertCtoF($("#temperature").text().slice(0, -3)) + "&deg; F");
                            $("#wind").html("Wind Speed: " + convertKPHtoMPH(data["wind"]["speed"]) + " MPH");
                            $(this).text("Imperial");
                        }
                    })
                });


        });
    }




});

