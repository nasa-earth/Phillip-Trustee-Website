// composables/useDashboardService.ts
import { useApiUrl } from "./useApiUrl";
import { useAuth } from "./useAuth";

// Types and interfaces
export interface EventStats {
  total: number;
  published: number;
  draft: number;
  recent: any[];
}

export interface UserStats {
  total: number;
  admins: number;
  editors: number;
  recent: any[];
}

export interface PartnerStats {
  total: number;
  active: number;
  recent: any[];
}

export interface FaqStats {
  total: number;
  categories: number;
  recent: any[];
}

export interface DashboardStats {
  events: EventStats;
  users: UserStats;
  partners: PartnerStats;
  faqs: FaqStats;
}

export interface HealthStatus {
  status: "healthy" | "error" | "unknown";
  message: string;
}

export interface SystemHealth {
  database: HealthStatus;
  api: HealthStatus;
  storage: HealthStatus;
  overall: "healthy" | "error" | "unknown";
}

export interface RecentActivity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  user?: string;
}

export interface SummaryData {
  stats: DashboardStats | null;
  activities: RecentActivity[];
  health: SystemHealth | null;
}

export interface DashboardApiResponse {
  stats?: {
    events?: number;
    publishedEvents?: number;
    users?: number;
    partners?: number;
    faqs?: number;
  };
  recentActivity?: RecentActivity[];
}

export interface EventsStatsResponse {
  total?: number;
}

export const useDashboardService = () => {
  const apiUrl = useApiUrl();
  const { getAuthHeaders } = useAuth();

  // Get the base API URL
  const getApiBase = (): string => {
    const config = useRuntimeConfig();
    return config.public.apiBase || "http://localhost:3005";
  };

  // Get dashboard statistics
  const getDashboardStats = async (): Promise<DashboardStats> => {
    try {
      const headers = getAuthHeaders();
      console.log("Fetching dashboard stats...");

      // Try main dashboard endpoint first
      try {
        const response = await $fetch<DashboardApiResponse>(
          `${getApiBase()}/api/admin/dashboard`,
          {
            headers,
          }
        );
        console.log("Dashboard response:", response);

        if (response && response.stats) {
          return {
            events: {
              total: response.stats.events || 0,
              published: response.stats.publishedEvents || 0,
              draft:
                (response.stats.events || 0) -
                (response.stats.publishedEvents || 0),
              recent: [],
            },
            users: {
              total: response.stats.users || 0,
              admins: 0,
              editors: 0,
              recent: [],
            },
            partners: {
              total: response.stats.partners || 0,
              active: response.stats.partners || 0,
              recent: [],
            },
            faqs: {
              total: response.stats.faqs || 0,
              categories: 0,
              recent: [],
            },
          };
        }
      } catch (dashboardError) {
        console.warn(
          "Main dashboard endpoint failed, trying events stats:",
          dashboardError
        );
      }

      // Fallback to available endpoints
      try {
        const eventsStats = await $fetch<EventsStatsResponse>(
          `${getApiBase()}/api/admin/events/stats`,
          { headers }
        );
        return {
          events: {
            total: eventsStats.total || 0,
            published: 0,
            draft: eventsStats.total || 0,
            recent: [],
          },
          users: {
            total: 0,
            admins: 0,
            editors: 0,
            recent: [],
          },
          partners: {
            total: 0,
            active: 0,
            recent: [],
          },
          faqs: {
            total: 0,
            categories: 0,
            recent: [],
          },
        };
      } catch (error) {
        console.error("All endpoints failed:", error);
      }

      // Return fallback stats if all API calls fail
      return {
        events: { total: 0, published: 0, draft: 0, recent: [] },
        users: { total: 0, admins: 0, editors: 0, recent: [] },
        partners: { total: 0, active: 0, recent: [] },
        faqs: { total: 0, categories: 0, recent: [] },
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);

      // Return fallback stats if API calls fail
      return {
        events: { total: 0, published: 0, draft: 0, recent: [] },
        users: { total: 0, admins: 0, editors: 0, recent: [] },
        partners: { total: 0, active: 0, recent: [] },
        faqs: { total: 0, categories: 0, recent: [] },
      };
    }
  };

  // Get recent activities
  const getRecentActivities = async (): Promise<RecentActivity[]> => {
    try {
      const headers = getAuthHeaders();
      console.log("Fetching recent activities...");

      // Try to get recent activities from dashboard endpoint
      try {
        const response = await $fetch<DashboardApiResponse>(
          `${getApiBase()}/api/admin/dashboard`,
          {
            headers,
          }
        );

        if (response && response.recentActivity) {
          return response.recentActivity;
        }
      } catch (error) {
        console.warn("Failed to fetch recent activities:", error);
      }

      // Return empty array if no activities found
      return [];
    } catch (error) {
      console.error("Error fetching recent activities:", error);
      return [];
    }
  };

  // Get system health status
  const getSystemHealth = async (): Promise<SystemHealth> => {
    try {
      const headers = getAuthHeaders();
      console.log("Fetching system health...");

      // Basic health check - try to ping the dashboard endpoint
      try {
        await $fetch(`${getApiBase()}/api/admin/dashboard`, {
          headers,
        });

        return {
          database: { status: "healthy", message: "Connected" },
          api: { status: "healthy", message: "Responsive" },
          storage: { status: "healthy", message: "Available" },
          overall: "healthy",
        };
      } catch (error) {
        return {
          database: { status: "error", message: "Connection failed" },
          api: { status: "error", message: "Not responding" },
          storage: { status: "unknown", message: "Cannot check" },
          overall: "error",
        };
      }
    } catch (error) {
      console.error("Error fetching system health:", error);
      return {
        database: { status: "error", message: "Unknown" },
        api: { status: "error", message: "Unknown" },
        storage: { status: "error", message: "Unknown" },
        overall: "error",
      };
    }
  };

  // Get summary data for dashboard
  const getSummaryData = async (): Promise<SummaryData> => {
    try {
      const [stats, activities, health] = await Promise.allSettled([
        getDashboardStats(),
        getRecentActivities(),
        getSystemHealth(),
      ]);

      return {
        stats: stats.status === "fulfilled" ? stats.value : null,
        activities: activities.status === "fulfilled" ? activities.value : [],
        health: health.status === "fulfilled" ? health.value : null,
      };
    } catch (error) {
      console.error("Error fetching summary data:", error);
      return {
        stats: null,
        activities: [],
        health: null,
      };
    }
  };

  return {
    getDashboardStats,
    getRecentActivities,
    getSystemHealth,
    getSummaryData,
  };
};
