const header = document.getElementsByTagName("header")[0]
const nav = document.getElementsByTagName("nav")[0]

function hamburgerMenu() {
    if (document.body.clientWidth < 1024 && header.getElementsByTagName("img")[1] == undefined) {
        let hamburger = document.createElement("img")
        hamburger.src = '/hamburger.svg'
        hamburger.style.width = '30px'
        hamburger.addEventListener("click", () => {
            nav.style.width = '100%'
            nav.style.right = '0'
            no_scroll()
        })
        header.appendChild(hamburger)
    } else if (document.body.clientWidth >= 1024 && header.getElementsByTagName("img")[1] != undefined) {
        header.getElementsByTagName("img")[1].remove()
    }
}
hamburgerMenu()

window.addEventListener('resize', hamburgerMenu, false);

nav.addEventListener("click", (e) => {
    if (e.target.tagName == 'NAV') {
        nav.style.width = '300px'
        nav.style.right = '-305px'
        return_scroll()
    }
})

function no_scroll() {
    document.addEventListener("mousewheel", scroll_control, { passive: false });
    document.addEventListener("touchmove", scroll_control, { passive: false });
}
function return_scroll() {
    document.removeEventListener("mousewheel", scroll_control, { passive: false });
    document.removeEventListener('touchmove', scroll_control, { passive: false });
}
function scroll_control(event) {
    event.preventDefault();
}
