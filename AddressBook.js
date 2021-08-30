//View Contact By city
const prompt = require('prompt-sync')();
const Contact = require('./Contact.js')

let addressBookArr = new Array();

let getContact = () => {
    let firstName = prompt("Enter First Name ");
    let lastName = prompt("Enter Last Name ");
    let address = prompt("Enter Address ");
    let city = prompt("Enter City ");
    let state = prompt("Enter State ");
    let zip = prompt("Enter Zip ");
    let phoneNumber = prompt("Enter Phone Number ");
    let email = prompt("Enter Email ");
    let contactInput = null;

    try {
        contactInput = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
    } catch (error) {
        console.error(error);
    }
    return contactInput;
};

let countContacts = () => addressBookArr.reduce((total, contact) => total + 1, 0);

let viewContacts = () => {
    console.log("Number of contacts in this addressbook : " + countContacts());
    addressBookArr.forEach(contact => console.log(contact.toString()));
}


let addContact = (contact) => {
    let index = getindexByName(contact.firstName, contact.lastName);
    if (index == -1) {
        addressBookArr.push(contact);
        console.log("Contact Added Successfully!!");
    }
    else
        console.log("Could not add contact as Name already exists!!");
}

let getindexByName = (frstName, lstName) => {
    return addressBookArr.findIndex(contact => contact.firstName == frstName && contact.lastName == lstName);
}

let editContact = () => {
    let frstName = prompt("Enter First Name : ");
    let lstName = prompt("Enter Lastt Name : ");
    let index = addressBookArr.findIndex(contact => contact.firstName == frstName && contact.lastName == lstName);
    if (index == -1)
        console.log("Could not find the contact!!")
    else {
        addressBookArr[index] = getContact();
        console.log("Contact edited successfully!!");
    }
}


let deleteContact = () => {
    let frstName = prompt("Enter First Name : ");
    let lstName = prompt("Enter Last Name : ");
    let index = getindexByName(frstName, lstName);
    if (index == -1)
        console.log("Could not find the contact!!")
    else {
        console.log("Contact deleted successfully!!");
        return addressBookArr.splice(index, 1);

    }
}

let searchByCity = () => {
    let searchCity = prompt("Enter the city name ");
    return addressBookArr.filter(contact => contact.city == searchCity);
}

let searchByState = () => {
    let searchState = prompt("Enter the state name ");
    return addressBookArr.filter(contact => contact.state == searchState);
}

console.log("Welcome to AddressBook Program!!");
let choice = 0;
do {
    console.log("Choose\n1. View Contacts\n2. Add Contact\n3. Edit Contact By name\n4. Delete Contact\n5. Search Contacts By City\n6. Search Contacts By State\n7. Exit");
    choice = prompt("Enter Your Choice ");
    switch (choice) {
        case "1": viewContacts();
            break;
        case "2": addContact(getContact());
            break;
        case "3": editContact();
            break;
        case "4": console.log(deleteContact().toString());
            break;
        case "5": searchByCity();
            break;
        case "6": searchByState();
            break;
        case "7": console.log("Bye!!");
            break;
        default: console.log("Invalid Choice !!");
    }

} while (choice != 7)