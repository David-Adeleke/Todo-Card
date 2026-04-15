const DUE = new Date("2026-04-16T18:00:00Z");

function updateTime() {
  const el = document.getElementById("time-remaining");
  const diff = DUE - Date.now();
  const abs = Math.abs(diff);
  const mins = Math.floor(abs / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  let text, overdue;

  if (diff < 0) {
    overdue = true;
    if (mins < 60) text = `Overdue by ${mins} min${mins !== 1 ? "s" : ""}`;
    else if (hrs < 24) text = `Overdue by ${hrs} hour${hrs !== 1 ? "s" : ""}`;
    else text = `Overdue by ${days} day${days !== 1 ? "s" : ""}`;
  } else {
    overdue = false;
    if (mins < 1) text = "Due now!";
    else if (hrs < 1) text = `Due in ${mins} min${mins !== 1 ? "s" : ""}`;
    else if (hrs < 24) text = `Due in ${hrs} hour${hrs !== 1 ? "s" : ""}`;
    else if (days === 1) text = "Due tomorrow";
    else text = `Due in ${days} days`;
  }

  el.textContent = text;
  el.className = overdue ? "overdue" : "";
}

updateTime();
setInterval(updateTime, 60000);

const toggle = document.getElementById("complete-toggle");
const card = document.getElementById("todo-card");
const statusBadge = document.getElementById("status-badge");

if (toggle instanceof HTMLInputElement && card && statusBadge) {
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      card.classList.add("completed");
      statusBadge.textContent = "Done";
      statusBadge.setAttribute("aria-label", "Status: Done");
    } else {
      card.classList.remove("completed");
      statusBadge.textContent = "In Progress";
      statusBadge.setAttribute("aria-label", "Status: In Progress");
    }
  });
}

const editButton = document.querySelector(
  "[data-testid='test-todo-edit-button']",
);
if (editButton) {
  editButton.addEventListener("click", () => {
    console.log("edit clicked");
  });
}

const deleteButton = document.querySelector(
  "[data-testid='test-todo-delete-button']",
);
if (deleteButton) {
  deleteButton.addEventListener("click", () => {
    alert("Delete clicked");
  });
}

const DUE = new Date("2026-04-16T18:00:00Z");

function updateTime() {
  const el = document.getElementById("time-remaining");
  const diff = DUE - Date.now();
  const abs = Math.abs(diff);
  const mins = Math.floor(abs / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  let text, overdue;

  if (diff < 0) {
    overdue = true;
    if (mins < 60) text = `Overdue by ${mins} min${mins !== 1 ? "s" : ""}`;
    else if (hrs < 24) text = `Overdue by ${hrs} hour${hrs !== 1 ? "s" : ""}`;
    else text = `Overdue by ${days} day${days !== 1 ? "s" : ""}`;
  } else {
    overdue = false;
    if (mins < 1) text = "Due now!";
    else if (hrs < 1) text = `Due in ${mins} min${mins !== 1 ? "s" : ""}`;
    else if (hrs < 24) text = `Due in ${hrs} hour${hrs !== 1 ? "s" : ""}`;
    else if (days === 1) text = "Due tomorrow";
    else text = `Due in ${days} days`;
  }

  el.textContent = text;
  el.className = overdue ? "overdue" : "";
}

updateTime();
setInterval(updateTime, 60000);

const toggle = document.getElementById("complete-toggle");
const card = document.getElementById("todo-card");
const statusBadge = document.getElementById("status-badge");

if (toggle instanceof HTMLInputElement && card && statusBadge) {
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      card.classList.add("completed");
      statusBadge.textContent = "Done";
      statusBadge.setAttribute("aria-label", "Status: Done");
    } else {
      card.classList.remove("completed");
      statusBadge.textContent = "In Progress";
      statusBadge.setAttribute("aria-label", "Status: In Progress");
    }
  });
}

const editButton = document.querySelector(
  "[data-testid='test-todo-edit-button']",
);
if (editButton) {
  editButton.addEventListener("click", () => {
    console.log("edit clicked");
  });
}

const deleteButton = document.querySelector(
  "[data-testid='test-todo-delete-button']",
);
if (deleteButton) {
  deleteButton.addEventListener("click", () => {
    alert("Delete clicked");
  });
}
