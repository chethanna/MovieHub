//function to assign values to each fields based on ajax response
let dataBinding = (movie_details) => {
	$("#display-title").html( `${movie_details.Title}`);	
	$("#display-actors").html( `${get_display_value(movie_details.Actors)}`);	
	$("#display-director").html( `${get_display_value(movie_details.Director)}`);	
	$("#display-genre").html( `${get_display_value(movie_details.Genre)}`);	
	$("#display-language").html( `${get_display_value(movie_details.Language)}`);	
	$("#display-plot").html( `${get_display_value(movie_details.Plot)}`);	
	$("#display-production").html( `${get_display_value(movie_details.Production)}`);	
	$("#display-rated").html( `${get_display_value(movie_details.Rated)}`);	
	$("#display-release").html( `${get_display_value(movie_details.Released)}`);	
	$("#display-runtime").html( `${get_display_value(movie_details.Runtime)}`);	
	$("#display-type").html( `${get_display_value(movie_details.Type)}`);
	$("#display-website").html( `${get_display_value(movie_details.Website)}`);
	$("#display-writer").html( `${get_display_value(movie_details.Writer)}`);
	$("#display-year").html( `(${get_display_value(movie_details.Year)})`);	
	$("#display-imdb-id").html( `${get_display_value(movie_details.imdbID)}`);	
	$("#display-imdb-rating").html( ` ${get_display_value(movie_details.imdbRating)}`);	
	$("#display-imdb-votes").html( `${get_display_value(movie_details.imdbVotes)}`);	
	$("#display-dvd").html( `${get_display_value(movie_details.DVD)}`);	
	$("#display-boxOffice").html( `${get_display_value(movie_details.BoxOffice)}`);	
	$("#display-country").html( `${get_display_value(movie_details.Country)}`);	
	$("#display-awards").html( `${get_display_value(movie_details.Awards)}`);	
	//to handle website hyperlink based on response
	if(get_display_value(movie_details.Website) != "N/A")
		{
	 		$("#display-website").attr("href",`${get_display_value(movie_details.Website)}`);		
	 	}
	else
		{
			$("#display-website").attr("href","#");		
		}	
	//to display default poster if response does not contain a poster	
	if(movie_details.Poster == "N/A")
	{
		$("#display-poster").attr("src","images/default-image.jpg");
	}	
	else
	{
		$("#display-poster").attr("src",`${movie_details.Poster}`);	
	}	
	//to dynamically handle ratings tab based on number of ratings available
	if(movie_details.Ratings.length !=0 )
	{
		$("#ratings-tab").append(`<div class="row m-0 pretext-color">
														Ratings 
														</div>`)
		for (x of  movie_details.Ratings) 
		{
			$("#ratings-tab").append(`<div class="row m-1">
														<div class="col-12 col-sm-6 col-md-8 pretext-color"> ${x.Source} :</div>
														<div class="col-12 col-sm-6 col-md-4 "> ${x.Value} </div>
														</div>`)
		}
		$("#ratings-tab").show();
	}
}

//to generate GET url based on inputs provided
let generate_url = () => {
	let search_url = "https://www.omdbapi.com/";
	if ( $("#movie-title").val().length != 0)
		{
			if ( $("#movie-id").val().length != 0)
			{
				search_url += "?t=" + $("#movie-title").val() + "+&i=" + $("#movie-id").val() + "+&"
			}
			else
			{
				search_url += "?t=" + $("#movie-title").val() + "+&";
			}
		}
	else if ( $("#movie-id").val().length != 0) 
		{
			search_url += "?i=" + $("#movie-id").val() + "&";
		}
	if ( $("#yearpicker").val() != "none")
		{
			search_url += "y=" + $("#yearpicker").val() + "+&";
		}	
	return search_url + "apikey=466b6eb3"	
}

//input validation to check if madatory inputs are provided are not
let validate_input = () => {
		
		if ( $("#movie-title").val().length == 0  && $("#movie-id").val().length == 0)
		{
			$("#movie-title").addClass("red-shadow");
			$("#movie-id").addClass("red-shadow");
			$("#warning-message").show();
		}
		else 
		{
			return true;
		}
	}
//to handle fields which are undefined in the GET response
let get_display_value = ( stored_value ) => {
	if (stored_value == undefined)
	{
		return "N/A"
	}
	else
	{
		return stored_value
	}
}
