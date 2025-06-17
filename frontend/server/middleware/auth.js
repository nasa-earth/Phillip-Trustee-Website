// server/middleware/auth.js

export default defineEventHandler((event) => {
  // Simple logging for debugging routes
  console.log(`SERVER: Request to ${event.node.req.url}`);
});
