$(document).ready(function () {

    //array of cities user inputs
    var cities = [];
    var userCitySearch;

    // function to retreive user city input
    function userCitiesInput(event) {
        event.preventDefault();

        //variable holds value of input
        userCitySearch = $("input").val();

        //pushes the new city searched into the cities array
        cities.push(userCitySearch);

        // sets cities searched into local storage
        localStorage.setItem("cityName", JSON.stringify(cities));

        //variable
        var citySearch = $("<div>").text(userCitySearch).addClass("clickable");

        $("form").append(citySearch);

        weatherApi(userCitySearch);
    };

    function cityList() {

        cities = JSON.parse(localStorage.getItem("cityName"));

        if (cities == null) {
            cities = [];
        }
        for (var i = 0; i < cities.length; i++) {
            var userCityLoop = cities[i];
            var pEl = $("<p>").text(userCityLoop);
            pEl.addClass("clickable");
            $("form").append(pEl);
        }


    };

    function weatherApi(userCitySearch) {

        //variable holds api url to retrieve information
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCitySearch + "&appid=8d810efcafa44d9cf05372c0c0090226";


        //ajax call and GET method to retrieve data
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // variables holding icon data
            var current = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";
            var firstDay = "http://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + "@2x.png";
            var secondDay = "http://openweathermap.org/img/wn/" + response.list[13].weather[0].icon + "@2x.png";
            var thirdDay = "http://openweathermap.org/img/wn/" + response.list[21].weather[0].icon + "@2x.png";
            var fourthDay = "http://openweathermap.org/img/wn/" + response.list[29].weather[0].icon + "@2x.png";
            var fifthDay = "http://openweathermap.org/img/wn/" + response.list[37].weather[0].icon + "@2x.png";

            // variables to store icons for easier access

            var mainIcon = $('<img src=" '+ current +' "/>');
            var firstIcon = $('<img src=" '+ firstDay +' "/>');
            var secondIcon = $('<img src=" '+ secondDay +' "/>');
            var thirdIcon = $('<img src=" '+ thirdDay +' "/>');
            var fourthIcon = $('<img src=" '+ fourthDay +' "/>');
            var fifthIcon = $('<img src=" '+ fifthDay +' "/>');

            // variables needed to hold data for long and lat for uvi Index 
            var latCoordinate = response.city.coord.lat;
            var longCoordinate = response.city.coord.lon;

            //Assign current weather to main div in DOM

            $("#city").text(response.city.name + "(" + response.list[0].dt_txt.substr(0, 10) + ")").append(mainIcon);
            $("#temp").text("Temperature:" + ((response.list[5].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
            $("#humidity").text("Humidity: " + response.list[5].main.humidity + " %");
            $("#wind").text("Wind Speed" + response.list[5].wind.speed + " mph");


            // Data for current day information to be displayed to DOM
            $("#day-1").text(response.list[5].dt_txt.substr(0, 10));
            $("#icon-1").empty().append(firstIcon);
            $("#temp-1").text("Temp:" + ((response.list[5].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
            $("#humidity-1").text("Humidity:" + response.list[5].main.humidity + " %");



            //Data for day after current day to be displayed on card-2 in DOM
            $("#day-2").text(response.list[13].dt_txt.substr(0, 10));
            $("#icon-2").empty().append(secondIcon);
            $("#temp-2").text("Temp:" + ((response.list[13].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
            $("#humidity-2").text("Humidity:" + response.list[13].main.humidity + " %");

            //Data for two days after current day to be displayed in card 3 in DOM
            $("#day-3").text(response.list[21].dt_txt.substr(0, 10));
            $("#icon-3").empty().append(thirdIcon);
            $("#temp-3").text("Temp:" + ((response.list[21].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
            $("#humidity-3").text("Humidity:" + response.list[21].main.humidity + " %");


            //Data for three days after current day to be displayed in card 4 in DOM
            $("#day-4").text(response.list[29].dt_txt.substr(0, 10));
            $("#icon-4").empty().append(fourthIcon);
            $("#temp-4").text("Temp:" + ((response.list[29].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
            $("#humidity-4").text("Humidity:" + response.list[29].main.humidity + " %");


            //Data for four days after current day to be displayed in card 5 in DOM
            $("#day-5").text(response.list[37].dt_txt.substr(0, 10));
            $("#icon-5").empty().append(fifthIcon);
            $("#temp-5").text("Temp:" + ((response.list[37].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
            $("#humidity-5").text("Humidity:" + response.list[37].main.humidity + " %");

            uviIndex(latCoordinate, longCoordinate)

        });

    };


    //Function to retreive UVI index from openweather api 
    function uviIndex(latCoordinate, longCoordinate) {

        var indexURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latCoordinate + "&lon=" + longCoordinate + "&exclude=hourly,daily&appid=8d810efcafa44d9cf05372c0c0090226";

        $.ajax({
            url: indexURL,
            method: "GET"
        }).then(function (responsetwo) {

            console.log(responsetwo);

            //variable to hold uv index data from response 1
            var UVI = responsetwo.current.uvi;

            //appending uvi to DOM element
            $("#UVIindex").text("UV Index:" + UVI);

        });

    };
    //need a fuction to make stored cities viewable by clicking them

    function storedCities() {

        // needa variable to store name of cities
        var userCitySearch = $(this)[0].innerHTML;
      
        //weatherApi function should recall info from city clicked
        weatherApi(userCitySearch);
       
    

    }

    $("button").on("click", userCitiesInput);
    $()
    $(document).on("click", ".clickable", storedCities);
    cityList();

});