/*CONDITIONS:
1. For Sign Up button to activate, all fields must be filled, pw must
at least be 8 chars and mail must be in the right format. 
2. If one of the fields is left empty and you press Sign Up then "Please
fill all fields" error message pops up.
3.If mail format is not correct and you press login button then appropriate
error message pops up.
4.If password is less than 8 chars gives appropriate error message.
5.If confirmed password does not match password field than appropriate error
message pops up.
6.For username field you can olny use characters and if it's not filled with
only chars then appropriate error message pops up.
7. For now since the application is not linked to a database you can't sign up!
It will always give an error message!*/

//websocket 
const ws = new WebSocket('ws://localhost:3001'); 

$(function(){
    
    var txt;
    var a;
    var b;

    $(".btn").click(function(){
        var txt_name=$("#name").val();
        var txt_mail= $("#mail").val();
        var txt_pw= $("#pw").val();
        var txt_conf_pw=$("#pw_confirm").val();
        //verileri json haline getir
        let data = {
            name: txt_name,
            email: txt_mail,
            password: txt_pw,
            re_password: txt_conf_pw,
            //email damlanın account değiştirme kodu sonrası email değişecek
        }
        if(txt_mail!='' && txt_pw!='' && txt_name!='' && txt_conf_pw!='' ){
            $.ajax({
                type:'POST',
                url:'http://localhost:3000/register',
                data:JSON.stringify(data),
                processData: false,
                contentType:'application/json',
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
                    window.document.location.href = "/login.html"
                    ws.send(JSON.stringify({name: "dashboard/refreshUsers"}));
                }
            })
        //     //all fields are filled
        //     $("#warning_classified").contents().remove();
        //     $("#warning_classified").append("Registration error");
        // }else{
        //     $("#warning").css("display", "flex");
        //     $("#warning_classified").contents().remove();
        //     $("#warning_classified").append("Please fill all fields!");
        // }

        // if(warning_name==true){
        //     $("#name_icon").css("color", "#AE2D5D")
        //     $("#warning_classified").append("<li>only characters for username!</li>");
        // }

        // if(warning_mail==true){
        //     $("#mail_icon").css("color", "#AE2D5D");
        //     $("#warning_classified").append("<li>Email already in use, please use other.</li>")
        // }
        // if(warning_mail==false && sign_button_mail==true){
        //     $("#mail_icon").css("color","#B1E457");
        // }

        // if(warning_format_mail==true){
        //     $("#mail_icon").css("color", "#AE2D5D");
        //     $("#warning_classified").append("<li>Email format is invalid!</li>")
        // }

        // if(warning_pw==true){
        //     $("#pw_icon").css("color", "#AE2D5D");
        //     $("#warning_classified").append("<li>password is incorrect!</li>");
        // }

        // if(warning_conf_pw==true){
        //     $("#pw_conf_icon").css("color", "#AE2D5D");
        //     $("#warning_classified").append("<li>confirmed password is false</li>");
        // }

        // if (warning_pw==true){
        //     $("#pw_icon").css("color", "#AE2D5D");
        //     $("#warning_classified").append("<li>Password at least 8 chars!</li>")
        // }
        // /*if there are any errors */
        // $("#warning").css("display", "flex");
        // $("#log_container").css({"height": "fit-content", "transition": "0.3s"});
        
}})

    var warning_name=false;
    var warning_mail=false;
    var warning_format_mail=false;
    var warning_pw=false;
    var warning_conf_pw=false;
    
    var error_name=false;
    var error_mail=false;
    var error_pw=false;
    var error_conf_pw=false;
    var sign_button_name=false;
    var sign_button_mail=false;
    var sign_button_pw=false;
    var sign_button_conf_pw=false;
    $("#name").focusout(function(){
        check_name();
        check_login();
    })
    $("#mail").focusout(function(){
        check_mail();
        check_login();
    })
    $("#pw").focusout(function(){
        check_pw();
       check_login();
    })
    $("#pw_confirm").focusout(function(){
        check_pw_conf();
       check_login();
    })

    function check_name(){
        var pattern = /^[a-zA-Z]*$/; /*sudo patern */
        txt = $("#name").val()


        if (pattern.test(txt) && txt !== ''){
            //alert("aferin")
            warning_name=false;
            sign_button_name=true;
        }else if(pattern.test(txt)==false){
            warning_name=true;
        }
        else{
            //alert("only chars")
            error_name=true;
        }
        if (txt==''){
            $("#name_icon").css("color","#aaa");
            sign_button_name=false;
            warning_name=false;
        }
    }

    function check_mail(){
        var pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        txt = $("#mail").val()
        /*if mail is already in use (backend)
        warning_mail=true;*/
        
        
        if (pattern.test(txt) && txt !== ''){
            //alert("aferin")
            sign_button_mail=true;
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
        /*if pw is incorrect (backend)*/
        /*warning_pw=true;*/

        if (pw_length < 8){
            //alert("at least 8 chars")
            warning_pw=true;
            error_pw=true;
        }else{
            //alert(pw_length);
            sign_button_pw=true;
            warning_pw=false;
        }
        if (a==''){
            $("#pw_icon").css("color","#aaa");
            warning_pw=true;
            sign_button_pw=false;
        }
    }

    function check_pw_conf(){
        var pw_length = $("#pw_confirm").val().length;
        b = $("#pw_confirm").val()
        if (pw_length < 8){
            //alert("at least 8 chars")
            error_pw_conf=true;
        }else{
            //alert(pw_length);
            sign_button_conf_pw=true;
        }
        if (b==''){
            $("#pw_conf_icon").css("color","#aaa");
            sign_button_conf_pw=false;
        }
        /*confirm password is same as the pw field */
        if(b!==a){
            warning_conf_pw=true;
            sign_button_conf_pw=false;
        }else{
            warning_conf_pw=false;
        }
    }

    function check_login(){
        if (sign_button_name=true && sign_button_mail==true && sign_button_pw==true && sign_button_conf_pw==true){
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
    $("#name").focusin(function(){
        $("#name_icon").css("color","#B1E457");
    })
    $("#mail").focusin(function(){
        $("#mail_icon").css("color","#B1E457");
    })
    $("#pw").focusin(function(){
        $("#pw_icon").css("color","#B1E457");
    })
    $("#pw_confirm").focusin(function(){
        $("#pw_conf_icon").css("color","#B1E457");
    })

})