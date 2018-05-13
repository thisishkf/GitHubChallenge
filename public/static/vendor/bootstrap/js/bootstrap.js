$('nav-tabs').find('li');

$('body').on('click', '.nav-tabs li', function(){
    $(this).toggle();
    $('.nav-tabs li').not($(this)).toggle();
});