/// <reference path ="utility-functions.ts" />
// без попереднього ТС при кампіляції буде казати що Cannot find name 'Utility'
// Після кампіляції в нас з'явилось два файли джс - app.js, utility-functions.js які представляють перетворений код

const result1 = Utility.maxBooksAllowed(40);
console.log(result1);

import util = Utility.Fees // аліас допопмагає за допопомгою util звертатись до вкладеного простору імен
const result2 = util.calculateLateFee(10);
console.log(result2)