import { useApiUrl } from "./useApiUrl";
import { useAuth } from "./useAuth";

export const useEventService = () => {
  const { auth, events, posts } = useApiUrl();
  const { getAuthHeaders } = useAuth();

  // Get the base API URL
  const getApiBase = () => {
    const config = useRuntimeConfig();
    return config.public.apiBase;
  };

  // Get all published events (for public pages)
  const getEvents = async () => {
    try {
      const response = await $fetch(`${getApiBase()}/api/events`);
      // Backend now returns only published events, no need to filter
      return response;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };

  // Get upcoming events only
  const getUpcomingEvents = async () => {
    try {
      // Since there's no specific upcoming endpoint, get all events and filter
      const response = await $fetch(`${getApiBase()}/api/events`);
      // Filter for upcoming events (events with future dates)
      const now = new Date();
      return response.filter((event) => new Date(event.eventDate) > now);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw error;
    }
  };

  // Get event by slug (for public access - only published events)
  const getEventBySlug = async (slug) => {
    try {
      const response = await $fetch(
        `${getApiBase()}/api/events/by-slug/${slug}`
      );

      return response;
    } catch (error) {
      console.error("Error fetching event by slug:", error);
      throw error;
    }
  };

  // Admin functions - require authentication
  const getAdminEvents = async () => {
    try {
      const headers = getAuthHeaders();
      console.log("Making admin events request with headers:", headers);
      console.log("API URL:", `${getApiBase()}/api/events/admin/all`);

      // Use the admin-specific endpoint that returns all events (published and unpublished)
      const response = await $fetch(`${getApiBase()}/api/events/admin/all`, {
        headers: headers,
      });
      return response;
    } catch (error) {
      console.error("Error fetching admin events:", error);
      console.error("Error details:", {
        status: error.status || error.statusCode,
        statusText: error.statusText,
        data: error.data,
        message: error.message,
      });

      // Fallback to public events endpoint if admin endpoint fails
      if (error.status === 404 || error.statusCode === 404) {
        console.warn(
          "Admin endpoint not found, falling back to public events endpoint"
        );
        try {
          const fallbackResponse = await $fetch(`${getApiBase()}/api/events`, {
            headers: headers,
          });
          return fallbackResponse;
        } catch (fallbackError) {
          console.error("Fallback also failed:", fallbackError);
          throw error; // Throw original error
        }
      }

      throw error;
    }
  };

  const createEvent = async (eventData) => {
    try {
      console.log("Creating event with data:", eventData);
      console.log("Auth headers:", getAuthHeaders());

      const response = await $fetch(`${getApiBase()}/api/events`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: eventData,
      });

      console.log("Event creation response:", response);
      return response;
    } catch (error) {
      console.error("Error creating event:", error);
      console.error("Error details:", {
        status: error.status || error.statusCode,
        statusText: error.statusText,
        data: error.data,
        message: error.message,
      });
      throw error;
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      const response = await $fetch(`${getApiBase()}/api/events/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: eventData,
      });
      return response;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const deleteEvent = async (id) => {
    try {
      const response = await $fetch(`${getApiBase()}/api/events/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      return response;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  const previewEventBySlug = async (slug) => {
    try {
      const response = await $fetch(
        `${getApiBase()}/api/events/by-slug/${slug}/preview`,
        {
          headers: getAuthHeaders(),
        }
      );
      return response;
    } catch (error) {
      console.error("Error previewing event:", error);
      throw error;
    }
  };

  return {
    getEvents,
    getUpcomingEvents,
    getEventBySlug,
    getAdminEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    previewEventBySlug,
  };
};
