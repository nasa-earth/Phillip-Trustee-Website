<template>
    <div class="login-container">
        <div class="login-card">
            <h1 class="login-title">Admin Login</h1>
            <p class="login-subtitle">Access the dashboard to manage your website</p>

            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" placeholder="Enter your email" required
                        class="input-field" :disabled="loading" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" placeholder="Enter password" required
                        class="input-field" :disabled="loading" />
                </div>
                <button type="submit" class="login-button" :disabled="loading">
                    <span v-if="loading">Logging in...</span>
                    <span v-else>Login to Dashboard</span>
                </button>
            </form>

            <div class="login-footer">
                <p>
                    <NuxtLink to="/">← Return to website</NuxtLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

// Meta for page
definePageMeta({
    layout: 'default',
    middleware: []
});

// Reactive data
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
    // Clear any existing auth state on login page
    if (authStore.isAuthenticated) {
        console.log("User already authenticated, redirecting to dashboard");
        router.push('/admin/dashboard');
        return;
    }

    // Check for error parameters
    if (route.query.error === 'access_denied') {
        errorMessage.value = 'Access denied. Only administrators and editors can access the dashboard.';
    }
});

const handleLogin = async () => {
    if (loading.value) return;

    loading.value = true;
    errorMessage.value = '';

    try {
        console.log('Attempting login for:', email.value);

        const result = await authStore.login(email.value, password.value);

        if (result.success) {
            console.log('Login successful, redirecting to dashboard');
            await router.push('/admin/dashboard');
        } else {
            errorMessage.value = result.error || 'Login failed. Please try again.';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.value = 'An unexpected error occurred. Please try again.';
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #f5f5f5;
}

.login-card {
    width: 100%;
    max-width: 400px;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
}

.login-title {
    text-align: center;
    font-size: 28px;
    margin-bottom: 8px;
    color: #333;
}

.login-subtitle {
    text-align: center;
    font-size: 14px;
    margin-bottom: 24px;
    color: #666;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 6px;
    font-size: 14px;
    color: #444;
}

.input-field {
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 14px;
    transition: border-color 0.2s;
}

.input-field:focus {
    border-color: #4a90e2;
    outline: none;
}

.login-button {
    padding: 12px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;
}

.login-button:hover {
    background-color: #3a80d2;
}

.login-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.error-message {
    padding: 10px;
    background-color: #ffebee;
    color: #c62828;
    border-radius: 4px;
    margin-bottom: 15px;
    text-align: center;
}

.login-footer {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
}

.login-footer a {
    color: #4a90e2;
    text-decoration: none;
}

.login-footer a:hover {
    text-decoration: underline;
}
</style>
