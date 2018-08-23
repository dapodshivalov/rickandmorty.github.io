// TODO
// JQuery Ajax change XMLHttpRequst
// exlude JQuery apart ajax 


// height of window
var window_h;
// width of window
var window_w;
// json data about location
var locationData;
// count of characters
var countCharacter;
// locations array
var locations;

window.onload = function(){
	// getting locations from api


	// getting number of characters from api
	$.ajax({
		url: 'https://rickandmortyapi.com/api/character',
		dataType: 'json',
		beforreSend: function () {
			console.log('Loading characters data...');
		},
		success: function (data, textStatus){
			console.log(textStatus);
			console.log(data);
			if (textStatus != 'success'){
				return;
			}
			countCharacter = data.info.count;
		}
	});

	// setting SVG viewBox height and width
	window_w = document.documentElement.clientWidth;
	window_h = document.documentElement.clientHeight;
	console.log(window_w);
	console.log(window_h);
	document.getElementsByTagName('svg')[0].setAttribute("viewBox", "0 0 " + window_w + " " + window_h);
	document.getElementsByTagName('rect')[0].setAttribute("width", window_w);
	document.getElementsByTagName('rect')[0].setAttribute("height", window_h);
};


/*-------async recursion way to get all location from api-------*/	

// get JSON location from url using JQuery Ajax
function getLocation(url){
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: url,
			dataType: 'json',
			beforreSend: function () {
				console.log('Loading locations data...(' + url + ')');
			},
			error: reject,
			success: resolve
		});
	});
}

// check if there is next page and call the next page
function onGetLocationSuccess(data){
	console.log('next:' + data.info.next);
	setTimeout(addLocations, 0, data.results);
	if (data.info.next === ""){
		return;
	}
	getLocation(data.info.next).then(onGetLocationSuccess);
}

// TODO...
function addLocations(data){
	console.log(data);
}

// call recursion
getLocation('https://rickandmortyapi.com/api/location?page=1').then(onGetLocationSuccess, console.log);

/*-------*/


// class Location
function Location(id, name, type, dimension, residents, url, created){
	this.id = id;
	this.name = name;
	this.dimension = dimension;
	this.residents = residents;
	this.url = url;
	this.created = created;
	this.toString = function(){
		return this.name.toString() + "\n"
			+ "Has " + this.residents.toString() 
			+ " residents";
	};
	this.getInfo = function(){
		return this.toString();
	};
}