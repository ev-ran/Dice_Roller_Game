
let rollResult;
let numberOfSide;
let numberOfRolls;
let numberOfDreamButton;
let sum;
let fun_name;
let dieRolls = [];
let array = [];
let color_style;


let masonry_button_1 = document.querySelector("#dream_button_1");
let masonry_button_2 = document.querySelector("#dream_button_2");
let reset_button = document.querySelector('#reset_button');
let numberOfRolls_input = document.querySelector("#number_of_rolls");
let totalSumOfGotNumbers_1 = document.querySelector('#total_number_1');
let totalSumOfGotNumbers_2 = document.querySelector('#total_number_2');
let listOfRolls_1 = document.querySelector("#orderedListOfDiceRolls_1");
let listOfRolls_2 = document.querySelector("#orderedListOfDiceRolls_2");

let numberOfSide_input = document.querySelector("#number_of_sides");



//**************************** */
// Here we prepare to manage color styles of our document, using the var's from CSS.
// We will play with colors later, in FUNCTION 'changeColorStyle()'
document.documentElement.style
    .setProperty('--blue-color', '#0048BA');
    document.documentElement.style
    .setProperty('--red-color', '#E32636');
    document.documentElement.style
    .setProperty('--white-color', 'white');
    document.documentElement.style
    .setProperty('--black-color', 'black');
    document.documentElement.style
    .setProperty('--bright-red-color', '#FF2B3C');
    document.documentElement.style
    .setProperty('--bright-blue-color', '#0063FF');

// *****==================================================
// ===== Just a first big RED (or BlUE) DREAM button which makes practically all staff we dream about: rolls the dices, put Ordered List with information to section "Section", draw dices in 'masonry field' and calculate the sum of current dices roll.

masonry_button_1.addEventListener('click', function () {

    numberOfRolls = Number(numberOfRolls_input.value);

    numberOfSide = Number(numberOfSide_input.value);

    numberOfDreamButton = 1;

    dreamFunction(numberOfRolls, numberOfSide, numberOfDreamButton); // call DREAM function to get all staff for left dream button

    ChangeStyleTimeOutFunction(); // just for fun: let's SWAP red and blue colors in 1/2 second after the button click!


})

// ===== Just a second big RED (or BlUE) DREAM button which makes practically all staff we dream about: rolls the dices, put Ordered List with information to section "Section", draw dices in 'masonry field' and calculate the sum of current dices roll.

masonry_button_2.addEventListener('click', function () {

    numberOfRolls = Number(numberOfRolls_input.value);

    numberOfSide = Number(numberOfSide_input.value);

    numberOfDreamButton = 2;

    dreamFunction(numberOfRolls, numberOfSide, numberOfDreamButton); // call DREAM function to get all staff for right dream button

    ChangeStyleTimeOutFunction(); // just for fun: let's SWAP red and blue colors in 1/2 second after the button click!
})

// ===== RESET button - to clean all traces of creativity

reset_button.addEventListener('click', function () {
    var element_01 = document.getElementById('masonry_1'); // clean dices from left masonry field
    element_01.innerHTML = '';

    var element_02 = document.getElementById('masonry_2');  // clean dices from right masonry field
    element_02.innerHTML = '';

    var element_03 = document.getElementById('section_1'); // clean OL with information from left Section field
    element_03.innerHTML = '';

    var element_04 = document.getElementById('section_2'); // clean OL with information from right Section field
    element_04.innerHTML = '';

    totalSumOfGotNumbers_1.innerHTML = 0; // reset the sum of dices

    totalSumOfGotNumbers_2.innerHTML = 0; // reset the sum of dices


    ChangeStyleTimeOutFunction(); // here we also swap the red and blue colors. Sure, just for fun)))


})


//===== FUNCTION ===== Function to realise your dice dreams ========

function dreamFunction(numberOfRolls, numberOfSide, numberOfDreamButton) {

    createArrayFromDuceRolls(numberOfRolls, numberOfSide); // call the other function, which returns array 'dieRolls'  with results of duce rolls

    sumOfArray(dieRolls);  // call the other function, which returns number 'sum' - sum of numbers in array 'dieRolls'

    // here we display the 'sum' [ total Sum Of Numbers in array] on the screen
    if (numberOfDreamButton === 1) {
        totalSumOfGotNumbers_1.innerHTML = sum;

    } else {
        totalSumOfGotNumbers_2.innerHTML = sum;
    }

    createOrderedList(dieRolls, numberOfDreamButton); // call other function to GENERATE and DISPLAY the Ordered List with information: Number of roll : Result of Roll

    // ==================================================
    // here we should call one more function to GENERATE and DISPLAY  the dices on the screen. There are - two function. The first one generate the square duces, if number of side for our duce === 6. The second function generate the round duces it would be square duces, if number of side for our duce !=== 6.

    if (numberOfSide === 6) {

        generateDices_6Sides(dieRolls, numberOfDreamButton); // this function generates square dices

    } else {
        generateDices_Not_6Sides(dieRolls, numberOfDreamButton); // this function generates round dices
    }
}

//===== FUNCTION ===== Here we need to enforse the boring [0-1 Math.random()] - to play in Dice with whatever you want number of sides ========

