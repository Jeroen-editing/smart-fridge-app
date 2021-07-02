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

let example = new Recipe();

example.id = "";
example.title = "<span>This is just an example!</span><br>Almond Chicken Salad";
example.photo = "./assets/img/salade.jpg";
let imgA = `<div class="ingr"><img src="assets/icons/square.png" alt=""><p>`;
example.ingredients =  `${imgA}green oninions</p></div>${imgA}large carrot</p></div>${imgA}snap peas</p></div>
                        ${imgA}fresh cilantro leaves </p></div>${imgA}chopped chicken breast meat</p></div>
                        ${imgA}blanched slivered almonds, toasted </p></div>${imgA}sesame oil </p></div>
                        ${imgA}teriyaki sauce</p></div>${imgA}dry mustard</p></div>
                        ${imgA}distilled white vinegar</p></div>${imgA}white sugar</p></div>${imgA}pepper</p></div>`;
example.summary = "This is a great summer salad that can be prepared ahead of time so you can enjoy the day.";
let imgB = `<div class="step"><img src="assets/icons/square.png" alt=""><p>`
example.instructions = `${imgB}In a large bowl, mix together the onions, carrot, red pepper, peas, chicken, 
                        cilantro and almonds. Set aside.</p></div>${imgB}In a small bowl, whisk together the sugar,
                        vinegar, sesame oil, teriyaki sauce and dry mustard until smooth. Pour over salad mixture and toss until
                        coated. Serve in pita pockets or on a bed of lettuce.</p></div>`;

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
//const api_key_spec =  "?apiKey=698d5a3b8bd44c21bc35c0d1227ef37d";
const api_key = "&apiKey=c4a09f5e457a454892e45c799796bef0"
const api_key_spec = "?apiKey=c4a09f5e457a454892e45c799796bef0";

