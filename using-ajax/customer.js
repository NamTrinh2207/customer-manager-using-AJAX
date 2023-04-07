function list() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/customers",
        dataType: "json",
        success: function (customer) {
            let customerHtml = "";
            for (let i = 0; i < customer.length; i++) {
                customerHtml += "<tr>\n" +
                    "        <td>" + customer[i].firstName + "</td>\n" +
                    "        <td>" + customer[i].lastName + "</td>\n" +
                    "        <td><button onclick='deleteCustomer(" + customer[i].id + ")'>Delete</button></td>\n" +
                    "        <td><button onclick='update(" + customer[i].id + ")'>Update</button></td>\n" +
                    "    </tr>";
            }
            document.getElementById("list").innerHTML = customerHtml;
        }
    })
}

list();

function addNewCustomer() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let newCustomer = {
        firstName: firstName,
        lastName: lastName
    };
    $.ajax({
        type: "POST",
        data: JSON.stringify(newCustomer),
        url: "http://localhost:8080/customers",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: list
    });
    event.preventDefault();
}

function deleteCustomer(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/customers/" + id,
        dataType: "json",
        success: list
    });
    event.preventDefault();
}

function update(id) {
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let newCustomer = {
        firstName: firstName,
        lastName: lastName
    };
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/customers/" + id,
        dataType: "json",
        data: JSON.stringify(newCustomer),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: list
    });
    event.preventDefault();
}