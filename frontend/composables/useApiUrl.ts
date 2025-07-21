// composables/useApiUrl.ts
export interface ApiEndpoints {
  auth: {
    login: string;
    debugLogin: string;
    refresh: string;
    register: string;
    logout: string;
  };
  posts: {
    list: string;
    get: (id: string | number) => string;
  };
  categories: {
    list: string;
  };
  events: {
    list: string;
  };
  users: {
    list: string;
    get: (id: string | number) => string;
    create: string;
    update: (id: string | number) => string;
    delete: (id: string | number) => string;
  };
  partners: {
    list: string;
    get: (id: string | number) => string;
    create: string;
    update: (id: string | number) => string;
    delete: (id: string | number) => string;
  };
  faqs: {
    list: string;
    get: (id: string | number) => string;
    create: string;
    update: (id: string | number) => string;
    delete: (id: string | number) => string;
    reorder: string;
  };
}

export const useApiUrl = (): ApiEndpoints => {
  const config = useRuntimeConfig();
  const apiBase: string = config.public.apiBase;

  // Log the API base URL to help with debugging
  console.log("API Base URL:", apiBase);

  return {
    auth: {
      login: `${apiBase}/api/auth/login`,
      debugLogin: `${apiBase}/api/auth/debug-login`, // Add debug endpoint
      refresh: `${apiBase}/api/auth/refresh`,
      register: `${apiBase}/api/auth/register`,
      logout: `${apiBase}/api/auth/logout`,
    },
    // Add other API endpoints as needed
    posts: {
      list: `${apiBase}/api/posts`,
      get: (id: string | number): string => `${apiBase}/api/posts/${id}`,
    },
    categories: {
      list: `${apiBase}/api/categories`,
    },
    events: {
      list: `${apiBase}/api/events`,
    },
    users: {
      list: `${apiBase}/api/users`,
      get: (id: string | number): string => `${apiBase}/api/users/${id}`,
      create: `${apiBase}/api/users`,
      update: (id: string | number): string => `${apiBase}/api/users/${id}`,
      delete: (id: string | number): string => `${apiBase}/api/users/${id}`,
    },
    partners: {
      list: `${apiBase}/api/partners`,
      get: (id: string | number): string => `${apiBase}/api/partners/${id}`,
      create: `${apiBase}/api/partners`,
      update: (id: string | number): string => `${apiBase}/api/partners/${id}`,
      delete: (id: string | number): string => `${apiBase}/api/partners/${id}`,
    },
    faqs: {
      list: `${apiBase}/api/faqs`,
      get: (id: string | number): string => `${apiBase}/api/faqs/${id}`,
      create: `${apiBase}/api/faqs`,
      update: (id: string | number): string => `${apiBase}/api/faqs/${id}`,
      delete: (id: string | number): string => `${apiBase}/api/faqs/${id}`,
      reorder: `${apiBase}/api/faqs/reorder`,
    },
  };
};
