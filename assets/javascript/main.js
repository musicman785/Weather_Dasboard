$(document).ready(function () {

    


    //array of cities user inputs
    var cities = [];



    function userCitiesInput(event) {
        event.preventDefault();


        var userCitySearch = $("input").val();

        cities.push(userCitySearch);

        localStorage.setItem("cityName", JSON.stringify(cities));

        var citySearch = $("<div>").text(userCitySearch);

        $("form").append(citySearch);


    };
    function cityList() {

        cities = JSON.parse(localStorage.getItem("cityName"));

        if (cities == null) {
            cities = [];
        }
        for (var i = 0; i < cities.length; i++) {
            var userCityLoop = cities[i];
            var pEl = $("<p>").text(userCityLoop);
            $("form").append(pEl);
        }
        

    };

    function weatherApi () {
        
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCitySearch + "appid=8d810efcafa44d9cf05372c0c0090226";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // logging queryURL
            console.log(queryURL);
            //loging the response
            console.log(response);


        });

    }

     $("button").on("click", userCitiesInput);
    cityList();



    




});