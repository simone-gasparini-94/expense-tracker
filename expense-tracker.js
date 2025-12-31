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
    .action(execute);

program
    .command("delete")
    .requiredOption("--id <id>")
    .action(execute);

program
    .command("update")
    .requiredOption("--id <id>")
    .requiredOption("--description <description>")
    .action(execute);

program
    .command("list")
    .action(execute);

program.parse();

function execute(options, command) {
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

function updateIds(expenses) {
    for (let i = 0; i < expenses.length; i++) {
        expenses[i].id = i + 1;
    }
}

function checkIdValidity(expenses, id) {
    if (id < 1 || id > expenses.length) {
        throw new Error("Invalid ID");
    }
}

function printHeader() {
    console.log("ID\t\tDate\t\tDescription\t\tAmount");
}

function formatString(string, n) {
    let newString;
    if (string.length > n) {
        newString = string.slice(0, n - 3) + "...";
    } else {
        newString = string.padEnd(n, " ");
    }
    return (newString);
}