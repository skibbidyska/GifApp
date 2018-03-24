var apiKey = "HTLm330De5PWyfDteFoJRuGdzPWv32wj"
var query = "welcome";
// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=40"
var dataStill;
var dataAnimate;
var buttonCounter = 1;

function emptyImgDivs() {
    for (var i = 1; i < 5; i++) {
        $("#" + i).empty();
    }
}

function animateGifs() {
    $("img").on("click", function () {
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
}

function searchForGifs() {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=40",
        method: "GET"
    }).then(function (response) {

        var counter = 1;

        $("#gif-header").empty();
        $("#gif-header").html("<h1 class='bg-success text-white border-bottom border-white pb-3'>" + query.toUpperCase() + "</h1>");


        for (var i = 0; i < response.data.length; i++) {
            dataStill = response.data[i].images.fixed_height_still.url;
            dataAnimate = response.data[i].images.fixed_height.url;
            var $p = $("<p>");
            var $div = $("<div>");
            var $img = $("<img>");
            $p.text("Rating: " + response.data[i].rating.toUpperCase());
            $p.attr("class", "text-center");
            $img.attr("class", "col-md-12 mt-3");
            $img.attr("data-still", dataStill);
            $img.attr("data-animate", dataAnimate);
            $img.attr("data-state", "still");
            $img.attr("src", dataStill);
            $img.attr("id", "gif");
            $div.prepend($p);
            $div.prepend("</br>");
            $div.prepend($img);
            $("#gif-container").scrollTop();

            if (counter === 5) {
                counter = 1;
                $("#" + counter).prepend($div);
                counter++;
            }
            else {

                $("#" + counter).prepend($div);
                counter++;
            }

        }

        animateGifs();
    });
}

$("#search-button").on("click", function () {
    event.preventDefault();
    query = $("#user-input").val();
    searchForGifs();
    if (buttonCounter === 6) {
        buttonCounter = 1;
        $("#b-" + buttonCounter).append("<button class='btn btn-success btn-toolbar text-white mt-3 buttonQuery'>" + query.toUpperCase() + "</button>");
        buttonCounter++;
    }
    else {

        $("#b-" + buttonCounter).append("<button class='btn btn-success btn-toolbar text-white mt-3 buttonQuery'>" + query.toUpperCase() + "</button>");
        buttonCounter++;
    }


});

$(document).on("click", "#button-container .mx-auto .buttonQuery", function () {
    console.log($(this).text());
    query = $(this).text();
    searchForGifs();

})
searchForGifs();

