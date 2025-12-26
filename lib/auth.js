// // lib/auth.js - Client-side session/cookie utilities for Next.js
// // Works with PHP backend sessions

// // Cookie names (matching PHP backend)
// export const SIGNIN_FLOW_COOKIE = "signinFlow";
// export const PARTNER_SESSION_COOKIE = "partnerNetSession";

// // PHP Backend URL
// export const PHP_API_URL = "http://localhost/threat-cure-php-backend/my-api/public";

// // ============ CLIENT-SIDE COOKIE FUNCTIONS ============

// // Parse cookie value safely
// function parseCookie(cookieValue) {
//   if (!cookieValue) return null;
//   try {
//     const decoded = decodeURIComponent(cookieValue);
//     return JSON.parse(decoded);
//   } catch {
//     return null;
//   }
// }

// // Get cookie by name
// function getCookie(name) {
//   if (typeof window === "undefined") return null;
  
//   const cookies = document.cookie.split("; ");
//   const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  
//   if (!cookie) return null;
//   return cookie.split("=").slice(1).join("=");
// }

// // Set cookie
// export function setCookie(name, value, days = 7) {
//   if (typeof window === "undefined") return;
  
//   const expires = new Date();
//   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
//   document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
// }

// // Delete cookie
// export function deleteCookie(name) {
//   if (typeof window === "undefined") return;
//   document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
// }

// // ============ SESSION CHECK FUNCTIONS ============

// // Check if user has partner session (full auth)
// export function hasPartnerSession() {
//   const cookieValue = getCookie(PARTNER_SESSION_COOKIE);
//   if (!cookieValue) return false;
  
//   const data = parseCookie(cookieValue);
//   if (!data) return false;
  
//   // Check expiry if exists
//   if (data.expires && data.expires < Date.now()) {
//     deleteCookie(PARTNER_SESSION_COOKIE);
//     return false;
//   }
  
//   return true;
// }

// // Get partner session data
// export function getPartnerSession() {
//   const cookieValue = getCookie(PARTNER_SESSION_COOKIE);
//   if (!cookieValue) return null;
  
//   const data = parseCookie(cookieValue);
//   if (!data) return null;
  
//   if (data.expires && data.expires < Date.now()) {
//     deleteCookie(PARTNER_SESSION_COOKIE);
//     return null;
//   }
  
//   return data;
// }

// // Check if user has signin flow (temporary auth for password setup)
// export function hasSigninFlow() {
//   const cookieValue = getCookie(SIGNIN_FLOW_COOKIE);
//   if (!cookieValue) return false;
  
//   const data = parseCookie(cookieValue);
//   if (!data) return false;
  
//   if (data.expires && data.expires < Date.now()) {
//     deleteCookie(SIGNIN_FLOW_COOKIE);
//     return false;
//   }
  
//   return true;
// }

// // Get signin flow data
// export function getSigninFlow() {
//   const cookieValue = getCookie(SIGNIN_FLOW_COOKIE);
//   if (!cookieValue) return null;
  
//   const data = parseCookie(cookieValue);
//   if (!data) return null;
  
//   if (data.expires && data.expires < Date.now()) {
//     deleteCookie(SIGNIN_FLOW_COOKIE);
//     return null;
//   }
  
//   return data;
// }

// // ============ SESSION MANAGEMENT FUNCTIONS ============

// // Set signin flow (after successful signin, before password)
// export function setSigninFlow(data) {
//   const flowData = {
//     partnerNetId: data.partnerNetId || data.partner_net_id,
//     email: data.email,
//     mode: data.mode,
//     expires: Date.now() + 15 * 60 * 1000, // 15 minutes
//   };
//   setCookie(SIGNIN_FLOW_COOKIE, flowData, 1); // 1 day max, but expires check handles it
// }

// // Set partner session (after successful password set/compare)
// export function setPartnerSession(data) {
//   const sessionData = {
//     email: data.email,
//     partnerNetId: data.partnerNetId || data.partner_net_id,
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
//   };
//   setCookie(PARTNER_SESSION_COOKIE, sessionData, 7);
// }

// // Clear signin flow
// export function clearSigninFlow() {
//   deleteCookie(SIGNIN_FLOW_COOKIE);
// }

// // Clear all auth (logout)
// export function clearAllAuth() {
//   deleteCookie(SIGNIN_FLOW_COOKIE);
//   deleteCookie(PARTNER_SESSION_COOKIE);
// }

// // ============ API HELPER FUNCTIONS ============

// // Logout - calls PHP backend and clears local cookies
// export async function logout() {
//   try {
//     await fetch(`${PHP_API_URL}/logout`, {
//       method: "GET",
//       credentials: "include",
//     });
//   } catch (e) {
//     console.error("Logout API error:", e);
//   }
//   clearAllAuth();
// }
// lib/auth.js - Client-side session/cookie utilities for Next.js
// Works with PHP backend sessions
// Updated for Partner-Net flow: Signin → OTP → Password → Session

// Cookie names (matching PHP backend)
export const SIGNIN_FLOW_COOKIE = "signinFlow";
export const PARTNER_SESSION_COOKIE = "partnerNetSession";

// PHP Backend URL
export const PHP_API_URL = "http://localhost/threat-cure-php-backend/my-api/public";

// ============ CLIENT-SIDE COOKIE FUNCTIONS ============

