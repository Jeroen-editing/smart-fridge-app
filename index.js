const getById = (id) => (document.getElementById(id));

const page = getById("main");
const moving_nav = getById("top_nav");
const sect_one = getById("section_one");
const nav_btn = getById("nav_btn");
const search_btn = getById("search_btn");

const menu_img = getById("menuImg");
const arrow_img = getById("arrowImg");
const search_img = getById("searchImg");

const top_sect = getById("topCol");
const bottom_sect = getById("bottomCol");

const moveNavUp = (sec, delay, btn) => {
    sect_one.style.marginTop = "38px";
    moving_nav.style.animation = `${sec}s navSlideUp forwards`;
    moving_nav.style.animationDelay = `${delay}s`;
    sect_one.style.animation = `${sec}s pageMoveUp forwards`;
    sect_one.style.animationDelay = `${delay}s`;
    nav_btn.style.visibility = "visible";
    nav_btn.style.animation = `${sec}s fadeIn forwards`;
    nav_btn.style.animationDelay = `${btn}s`
}
const moveNavDown = (sec) => {
    moving_nav.style.animation = `${sec}s navSlideDown forwards`;
    sect_one.style.animation = `${sec}s pageMoveDown forwards`;
    nav_btn.style.animation = `${sec}s fadeOut forwards`;
    nav_btn.style.visibility = "hidden";
}

window.onload = () => {moveNavUp(3,3,5)}

nav_btn.addEventListener("click",  () => {
    moveNavDown(1);
    setTimeout(() => {moveNavUp(3,2,4)}, 1000)
    //moveNavUp();
})

nav_btn.addEventListener("mouseover", () => {
    menu_img.src = "./assets/icons/menu_yellow.png";
    arrow_img.src = "./assets/icons/nav_arrow_yellow.png";
})
nav_btn.addEventListener("mouseout", () => {
    menu_img.src = "./assets/icons/menu_green.png";
    arrow_img.src = "./assets/icons/nav_arrow_green.png";
})
search_btn.addEventListener("mouseover", () => {
    search_img.src = "./assets/icons/search_yellow.png";
})
search_btn.addEventListener("mouseout", () => {
    search_img.src = "./assets/icons/search_green.png";
})

const checkWindow = () => {
    const small_bg = "url(./assets/img/bgPhotoSmall.jpg) no-repeat";
    const normal_bg = "url(./assets/img/bgPhotoNormal.jpg) no-repeat";
    const wide_bg = "url(./assets/img/bgPhotoWide.jpg) no-repeat";

    let win_width = window.innerWidth;
    let win_height = window.innerHeight;

    console.log(typeof(win_width, win_height));

    if (win_width < 415) {
        top_sect.style.background = small_bg;
        top_sect.style.backgroundSize = "cover";
        bottom_sect.style.background = small_bg;
        bottom_sect.style.backgroundSize = "cover";
    } else if (win_width >= 415 && win_width < 1025) {
        top_sect.style.background = normal_bg;
        top_sect.style.backgroundSize = "cover";
        bottom_sect.style.background = normal_bg;
        bottom_sect.style.backgroundSize = "cover";
    } else if (win_width >= 1025) {
        top_sect.style.background = "none";
        bottom_sect.style.background = "none";
        sect_one.style.background = wide_bg;
        sect_one.style.backgroundSize = "cover";
    }

    let recipe_two = getById("recipe_two");
    let fridge = getById("fridge");
    let greenBorder = "1px solid #014040";
    if (win_width > 1199) {
        fridge.style.marginTop = "-2px";
        fridge.style.borderLeft= greenBorder;
        recipe_two.style.marginTop = "-2px";
        recipe_two.style.borderLeft= greenBorder;
    }
}
checkWindow();