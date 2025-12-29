#!/usr/bin/env node

import fs from "fs";
import { Command } from 'commander';

const program = new Command();

program
    .name("expense-tracker")
    .version("1.0.0");

program
    .command("add")
    .requiredOption("--description <description>")
    .requiredOption("--amount <amount>")
    .action((options) => {
        const expenses = loadExpenses();
        let expense = {
            description: options.description,
            amount: options.amount,
        };
        expenses.push(expense);
        saveExpenses(expenses);
    });

program.parse();

function loadExpenses() {
    if (!fs.existsSync("expenses.json")) {
        return [];
    } else {
        const expensesJSON = fs.readFileSync("expenses.json", "utf-8");
        return JSON.parse(expensesJSON);
    }
}

function saveExpenses(expenses) {
    const expensesJSON = JSON.stringify(expenses, null, 2);
    fs.writeFileSync("expenses.json", expensesJSON);
}
