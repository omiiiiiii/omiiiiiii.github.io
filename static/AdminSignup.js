function Signup(item) {
    if (item.Username.value == "" || item.pass.value == "" || item.cpass.value == "") {
        alert("Please Fill all the mandatory details");
    }
    else {
        Username = document.getElementById('Username').value;
        password = document.getElementById('pass').value;
        if (localStorage.getItem('adminuserjason') == null) {
            adminuserjasonArray = [];
            adminuserjasonArray.push([Username, password]);
            localStorage.setItem('adminuserjason', JSON.stringify(adminuserjasonArray));
        }
        else {
            adminuserjasonArraystr = localStorage.getItem('adminuserjason');
            adminuserjasonArray = JSON.parse(adminuserjasonArraystr);
            var count = 0;
            adminuserjasonArray.forEach((element) => {
                if(element[0]==Username){
                 count =1;
                 document.getElementById('Username').value=""
                }
            });

            if(count==1){
                alert("User Already Exist");
            }
            else{
            adminuserjasonArray.push([Username, password]);
            localStorage.setItem('adminuserjason', JSON.stringify(adminuserjasonArray));
            alert("Your data is saved once admin Approve u will able to login");
            }
        }
    }
}