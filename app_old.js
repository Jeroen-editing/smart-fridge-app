/* ************************* Set Recipe object ********************* */
class Recipe {
    constructor(id, title, photo, ingredients, summary, instructions) {
        this.id = id;
        this.title = title;
        this.photo = photo;
        this.ingredients = ingredients;
        this.summary = summary;
        this.instructions = instructions;

        this.getId = () => {return this.id;}
        this.getTitle = () => {return this.title;}
        this.getPhoto = () => {return this.photo;}
        this.getIngredients = () => {return this.ingredients;}
        this.getSummary = () => {return this.summary;}
        this.getInstructions = () => {return this.instructions;}
    }
}
/* ------------------------- random order recipes ------------------ */
let first_recipes = [];
let second_recipes = [];

const getRandomNrs = () => {
    let a = Math.floor(Math.random() * 4);
    let b = Math.floor(Math.random() * 4);
    while(a === b) {
        b = Math.floor(Math.random() * 4);
    }
    if (a < b) {
        first_recipes.push(a, b);
    } else {
        first_recipes.push(b, a);
    }
    let recipeNumbers = [0, 1, 2, 3];
    const arrRemove = (arr, value) => {
        return arr.filter((ele) => {
            return ele != value;
        })
    }
    let remove = arrRemove(recipeNumbers, first_recipes[0]);
    remove = arrRemove(remove, first_recipes[1]);
    second_recipes.push(remove[0], remove[1]);
}

/* ************************* Variables ***************************** */
const form_btn = getById("searchBtn");
const form = getById("ingredientInput");
const reset_btn = getById("resetBtn");
const search_recipes_btn = getById("searchRecipesBtn");
const chefs_btn = getById("chefBtn");
const recipes_btn = getById("recipesBtn");

const spoonacular = "https://api.spoonacular.com/";
const check_ingredients = "food/ingredients/autocomplete?query=";
const amount_ingredients = "&number=6&sort=popularity&sortDirection=desc";
const photo_search = "https://api.spoonacular.com/cdn/ingredients_100x100/";
const recipe = "recipes/findByIngredients?ingredients=";
const amount_recipes = "&number=4&ranking=1"
const getInstructions = "/analyzedInstructions"
//const api_key =  "&apiKey=698d5a3b8bd44c21bc35c0d1227ef37d";
const api_key =  "&apiKey=698d5a3b8bd44c21bc35c0d1227ef37d";
const api_key_spec = "?apiKey=c4a09f5e457a454892e45c799796bef0 ";

const selection_box = getById("searchResult");
const fridge_box = getById("inFridge");

const recipeBox_one = getById("recipeOne");
const recipeBox_two = getById("recipeTwo");

let inFridge = [];
let ingredients_list = [];

/* ************************* Functions ***************************** */

/* ------------------------- Show ingredienst ---------------------- */
const showIngredients = (event) => {
    event.preventDefault();

    let input = (form.value).toLowerCase();
    
    fetch(`${spoonacular}${check_ingredients}${input}${amount_ingredients}${api_key}`)

        .then(ingredients => {
            if (ingredients.ok === false) {
                throw('Please check correct food name/id again!');
            }
            return ingredients.json();
        })
        .then(ingredients => {

            let ingr_selection = [];
            let searchArr = Array.from(ingredients);

            selection_box.innerHTML = '';

            let selectBtns = ["BtnOne", "BtnTwo", "BtnThree", "BtnFour", "BtnFive", "BtnSix"];

            for(let i = 0; i < searchArr.length; i++) {
                let image = `https://spoonacular.com/cdn/ingredients_100x100/${searchArr[i].image}`;
                let name = searchArr[i].name;
                let info_template = `<div class="ingredientImgBox" id="ingImgBox">
                                        <img class="ingredientImg" id="ingImg" src="${image}" alt="">
                                    </div>
                                    <div class="ingredientName" id="ingName">${name}</div>`
                let selection_template = `<div class="ingredient ingrVisible" id="${selectBtns[i]}">${info_template}</div>`;           
                ingr_selection.push(selection_template);
            }
            selection_box.innerHTML = ingr_selection.join('');
            
            let selectBtn_One = getById(selectBtns[0]);
            let selectBtn_Two = getById(selectBtns[1]);
            let selectBtn_Three = getById(selectBtns[2]);
            let selectBtn_Four = getById(selectBtns[3]);
            let selectBtn_Five = getById(selectBtns[4]);
            let selectBtn_Six = getById(selectBtns[5]);

            const deselectIng = (deselect_btn, select_btn) => {
                deselect_btn.addEventListener("click", () => {
                    fridge_box.removeChild(deselect_btn);
                    select_btn.classList.replace("ingrHidden", "ingrVisible");
                })
            }
            const selectIng = (select_btn) => {
                select_btn.addEventListener("click", () => {
                    deselect_btn = select_btn.cloneNode(true);
                    deselect_btn.id = `ingr${deselect_btn.id}`;
                    fridge_box.appendChild(deselect_btn);
                    select_btn.classList.replace("ingrVisible", "ingrHidden");
                    deselect_btn.classList.replace("ingredient", "myIngredient");

                    search_recipes_btn.classList.replace("buttonOnload", "buttonVisible");

                    deselectIng(deselect_btn, select_btn);
                })
            }
            selectIng(selectBtn_One);
            selectIng(selectBtn_Two);
            selectIng(selectBtn_Three);
            selectIng(selectBtn_Four);
            selectIng(selectBtn_Five);
            selectIng(selectBtn_Six);
        })
}

