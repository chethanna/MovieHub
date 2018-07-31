$(document).ready ( () => {
	//to hide certain tabs during page load
	$("#movie-details-tab").removeClass("display-hidden");
	$("#movie-details-tab").hide();
	$("#search-fail").removeClass("display-hidden");
	$("#search-fail").hide();
	
	//to create dropdown for Years
	for (i = new Date().getFullYear(); i > 1900; i--)
	{
	    $('#yearpicker').append($('<option />').val(i).html(i));
	}
		
	//to handle click function of Search button
	$("#search-btn").click( () => {
		$("#warning-message").hide();
		$("#movie-title").removeClass("red-shadow");
		$("#movie-id").removeClass("red-shadow");
		$("#ratings-tab").empty();
		$("#ratings-tab").hide();
		if (validate_input())
		{
			getMovieDetails( $("#movie-title").val() );
		}
	});
});

//function to serach for a movie in OMDB api using ajax GET
let getMovieDetails = (name) => {
	$.ajax({
		type: 'GET',
		dataType: 'json',
		async: true,
		url: generate_url(),
		success: (response) => {
					if ( response.Response == "True" )
					{ 
						dataBinding(response);
						$("#search-fail").hide();
						$("#movie-details-tab").show();
						$("#search-form").trigger("reset");
					}
					else 
					{
						$("#movie-details-tab").hide();
						$("#search-fail").show();
					}
		},
		error: (err) => {
			console.log(err.responseJSON.error.message)
		}
	});
}

