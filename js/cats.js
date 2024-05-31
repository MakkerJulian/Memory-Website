async function generateCats() {
	var cats = [];
	return fetch('https://cataas.com/api/cats?limit=' + globalSize)
		.then(response => response.json())
		.then(jsonCats => {
			jsonCats.forEach(cat => {
				cats.push(cat._id);
				cats.push(cat._id);
			});
			cats.sort(() => Math.random() - 0.5);
			return cats;
		}
		);
}

function getCatBgUrl(cardId) {
	return "url(https://cataas.com/cat/" + cardId + ")";
}