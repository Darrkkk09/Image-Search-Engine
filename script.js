const form = document.getElementById("search-Form");
const photos = document.getElementById("photos");
const showMore = document.getElementById("showMore");
const Box = document.getElementById("Box");

const key = "BMVsZuwvBPENqP4EUtDbKUm2QHMydMQTkSjFqBj8OENHGYVZ0SdtWmwW";
let keyword = "";
let page = 1;

async function searchimg() {
    keyword = Box.value.trim(); 
    if (!keyword) {
        alert("Please enter something!");
        return;
    }

    let url = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9&page=${page}`;

    photos.innerHTML += `<p id="loading">Loading images...</p>`;

    try {
        const response = await fetch(url, {
            headers: { Authorization: key }
        });
        const data = await response.json();

        document.getElementById("loading").remove();

        if (page === 1) {
            photos.innerHTML = ""; 
        }
        if (data.photos.length > 0) {
            data.photos.forEach(photo => {
                const imgElement = document.createElement("img");
                imgElement.src = photo.src.medium;
                imgElement.alt = "Image";
                imgElement.classList.add("image");

                photos.appendChild(imgElement);
            });

            showMore.style.display = "block";
        } else {
            alert("No images found! Try a different search.");
        }
    } catch (error) {
        alert("Failed to load images. Please try again.");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchimg();
});

showMore.addEventListener("click", () => {
    page++;
    searchimg();
});
