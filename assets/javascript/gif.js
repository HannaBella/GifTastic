//creating holiday array with some holidays
var holiday = ["New Year", "Christmas", "Thanksgiving", "Independence Day", "Memorial Day", "President's Day"];

function renderButtons() {
    // Deleting the holiday prior to adding the new one 
    $("#buttons-view").empty();
    for (var i = 0; i < holiday.length; i++) {
        // Dynamicaly generating buttons for each holiday in the array
        var newBtn = $("<button class='btn-info'>");
        // Adding a class of holiday-btn to our button
        newBtn.addClass("holidayButton");
        // Adding a data-attribute
        newBtn.attr("data-type", holiday[i]);
        // Providing the initial button text
        newBtn.text(holiday[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(newBtn);

    }
}

// displayInfo function re-renders the HTML to display the appropriate content
function displayInfo() {
    // Deleting the prior holiday gif to add the new one 
    $("#holiday-gifs").empty();
    var holidayName = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + holidayName + "&api_key=BcEoxVnLkkL1c54oo28yEbza93tvznx9&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            // Creating a div to hold the gif
            var gifDiv = $("<div class='search-item'>");
            // Storing the title data
            var title = response.data[i].title;
            // Creating h5 element to have the title displayed
            var titleDiv = $("<h5>").text("Title: " + title);
            // Storing the rating data
            var rating = response.data[i].rating;
            // Creating a paragraph to have the rating displayed
            var ratingP = $("<p>").text("Rating: " + rating);
            // Storing the still image
            var still = response.data[i].images.fixed_height_still.url;
            // Storing the animate image
            var animate = response.data[i].images.fixed_height.url;
            // Creating an element to hold the image
            var image = $("<img class='holidayImage'>");
            //Adding attribute to image
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animate", animate);
            image.attr("data-state", "still");

            // Displaying the rating and title
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

// This function handles events where a holiday button is clicked
$("#add-holiday").on("click", function(event) {
    event.preventDefault();
    //check input text added
    if ($("#holiday-input").val().trim() != '') {
        // This line grabs the input from the textbox
        var newHoliday = $("#holiday-input").val().trim();
        // Adding holiday from the textbox to our array
        holiday.push(newHoliday);
        // Calling renderButtons which handles the processing of holiday array
        renderButtons();
    }
});
// Adding a click event listener to all elements with a class of "holidayButton"
$(document).on("click", ".holidayButton", displayInfo);
// Calling the renderButtons function to display the intial buttons
renderButtons();