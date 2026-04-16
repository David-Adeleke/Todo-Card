# Todo Card — Stage 1a

A single-file interactive Todo Card built with HTML, CSS, and vanilla JavaScript.

## Live URL
https://your-deployment-url.netlify.app

## GitHub Repo
https://github.com/David-Adeleke/Todo-Card

## Run Locally
Clone the repo and open `index.html` in a browser. No installs needed.

---

## What Changed from Stage 0

- Edit button now opens a real edit form (title, description, priority, due date) instead of logging to console
- Status is now a live dropdown — Pending, In Progress, Done
- Checkbox and status dropdown stay in sync both ways
- Priority now shows a coloured dot and top bar accent in addition to the badge
- Long descriptions collapse by default with a Show more toggle
- Time remaining updates every 30 seconds and shows granular output (minutes, hours, days)
- An Overdue badge appears when the due date has passed
- When status is Done, the timer stops and shows "Completed"

## Design Decisions

- Everything lives in a single `index.html` for simplicity
- Edit form opens inline below the card, no modal
- Collapse kicks in at 120 characters (roughly two lines)

## Known Limitations

- Tags are hard-coded and not editable
- Delete shows a browser alert — no real deletion
- Edit form does not trap focus (optional per spec)

## Accessibility Notes

- All edit form fields have `<label for>` attributes
- Status dropdown has `aria-label`
- Expand toggle uses `aria-expanded` and `aria-controls`
- Time remaining and overdue indicator use `aria-live="polite"`
- Tab order: Checkbox → Status control → Expand toggle → Edit → Delete → Cancel → Save
- All interactive elements have visible focus styles