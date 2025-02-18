console.log('Loaded!');

window.onload = () => {
  const fakeIp = () => {
    const n = () => Math.ceil(Math.random()*1000);
    return `${n()}.${n()}.${n()}.${n()}`;
  }

  const submit = (candidateId) => {
    return new Promise((resolve, reject) => {
      const body = JSON.stringify({ voter_ip: fakeIp(), choice_id: candidateId });

      const request = new XMLHttpRequest();
      request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200 || request.status === 201) {
          resolve();
        } else if (request.readyState === 4) {
          reject();
        }
      });
      request.open('POST', 'http://localhost:4000/vote', true);
      request.send(body);
    });
  };

  const faustaoButton = document.getElementById('vote-faustao');
  faustaoButton.addEventListener('click', (e) => {
    e.preventDefault();
    submit('faustao').then(() => {
      window.location.href = 'http://localhost:3000/result.html';
    });
  });
  
  const silvioButton = document.getElementById('vote-silvio');
  silvioButton.addEventListener('click', (e) => {
    e.preventDefault();
    submit('silvio').then(() => {
      window.location.href = 'http://localhost:3000/result.html';
    });
  });
}