const selection_box = getById("searchResult");
const temporary_box = getById("inTemporary");
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
                    temporary_box.removeChild(deselect_btn);
                    select_btn.classList.replace("ingrHidden", "ingrVisible");
                })
            }
            const selectIng = (select_btn) => {
                select_btn.addEventListener("click", () => {
                    deselect_btn = select_btn.cloneNode(true);
                    deselect_btn.id = `ingr${deselect_btn.id}`;
                    temporary_box.appendChild(deselect_btn);
                    select_btn.classList.replace("ingrVisible", "ingrHidden");
                    deselect_btn.classList.replace("ingredient", "selected");

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
const putInFridge = () => {
    document.querySelectorAll(".selected").forEach(button => {
        button.classList.replace("selected", "myIngredient");
        button.id = `my${button.id}`;
        let fridge_item = button.cloneNode(true);
        fridge_box.appendChild(fridge_item);
        temporary_box.removeChild(button);
    });
}

form_btn.addEventListener("click", (event) => {
    putInFridge(event);
    showIngredients(event);
})
form.addEventListener("submit", (event) => {
    putInFridge(event);
    showIngredients(event);
})
form.addEventListener("search", (event) => {
    putInFridge(event);
    showIngredients(event);
})

/* --- resets without relaoding, cause template(innerHtml) is stored --*/
reset_btn.addEventListener("click", () => {
    inFridge = [];
    form.value = '';
    selection_box.innerHTML = '';
    temporary_box.innerHTML = '';
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
/* ------------------------- Fetch summary ------------------------- */
const fetchSummary = (id, random) => {
    let text = "";
    fetch(`${spoonacular}recipes/${id}/summary${api_key_spec}`)

        .then(info => info.json())
        .then(infoData => {
            text = (infoData.summary).trim();
            random.push(text)
        })
        .catch(error => console.warn(error));
}
/* ------------------------- Fetch Instructions -------------------- */
const fetchInstructions = (id, random) => {
    let instructionsObj = [];
    let instrInput = [];

    fetch(`${spoonacular}recipes/${id}/analyzedInstructions${api_key_spec}`)

        .then(instructData => instructData.json())
        .then(instructData => {
            instructionsObj = Array.from(instructData);
            
            if (instructionsObj[0] != undefined) {
                let instrSteps = instructionsObj[0].steps;
                let instrInput = [];

                for (let m = 0; m < instrSteps.length; m++) {
                    instrInput.push(`<div class="step"><img src="assets/icons/square.png" alt="">
                    <p>${instrSteps[m].step}</p></div>`);
                }
                random.push(instrInput);
            } else {
                instrInput.push(`<div class="step"><img src="assets/icons/square.png" alt="">
                <p>There are no specific instructions for this recipe.</p></div>`);
                random.push(instrInput);
            }
        })
    return instrInput;
}

/* ------------------------- Fetch recipes | Set object ------------- */
let chef_one = new Recipe();
let chef_two = new Recipe();
let recipe_three = new Recipe();
let recipe_four = new Recipe();

let random_one = [];
let random_two = [];
let random_three = [];
let random_four = [];

const fetchRecipesDetails = (list) => {

    const createObjects = (recipesObj, random) => {
        let id = recipesObj.id;
        let title = recipesObj.title;
        let photo = recipesObj.image;
        let ingredients = ingredientInput(recipesObj);

        random.push(id);
        random.push(title);
        random.push(photo);
        random.push(ingredients);
        fetchSummary(id, random);
        fetchInstructions(id, random);
    }

    const fetchRecipes = (list) => {
        let recipes = [];
        ingredients_list = list.join(',+');
    
        fetch(`${spoonacular}${recipe}${ingredients_list}${amount_recipes}${api_key}`)
    
            .then(response => {
                return response.json();
            })
            .then(response => {
                recipes = response;
    
                createObjects(recipes[first_recipes[0]], random_one);
                createObjects(recipes[first_recipes[1]], random_two);
                createObjects(recipes[second_recipes[0]], random_three);
                createObjects(recipes[second_recipes[1]], random_four);
            })
    }
    fetchRecipes(list);
}

/* ------------------------- Search Recipes button ----------------- */
search_recipes_btn.addEventListener("click", () => {
    fridge_box.querySelectorAll(".myIngredient").forEach((ingredient) => {
        inFridge.push(ingredient.innerText);
    })
    putInFridge(event);
    fetchRecipesDetails(inFridge);
    getRandomNrs();
    search_recipes_btn.classList.replace("buttonVisible", "buttonOnload");
    chefs_btn.classList.replace("buttonOnload", "buttonVisible");
    recipes_btn.classList.replace("buttonOnload", "buttonVisible");
})

/* ------------------------- Show Recipes -------------------------- */
const showRecipesDetails = (recipeOne, recipeTwo) => {

    recipeBox_one.querySelector(".recipeTitle").innerHTML = "";
    recipeBox_one.querySelector(".recipeTitle").innerHTML = `<h4>${recipeOne.getTitle()}</h4>`;
    recipeBox_two.querySelector(".recipeTitle").innerHTML = "";
    recipeBox_two.querySelector(".recipeTitle").innerHTML = `<h4>${recipeTwo.getTitle()}</h4>`;

    recipeBox_one.querySelector(".ingredientsList").innerHTML = "";
    recipeBox_one.querySelector(".ingredientsList").innerHTML = recipeOne.getIngredients();
    recipeBox_two.querySelector(".ingredientsList").innerHTML = "";
    recipeBox_two.querySelector(".ingredientsList").innerHTML = recipeTwo.getIngredients();
    /*
    if(recipeWidth === "big") {
        recipeBox_one.querySelector(".recipeTitleBox .photoBox .recipePhoto").src = recipeOne.getPhoto();
        recipeBox_two.querySelector(".recipeTitleBox .photoBox .recipePhoto").src = recipeTwo.getPhoto();
        recipeBox_one.querySelector(".recipeDetails .photoBox").style.display = "none";
        recipeBox_two.querySelector(".recipeDetails .photoBox").style.display = "none";
    } else {
        recipeBox_one.querySelector(".recipeTitleBox .photoBox").style.display = "none";
        recipeBox_two.querySelector(".recipeTitleBox .photoBox").style.display = "none";
        
    }
    */
    recipeBox_one.querySelector(".recipeTitleBox .photoBox .recipePhoto").src = recipeOne.getPhoto();
    recipeBox_two.querySelector(".recipeTitleBox .photoBox .recipePhoto").src = recipeTwo.getPhoto();
    recipeBox_one.querySelector(".recipeDetails .photoBox .recipePhoto").src = recipeOne.getPhoto();
    recipeBox_two.querySelector(".recipeDetails .photoBox .recipePhoto").src = recipeTwo.getPhoto();

    recipeBox_one.querySelector(".recipeText").innerHTML = "";
    recipeBox_one.querySelector(".recipeText").innerHTML = recipeOne.getSummary();
    recipeBox_two.querySelector(".recipeText").innerHTML = "";
    recipeBox_two.querySelector(".recipeText").innerHTML = recipeTwo.getSummary();

    recipeBox_one.querySelector(".recipeInstructions").innerHTML = "";
    recipeBox_one.querySelector(".recipeInstructions").innerHTML = recipeOne.getInstructions();
    recipeBox_two.querySelector(".recipeInstructions").innerHTML = "";
    recipeBox_two.querySelector(".recipeInstructions").innerHTML = recipeTwo.getInstructions();

    document.querySelectorAll(".recipeContent").forEach(element => {
        element.classList.replace("contentHidden", "contentVisible");
    });

    let innerHeight_L;
    let innerHeight_R;

    if (recipeWidth == "big") {
        const left_Recipe = getById("leftDetails");
        const right_Recipe = getById("rightDetails");
        innerHeight_L = left_Recipe.clientHeight;
        innerHeight_R = right_Recipe.clientHeight;
        //console.log(innerHeight_L, innerHeight_R);
        //console.log(typeof(innerHeight_L), typeof(innerHeight_R))
        if (innerHeight_L > innerHeight_R) {
            right_Recipe.style.minHeight = `${innerHeight_L + 2}px`;
        } else if (innerHeight_R > innerHeight_L) {
            left_Recipe.style.minHeight = `${innerHeight_R + 2}px`;
            //console.log(left_Recipe.clientHeight);
        }
    }
}

/* ------------------------- Write values to objects --------------- */
const assignObjectsValues = (random, object) => {
    object.id = random[0];
    object.title = random[1];
    object.photo = random[2];
    object.ingredients = random[3];
    object.summary = random[5];
    object.instructions = random[4];
}
/* ------------------------- Get chefs recipes btn ----------------- */
chefs_btn.addEventListener("click", () => {

    if (chef_one.id === undefined) {
        //console.log("yes");
        assignObjectsValues(random_one, chef_one);
        assignObjectsValues(random_two, chef_two);
        //console.log("test : " + chef_one.instructions);
        showRecipesDetails(chef_one, chef_two);

        document.querySelector(".recipeContent").classList.replace("contentHidden", "contentVisible");

    } else {
        //console.log("no");
        //console.log("test : " + chef_two.summary);
        showRecipesDetails(chef_one, chef_two);
    }
})
/* ------------------------- Get extra recipes btn ----------------- */
recipes_btn.addEventListener("click", () => {
    if (recipe_three.id === undefined) {
       // console.log("yes");
        assignObjectsValues(random_three, recipe_three);
        assignObjectsValues(random_four, recipe_four);
        //console.log("test : " + recipe_three.summary);
        showRecipesDetails(recipe_three, recipe_four);

    } else {
        //console.log("no");
        //console.log("test : " + recipe_four.instructions);
        showRecipesDetails(recipe_three, recipe_four);
    }
})

/* ------------------------- Check screenWidth --------------------- */
let innerwidth = recipeBox_one.clientWidth;
let recipeWidth;
if (innerwidth > 440) {
    recipeWidth = "big";
} else {
    recipeWidth = "small";
}

window.onload = () => {
    moveNavUp(3,3,5);
    showRecipesDetails(example, example);
    //checkWindow();
}