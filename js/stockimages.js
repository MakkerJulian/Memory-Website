function getImageBgUrl(cardId) {
	return "url(https://picsum.photos/id/" + cardId + "/200)";
}

function generateRandomImages() {
	var images = [];
	return fetch('https://picsum.photos/v2/list?limit=' + globalSize)
		.then(response => response.json())
		.then(jsonImages => {
			jsonImages.forEach(image => {
				images.push(image.id);
				images.push(image.id);
			});
			images.sort(() => Math.random() - 0.5);
			return images;
		});
}