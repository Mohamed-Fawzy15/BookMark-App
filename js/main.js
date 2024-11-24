// the main array that holding the data from the input
var tableArr = [];

// all the variable that hold the input, table and button
var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteURLInput = document.getElementById("websiteURL");
var submitBtn = document.getElementById("submitBtn");
var visitBtn = document.getElementById("visitBtn");
var deleteBtn = document.getElementById("deleteBtn");
var tableBody = document.getElementById("tableContent");

// to check if the localStorage have data or not and we can use it and display it
if (localStorage.getItem("books") != null) {
  tableArr = JSON.parse(localStorage.getItem("books"));
  displayTable(tableArr);
} else {
  tableArr = [];
}

// this method have an object and push all the data that come from the input in the main array and after that we can
// push it in the local storage so we can use it later
function pushData() {
  var tableObj = {
    name: bookmarkNameInput.value,
    webSiteURL: websiteURLInput.value,
  };

  tableArr.push(tableObj);
  displayTable(tableArr);

  localStorage.setItem("books", JSON.stringify(tableArr));

  clearInput();
}

// it display the data that the main array have in the html
function displayTable(arr) {
  content = ``;
  for (var i = 0; i < arr.length; i++) {
    content += `
        <tr>
            <td>${i + 1}</td>
            <td>${arr[i].name}</td>
            <td>
                <button class="btn btn-visit text-capitalize" id="visitBtn" onclick="visitSite('${
                  arr[i].webSiteURL
                }')">
                    <i class="fa-solid fa-eye"></i>
                    visit
                </button>
            </td>
            <td>
                <button class="btn btn-delete text-capitalize" id="deleteBtn" onclick="deleteRow(${i})">
                    <i class="fa-solid fa-trash"></i>
                    delete
                </button>
            </td>
        </tr>
    `;
  }

  tableBody.innerHTML = content;
}

// clear the inputs after the user end typing
function clearInput() {
  bookmarkNameInput.value = null;
  websiteURLInput.value = null;
}

// delete the row in table
function deleteRow(index) {
  tableArr.splice(index, 1);
  displayTable(tableArr);
  localStorage.setItem("books", JSON.stringify(tableArr));
}

// have a link that will sent the user to that link when i click on the btn
function visitSite(link) {
  window.location.href = link;
}

// validation

var inputs = {
  bookmarkName: false,
  websiteURL: false,
};

function validate(element) {
  var regex;

  var BookmarkNameRegex = /^\w\w{2,}/;
  var websiteURLRegex = /^https?:\/\//g;

  switch (element.id) {
    case "bookmarkName":
      regex = BookmarkNameRegex;
      break;
    case "websiteURL":
      regex = websiteURLRegex;
      break;
    default:
      alert("invalid input");
      break;
  }

  var matchRegex = regex.test(element.value);

  if (matchRegex) {
    inputs[element.id] = true;
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    inputs[element.id] = false;
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }

  submitBtn.disabled = !(inputs["bookmarkName"] && inputs["websiteURL"]);
}
