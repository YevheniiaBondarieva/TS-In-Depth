var Utility;
(function (Utility) {
    var Fees;
    (function (Fees) {
        function calculateLateFee(daysLate) {
            return daysLate * 0.25;
        }
        Fees.calculateLateFee = calculateLateFee;
    })(Fees = Utility.Fees || (Utility.Fees = {}));
    function maxBooksAllowed(age) {
        return age < 12 ? 3 : 10;
    }
    Utility.maxBooksAllowed = maxBooksAllowed;
    function privateFunc() {
        console.log("This is a private function");
    }
})(Utility || (Utility = {}));
/// <reference path ="utility-functions.ts" />
// без попереднього ТС при кампіляції буде казати що Cannot find name 'Utility'
// Після кампіляції в нас з'явилось два файли джс - app.js, utility-functions.js які представляють перетворений код
var result1 = Utility.maxBooksAllowed(40);
console.log(result1);
var util = Utility.Fees; // аліас допопмагає за допопомгою util звертатись до вкладеного простору імен
var result2 = util.calculateLateFee(10);
console.log(result2);
