function dateFormat(value, row, index) {
  return moment(value).format("DD/MM/YYYY");
}
function LinkFormatter(value, row, index) {
  var valf = value.match(/[^\\/]+$/);
  var response = `<a class="link-table" id="${row.link}" href="${row.link}">${valf}</a>`;
  return response;
}
function hashFormat(value, row, index) {
  return `<p class="hash_gen">${btoa(value)}</p>`;
}


var bar = $(".progress-bar");
var divbar = $(".divbarp");
var finbar = $(".showE");
var msgOL = $(".msgOL");
msgOL.show();
finbar.hide();
for (let i = 0; i <= 5; i++) {
  setTimeout(() => {
    console.log("ahora es " + i);
    bar.attr("aria-valuenow", i * 10);
    bar.css("width", i + "0%");
  }, 500 * i);
}
$(document).ready(function () {
  bar.attr("aria-valuenow", 100);
  bar.css("width", "10" + "0%");
  divbar.hide();
  msgOL.hide();
  finbar.show();
  bar.hide();
});