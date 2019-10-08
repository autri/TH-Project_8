const card = document.querySelector('.card');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url)
      .then(checkStatus)
      .then(res => res.json())
      .catch(err => console.log('Something has gone super wrong.', err));
  }
  
  Promise.all([
    fetchData('https://randomuser.me/api/?results=12')
  ])
  .then(data => {
    // console.log(data);
    getDetails(data);
    // console.log(data.results);
    // console.log(data.results[5].name.first);
  })


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
};

function getDetails(data) {
    const details = data.map( person => {
        console.log(person.results[2].name.first);
    });
};





// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

card.addEventListener('click', (e) => {
    console.log('Clicked: ' + e.target);
});