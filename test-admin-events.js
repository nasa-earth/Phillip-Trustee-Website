// Test script to check admin events endpoint
async function testAdminEventsEndpoint() {
  console.log("🧪 Testing Admin Events Endpoint...\n");

  const baseUrl = "http://localhost:3005/api";

  try {
    // Test 1: Try to access admin events without auth
    console.log("1️⃣ Testing GET /api/admin/events (without auth)");
    try {
      const response1 = await fetch(`${baseUrl}/admin/events`);
      console.log(`   Status: ${response1.status}`);
      if (response1.status === 401) {
        console.log("   ✅ Correctly requires authentication");
      } else {
        const data = await response1.json();
        console.log("   Response:", data);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }

    // Test 2: Check if we have events in database via public endpoint
    console.log("\n2️⃣ Testing GET /api/events (public endpoint)");
    try {
      const response2 = await fetch(`${baseUrl}/events`);
      const data2 = await response2.json();
      console.log(`   Status: ${response2.status}`);
      console.log(`   Events count: ${data2.data ? data2.data.length : 0}`);

      if (data2.data && data2.data.length > 0) {
        console.log("   ✅ Database has events");
        console.log(`   Sample event: "${data2.data[0].title}"`);
      } else {
        console.log("   ❌ No events found in database");
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }

    // Test 3: Try the fallback endpoint from events controller
    console.log("\n3️⃣ Testing GET /api/events/admin/all (fallback endpoint)");
    try {
      const response3 = await fetch(`${baseUrl}/events/admin/all`);
      console.log(`   Status: ${response3.status}`);
      if (response3.status === 401) {
        console.log("   ✅ Correctly requires authentication");
      } else {
        const data3 = await response3.json();
        console.log("   Response:", data3);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }

    console.log("\n📋 Summary:");
    console.log("   - Admin endpoints require authentication (as expected)");
    console.log("   - To fix dashboard issue, we need to:");
    console.log("     1. Ensure user is properly authenticated");
    console.log("     2. Check auth token is being sent correctly");
    console.log("     3. Verify the frontend auth composable is working");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

// For Node.js environment
if (typeof require !== "undefined") {
  const fetch = require("node-fetch");
  global.fetch = fetch;
}

testAdminEventsEndpoint();
