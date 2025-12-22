// Learning more about Typescript clearing fundamentals things as follows..


// 1.Variables & Type Annotations
let age: number = 22;
let name: string = "Sahil";
let isIntern: boolean = true;

// 2. Type Inference..
let city = "Pune"; // TS automatically sets types to string...
// city = 10;  Error

// 3. Practice.. Union Type Notations .. Valid Points as follows..
let score : number | string = 100;
score  = "high";

let isPassed : string | boolean = "Yes";
isPassed = true;
console.log(score, isPassed);


// Special Types:
// 1. any : allowed but dangeorus..
let data : any = 100;
data = "Sahil Sonawane";

// 2. Unknown : safe
let value : unknown = "Sahil Sonawane";

if(typeof value === "string"){
    console.log(value.toLowerCase());
}

// Major difference between any and unknown as follows..

// any:-
let val : any = "Sahil Pramod Sonawane";

console.log(val.length);
console.log(val.toUpperCase());
// val();
console.log(val * 10);

// 1. When we are using any : typescript do not say anything but errors occurs at run time..
// 2. We can assign to any type.
// 3. We can call functions.
// 4. Can we use Operators..
// 5. Can access properties..


// Using unknown..
// 1. Typescript forces you to check first..
// let value: unknown = "Sahil";

// value.toUpperCase(); 
// value();             
// value.length;        
// value * 10;          

// Mental model to understand as follows..
// any     = “I don’t care, trust me bro”
// unknown = “I don’t know yet, prove it first”

// Convert this to safe typescript

// Type checking is required as follows..
let input : unknown = "123";

if(typeof input === "string"){
    console.log(input.length * 2);
}

// Control flow (if/else/switch)

let marks : number = 30;

if(marks >= 21){
    console.log("Pass");
}else{
    console.log("Fail");
}

// Type Narrowing : very important..
let res : number | string  = 10;

if(typeof res === "number"){
    console.log(res+10);
}else{
    console.log(res.toUpperCase());
}


