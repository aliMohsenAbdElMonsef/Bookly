function submitAddForm() {
    var title = document.getElementById("A-bookname").value.trim();
    var author = document.getElementById("A-author").value.trim();
    var category = document.getElementById("A-category").value.trim();
    var image = document.getElementById("A-image").files[0];
    var description = document.getElementById("A-description").value.trim();

    // Check for empty fields
    if (!title || !author || !category || !image || !description) {
        let alertElement = document.getElementById('alert');
        alertElement.innerHTML = `<p style="color:#c70808;font-size:12px">All fields are required</p>`;
        return;  // Stop form submission
    } 
    else {
        var xhr = new XMLHttpRequest();
        var url = "/api/create";
        var formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("category", category);
        formData.append("image", image);
        formData.append("description", description);
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var responseData = JSON.parse(xhr.responseText);
                let alertElement = document.getElementById('alert');
                if (xhr.status === 200) {
                    console.log(responseData);
                    alertElement.innerHTML = `<p style="color:green;font-size:12px">Book added successfully</p>`;
                    window.location.href='/books';
                } 
                else {
                    console.error("Error occurred: " + xhr.status);
                    alertElement.innerHTML = `<p style="color:#c70808;font-size:12px">${responseData.error}</p>`;
                }
            }
        };
        xhr.send(formData);
    }
}



// sign up form
function submitSignUpForm() {
    let username = document.getElementById("user_name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmpassword = document.getElementById("cPassword").value.trim();
    let roleChecked = document.querySelector('input[name="role"]:checked');
    let isadmin = roleChecked && roleChecked.value === "admin" ? true : false;

    // Check for empty fields
    if (!username || !email || !password || !confirmpassword || !roleChecked) {
        let alertElement = document.getElementById('alert');
        alertElement.innerHTML = `<p style="color:#c70808;font-size:12px;margin-top:-17px">All fields are required</p>`;
        return;  // Stop form submission
    }
    let alertElement = document.getElementById('alert');
    alertElement.innerHTML = ``;
    let reg1 = /\w+@gmail.com/;
    if (!reg1.test(email)) {
        let commint = document.getElementById("Email");
        commint.innerHTML = `<p style="color:#c70808;font-size:12px">Invalid Email</p>`;
        return;
        } 
    let commint = document.getElementById("Email");
    commint.innerHTML = ``;
    let reg2 = /[A-Z]/g;
    let reg3 = /[a-z]/g;
    let reg4 = /[0-9]/g;
    if (!reg2.test(password) || !reg3.test(password) || !reg4.test(password)) {
        let commint = document.getElementById("Password");
        commint.innerHTML = `<p style="color:#c70808;font-size:12px">weak password (password should contain uppercase letters, lowercase and numbers)</p>`;
        return;
    }
    let commint2 = document.getElementById("Password");
    commint2.innerHTML = ``;
    if(password !== confirmpassword){
        let ele = document.getElementById("pass");
        ele.innerHTML = `<p style="color:#c70808;font-size:12px">confirm password doesn't match password</p>`;
        return;  // Stop form submission
    }
    let ele = document.getElementById("pass");
    ele.innerHTML = ``;

    let xhr = new XMLHttpRequest();
    let url = '/api/signup';

    let data = {
        "username": username,
        "email": email,
        "password": password,
        "confirmpassword": confirmpassword,
        "isadmin": isadmin,
    }

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let alertElement = document.getElementById('alert');
            let responseData = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                console.log(responseData);
                alertElement.innerHTML = `<p style="color:green;font-size:12px">User signed up successfully</p>`;
            } else {
                console.error("Error occurred: " + xhr.status);
                alertElement.innerHTML = `<p style="color:#c70808;font-size:12px">${responseData.error || "Error occurred while adding user"}</p>`;
            }
        }
    };
    xhr.send(JSON.stringify(data));
}


// log in form
function loginForm() {
    let username = document.getElementById("user_name").value.trim();
    let password = document.getElementById("password").value.trim();
    let alertElement = document.getElementById('alert');
    if (!username || !password) {
        alertElement.innerHTML = `<p style="color:#c70808;font-size:12px">Both username and password are required</p>`;
        return;
    }
    let xhr = new XMLHttpRequest();
    let url = '/api/login';
    let data = {
        "username": username,
        "password": password,
    };

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                alertElement.innerHTML = `<p style="color:green;font-size:12px">User logged in successfully</p>`;
                window.location.href = '/';
            } else {
                console.error("Error occurred: " + xhr.status);
                var responseData = JSON.parse(xhr.responseText);
                alertElement.innerHTML = `<p style="color:#c70808;font-size:12px">Error occurred while user log in: ${responseData.error}</p>`;
            }
        }
    };

    xhr.send(JSON.stringify(data));
}

