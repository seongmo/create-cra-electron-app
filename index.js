#!/usr/bin/env node

const shell = require("shelljs");
const path = require("path");

const args = process.argv.slice(2);

const appName = args[0];
shell.echo(appName);

shell.exec("create-react-app " + args.join(" "));
shell.cd(appName);
shell.cp(path.join(__dirname, "files/electron.js"), " ./public/");

shell.exec(
  "cat ./package.json " +
    path.join(__dirname, "files/package-add.json") +
    " | " +
    path.join(__dirname, "./node_modules/.bin/json") +
    " --deep-merge > package.merged.json"
);
shell.exec("mv ./package.merged.json ./package.json");

const deps = [
  "electron",
  "electron-builder",
  "find-free-port-cli",
  "wait-on",
  "concurrently",
  "typescript"
];

shell.exec("yarn add -D " + deps.join(" "));

shell.echo(
  "\n\ncra-electron-app created\n\n  cd " +
    appName +
    "\n  yarn dev-electron\n\nHappy Hacking!"
);
