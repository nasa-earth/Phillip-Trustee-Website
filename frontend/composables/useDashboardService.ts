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
    draftEvents?: number;
    users?: number;
    usersByRole?: {
      admins?: number;
      editors?: number;
      users?: number;
    };
    partners?: number;
    faqs?: number;
    faqCategories?: number;
  };
  recentActivity?: RecentActivity[];
  timestamp?: string;
}

export interface EventsStatsResponse {
  total?: number;
  data?: any[];
}

export interface PartnersResponse {
  data?: any[];
  total?: number;
}

export interface FaqsResponse {
  data?: any[];
  total?: number;
}

export interface UsersResponse {
  users?: any[];
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

  // Helper function to get user role counts
  const getUserRoleCounts = async (
    headers: any
  ): Promise<{ admins: number; editors: number }> => {
    try {
      // Try to get users with role breakdown
      const usersResponse = await $fetch<any>(`${getApiBase()}/api/users`, {
        headers,
        query: { limit: 1000 }, // Get all users to count roles
      });

      if (usersResponse && usersResponse.users) {
        const admins = usersResponse.users.filter(
          (user: any) => user.role === "ADMIN"
        ).length;
        const editors = usersResponse.users.filter(
          (user: any) => user.role === "EDITOR"
        ).length;
        return { admins, editors };
      }
    } catch (error) {
      console.warn("Failed to get user role counts:", error);
    }

    return { admins: 0, editors: 0 };
  };

  // Helper function to get FAQ categories count
  const getFaqCategoriesCount = async (headers: any): Promise<number> => {
    try {
      // Try to get FAQs and count unique categories
      const faqsResponse = await $fetch<any>(`${getApiBase()}/api/faqs`, {
        headers,
        query: { limit: 1000 }, // Get all FAQs to count categories
      });

      if (faqsResponse && faqsResponse.data) {
        const categories = new Set(
          faqsResponse.data.map((faq: any) => faq.category)
        );
        return categories.size;
      }
    } catch (error) {
      console.warn("Failed to get FAQ categories count:", error);
    }

    return 0;
  };

  // Get dashboard statistics
  const getDashboardStats = async (): Promise<DashboardStats> => {
    try {
      const headers = getAuthHeaders();
      console.log("Fetching dashboard stats...");

      // Try main dashboard endpoint first
      try {
        const response = await $fetch<any>(
          `${getApiBase()}/api/admin/dashboard`,
          {
            headers,
          }
        );
        console.log("Dashboard response:", response);

        // Handle the actual API response structure: { data: { stats: {...} } }
        const stats = response?.data?.stats || response?.stats;

        if (stats) {
          return {
            events: {
              total: stats.events || 0,
              published: stats.publishedEvents || 0,
              draft:
                stats.draftEvents ||
                (stats.events || 0) - (stats.publishedEvents || 0),
              recent: [],
            },
            users: {
              total: stats.users || 0,
              admins: stats.usersByRole?.admins || 0,
              editors: stats.usersByRole?.editors || 0,
              recent: [],
            },
            partners: {
              total: stats.partners || 0,
              active: stats.partners || 0,
              recent: [],
            },
            faqs: {
              total: stats.faqs || 0,
              categories: stats.faqCategories || 0,
              recent: [],
            },
          };
        }
      } catch (dashboardError) {
        console.warn(
          "Main dashboard endpoint failed, trying individual endpoints:",
          dashboardError
        );
      }

      // Fallback to individual endpoints
      try {
        const [eventsData, usersData, partnersData, faqsData] =
          await Promise.allSettled([
            $fetch<any>(`${getApiBase()}/api/events`, { headers }),
            $fetch<UsersResponse>(`${getApiBase()}/api/users`, {
              headers,
              query: { limit: 1000 },
            }),
            $fetch<PartnersResponse>(`${getApiBase()}/api/partners`, {
              headers,
            }),
            $fetch<FaqsResponse>(`${getApiBase()}/api/faqs`, { headers }),
          ]);

        // Get user role counts
        const userRoleCounts = await getUserRoleCounts(headers);

        // Get FAQ categories count
        const faqCategoriesCount = await getFaqCategoriesCount(headers);

        return {
          events: {
            total:
              eventsData.status === "fulfilled"
                ? eventsData.value?.data?.length || 0
                : 0,
            published:
              eventsData.status === "fulfilled"
                ? eventsData.value?.data?.length || 0
                : 0,
            draft: 0,
            recent: [],
          },
          users: {
            total:
              usersData.status === "fulfilled"
                ? usersData.value?.total || usersData.value?.users?.length || 0
                : 0,
            admins: userRoleCounts.admins,
            editors: userRoleCounts.editors,
            recent: [],
          },
          partners: {
            total:
              partnersData.status === "fulfilled"
                ? partnersData.value?.data?.length || 0
                : 0,
            active:
              partnersData.status === "fulfilled"
                ? partnersData.value?.data?.length || 0
                : 0,
            recent: [],
          },
          faqs: {
            total:
              faqsData.status === "fulfilled"
                ? faqsData.value?.data?.length || 0
                : 0,
            categories: faqCategoriesCount,
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
