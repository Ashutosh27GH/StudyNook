// Edit prices and features here. Amounts are in rupees.
const PLANS = {
  hourly: {
    note: "Best for students who visit occasionally. Time starts when you check in.",
    items: [
      { id: "h4",  title: "4 Hours",  sub: "Short session",  price: 49,  unit: "one time", features: ["Reading hall access for 4 hours", "Book issue and return", "Free Wi-Fi"] },
      { id: "h8",  title: "8 Hours",  sub: "Half-day session", price: 89, unit: "one time", per: "₹11.1 per hour", badge: "Popular", featured: true, features: ["Reading hall access for 8 hours", "Book issue and return", "Free Wi-Fi"] },
      { id: "h12", title: "12 Hours", sub: "Full-day session", price: 129, unit: "one time", per: "₹10.8 per hour", features: ["Reading hall access for 12 hours", "Book issue and return", "Free Wi-Fi"] }
    ]
  },
  monthly: {
    note: "For regular readers. Access every day of your plan, and the longer you stay, the less you pay each month.",
    items: [
      { id: "m3",  title: "3 Months",  sub: "Quarterly plan", price: 1499, unit: "/ 3 months", per: "₹500 per month", features: ["Daily reading hall access", "Issue up to 3 books at a time", "Free Wi-Fi"] },
      { id: "m6",  title: "6 Months",  sub: "Half-yearly plan", price: 2699, unit: "/ 6 months", per: "₹450 per month", save: "Save 10%", badge: "Popular", featured: true, features: ["Daily reading hall access", "Issue up to 3 books at a time", "Free Wi-Fi"] },
      { id: "m12", title: "12 Months", sub: "Annual billing", price: 4799, unit: "/ 12 months", per: "₹400 per month", save: "Save 20%", features: ["Daily reading hall access", "Issue up to 3 books at a time", "Free Wi-Fi"] }
    ]
  },
  yearly: {
    note: "For long-term members. Pay once and lock in today's rate for the full term.",
    items: [
      { id: "y1", title: "1 Year",  sub: "Yearly plan", price: 4499, unit: "/ year", per: "₹375 per month", features: ["Daily reading hall access", "Issue up to 5 books at a time", "Free Wi-Fi"] },
      { id: "y2", title: "2 Years", sub: "Two-year plan", price: 7999, unit: "/ 2 years", per: "₹333 per month", save: "Save 11%", badge: "Best value", featured: true, features: ["Daily reading hall access", "Issue up to 5 books at a time", "Free Wi-Fi"] },
      { id: "y3", title: "3 Years", sub: "Three-year plan", price: 10999, unit: "/ 3 years", per: "₹306 per month", save: "Save 19%", features: ["Daily reading hall access", "Issue up to 5 books at a time", "Free Wi-Fi"] }
    ]
  }
};

const fmt = n => "₹" + n.toLocaleString("en-IN");
const plansEl = document.getElementById("plans");
const noteEl = document.getElementById("tabNote");
const summary = document.getElementById("summary");
const tabs = document.querySelectorAll(".tab");
let current = "hourly";
let selected = null;

function render() {
  const group = PLANS[current];
  noteEl.textContent = group.note;
  plansEl.innerHTML = group.items.map(p => `
    <article class="card${p.featured ? " is-featured" : ""}${selected && selected.id === p.id ? " is-selected" : ""}" data-id="${p.id}" tabindex="0">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <h2 class="card-title">${p.title}</h2>
      <p class="card-sub">${p.sub}</p>
      <div class="price">
        <span class="price-amount">${fmt(p.price)}</span>
        <span class="price-unit">${p.unit}</span>
      </div>
      <div class="price-per">${p.per || ""}${p.save ? `<span class="save">${p.save}</span>` : ""}</div>
      <div class="divider"></div>
      <ul class="features">${p.features.map(f => `<li>${f}</li>`).join("")}</ul>
      <button class="btn btn-outline" type="button">${selected && selected.id === p.id ? "Selected" : "Select plan"}</button>
    </article>`).join("");
}

function select(id) {
  selected = PLANS[current].items.find(p => p.id === id);
  document.getElementById("summaryName").textContent = `${selected.title} (${current})`;
  document.getElementById("summaryPrice").textContent = fmt(selected.price);
  summary.hidden = false;
  render();
}

tabs.forEach(tab => tab.addEventListener("click", () => {
  current = tab.dataset.type;
  tabs.forEach(t => {
    const on = t === tab;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", on);
  });
  render();
}));

plansEl.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) select(card.dataset.id);
});
plansEl.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("card")) {
    e.preventDefault();
    select(e.target.dataset.id);
  }
});

document.getElementById("continueBtn").addEventListener("click", () => {
  // Connect your payment or checkout route here.
  console.log("Continue with plan:", selected);
});

render();
