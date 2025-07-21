// Test admin login and events API
async function testAdminLoginAndEvents() {
  console.log("🧪 Testing Admin Login and Events API...\n");

  const baseUrl = "http://localhost:3005/api";

  try {
    // Step 1: Login as admin
    console.log("1️⃣ Logging in as admin...");
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

    const loginData = await loginResponse.json();
    console.log(`   Login Status: ${loginResponse.status}`);

    if (loginResponse.status !== 200) {
      console.log("   ❌ Login failed:", loginData);
      return;
    }

    // Extract token from response (handle wrapped response)
    let accessToken = null;
    if (loginData.data && loginData.data.access_token) {
      accessToken = loginData.data.access_token;
    } else if (loginData.access_token) {
      accessToken = loginData.access_token;
    }

    if (!accessToken) {
      console.log("   ❌ No access token in response:", loginData);
      return;
    }

    console.log("   ✅ Login successful");
    console.log(`   Token preview: ${accessToken.substring(0, 20)}...`);

    // Step 2: Test admin events endpoint
    console.log("\n2️⃣ Testing admin events API...");
    const eventsResponse = await fetch(`${baseUrl}/admin/events`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const eventsData = await eventsResponse.json();
    console.log(`   Events API Status: ${eventsResponse.status}`);

    if (eventsResponse.status === 200) {
      console.log("   ✅ Admin events API working");
      console.log("   Response structure:");
      console.log(`     - Type: ${typeof eventsData}`);
      console.log(`     - Has data property: ${!!eventsData.data}`);
      console.log(`     - Has events property: ${!!eventsData.events}`);
      console.log(`     - Is array: ${Array.isArray(eventsData)}`);

      if (eventsData.data) {
        console.log(`     - Data type: ${typeof eventsData.data}`);
        console.log(`     - Data has events: ${!!eventsData.data.events}`);
        console.log(`     - Data has total: ${!!eventsData.data.total}`);

        if (eventsData.data.events) {
          console.log(`     - Events count: ${eventsData.data.events.length}`);
          if (eventsData.data.events.length > 0) {
            console.log(
              `     - Sample event: "${eventsData.data.events[0].title}"`
            );
          }
        }
      }

      console.log("\n   Full response structure:");
      console.log(JSON.stringify(eventsData, null, 2));
    } else {
      console.log("   ❌ Admin events API failed:", eventsData);
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

// For Node.js environment
if (typeof require !== "undefined") {
  const fetch = require("node-fetch");
  global.fetch = fetch;
}

testAdminLoginAndEvents();
