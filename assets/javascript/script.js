
	var topics = ["movie","cat","slow motion","food","dog","cartoon","science","balloon"];
	//boolean switch to determine which action masonry takes after it's completed once
	var grid = false;
	var $grid;

	
	function start() {
		renderButtons();
		getGif();
		inputGifs();
		animateGifs();
		clearGifs();


	};

	function getGif() {
		$(".giphyBtn").on("click",function(event) {

			event.preventDefault();
			
			var topic = $(this).attr("data-name") + "+" + "explosions";
			var apiKey = "0febcf6190c6430580026e9d5562af2c";

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

				for (var i = 0; i < results.length; i++) {

					var gifDiv = $("<div class='grid-item'>");

					var rating = results[i].rating;

					var p = $("<p class='text-center'>").text("Rating: " + rating);

					var gifImage = $("<img class='img-responsive center-block'>");
				
					gifImage.attr({"src": results[i].images.fixed_width_still.url,
									"data-state": "still",
									"data-still": results[i].images.fixed_width_still.url,
									"data-animate": results[i].images.fixed_width.url});
					
					var aTag = $("<a href='#!' class='gif text-center'>");
					aTag.append(gifImage);
					aTag.append(p);

					gifDiv.append(aTag);

					
					$(".grid").prepend(gifDiv);

					if (grid===true) {
						
						$grid.masonry("prepended",gifDiv).imagesLoaded().progress(function () {
							$grid.masonry('layout');
						});
					}
				}


				if (grid===false) {
					// debugger;

					$grid = $('.grid').masonry({
					  itemSelector: ".grid-item",
					  columnWidth: ".grid-sizer",
					  percentPosition: true,
					  gutter: ".gutter-sizer",
					  horizontalOrder: true,
					  containerStyle: null,
					  transitionDuration: '0.2s'
					});

					// function onLayout () {
					// 	console.log("layout done ")
					// }

					$grid.imagesLoaded().progress( function() {
					  $grid.masonry('layout');
					  grid = true;
					})
				}

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
	}

	function inputGifs () {
		$(".submit-btn").on("click", function() {
			event.preventDefault();
	
			var gifSearch = $("#inputGif").val().trim();

			topics.push(gifSearch);

			renderButtons();
			getGif();
			// debugger;
			$("#inputGif").val(" ");
		});
	}


	function animateGifs () {
		$("body").on("click","img", function() {	
			event.preventDefault();
			
			var state = $(this).attr("data-state");

			if (state === "still") {
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state","animate");
			} else {
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
			}
		});
	};

	function clearGifs () {

		$(".stamp1").on("click", function() {
			
		  // remove all grid elements
		  $grid.masonry( 'remove', $(".grid-item"))

		});
	}

$(document).ready(function() {
	$("body").css("backgroundColor","#000000");
	start();
});
 
