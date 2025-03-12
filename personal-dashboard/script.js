document.addEventListener("DOMContentLoaded", () => {
  updateGreeting();
  loadTasks();
  loadNotes();
});

function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = "Good Day!";
  if (hour < 12) greeting = "Good Morning!";
  else if (hour < 18) greeting = "Good Afternoon!";
  else greeting = "Good Evening!";
  document.getElementById("greeting").textContent = greeting;
}

function showSection(sectionId) {
  document
    .querySelectorAll(".section")
    .forEach((section) => section.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

async function getWeather() {
  const city = document.getElementById("city").value;
  try {
    const response = await fetch(`https://wttr.in/${city}?format=%C+%t`);
    const data = await response.text();
    document.getElementById("weather-info").innerHTML = `<p>${data}</p>`;
  } catch (error) {
    alert("City not found!");
  }
}

function addTask() {
  const taskInput = document.getElementById("task");
  if (!taskInput.value) return;

  const taskList = document.getElementById("task-list");
  const li = document.createElement("li");
  li.innerHTML = `${taskInput.value} <button onclick="removeTask(this)">❌</button>`;
  taskList.appendChild(li);

  saveTasks();
  taskInput.value = "";
}

function removeTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll("#task-list li")).map(
    (li) => li.textContent.replace("❌", "").trim()
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="removeTask(this)">❌</button>`;
    document.getElementById("task-list").appendChild(li);
  });
}

function saveNotes() {
  localStorage.setItem("notes", document.getElementById("notes-input").value);
}

function loadNotes() {
  document.getElementById("notes-input").value =
    localStorage.getItem("notes") || "";
}
