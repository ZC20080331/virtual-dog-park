// Round 2: adoption, Feed and Play.
// state holds the current dog; null means no dog has been adopted yet.
let state = null;

// Update the page so it always shows the current dog's data.
function renderDog() {
  if (!state) return;
  document.getElementById("dog-name").textContent = state.name;
  document.getElementById("dog-breed").textContent = state.breed;
  document.getElementById("dog-day").textContent = state.day;
  document.getElementById("dog-stage").textContent = stageFor(state.day);
  document.getElementById("dog-happiness").textContent = state.happiness;
  const image = document.getElementById("dog-image");
  image.src = "assets/" + imageFor(state.breed);
  image.alt = "Illustration of my " + state.breed;
}

// A shared rule: Day 1 is Puppy, Days 2-3 are Young Dog, Day 4+ is Adult Dog.
function stageFor(day) {
  if (day === 1) return "Puppy";
  if (day <= 3) return "Young Dog";
  return "Adult Dog";
}

// Map each breed to its local illustration file.
function imageFor(breed) {
  if (breed === "Beagle") return "beagle.svg";
  if (breed === "Golden Retriever") return "golden-retriever.svg";
  return "poodle.svg";
}

// Read the form, validate the name, and create the dog.
function adoptDog(event) {
  event.preventDefault(); // stop the browser from reloading the page
  const nameInput = document.getElementById("dog-name-input");
  const message = document.getElementById("form-message");
  const name = nameInput.value.trim(); // remove leading/trailing spaces

  if (name === "") {
    message.textContent = "Please enter a dog name (it cannot be empty).";
    return;
  }
  if (name.length > 20) {
    message.textContent = "The name must be at most 20 characters.";
    return;
  }

  state = {
    name: name,
    breed: document.getElementById("breed-select").value,
    day: 1,
    stage: "Puppy",
    happiness: 50
  };

  message.textContent = "";
  document.getElementById("adopt-form").classList.add("hidden");
  document.getElementById("dog-status").classList.remove("hidden");
  renderDog();
}

// Feed and Play share one rule: +10 happiness, never above 100.
function addHappiness(amount) {
  if (!state) return;
  state.happiness = Math.min(100, state.happiness + amount);
  renderDog();
}

document.getElementById("adopt-form").addEventListener("submit", adoptDog);
document.getElementById("feed-btn").addEventListener("click", function () {
  addHappiness(10);
});
document.getElementById("play-btn").addEventListener("click", function () {
  addHappiness(10);
});
