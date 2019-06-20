let searchForm = document.querySelector("#search-form"),
movies = document.querySelector('#movies'),
token = '1de482be56bea1ce47ba2ba388600fe7';

document.addEventListener('DOMContentLoaded', function() {
	
	url = `https://api.themoviedb.org/3/trending/all/day?api_key=` + token;
	
	fetch(url)

		.then(function(value) {
			return value.status !== 200 ? Promise.reject(new Error(value.status)) : value.json();
		})	
	
		.then(function(output) {
		
			let output_inner = '<h4 class = "col-12 text-center">Популярные за неделю!</h4>';

			if (output.results.length == 0) {
			
				output_inner = '<h4 class = "col-12 text-center">404... :c</h4>';
			
			} else { 

				output.results.forEach( (film) => {
				
				let filmName = film.name || film.title,
				filmDate = film.first_air_date || film.release_date || 'No data... :c',
				filmPic = film.poster_path ? `https://image.tmdb.org/t/p/w200/${film.poster_path}` : 'http://atlantaplanningguys.com/wp-content/uploads/2009/10/question-mark-image-200x300.jpg';
				
				let filmInfo = `data-id="${film.id}" data-type="${film.media_type}"`;

				output_inner += `<a href="https://www.themoviedb.org/${film.media_type}/${film.id}" class="item col-12 col-sm-6 col-md-4 col-lg-3 text-center" title="${film.overview}" target="_blank">
				                <img src="${filmPic}" alt = "${filmName}" ${filmInfo}> <br/>
				                <strong> ${filmName} </strong> <span class="badge badge-primary"> ${film.vote_average} </span> <br/>
				                Release date: ${filmDate}
				                </a>`;	

			});
		};	
			movies.innerHTML = output_inner;

			addEventMedia();
		
		})

		.catch(function(error) {
			movies.innerHTML = '<h4 class = "col-12 text-center">Something wrong... :c</h4>';
			console.log('error:' + error);
		});
});


function apiSearch(event) {

	event.preventDefault();
	
	let searchText = document.querySelector('.form-control').value;
	
	if (searchText.trim().length === 0) {
		movies.innerHTML = '<h4 class = "col-12 text-center text-danger">Empty search... :c</h4>';
		return;
	}
	
	let language = 'ru',
	url = 'https://api.themoviedb.org/3/search/multi?api_key=' + token + '&language=' + language +'&query=' + searchText;
	movies.innerHTML = `<div class="text-center">
  						<div class="spinner-border" role="status">
    					<span class="sr-only">Loading...</span>
  						</div>
						</div>`;
	
	fetch(url)

		.then(function(value) {
			return value.status !== 200 ? Promise.reject(new Error(value.status)) : value.json();
		})	
	
		.then(function(output) {
		
			let output_inner = '';

			if (output.results.length == 0) {
			
				output_inner = '<h4 class = "col-12 text-center">404... :c</h4>';
			
			} else { 

				output.results.forEach( (film) => {
				let filmName = film.name || film.title,
				filmDate = film.first_air_date || film.release_date || 'No data... :c',
				filmPic = film.poster_path ? `https://image.tmdb.org/t/p/w200/${film.poster_path}` : 'http://atlantaplanningguys.com/wp-content/uploads/2009/10/question-mark-image-200x300.jpg';
				let filmInfo = ``;
				if (film.media_type !== `person`) {
						filmInfo = `data-id="${film.id}" data-type="${film.media_type}"`;
				};

				output_inner += `<a href="https://www.themoviedb.org/${film.media_type}/${film.id}" class="item col-12 col-sm-6 col-md-4 col-lg-3 text-center" title="${film.overview}" target="_blank">
				                <img src="${filmPic}" alt = "${filmName}" ${filmInfo}> <br/>
				                <strong> ${filmName} </strong> <span class="badge badge-primary"> ${film.vote_average} </span> <br/>
				                Release date: ${filmDate}
				                </a>`;	

			});
		};	
			movies.innerHTML = output_inner;

			addEventMedia();
		
		})

		.catch(function(error) {
			movies.innerHTML = '<h4 class = "col-12 text-center">Something wrong... :c</h4>';
			console.log('error:' + error);
		});
}

searchForm.addEventListener('submit', apiSearch);

function addEventMedia() {
	let media = movies.querySelectorAll('img[data-id]');
	media.forEach(function(elem) {
		elem.style.cursor = 'pointer';
		elem.addEventListener('click', showFullInfo);
	})
}

function showFullInfo() {
	filmType = this.dataset.type;

}
