#!/usr/bin/env node
const crypto = require("crypto");
const readline = require("readline");

function parsePasswordFromArgs() {
  for (const arg of process.argv.slice(2)) {
    const [key, value] = arg.split("=");
    if (key === "--password" && typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return null;
}

async function promptForPassword() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  return new Promise((resolve) => {
    rl.stdoutMuted = true;
    rl.question("Admin password: ", (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer.trim());
    });
    rl._writeToOutput = function _writeToOutput() {
      rl.output.write("*");
    };
  });
}

async function main() {
  let password = parsePasswordFromArgs();
  if (!password) {
    password = await promptForPassword();
  }

  if (!password) {
    console.error("No password provided. Pass --password=<value> or enter it interactively.");
    process.exit(1);
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");

  console.log("\nAdd these to your environment configuration:\n");
  console.log(`BLOG_ADMIN_PASSWORD_SALT=${salt}`);
  console.log(`BLOG_ADMIN_PASSWORD_HASH=${hash}`);
  console.log("\nRemember to restart your Next.js server after updating the env values.");
}

main().catch((error) => {
  console.error("Failed to generate hash", error);
  process.exit(1);
});
