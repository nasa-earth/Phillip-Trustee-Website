// composables/useEvent.ts
import { useApiUrl } from "./useApiUrl";
import { useAuth } from "./useAuth";

// Types and interfaces
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  images?: EventImage[];
}

export interface EventImage {
  id: string;
  url: string;
  eventId: string;
  createdAt: string;
}

export interface CreateEventData {
  title: string;
  slug?: string;
  description: string;
  thumbnail?: string;
  published?: boolean;
}

export interface UpdateEventData extends Partial<CreateEventData> {}

export interface EventsApiResponse {
  events?: Event[];
  data?:
    | Event[]
    | {
        events?: Event[];
        total?: number;
        page?: number;
        limit?: number;
        totalPages?: number;
      };
  items?: Event[];
  results?: Event[];
  total?: number;
  [key: string]: any;
}

export interface GetAdminEventsParams {
  page?: number;
  limit?: number;
  search?: string;
  published?: boolean;
}

export const useEventService = () => {
  const apiUrl = useApiUrl();
  const { getAuthHeaders } = useAuth();

  // Get the base API URL
  const getApiBase = (): string => {
    const config = useRuntimeConfig();
    return config.public.apiBase;
  };

  // Cache for events to improve performance and reduce API calls
  let cachedEvents: Event[] | null = null;
  let cacheTimestamp: number | null = null;
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Get all published events (for public pages)
  const getEvents = async (forceRefresh: boolean = false): Promise<Event[]> => {
    try {
      // Use cache if available and not expired and not forcing refresh
      const now = Date.now();
      if (
        !forceRefresh &&
        cachedEvents &&
        cacheTimestamp &&
        now - cacheTimestamp < CACHE_DURATION
      ) {
        console.log("Using cached events data");
        return cachedEvents;
      }

      console.log("Fetching fresh events data from API");
      const response = await $fetch<any>(`${getApiBase()}/api/events`);

      console.log("Raw API response:", response);

      let eventsArray: Event[] = [];

      // Handle different response formats
      if (Array.isArray(response)) {
        eventsArray = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        eventsArray = response.data;
      } else if (response && Array.isArray(response.events)) {
        eventsArray = response.events;
      } else {
        console.warn("Unexpected response format:", response);
        eventsArray = [];
      }

      // Update cache
      if (eventsArray.length > 0) {
        cachedEvents = eventsArray;
        cacheTimestamp = now;
      }

      // Backend now returns only published events, no need to filter
      return eventsArray;
    } catch (error) {
      console.error("Error fetching events:", error);
      return []; // Return empty array instead of throwing
    }
  };

  // Get upcoming events only
  const getUpcomingEvents = async (): Promise<Event[]> => {
    try {
      // Since there's no eventDate field, just return all published events
      const response = await $fetch<Event[]>(`${getApiBase()}/api/events`);
      return response;
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw error;
    }
  };

  // Get event by slug (for public access - only published events)
  const getEventBySlug = async (slug: string): Promise<Event | null> => {
    try {
      if (!slug) {
        console.error("No slug provided to getEventBySlug");
        return null;
      }

      // First try to find it in the cache to avoid unnecessary API calls
      if (cachedEvents && cachedEvents.length > 0) {
        const cachedEvent = cachedEvents.find((event) => event.slug === slug);
        if (cachedEvent) {
          console.log("Found event in cache:", slug);
          return cachedEvent;
        }
      }

      console.log("Fetching event by slug from API:", slug);
      const response = await $fetch<any>(
        `${getApiBase()}/api/events/by-slug/${slug}`
      );

      console.log("Raw slug API response:", response);

      // Handle wrapped response
      if (response && response.data) {
        return response.data;
      } else if (response && response.id) {
        return response;
      }

      return null;
    } catch (error: any) {
      console.error("Error fetching event by slug:", error);
      if (error.status === 404 || error.statusCode === 404) {
        return null; // Return null for not found instead of throwing
      }
      throw error;
    }
  };

  // Admin functions - require authentication
  const getAdminEvents = async (
    params: GetAdminEventsParams = {}
  ): Promise<any> => {
    try {
      const headers = getAuthHeaders();
      console.log("Making admin events request with headers:", headers);

      // Build query parameters for pagination
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.search) queryParams.append("search", params.search);
      if (params.published !== undefined)
        queryParams.append("published", params.published.toString());

      const queryString = queryParams.toString()
        ? `?${queryParams.toString()}`
        : "";

      // Try the admin endpoint first
      try {
        const apiUrl = `${getApiBase()}/api/admin/events${queryString}`;
        console.log("API URL:", apiUrl);
        const response = await $fetch<EventsApiResponse>(apiUrl, {
          headers: headers,
        });

        console.log("Admin events API response:", response);

        // Handle the response structure based on what we found
        if (
          response &&
          response.data &&
          typeof response.data === "object" &&
          !Array.isArray(response.data) &&
          "events" in response.data
        ) {
          // Return the structure that EventsManagement expects: {events: [...], total: X}
          console.log("Returning response.data format with events and total");
          return response.data;
        }

        // If we have events directly in response
        if (response && response.events && Array.isArray(response.events)) {
          console.log("Returning direct response format");
          return response;
        }

        // If response is an array, wrap it
        if (Array.isArray(response)) {
          console.log("Wrapping array response");
          return {
            events: response,
            total: response.length,
            page: 1,
            limit: response.length,
          };
        }

        console.warn("Unexpected response format, trying to parse:", response);
        return { events: [], total: 0 };
      } catch (adminError) {
        console.warn("Admin endpoint failed:", adminError);

        // Return empty result for now
        return { events: [], total: 0 };
      }
    } catch (error: any) {
      console.error("Error fetching admin events:", error);

      // Return empty result with error indication
      return { events: [], total: 0, error: error.message };
    }
  };

  const createEvent = async (eventData: CreateEventData): Promise<Event> => {
    try {
      console.log("Creating event with data:", eventData);
      console.log("Auth headers:", getAuthHeaders());

      const response = await $fetch<Event>(`${getApiBase()}/api/events`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: eventData,
      });

      console.log("Event creation response:", response);

      // Invalidate cache after creating a new event
      cachedEvents = null;
      cacheTimestamp = null;

      return response;
    } catch (error: any) {
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

  const updateEvent = async (
    id: string,
    eventData: UpdateEventData
  ): Promise<Event> => {
    try {
      const response = await $fetch<Event>(`${getApiBase()}/api/events/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: eventData,
      });

      // Update the event in cache if it exists
      if (cachedEvents && cachedEvents.length > 0) {
        const index = cachedEvents.findIndex((event) => event.id === id);
        if (index !== -1) {
          cachedEvents[index] = {
            ...cachedEvents[index],
            ...eventData,
          } as Event;
        } else {
          // Invalidate cache if we can't find the event
          cachedEvents = null;
          cacheTimestamp = null;
        }
      }

      return response;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const deleteEvent = async (id: string): Promise<any> => {
    try {
      const response = await $fetch(`${getApiBase()}/api/events/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      // Remove the event from cache if it exists
      if (cachedEvents && cachedEvents.length > 0) {
        cachedEvents = cachedEvents.filter((event) => event.id !== id);
      }

      return response;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  const previewEventBySlug = async (slug: string): Promise<Event> => {
    try {
      const response = await $fetch<any>(
        `${getApiBase()}/api/events/by-slug/${slug}/preview`,
        {
          headers: getAuthHeaders(),
        }
      );

      // Handle wrapped response
      if (response && response.data) {
        return response.data;
      } else if (response && response.id) {
        return response;
      }

      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Error previewing event:", error);
      throw error;
    }
  };

  // Get event images
  const getEventImages = async (eventId: string): Promise<EventImage[]> => {
    try {
      const response = await $fetch<EventImage[]>(
        `${getApiBase()}/api/events/${eventId}/images`,
        {
          headers: getAuthHeaders(),
        }
      );
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching event images:", error);
      return [];
    }
  };

  // Create event image
  const createEventImage = async (
    eventId: string,
    imageUrl: string
  ): Promise<EventImage> => {
    try {
      const response = await $fetch<EventImage>(
        `${getApiBase()}/api/events/${eventId}/images`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: {
            url: imageUrl,
            eventId: eventId,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating event image:", error);
      throw error;
    }
  };

  // Force refresh the events cache
  const refreshEventsCache = async (): Promise<Event[]> => {
    try {
      cachedEvents = null;
      cacheTimestamp = null;
      return await getEvents(true);
    } catch (error) {
      console.error("Error refreshing events cache:", error);
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
    getEventImages,
    createEventImage,
    refreshEventsCache,
  };
};