// Parse cookie value safely
function parseCookie(cookieValue) {
  if (!cookieValue) return null;
  try {
    const decoded = decodeURIComponent(cookieValue);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

// Get cookie by name
function getCookie(name) {
  if (typeof window === "undefined") return null;
  
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  
  if (!cookie) return null;
  return cookie.split("=").slice(1).join("=");
}

// Set cookie with SameSite=Lax (to match PHP backend)
export function setCookie(name, value, days = 7) {
  if (typeof window === "undefined") return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

// Delete cookie
export function deleteCookie(name) {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// ============ SESSION CHECK FUNCTIONS ============

// Check if user has partner session (full auth - after password)
export function hasPartnerSession() {
  const cookieValue = getCookie(PARTNER_SESSION_COOKIE);
  if (!cookieValue) return false;
  
  const data = parseCookie(cookieValue);
  if (!data) return false;
  
  // Check expiry if exists
  if (data.expires && data.expires < Date.now()) {
    deleteCookie(PARTNER_SESSION_COOKIE);
    return false;
  }
  
  return true;
}

// Get partner session data
export function getPartnerSession() {
  const cookieValue = getCookie(PARTNER_SESSION_COOKIE);
  if (!cookieValue) return null;
  
  const data = parseCookie(cookieValue);
  if (!data) return null;
  
  if (data.expires && data.expires < Date.now()) {
    deleteCookie(PARTNER_SESSION_COOKIE);
    return null;
  }
  
  return data;
}

// Check if user has signin flow (temporary auth during OTP/password steps)
export function hasSigninFlow() {
  const cookieValue = getCookie(SIGNIN_FLOW_COOKIE);
  if (!cookieValue) return false;
  
  const data = parseCookie(cookieValue);
  if (!data) return false;
  
  if (data.expires && data.expires < Date.now()) {
    deleteCookie(SIGNIN_FLOW_COOKIE);
    return false;
  }
  
  return true;
}

// Get signin flow data - CRITICAL: matches PHP backend structure
export function getSigninFlow() {
  const cookieValue = getCookie(SIGNIN_FLOW_COOKIE);
  if (!cookieValue) return null;
  
  const data = parseCookie(cookieValue);
  if (!data) return null;
  
  if (data.expires && data.expires < Date.now()) {
    deleteCookie(SIGNIN_FLOW_COOKIE);
    return null;
  }
  
  return data;
}

// ============ SESSION MANAGEMENT FUNCTIONS ============

// Set signin flow (after successful signin API call)
// Matches PHP backend SessionManager::setSigninFlow() structure
export function setSigninFlow(data) {
  const flowData = {
    email: data.email,
    mode: data.mode || "pending-otp", // pending-otp, set-password, compare-password
    flow: data.flow || null,           // "signup" | "signin"
    partnerId: data.partnerId || null, // ✅ REQUIRED for OTP verify
    isFirstTime: data.isFirstTime || false,
    phoneNumber: data.phoneNumber || null,
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes (matches PHP)
  };

  setCookie(SIGNIN_FLOW_COOKIE, flowData, 1); // 1 day max
}


// Update signin flow mode (after OTP verification)
export function updateSigninFlowMode(mode) {
  const currentFlow = getSigninFlow();
  if (!currentFlow) return;
  
  const updatedFlow = {
    ...currentFlow,
    mode: mode, // set-password or compare-password
    expires: Date.now() + 15 * 60 * 1000, // Reset expiry
  };
  
  setCookie(SIGNIN_FLOW_COOKIE, updatedFlow, 1);
}

// Set partner session (after successful password set/compare)
// Matches PHP backend SessionManager::setPartnerNetSession() structure
export function setPartnerSession(data) {
  const sessionData = {
    email: data.email,
    partnerNetId: data.partnerNetId || data.partner_net_id,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  
  setCookie(PARTNER_SESSION_COOKIE, sessionData, 7);
}

// Clear signin flow (after password setup or logout)
export function clearSigninFlow() {
  deleteCookie(SIGNIN_FLOW_COOKIE);
}

// Clear all auth (logout)
export function clearAllAuth() {
  deleteCookie(SIGNIN_FLOW_COOKIE);
  deleteCookie(PARTNER_SESSION_COOKIE);
}

// ============ FLOW VALIDATION FUNCTIONS ============

// Check if user is in OTP verification flow
export function isInOtpFlow() {
  const flow = getSigninFlow();
  return flow && flow.mode === "pending-otp";
}

// Check if user is in set-password flow (first-time user)
export function isInSetPasswordFlow() {
  const flow = getSigninFlow();
  return flow && flow.mode === "set-password";
}

// Check if user is in compare-password flow (returning user)
export function isInComparePasswordFlow() {
  const flow = getSigninFlow();
  return flow && flow.mode === "compare-password";
}

// Check if user is in any signin flow (OTP or password)
export function isInAnySigninFlow() {
  const flow = getSigninFlow();
  return flow && ["pending-otp", "set-password", "compare-password"].includes(flow.mode);
}

// ============ API HELPER FUNCTIONS ============

// Logout - calls PHP backend and clears local cookies
export async function logout() {
  try {
    await fetch(`${PHP_API_URL}/logout`, {
      method: "GET",
      credentials: "include",
    });
  } catch (e) {
    console.error("Logout API error:", e);
  }
  clearAllAuth();
}

// Check session status with PHP backend
export async function checkSessionStatus() {
  try {
    const response = await fetch(`${PHP_API_URL}/check-session`, {
      method: "GET",
      credentials: "include",
    });
    
    if (!response.ok) {
      return { valid: false, error: "Session check failed" };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Session check error:", error);
    return { valid: false, error: "Network error" };
  }
}

// Validate session with PHP backend (for protected routes)
export async function validateSession() {
  try {
    const response = await fetch(`${PHP_API_URL}/validate-session`, {
      method: "GET",
      credentials: "include",
    });
    
    if (!response.ok) {
      return { valid: false, error: "Session invalid" };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Session validation error:", error);
    return { valid: false, error: "Network error" };
  }
}