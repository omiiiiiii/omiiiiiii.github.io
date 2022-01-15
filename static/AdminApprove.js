window.addEventListener('load',() => {

    
    ApproveArraystr = localStorage.getItem('Approve')
    ApproveArray = JSON.parse(ApproveArraystr);
    if (ApproveArray.length === 0) {
        alert("Sorry we dont have anything to Approve");
    }
    else{
    ApproveArray=[];
    ApproveArraystr = localStorage.getItem('Approve')
    ApproveArray = JSON.parse(ApproveArraystr);
    ApproveArray.forEach((element) => {
        j=element[0];
        k=element[1];
    });
    document.getElementById("Password").value=k;
    document.getElementById("Username").value=j;
}
})

function dlt(){
    item=0;
    ApproveArraystr = localStorage.getItem('Approve')
    ApproveArray = JSON.parse(ApproveArraystr);
    ApproveArray.splice(item, 1);
    localStorage.setItem('Approve', JSON.stringify(ApproveArray));
}