// Test the fixed admin events API functionality
async function testFixedAdminEvents() {
  console.log("🧪 Testing Fixed Admin Events API...\n");

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

    if (loginResponse.status !== 200) {
      console.log("   ❌ Login failed:", loginData);
      return;
    }

    // Extract token from response (login doesn't have data wrapper)
    const accessToken = loginData.access_token;
    console.log("   ✅ Login successful");

    // Step 2: Test the admin events endpoint directly
    console.log("\n2️⃣ Testing admin events endpoint...");
    const eventsResponse = await fetch(`${baseUrl}/admin/events`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const eventsData = await eventsResponse.json();
    console.log(`   Status: ${eventsResponse.status}`);

    if (eventsResponse.status === 200) {
      console.log("   ✅ Admin events API works");

      // Test what the frontend should expect
      console.log("\n3️⃣ Testing response structure for frontend...");
      console.log("   Response structure:");
      console.log(`     - Has data property: ${!!eventsData.data}`);
      console.log(
        `     - Data has events: ${!!(
          eventsData.data && eventsData.data.events
        )}`
      );
      console.log(
        `     - Data has total: ${!!(eventsData.data && eventsData.data.total)}`
      );

      if (eventsData.data && eventsData.data.events) {
        console.log(`     - Events count: ${eventsData.data.events.length}`);
        console.log(`     - Total count: ${eventsData.data.total}`);

        // Show what the EventsManagement component should receive
        const frontendFormat = eventsData.data; // This is what our fixed code should return
        console.log("\n   ✅ Frontend should receive this format:");
        console.log("   {");
        console.log(`     events: [${frontendFormat.events.length} items],`);
        console.log(`     total: ${frontendFormat.total},`);
        console.log(`     page: ${frontendFormat.page},`);
        console.log(`     limit: ${frontendFormat.limit}`);
        console.log("   }");

        if (frontendFormat.events.length > 0) {
          console.log(`\n   Sample event: "${frontendFormat.events[0].title}"`);
        }
      }
    } else {
      console.log("   ❌ Admin events API failed:", eventsData);
    }

    console.log(
      "\n🎉 Test completed! The EventsManagement dashboard should now work."
    );
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

// For Node.js environment
if (typeof require !== "undefined") {
  const fetch = require("node-fetch");
  global.fetch = fetch;
}

testFixedAdminEvents();
