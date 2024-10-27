window.onload = function () {
    const menu_btn = document.querySelector('.hamburger');
    const nav = document.querySelector('.navbar');
    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        nav.classList.toggle('is-active');
    })
}