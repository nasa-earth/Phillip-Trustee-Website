// Debug login response
async function debugLogin() {
  console.log("🔍 Debugging Login Response...\n");

  const baseUrl = "http://localhost:3005/api";

  try {
    const loginResponse = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@example.com",
        password: "admin123",
      }),
    });

    console.log(`Status: ${loginResponse.status}`);
    const responseText = await loginResponse.text();
    console.log("Raw response:");
    console.log(responseText);

    try {
      const responseJson = JSON.parse(responseText);
      console.log("\nParsed JSON:");
      console.log(JSON.stringify(responseJson, null, 2));
    } catch (e) {
      console.log("Failed to parse as JSON");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// For Node.js environment
if (typeof require !== "undefined") {
  const fetch = require("node-fetch");
  global.fetch = fetch;
}

debugLogin();
