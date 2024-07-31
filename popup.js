document.getElementById('calculate-button').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'calculateDateDifference' }, (response) => {
      const resultElement = document.getElementById('result');
      resultElement.style.fontWeight = 'bold';
      if (response && response.hours !== null && response.minutes !== null) {
        resultElement.innerText = `Horas Trabalhadas: ${response.hours} horas ${response.minutes} minutos`;
        if (response.hours >= 8 && response.minutes > 48) {
          resultElement.style.color = 'red';
        } else {
          resultElement.style.color = 'green';
        }
      } else {
        resultElement.innerText = 'Não foi possível calcular a diferença. Verifique se as datas estão presentes.';
        resultElement.style.color = 'black';
      }
    });
  });
});
