// ------------------------------------------
//  GLOBAL VARIABLES
// ------------------------------------------
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const flexContainer = document.querySelector(".flex-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch(urlAPI)
      .then(checkStatus)
      .then(res => res.json())
      .then(res => res.results)
      .then(displayEmployees)
      .catch(err => console.log('Something has gone super wrong.', err));


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
}

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {
        let name = employee.name.first + ' ' + employee.name.last;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture.large;
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="photo" src="${picture}" alt="${name}">
                <h2 class="name">${name}</h2>
                <p class="email">${email}</p>
                <p class="city">${city}</p>
            </div>
        `
    });

    flexContainer.innerHTML = employeeHTML;
}

function displayModal(index) {

    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);

    console.log(street);
    const modalHTML = `
        <img class="photo" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr />
                <p class="phone">${phone}</p>
                <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
                <p class="dob">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

}



// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

flexContainer.addEventListener('click', (e) => {
    if (e.target !== flexContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});