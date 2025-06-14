function loadExerciseOptions() {
  fetch("https://script.google.com/macros/s/AKfycbz5RmdL3PBY32_XqRun2RBAZUEp6dbGy0v-2OlQyao9uNE6ZdAlQLgdoCX7XKt-7sbwNw/exec")
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

      workoutEntries.push({ exercise, weight, reps });

      const row = document.createElement('tr');
      row.innerHTML = `<td>${exercise}</td><td>${weight}</td><td>${reps}</td>`;
      document.getElementById('workoutTable').appendChild(row);
    }

    function finishWorkout() {
      fetch("https://script.google.com/macros/s/AKfycbz5RmdL3PBY32_XqRun2RBAZUEp6dbGy0v-2OlQyao9uNE6ZdAlQLgdoCX7XKt-7sbwNw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: workoutEntries })
      })
      .then(response => response.text())
      .then(() => {
        alert("Workout saved!");
        location.reload();
      })
      .catch(err => alert("Failed to save: " + err.message));
    }