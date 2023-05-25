document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/api/findTutor')
    .then(response => response.json())
    .then(data => {
      let tutorTable = document.getElementById('tutors');
      generateTable(tutorTable, data);
    });

  fetch('http://localhost:3000/api/findStudent')
    .then(response => response.json())
    .then(data => {
      let studentTable = document.getElementById('students');
      generateTable(studentTable, data);
    });

  fetch('http://localhost:3000/api/findTutorial')
    .then(response => response.json())
    .then(data => {
      let tutorialTable = document.getElementById('tutorials');
      generateTable(tutorialTable, data);
    });
});

function generateTable(container, data) {
  if (data.length === 0) {
    container.innerHTML = '<p>No data available</p>';
    return;
  }

  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  // Extract the column headers from the first data object
  let headers = Object.keys(data[0]).filter(header => header !== '_id');

  // Create the table header row
  let headerRow = document.createElement('tr');
  headers.forEach(header => {
    let th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Create table rows for each data object
  data.forEach(item => {
    let row = document.createElement('tr');
    headers.forEach(header => {
      let td = document.createElement('td');
      if (header === 'HomeAddress') {
        td.textContent = formatAddress(item[header]);
      } else {
        td.textContent = item[header];
      }
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  // Add the table header and body to the table
  table.appendChild(thead);
  table.appendChild(tbody);

  // Add the table to the container element
  container.appendChild(table);
}

function formatAddress(address) {
  let addressLines = [];
  if (address.AddressLine1) {
    addressLines.push(address.AddressLine1);
  }
  if (address.AddressLine2) {
    addressLines.push(address.AddressLine2);
  }
  let townCity = '';
  if (address.Town) {
    townCity += address.Town;
  }
  if (address.City) {
    if (townCity) {
      townCity += ', ';
    }
    townCity += address.City;
  }
  if (townCity) {
    addressLines.push(townCity);
  }
  if (address.CountyCity) {
    addressLines.push(address.CountyCity);
  }
  if (address.EIRCODE) {
    addressLines.push(address.EIRCODE);
  }
  return addressLines.join(', ');
}
