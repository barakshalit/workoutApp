// Simple password check
const password = prompt("Enter password:");
if (password !== "mySecret123") {
  alert("Access denied");
  document.body.innerHTML = "";
}

const workoutEntries = [];

function addEntry() {
  const exercise = document.getElementById('exercise').value;
  const weight = document.getElementById('weight').value;
  const reps = document.getElementById('reps').value;

  if (!exercise || !weight || !reps) return alert("Fill all fields");

  workoutEntries.push({ exercise, weight, reps });

  const row = document.createElement('tr');
  row.innerHTML = `<td>${exercise}</td><td>${weight}</td><td>${reps}</td>`;
  document.getElementById('workoutTable').appendChild(row);
}

function finishWorkout() {
  fetch("https://script.google.com/macros/s/AKfycbywPpf-nU9sRE6ls6P1CZlCeDQ_1XpjEVAIfOQCNIsWavPuI_4AAvLf2bbiOtrLCqxL/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entries: workoutEntries })
  })
  .then(response => response.text())
  .then(() => {
    alert("Workout saved!");
    location.reload();
  })
  .catch(err => alert("Error saving workout: " + err));
}