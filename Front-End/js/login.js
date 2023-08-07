/*CONDITIONS:
1. For Login button to activate pw must at least be 8 chars and mail
must be in the right format. 
2. If one of the fields is left empty and you press login then "Please
fill all fields" error message pops up.
3.If mail format is not correct and you press login button then appropriate
error message pops up.
4.If password is less than 8 chars gives appropriate error message.
5. For now since the application is not linked to a database you can't login!
It will always give an error message!*/

$(function(){
    var txt
    var a
    $(".btn").click(function(){
        var txt_mail= $("#mail").val();
        var txt_pw= $("#pw").val();
        let warn = $('#warning');
        if(txt_mail!='' && txt_pw!=''){
            //berkin
            $.ajax({
                type:'POST',
                url:'http://localhost:3000/login',
                headers:{
                    "Authorization": "Basic " + btoa(txt_mail + ':' + txt_pw)
                },
                success: function (res){
                    if(!res){
                        alert('System error!');
                        return;
                    }
                    if(res.code && res.code === 0){
                        $("#warning").css("display", "flex");
                        $("#warning_classified").contents().remove();
                        $("#warning_classified").append(res.message);
                        return;
                    }
                    sessionStorage.setItem('email', txt_mail);
                    sessionStorage.setItem('token', res.token);
                    sessionStorage.setItem('id', res.id)
                    window.document.location.href = "http://127.0.0.1:3000/index.html"
                }
            })
        }
        return
            //
            //all fields are filled
            $("#warning_classified").contents().remove();
            $("#warning_classified").append("Login error");
        // }else{
        //     $("#warning").css("display", "flex");
        //     $("#warning_classified").contents().remove();
        //     $("#warning_classified").append("Please fill all fields!");
        // }
        // if(warning_format_mail==true){
        //     $("#mail_icon").css("color", "#AE2D5D");
        //     $("#warning_classified").append("<li>Email format is invalid!</li>")
        // }

        // if (warning_pw==true){
        //     $("#pw_icon").css("color", "#AE2D5D");
        //     $("#warning_classified").append("<li>Password at least 8 chars!</li>")
        // }
        /*if password or username doesnt have a match in the database */
    //     $("#warning").css("display", "flex");
    //     /*$("#warning_classified").append("Incorrect username or password!");*/
        
    // })
    var warning_format_mail=false;
    var warning_pw=false;

    var error_mail=false;
    var error_pw=false;
    var login_button_mail=false;
    var login_button_pw=false;
    $("#mail").focusout(function(){
        check_mail();
        check_login();
    })
    $("#pw").focusout(function(){
        check_pw();
       check_login();
    })
    function check_mail(){
        var pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        txt = $("#mail").val()
        if (pattern.test(txt) && txt !== ''){
            //alert("aferin")
            login_button_mail=true;
            warning_format_mail=false;
        }else if(pattern.test(txt)==false){
            warning_format_mail=true;
        }else{
            //alert("only chars")
            error_mail=true;
        }
        if (txt==''){
            $("#mail_icon").css("color","#aaa");
            sign_button_mail=false;
            warning_format_mail=false;
        }
    }

    function check_pw(){
        var pw_length = $("#pw").val().length;
        a = $("#pw").val()
        if (pw_length < 8){
            //alert("at least 8 chars")
            warning_pw=true;
            error_pw=true;
        }else{
            //alert(pw_length);
            login_button_pw=true;
            warning_pw=false;
        }
        if (a==''){
            $("#pw_icon").css("color","#aaa");
            login_button_pw=false;
            warning_pw=true;
        }
    }

    function check_login(){
        if (login_button_mail==true && login_button_pw==true){
            $(".btn").css({"background": "#B1E457", "color": "#212936"});

        }else{
            $(".btn").css({"background": "rgba(67, 67, 103, 0.695)", "color": "#6C727F"});
        }
        
    }

    $(".btn").submit(function(){
        /*first assign all error_... s to false then call check_... functions then
        if all errors are false registration is successfull, return true*/
    })

    /*Change icon color in input field on focus */
    $("#mail").focusin(function(){
        $("#mail_icon").css("color","#B1E457");
    })
    $("#pw").focusin(function(){
        $("#pw_icon").css("color","#B1E457");
    })

})})