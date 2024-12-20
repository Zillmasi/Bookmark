var bookNameInput = document.getElementById("bookname");
var bookURlInput = document.getElementById("bookURl");
var bookRow = document.getElementById("bookRow");
var sub = document.getElementById("btnSubmit");
var bookList = [];

if (localStorage.getItem("book") === null) {
  bookList = [];
} else {
  bookList = JSON.parse(localStorage.getItem("book"));
  display(bookList);
}

function AddBook() {
  if (
    validation(bookNameInput, "msName") &&
    validation(bookURlInput, "msUrl")
  ) {
    var book = {
      name: bookNameInput.value,
      Url: bookURlInput.value,
    };

    bookList.push(book);
    localStorage.setItem("book", JSON.stringify(bookList));
    display(bookList);
    clearForm();
  }
}

function display(List) {
  var count = " ";
  for (i = 1; i < List.length; i++) {
    count += `        
                <tr>
                    <td class="text-capitalize"> ${i} </td>
                    <td class="text-capitalize">${List[i].name}</td>
                    <td class="text-capitalize">
                        <a href=" ${List[i].Url}">
                            <button class="btn btn-visit">
                            <i class="fa-solid fa-eye pe-1"></i>
                            Visit
                            </button>
                        </a>
                    </td>

                    <td class="text-capitalize">

                        <button onclick="DeletBook(${i})" class="btn btn-delete">
                            <i class="fa-solid fa-trash-can"></i>
                          Delete
                         </button>

                     </td>

                </tr>
        `;
  }
  bookRow.innerHTML = count;
}

function DeletBook(index) {
  bookList.splice(index, 1);
  display(bookList);
  localStorage.setItem("book", JSON.stringify(bookList));
}

function clearForm() {
  bookNameInput.value = "";
  bookURlInput.value = "";
  bookNameInput.classList.remove("is-valid");
  bookURlInput.classList.remove("is-valid");
}

// function validateBook() {
//   var regex = /^[A-Z][a-z]{3,15}$/;
//   var text = bookNameInput.value;

//   if (regex.test(text)) {
//     bookNameInput.classList.remove("is-invalid");
//     bookNameInput.classList.add("is-valid");
//     return true;
//   } else {
//     bookNameInput.classList.add("is-invalid");
//     bookNameInput.classList.remove("is-valid");
//     return false;
//   }
// }

// function validateUrl() {
//   var regex =
//     /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
//   var text = bookURlInput.value;

//   if (regex.test(text)) {
//     bookURlInput.classList.remove("is-invalid");
//     bookURlInput.classList.add("is-valid");
//     return true;
//   } else {
// bookURlInput.classList.add("is-invalid");
// bookURlInput.classList.remove("is-valid");
// return false;
//   }
// }

function validation(elemnt, msg) {
  var msg = document.getElementById(msg);

  var regex = {
    bookname: /^[A-Z][a-z]{3,15}$/,
    bookURl:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  };

  var text = elemnt.value;
  if (regex[elemnt.id].test(text)) {
    elemnt.classList.remove("is-invalid");
    elemnt.classList.add("is-valid");
    msg.classList.add("d-none");

    return true;
  } else {
    elemnt.classList.add("is-invalid");
    elemnt.classList.remove("is-valid");
    msg.classList.remove("d-none");

    return false;
  }
}
