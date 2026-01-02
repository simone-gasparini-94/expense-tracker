import { loadExpenses, saveExpenses } from "./file-system.js";
import { updateIds,  checkIdValidity, printHeader, formatString} from "./utils.js";

export function execute(options, command) {
    const actions = {
        add: addExpense,
        delete: deleteExpense,
        update: updateExpense,
        list: listExpenses,
    }
    const expenses = loadExpenses();
    actions[command.name()](expenses, options);
}

function addExpense(expenses, options) {
    const dateString = new Date().toISOString().slice(0, 10);
    const array = dateString.split("-");
    const expense = {
        id: expenses.length + 1,
        description: options.description,
        amount: +options.amount,
        date: dateString,
        year: array[0],
        month: array[1],
        day: array[2]
    };
    expenses.push(expense);
    saveExpenses(expenses); 
}

function deleteExpense(expenses, options) {
    let id = +options.id;
    checkIdValidity(expenses, id);
    let newExpenses = [];
    for (let v of expenses) {
        if (v.id == id) continue;
        newExpenses.push(v);
    }
    updateIds(newExpenses);
    saveExpenses(newExpenses);
}

function updateExpense(expenses, options) {
    let id = +options.id;
    checkIdValidity(expenses, id);
    for (let v of expenses) {
        if (v.id == id) {
            v.description = options.description;
        }
    }
    saveExpenses(expenses);
}

function listExpenses(expenses, options) {
    if (expenses.length == 0) {
        console.log("Expenses list is empty");
        return ;
    }
    printHeader();
    for (let v of expenses) {
        let formattedString = formatString(v.description, 20);
        console.log(`${v.id}\t\t${v.date}\t${formattedString}\t${v.amount}`);
    }
}