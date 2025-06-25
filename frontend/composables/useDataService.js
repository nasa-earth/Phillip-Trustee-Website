// composables/useDataService.js
export const useDataService = () => {
  const authStore = useAuthStore();
  const apiUrl = useApiUrl();
  
  // Generic fetch function with authentication
  const fetchWithAuth = async (url, options = {}) => {
    // Ensure we have a valid token
    if (!authStore.accessToken) {
      throw new Error('No access token available');
    }
    
    const config = {
      headers: {
        'Authorization': `Bearer ${authStore.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      
      // Handle unauthorized errors (token expired)
      if (response.status === 401) {
        // Try to refresh the token
        await authStore.refreshToken();
        
        // Update the authorization header with the new token
        config.headers['Authorization'] = `Bearer ${authStore.accessToken}`;
        
        // Retry the request with the new token
        return fetch(url, config);
      }
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `API request failed with status ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  };
  
  // Dashboard data
  const getDashboardData = () => {
    return fetchWithAuth(apiUrl.admin.dashboard);
  };
  
  // Users
  const getUsers = (page = 1, limit = 10, search = '') => {
    const url = new URL(apiUrl.users.list);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
    if (search) {
      url.searchParams.append('search', search);
    }
    
    return fetchWithAuth(url);
  };
  
  const getUser = (id) => {
    return fetchWithAuth(apiUrl.users.get(id));
  };
  
  const createUser = (userData) => {
    return fetchWithAuth(apiUrl.users.create, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  };
  
  const updateUser = (id, userData) => {
    return fetchWithAuth(apiUrl.users.update(id), {
      method: 'PATCH',
      body: JSON.stringify(userData)
    });
  };
  
  const deleteUser = (id) => {
    return fetchWithAuth(apiUrl.users.delete(id), {
      method: 'DELETE'
    });
  };
  
  // Posts
  const getPosts = (categoryId) => {
    const url = new URL(apiUrl.posts.admin);
    if (categoryId) {
      url.searchParams.append('categoryId', categoryId);
    }
    
    return fetchWithAuth(url);
  };
  
  const getPost = (id) => {
    return fetchWithAuth(apiUrl.posts.get(id));
  };
  
  const createPost = (postData) => {
    return fetchWithAuth(apiUrl.posts.create, {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  };
  
  const updatePost = (id, postData) => {
    return fetchWithAuth(apiUrl.posts.update(id), {
      method: 'PATCH',
      body: JSON.stringify(postData)
    });
  };
  
  const deletePost = (id) => {
    return fetchWithAuth(apiUrl.posts.delete(id), {
      method: 'DELETE'
    });
  };
  
  // Events
  const getEvents = () => {
    return fetchWithAuth(apiUrl.events.admin);
  };
  
  const getEvent = (id) => {
    return fetchWithAuth(apiUrl.events.get(id));
  };
  
  const createEvent = (eventData) => {
    return fetchWithAuth(apiUrl.events.create, {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  };
  
  const updateEvent = (id, eventData) => {
    return fetchWithAuth(apiUrl.events.update(id), {
      method: 'PATCH',
      body: JSON.stringify(eventData)
    });
  };
  
  const deleteEvent = (id) => {
    return fetchWithAuth(apiUrl.events.delete(id), {
      method: 'DELETE'
    });
  };
  
  // Settings
  const getSettings = () => {
    return fetchWithAuth(apiUrl.settings.get);
  };
  
  const updateSettings = (settingsData) => {
    return fetchWithAuth(apiUrl.settings.update, {
      method: 'PUT',
      body: JSON.stringify(settingsData)
    });
  };
  
  return {
    // Dashboard
    getDashboardData,
    
    // Users
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    
    // Posts
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    
    // Events
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    
    // Settings
    getSettings,
    updateSettings,
  };
};
