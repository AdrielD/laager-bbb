console.log('Loaded!');

window.onload = () => {
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
  
  fectResult().then((data) => {
    const silvioPercentage = (100 * (data.votes_per_candidate.silvio || 0) / data.total_votes).toFixed(2);
    const fausataoPercentage = (100 * (data.votes_per_candidate.faustao || 0) / data.total_votes).toFixed(2);
    
    document.getElementById('result-silvio').innerText = `${silvioPercentage}%`;
    document.getElementById('result-faustao').innerText = `${fausataoPercentage}%`;
  })
}
