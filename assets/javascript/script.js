///learn how giphy API works, and test it out before building off of it
	//vars needed: array of strings for the theme
	var topics = ["movie","cat","slow motion","food","dog","cartoon","science","balloon"];
	

// 2. Your app should take the topics in this array and create buttons in your HTML.
  	//* Try using a loop that appends a button for each string in the array

		//render buttons function from 'working-movie-app-solved'
			//render with random color from available classes of buttons on bootstrap


// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. 
	function start() {
		renderButtons();
		getGif();
		inputGifs();
		$("body").on("click","img",animateGifs);
	};

	function getGif() {
		$(".giphyBtn").on("click",function(event) {
			

			event.preventDefault();
			
			var topic = $(this).attr("data-name") + "+" + "explosions";
			var apiKey = "0febcf6190c6430580026e9d5562af2c";
			//grab gifs
			// var type = "monkey" + "+" + "explosions" ; //button array data
			//obj to pass ajax data
			var objType = {
				"q": topic,
				"limit": "10", 
				"lang": "en",
				"fmt":"json",
				"rating" : "g",
				"api_key": apiKey 
			};

			var queryURL = "https://api.giphy.com/v1/gifs/search?";
			$.get({
				url: queryURL,
				data: objType,
				success: null,
				method: "GET"
			})
			.done(function(response) {

					var results = response.data;

					console.log(results);

				for (var i = 0; i < results.length; i++) {

					var gifDiv = $("<div class='grid-item'>");

					var rating = results[i].rating;

					var p = $("<p class='text-center'>").text("Rating: " + rating);

					var gifImage = $("<img class='img-responsive center-block'>");
					// debugger;
					gifImage.attr({"src": results[i].images.fixed_width_still.url,
									"data-state": "still",
									"data-still": results[i].images.fixed_width_still.url,
									"data-animate": results[i].images.fixed_width.url});
					
					var aTag = $("<a href='#!' class='gif text-center'>");
					aTag.append(gifImage);
					aTag.append(p);

					gifDiv.append(aTag);

					$(".grid").prepend(gifDiv);
				}
					

					var $grid = $('.grid').masonry({
					  // options
					  initLayout: true,
					  itemSelector: ".grid-item",
					  columnWidth: ".grid-sizer",
					  // percentPosition: true,
					  gutter: ".gutter-sizer",
					  horizontalOrder: true,
					  containerStyle: null,
					  transitionDuration: '0.2s'
					});

					function onLayout () {
						console.log("layout done ")
					}

					// $grid.on("layoutComplete", onLayout);
					debugger;
					$grid.imagesLoaded().always( function() {
					  $grid.masonry('layout');
					});

					// $grid.on('layoutComplete',function(event,laidOutItems) {

					// })
			});

		})
	};

	function renderButtons () {
		
		$(".topics-Btn").empty();
		var btnArr = ["btn-primary","btn-success","btn-info","btn-warning","btn-danger"];

		for (var i = 0; i < topics.length; i++) {
			//create a button for each topic
			var a = $("<button>");
			//add a class
			a.addClass("giphyBtn btn " + btnArr[i]);
			//add data attribute to store topic as data in the button HTML. used to get ajax query
			a.attr("data-name",topics[i]);
			//make text the value of the array (will do the same for input)
			a.text(topics[i] + " "+ "explosions");
			//add the button to the div
			$(".topics-Btn").append(a);
		}

				
				// assign a new color for each button displayed to the DOM, in the order listed in the array
			if ($(".giphyBtn").length > btnArr.length) {
				var k=0;
				var temp= btnArr.length;
				// debugger;

				for (var j = 0; j < $(".giphyBtn").length - temp; j++) {
					btnArr.push(btnArr[k]),
					$(".giphyBtn").eq(btnArr.length -1).addClass(btnArr[k]);
					k++;
				}
			}
			//if topics length is longer than btnArr length, fill the array with the same array order, and assign the class
	}

	function inputGifs () {
		$(".submit-btn").on("click", function() {
			event.preventDefault();
			// debugger;
			//if text has string beginning with 'explo' delete string
			var gifSearch = $("#inputGif").val().trim();

			topics.push(gifSearch);

			renderButtons();
			getGif();
		});
	}

		// renderButtons();
	function animateGifs () {
		event.preventDefault();
		// debugger;
			
			var state = $(this).attr("data-state");

			if (state === "still") {
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state","animate");
			} else {
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
			}
	};

$(document).ready(function() {
	$("body").css("backgroundColor","#000000");
	start();
});
		//javascript, jQuery
			// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
			// xhr.done(function(data) { console.log("success got data", data); });
			// //'button trigger ajax' exercise
			//2-ajax-to-html exercise on how to make an object (which looks cleaner to me)
		//static gifs 
			//'pausing gifs' exercise 

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
		//pausing gifs exercise 


// 5. Under every gif, display its rating (PG, G, so on). 
	//    * This data is provided by the GIPHY API.
	//    * Only once you get images displaying with button presses should you move on to the next step.

//build the dom using the movie button exercise
	//build the buttons first, then the input

//display photos to the dom using the ajax exercises 

//style the page using masonry





// //### Before You Begin

// 1. **Hit the GIPHY API**.
//    * Fool around with the GIPHY API. [Giphy API](https://github.com/Giphy).
//    * Be sure to read about these GIPHY parameters (hint, hint): 
//      * `q`
//      * `limit`
//      * `rating`
//    * Like many APIs, GIPHY requires developers to use a key to access their API data. For now, you can use their [public API key](https://github.com/Giphy/GiphyAPI#public-beta-key).
//    * Make sure you switch the protocol in the query URL from **`http to https`**, or the app may not work properly when deployed to Github Pages.

// ### Instructions

// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`. 
//    * We chose animals for our theme, but you can make a list to your own liking.

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. 

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on). 
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// 7. Deploy your assignment to Github Pages.

// 8. **Rejoice**! You just made something really cool.

// - - -

// ### Minimum Requirements

// Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed.

// - - -

// ### One More Thing

// If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

// **Good Luck!**

// ## Copyright

// Coding Boot Camp (C) 2016. All Rights Reserved.

// notes 

// https://masonry.desandro.com/
// <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
// <!-- or -->
// <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js"></script>

// http://salvattore.com/