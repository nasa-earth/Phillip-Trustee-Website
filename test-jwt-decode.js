// Simple JWT decode test to understand the token structure
const jwt = require("jsonwebtoken");

// Token from the console logs (truncated for security)
const sampleToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmVAZ21haWwuY29tIiwic3ViIjoiNjBiZTNjNWItOTg0My00MDQ2LTg4YTQtMjM1MjVlOTZhZjExIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzUzMDgxMzg3LCJleHAiOjE3NTMxNjc3ODd9.nFf2xQiNwt3YlRGY8Wk2CCRSYgSqMnuHWHiS5rnxYgs";

// Decode without verification to see the payload
const decoded = jwt.decode(sampleToken);
console.log("JWT Payload:", JSON.stringify(decoded, null, 2));

// Check expiry
const now = Math.floor(Date.now() / 1000);
console.log("Current timestamp:", now);
console.log("Token exp:", decoded.exp);
console.log("Is expired:", now > decoded.exp);

// Check if we can see all required fields
console.log("Has sub (user ID):", !!decoded.sub);
console.log("Has email:", !!decoded.email);
console.log("Has role:", !!decoded.role);
