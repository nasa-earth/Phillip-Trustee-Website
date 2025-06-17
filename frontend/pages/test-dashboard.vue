<template>
  <div class="test-dashboard">
    <h1>Admin Dashboard Test Page</h1>    <div v-if="isAuthenticated && user" class="user-info">
      <h2>Authentication Status: Success</h2>
      <pre>{{ userData }}</pre>
      <div class="button-group">
        <button @click="goToAdminDashboard" class="admin-btn">Go to Admin Dashboard</button>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>
    <div v-else class="error">
      <h2>Not Authenticated</h2>
      <p>You need to log in first.</p>
      <button @click="goToLogin" class="login-btn">Go to Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
const userData = computed(() => JSON.stringify(user.value, null, 2));

function logout() {
  authStore.logout();
  window.location.href = '/login';
}

function goToLogin() {
  window.location.href = '/login';
}

function goToAdminDashboard() {
  window.location.href = '/admin/dashboard';
}
</script>

<style scoped>
.test-dashboard {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.user-info {
  background-color: #e6f7ff;
  border-radius: 6px;
  padding: 15px;
  margin-top: 20px;
}

pre {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.error {
  background-color: #fff1f0;
  border-radius: 6px;
  padding: 15px;
  margin-top: 20px;
  text-align: center;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.logout-btn {
  background-color: #ff4d4f;
  color: white;
}

.login-btn {
  background-color: #1890ff;
  color: white;
}

.admin-btn {
  background-color: #52c41a;
  color: white;
}
</style>
