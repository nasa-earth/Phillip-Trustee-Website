async function testFullDashboard() {
  const baseUrl = "http://localhost:3005";

  try {
    // Test public endpoints
    console.log("=== Testing Public Endpoints ===");

    const [partnersRes, faqsRes, eventsRes, usersRes] = await Promise.all([
      fetch(`${baseUrl}/api/partners`),
      fetch(`${baseUrl}/api/faqs`),
      fetch(`${baseUrl}/api/events`),
      fetch(`${baseUrl}/api/users`),
    ]);

    const partners = await partnersRes.json();
    const faqs = await faqsRes.json();
    const events = await eventsRes.json();
    const users = await usersRes.json();

    console.log(
      "Partners count:",
      partners.data ? partners.data.length : partners.length
    );
    console.log("FAQs count:", faqs.data ? faqs.data.length : faqs.length);
    console.log(
      "Events count:",
      events.data ? events.data.length : events.length
    );
    console.log("Users count:", users.data ? users.data.length : users.length);

    // Test auth login
    console.log("\n=== Testing Authentication ===");
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@example.com",
        password: "admin123",
      }),
    });

    if (!loginRes.ok) {
      console.log("Login failed:", await loginRes.text());
      return;
    }

    const { access_token } = await loginRes.json();
    console.log("Login successful, token obtained");

    // Test admin dashboard endpoint
    console.log("\n=== Testing Admin Dashboard ===");
    const dashboardRes = await fetch(`${baseUrl}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!dashboardRes.ok) {
      console.log("Dashboard failed:", await dashboardRes.text());
      return;
    }

    const dashboard = await dashboardRes.json();
    console.log("Dashboard data:", JSON.stringify(dashboard, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testFullDashboard();
