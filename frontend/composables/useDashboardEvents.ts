// composables/useDashboardEvents.ts
import { ref } from "vue";
import mitt from "mitt";

// Create event emitter instance
const emitter = mitt();

export const useDashboardEvents = () => {
  // Event types
  const EVENTS = {
    REFRESH_DASHBOARD: "dashboard:refresh",
    USER_CREATED: "user:created",
    USER_UPDATED: "user:updated",
    USER_DELETED: "user:deleted",
    EVENT_CREATED: "event:created",
    EVENT_UPDATED: "event:updated",
    EVENT_DELETED: "event:deleted",
    PARTNER_CREATED: "partner:created",
    PARTNER_UPDATED: "partner:updated",
    PARTNER_DELETED: "partner:deleted",
    FAQ_CREATED: "faq:created",
    FAQ_UPDATED: "faq:updated",
    FAQ_DELETED: "faq:deleted",
  };

  // Emit dashboard refresh event
  const refreshDashboard = () => {
    console.log("Emitting dashboard refresh event");
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  // Content creation events that should trigger dashboard refresh
  const notifyUserCreated = (data?: any) => {
    console.log("User created, refreshing dashboard");
    emitter.emit(EVENTS.USER_CREATED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyUserUpdated = (data?: any) => {
    console.log("User updated, refreshing dashboard");
    emitter.emit(EVENTS.USER_UPDATED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyUserDeleted = (data?: any) => {
    console.log("User deleted, refreshing dashboard");
    emitter.emit(EVENTS.USER_DELETED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyEventCreated = (data?: any) => {
    console.log("Event created, refreshing dashboard");
    emitter.emit(EVENTS.EVENT_CREATED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyEventUpdated = (data?: any) => {
    console.log("Event updated, refreshing dashboard");
    emitter.emit(EVENTS.EVENT_UPDATED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyEventDeleted = (data?: any) => {
    console.log("Event deleted, refreshing dashboard");
    emitter.emit(EVENTS.EVENT_DELETED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyPartnerCreated = (data?: any) => {
    console.log("Partner created, refreshing dashboard");
    emitter.emit(EVENTS.PARTNER_CREATED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyPartnerUpdated = (data?: any) => {
    console.log("Partner updated, refreshing dashboard");
    emitter.emit(EVENTS.PARTNER_UPDATED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyPartnerDeleted = (data?: any) => {
    console.log("Partner deleted, refreshing dashboard");
    emitter.emit(EVENTS.PARTNER_DELETED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyFaqCreated = (data?: any) => {
    console.log("FAQ created, refreshing dashboard");
    emitter.emit(EVENTS.FAQ_CREATED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyFaqUpdated = (data?: any) => {
    console.log("FAQ updated, refreshing dashboard");
    emitter.emit(EVENTS.FAQ_UPDATED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  const notifyFaqDeleted = (data?: any) => {
    console.log("FAQ deleted, refreshing dashboard");
    emitter.emit(EVENTS.FAQ_DELETED, data);
    emitter.emit(EVENTS.REFRESH_DASHBOARD);
  };

  // Listen for events
  const onDashboardRefresh = (callback: () => void) => {
    emitter.on(EVENTS.REFRESH_DASHBOARD, callback);
  };

  const onUserCreated = (callback: (data?: any) => void) => {
    emitter.on(EVENTS.USER_CREATED, callback);
  };

  const onUserUpdated = (callback: (data?: any) => void) => {
    emitter.on(EVENTS.USER_UPDATED, callback);
  };

  const onUserDeleted = (callback: (data?: any) => void) => {
    emitter.on(EVENTS.USER_DELETED, callback);
  };

  // Remove event listeners
  const offDashboardRefresh = (callback: () => void) => {
    emitter.off(EVENTS.REFRESH_DASHBOARD, callback);
  };

  const offUserCreated = (callback: (data?: any) => void) => {
    emitter.off(EVENTS.USER_CREATED, callback);
  };

  const offUserUpdated = (callback: (data?: any) => void) => {
    emitter.off(EVENTS.USER_UPDATED, callback);
  };

  const offUserDeleted = (callback: (data?: any) => void) => {
    emitter.off(EVENTS.USER_DELETED, callback);
  };

  return {
    EVENTS,
    // Dashboard refresh
    refreshDashboard,
    onDashboardRefresh,
    offDashboardRefresh,

    // User events
    notifyUserCreated,
    notifyUserUpdated,
    notifyUserDeleted,
    onUserCreated,
    onUserUpdated,
    onUserDeleted,
    offUserCreated,
    offUserUpdated,
    offUserDeleted,

    // Event events
    notifyEventCreated,
    notifyEventUpdated,
    notifyEventDeleted,

    // Partner events
    notifyPartnerCreated,
    notifyPartnerUpdated,
    notifyPartnerDeleted,

    // FAQ events
    notifyFaqCreated,
    notifyFaqUpdated,
    notifyFaqDeleted,
  };
};
