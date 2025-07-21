// Debug script to test frontend useEvent composable
const fetch = require("node-fetch");

// Mock the Nuxt functions
global.$fetch = fetch;
global.useRuntimeConfig = () => ({
  public: {
    apiBase: "http://localhost:3005",
  },
});

// Test the composable logic
async function testComposable() {
  console.log("🧪 Testing useEvent composable logic...\n");

  try {
    // Simulate the API call
    const apiBase = "http://localhost:3005";
    const response = await fetch(`${apiBase}/api/events`);
    const rawData = await response.json();

    console.log("1️⃣ Raw API Response:");
    console.log(`   Status: ${response.status}`);
    console.log(`   Data type: ${typeof rawData}`);
    console.log(`   Has data property: ${!!rawData.data}`);
    console.log(`   Data is array: ${Array.isArray(rawData.data)}`);

    // Test the parsing logic from useEvent.ts
    let eventsArray = [];

    if (Array.isArray(rawData)) {
      eventsArray = rawData;
      console.log("   ✅ Direct array format");
    } else if (rawData && rawData.data && Array.isArray(rawData.data)) {
      eventsArray = rawData.data;
      console.log("   ✅ Wrapped data format");
    } else if (rawData && Array.isArray(rawData.events)) {
      eventsArray = rawData.events;
      console.log("   ✅ Events property format");
    } else {
      console.log("   ❌ Unexpected format");
    }

    console.log(`\n2️⃣ Parsed Events: ${eventsArray.length} items`);

    if (eventsArray.length > 0) {
      const testSlug = eventsArray[0].slug;
      console.log(`\n3️⃣ Testing slug endpoint with: ${testSlug}`);

      const slugResponse = await fetch(
        `${apiBase}/api/events/by-slug/${testSlug}`
      );
      const slugData = await slugResponse.json();

      console.log(`   Status: ${slugResponse.status}`);
      console.log(`   Has data property: ${!!slugData.data}`);

      let eventData = null;
      if (slugData && slugData.data) {
        eventData = slugData.data;
        console.log("   ✅ Wrapped response format");
      } else if (slugData && slugData.id) {
        eventData = slugData;
        console.log("   ✅ Direct response format");
      }

      if (eventData) {
        console.log(`   ✅ Event loaded: "${eventData.title}"`);
        console.log(`   ✅ Slug matches: ${eventData.slug === testSlug}`);
      }
    }

    console.log("\n🎉 Frontend integration test completed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testComposable();
