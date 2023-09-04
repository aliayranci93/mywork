function checkToken(){
    $.ajax({
        type:'POST',
        url:'http://localhost:3000/refreshToken',
        headers:{
            "auth": sessionStorage.email + " " + sessionStorage.token
        },
        success: function(res){
            if(res.code == -1){
                window.document.location.href = "./login.html"
            }

            sessionStorage.setItem('token', res.token)
            return;
        }
    })
}

function setPlaceholders(){ // for profile page
    // GET POST olarak değiştirildi id yolluyoruz
    $.ajax({
        type:'POST',
        url:'http://localhost:3000/user/self',
        data:JSON.stringify({id:sessionStorage.getItem('id')}),
        processData: false,
        contentType:'application/json',
        headers:{
            "auth": sessionStorage.email + " " + sessionStorage.token
        },
        success: function(res){
            let username = $('#username');
            let email = $('#email');
            let phone = $('#phone');
            username.attr('placeholder', res.name);
            email.attr('placeholder', res.email);
            phone.attr('placeholder', res.phone);
        }
    })
}
async function checkAdmin(){
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            url:'http://localhost:3000/admin',
            headers:{
                "auth": sessionStorage.email + " " + sessionStorage.token
            },
            success: function(res){
                if(res.code == -1){
                    window.document.location.href = "./index.html"
                    reject()
                }
                resolve();
            }
        })
    })
}

async function getAllUsers(){
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            url:'http://localhost:3000/users/all',
            headers:{
                "auth": sessionStorage.email + " " + sessionStorage.token
            },
            success: function(res){
                if(res.code == -1){
                    reject("An error occured!");
                }
                resolve(res);
            }
        })
    })
}

async function updateTable(){
    let users_data = await getAllUsers();
        let usersTable = $('.user-table')
        users_data.forEach(user => {
            usersTable.append(`\
                <tr class="item">
                    <th id="${user.id}" class="id element">${user.id}</th>
                    <th id="${user.id}" class="name element">${user.name}</th>
                    <th id="${user.id}" class="phone element">${user.phone}</th>
                    <th id="${user.id}" class="job element">${user.job}</th>
                    <th id="${user.id}" class="email element">${user.email}</th>
                    <th><button class="user-buttons  edit-button" type="button" id="${user.id}">EDIT</button><button class="user-buttons delete-button" type="button" id="${user.id}">DELETE</button></th>
                </tr>
                `);
        })
}