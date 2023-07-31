function checkToken(){
    $.ajax({
        type:'POST',
        url:'/refreshToken',
        headers:{
            "auth": sessionStorage.email + " " + sessionStorage.token
        },
        success: function(res){
            if(res.code == -1){
                window.document.location.href = "../login.html"
            }

            sessionStorage.setItem('token', res.token)
            return;
        }
    })
}

function setPlaceholders(){ // for profile page
    $.ajax({
        type:'GET',
        url:'/user/self',
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
            url:'/admin',
            headers:{
                "auth": sessionStorage.email + " " + sessionStorage.token
            },
            success: function(res){
                if(res.code == -1){
                    window.document.location.href = "../index.html"
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
            url:'/users/all',
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

function refreshToken(){

}