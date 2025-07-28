// Test script to demonstrate real-time dashboard updates
const API_BASE = "http://localhost:3005";

async function testDashboardRealTimeUpdates() {
  console.log("🔍 Testing Real-time Dashboard Updates...\n");

  try {
    // Step 1: Login as admin
    console.log("1. Logging in as admin...");
    const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@example.com",
        password: "admin123",
      }),
    });

    if (!loginResponse.ok) {
      throw new Error("Login failed");
    }

    const { access_token } = await loginResponse.json();
    console.log("✅ Login successful");

    // Step 2: Get current dashboard stats
    console.log("\n2. Getting current dashboard stats...");
    const dashboardResponse = await fetch(`${API_BASE}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const dashboardData = await dashboardResponse.json();
    const currentUserCount = dashboardData.data.stats.users;
    console.log(`✅ Current user count: ${currentUserCount}`);

    // Step 3: Create a new test user
    console.log("\n3. Creating a new test user...");
    const testUserData = {
      name: `Test User ${Date.now()}`,
      email: `testuser${Date.now()}@example.com`,
      password: "testpass123",
      role: "EDITOR",
    };

    const createUserResponse = await fetch(`${API_BASE}/api/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testUserData),
    });

    if (!createUserResponse.ok) {
      throw new Error(`Create user failed: ${createUserResponse.status}`);
    }

    const newUser = await createUserResponse.json();
    console.log("✅ New user created:", newUser.data?.name || "User");

    // Step 4: Wait a moment and check dashboard again
    console.log("\n4. Waiting 2 seconds and checking dashboard again...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const updatedDashboardResponse = await fetch(
      `${API_BASE}/api/admin/dashboard`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const updatedDashboardData = await updatedDashboardResponse.json();
    const newUserCount = updatedDashboardData.data.stats.users;
    console.log(`✅ Updated user count: ${newUserCount}`);

    // Step 5: Verify the count increased
    if (newUserCount > currentUserCount) {
      console.log("\n🎉 SUCCESS! Dashboard count updated automatically!");
      console.log(`   Previous count: ${currentUserCount}`);
      console.log(`   New count: ${newUserCount}`);
      console.log(`   Increase: +${newUserCount - currentUserCount}`);
    } else {
      console.log("\n⚠️  Count did not increase as expected");
    }

    console.log("\n💡 To see real-time updates in the web interface:");
    console.log("   1. Open http://localhost:3000 in your browser");
    console.log("   2. Login with admin@example.com / admin123");
    console.log("   3. Go to Admin Dashboard");
    console.log("   4. Create a new user in User Management");
    console.log("   5. Watch the dashboard update automatically!");
  } catch (error) {
    console.error("❌ Error testing real-time updates:", error.message);
  }
}

// Run the test
testDashboardRealTimeUpdates();
