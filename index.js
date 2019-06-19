let searchForm = document.querySelector("#search-form"),
movies = document.querySelector('#movies');


function apiSearch(event) {

	event.preventDefault();
	let searchText = document.querySelector('.form-control').value;
	let token = '1de482be56bea1ce47ba2ba388600fe7',
	language = 'ru',
	url = 'https://api.themoviedb.org/3/search/multi?api_key=' + token + '&language=' + language +'&query=' + searchText;
	movies.innerHTML = 'Please, be patient! Downloading... :c';
	
	fetch(url)
	
		.then(function(value) {
			return value.status !== 200 ? Promise.reject(new Error(value.status)) : value.json();
		})	
	
		.then(function(output) {
		
			let output_inner = '';

			if (output.results.length == 0) {
			
				output_inner = '404... :c';
			
			} else { 

				output.results.forEach( (film) => {
				let filmName = film.name || film.title,
				filmDate = film.first_air_date || film.release_date || 'No data... :c',
				filmPic = film.poster_path ? `https://image.tmdb.org/t/p/w200/${film.poster_path}` : 'http://atlantaplanningguys.com/wp-content/uploads/2009/10/question-mark-image-200x300.jpg';
				output_inner += `<a href="https://www.themoviedb.org/${film.media_type}/${film.id}" class="item col-12 col-sm-6 col-md-4 col-lg-3 text-center" title="${film.overview}" target="_blank">
	                    	<img src="${filmPic}"> <br/>
	                    	<b> ${filmName} </b> <span class="badge badge-primary"> ${film.vote_average} </span> <br/>
	                    	Release date: ${filmDate}
	                	</a>`;

			});
		};	
			movies.innerHTML = output_inner;
		})

		.catch(function(error) {
			movies.innerHTML = 'Something wrong... :c';
			console.log('error:' + error.status);
		});
}

searchForm.addEventListener('submit', apiSearch);
searchForm.addEventListener('change', apiSearch);
