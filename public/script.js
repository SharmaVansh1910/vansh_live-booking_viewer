const socket = io();

const bookingsList = document.getElementById("bookingsList");
const bookingCount = document.getElementById("bookingCount");
const lastUpdate = document.getElementById("lastUpdate");
const totalGuests = document.getElementById("totalGuests");
const activeVenues = document.getElementById("activeVenues");
const emptyState = document.getElementById("emptyState");
const refreshIndicator = document.getElementById("refreshIndicator");

let bookings = [];
let venues = new Set();

socket.on("initial-bookings", (initialBookings) => {
  bookings = initialBookings;
  bookingsList.innerHTML = "";
  bookings.forEach((booking) => addBooking(booking, false));
  updateStats();
  updateEmptyState();
});

socket.on("new-booking", (booking) => {
  bookings.unshift(booking);
  addBooking(booking, true);
  updateStats();
  updateEmptyState();
  showRefreshAnimation();
});

function addBooking(booking, isNew = false) {
  const li = document.createElement("li");
  li.className = `booking-item ${isNew ? "new-booking" : ""}`;

  li.innerHTML = `
        <div class="booking-info">
            <div class="booking-venue">
                <i class="fas fa-store"></i>
                ${booking.venueName}
            </div>
            <div class="booking-details">
                <div class="booking-detail">
                    <i class="fas fa-users"></i>
                    <span>Party of ${booking.partySize}</span>
                </div>
                <div class="booking-detail">
                    <i class="fas fa-clock"></i>
                    <span>${booking.time}</span>
                </div>
            </div>
        </div>
        <div class="booking-badge">
            New
        </div>
    `;

  if (isNew && bookingsList.firstChild) {
    bookingsList.insertBefore(li, bookingsList.firstChild);

    setTimeout(() => {
      li.classList.remove("new-booking");
    }, 3000);
  } else {
    bookingsList.appendChild(li);
  }

  // Add venue to set for stats
  venues.add(booking.venueName);
}

function updateStats() {
  bookingCount.textContent = bookings.length;

  lastUpdate.textContent = new Date().toLocaleTimeString();

  const totalGuestCount = bookings.reduce(
    (sum, booking) => sum + booking.partySize,
    0
  );
  totalGuests.textContent = totalGuestCount;

  activeVenues.textContent = venues.size;
}

function updateEmptyState() {
  if (bookings.length === 0) {
    emptyState.classList.remove("hidden");
    bookingsList.style.display = "none";
  } else {
    emptyState.classList.add("hidden");
    bookingsList.style.display = "block";
  }
}

function showRefreshAnimation() {
  refreshIndicator.classList.add("spinning");
  setTimeout(() => {
    refreshIndicator.classList.remove("spinning");
  }, 1000);
}

updateEmptyState();

setInterval(() => {
  if (bookings.length > 0) {
    lastUpdate.textContent = new Date().toLocaleTimeString();
  }
}, 1000);
