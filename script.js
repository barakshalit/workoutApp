// Call this when the page loads
function loadExerciseOptions() {
  fetch("https://script.google.com/macros/s/AKfycbzBGrOFEtiHHR9crJfLacpMuHiA0v6twNAqOWLO_a6Z/exec")
    .then(res => res.json())
    .then(exercises => {
      const select = document.getElementById("exercise");
      select.innerHTML = ""; // Clear any existing options

      exercises.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Failed to load exercises:", err));
}

// Call it after auth login succeeds:
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('workoutSection').style.display = 'block';
    loadExerciseOptions(); // ✅ Load dropdown options
  } else {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('workoutSection').style.display = 'none';
  }
});