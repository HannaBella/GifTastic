var holiday = ["New Year", "Christmas", "Thanksgiving", "Independence Day", "Memorial Day", "President's Day"];

function renderButtons() {

    $("#buttons-view").empty();
    for (var i = 0; i < holiday.length; i++) {
        var newBtn = $("<button class='btn-info'>");
        newBtn.addClass("holidayButton");
        newBtn.attr("data-type", holiday[i]);
        newBtn.text(holiday[i]);
        $("#buttons-view").append(newBtn);

    }
}

function displayInfo() {
    //$(document).on("click", ".holidayButton", function() {
    $("#holiday-gifs").empty();
    var holidayName = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + holidayName + "&api_key=BcEoxVnLkkL1c54oo28yEbza93tvznx9&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            var gifDiv = $("<div class='search-item'>");

            var title = response.data[i].title;
            var titleDiv = $("<h5>").text("Title: " + title);
            var rating = response.data[i].rating;
            var ratingP = $("<p>").text("Rating: " + rating);
            var animate = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $("<img class='holidayImage'>");
            //image.attr(`src=${still} data-still=${still} data-animate=${animate} data-state=${"still"}`);
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animate", animate);
            image.attr("data-state", "still");

            // image.addClass("holidayImage");
            gifDiv.append(image, titleDiv, ratingP);
            $("#holiday-gifs").append(gifDiv);
        }

    })
}

$(document).on("click", ".holidayImage", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
$("#add-holiday").on("click", function(event) {
    event.preventDefault();
    var newHolidayBtn = $("#holiday-input").val().trim();
    holiday.push(newHolidayBtn);
    renderButtons();
    //populateButton(holiday, 'holidayButton', '#buttons-view');
});
$(document).on("click", ".holidayButton", displayInfo);
renderButtons();