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

window.onload = function(){
	// getting locations from api
	$.ajax({
		url: 'https://rickandmortyapi.com/api/location',
		dataType: 'json',
		beforreSend: function () {
			console.log('Loading locations data...');
		},
		success: function (data, textStatus){
			console.log(textStatus);
			console.log(data);
			locationData = data;
		}
	});

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