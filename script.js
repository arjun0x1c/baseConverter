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
    if(base === 2) {
        for(let i=val.length -1, j=0; i>=0; i--, j++) {
            decimalValue += parseInt(val[i]) * Math.pow(base, j);
        }
    }
    else if(base === 8) {
        for(let i=val.length -1, j=0; i>=0; i--, j++) {
            decimalValue += parseInt(val[i]) * Math.pow(base, j);
        }
    }
    else if(base === 16) {
        for(let i=val.length -1, j=0; i>=0; i--, j++) {
            if(isNaN(val[i])) {
                decimalValue += ((val[i].charCodeAt() - 65)+10) * Math.pow(base, j);
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
    flag = true;
    base = parseInt(base);

    if(base === 2) {
        for(let i=0; i<val.length; i++) {
            if(!(parseInt(val[i]) === 1 || parseInt(val[i]) === 0)){
                flag = false;
                break;
            }
        }
    }
    else if(base === 8) {
        for(let i=0; i<val.length; i++) {
            if(!(parseInt(val[i]) >= 0 && parseInt(val[i]) <= 8)){
                flag = false;
                break;
            } 
        }
    }
    else if(base === 16) {
        for(let i=0; i<val.length; i++) {
            if(!(parseInt(val[i]) >= 0 && parseInt(val[i]) <= 9 || val[i].charCodeAt() >= 65 && val[i].charCodeAt() <= 70)) {
                flag = false;
                break;
            }
        }
    }
    else if(base === 10) {
        return !isNaN(val);
    }
    return flag;
}


const VALUE = _("value");
const BASE = _("option1");
const ERROR_BOX = _("error-msg");
const RESULT = _("result");
const BASE2 = _("option2");

function check() {
    if(!validation(VALUE.value, BASE.value)){
        ERROR_BOX.innerHTML = "Invalid Input For this base."
    }
    else {
        ERROR_BOX.innerHTML = "";
    }
}

function main() {
    RESULT.innerHTML = VALUE.value != 0 ? decimalConverter(baseToDecimal(VALUE.value, +BASE.value), +BASE2.value) : 0;
}