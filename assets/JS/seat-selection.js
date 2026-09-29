// Rows A–E, 3 boxes per row, each box holds 2 seats
// → box1: A1a,A1b  box2: A2a,A2b  box3: A3a,A3b  (same pattern for B, C, D, E)
const ROW_LABELS = ["A", "B", "C", "D", "E"];
const BOXES = 3;
const SEAT_SUFFIXES = ["a", "b"];

// Seat IDs already taken by other members — replace with data from your backend.
const bookedSeats = ["A1b", "B2a", "C3a", "D2b"];

const grid = document.getElementById("seatGrid");
const colHeaders = document.getElementById("colHeaders");
const summary = document.getElementById("summary");
const summarySeat = document.getElementById("summarySeat");
const confirmBtn = document.getElementById("confirmBtn");

let selectedSeat = null;

function buildColHeaders() {
  colHeaders.innerHTML = `<span></span>` + Array.from({ length: BOXES }, (_, i) => `<span>${i + 1}</span>`).join("");
}

function buildSeats() {
  ROW_LABELS.forEach(row => {
    const rowEl = document.createElement("div");
    rowEl.className = "seat-row";
    rowEl.innerHTML = `<span class="row-label">${row}</span>`;

    for (let b = 1; b <= BOXES; b++) {
      const boxEl = document.createElement("div");
      boxEl.className = "seat-box";
      let boxHasAvailable = false;

      SEAT_SUFFIXES.forEach(suffix => {
        const id = `${row}${b}${suffix}`;
        const seat = document.createElement("button");
        seat.type = "button";
        seat.className = "seat";
        seat.dataset.id = id;
        seat.setAttribute("aria-label", `Seat ${id}`);

        if (bookedSeats.includes(id)) {
          seat.classList.add("is-booked");
          seat.disabled = true;
        } else {
          seat.classList.add("is-available");
          boxHasAvailable = true;
        }
        seat.addEventListener("click", () => selectSeat(id, seat));
        boxEl.appendChild(seat);
      });

      const divider = document.createElement("span");
      divider.className = "seat-divider";
      boxEl.appendChild(divider);

      if (boxHasAvailable) boxEl.classList.add("is-available");
      rowEl.appendChild(boxEl);
    }
    grid.appendChild(rowEl);
  });
}

function selectSeat(id, el) {
  document.querySelectorAll(".seat.is-selected").forEach(s => s.classList.remove("is-selected"));
  el.classList.add("is-selected");
  selectedSeat = id;
  summarySeat.textContent = id;
  summary.hidden = false;
}

confirmBtn.addEventListener("click", () => {
  // Next page: send the user onward with the selected seat, e.g.
  // window.location.href = `/confirmation.html?seat=${selectedSeat}`;
  console.log("Confirmed seat:", selectedSeat);
});

// Call this once registration/user data is available.
function setSeatPageUser({ name, phone, photoUrl }) {
  if (name) document.getElementById("userName").textContent = name;
  if (phone) document.getElementById("userPhone").textContent = phone;
  if (photoUrl) document.getElementById("userPhoto").src = photoUrl;
}

buildColHeaders();
buildSeats();
