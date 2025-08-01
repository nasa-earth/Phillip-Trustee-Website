#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔍 Environment Compatibility Check");
console.log("==================================");

const checks = [];

// Check Node.js version
try {
  const nodeVersion = process.version;
  console.log(`Node.js: ${nodeVersion}`);

  const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);
  const minorVersion = parseInt(nodeVersion.slice(1).split(".")[1]);

  if (majorVersion === 18 && minorVersion >= 19) {
    console.log("✅ Node.js version is compatible");
    checks.push(true);
  } else {
    console.log("❌ Node.js version mismatch. Expected: v18.19.x or higher");
    console.log("   Please install Node.js 18.19.0 from: https://nodejs.org/");
    checks.push(false);
  }
} catch (error) {
  console.log("❌ Node.js not found");
  checks.push(false);
}

// Check npm version
try {
  const npmVersion = execSync("npm --version", { encoding: "utf8" }).trim();
  console.log(`npm: v${npmVersion}`);

  const majorVersion = parseInt(npmVersion.split(".")[0]);
  if (majorVersion >= 9) {
    console.log("✅ npm version is compatible");
    checks.push(true);
  } else {
    console.log(
      "❌ npm version too old. Please update: npm install -g npm@latest"
    );
    checks.push(false);
  }
} catch (error) {
  console.log("❌ npm not found");
  checks.push(false);
}

// Check PostgreSQL
try {
  const pgVersion = execSync("postgres --version", { encoding: "utf8" }).trim();
  console.log(`PostgreSQL: ${pgVersion}`);
  console.log("✅ PostgreSQL found");
  checks.push(true);
} catch (error) {
  console.log(
    "⚠️  PostgreSQL not found in PATH. Make sure it's installed and running."
  );
  console.log("   Download from: https://www.postgresql.org/download/");
  checks.push(true); // Not critical for environment check
}

// Check Git
try {
  const gitVersion = execSync("git --version", { encoding: "utf8" }).trim();
  console.log(`Git: ${gitVersion}`);
  console.log("✅ Git found");
  checks.push(true);
} catch (error) {
  console.log(
    "❌ Git not found. Please install Git from: https://git-scm.com/"
  );
  checks.push(false);
}

// Check .nvmrc file
const nvmrcPath = path.join(__dirname, ".nvmrc");
if (fs.existsSync(nvmrcPath)) {
  const nvmrcVersion = fs.readFileSync(nvmrcPath, "utf8").trim();
  console.log(`\n📄 .nvmrc specifies Node.js: v${nvmrcVersion}`);
  console.log("   You can use: nvm use (if nvm is installed)");
}

// Check package.json engines
const backendPackageJson = path.join(__dirname, "backend", "package.json");
if (fs.existsSync(backendPackageJson)) {
  const packageData = JSON.parse(fs.readFileSync(backendPackageJson, "utf8"));
  if (packageData.engines) {
    console.log("\n🔧 Backend requires:");
    Object.entries(packageData.engines).forEach(([key, value]) => {
      console.log(`   ${key}: ${value}`);
    });
  }
}

// Check available ports
console.log("\n🔌 Checking required ports...");
try {
  // Check if ports are available (simplified check)
  const netstatCmd =
    process.platform === "win32"
      ? 'netstat -an | findstr ":3000\\|:3005"'
      : 'netstat -tuln | grep ":3000\\|:3005"';

  try {
    const portCheck = execSync(netstatCmd, { encoding: "utf8" });
    if (portCheck.trim()) {
      console.log("⚠️  Some required ports may be in use:");
      console.log(portCheck);
    } else {
      console.log("✅ Required ports (3000, 3005) appear to be available");
    }
  } catch {
    console.log("✅ Required ports (3000, 3005) appear to be available");
  }
} catch (error) {
  console.log("⚠️  Could not check port availability");
}

// Summary
console.log("\n📊 Summary:");
const passed = checks.filter(Boolean).length;
const total = checks.length;

if (passed === total) {
  console.log("🎉 All checks passed! Your environment is ready.");
  console.log("\n📋 Next steps:");
  console.log("1. Clone the repository");
  console.log("2. Run setup script: npm run setup or ./setup.ps1");
  console.log("3. Follow SETUP-GUIDE.md");
  process.exit(0);
} else {
  console.log(
    `❌ ${total - passed} check(s) failed. Please fix the issues above.`
  );
  console.log("\n🔧 Quick fixes:");
  console.log("- Install/update Node.js: https://nodejs.org/");
  console.log("- Install/update npm: npm install -g npm@latest");
  console.log("- Install Git: https://git-scm.com/");
  console.log("- Install PostgreSQL: https://www.postgresql.org/download/");
  process.exit(1);
}
