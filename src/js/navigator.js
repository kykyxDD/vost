$(document).ready(function() {
    $('.scroll-down').click(function(){
        scrollToElem("#tours")
    })

    $('.nav-link').click(function(e){
        clickNavLink(e.currentTarget)
    })

    $('.logo').click(function(e){
        clickNavLink(e.currentTarget)
    })
})

function scrollToElem(tag){
    $('html, body').animate({
        scrollTop: $(tag).offset().top
    }, 1000);
}
function clickNavLink(elem) {
    const hash = elem.hash

    if($(hash) && $(hash)[0]) {
        scrollToElem(hash)
    } else {
        window.location = elem.href
    }
}