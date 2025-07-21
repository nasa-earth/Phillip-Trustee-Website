// Test script to verify events API functionality
const baseUrl = "http://localhost:3005/api/events";

async function testEventsAPI() {
  console.log("🧪 Testing Events API...\n");

  try {
    // Test 1: Get all events
    console.log("1️⃣ Testing GET /api/events");
    const response1 = await fetch(baseUrl);
    const data1 = await response1.json();
    console.log(`   ✅ Status: ${response1.status}`);
    console.log(`   ✅ Events count: ${data1.data ? data1.data.length : 0}`);

    if (data1.data && data1.data.length > 0) {
      const firstEvent = data1.data[0];
      console.log(`   ✅ First event: "${firstEvent.title}"`);
      console.log(`   ✅ Slug: "${firstEvent.slug}"`);

      // Test 2: Get event by slug
      console.log("\n2️⃣ Testing GET /api/events/by-slug/:slug");
      const response2 = await fetch(`${baseUrl}/by-slug/${firstEvent.slug}`);
      const data2 = await response2.json();
      console.log(`   ✅ Status: ${response2.status}`);
      console.log(
        `   ✅ Event title: "${data2.data ? data2.data.title : "N/A"}"`
      );
      console.log(
        `   ✅ Event ID matches: ${
          data2.data && data2.data.id === firstEvent.id
        }`
      );

      // Test 3: Test invalid slug
      console.log("\n3️⃣ Testing GET /api/events/by-slug/invalid-slug");
      const response3 = await fetch(`${baseUrl}/by-slug/invalid-slug-12345`);
      console.log(`   ✅ Status: ${response3.status} (should be 404)`);

      console.log("\n🎉 All tests completed!");
      console.log("\n📋 Sample event data structure:");
      console.log(JSON.stringify(firstEvent, null, 2));
    } else {
      console.log("   ❌ No events found in the database");
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

// Run the test
testEventsAPI();
