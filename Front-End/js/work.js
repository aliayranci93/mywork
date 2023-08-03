$(function(){
    $(".list ul li").mouseenter(function(){
        $(this).addClass('deneme')
    }).mouseleave(function(){
        $(this).removeClass('deneme')
    })

    $(".menu").on("click", function(){
        var windowsize = $(window).width();
        //alert("deneme")
        if (windowsize < 550){
            //alert("woo")
            
        }
    })
})