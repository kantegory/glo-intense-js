let searchForm = document.querySelector("#search-form"),
movies = document.querySelector('#movies');


function apiSearch(event) {
	event.preventDefault();
	let searchText = document.querySelector('.form-control').value.length > 0 ? document.querySelector('.form-control').value : alert("Empty request... :c");
	let token = 'api-token',
	language = 'ru',
	url = 'https://api.themoviedb.org/3/search/multi?api_key=' + token + '&language=' + language +'&query=' + searchText;
	requestApi('GET', url);
}

searchForm.addEventListener('submit', apiSearch);
searchForm.addEventListener('change', apiSearch);


function requestApi(method, url) {
	
	let request = new XMLHttpRequest();
	
	request.open(method, url);
	request.send();

	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) { 
			return;
		}

		if (request.status !== 200) {
			console.log('error: ' + request.status);
			return;
		}
		let output;
		try {
			output = JSON.parse(request.responseText);
		} catch (error) {
			alert('Broken JSON... :c');
			return;
		}

		let output_inner = '';

		if (output.results.length == 0) {
			output_inner = '404... :c';
		} else { 
		output.results.forEach( (film) => {
			let filmName = film.name || film.title,
			filmDate = film.first_air_date || film.release_date || 'No data... :c',
			filmPic = film.poster_path ? `https://image.tmdb.org/t/p/w200/${film.poster_path}` : 'https://placekitten.com/200/300';
			output_inner += `<a href="https://www.themoviedb.org/${film.media_type}/${film.id}" class="item col-12 col-sm-6 col-md-4 col-lg-3 text-center" title="${film.overview}" target="_blank">
                    <img src="${filmPic}"> <br/>
                    <b> ${filmName} </b> <span class="badge badge-primary"> ${film.vote_average} </span> <br/>
                    Релиз: ${filmName}
                </a>`;

		});
		}
		movies.innerHTML = output_inner;
	});

}

