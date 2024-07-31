function extractDates() {
  // Exemplos de como extrair datas da página web
  // Altere o seletor de acordo com a estrutura da página
  const dateElements = document.querySelectorAll('.date-selector');
  if (dateElements.length < 2) return null;

  const dates = Array.from(dateElements).slice(0, 2).map(el => new Date(el.innerText));
  return dates;
}

function calculateDateDifference(dates) {
  if (dates.length < 2) return null;
  const diffTime = Math.abs(dates[1] - dates[0]);
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  return { hours: diffHours, minutes: diffMinutes };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'calculateDateDifference') {
    const dates = extractDates();
    const difference = calculateDateDifference(dates);
    sendResponse(difference);
  }
});
