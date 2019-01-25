// Initial array of Simpsons Charecters
var simpsonsChar = ["Homer Simpson", "Bart Simpson", "Marge Simpson", "Lisa Simpson", "Maggie Simpson"];

// displayGif function re-renders the HTML to display the appropriate content
function displayGif() {

  var sChar = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ sChar +"&api_key=O74jZQvUg3FpFO1X8fI5dC4mP96jCpO6&rating=pg-13&limit=10";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function(response) {
    console.log(response);
       
       for (var i = 0;i < queryURL.length;i++){
        
        $('#simpsonTitle').append(response.data[i].title);
        $('#simpsonRating').text(response.data[i].rating);
        var img = $('<img>');
        var imgUrl = response.data[i].images.downsized.url;
        img.attr({src: imgUrl, width: '250px', height: '250px'});
        $('#simpsonGif').append(img);
       
      }
      


   
  });

}

 // Function for displaying movie data
 function renderButtons() {

  // Delete the content inside the movies-view div prior to adding new movies
  $('#simpson-div').empty();
  // (this is necessary otherwise you will have repeat buttons)
  $('#simpson-div').html('');
  // Loop through the array of movies, then generate buttons for each movie in the array
  for (var i = 0; i < simpsonsChar.length; i++) {
    var button = $('<button>');
    button.text(simpsonsChar[i]);
    button.addClass('searchButton');
    $('#simpson-div').append(button);
  }
  $(".searchButton").on('click', displayGif)
}

// This function handles events where the add movie button is clicked
$("#add-simpson").on("click", function (event) {

  event.preventDefault();
  var newM = $("#simpson-input").val().trim();
  simpsonsChar.push(newM);
  console.log(simpsonsChar);
  // The renderButtons function is called, rendering the list of movie buttons
  renderButtons();
});

// Calling the renderButtons function to display the initial list of movies
renderButtons();
