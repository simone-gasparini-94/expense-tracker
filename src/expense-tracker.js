#!/usr/bin/env node

import { Command } from "commander";
import { execute } from "./actions.js";

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