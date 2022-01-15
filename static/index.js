function confirmPass() {
    var pass = document.getElementById("pass").value
    var confPass = document.getElementById("cpass").value
    if (pass != confPass) {
        //alert('Wrong confirm password !');
        alert(" Password and Confirm Password does not match")
        document.getElementById("cpass").value = ""
        document.getElementById("pass").value = ""
        document.getElementById("pass").setAttribute('style', 'color: blue');
    }
    else {
    }
}
function CheckPassword() {
    var input = document.getElementById("pass")
    if (input.checkValidity()) {
    }
    else {
        alert("password must conatins 6-20 letter and atleast have 1 lower 1 upper and 1 integer")
        document.getElementById("pass").value = ""
    }
}

function mindate() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('mindte').setAttribute('min', today)

}

function AEvent(input) {
    //   alert(input.Eventname.value)
    if (input.Eventname.value == "" || input.name.value == "" || input.date.value == "" || input.time.value == "" || input.file.value == "" || input.discription.value == "") {
        alert("Please Fill all the mandatory details")
    }
    else{
        Eventname = document.getElementById('Eventname').value;
        name1 = document.getElementById('name').value;
        date = document.getElementById('mindte').value;
        time = document.getElementById('time').value;
        file = document.getElementById('file').value;
        discription = document.getElementById('discription').value;
        file1 = document.getElementById('file');
        if (localStorage.getItem('itemsJson') == null)
        {
            alert("boom")
            itemJsonArray = [];
            itemJsonArray.push([Eventname, name1,date,time,file,discription])
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        }         
        else {
            itemJsonArraystr = localStorage.getItem('itemsJson')
            itemJsonArray = JSON.parse(itemJsonArraystr);
            itemJsonArray.push([Eventname, name1,date,time,file,discription])
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        }
    }

}

   