function resultOfRoll(numberOfSide) {

    rollResult = Math.round(Math.random() * (numberOfSide - 1)) + 1;
    // console.log(rollResult);

    return rollResult;
}
//===== FUNCTION ===== Create array with results of duce rolls in one session
function createArrayFromDuceRolls(numberOfRolls, numberOfSide) {
    let counter = 0;
    dieRolls = [];
    // numberOfSide = 6;


    while (counter < numberOfRolls) {
        let shot = resultOfRoll(numberOfSide); //rollResult
        dieRolls.push(shot);
        counter++;
    }

    return dieRolls;
}
//===== FUNCTION ===== Calculate sum of array with numbers

function sumOfArray(dieRolls) {

    let counter = 0;
    sum = 0;
    while (counter < dieRolls.length) {
        sum += dieRolls[counter];
        counter++;
    }
    return sum;
}

//===== FUNCTION ===== Create ordered list from Array

function createOrderedList(dieRolls, numberOfDreamButton) {

    let div = document.createElement('div');
    div.setAttribute("id", "note" + numberOfDreamButton);

    div.innerHTML = ''


    let ordered_list = document.createElement('OL');
    ordered_list.setAttribute("id", "ol_OfDiceRolls" + numberOfDreamButton);

    ordered_list.innerHTML = ''
    div.appendChild(ordered_list);

    let counter = 0;

    while (counter < dieRolls.length) {

        let currentArrayItem = dieRolls[counter];

        let li_element = document.createElement("LI");
        let text = document.createTextNode(currentArrayItem);
        li_element.appendChild(text);

        ordered_list.appendChild(li_element);

        counter++;
    }

    // ===== here we, at last, display our Ordered List on the screen

    if (numberOfDreamButton === 1) {

        document.querySelector('#section_1').appendChild(div);

    } else {
        document.querySelector('#section_2').appendChild(div);
    }

}

//===== FUNCTION ===== Generate duces for 6-sides dice

function generateDices_6Sides(dieRolls, numberOfDreamButton) {

    let counter = 0;

    while (counter < dieRolls.length) {

        let currentArrayItem = dieRolls[counter];

        let box = document.createElement('DIV');
        let nameOfClass = "box_" + currentArrayItem;
        box.setAttribute("class", nameOfClass);
        // console.log(nameOfClass);


        let box_inner_01 = document.createElement('DIV');
        let nameOfClass_01 = "inner_01_" + (currentArrayItem * 2 - 1);
        box_inner_01.setAttribute("class", nameOfClass_01);
        box.appendChild(box_inner_01);


        let box_inner_02 = document.createElement('DIV');
        let nameOfClass_02 = "inner_02_" + (currentArrayItem * 2);
        box_inner_02.setAttribute("class", nameOfClass_02);
        box.appendChild(box_inner_02);


        counter++;

        // ===== we are ready to display dices on the screen)))

        if (numberOfDreamButton === 1) {

            document.querySelector("#masonry_1").appendChild(box); // put dices on left 'masonry' field if left dream button was clicked

        } else {

            document.querySelector("#masonry_2").appendChild(box);  // put dices on right 'masonry' field if right dream button was clicked

        }

    }

}

//===== FUNCTION ===== Generate duces for NOT 6-sides dice

function generateDices_Not_6Sides(dieRolls, numberOfDreamButton) {

    let counter = 0;

    while (counter < dieRolls.length) {

        let currentArrayItem = dieRolls[counter];

        let box = document.createElement('DIV');

        box.setAttribute("class", "boxNot6");
        box.setAttribute("name", currentArrayItem);
        box.innerHTML = currentArrayItem;

        counter++;

        if (numberOfDreamButton === 1) {

            document.querySelector("#masonry_1").appendChild(box);
        } else {

            document.querySelector("#masonry_2").appendChild(box);
        }

    }

}

// some complicated FUNCTION found in depths of the internet - just to help run FUNCTION 'changeColorStyle()'
function cssVar(name, value) {

    if (name[0]!='-') name = '--'+name //allow passing with or without --
    if(value) document.documentElement.style.setProperty(name, value)
    return getComputedStyle(document.documentElement).getPropertyValue(name);

}

// FUNCTION that swap the colors: change red to blue and vice versa...
function changeColorStyle() {

let currentStyle = cssVar('blue-color');

if (currentStyle === '#0048BA') {

    cssVar('blue-color');
    cssVar('blue-color', '#E32636');

    cssVar('red-color');
    cssVar('red-color', '#0048BA');

    cssVar('bright-blue-color');
    cssVar('bright-blue-color', '#FF2B3C');

    cssVar('bright-red-color');
    cssVar('bright-red-color', '#0063FF');



}  else {

    cssVar('blue-color');
    cssVar('blue-color', '#0048BA');

    cssVar('red-color');
    cssVar('red-color', '#E32636');

    cssVar('bright-blue-color');
    cssVar('red-color', '#0063FF');

    cssVar('bright-red-color');
    cssVar('red-color', '#FF2B3C');
}
}
// lets DELAY swapping the blue and red colors a little bit... maybe for half a second?
function ChangeStyleTimeOutFunction() {
    setTimeout (function() {
        changeColorStyle()} , 500);
}
