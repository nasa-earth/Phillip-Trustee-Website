import { useAuth } from "./useAuth";
import { useAuthStore } from "~/stores/auth";

export interface FileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  maxWidth?: number | null;
  maxHeight?: number | null;
}

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  sizeFormatted: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface UploadResponse {
  url?: string;
  message?: string;
  [key: string]: any;
}

export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: FormData | string;
}

export const useFileUpload = () => {
  // Import auth composable for authentication headers
  const { getAuthHeaders, checkAuthStatus } = useAuth();

  // Get the base API URL
  const getApiBase = (): string => {
    const config = useRuntimeConfig();
    return config.public.apiBase || "http://localhost:3005";
  };

  // Upload a single file
  const uploadFile = async (
    file: File,
    type: string = "general"
  ): Promise<string> => {
    console.log("=== STARTING FILE UPLOAD ===");
    console.log("File:", file.name, file.size, file.type);

    try {
      // Check authentication before attempting upload
      const authStore = useAuthStore();

      console.log("=== PRE-UPLOAD AUTH CHECK ===");
      console.log("Is Authenticated:", authStore.isAuthenticated);
      console.log("Has Access Token:", !!authStore.accessToken);
      console.log("Has Refresh Token:", !!authStore.refreshToken);
      console.log("User Role:", authStore.user?.role);
      console.log("Has Admin Access:", authStore.hasAdminAccess);

      if (!authStore.isAuthenticated || !authStore.accessToken) {
        console.error("❌ Authentication check failed");
        throw new Error("Authentication required. Please log in again.");
      }

      // Check if user has required permissions
      if (!authStore.hasAdminAccess) {
        console.error("❌ Insufficient permissions:", authStore.user?.role);
        throw new Error("You need ADMIN or EDITOR role to upload files.");
      }

      // Check token expiration and refresh if needed
      if (authStore.accessToken) {
        try {
          const tokenParts = authStore.accessToken.split(".");
          if (tokenParts.length === 3) {
            const payload = JSON.parse(
              atob(tokenParts[1].replace(/-/g, "+").replace(/_/g, "/"))
            );
            const now = Date.now() / 1000;
            const timeUntilExpiry = payload.exp - now;

            console.log("🔐 Token Expiry Check:");
            console.log(
              "- Expires at:",
              new Date(payload.exp * 1000).toLocaleString()
            );
            console.log(
              "- Time until expiry:",
              Math.floor(timeUntilExpiry / 60),
              "minutes"
            );
            console.log("- Is expired:", payload.exp < now);

            // If token expires in less than 5 minutes or is already expired, refresh it
            if (timeUntilExpiry < 300) {
              // 5 minutes
              console.log("🔄 Token expiring soon, attempting refresh...");
              if (authStore.refreshToken) {
                const refreshSuccess = await authStore.refreshAccessToken();
                if (!refreshSuccess) {
                  throw new Error(
                    "Failed to refresh authentication token. Please log in again."
                  );
                }
                console.log("✅ Token refreshed successfully");
              } else {
                throw new Error(
                  "Token expired and no refresh token available. Please log in again."
                );
              }
            }
          }
        } catch (tokenError) {
          console.error("❌ Token validation error:", tokenError);
          // If we can't parse the token, try to refresh anyway
          if (authStore.refreshToken) {
            console.log("🔄 Token parsing failed, attempting refresh...");
            const refreshSuccess = await authStore.refreshAccessToken();
            if (!refreshSuccess) {
              throw new Error(
                "Failed to refresh authentication token. Please log in again."
              );
            }
          }
        }
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      // Get auth headers for FormData (without Content-Type)
      const authHeaders = getAuthHeaders(true);

      // Enhanced debugging for authentication
      console.log("=== AUTHENTICATION DEBUG ===");
      console.log("Auth Status:", checkAuthStatus());
      console.log(
        "Access Token:",
        authStore.accessToken
          ? `${authStore.accessToken.substring(0, 20)}...`
          : "NO TOKEN"
      );
      console.log("Auth Headers:", authHeaders);
      console.log(
        "Authorization Header:",
        authHeaders.Authorization || "MISSING"
      );
      console.log("==============================");

      console.log("Upload attempt:", {
        file: file.name,
        size: file.size,
        type: type,
        hasAuth: !!authHeaders.Authorization,
        apiUrl: `${getApiBase()}/api/upload`,
        authStatus: checkAuthStatus(),
      });

      let response = await fetch(`${getApiBase()}/api/upload`, {
        method: "POST",
        headers: authHeaders,
        body: formData,
      });

      // If we get 401, try once more with token refresh
      if (response.status === 401) {
        console.log("🔄 Got 401, attempting token refresh and retry...");

        if (authStore.refreshToken) {
          const refreshSuccess = await authStore.refreshAccessToken();
          if (refreshSuccess) {
            console.log("✅ Token refreshed, retrying upload...");
            const newAuthHeaders = getAuthHeaders(true);
            console.log(
              "🔄 New Authorization Header:",
              newAuthHeaders.Authorization?.substring(0, 30) + "..."
            );

            response = await fetch(`${getApiBase()}/api/upload`, {
              method: "POST",
              headers: newAuthHeaders,
              body: formData,
            });

            console.log("🔄 Retry response status:", response.status);
          } else {
            console.error("❌ Token refresh failed");
          }
        } else {
          console.error("❌ No refresh token available");
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("=== UPLOAD ERROR DEBUG ===");
        console.error("Status:", response.status);
        console.error("Status Text:", response.statusText);
        console.error(
          "Response Headers:",
          Object.fromEntries(response.headers.entries())
        );
        console.error("Error Text:", errorText);
        console.error("Request URL:", `${getApiBase()}/api/upload`);
        console.error("Request Headers:", authHeaders);
        console.error("==========================");

        // Handle authentication errors specifically
        if (response.status === 401) {
          console.error("❌ AUTHENTICATION FAILED AFTER ALL ATTEMPTS");
          const authStatus = checkAuthStatus();
          console.error("Final auth status:", authStatus);

          // Check if the backend is expecting something different
          console.error("🔍 Debugging suggestions:");
          console.error(
            "1. Check if backend upload endpoint requires authentication"
          );
          console.error("2. Verify JWT token format is correct");
          console.error("3. Check if user role has upload permissions");
          console.error("4. Verify API endpoint URL is correct");
          console.error("5. Check backend logs for token validation errors");

          // Try to decode the current token for more info
          if (authStore.accessToken) {
            try {
              const tokenParts = authStore.accessToken.split(".");
              if (tokenParts.length === 3) {
                const payload = JSON.parse(
                  atob(tokenParts[1].replace(/-/g, "+").replace(/_/g, "/"))
                );
                console.error("🔐 Current token info:");
                console.error("- User ID:", payload.sub);
                console.error("- Email:", payload.email);
                console.error("- Role:", payload.role);
                console.error(
                  "- Expires:",
                  new Date(payload.exp * 1000).toLocaleString()
                );
                console.error("- Is Expired:", payload.exp < Date.now() / 1000);
              }
            } catch (e) {
              console.error("❌ Could not decode token:", e);
            }
          }

          throw new Error(
            "Authentication failed. Please check console for details and try logging in again."
          );
        }

        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log("Upload successful:", result);

      // Return the URL directly if response is a string, otherwise extract the URL
      if (typeof result === "string") {
        return result;
      } else if (result && result.url) {
        return result.url;
      } else {
        throw new Error("Invalid response format from upload service");
      }
    } catch (error) {
      console.error("Upload failed:", error);

      const errorObj = error as any;

      // If it's an authentication error, throw it up
      if (errorObj.status === 401 || errorObj.statusCode === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }

      // If it's a server error, throw it up
      if (errorObj.status >= 500 || errorObj.statusCode >= 500) {
        throw new Error("Server error during upload. Please try again.");
      }

      console.warn("Upload endpoint error, using local preview:", error);

      // Fallback: create a data URL for preview
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  };

  // Debug function to test authentication
  const testAuth = async (): Promise<void> => {
    const authStore = useAuthStore();
    const authHeaders = getAuthHeaders(false);

    console.log("=== COMPREHENSIVE AUTHENTICATION TEST ===");
    console.log("Is Authenticated:", authStore.isAuthenticated);
    console.log("Has Access Token:", !!authStore.accessToken);
    console.log(
      "Token Preview:",
      authStore.accessToken
        ? `${authStore.accessToken.substring(0, 20)}...`
        : "NO TOKEN"
    );
    console.log("User Role:", authStore.user?.role);
    console.log("Has Admin Access:", authStore.hasAdminAccess);
    console.log("Auth Headers:", authHeaders);
    console.log(
      "Authorization Header:",
      authHeaders.Authorization || "MISSING"
    );

    // Test 1: Admin dashboard endpoint (should work)
    console.log("\n🧪 Test 1: Admin Dashboard Endpoint");
    try {
      const response = await fetch(`${getApiBase()}/api/admin/dashboard`, {
        method: "GET",
        headers: authHeaders,
      });

      console.log("Dashboard Request Status:", response.status);
      console.log("Dashboard Request Success:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Dashboard Request Error:", errorText);
      } else {
        console.log("✅ Dashboard authentication working");
      }
    } catch (error) {
      console.error("❌ Dashboard Request Failed:", error);
    }

    // Test 2: Upload endpoint with GET (should return 405 Method Not Allowed if auth works)
    console.log("\n🧪 Test 2: Upload Endpoint Access Check");
    try {
      const response = await fetch(`${getApiBase()}/api/upload`, {
        method: "GET",
        headers: authHeaders,
      });

      console.log("Upload GET Status:", response.status);

      if (response.status === 405) {
        console.log(
          "✅ Upload endpoint accessible (405 = Method Not Allowed expected for GET)"
        );
      } else if (response.status === 401) {
        console.log("❌ Upload endpoint returns 401 - authentication issue");
        const errorText = await response.text();
        console.log("Upload Error:", errorText);
      } else {
        console.log("ℹ️ Unexpected status:", response.status);
        const responseText = await response.text();
        console.log("Response:", responseText);
      }
    } catch (error) {
      console.error("❌ Upload Endpoint Test Failed:", error);
    }

    // Test 3: Token analysis
    console.log("\n🔐 Test 3: Token Analysis");
    if (authStore.accessToken) {
      try {
        const tokenParts = authStore.accessToken.split(".");
        if (tokenParts.length === 3) {
          const header = JSON.parse(
            atob(tokenParts[0].replace(/-/g, "+").replace(/_/g, "/"))
          );
          const payload = JSON.parse(
            atob(tokenParts[1].replace(/-/g, "+").replace(/_/g, "/"))
          );
          const now = Date.now() / 1000;

          console.log("Token Header:", header);
          console.log("Token Payload:", payload);
          console.log("Token Valid:", payload.exp > now);
          console.log(
            "Expires in:",
            Math.floor((payload.exp - now) / 60),
            "minutes"
          );

          if (payload.exp <= now) {
            console.log("❌ TOKEN IS EXPIRED!");
          } else if (payload.exp - now < 300) {
            console.log("⚠️ Token expires in less than 5 minutes");
          } else {
            console.log("✅ Token is valid and not expiring soon");
          }
        } else {
          console.log("❌ Invalid token format");
        }
      } catch (e) {
        console.error("❌ Token parsing failed:", e);
      }
    } else {
      console.log("❌ No token available");
    }

    console.log("==========================================");
  };

  // Upload multiple files
  const uploadFiles = async (
    files: File[],
    type: string = "general"
  ): Promise<string[]> => {
    try {
      const uploadPromises = files.map((file) => uploadFile(file, type));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };

  // Delete a file
  const deleteFile = async (fileUrl: string): Promise<UploadResponse> => {
    try {
      // Get auth headers for the delete request
      const authHeaders = getAuthHeaders(false);

      const response = await $fetch<UploadResponse>(
        `${getApiBase()}/api/upload`,
        {
          method: "DELETE",
          headers: authHeaders,
          body: { url: fileUrl },
        }
      );
      return response;
    } catch (error) {
      console.warn("Delete endpoint not available:", error);
      // For data URLs, we can't really delete them from server
      // This is a placeholder for when proper upload is implemented
      return { success: true, message: "File reference removed" };
    }
  };

  // Get file information
  const getFileInfo = (file: File): FileInfo => {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      sizeFormatted: formatFileSize(file.size),
    };
  };

  // Format file size to human readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Validate file
  const validateFile = (
    file: File,
    options: FileUploadOptions = {}
  ): FileValidationResult | Promise<FileValidationResult> => {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB default
      allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
      maxWidth = null,
      maxHeight = null,
    } = options;

    const errors: string[] = [];

    // Check file size
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${formatFileSize(maxSize)}`);
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      const allowedExtensions = allowedTypes
        .map((type) => type.split("/")[1].toUpperCase())
        .join(", ");
      errors.push(`File type must be one of: ${allowedExtensions}`);
    }

    // Check image dimensions (if applicable and dimensions are specified)
    if (file.type.startsWith("image/") && (maxWidth || maxHeight)) {
      return new Promise<FileValidationResult>((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (maxWidth && img.width > maxWidth) {
            errors.push(
              `Image width must be less than ${maxWidth}px (current: ${img.width}px)`
            );
          }
          if (maxHeight && img.height > maxHeight) {
            errors.push(
              `Image height must be less than ${maxHeight}px (current: ${img.height}px)`
            );
          }
          URL.revokeObjectURL(img.src); // Clean up object URL
          resolve({ isValid: errors.length === 0, errors });
        };
        img.onerror = () => {
          errors.push("Invalid image file");
          resolve({ isValid: false, errors });
        };
        img.src = URL.createObjectURL(file);
      });
    }

    return { isValid: errors.length === 0, errors };
  };

  // Create image preview
  const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("File is not an image"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  // Create object URL for preview (alternative to data URL)
  const createObjectURL = (file: File): string | null => {
    try {
      return URL.createObjectURL(file);
    } catch (error) {
      console.error("Failed to create object URL:", error);
      return null;
    }
  };

  // Revoke object URL to free memory
  const revokeObjectURL = (url: string): void => {
    try {
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to revoke object URL:", error);
    }
  };

  // Compress image file
  const compressImage = (
    file: File,
    quality: number = 0.8,
    maxWidth: number = 1920,
    maxHeight: number = 1080
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("File is not an image"));
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a new File object with compressed data
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          file.type,
          quality
        );

        URL.revokeObjectURL(img.src);
      };

      img.onerror = () => {
        reject(new Error("Failed to load image for compression"));
      };

      img.src = URL.createObjectURL(file);
    });
  };

  // Generate unique filename
  const generateUniqueFilename = (originalName: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split(".").pop();
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
    const sanitizedName = nameWithoutExt
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();

    return `${sanitizedName}-${timestamp}-${random}.${extension}`;
  };

  // Check if file is an image
  const isImage = (file: File): boolean => {
    return file.type.startsWith("image/");
  };

  // Get image dimensions
  const getImageDimensions = (file: File): Promise<ImageDimensions> => {
    return new Promise((resolve, reject) => {
      if (!isImage(file)) {
        reject(new Error("File is not an image"));
        return;
      }

      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height,
        });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
      img.src = URL.createObjectURL(file);
    });
  };

  return {
    uploadFile,
    uploadFiles,
    deleteFile,
    getFileInfo,
    formatFileSize,
    validateFile,
    createImagePreview,
    createObjectURL,
    revokeObjectURL,
    compressImage,
    generateUniqueFilename,
    isImage,
    getImageDimensions,
    testAuth, // Debug function
  };
};
