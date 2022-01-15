function CheckPassword() {
    var input = document.getElementById("pass")
    if (input.checkValidity()) {
    }
    else {
        alert("password must conatins 6-20 letter and atleast have 1 lower 1 upper and 1 integer")
        document.getElementById("pass").value = ""
    }
}
function confirmPass() {
    var pass = document.getElementById("pass").value
    var confPass = document.getElementById("cpass").value
    if (pass != confPass) {
        //alert('Wrong confirm password !');
        alert(" Password and Confirm Password does not match")
        document.getElementById("cpass").value = ""
        document.getElementById("pass").value = ""
        document.getElementById("cpass").setAttribute('style', 'color: blue');
    }
    else {
    }
}

function openPage(pageName, elmt, color) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "inline";
    elmt.style.backgroundColor = color;
    if (pageName == "AddedEvents") {
        update();
    }
    else if (pageName == "AdminData") {
        adminupdate();
    }
    else if (pageName == "Participant") {
        Participantupdate();
    }
}

function Participantupdate(){
    if (localStorage.getItem('enrollJson') == null) {
        enrollJsonArray = [];
        localStorage.setItem('enrollJson', JSON.stringify(enrollJsonArray))
    }
    else {
        enrollJsonArraystr = localStorage.getItem('enrollJson')
        enrollJsonArray = JSON.parse(enrollJsonArraystr);

    }
    var tablebody = document.getElementById('tbody2')
    let str = "";
    enrollJsonArray.forEach((element, index) => {
        str += `
                <tr> 
                        <th>${index + 1}</th>
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td>${element[2]}</td>
                        <td>${element[3]}</td>
                        <td>${element[4]}</td>
                        <td>${element[5]}</td>
                </tr>`
    });
    tablebody.innerHTML = str;
}



//   To delete from localStorage
function deleted(itemIndex) {
    if (confirm("Do you really want to reject this event")) {
        console.log("delete", itemIndex)
        itemJsonArraystr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArraystr);
        itemJsonArray.splice(itemIndex, 1)

        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        update()
    }
}
// to print the local storage 
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArraystr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArraystr);

    }
    var tablebody = document.getElementById('tbody')
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
                <tr> 
                        <th>${index + 1}</th>
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td>${element[2]}</td>
                        <td>${element[3]}</td>
                        <td>${element[4]}</td>
                        <td>${element[5]}</td>
                        <td><button class="btn" id="abtn" onclick="Approve(${index})">Approve</button></td>
                        <td><button class="btn" onclick="deleted(${index})">Reject</button></td>
                </tr>`
    });
    tablebody.innerHTML = str;
}
// print adminuserjason localStorage
function adminupdate() {
    if (localStorage.getItem('adminuserjason') == null) {
        adminuserjasonArray = [];
        localStorage.setItem('adminuserjason', JSON.stringify(adminuserjasonArray))
    }
    else {
        adminuserjasonArraystr = localStorage.getItem('adminuserjason')
        adminuserjasonArray = JSON.parse(adminuserjasonArraystr);

    }
    var tablebody = document.getElementById('tbody1')
    let str = "";
    adminuserjasonArray.forEach((element, index) => {
        str += `
                <tr> 
                        <th>${index + 1}</th>
                        <td>${element[0]}</td>
                        <td><a href="adminApprove"><button class="btn"  id="abtn" onclick="AdminApprove(${index})" >Approve</button></a></td>
                        <td><button class="btn" onclick="Admindelete(${index})"  >Reject</button></td>
                </tr>
                `  
               
    });
    tablebody.innerHTML = str;
}
// to approve the localstorage
function Approve(itemIndex) {
    if (confirm("Do you really want to Confirm this event")) {
        if (localStorage.getItem('ApproveJson') == null) {
            ApproveJsonArray = [];
            array = itemJsonArray[itemIndex]
            // array = arr.split(',')
            ApproveJsonArray.push([array[0], array[1], array[2], array[3], array[4], array[5]]);
            localStorage.setItem('ApproveJson', JSON.stringify(ApproveJsonArray));
        }
        else {

            ApproveJsonArraystr = localStorage.getItem('ApproveJson')
            ApproveJsonArray = JSON.parse(ApproveJsonArraystr);
            array = itemJsonArray[itemIndex]
            // array = arr.split(',')
            ApproveJsonArray.push([array[0], array[1], array[2], array[3], array[4], array[5]]);
            localStorage.setItem('ApproveJson', JSON.stringify(ApproveJsonArray));
        }
        itemJsonArraystr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArraystr);
        itemJsonArray.splice(itemIndex, 1);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        update();
    }
}
//Admin approve function 
function AdminApprove(item) {
    ApproveArraystr = localStorage.getItem('Approve')
    ApproveArray = JSON.parse(ApproveArraystr);
    if (ApproveArray.length === 0) {
        ApproveArray = [];
        array1 = adminuserjasonArray[item];
        // array = arr.split(',')
        ApproveArray.push([array1[0], array1[1]]);
        localStorage.setItem('Approve', JSON.stringify(ApproveArray));
        adminuserjasonArraystr = localStorage.getItem('adminuserjason')
        adminuserjasonArray = JSON.parse(adminuserjasonArraystr);
        adminuserjasonArray.splice(item, 1);
        localStorage.setItem('adminuserjason', JSON.stringify(adminuserjasonArray));
        adminupdate()
    }
    else{
       alert('U can not approve more than one at a time')
    }
   
    
}
// Admin reject
function Admindelete(item) {
    if (confirm("Do you really want to reject this event")) {
        adminuserjasonArraystr = localStorage.getItem('adminuserjason')
        adminuserjasonArray = JSON.parse(adminuserjasonArraystr);
        adminuserjasonArray.splice(item, 1);
        localStorage.setItem('adminuserjason', JSON.stringify(adminuserjasonArray));
        adminupdate()
    }
}