#!/usr/bin/env node

import fs from "fs";
import { Command } from 'commander';

let expenses = [];
const program = new Command();

program
    .name("expense-tracker")
    .version("1.0.0");

program
    .command("add")
    .requiredOption("--description <description>")
    .requiredOption("--amount <amount>")
    .action((options) => {
        let expense = {
            description: options.description,
            amount: options.amount,
        };
        expenses.push(expense);
    });

loadExpenses();
program.parse();
saveExpenses();


function loadExpenses() {
    if (!fs.existsSync("expenses.json")) {
        fs.writeFileSync("expenses.json", JSON.stringify(expenses, null, 2))
    } else {
        const expensesJSON = fs.readFileSync("expenses.json", "utf-8");
        expenses = JSON.parse(expensesJSON);
    }
}

function saveExpenses() {
    const expensesJSON = JSON.stringify(expenses, null, 2);
    fs.writeFileSync("expenses.json", expensesJSON);
}
