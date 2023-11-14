console.log("This is ITSOURCECODE Project");
class Library {
  constructor(name, author, type, id) {
    this.name = name;
    this.author = author;
    this.type = type;
    this.id = id;
  }
}

class Display {
  add(bookoflibrary) {
    console.log("Adding to UI");
    let tableBody = document.getElementById("tableBody");
    let uiString = `<tr id="trows">
                            <td>${bookoflibrary.name}</td>
                            <td>${bookoflibrary.author}</td>
                            <td>${bookoflibrary.type}</td>

                        </tr>`;
    tableBody.innerHTML += uiString;
  }

  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  validate(bookoflibrary) {
    if (bookoflibrary.name.length < 2 || bookoflibrary.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    let message = document.getElementById("message");
    let boldText;
    if (type === "success") {
      boldText = "Success";
    } else {
      boldText = "Error!";
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
    setTimeout(function () {
      message.innerHTML = "";
    }, 5000);
  }
}


// render previously added data on the page
async function renderData() {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  let res = await fetch("http://localhost:9000/get-books");
  let data = await res.json();

  let display = new Display();

  if (data.success === false) {
    return;
  }

  data.data.forEach((item) => {
    display.add({
      name: item.bookname,
      author: item.author,
      type: item.type,
      id: item.id,
    });
  });
}


// run on page load
(function () {
  renderData();
})();
