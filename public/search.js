const filterInput = document.getElementById("filter-input");
const tb = document.getElementById("my-table");

filterInput.addEventListener("keyup", () => {
  const rows = document.querySelectorAll("#trows");

  const filterValue = filterInput.value.toLowerCase();

  rows.forEach((row) => {
    const name = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
    const author = row
      .querySelector("td:nth-child(2)")
      .textContent.toLowerCase();

    if (name.includes(filterValue) || author.includes(filterValue)) {
      row.style.display = "";
    } else {

      row.style.display = "none";
    }
  });
});
