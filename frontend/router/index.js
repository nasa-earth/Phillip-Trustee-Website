// router/index.js
export default {
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("~/pages/Login.vue"),
    },
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: () => import("~/pages/admin/dashboard.vue"),
      meta: {
        requiresAuth: true,
        adminOnly: true,
      },
    },
    // Define other routes as needed
  ],
};
