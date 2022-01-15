window.addEventListener('load',() => {

    if (localStorage.getItem('ApproveJson') == null) {
        ApproveJsonArray = [];
        localStorage.setItem('ApproveJson', JSON.stringify(ApproveJsonArray))
    }
    else {
        ApproveJsonArraystr = localStorage.getItem('ApproveJson')
        ApproveJsonArray = JSON.parse(ApproveJsonArraystr);

    }
    Eventname = document.getElementById('Eventname').value;
    var count = 0;
    ApproveJsonArray.forEach((element) => {
        if(element[0]==Eventname){
         count =1;
        }
    });
    if(count==0){
        document.getElementById('Eventname').value=""
    }
})


function CheckContact() {
    var input = document.getElementById("Contact")
    if (input.checkValidity()) {
    }
    else {
        alert("Contact number should be validand have 10 digit")
        document.getElementById("Contact").value = ""
    }
}
function CheckAContact() {
    var input1 = document.getElementById("Alternate")
    var input2 = document.getElementById("Contact")
    if (input1.checkValidity()) {
    }
    else {
        alert("Alternate Contact number should be validand have 10 digit")
        document.getElementById("Alternate").value = ""
    }
    if(input1.value!=""&&input1.value==input2.value){
        alert("Contact number and Alternate number should not be same ")
    }
}

function enroll(event){
    if (event.Eventname.value == "" || event.TeamName.value == "" || event.Count.value == "" || event.LeadName.value == "" || event.Contact.value == "" || event.Alternate.value == "") {
        alert("Please Fill all the mandatory details")
    }
    else{
       
        TeamName = document.getElementById('TeamName').value;
        Count = document.getElementById('Count').value;
        LeadName = document.getElementById('LeadName').value;
        Contact = document.getElementById('Contact').value;
        Eventname = document.getElementById('Eventname').value;
        Alternate = document.getElementById('Alternate').value;
        if (localStorage.getItem('enrollJson') == null)
        {
            enrollJsonArray = [];
            enrollJsonArray.push([Eventname, TeamName,Count,LeadName,Contact,Alternate])
            localStorage.setItem('enrollJson', JSON.stringify(enrollJsonArray))
        }         
        else {
            enrollJsonArraystr = localStorage.getItem('enrollJson')
            enrollJsonArray = JSON.parse(enrollJsonArraystr);
            var count = 0;
            enrollJsonArray.forEach((element) => {
                if(element[1]==TeamName){
                 count =1;
                }
            });

            if(count==1){
                alert("This team Name is already used by someone please select other name");
                document.getElementById('TeamName').value="";
            }
            else{
            enrollJsonArray.push([Eventname, TeamName,Count,LeadName,Contact,Alternate])
            localStorage.setItem('enrollJson', JSON.stringify(enrollJsonArray))
            }
        }
    }
}