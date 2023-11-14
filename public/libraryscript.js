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
                            <td> <button class="btn btn-danger deleteBtn" data-id=${bookoflibrary.id} >Delete</button> <button class="btn btn-primary updateBtn" data-id=${bookoflibrary.id} >Update</button></td>

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

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

// delete item from table
const table = document.getElementById("my-table");

table.addEventListener("click", function (event) {
  if (event.target && event.target.matches("button.deleteBtn")) {
    const id = event.target.dataset.id;
    deleteBook(id);
  }

  if (event.target && event.target.matches("button.updateBtn")) {
    const id = event.target.dataset.id;
    window.open("http://localhost:9000/update.html?id=" + id);
  }
});
function libraryFormSubmit(e) {
  e.preventDefault();
  console.log("YOu have submitted library form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let philippine = document.getElementById("philippine");
  let programming = document.getElementById("programming");
  let science = document.getElementById("science");
  let others = document.getElementById("others");

  if (philippine.checked) {
    type = philippine.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (science.checked) {
    type = science.value;
  } else if (others.checked) {
    type = others.value
  }

  let bookoflibrary = new Library(name, author, type);
  console.log(bookoflibrary);

  let display = new Display();

  if (display.validate(bookoflibrary)) {
    // add to database
    fetch("http://localhost:9000/add-book", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        author: bookoflibrary.author,
        type: bookoflibrary.type,
        bookname: bookoflibrary.name,
      }),
    }).then(() => {
      display.show("success", "Your book has been successfully added");
    });
    renderData();
    display.clear();
  } else {
    // Show error to the user
    display.show("danger", "Sorry you cannot add this book");
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

async function deleteBook(id) {
  let isconfirmed = confirm("Do you want to delete the book ? ");
  if (!isconfirmed) {
    return;
  }
  await fetch("http://localhost:9000/delete/" + id);
  renderData();
}

// run on page load
(function () {
  renderData();
})();
