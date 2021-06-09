/*
const getById = (id) => (document.getElementById(id));

const moving_nav = getById("top_nav");
const page_one = getById("section_one");
const nav_btn = getById("nav_btn");

const moveNavUp = (sec, delay, btn) => {
    page_one.style.marginTop = "38px";
    moving_nav.style.animation = `${sec}s navSlideUp forwards`;
    moving_nav.style.animationDelay = `${delay}s`;
    page_one.style.animation = `${sec}s pageMoveUp forwards`;
    page_one.style.animationDelay = `${delay}s`;
    nav_btn.style.visibility = "visible";
    nav_btn.style.animation = `${sec}s fadeIn forwards`;
    nav_btn.style.animationDelay = `${btn}s`
}
const moveNavDown = (sec) => {
    moving_nav.style.animation = `${sec}s navSlideDown forwards`;
    page_one.style.animation = `${sec}s pageMoveDown forwards`;
    nav_btn.style.animation = `${sec}s fadeOut forwards`;
    nav_btn.style.visibility = "hidden";
}

window.onload = () => {moveNavUp(3,3,5)}

nav_btn.addEventListener("click",  () => {
    moveNavDown(1);
    setTimeout(() => {moveNavUp(3,2,4)}, 1000)
    //moveNavUp();
})
*/