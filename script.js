let dataArray;

async function getUsers() {
  try {
    const responce = await fetch("https://randomuser.me/api/?nat=fr&results=50");
    const { results } = await responce.json();
    oderList(results);
    dataArray = results;
    createUserList(dataArray);
    console.log(dataArray);
  } catch (error) {
    console.log(error);
  }
}
getUsers();

function oderList(data) {
  data.sort((a, b) => {
    if (a.name.last < b.name.last) {
      return -1;
    } else if (a.name.last > b.name.last) {
      return 1;
    } else {
      return 0;
    }
  });
}

const tableResult = document.querySelector(".table-results");

function createUserList(array) {
  array.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.className = "table-item";
    listItem.innerHTML = `
        <p class="main-info">
          <img src=${user.picture.thumbnail} alt="avatar picture" />
          <span>${user.name.last} ${user.name.first}</span>
        </p>
        <p class="email">${user.email}</p>
        <p class="phone">${user.phone}</p>
      `;
    tableResult.appendChild(listItem);
  });
}

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", filterData);

function filterData(e) {
  tableResult.textContent = "";
  const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");
  const filtredArray = dataArray.filter((userData) => searchForOccurences(userData));

  function searchForOccurences(userData) {
    const searchTypes = {
      firstname: userData.name.first.toLowerCase(),
      lastname: userData.name.last.toLowerCase(),

      firstAndLast: `${userData.name.first + userData.name.last}`.toLowerCase(),
      lastAndFirst: `${userData.name.last + userData.name.first}`.toLowerCase(),
    };
    for (prop in searchTypes) {
      if (searchTypes[prop].includes(searchedString)) {
        return true;
      }
    }
  }
  createUserList(filtredArray);
}
