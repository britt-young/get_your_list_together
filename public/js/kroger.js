const source = document.getElementById("kroger-template").innerHTML;
const template = Handlebars.compile(source);

const data = await response.json();
const html = template(data);

document.getElementById("kroger-data").innerHTML = html;
