let passdisp = document.querySelector(".password-display")
let copybutt = document.querySelector(".copybutton")
let copymsg = document.querySelector(".msgcopied")

let passlentxt = document.querySelector(".passwordlengthtext")

let passlenbar = document.querySelector(".password-length-bar");

let allcheckbox = document.querySelectorAll(".checkbox")
console.log(allcheckbox)
let upperbox = document.getElementById("uppercase")
let lowerbox = document.getElementById("lowercase")
let num = document.getElementById("number")
let symbol = document.getElementById("symbol")

let strengthcolor = document.querySelector(".strength-color")


let generatebutt = document.querySelector(".generate-button")


let password=""
let passwordlength = 8
var checkcount = 0
indicatorcol("#ccc")
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', ';', ':', ',', '.', '/', '<', '>', '?'];

function slider(){
    passlenbar.value=passwordlength;
    passlentxt.innerText=passwordlength;
    
}


passlenbar.addEventListener("input",function(sliderval){ //sliderval is inner actual value of slider
    passwordlength= sliderval.target.value //target.value is used to take the innervalue and that is made = to length
    slider()
})

// // Function to update the value display
// function slider() {
//     // Get the value of the slider
//     const passwordLength = passlenbar.value;

//     // Update the value display in the <p> element
//     passlentxt.textContent = passwordLength;
// }

// // Add event listener to the slider
// passlenbar.addEventListener("input", slider);

// // Call the slider function initially to set the initial value
// slider();



function randomint (min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

function indicatorcol(color){
   strengthcolor.style.backgroundColor=color;
   strengthcolor.style.boxShadow = `0px 0px 12px 1px ${color}`;

}
function randomnumb(){
    return randomint(0,9)
}


function randomlower(){
    return String.fromCharCode(randomint(97,122))
}

function randomupper(){
    return String.fromCharCode(randomint(65,90))
}

function randomsymbol(){
    let randomindex = Math.floor(Math.random()*symbols.length) //this generates a random index for that array
    return symbols[randomindex] //and number at that index in return here
}

// A NodeList is a collection returned by DOM methods such as document.querySelectorAll() or parentNode.childNodes. It is similar to array
function change(){
    checkcount=0 //keeps track of howmany box checked
    allcheckbox.forEach(function(checkbox){  //allcheckbox is a nodelist of all box elements 
        //for each is used to iterate over this list, the func is anonymous (no name) takes prameter checkbox(a single box in that list)
        if(checkbox.checked)          
            checkcount++
    });
    if(passwordlength<checkcount){
        passwordlength=checkcount
        slider()
    }
    
  
}

allcheckbox.forEach(function(checkbox){
    checkbox.addEventListener("change",change)

})

function stren(){
    let hasupper = false
    let haslower = false
    let hasnum = false
    let hassymb = false

    if (upperbox.checked)
        hasupper=true
    
    if (lowerbox.checked)
        haslower=true
    
    if (num.checked)
        hasnum=true
    
    if (symbol.checked)
        hassymb=true
    

    if (hasupper && haslower && (hasnum || hassymb) && passwordlength >= 8)
        indicatorcol("#0f0")
    
    else if ((haslower || hasupper) && (hasnum || hassymb) && passwordlength >= 6)
        indicatorcol("#CC9900")
    
    else
        indicatorcol("#f00")
    
// Call stren function initially

}


async function copypass(){
  
    await navigator.clipboard.writeText(passdisp.value); //we can use try - catch try for this and catch for error
    copymsg.innerText="Copied"

}

copybutt.addEventListener("click",function(){
    if(passdisp.value.length>0)
        copypass();
    
})





generatebutt.addEventListener("click", () => {

    let password = "";

    let allfuncarray = [];

    if (upperbox.checked)
        allfuncarray.push(randomupper);

    if (lowerbox.checked)
        allfuncarray.push(randomlower);

    if (num.checked)
        allfuncarray.push(randomnumb);

    if (symbol.checked)
        allfuncarray.push(randomsymbol);

    for (let i = 0; i < allfuncarray.length; i++) {
        password = password + allfuncarray[i]();
    }

    for (let i = 0; i < passwordlength - allfuncarray.length; i++) {
        let randomindex = randomint(0, allfuncarray.length);
        password += allfuncarray[randomindex]();
    }

    // Fisher-Yates Shuffle Algorithm
    let passwordArray = password.split('');
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }
    password = passwordArray.join('');

    passdisp.value = password;
    stren();

})