const getById = (id) => (document.getElementById(id));

const page = getById("body");
const moving_nav = getById("topNav");
const section = getById("section");
const nav_btn = getById("navBtn");
const search_btn = getById("searchBtn");
const reload_btn = getById("resetBtn");
const name_btn = getById("nameBtn");

const menu_img = getById("menuImg");
const arrow_img = getById("arrowImg");
const search_img = getById("searchImg");
const relaod_img = getById("resetImg");

const recipe_nav = getById("recipeNav");

const bot_nav = getById("upNav");
const up_btn = getById("upBtn");

const moveNavUp = (sec, delay, btn) => {
    moving_nav.style.animation = `${sec}s navSlideUp forwards`;
    moving_nav.style.animationDelay = `${delay}s`;
    section.style.animation = `${sec}s pageMoveUp forwards`;
    section.style.animationDelay = `${delay}s`;
    nav_btn.style.visibility = "visible";
    nav_btn.style.animation = `${sec}s fadeIn forwards`;
    nav_btn.style.animationDelay = `${btn}s`;
    mealType_btn.style.animation = `${sec}s fadeIn forwards`;
    mealType_btn.style.animationDelay = `${btn}s`;
}
const moveNavDown = (sec) => {
    moving_nav.style.animation = `${sec}s navSlideDown forwards`;
    section.style.animation = `${sec}s pageMoveDown forwards`;
    nav_btn.style.animation = `${sec}s fadeOut forwards`;
    nav_btn.style.visibility = "hidden";
    mealType_btn.style.animation = `${sec}s fadeOut forwards`;
    document.documentElement.scrollTop = 0;
}

//window.onload = () => {moveNavUp(3,3,5)}

const activateMoveUp = (btn) => {
    btn.addEventListener("click",  () => {
        moveNavDown(1);
        setTimeout(() => {moveNavUp(3,2,4)}, 1000)
        //moveNavUp();
    });
}
activateMoveUp(nav_btn);
activateMoveUp(name_btn);
activateMoveUp(up_btn);

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
reload_btn.addEventListener("mouseover", () => {
    relaod_img .src = "./assets/icons/refresh_yellow.png";
})
reload_btn.addEventListener("mouseout", () => {
    relaod_img .src = "./assets/icons/refresh_green.png";
})

const bordersGreen = "2px solid #013d3d"
const scrollFunction = () => {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      bot_nav.style.opacity = "1";
    } else {
      bot_nav.style.opacity = "0";
    }
    if (document.body.scrollTop > 528 || document.documentElement.scrollTop > 528) {
        recipe_nav.style.position = "fixed";
        recipe_nav.style.border = "none";
    } else {
        recipe_nav.style.position = "relative";
        recipe_nav.style.borderTop = bordersGreen;
        recipe_nav.style.borderBottom = bordersGreen;
    }
    console.log(document.body.scrollTop + " - " + document.documentElement.scrollTop)
}

window.onscroll = () => {
    scrollFunction();
}