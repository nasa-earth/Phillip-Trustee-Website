// // JWT Token Decoder and Analysis Tool
// // Run this in the browser console to check your current token status

// const analyzeToken = () => {
//   console.group("🔐 JWT Token Analysis");

//   try {
//     // Get tokens from localStorage
//     const accessToken = localStorage.getItem("access_token");
//     const refreshToken = localStorage.getItem("refresh_token");

//     if (!accessToken) {
//       console.error("❌ No access token found in localStorage");
//       return;
//     }

//     console.log("✅ Tokens found in localStorage");

//     // Decode access token
//     const accessPayload = decodeJWT(accessToken);
//     const refreshPayload = refreshToken ? decodeJWT(refreshToken) : null;

//     console.log("\n📋 Access Token Details:");
//     console.log("- User ID:", accessPayload.sub);
//     console.log("- Email:", accessPayload.email);
//     console.log("- Role:", accessPayload.role);
//     console.log(
//       "- Issued At:",
//       new Date(accessPayload.iat * 1000).toLocaleString()
//     );
//     console.log(
//       "- Expires At:",
//       new Date(accessPayload.exp * 1000).toLocaleString()
//     );

//     const accessTimeLeft = accessPayload.exp * 1000 - Date.now();
//     const accessHoursLeft = Math.floor(accessTimeLeft / (1000 * 60 * 60));
//     const accessMinutesLeft = Math.floor(
//       (accessTimeLeft % (1000 * 60 * 60)) / (1000 * 60)
//     );

//     if (accessTimeLeft > 0) {
//       console.log(
//         `⏱️ Access Token Time Remaining: ${accessHoursLeft}h ${accessMinutesLeft}m`
//       );
//     } else {
//       console.log("⚠️ Access Token EXPIRED!");
//     }

//     if (refreshToken && refreshPayload) {
//       console.log("\n🔄 Refresh Token Details:");
//       console.log("- Token ID:", refreshPayload.tokenId);
//       console.log(
//         "- Issued At:",
//         new Date(refreshPayload.iat * 1000).toLocaleString()
//       );
//       console.log(
//         "- Expires At:",
//         new Date(refreshPayload.exp * 1000).toLocaleString()
//       );

//       const refreshTimeLeft = refreshPayload.exp * 1000 - Date.now();
//       const refreshDaysLeft = Math.floor(
//         refreshTimeLeft / (1000 * 60 * 60 * 24)
//       );
//       const refreshHoursLeft = Math.floor(
//         (refreshTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );

//       if (refreshTimeLeft > 0) {
//         console.log(
//           `⏱️ Refresh Token Time Remaining: ${refreshDaysLeft}d ${refreshHoursLeft}h`
//         );
//       } else {
//         console.log("⚠️ Refresh Token EXPIRED!");
//       }
//     }

//     // Auth store check
//     const authStore = useAuthStore();
//     console.log("\n🏪 Auth Store Status:");
//     console.log("- Is Authenticated:", authStore.isAuthenticated);
//     console.log("- Is Admin:", authStore.isAdmin);
//     console.log("- Is Editor:", authStore.isEditor);
//     console.log("- User Role:", authStore.userRole);
//   } catch (error) {
//     console.error("❌ Error analyzing tokens:", error);
//   }

//   console.groupEnd();
// };

// // JWT Decoder function
// const decodeJWT = (token) => {
//   try {
//     const parts = token.split(".");
//     if (parts.length !== 3) {
//       throw new Error("Invalid JWT format");
//     }

//     const payload = parts[1];
//     const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
//     return JSON.parse(decoded);
//   } catch (error) {
//     throw new Error("Failed to decode JWT: " + error.message);
//   }
// };

// // Quick token expiration checker
// const checkTokenExpiration = () => {
//   const accessToken = localStorage.getItem("access_token");
//   if (!accessToken) {
//     console.log("❌ No access token found");
//     return;
//   }

//   try {
//     const payload = decodeJWT(accessToken);
//     const expiresAt = new Date(payload.exp * 1000);
//     const now = new Date();
//     const timeLeft = expiresAt - now;

//     if (timeLeft > 0) {
//       const hours = Math.floor(timeLeft / (1000 * 60 * 60));
//       const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//       console.log(
//         `✅ Token expires in ${hours}h ${minutes}m (${expiresAt.toLocaleString()})`
//       );
//     } else {
//       console.log(
//         `❌ Token expired ${Math.abs(
//           Math.floor(timeLeft / (1000 * 60))
//         )} minutes ago`
//       );
//     }
//   } catch (error) {
//     console.error("Error checking token:", error);
//   }
// };

// // Export functions for use in browser console
// if (typeof window !== "undefined") {
//   window.analyzeToken = analyzeToken;
//   window.checkTokenExpiration = checkTokenExpiration;
//   window.decodeJWT = decodeJWT;
// }

// console.log(
//   "🔧 JWT Analysis Tools loaded! Run analyzeToken() or checkTokenExpiration() in console"
// );
