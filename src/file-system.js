import fs from "fs";

export function loadExpenses() {
    if (!fs.existsSync("expenses.json")) {
        return [];
    } else {
        const expensesJSON = fs.readFileSync("expenses.json", "utf-8");
        return JSON.parse(expensesJSON);
    }
}

export function saveExpenses(expenses) {
    const expensesJSON = JSON.stringify(expenses, null, 2);
    fs.writeFileSync("expenses.json", expensesJSON);
}