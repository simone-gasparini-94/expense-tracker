#!/usr/bin/env node

import fs from "fs";

let expenses = [];

loadExpenses();

function loadExpenses() {
    if (!fs.existsSync("expenses.json")) {
        fs.writeFileSync("expenses.json", JSON.stringify(expenses, null, 2))
    } else {
        const expensesJSON = fs.readFileSync("expenses.json", "utf-8");
        expenses = JSON.parse(expensesJSON);
    }
}