function loadExerciseOptions() {
  alert("before fetch");
  fetch("https://script.google.com/macros/s/AKfycbyToRzGrh-PhFltrVW45GOjmVO3MBgeks4dlMFLZ7kwgG3ImqkAxGapaoxPBA1EF89FeA/exec")
    .then(res => res.json())
    .then(exercises => {
      alert("after fetch");
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