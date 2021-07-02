//const form_btn = getById("searchBtn");
//const form = getById("ingredientInput");
//const reset_btn = getById("resetBtn");
//const search_recipes_btn = getById("searchRecipesBtn");

//const selection_box = getById("searchResult");
// change in ----------------------
const temporary_box = getById("inTemporary");
// change out ----------------------
//const fridge_box = getById("inFridge");

let selectBtn = getById("btn");

// change in ----------------------
const putInFridge = () => {
    document.querySelectorAll(".selected").forEach(button => {
        button.classList.replace("selected", "myIngredient");
        button.id = `my${button.id}`;
        let fridge_item = button.cloneNode(true);
        fridge_box.appendChild(fridge_item);
        temporary_box.removeChild(button);
    });
}
// change out ----------------------

form_btn.addEventListener("click", (event) => {
    putInFridge();
})
form.addEventListener("submit", (event) => {
    putInFridge();
})
form.addEventListener("search", (event) => {
    putInFridge();
})

const deselectIng = (deselect_btn, select_btn) => {
    deselect_btn.addEventListener("click", () => {
        // change in ----------------------
        temporary_box.removeChild(deselect_btn);
        // change out ----------------------
        select_btn.classList.replace("ingrHidden", "ingrVisible");
    })
}
const selectIng = (select_btn) => {
    select_btn.addEventListener("click", () => {
        deselect_btn = select_btn.cloneNode(true);
        deselect_btn.id = `ingr${deselect_btn.id}`;
        // change in ----------------------
        temporary_box.appendChild(deselect_btn);
        // change out ----------------------
        select_btn.classList.replace("ingrVisible", "ingrHidden");
        // change in ----------------------
        deselect_btn.classList.replace("ingredient", "selected");
        // change out ----------------------

        search_recipes_btn.classList.replace("buttonOnload", "buttonVisible");

        deselectIng(deselect_btn, select_btn);
    })
}

selectIng(selectBtn);

search_recipes_btn.addEventListener("click", () => {
    fridge_box.querySelectorAll(".myIngredient").forEach((ingredient) => {
        inFridge.push(ingredient.innerText);
    })
    putInFridge();
    //fetchRecipesDetails(inFridge);
    //getRandomNrs();
    search_recipes_btn.classList.replace("buttonVisible", "buttonOnload");
    chefs_btn.classList.replace("buttonOnload", "buttonVisible");
    recipes_btn.classList.replace("buttonOnload", "buttonVisible");
})