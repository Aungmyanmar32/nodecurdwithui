const addNewUser = document.querySelector(".addNewUser");
const userTable = document.querySelector(".user");
const userInfoTag = document.querySelector(".userInfo");
//UI maker function
const showOnUI = (name, email) => {
  const userUiDiv = document.createElement("div");
  userUiDiv.classList.add("userUiDiv");
  const userNameTag = document.createElement("div");
  userNameTag.textContent = name;
  userNameTag.classList.add("nameOfUser");
  const userEmailTag = document.createElement("div");
  userEmailTag.textContent = email;
  userEmailTag.classList.add("emailOfUser");
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.classList.add("editUser");
  editButton.setAttribute("onclick", "editUserSetup()");
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  deleteButton.classList.add("deleteUser");
  deleteButton.setAttribute("onclick", "deletetUserSetup()");
  const btnGroup = document.createElement("div");
  btnGroup.classList.add("btnGroup");
  btnGroup.append(editButton, deleteButton);

  userUiDiv.append(userNameTag, userEmailTag, btnGroup);

  userInfoTag.append(userUiDiv);
};

const popUp = (divName) => {
  if (divName.classList.contains("closed")) {
    divName.classList.remove("closed");
    divName.style.display = "flex";
    divName.classList.add("showed");
  } else if (divName.classList.contains("showed")) {
    divName.classList.remove("showed");
    divName;
    divName.style.display = "none";
    divName.classList.add("closed");
  }
};

//Get user data from server
const getUsersFromServer = async () => {
  const url =
    "https://nodecurdwithui-1021oljeb-aungmyanmar32.vercel.app/allUsers";
  const response = await fetch(url);
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    let userName = data[i].name;
    let userEmail = data[i].email;
    showOnUI(userName, userEmail);
  }
};

getUsersFromServer();

//Get input tag
const inputedName = document.querySelector(".newUserName");
const inputedEmail = document.querySelector(".newUserEmail");

//define new user info
let newUserName;
let newUserEmail;
let newUserobject;

//get value from input
inputedName.addEventListener("change", (e) => {
  newUserName = e.target.value.toString();
});
inputedEmail.addEventListener("change", (e) => {
  newUserEmail = e.target.value.toString();
});

//empty input value function
const emptyInputvalue = () => {
  inputedName.value = "";
  inputedEmail.value = "";
  newUserName = "";
  newUserEmail = "";
};

//Post new user to server and get posted user
const registerNewUser = async () => {
  newUserobject = {
    name: newUserName,
    email: newUserEmail,
  };

  //check name and email is not empty
  if (newUserName || newUserEmail) {
    //Post data to server
    const response = await fetch("http://localhost:3000/allUsers", {
      method: "POST",
      body: JSON.stringify(newUserobject),
    });

    //appen new user info to front end ,then empty all input value
    const data = await response.json();
    let userName = data[data.length - 1].name;
    let userEmail = data[data.length - 1].email;
    await showOnUI(userName, userEmail);
    await emptyInputvalue();
    addNewUser.style.display = "none";
  }
};

const editUserNameInput = document.querySelector(".editUserName");
const editUserEmailInput = document.querySelector(".editUserEmail");
const editUserForm = document.querySelector(".editUserForm");
const getDataFromUI = (e) => {
  e = e || window.event;
  var target = e.target || e.srcElement;
  const targetDiv = target.parentElement.parentElement;

  const userNameForEdit = targetDiv.querySelector(".nameOfUser").innerText;
  const userEmailForEdit = targetDiv.querySelector(".emailOfUser").innerText;
  editUserNameInput.value = userNameForEdit;
  editUserEmailInput.value = userEmailForEdit;
  editUserEmailInput.setAttribute("disabled", "disabled");
};
const editUserSetup = (e) => {
  getDataFromUI(e);
  editUserForm.style.display = "flex";

  popUp(editUserForm);
};

const uiDisplayer = async (method) => {
  newUserobject = {
    name: editUserNameInput.value,
    email: editUserEmailInput.value,
  };
  const response = await fetch("http://localhost:3000/allUsers", {
    method: method,
    body: JSON.stringify(newUserobject),
  });

  userInfoTag.innerHTML = "";
  getUsersFromServer();
};
const editUserInfo = async () => {
  uiDisplayer("PUT");
  popUp(editUserForm);
};

const deletetUserSetup = (e) => {
  getDataFromUI(e);
  uiDisplayer("DELETE");
};
