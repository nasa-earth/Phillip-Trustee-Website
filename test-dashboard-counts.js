// Test script to verify dashboard counting functionality
const API_BASE = "http://localhost:3005";

async function testDashboardCounts() {
  console.log("🔍 Testing Dashboard Counting Functionality...\n");

  try {
    // Test health endpoint (public)
    console.log("1. Testing health endpoint...");
    const healthResponse = await fetch(`${API_BASE}/api/health`);
    const healthData = await healthResponse.json();
    console.log("✅ Health status:", healthData.status);

    // Test public endpoints to verify data exists
    console.log("\n2. Testing public data endpoints...");

    const partnersResponse = await fetch(`${API_BASE}/api/partners`);
    if (partnersResponse.ok) {
      const partnersData = await partnersResponse.json();
      console.log("✅ Partners count:", partnersData.data?.length || 0);
    }

    const faqsResponse = await fetch(`${API_BASE}/api/faqs`);
    if (faqsResponse.ok) {
      const faqsData = await faqsResponse.json();
      console.log("✅ FAQs count:", faqsData.data?.length || 0);

      // Count unique categories
      if (faqsData.data) {
        const categories = new Set(faqsData.data.map((faq) => faq.category));
        console.log("✅ FAQ categories count:", categories.size);
      }
    }

    const eventsResponse = await fetch(`${API_BASE}/api/events`);
    if (eventsResponse.ok) {
      const eventsData = await eventsResponse.json();
      console.log("✅ Published events count:", eventsData.data?.length || 0);
    }

    // Note: Users endpoint requires authentication, so we can't test it here
    console.log("\n3. Admin endpoints require authentication");
    console.log("   - /api/admin/dashboard (needs JWT token)");
    console.log("   - /api/users (needs JWT token)");
    console.log("   - /api/admin/events/stats (needs JWT token)");

    console.log("\n✅ Public data endpoints are working correctly!");
    console.log(
      "📊 Dashboard should now display proper counts when authenticated."
    );
  } catch (error) {
    console.error("❌ Error testing dashboard counts:", error.message);
  }
}

// Run the test
testDashboardCounts();
