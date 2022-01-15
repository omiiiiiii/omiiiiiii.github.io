
window.addEventListener('load',() => {
    if (localStorage.getItem('ApproveJson') == null) {
        ApproveJsonArray = [];
        localStorage.setItem('ApproveJson', JSON.stringify(ApproveJsonArray))
    }
    else {
        ApproveJsonArraystr = localStorage.getItem('ApproveJson')
        ApproveJsonArray = JSON.parse(ApproveJsonArraystr);
    
    }
    ApproveJsonArray.forEach((element,index)=>{
        // alert(element[2]);
        d1=element[2];
        // .replace(/-/g, '\/') added beacuse formate of yyyy-mm-dd giving date of yesterday
        date1 = new Date(d1.replace(/-/g, '\/'));
        date2 = new Date();
        if(date1<=date2){
                ApproveJsonArray.splice(index, 1)
                localStorage.setItem('ApproveJson', JSON.stringify(ApproveJsonArray))
            }
    })

    var tablebody = document.getElementById('tbody')
    let str = "";
    ApproveJsonArray.forEach((element, index) => {
        str += `
                <tr> 
                        <th>${index + 1}</th>
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td>${element[2]}</td>
                        <td>${element[3]}</td>
                        <td>${element[4]}</td>
                        <td>${element[5]}</td>
                        <td><a href="enroll/${element[0]}"><button class="btn" id="enrollbtn">enroll</button></a></td>
                </tr>`   
    });
    tablebody.innerHTML=str;
})



