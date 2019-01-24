
var simpsons = ["Bart Simpson", "Homer Simpson", "Lisa Simpson", "Marge Simpson", "Maggie Simpson"];

function doSearch() {
  var txt = $(this).val();
  var simpsonChar = $.get("https://api.giphy.com/v1/gifs/search?q="+ txt +"&api_key=O74jZQvUg3FpFO1X8fI5dC4mP96jCpO6&limit=10&rating=pg-13");
  simpsonChar.done(function (data) { console.log("success got data", data); });

  $.ajax({
    url: simpsonChar,
    method: "GET"
  }).then(function (response) {

    // Create CODE HERE to Log the simpsonChar
    console.log(simpsonChar);
    // Create CODE HERE to log the resulting object
    console.log(response);
    // Create CODE HERE to transfer content to HTML
    $('#simpson.title').html("Title: " + response.title);
    $('#simpson.rating').html("Rating: " + response.rating);
    $('#simpson.url').html('URL: ' + response.url);
  
  });
}

  // Function for displaying movie data
  function renderButtons() {

    // Delete the content inside the movies-view div prior to adding new movies
    $('#simpson-div').empty();
    // (this is necessary otherwise you will have repeat buttons)
    $('#simpson-div').html('');
    // Loop through the array of movies, then generate buttons for each movie in the array
    for (var i = 0; i < simpsons.length; i++) {
      var button = $('<button>');
      button.text(simpsons[i]);
      button.addClass('searchButton');
      $('#simpson-div').append(button);
    }
    $(".searchButton").on('click', doSearch)
  }

  // This function handles events where the add movie button is clicked
  $("#add-simpson").on("click", function (event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    // Write code to add the new movie into the movies array
    var newM = $("#simpson-input").val();
    simpsons.push(newM);
    console.log(simpsons);
    // The renderButtons function is called, rendering the list of movie buttons
    renderButtons();
  });

  // Calling the renderButtons function to display the initial list of movies
  renderButtons();

  // $('.searchButton').on(function () { doSearch(); });
