console.log('Loaded!');

window.onload = () => {
  const buildTableCell = (value) => {
    const tableCell = document.createElement('div');
    tableCell.innerText = value;
    return tableCell;
  }

  const buildTableRow = ({ date, hour, choice_id, count }) => {
    const tableRow = document.createElement('div');
    tableRow.style.display = 'flex';
    tableRow.style.gap = '12px';

    tableRow.appendChild(buildTableCell(date));
    tableRow.appendChild(buildTableCell(hour));
    tableRow.appendChild(buildTableCell(choice_id));
    tableRow.appendChild(buildTableCell(count));

    return tableRow;
  }

  const fectResult = () => {
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200 || request.status === 201) {
          const data = JSON.parse(request.responseText);
          resolve(data);
        } else if (request.readyState === 4) {
          reject();
        }
      });
      request.open('GET', 'http://localhost:4000/votes');
      request.send();
    });
  };

  const fetchAndDisplay = () => {
    const table = document.getElementById('table');
    table.innerHTML = null;

    fectResult().then((data) => {      
      data.votes_per_hour.forEach(votes => {
        table.appendChild(buildTableRow(votes));
      });
    });
  }

  let isPooling = 0;

  const togglePooling = (e) => {
    if (e.target.value == 'on') {
      fetchAndDisplay();
      isPooling = setInterval(() => {
        fetchAndDisplay();
      }, 2000);
    } else {
      clearInterval(isPooling);
    }
  }

  document.getElementById('pooling-on').addEventListener('click', togglePooling);
  document.getElementById('pooling-off').addEventListener('click', togglePooling);

  fetchAndDisplay();
}
