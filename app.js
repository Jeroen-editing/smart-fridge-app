//const get_ById = (id) => (document.getElementById(id));

let translation = [];
let inFridge = [];

const form_btn = getById("searchBtn");
const form = getById("ingredientInput");
const reset_btn = getById("resetBtn");
const chef_btn = getById("chefBtn");

const spoonacular = "https://api.spoonacular.com/";
const ingredients_list = [];
const check_ingredients = "food/ingredients/autocomplete?query=";
const amount_ingredients = "&number=6&sort=popularity&sortDirection=desc"
const photo_search = "https://api.spoonacular.com/cdn/ingredients_100x100/"
const recipe = "recipes/findByIngredients?ingredients=";
//const instructions = "/analyzedInstructions"
const api_key =  "&apiKey=698d5a3b8bd44c21bc35c0d1227ef37d";

const ingredients_selection = getById("searchResult");
const fridge = getById("inFridge");

const template = getById("tplIngredient");
console.log(template);
console.log(typeof(template));

const searchIngredients = (event) => {
    event.preventDefault();

    let input = (form.value).toLowerCase();
    console.log(input);
    
    fetch(`${spoonacular}${check_ingredients}${input}${amount_ingredients}${api_key}`)

        .then(response => {
            if (response.ok === false) {     // fail to fetch(1st) => go to .catch part (at the end)
                throw('Please check correct food name/id again!');
            }
            return response.json();
        })
        .then(ingredients => {

            let searchArr = Array.from(ingredients);
            console.log(searchArr);

            ingredients_selection.innerHTML = '';

            for(let i = 0; i < searchArr.length; i++) {
                let clone = template.content.cloneNode(true);
                let image_box = clone.querySelector("#ingImgBox");
                let image = image_box.querySelector("#ingImg");
                image.src = "https://spoonacular.com/cdn/ingredients_100x100/" + searchArr[i].image;
                clone.querySelector("#ingName").innerHTML = searchArr[i].name;
                ingredients_selection.appendChild(clone);
            }

            document.querySelectorAll(".ingredient").forEach((ingredient) => {
                ingredient.addEventListener("click", (event) => {
                    event.preventDefault();

                    if(ingredient.classList.contains("myIngredient")) {
                        ingredient.remove();
                        let ing_to_remove = ingredient.innerText.trim();
                        inFridge = inFridge.filter(item => item !== ing_to_remove);
                        console.log("in fridge after removing", inFridge);
                        return;
                    }

                    ingredient.classList.replace("ingredient", "myIngredient");
                    inFridge.push(ingredient.innerText.trim());
                    fridge.appendChild(ingredient);
                    console.log("in fridge new", inFridge);
                });
            });
        })
}

form_btn.addEventListener("click", (event) => {
    searchIngredients(event);

    form.addEventListener("search", () => {
        ingredients_selection.innerHTML = '';
        // don't think this is neccasary, but... -> cause template(innerHtml) is stored
        ingredients_selection.innerHTML = template;
    })
})
form.addEventListener("submit", (event) => {
    searchIngredients(event);

    form.addEventListener("search", () => {
        ingredients_selection.innerHTML = '';
        // don't think this is neccasary, but... -> cause template(innerHtml) is stored
        ingredients_selection.innerHTML = template;
    })
})




// resets works ithout relaoding, cause template(innerHtml) is stored
reset_btn.addEventListener("click", () => {
    inFridge = [];
    form.value = '';
    ingredients_selection.innerHTML = '';
    fridge.innerHTML = '';
})