/* ------------------------- Form + Button Controls ----------------- */
form_btn.addEventListener("click", (event) => {
    showIngredients(event);
})
form.addEventListener("submit", (event) => {
    showIngredients(event);
})
form.addEventListener("search", (event) => {
    showIngredients(event);
})
// resets without relaoding, cause template(innerHtml) is stored
reset_btn.addEventListener("click", () => {
    inFridge = [];
    form.value = '';
    ingredients_selection.innerHTML = '';
    fridge_box.innerHTML = '';

    search_recipes_btn.classList.replace("buttonVisible", "buttonOnload");
    chefs_btn.classList.replace("buttonVisible", "buttonOnload");
    recipes_btn.classList.replace("buttonVisible", "buttonOnload");
})

/* ------------------------- Get ingredients function -------------- */
const ingredientInput = (part) => {
    let ingredients = [];
    for (let j = 0; j < part.usedIngredients.length; j++) {
        ingredients.push(part.usedIngredients[j].name);
    }
    for (let k = 0; k < part.missedIngredients.length; k++) {
        ingredients.push(part.missedIngredients[k].name);
    }
    let ing_items = [];
    for (let l = 0; l < ingredients.length; l++) {
        if (ingredients[l] != ingredients[l - 1]) {
        ing_items.push(`<div class="ingr"><img src="assets/icons/square.png" alt=""><p>${ingredients[l]}</p></div>`);
        }
    }
    return ing_items;
}

/* ------------------------- Fetch recipes | Set object------------- */
let chef_one = new Recipe();
let chef_two = new Recipe();
let recipe_three = new Recipe();
let recipe_four = new Recipe();


const searchRecipesDetails = (list) => {

    const createObjects = (recipesObj, nrs1_2, nrs3_4, summaries) => {
        console.log(first_recipes, second_recipes);

        let random_one = recipesObj[first_recipes[0]];
        let random_two = recipesObj[first_recipes[1]];
        let random_three = recipesObj[second_recipes[0]];
        let random_four = recipesObj[second_recipes[1]];

        /* ---------- Get summary function ---------- */
        const setObject = (object, random, summaries) => {
            //console.log(summaries);
            object.id = `${random.id}`;
            object.title = `${random.title}`;
            object.photo = `${random.image}`;
            object.ingredients = `${ingredientInput(random)}`;
            //object.summary = `${summaries[nr].summary}`;
            object.summary = fetchSummary(random.id);
            object.instructions = "";
        }

        setObject(chef_one, random_one);
        console.log(chef_one);
        console.log(random_two);
        console.log(random_three);
        console.log(random_four);
    }

    const fetchSummary = (id) => {
        //let summary = []
        let element = "";
        fetch(`${spoonacular}recipes/${id}/summary${api_key_spec}`)

            .then(info =>  info.json())
            .then(infoData => {
                element += (infoData.summary).trim();
                console.log(element);
                return element;
            })
            //console.log(summary);
            .catch(error => console.warn(error));
        return element;
    }

    const fetchRecipes = (list) => {
        let recipes = [];
        ingredients_list = list.join(',+');
        //console.log(ingredients_list);
        //console.log(first_recipes, second_recipes);
    
        fetch(`${spoonacular}${recipe}${ingredients_list}${amount_recipes}${api_key}`)
    
            .then(response => {
                return response.json();
            })
            .then(response => {
                //console.log(response);
                recipes = response;
                //console.log(recipes);

                for (let m = 0; m < recipes.length; m++) {
                    let id = recipes[m].id;

                    fetchSummary(id);
                }

                createObjects(recipes, first_recipes, second_recipes);
            })
    }
    fetchRecipes(list);
}

/* ------------------------- Search Recipes button ----------------- */
search_recipes_btn.addEventListener("click", () => {
    fridge_box.querySelectorAll(".myIngredient").forEach((ingredient) => {
        inFridge.push(ingredient.innerText);
    })
    //console.log(inFridge);
    searchRecipesDetails(inFridge);
    getRandomNrs();
    search_recipes_btn.classList.replace("buttonVisible", "buttonOnload");
    chefs_btn.classList.replace("buttonOnload", "buttonVisible");
    recipes_btn.classList.replace("buttonOnload", "buttonVisible");
})

/* ------------------------- Checj screenWidth --------------------- */
let innerwidth = recipeBox_one.clientWidth;
let recipeWidth;
if (innerwidth > 580) {
    recipeWidth = "big";
} else {
    recipeWidth = "small";
}