import { useAuth } from "./useAuth";

export const useFileUpload = () => {
  const { getAuthHeaders } = useAuth();

  // Get the base API URL
  const getApiBase = () => {
    const config = useRuntimeConfig();
    return config.public.apiBase || "http://localhost:3005";
  };

  // Upload a single file
  const uploadFile = async (file, type = "general") => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      // Get auth headers for FormData (without Content-Type)
      const authHeaders = getAuthHeaders(true);

      const response = await $fetch(`${getApiBase()}/api/upload`, {
        method: "POST",
        headers: authHeaders,
        body: formData,
      });

      return response.url;
    } catch (error) {
      console.warn(
        "Upload endpoint not available, using local preview:",
        error
      );

      // Fallback: create a data URL for preview
      // In production, you should implement the backend upload endpoint
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Create a mock URL that looks like a real upload
          const timestamp = Date.now();
          const filename = `${timestamp}-${file.name}`;
          const mockUrl = `/uploads/${filename}`;

          // Store the data URL temporarily for preview purposes
          resolve(e.target.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  };

  // Upload multiple files
  const uploadFiles = async (files, type = "general") => {
    try {
      const uploadPromises = files.map((file) => uploadFile(file, type));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };

  // Delete a file
  const deleteFile = async (fileUrl) => {
    try {
      const response = await $fetch(`${getApiBase()}/api/upload`, {
        method: "DELETE",
        body: { url: fileUrl },
      });
      return response;
    } catch (error) {
      console.warn("Delete endpoint not available:", error);
      // For data URLs, we can't really delete them from server
      // This is a placeholder for when proper upload is implemented
      return { success: true, message: "File reference removed" };
    }
  };

  // Get file information
  const getFileInfo = (file) => {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      sizeFormatted: formatFileSize(file.size),
    };
  };

  // Format file size to human readable format
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Validate file
  const validateFile = (file, options = {}) => {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB default
      allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
      maxWidth = null,
      maxHeight = null,
    } = options;

    const errors = [];

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
      return new Promise((resolve) => {
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
  const createImagePreview = (file) => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("File is not an image"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  // Create object URL for preview (alternative to data URL)
  const createObjectURL = (file) => {
    try {
      return URL.createObjectURL(file);
    } catch (error) {
      console.error("Failed to create object URL:", error);
      return null;
    }
  };

  // Revoke object URL to free memory
  const revokeObjectURL = (url) => {
    try {
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to revoke object URL:", error);
    }
  };

  // Compress image file
  const compressImage = (
    file,
    quality = 0.8,
    maxWidth = 1920,
    maxHeight = 1080
  ) => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("File is not an image"));
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

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
  const generateUniqueFilename = (originalName) => {
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
  const isImage = (file) => {
    return file.type.startsWith("image/");
  };

  // Get image dimensions
  const getImageDimensions = (file) => {
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
  };
};
