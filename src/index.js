const form = document.getElementById("guest-form");
const guestList = document.getElementById("guest-list");
const guestNameInput = document.getElementById("guest-name");
const guestCategory = document.getElementById("guest-category");

let guests = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();//It stops the default behavior of the event which is to relaod the page.

  const name = guestNameInput.value.trim();
  const category = guestCategory.value;
  const time = new Date().toLocaleString();//give the current date and the time 


  if (!name) return;//ensures everything is there

// It ensure u dont put the same guest by looking both name and category
const isDuplicate = guests.some(
  (guest) => guest.name.toLowerCase() === name.toLowerCase() && guest.category === category
);

if (isDuplicate) {
  alert("Oops! This guest is already on the list");
  return;
}

if (guests.length >= 10) {
  alert("You've hit the guest limit (10 max)");
  return;// alerts the user the that they can only add 10 users only 
}

  guests.push({ name, category, rsvp: false, time });//what is on the list when displayed by adding it on the array
  guestNameInput.value = "";//Clears the input field after the guest is added.
  renderGuests();
});

function renderGuests() {
  guestList.innerHTML = "";

  guests.forEach((guest, index) => {
    const li = document.createElement("li");
    li.className = `category-${guest.category}`;

    // images that go hand in hand with the category
    let iconImages = "";
    switch (guest.category) {
      case "Friend":
        iconImages = "./images/friends.png";
        break;
      case "Family":
        iconImages = "./images/family.png";
        break;
      case "Colleague":
        iconImages = "./images/collegues.png";
        break;
    }

    li.innerHTML = `
      <div>
        <span>
          <strong>${guest.name}</strong> 
          <img src="${iconImages}" alt="${guest.category}" class="guest-icon" />
          (${guest.category})
        </span>

        <span>
        Status: 
        <img src="${guest.rsvp ? './images/checked.png' : './images/cancel.png'}" 
        alt="${guest.rsvp ? 'Attending' : 'Not Attending'}" class="status-icon"/>
        <em>${guest.rsvp ? "Attending" : "Not Attending"}</em>
        </span>

        <small>The Guest Was Added at: ${guest.time}</small>
      </div>

      <div>
        <button class="guest-action" onclick="toggleRSVP(${index})">Mark Attendance</button>
        <button class="guest-action" onclick="editGuest(${index})">Edit The Name</button>
        <button class="guest-action" onclick="removeGuest(${index})">Remove</button>
      </div>
    `;
    guestList.appendChild(li);
  });
}

function toggleRSVP(index) {
  guests[index].rsvp = !guests[index].rsvp;
  renderGuests();
}

function removeGuest(index) {
  guests.splice(index, 1);
  renderGuests();
}

function editGuest(index) {
  const newName = prompt("Edit Your Guest Name:", guests[index].name);
  if (newName && newName.trim()) {
    guests[index].name = newName.trim();
    renderGuests();
  }
}
