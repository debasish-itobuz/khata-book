const customerInput = document.querySelector(".customer-name-input");
const amountInput = document.querySelector(".amount-taken-input");
const addButton = document.querySelector(".add-button");
const customerCards = document.getElementsByClassName("customer-details-container")[0];
const editAmountInput = document.getElementsByClassName("edit-amount");
const currAmount = document.getElementsByClassName("curr-amount");

let x = 0;

// to set data to localstorage
function storeDataToDb(data) {
    localStorage.setItem("khataBook", JSON.stringify(data));
}
//  to get data from localstorage
function getDataFromDb() {
    const dbData = localStorage.getItem("khataBook");
    if (dbData) {
        showList(JSON.parse(dbData));
        return JSON.parse(dbData); // if we don't return dbData here, then an empty array will be assigned to customer details below.
    }
    return [];
}

function updateDb(index, amount, isCredited) {
    const currAmount = Number(customerDetails[index].amount);
    customerDetails[index].amount = isCredited
        ? amount + currAmount
        : currAmount - amount;
    storeDataToDb(customerDetails);
    showList(customerDetails);
}

function updateAmount(id, index) {
    editAmountInput[index].addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            // customerDetails[index].amount = Number(editAmountInput[index].value) + Number(customerDetails[index].amount);
            updateDb(index, Number(editAmountInput[index].value), true);
        }
    });
}

const customerDetails = getDataFromDb(); // the return data from the function getDataFromDb will be assigned to customerDetails.

// console.log(customerDetails);

// for making customer cards
function showList(listData) {
    customerInput.value = "";
    amountInput.value = "";
    customerCards.innerHTML = " ";
    for (let index = 0; index < listData.length; index++) {
        customerCards.innerHTML += `<div class="d-flex justify-content-evenly align-items-center bg-white mt-2 py-2 rounded-2" id = "${listData[index].id
            }">
        <span><img src="images/user.svg" alt="user image"/></span>
        <p  class="customer-name pt-3 fs-4">${listData[index].name}</p>
        <p class="pt-3 text-danger curr-amount">$<span class="amount ms-2">${listData[index].amount
            }</span></p>
        <input type="number" class="edit-amount border border-0 hidden-item" />
        <span><img src="images/edit.svg" alt="edit button" class = edit-button onclick = "editButton(${listData[index].id
            },${[index]})" /></span>
       <img src="./images/froward.svg" alt="All details" class="all-details-button" onclick = "allDetails(${listData[index]
            })">
    </div>`;
    }
}

function editButton(id, index) {
    x = index;
    editAmountInput[index].classList.toggle("hidden-item");
    updateAmount(id, index);
}

// for making an object
function getDetails() {
    if (
        customerInput.value !== "" &&
        amountInput.value !== "" &&
        amountInput.value !== "0"
    ) {
        const content = {
            name: customerInput.value.trim(),
            amount: amountInput.value.trim(),
            id: new Date().getTime(),
        };

        customerDetails.push(content);
        // console.log(customerDetails);
        storeDataToDb(customerDetails);
        showList(customerDetails);
    } else alert("Empty task");
}

addButton.addEventListener("click", () => {
    getDetails();
});

amountInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        getDetails();
    }
});
