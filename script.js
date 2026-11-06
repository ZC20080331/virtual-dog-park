// Final version: adoption, Feed/Play, Next Day growth, saved progress and Start Over.
// state holds the current dog; null means no dog has been adopted yet.
let state = null;

// The single storage key used for both saving and loading.
const STORAGE_KEY = "virtualDogParkPetV1";

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
  image.alt = "Illustration of my " + state.breed + " (" + stageFor(state.day) + ")";

  // Visible growth: the illustration and the bar both change with the stage.
  const imageWidth = { Puppy: "110px", "Young Dog": "150px", "Adult Dog": "200px" };
  image.style.width = imageWidth[stageFor(state.day)];

  const barPercent = { Puppy: "25%", "Young Dog": "55%", "Adult Dog": "90%" };
  document.getElementById("growth-bar").style.width = barPercent[stageFor(state.day)];

  // Happiness bar mirrors the 0-100 score.
  document.getElementById("happiness-bar").style.width = state.happiness + "%";
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

// Save the current dog immediately to localStorage.
function saveDog() {
  if (state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// On page load, restore one saved dog from localStorage (if any).
function loadDog() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return false;
  try {
    const data = JSON.parse(saved);
    if (data && data.name && data.breed) {
      state = data;
      return true;
    }
  } catch (error) {
    // Corrupted data is treated as "no dog".
  }
  return false;
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
  saveDog(); // save right after adoption
  showDogView();
  renderDog();
}

// Show the dog card and hide the adoption form.
function showDogView() {
  document.getElementById("adopt-form").classList.add("hidden");
  document.getElementById("dog-status").classList.remove("hidden");
}

// Show the adoption form and hide the dog card.
function showAdoptView() {
  document.getElementById("adopt-form").classList.remove("hidden");
  document.getElementById("dog-status").classList.add("hidden");
}

// Feed and Play share one rule: +10 happiness, never above 100.
function addHappiness(amount) {
  if (!state) return;
  state.happiness = Math.min(100, state.happiness + amount);
  saveDog();
  renderDog();
}

// Next Day simulates time: +1 day, -5 happiness, never below 0.
function nextDay() {
  if (!state) return;
  state.day = state.day + 1;
  state.stage = stageFor(state.day);
  state.happiness = Math.max(0, state.happiness - 5);
  saveDog();
  renderDog();
}

// Start Over: confirm first. Cancel keeps the dog; Confirm deletes progress.
function startOver() {
  if (!state) return;
  const confirmed = window.confirm(
    "Delete " + state.name + "'s saved progress and adopt a new dog?"
  );
  if (!confirmed) return; // Cancel: keep the dog

  state = null;
  saveDog();
  showAdoptView();
  document.getElementById("dog-name-input").value = "";
}

document.getElementById("adopt-form").addEventListener("submit", adoptDog);
document.getElementById("feed-btn").addEventListener("click", function () {
  addHappiness(10);
});
document.getElementById("play-btn").addEventListener("click", function () {
  addHappiness(10);
});
document.getElementById("next-day-btn").addEventListener("click", nextDay);
document.getElementById("start-over-btn").addEventListener("click", startOver);

// When the page is refreshed, restore the saved dog.
if (loadDog()) {
  showDogView();
  renderDog();
}
