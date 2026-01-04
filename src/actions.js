import { loadExpenses, saveExpenses }
    from "./file-system.js";
import { updateIds,  checkIdValidity, printHeader, formatString}
    from "./utils.js";

export function execute(options, command) {
    const actions = {
        add: addExpense,
        delete: deleteExpense,
        update: updateExpense,
        list: listExpenses,
        summary: showSummary,
    }
    const expenses = loadExpenses();
    actions[command.name()](expenses, options);
}

function addExpense(expenses, options) {
    const d = new Date();
    const expense = {
        id: expenses.length + 1,
        description: options.description,
        amount: +options.amount,
        date: d.toISOString().slice(0, 10),
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
    };
    expenses.push(expense);
    saveExpenses(expenses); 
}

function deleteExpense(expenses, options) {
    let id = Number(options.id);
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
    let id = Number(options.id);
    checkIdValidity(expenses, id);
    for (let v of expenses) {
        if (v.id == id) {
            v.description = options.description;
        }
    }
    saveExpenses(expenses);
}

function listExpenses(expenses) {
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

function showSummary(expenses, options) {
    if (expenses.length == 0) {
        console.log("Expenses list is empty");
        return ;
    }
    const months = [
        null,
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const selectedMonth = options.month ? Number(options.month) : null;
    const year = new Date().getFullYear();
    const total = expenses.reduce((sum, e) => {
        if (!selectedMonth ||
            (selectedMonth === e.month && year === e.year)) {
            return sum + e.amount;
        }
        return sum;
    }, 0);
    if (selectedMonth) {
        console.log(`Total expenses for ${months[selectedMonth]}: `
            + `€${total}`);
    } else {
        console.log(`Total expenses: €${total}`);
    }
}