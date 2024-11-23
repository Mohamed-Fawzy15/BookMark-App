var tableArr = [];

var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteURLInput = document.getElementById("websiteURL");
var visitBtn = document.getElementById("visitBtn");
var deleteBtn = document.getElementById("deleteBtn");
var tableBody = document.getElementById("tableContent");

if (localStorage.getItem("books")) {
  tableArr = JSON.parse(localStorage.getItem("books"));
} else {
  tableArr = [];
}

function pushData() {
  var tableObj = {
    name: bookmarkNameInput.value,
    URL: websiteURLInput,
  };

  tableArr.push(tableObj);
  localStorage.setItem("books", JSON.stringify(tableArr));
  clearInput();
  displayTable(tableArr);
}

function clearInput() {
  bookmarkNameInput.value = "";
  websiteURLInput.value = "";
}

function displayTable() {
  content = ``;
  for (var i = 0; i <= tableArr.length; i++) {
    content = `
        <tr>
            <td>${i + 1}</td>
            <td>${tableArr[i].name}</td>
            <td>
                <button class="btn btn-visit text-capitalize" id="visitBtn">
                    <i class="fa-solid fa-eye"></i>
                    visit
                </button>
            </td>
            <td>
                <button class="btn btn-delete text-capitalize" id="deleteBtn">
                    <i class="fa-solid fa-trash"></i>
                    delete
                </button>
            </td>
        </tr>
    `;

    tableBody += content;
  }
}
