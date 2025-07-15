// // Partner Management Authentication Debugger
// // Run this in the browser console on your admin dashboard to diagnose partner update/delete issues

// const debugPartnerAuth = async () => {
//   console.group("🔧 Partner Management Authentication Debug");

//   try {
//     // Check auth store status
//     const authStore = useAuthStore();
//     console.log("📊 Auth Store Status:");
//     console.log("- Is Authenticated:", authStore.isAuthenticated);
//     console.log("- User Role:", authStore.userRole);
//     console.log("- Is Admin:", authStore.isAdmin);
//     console.log("- Is Editor:", authStore.isEditor);

//     if (!authStore.isAuthenticated) {
//       console.error("❌ Not authenticated! Please log in first.");
//       return;
//     }

//     // Check token status
//     const accessToken = localStorage.getItem("access_token");
//     if (!accessToken) {
//       console.error("❌ No access token found!");
//       return;
//     }

//     console.log("✅ Access token found");

//     // Decode token to check expiration and role
//     try {
//       const tokenParts = accessToken.split(".");
//       if (tokenParts.length === 3) {
//         const payload = JSON.parse(
//           atob(tokenParts[1].replace(/-/g, "+").replace(/_/g, "/"))
//         );
//         const now = Date.now() / 1000;

//         console.log("🔐 Token Details:");
//         console.log("- User ID:", payload.sub);
//         console.log("- Email:", payload.email);
//         console.log("- Role:", payload.role);
//         console.log(
//           "- Expires:",
//           new Date(payload.exp * 1000).toLocaleString()
//         );
//         console.log("- Is Expired:", payload.exp < now);

//         if (payload.exp < now) {
//           console.error(
//             "⚠️ TOKEN IS EXPIRED! This is likely the cause of your 'user expired' error."
//           );
//           console.log("💡 Try refreshing the page or logging out and back in.");
//           return;
//         }

//         if (payload.role !== "ADMIN") {
//           console.warn("⚠️ USER ROLE ISSUE:");
//           console.warn(
//             `Your role is '${payload.role}' but partners management requires ADMIN role.`
//           );
//           console.warn("This is likely the cause of your permission error.");
//         }
//       }
//     } catch (e) {
//       console.error("Failed to decode token:", e);
//     }

//     // Test partners API endpoints
//     console.log("\n🌐 Testing Partner API Endpoints:");

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     };

//     // Test GET partners (should work)
//     try {
//       const response = await fetch("http://localhost:3005/api/partners", {
//         method: "GET",
//         headers: headers,
//       });
//       console.log("✅ GET /partners:", response.status, response.statusText);
//     } catch (error) {
//       console.error("❌ GET /partners failed:", error);
//     }

//     // Test POST partners (should fail if not ADMIN)
//     try {
//       const response = await fetch("http://localhost:3005/api/partners", {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify({
//           name: "Test Partner",
//           description: "Test",
//         }),
//       });
//       console.log(
//         "POST /partners (create):",
//         response.status,
//         response.statusText
//       );

//       if (response.status === 401) {
//         console.error("❌ 401 Unauthorized - Token is invalid or expired");
//       } else if (response.status === 403) {
//         console.error(
//           "❌ 403 Forbidden - User role insufficient (needs ADMIN)"
//         );
//       }
//     } catch (error) {
//       console.error("❌ POST /partners failed:", error);
//     }

//     // Get first partner ID for testing update/delete
//     try {
//       const partnersResponse = await fetch(
//         "http://localhost:3005/api/partners",
//         {
//           method: "GET",
//           headers: headers,
//         }
//       );

//       if (partnersResponse.ok) {
//         const partners = await partnersResponse.json();
//         if (partners && partners.length > 0) {
//           const firstPartnerId = partners[0].id;

//           // Test PATCH (update)
//           try {
//             const updateResponse = await fetch(
//               `http://localhost:3005/api/partners/${firstPartnerId}`,
//               {
//                 method: "PATCH",
//                 headers: headers,
//                 body: JSON.stringify({
//                   name: partners[0].name, // Same name to avoid actual changes
//                 }),
//               }
//             );
//             console.log(
//               "PATCH /partners/:id (update):",
//               updateResponse.status,
//               updateResponse.statusText
//             );

//             if (updateResponse.status === 401) {
//               console.error(
//                 "❌ 401 Unauthorized - Token is invalid or expired"
//               );
//             } else if (updateResponse.status === 403) {
//               console.error(
//                 "❌ 403 Forbidden - User role insufficient (needs ADMIN)"
//               );
//             }
//           } catch (error) {
//             console.error("❌ PATCH /partners failed:", error);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("❌ Failed to test update endpoint:", error);
//     }

//     // Recommendations
//     console.log("\n💡 Troubleshooting Recommendations:");
//     console.log(
//       "1. If token is expired: Refresh the page or log out and back in"
//     );
//     console.log(
//       "2. If role is not ADMIN: Contact an administrator to upgrade your role"
//     );
//     console.log(
//       "3. If you're getting 'user expired': This usually means token expiration"
//     );
//     console.log("4. Check browser network tab for specific error responses");
//   } catch (error) {
//     console.error("❌ Debug failed:", error);
//   }

//   console.groupEnd();
// };

// // Quick token refresh function
// const tryTokenRefresh = async () => {
//   console.log("🔄 Attempting to refresh token...");

//   const authStore = useAuthStore();
//   const success = await authStore.refreshAccessToken();

//   if (success) {
//     console.log("✅ Token refreshed successfully!");
//     console.log("Try your partner update/delete operation again.");
//   } else {
//     console.log("❌ Token refresh failed. Please log out and back in.");
//   }
// };

// // Make functions available globally
// if (typeof window !== "undefined") {
//   window.debugPartnerAuth = debugPartnerAuth;
//   window.tryTokenRefresh = tryTokenRefresh;
// }

// console.log("🔧 Partner Auth Debug Tools loaded!");
// console.log("Run debugPartnerAuth() to diagnose your issue");
// console.log("Run tryTokenRefresh() to attempt token refresh");
