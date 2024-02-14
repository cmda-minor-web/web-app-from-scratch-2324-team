const increaseButton = document.querySelector('.map-controls :first-of-type');
const decreaseButton = document.querySelector('.map-controls :last-of-type');
const mapContainer = document.querySelector('.map-container');
let zoomLevel = 1;

const zoomMap = (amount) => {
	console.log();
	zoomLevel += amount;
	mapContainer.children[0].style.scale = zoomLevel;
}

increaseButton.onclick = () => zoomMap(.1);
decreaseButton.onclick = () => zoomMap(-.1);