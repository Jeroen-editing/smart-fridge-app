const getById = (id) => (document.getElementById(id));

const page = getById("body");
const moving_nav = getById("topNav");
const sect_one = getById("sectionOne");
const nav_btn = getById("navBtn");
const search_btn = getById("searchBtn");
const reload_btn = getById("resetBtn");
const name_btn = getById("nameBtn");

const menu_img = getById("menuImg");
const arrow_img = getById("arrowImg");
const search_img = getById("searchImg");
const relaod_img = getById("resetImg");

const top_sect = getById("topCol");
const bottom_sect = getById("bottomCol");

const bot_nav = getById("bottomNav");
const up_btn = getById("upBtn");

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
    //document.body.scrollTop = 0;
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

const checkWindow = () => {
    const small_bg = "url(./assets/img/bgPhotoSmall.jpg) no-repeat";
    const normal_bg = "url(./assets/img/bgPhotoNormal.jpg) no-repeat";
    const wide_bg = "url(./assets/img/bgPhotoWide.jpg) no-repeat";
    const original_bg = "url(./assets/img/bgPhotoOriginal.jpg) no-repeat";

    let win_width = window.innerWidth;
    let win_height = window.innerHeight;

    if (win_width < 415) {
        //top_sect.style.background = small_bg;
        //top_sect.style.backgroundSize = "cover";
        body.style.background = normal_bg;
        body.style.backgroundSize = "cover";
        recipeBox_one.style.background = small_bg;
        recipeBox_one.style.backgroundSize = "cover";
        recipeBox_two.style.background = small_bg;
        recipeBox_two.style.backgroundSize = "cover";
    } else if (win_width >= 415 && win_width < 799) {
        //top_sect.style.background = normal_bg;
        //top_sect.style.backgroundSize = "cover";
        body.style.background = original_bg;
        body.style.backgroundSize = "cover";
        recipeBox_one.style.background = normal_bg;
        recipeBox_one.style.backgroundSize = "cover";
        recipeBox_two.style.background = normal_bg;
        recipeBox_two.style.backgroundSize = "cover";
    }  else if (win_width >= 800 && win_width < 991) {
        //top_sect.style.background = normal_bg;
        //top_sect.style.backgroundSize = "cover";
        body.style.background = original_bg;
        body.style.backgroundSize = "cover";
        recipeBox_one.style.background = wide_bg;
        recipeBox_one.style.backgroundSize = "cover";
        recipeBox_two.style.background = wide_bg;
        recipeBox_two.style.backgroundSize = "cover";
        bottom_sect.style.background = "none";
    } else if (win_width >= 992) {
        //top_sect.style.background = "none";
        body.style.background = wide_bg;
        body.style.backgroundSize = "cover";
        recipeBox_one.style.background = "none";
        //recipeBox_one.style.backgroundSize = "cover";
        recipeBox_two.style.background = "none";
        //recipeBox_two.style.backgroundSize = "cover";
        bottom_sect.style.background = "none";
        //sect_one.style.background = wide_bg;
        //sect_one.style.backgroundSize = "cover";
    }

    /*
    let recipe_two = getById("recipeTwo");
    let fridge = getById("fridge");
    let greenBorder = "1px solid #014040";
    if (win_width > 1199) {
        fridge.style.marginTop = "-2px";
        fridge.style.borderLeft= greenBorder;
        recipe_two.style.marginTop = "-2px";
        recipe_two.style.borderLeft= greenBorder;
    }
    */
}
const scrollFunction = () => {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      bot_nav.style.opacity = "1";
    } else {
      bot_nav.style.opacity = "0";
    }
  }
window.onscroll = () => { scrollFunction() }