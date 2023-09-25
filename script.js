function _(name) {
    return document.getElementById(name);
}

function decimalConverter(val, base) {
    let result = '';
    while(val > 0) {
        let rem = val % base;
        result = (rem < 10 ? rem + result : String.fromCharCode(55 + rem) + result);
        val = Math.floor(val/base);
    }
    return result;
}

function baseToDecimal(val, base) {
    let decimalValue = 0;
    if(base === 2 || base === 8) {
        for(let i=val.length -1, j=0; i>=0; i--, j++) {
            decimalValue += parseInt(val[i]) * Math.pow(base, j);
        }
    }
    else if(base === 16) {
        for(let i=val.length -1, j=0; i>=0; i--, j++) {
            if(isNaN(val[i])) {
                decimalValue += ((val[i].toUpperCase().charCodeAt() - 65)+10) * Math.pow(base, j);
            }
            else {
            decimalValue += parseInt(val[i]) * Math.pow(base, j);
            }
        }
    }
    else if(base === 10) {
        decimalValue = parseInt(val);
    }
    return decimalValue;
}

function validation(val, base) {
    let flag = true;
    base = parseInt(base);

    if(base === 2) {
        for(let i of val) {
            if(!(parseInt(i) === 1 || parseInt(i) === 0)){
                flag = false;
                break;
            }
        }
    }
    else if(base === 8) {
        for(let i of val) {
            if(!(parseInt(i) >= 0 && parseInt(i) <= 8)){
                flag = false;
                break;
            } 
        }
    }
    else if(base === 16) {
        for(let i of val) {
            i = i.toUpperCase();
            if(!(parseInt(i) >= 0 && parseInt(i) <= 9 || i.charCodeAt() >= 65 && i.charCodeAt() <= 70)) {
                flag = false;
                break;
            }
        }
    }
    else if(base === 10) {
        return !isNaN(val) && val >= 0;
    }
    return flag;
}

const VALUE = _("value");
const BASE = _("option1");
const ERROR_BOX = _("error-msg");
const RESULT = _("result");
const BASE2 = _("option2");

function clearr() {
    console.log("doing");
    VALUE.value = "";
    RESULT.textContent = "";
    ERROR_BOX.innerHTML = "";
}

function check() {
    placeholder();
    if(!validation(VALUE.value, BASE.value)){
        ERROR_BOX.innerHTML = "Invalid Input For this base."
    }
    else {
        ERROR_BOX.innerHTML = "";
    }
}

function placeholder() {
    let base = parseInt(BASE.value);
    console.log(base);
    if (base === 2) {
        VALUE.placeholder = "100101";
    } else if (base === 8) {
        VALUE.placeholder = "1280";
    } else if (base === 16) {
        VALUE.placeholder = "35F";
    } else {
        VALUE.placeholder = "1234";
    }
}

function main() {
    if (!VALUE.value) {
        ERROR_BOX.innerHTML = "<b>Input can't be empty.</b>";
        return;
    }
    RESULT.innerHTML = VALUE.value != 0 ? decimalConverter(baseToDecimal(VALUE.value, +BASE.value), +BASE2.value) : 0;
}