const source = document.getElementById("kroger-template").innerHTML;
const template = Handlebars.compile(source);

const data = await response.json();
const html = template(data);
console.log(">>", html)

document.getElementById("kroger-data").innerHTML = html;
