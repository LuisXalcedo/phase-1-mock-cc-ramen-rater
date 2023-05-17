document.addEventListener("DOMContentLoaded", () => {
  getAllRAmen();
  addSummit();
});

function getAllRAmen() {
  fetch("http://localhost:3000/ramens")
    .then((res) => res.json())
    .then((ramenData) => ramenData.forEach((ramen) => renderOneRamen(ramen)));
}

function addSummit() {
  const ramenForm = document.getElementById("new-ramen");

  ramenForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addRamen();
    ramenForm.reset();
  });
}

function renderOneRamen(ramen) {
  let img = document.createElement("img");
  img.src = ramen.image;

  img.addEventListener("click", () => showRamenDetails(ramen));

  document.querySelector("#ramen-menu").appendChild(img);
}

function showRamenDetails(ramen) {
  document.querySelector(".detail-image").src = ramen.image;
  document.querySelector(".name").textContent = ramen.name;
  document.querySelector(".restaurant").textContent = ramen.restaurant;
  document.getElementById("rating-display").textContent = ramen.rating;
  document.getElementById("comment-display").textContent = ramen.comment;
}

function addRamen() {
  const newImage = document.getElementById("new-image").value;
  const newName = document.getElementById("new-name").value;
  const newRestaurant = document.getElementById("new-restaurant").value;
  const newRating = document.getElementById("new-rating").value;
  const newComment = document.getElementById("new-comment").value;

  const newRamen = {
    image: newImage,
    name: newName,
    restaurant: newRestaurant,
    rating: newRating,
    comment: newComment,
  };

  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRamen),
  });

  renderOneRamen(newRamen);

  showRamenDetails(newRamen);
}
