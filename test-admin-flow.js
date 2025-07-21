// Test admin login and events access
async function testAdminDashboardFlow() {
  console.log("🧪 Testing Admin Dashboard Flow...\n");

  const baseUrl = "http://localhost:3005/api";

  try {
    // Step 1: Login as admin
    console.log("1️⃣ Logging in as admin");
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

    console.log(`   Login Status: ${loginResponse.status}`);

    if (loginResponse.status !== 200) {
      const errorData = await loginResponse.json();
      console.log("   ❌ Login failed:", errorData);
      return;
    }

    const loginData = await loginResponse.json();
    console.log("   ✅ Login successful");
    console.log(
      `   User: ${loginData.data?.user?.email} (${loginData.data?.user?.role})`
    );

    const token = loginData.data?.access_token;
    if (!token) {
      console.log("   ❌ No access token received");
      return;
    }

    console.log(`   Token received (length: ${token.length})`);

    // Step 2: Access admin events endpoint
    console.log("\n2️⃣ Accessing admin events endpoint");
    const eventsResponse = await fetch(`${baseUrl}/admin/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(`   Events Status: ${eventsResponse.status}`);

    if (eventsResponse.status === 200) {
      const eventsData = await eventsResponse.json();
      console.log("   ✅ Admin events access successful");
      console.log(`   Response type: ${typeof eventsData.data}`);

      if (eventsData.data) {
        console.log(
          `   Events in response: ${
            eventsData.data.events?.length || "unknown"
          }`
        );
        console.log(`   Total events: ${eventsData.data.total || "unknown"}`);

        if (eventsData.data.events && eventsData.data.events.length > 0) {
          console.log(`   Sample event: "${eventsData.data.events[0].title}"`);
        }
      }
    } else {
      const errorData = await eventsResponse.json();
      console.log("   ❌ Admin events access failed:", errorData);
    }

    // Step 3: Test auth token validation
    console.log("\n3️⃣ Validating token format");
    const tokenParts = token.split(".");
    console.log(`   Token parts: ${tokenParts.length} (should be 3 for JWT)`);

    if (tokenParts.length === 3) {
      console.log("   ✅ Valid JWT format");
    } else {
      console.log("   ❌ Invalid JWT format");
    }

    console.log("\n🎉 Admin flow test completed!");
    console.log("\n📋 Next steps for debugging:");
    console.log("   1. Check if frontend auth store is being initialized");
    console.log("   2. Verify auth headers are being sent correctly");
    console.log("   3. Check browser localStorage for stored tokens");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

// For Node.js environment
if (typeof require !== "undefined") {
  const fetch = require("node-fetch");
  global.fetch = fetch;
}

testAdminDashboardFlow();
