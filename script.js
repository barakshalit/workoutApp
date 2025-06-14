const app_id = "AKfycbxd27-5OnsUgfxDC1xJURvJ3uyilFffeSQfIQjvbs-lYcawx_HvoJ-thdU-UOlbM8ddTA"
function loadExerciseOptions() {
  fetch("https://script.google.com/macros/s/" + app_id + "/exec")
    .then(res => res.json())
    .then(exercises => {
      const select = document.getElementById("exercise");
      select.innerHTML = ""; // Clear default option

      exercises.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      });
    })
    .catch(err => {
      console.error("Failed to load exercises:", err);
    });
}

    // 🔧 Replace with your Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyAHQL4_sn018jO8nq4FBmLV9yotT_DcFHg",
      authDomain: "workoutapp-30f73.firebaseapp.com",
      projectId: "workoutapp-30f73",
      storageBucket: "workoutapp-30f73.firebasestorage.app",
      messagingSenderId: "528956485565",
      appId: "1:528956485565:web:13ab08c4dcd2d15d906cd4"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    const workoutEntries = [];

    function loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider)
        .catch(err => alert("Login error: " + err.message));
    }

    function logout() {
      auth.signOut();
    }

    auth.onAuthStateChanged(user => {
      if (user) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('workoutSection').style.display = 'block';
        loadExerciseOptions();
      } else {
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('workoutSection').style.display = 'none';
      }
});

    function addEntry() {
      const exercise = document.getElementById('exercise').value;
      const weight = document.getElementById('weight').value;
      const reps = document.getElementById('reps').value;

      if (!exercise || !weight || !reps) {
        alert("Please fill in all fields");
        return;
      }

      // Add entry to the array
      const entry = { exercise, weight, reps };
      workoutEntries.push(entry);
      const index = workoutEntries.length - 1;

      // Add row to table with a delete button
      const table = document.getElementById('workoutTable');
      const row = document.createElement('tr');
      row.setAttribute('data-index', index);

      row.innerHTML = `
        <td>${exercise}</td>
        <td>${weight}</td>
        <td>${reps}</td>
        <td><button onclick="deleteEntry(this)">🗑️</button></td>
      `;

      table.appendChild(row);
    }

    function deleteEntry(button) {
      const row = button.closest('tr');
      const index = parseInt(row.getAttribute('data-index'));

      // Remove from the array
      workoutEntries.splice(index, 1);

      // Remove the row from the table
      row.remove();

      // Re-index all remaining rows
      const table = document.getElementById('workoutTable');
      const rows = table.querySelectorAll('tr[data-index]');
      rows.forEach((row, newIndex) => {
        row.setAttribute('data-index', newIndex);
      });
    }

    function finishWorkout() {
      const payload = JSON.stringify({ entries: workoutEntries });

      fetch("https://script.google.com/macros/s/" + app_id + "/exec", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"  // ✅ No preflight
        },
        body: payload  // Still sending JSON but labeled as plain text
      })
      .then(response => response.text())
      .then(() => {
        alert("Workout saved!");
        location.reload();
      })
      .catch(err => alert("Failed to save: " + err.message));
    }