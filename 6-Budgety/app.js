// Budget Controller
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;

        data.allItems[type].forEach(function(current, value, array) {
            sum += current.value;
        });
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round( ( this.value / totalIncome ) * 100 ); 
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    return {
        addItem: function (type, desc, val) {

            var newItem,
                ID;

            // ID = last ID +1
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 1;
            }
            

            // Create new item based 'inc' or 'exp type'
            if (type === "exp"){
                newItem = new Expense(ID, desc, val);
            } else if (type === "inc") {
                newItem = new Income(ID, desc, val);
            }

            data.allItems[type].push(newItem);

            // return the new element for other controllers
            return newItem;
            
        },
        deleteItem: function(type, id) {
            var ids, index;

            // id = 3
            var ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);
            
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget: function() {

            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income taht we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.floor( ( data.totals.exp / data.totals.inc ) * 100 );
            }else {
                data.percentage = -1;
            }
            




        },
        calculatePercentages: function() {

            /**
             * a = 20
             * b = 10
             * c = 40
             * income = 100
             * a=20/100= 20%
             * b = 10/100 = 10%
             * c = 40/100 = 40%
             */

            data.allItems.exp.forEach(function(current) {
                current.calcPercentage(data.totals.inc);
            });

        },
        getPercentages: function() {
            var allPercentages = data.allItems.exp.map(function(cur) {
                return cur.getPercentage(data.totals.inc);
            });
            return allPercentages;
        },
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        testing: function(){
            console.log(data);
        }
    }

})();


// UI Controller
var UIController = (function() {
    
    var DOMStrings= {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: '.budget__value',
        budgetIncomeLabel: '.budget__income--value',
        budgetExpensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(num, type) {
            
        var numSplit,
            int,
            dec;

        // + - before number
        // exactly 2 decimal points
        // comma separating the thousands
        // 2310.4567 -> + 2,310.46
        // 2000 -> + 2000.00

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length); 
            // input 2310, output 2,310
            // input 23510, output 23,510
        }
        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i += 1) {
            callback(list[i], i);
        }
    };    

    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        addListItem: function(obj, type){

            // Create HTML String with placeholder text
            var html,
                newHtml,
                element;

            if (type === 'inc') {
                element = DOMStrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%">';
                html += '<div class="item__description">%description%</div>';
                html += '<div class="right clearfix">';
                html += '<div class="item__value">%value%</div>';
                html += '<div class="item__delete">';
                html += '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>';
                html += '</div>';
                html += '</div>';
                html += '</div>';   
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%">';
                html += '<div class="item__description">%description%</div>';
                html += '<div class="right clearfix">';
                html += '<div class="item__value">%value%</div>';
                html += '<div class="item__percentage">21 %</div>';
                html += '<div class="item__delete">';
                html += '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            }
      

            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
                        
            // Insert the HTML into the DOM            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);           
        },
        deleteListItem: function(selectorId) {
            var element = document.getElementById(selectorId);
            element.parentNode.removeChild(element);
        },
        clearFields: function() {
            var fields,
                fieldsArray;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current, index, array){
                current.value = "";
            });

            fieldsArray[0].focus();
        },
        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.budgetIncomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.budgetExpensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }

        },
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel);

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }

            })
        },
        displayMonth: function() {

            var now,
            months,
            month,
            year;

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            now = new Date();
            month = months[now.getMonth()];
            year = now.getFullYear();
            document.querySelector(DOMStrings.dateLabel).textContent = month + ' ' + year;
        },
        changedType: function() {

            var fields = document.querySelectorAll(
                DOMStrings.inputType + ', ' +
                DOMStrings.inputDescription + ', ' +
                DOMStrings.inputValue
            );

            nodeListForEach(fields, function(cur, index){
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.inputButton).classList.toggle('red');

        },
        getDOMStrings: function(){
            return DOMStrings;
        }
    }


})();


// Global App Controller
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function(){
        
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keyup', function(event){
            if(event.keyCode === 13 || event.which === 13) {
                event.preventDefault(); // prevents the enter key from also triggering a click event
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    var updateBudget = function(){

        var budget;

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function() {

        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. Read percentage from the budget controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);

    };

    var ctrlAddItem = function() {
        var input,
            newItem;

        // 1. Get the filled input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }

    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            // inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1], 10);

            // 1. delete item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. delete the item from the ui
            UIController.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. update percentages
            updatePercentages();


        }
        console.log(itemID);
    };

    return {
        init: function() {
            console.log("Application has started.");
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupEventListeners();
            UICtrl.displayMonth();
        }
    }

})(budgetController, UIController);

controller.init();