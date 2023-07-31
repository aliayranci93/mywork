$(function(){
    $(".list ul li").mouseenter(function(){
        $(this).addClass('deneme')
    }).mouseleave(function(){
        $(this).removeClass('deneme')
    })
})