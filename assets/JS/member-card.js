// ---------- Member data (fill from your backend / registration + subscription) ----------
const member = {
  name: "Aditya Sharma",
  phone: "+91 98765 43210",
  photoUrl: "https://i.pravatar.cc/160?img=12",
  planName: "3 Months Plan",
  startDate: "01 Oct 2026",
  endDate: "31 Dec 2026"
};

// Call this once registration/subscription data is available.
function setMemberCard(data) {
  Object.assign(member, data);
  paintMemberCard();
}

function paintMemberCard() {
  // Step 1 card
  document.getElementById("userName").textContent = member.name;
  document.getElementById("userPhone").textContent = member.phone;
  document.getElementById("userPhoto").src = member.photoUrl;
  document.getElementById("planName").textContent = member.planName;
  document.getElementById("startDate").textContent = member.startDate;
  document.getElementById("endDate").textContent = member.endDate;

  // Step 2 side card
  document.getElementById("sideName").textContent = member.name;
  document.getElementById("sidePhone").textContent = member.phone;
  document.getElementById("sidePhoto").src = member.photoUrl;
  document.getElementById("sidePlan").textContent = member.planName;
  document.getElementById("sideStart").textContent = member.startDate;
  document.getElementById("sideEnd").textContent = member.endDate;
}

// ---------- Step switching ----------
const stepMember = document.getElementById("stepMember");
const stepSeats = document.getElementById("stepSeats");

document.getElementById("payBtn").addEventListener("click", () => {
  stepMember.hidden = true;
  stepSeats.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Seat grid ----------
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
const sideSeat = document.getElementById("sideSeat");
const sideSeatRow = sideSeat.closest(".seat-row-info");

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

  // Update bottom summary bar
  summarySeat.textContent = id;
  summary.hidden = false;

  // Update the member card on the left
  sideSeat.textContent = id;
  sideSeatRow.classList.add("is-filled");
}

confirmBtn.addEventListener("click", () => {
  // Next page: send the user to your payment / final confirmation route, e.g.
  // window.location.href = `/payment.html?seat=${selectedSeat}`;
  console.log("Confirmed seat:", selectedSeat, "for", member.name);
});

paintMemberCard();
buildColHeaders();
buildSeats();
