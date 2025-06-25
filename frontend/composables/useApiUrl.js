// composables/useApiUrl.js
export const useApiUrl = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  // Log the API base URL to help with debugging
  console.log("API Base URL:", apiBase);
  return {
    auth: {
      login: `${apiBase}/api/auth/login`,
      debugLogin: `${apiBase}/api/auth/debug-login`, // Add debug endpoint
      refresh: `${apiBase}/api/auth/refresh`,
      register: `${apiBase}/api/auth/register`,
    },
    // Add other API endpoints as needed
    posts: {
      list: `${apiBase}/api/posts`,
      admin: `${apiBase}/api/posts/admin`,
      get: (id) => `${apiBase}/api/posts/${id}`,
      create: `${apiBase}/api/posts`,
      update: (id) => `${apiBase}/api/posts/${id}`,
      delete: (id) => `${apiBase}/api/posts/${id}`,
    },
    categories: {
      list: `${apiBase}/api/categories`,
      admin: `${apiBase}/api/categories/admin`,
      get: (id) => `${apiBase}/api/categories/${id}`,
      create: `${apiBase}/api/categories`,
      update: (id) => `${apiBase}/api/categories/${id}`,
      delete: (id) => `${apiBase}/api/categories/${id}`,
    },
    events: {
      list: `${apiBase}/api/events`,
      admin: `${apiBase}/api/events/admin`,
      upcoming: `${apiBase}/api/events/upcoming`,
      get: (id) => `${apiBase}/api/events/${id}`,
      create: `${apiBase}/api/events`,
      update: (id) => `${apiBase}/api/events/${id}`,
      delete: (id) => `${apiBase}/api/events/${id}`,
    },
    users: {
      list: `${apiBase}/api/users`,
      get: (id) => `${apiBase}/api/users/${id}`,
      create: `${apiBase}/api/users`,
      update: (id) => `${apiBase}/api/users/${id}`,
      delete: (id) => `${apiBase}/api/users/${id}`,
    },
    settings: {
      get: `${apiBase}/api/settings`,
      update: `${apiBase}/api/settings`,
    },
    faqs: {
      list: `${apiBase}/api/faqs`,
      get: (id) => `${apiBase}/api/faqs/${id}`,
      create: `${apiBase}/api/faqs`,
      update: (id) => `${apiBase}/api/faqs/${id}`,
      delete: (id) => `${apiBase}/api/faqs/${id}`,
      reorder: `${apiBase}/api/faqs/reorder`,
    },
    partners: {
      list: `${apiBase}/api/partners`,
      get: (id) => `${apiBase}/api/partners/${id}`,
      create: `${apiBase}/api/partners`,
      update: (id) => `${apiBase}/api/partners/${id}`,
      delete: (id) => `${apiBase}/api/partners/${id}`,
    },
    pages: {
      list: `${apiBase}/api/pages`,
      get: (id) => `${apiBase}/api/pages/${id}`,
      create: `${apiBase}/api/pages`,
      update: (id) => `${apiBase}/api/pages/${id}`,
      delete: (id) => `${apiBase}/api/pages/${id}`,
    },
    admin: {
      dashboard: `${apiBase}/api/admin/dashboard`,
      posts: `${apiBase}/api/admin/posts`,
    },
  };
};
