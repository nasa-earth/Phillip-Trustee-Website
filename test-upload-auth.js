// Test file upload request to debug backend authentication
const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");

async function testUploadAuth() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmVAZ21haWwuY29tIiwic3ViIjoiNjBiZTNjNWItOTg0My00MDQ2LTg4YTQtMjM1MjVlOTZhZjExIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzUzMDgxMzg3LCJleHAiOjE3NTMxNjc3ODd9.nFf2xQiNwt3YlRGY8Wk2CCRSYgSqMnuHWHiS5rnxYgs";

  // Create a simple test file
  const testFileContent = "test image content";
  fs.writeFileSync("test-file.jpg", testFileContent);

  const formData = new FormData();
  formData.append("file", fs.createReadStream("test-file.jpg"));
  formData.append("type", "partner-logos");

  console.log("Making request to upload endpoint...");
  console.log("Token:", token.substring(0, 50) + "...");

  try {
    const response = await fetch("http://localhost:3005/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    const responseText = await response.text();
    console.log("Response body:", responseText);
  } catch (error) {
    console.error("Request failed:", error.message);
  } finally {
    // Clean up test file
    if (fs.existsSync("test-file.jpg")) {
      fs.unlinkSync("test-file.jpg");
    }
  }
}

testUploadAuth();