// log out form
function logoutfun(){
    let xhr = new XMLHttpRequest();
    let url ='/api/logout';
    xhr.open('POST',url,true);
    xhr.setRequestHeader("Content-Type","applicaton/json");
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            if(xhr.status===200){
                window.location.href='/login'
            }
            else{
                window.alert("error occurred while user log out");
            }
        }
    }
    xhr.send();
}
function search(){
    let y = document.querySelectorAll(".book");
    let searchinput=document.querySelector(".srch").value;
    for(let i=0;i<y.length;i++){
        booktitle=y[i].getAttribute("booktitle");
        bookcategory=y[i].getAttribute("bookcategory");
        bookauthor=y[i].getAttribute("bookauthor");
        console.log(y[i]);
        console.log(booktitle);
        console.log(bookcategory);
        console.log(bookauthor);
        console.log(searchinput);
        if(!(booktitle===searchinput)&&!(bookcategory===searchinput)&&!(bookauthor===searchinput))
        {
            y[i].style.display="none";
        }
        else
        {
            y[i].style.display="block";
        }
    }

}
var buttons = document.querySelectorAll('#button1');
let containers = document.querySelectorAll('.button-container');
containers.forEach(container => {
    let user_name = container.getAttribute('username');
    if (user_name === null || user_name === '') {
        container.style.display = "none";
    }
});

    var bookname;
    var username;
    buttons.forEach(function(button){
        button.onclick = function(event) {
            bookname=event.target.getAttribute("booktitle");
            username=event.target.getAttribute("username");
            userid=event.target.getAttribute("userid");
            let xhr =new XMLHttpRequest();
            let url='/api/borrow';
            xhr.open('POST',url,true);
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(xhr.status===200){
                    button.style.display="none";
                    window.location.assign(window.location.href);
                }
                else{
                    window.alert("error occurred while user borrow");
                }
            }
    }

    data={
        "bookname":bookname,
        "username":username,
        "userid":userid,
    }
    xhr.send(JSON.stringify(data));
        }
    });
    let cancelbuttons = document.querySelectorAll(".cancel-button");
    cancelbuttons.forEach(function(button){
        button.onclick=function(event){
            let user_name=event.target.getAttribute("username");
            let book_title=event.target.getAttribute("booktitle");
            let user_id = event.target.getAttribute("userid");
            let xhr = new XMLHttpRequest();
            xhr.open('POST','/api/unborrow',true);
            xhr.setRequestHeader("Content-Type","applicaton/json");
            xhr.onreadystatechange=function(){
                if(xhr.readyState===4){
                    if(xhr.status===200){
                        button.style.display="none";
                        window.location.assign(window.location.href);
                    }
                    else{
                        window.alert("error occurred while user unborrow");
                    }
                }
        }
        let data={
            "username":user_name,
            "book_title":book_title,
            "user_id":user_id
        }
        xhr.send(JSON.stringify(data));
        }
    });
    deletebuttons = document.querySelectorAll(".delete-button");
    deletebuttons.forEach(function(button){
        button.onclick=function(event){
            let bookname=event.target.getAttribute("booktitle");
            let xhr = new XMLHttpRequest();
            xhr.open('POST','/api/delete',true);
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.onreadystatechange=function(){
                if(xhr.readyState===4){
                    if(xhr.status===200){
                        window.location.assign(window.location.href);
                    }
                    else{
                        window.alert("error occurred while user delete operation");
                    }
                }
            }
            let data = {
                "booktitle":bookname
                }
                xhr.send(JSON.stringify(data));
        }
    });
    document.querySelectorAll(".edit-button").forEach(function(button) {
        button.onclick = function(event) {
            let bookid = event.target.getAttribute("bookid");
            let url = `/editbook/${bookid}/`;
            window.location.href = url;
        }
    });

    function save(){
        document.getElementById("save").onclick(function(event) {
            console.log("ali")
            event.preventDefault();
            let bookid = event.target.getAttribute("bookid")
            let url = `/api/edit`;
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                let alertElement = document.getElementById('alert');
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        alertElement.innerHTML = "book has been edited successfully";
                        // window.location.href = '/books';
                    } else {
                        console.error("Error occurred: " + xhr.status);
                        alertElement.innerHTML = `<p style="color:#c70808;font-size:12px">${responseData.error || "Error occurred while adding user"}</p>`;
                    }
                }
            }
            data= {
                "bookid":bookid,
                "title":document.getElementById("id_title").value,
                "author":document.getElementById("id_author").value,
                "category":document.getElementById("id_category").value,
                "description":document.getElementById("id_description").value,
            }
            xhr.send(JSON.stringify(data));
            
        }); 
        
    }
