/// <reference path ="utility-functions.ts" />
// без попереднього ТС при кампіляції буде казати що Cannot find name 'Utility'
var result1 = Utility.maxBooksAllowed(40);
console.log(result1);
var util = Utility.Fees; // аліас допопмагає за допопомгою util звертатись до вкладеного простору імен
var result2 = util.calculateLateFee(10);
console.log(result2);
