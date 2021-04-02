const url = 'http://api.openweathermap.org/data/2.5/weather?q=London&APPID=fc24cd69b564813ec6a99ab022992c76';

function createNode(element) {
  return document.createElement(element);
}

function append(parent, element) {
  return parent.appendChild(element);
}

fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    const test = createNode('p');
    test.innerHTML = `weer in londen: ${data.results}`;
    append(document, test);
  })
  .catch((error) => {
    console.log(error);
  });
