document.getElementById("my-form").addEventListener("submit", addUser);

function addUser(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;

  if (name !== "" && email !== "") {
    const user = {
      name,
      email,
    };

    axios
      .post(
        "https://crudcrud.com/api/110292fd1a1c449b8a3382db35fffee9/appointment",
        user
      )
      .then((response) => {
        console.log(response.data);
        showUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    document.getElementById("my-form").reset();
  }
}

const showUsers = () => {
  const userList = document.getElementById("users");
  userList.innerHTML = "";

  axios
    .get(
      "https://crudcrud.com/api/110292fd1a1c449b8a3382db35fffee9/appointment"
    )
    .then((response) => {
      response.data.forEach((user) => {
        userList.innerHTML += `
          <li>
            ${user.name} : ${user.email} 
            <input type="button" class="editButton" value="Edit" onclick="editUser('${user._id}','${user.name}','${user.email}')">
            <input type="button" class="deleteButton" value="Delete" onclick="deleteUser('${user._id}')">
          </li>`;
      });
    });
};

const editUser = (_id, name, email) => {
  // Update the form inputs
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;

  // Update the form submission to trigger an update
  const form = document.getElementById("my-form");
  form.removeEventListener("submit", addUser);
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedName = e.target.name.value;
    const updatedEmail = e.target.email.value;

    axios
      .put(
        `https://crudcrud.com/api/110292fd1a1c449b8a3382db35fffee9/appointment/${_id}`,
        {
          name: updatedName,
          email: updatedEmail,
        }
      )
      .then((response) => {
        console.log(response.data);
        showUsers();
      })
      .catch((err) => {
        console.log(err);
      });

    form.removeEventListener("submit", addUser);
    form.addEventListener("submit", addUser);
    form.reset();
  });
};

const deleteUser = (_id) => {
  axios
    .delete(
      `https://crudcrud.com/api/110292fd1a1c449b8a3382db35fffee9/appointment/${_id}`
    )
    .then((response) => {
      console.log(response.data);
      showUsers();
    })
    .catch((err) => console.log(err));
};

showUsers();
