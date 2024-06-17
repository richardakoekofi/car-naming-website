const accessKey = 'API_ACCESS_KEY';

async function fetchCarImages() {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=car&count=10&client_id=${accessKey}`);
    const images = await response.json();
    return images;
}

function displayCarImages(images) {
    const carContainer = document.getElementById('car-container');
    images.forEach((image, index) => {
        const carDiv = document.createElement('div');
        carDiv.classList.add('car');
        carDiv.innerHTML = `
            <img src="${image.urls.small}" alt="Car ${index + 1}">
            <input type="text" id="car${index + 1}-name" placeholder="Name this car">
            <button onclick="submitName('car${index + 1}', '${image.id}')">Submit</button>
        `;
        carContainer.appendChild(carDiv);
    });
}

async function initializeGallery() {
    const images = await fetchCarImages();
    displayCarImages(images);
}

async function submitName(carId, imageId) {
    const nameInput = document.getElementById(`${carId}-name`);
    const carName = nameInput.value;
    if (carName) {
        alert(`You have named the car: ${carName}`);
        // Here you can add code to save the car name with imageId, e.g., sending it to a server
        nameInput.value = '';
    } else {
        alert('Please enter a name for the car.');
    }
}

initializeGallery();
