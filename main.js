  let DUE = new Date("2026-05-01T18:00:00Z");
  let isDone = false;
  let timerInterval = null;
  let currentPriority = "med";

  const card = document.getElementById("todo-card");
  const toggle = document.getElementById("complete-toggle");
  const titleEl = document.getElementById("todo-title");
  const descEl = document.getElementById("todo-description");
  const priorityBadge = document.getElementById("priority-badge");
  const priorityIndicator = document.getElementById("priority-indicator");
  const priorityBar = document.getElementById("priority-bar");
  const statusBadge = document.getElementById("status-badge");
  const statusControl = document.getElementById("status-control");
  const dueDateDisplay = document.getElementById("due-date-display");
  const timeRemaining = document.getElementById("time-remaining");
  const overdueIndicator = document.getElementById("overdue-indicator");
  const collapsible = document.getElementById("collapsible-section");
  const expandToggle = document.getElementById("expand-toggle");
  const editBtn = document.getElementById("edit-btn");
  const editFormWrap = document.getElementById("edit-form-wrap");
  const editTitleInput = document.getElementById("edit-title-input");
  const editDescInput = document.getElementById("edit-description-input");
  const editPrioritySelect = document.getElementById("edit-priority-select");
  const editDueDateInput = document.getElementById("edit-due-date-input");
  const saveBtn = document.getElementById("save-btn");
  const cancelBtn = document.getElementById("cancel-btn");

  const PRIORITY_LABELS = { low: "Low", med: "Medium", high: "High" };
  const STATUS_LABELS = { pending: "Pending", inprogress: "In Progress", done: "Done" };
  const COLLAPSE_THRESHOLD = 120;

  function applyPriority(p) {
    currentPriority = p;
    ["low", "med", "high"].forEach(c => {
      priorityBadge.classList.remove(c);
      priorityIndicator.classList.remove(c);
      priorityBar.classList.remove(c);
    });
    priorityBadge.classList.add(p);
    priorityIndicator.classList.add(p);
    priorityBar.classList.add(p);
    priorityBadge.textContent = PRIORITY_LABELS[p];
    priorityBadge.setAttribute("aria-label", "Priority: " + PRIORITY_LABELS[p]);
  }

  function applyStatus(s) {
    ["pending", "inprogress", "done"].forEach(c => statusBadge.classList.remove(c));
    statusBadge.classList.add(s);
    statusBadge.textContent = STATUS_LABELS[s];
    statusBadge.setAttribute("aria-label", "Status: " + STATUS_LABELS[s]);
    statusControl.value = s;
    isDone = s === "done";
    toggle.checked = isDone;
    if (isDone) {
      card.classList.add("completed");
      timeRemaining.textContent = "Completed";
      timeRemaining.className = "";
      overdueIndicator.classList.remove("visible");
      clearInterval(timerInterval);
    } else {
      card.classList.remove("completed");
      startTimer();
    }
  }

  function updateTime() {
    if (isDone) return;
    const diff = DUE - Date.now();
    const abs = Math.abs(diff);
    const mins = Math.floor(abs / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    let text, overdue;

    if (diff < 0) {
      overdue = true;
      if (mins < 60) text = "Overdue by " + mins + " minute" + (mins !== 1 ? "s" : "");
      else if (hrs < 24) text = "Overdue by " + hrs + " hour" + (hrs !== 1 ? "s" : "");
      else text = "Overdue by " + days + " day" + (days !== 1 ? "s" : "");
    } else {
      overdue = false;
      if (mins < 1) text = "Due now!";
      else if (hrs < 1) text = "Due in " + mins + " minute" + (mins !== 1 ? "s" : "");
      else if (hrs < 24) text = "Due in " + hrs + " hour" + (hrs !== 1 ? "s" : "");
      else if (days === 1) text = "Due tomorrow";
      else text = "Due in " + days + " days";
    }

    timeRemaining.textContent = text;
    timeRemaining.className = overdue ? "overdue" : "";
    overdueIndicator.classList.toggle("visible", overdue);
  }

  function startTimer() {
    clearInterval(timerInterval);
    updateTime();
    timerInterval = setInterval(updateTime, 30000);
  }

  function setupCollapse() {
    const text = descEl.textContent.trim();
    if (text.length > COLLAPSE_THRESHOLD) {
      collapsible.classList.remove("expanded");
      collapsible.classList.add("collapsed");
      collapsible.setAttribute("aria-expanded", "false");
      expandToggle.setAttribute("aria-expanded", "false");
      expandToggle.textContent = "Show more";
      expandToggle.style.display = "inline-block";
    } else {
      collapsible.classList.remove("collapsed");
      collapsible.classList.add("expanded");
      expandToggle.style.display = "none";
    }
  }

  expandToggle.addEventListener("click", () => {
    const isCollapsed = collapsible.classList.contains("collapsed");
    if (isCollapsed) {
      collapsible.classList.remove("collapsed");
      collapsible.classList.add("expanded");
      collapsible.setAttribute("aria-expanded", "true");
      expandToggle.setAttribute("aria-expanded", "true");
      expandToggle.textContent = "Show less";
    } else {
      collapsible.classList.remove("expanded");
      collapsible.classList.add("collapsed");
      collapsible.setAttribute("aria-expanded", "false");
      expandToggle.setAttribute("aria-expanded", "false");
      expandToggle.textContent = "Show more";
    }
  });

  toggle.addEventListener("change", () => {
    applyStatus(toggle.checked ? "done" : "pending");
  });

  statusControl.addEventListener("change", () => {
    applyStatus(statusControl.value);
  });

  function openEditForm() {
    editTitleInput.value = titleEl.textContent;
    editDescInput.value = descEl.textContent;
    editPrioritySelect.value = currentPriority;
    editDueDateInput.value = DUE.toISOString().slice(0, 16);
    editFormWrap.classList.add("open");
    editTitleInput.focus();
  }

  function closeEditForm() {
    editFormWrap.classList.remove("open");
    editBtn.focus();
  }

  editBtn.addEventListener("click", openEditForm);
  cancelBtn.addEventListener("click", closeEditForm);

  saveBtn.addEventListener("click", () => {
    const newTitle = editTitleInput.value.trim();
    const newDesc = editDescInput.value.trim();
    const newPriority = editPrioritySelect.value;
    const newDue = new Date(editDueDateInput.value);

    if (newTitle) titleEl.textContent = newTitle;
    if (newDesc) descEl.textContent = newDesc;

    applyPriority(newPriority);

    if (!isNaN(newDue)) {
      DUE = newDue;
      const opts = { month: "short", day: "numeric", year: "numeric" };
      dueDateDisplay.textContent = "Due " + newDue.toLocaleDateString("en-US", opts);
      dueDateDisplay.setAttribute("datetime", newDue.toISOString());
      if (!isDone) updateTime();
    }

    setupCollapse();
    closeEditForm();
  });

  document.querySelector("[data-testid='test-todo-delete-button']").addEventListener("click", () => {
    alert("Delete clicked");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && editFormWrap.classList.contains("open")) closeEditForm();
  });

  applyPriority("med");
  applyStatus("inprogress");
  setupCollapse();
  startTimer();