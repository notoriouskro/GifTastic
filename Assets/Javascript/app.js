// Initial array of Simpsons Charecters
var simpsonsChar = ["Homer Simpson", "Bart Simpson", "Marge Simpson", "Lisa Simpson", "Maggie Simpson"];

// displayGif function re-renders the HTML to display the appropriate content
function displayGif() {

  $('#simpsonGif').html('');

  var sChar = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ sChar +"&api_key=O74jZQvUg3FpFO1X8fI5dC4mP96jCpO6&rating=pg-13&limit=10";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function(response) {
    console.log(response);
       
       for (var i = 0;i < response.data.length;i++){
        
        $('#simpsonGif').append("<p><strong>Title:</strong> " + response.data[i].title.charAt(0).toUpperCase() + response.data[i].title.substring(1) + "</p>");
        
        $('#simpsonGif').append("<p><strong>Rating:</strong> " + response.data[i].rating.toUpperCase()+ "</p>");
        
        var imgUrl = response.data[i].images.downsized_still.url;
        var gifUrl = response.data[i].images.downsized.url;
        var img = $('<img>');
        img.attr('src', gifUrl);
        img.attr('data-still', imgUrl);
        img.attr('data-animate', gifUrl);
        img.attr('data-state', 'still');
        img.attr('class', 'gif');

        var imgUrl = response.data[i].images.downsized_still.url;
        img.attr({src: imgUrl, width: '250px', height: '250px'});
        $('#simpsonGif').append(img);
        var br = $('<br />');
        $('#simpsonGif').append(br);
        
      
      }
      $('.gif').on("click", function() {
        console.log('Gif Click');
     var state = $(this).attr('data-state');
     console.log(state);
      if (state === 'still') {
        $(this).attr('src',$(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
        
      }else {
        $(this).attr('src',$(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }

    })
   
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
    var button = $('<button class="btn btn-primary">');
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
