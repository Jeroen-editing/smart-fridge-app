//const get_ById = (id) => (document.getElementById(id));

let translation = [];
let inFridge = [];

const spoonacular = "https://api.spoonacular.com/";
const ingredients_list = [];
const check_ingredients = "food/ingredients/autocomplete?query=";
const amount_ingredients = "&number=6&sort=popularity&sortDirection=desc"
const photo_search = "https://api.spoonacular.com/cdn/ingredients_100x100/"
const recipe = "recipes/findByIngredients?ingredients=";
//const instructions = "/analyzedInstructions"
const api_key =  "&apiKey=698d5a3b8bd44c21bc35c0d1227ef37d";

const ingredient_selection = getById("search_result");

const searchIngredients = (event) => {
    event.preventDefault();

    let input = (getById("ingredientInput").value).toLowerCase();

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

            let template = getById("tpl_ingredient");
            ingredient_selection.innerHTML = '';

            for(let i = 0; i < searchArr.length; i++) {
                let clone = template.content.cloneNode(true);
                let ingredient_image = "https://spoonacular.com/cdn/ingredients_100x100/" + searchArr[i].image;
                let ingredient_name = searchArr[i].name;
                let image_string = ingredient_image.toString();
                let image_holder = clone.querySelector("#ingredient_Img");
                
                if (image_string.includes(".png")) {
                    image_holder.src = ingredient_image;
                    image_holder.style.background = "white";
                } else {
                    image_holder.src = ingredient_image;
                }
                clone.querySelector("#ingredient_Name").innerHTML = ingredient_name;
                ingredient_selection.appendChild(clone);
            }
        })

} 

const form_btn = getById("search_btn");
console.log(form_btn);
form_btn.addEventListener("click", (event) => {
    searchIngredients(event);
})