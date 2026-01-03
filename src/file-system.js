import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const srcPath = fileURLToPath(import.meta.url);
const srcDir = path.dirname(srcPath);
const root = path.join(srcDir, "..");
const jsonPath = path.join(root, "expenses.json");


export function loadExpenses() {
    if (!fs.existsSync(jsonPath)) {
        return [];
    } else {
        const expensesJSON = fs.readFileSync(jsonPath, "utf-8");
        return JSON.parse(expensesJSON);
    }
}

export function saveExpenses(expenses) {
    const expensesJSON = JSON.stringify(expenses, null, 2);
    fs.writeFileSync(jsonPath, expensesJSON);
}