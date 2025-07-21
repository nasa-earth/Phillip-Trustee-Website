// composables/useFaqs.ts
import { ref, reactive, readonly } from "vue";
import type { Ref } from "vue";
import { useAuth } from "./useAuth";
import { useApiUrl } from "./useApiUrl";

// Types and interfaces
export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
  published?: boolean;
  open?: boolean; // For accordion state
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFaqData {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  published?: boolean;
}

export interface UpdateFaqData extends Partial<CreateFaqData> {}

export interface FaqsApiResponse {
  data?: Faq[];
  [key: string]: any;
}

export interface FaqReorderItem {
  id: string;
  order: number;
}

export const useFaqs = () => {
  const { getAuthHeaders } = useAuth();
  const apiUrl = useApiUrl();

  // State
  const faqs: Ref<Faq[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  // Get the base API URL
  const getApiBase = (): string => {
    const config = useRuntimeConfig();
    return config.public.apiBase || "http://localhost:3005";
  };

  // Public methods - no authentication required
  const getFaqs = async (): Promise<Faq[]> => {
    try {
      loading.value = true;
      error.value = null;

      const response = await $fetch<FaqsApiResponse | Faq[]>(
        `${getApiBase()}/api/faqs`
      );

      // Handle response that might be wrapped in a data property
      const faqsData =
        (response as FaqsApiResponse).data || (response as Faq[]);
      faqs.value = Array.isArray(faqsData)
        ? faqsData.map((faq) => ({
            ...faq,
            open: false, // Add open state for accordion
          }))
        : [];

      return faqsData as Faq[];
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      error.value = "Failed to load FAQs";
      faqs.value = []; // Ensure faqs is always an array even on error
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Admin methods - require authentication
  const getAdminFaqs = async (): Promise<Faq[]> => {
    try {
      loading.value = true;
      error.value = null;

      const response = await $fetch<FaqsApiResponse | Faq[]>(
        `${getApiBase()}/api/faqs`,
        {
          headers: getAuthHeaders(),
        }
      );

      // Handle response that might be wrapped in a data property
      const faqsData =
        (response as FaqsApiResponse).data || (response as Faq[]);
      faqs.value = Array.isArray(faqsData)
        ? faqsData.map((faq) => ({
            ...faq,
            open: false, // Add open state for accordion
          }))
        : [];
      return faqsData as Faq[];
    } catch (err) {
      console.error("Error fetching admin FAQs:", err);
      error.value = "Failed to load FAQs";
      faqs.value = []; // Ensure faqs is always an array even on error
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createFaq = async (faqData: CreateFaqData): Promise<Faq> => {
    try {
      console.log("Creating FAQ with data:", faqData);

      const response = await $fetch<Faq>(`${getApiBase()}/api/faqs`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: faqData,
      });

      console.log("FAQ creation response:", response);

      // Refresh the FAQs list
      await getAdminFaqs();

      return response;
    } catch (err: any) {
      console.error("Error creating FAQ:", err);
      console.error("Error details:", {
        status: err.status || err.statusCode,
        statusText: err.statusText,
        data: err.data,
        message: err.message,
      });
      throw err;
    }
  };

  const updateFaq = async (
    id: string,
    faqData: UpdateFaqData
  ): Promise<Faq> => {
    try {
      console.log("Updating FAQ:", id, faqData);

      const response = await $fetch<Faq>(`${getApiBase()}/api/faqs/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: faqData,
      });

      console.log("FAQ update response:", response);

      // Refresh the FAQs list
      await getAdminFaqs();

      return response;
    } catch (err) {
      console.error("Error updating FAQ:", err);
      throw err;
    }
  };

  const deleteFaq = async (id: string): Promise<any> => {
    try {
      console.log("Deleting FAQ:", id);

      const response = await $fetch(`${getApiBase()}/api/faqs/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      console.log("FAQ deletion response:", response);

      // Refresh the FAQs list
      await getAdminFaqs();

      return response;
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      throw err;
    }
  };

  const reorderFaqs = async (faqsWithOrder: FaqReorderItem[]): Promise<any> => {
    try {
      console.log("Reordering FAQs:", faqsWithOrder);

      const response = await $fetch(`${getApiBase()}/api/faqs/reorder`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: { faqs: faqsWithOrder },
      });

      console.log("FAQ reorder response:", response);

      // Refresh the FAQs list
      await getAdminFaqs();

      return response;
    } catch (err) {
      console.error("Error reordering FAQs:", err);
      throw err;
    }
  };

  // Helper methods
  const getFaqById = async (id: string): Promise<Faq> => {
    try {
      const response = await $fetch<Faq>(`${getApiBase()}/api/faqs/${id}`, {
        headers: getAuthHeaders(),
      });
      return response;
    } catch (err) {
      console.error("Error fetching FAQ by ID:", err);
      throw err;
    }
  };

  const searchFaqs = (
    searchQuery?: string,
    category?: string | null
  ): Faq[] => {
    if (!faqs.value || !Array.isArray(faqs.value)) return [];

    return faqs.value.filter((faq) => {
      // Filter by search
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const questionMatch = faq.question.toLowerCase().includes(searchLower);
        const answerMatch = faq.answer.toLowerCase().includes(searchLower);
        if (!questionMatch && !answerMatch) return false;
      }

      // Filter by category if provided
      if (category) {
        // Use the actual category field from the FAQ, fallback to question-based detection
        const faqCategory =
          faq.category || getCategoryFromQuestion(faq.question);
        if (faqCategory !== category) return false;
      }

      return true;
    });
  };

  const getCategoryFromQuestion = (question: string): string => {
    // Extract category from question text based on numbering system
    if (question.startsWith("1.")) return "Trust Basics";
    if (question.startsWith("2.")) return "Safety & Security";
    if (question.startsWith("3.")) return "Taxes & Fees";
    if (question.startsWith("4.")) return "Banking Services";
    return "General";
  };

  const getCategories = (): string[] => {
    if (!faqs.value || !Array.isArray(faqs.value)) return [];

    const categories = new Set<string>();
    faqs.value.forEach((faq) => {
      // Use the actual category field from the FAQ, fallback to question-based detection
      const category = faq.category || getCategoryFromQuestion(faq.question);
      if (category) categories.add(category);
    });
    return Array.from(categories);
  };

  return {
    // State - faqs needs to be mutable for toggle functionality
    faqs,
    loading: readonly(loading),
    error: readonly(error),

    // Public methods
    getFaqs,

    // Admin methods
    getAdminFaqs,
    createFaq,
    updateFaq,
    deleteFaq,
    reorderFaqs,
    getFaqById,

    // Helper methods
    searchFaqs,
    getCategoryFromQuestion,
    getCategories,
  };
};
