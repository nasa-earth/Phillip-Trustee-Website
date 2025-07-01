<template>
    <div class="login-container">
        <div class="login-card">
            <h1 class="login-title">Admin & Editor Login</h1>
            <p class="login-subtitle">Access the dashboard to manage your website</p>
            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" placeholder="Enter your email" required
                        class="input-field" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" placeholder="Enter password" required
                        class="input-field" />
                </div>
                <button type="submit" class="login-button" :disabled="loading">
                    {{ loading ? 'Logging in...' : 'Login to Dashboard' }}
                </button>
            </form>
            <div class="login-footer">
                <p><a href="/" @click.prevent="navigateToHome">Return to website</a></p>
                <button v-if="errorMessage && errorMessage.includes('server')" @click="testApiConnection"
                    class="text-blue-500 text-sm hover:underline mt-2" :disabled="testingApi">
                    {{ testingApi ? 'Testing connection...' : 'Test API connection' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);
const testingApi = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const route = useRoute();

// Check for error parameters in the URL
onMounted(() => {
    if (route.query.error === 'access_denied') {
        errorMessage.value = 'Access denied. Only administrators and editors can access the dashboard.';
    }
});

// Helper function to test the raw login response
const testLoginResponse = async () => {
    try {
        const apiUrl = useApiUrl();

        // Try the debug endpoint first
        console.log('Making direct API call to debug endpoint:', apiUrl.auth.debugLogin);

        const debugResponse = await fetch(apiUrl.auth.debugLogin, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, password: password.value })
        });

        console.log('Debug response status:', debugResponse.status);
        const debugData = await debugResponse.text();
        console.log('Debug response raw text:', debugData);

        try {
            const debugJson = JSON.parse(debugData);
            console.log('Debug parsed response:', debugJson);
            if (debugJson.success) {
                console.log('Debug response structure info:', debugJson.structureInfo);
            }

            // Now try the actual login endpoint
            console.log('Testing regular login endpoint:', apiUrl.auth.login);
            const loginResponse = await fetch(apiUrl.auth.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.value, password: password.value })
            });

            console.log('Regular login response status:', loginResponse.status);
            const loginData = await loginResponse.text();
            console.log('Regular login raw text:', loginData);

            try {
                const loginJson = JSON.parse(loginData);
                console.log('Regular login parsed:', loginJson);
                console.log('Response has user:', !!loginJson.user);
                console.log('Response has access_token:', !!loginJson.access_token);
                console.log('Response has refresh_token:', !!loginJson.refresh_token);
                return { debug: debugJson, login: loginJson };
            } catch (e) {
                console.error('Error parsing login JSON:', e);
            }

            return { debug: debugJson, login: null };
        } catch (e) {
            console.error('Error parsing debug JSON:', e);
            return null;
        }
    } catch (error) {
        console.error('Raw API call error:', error);
        return null;
    }
};

const handleLogin = async () => {
    try {
        loading.value = true;
        errorMessage.value = '';

        console.log('Attempting login with:', { email: email.value });

        // Try a direct API call first to debug the response format
        const rawResponse = await testLoginResponse();
        console.log('Raw login response test:', rawResponse);

        // Now try the regular login through the auth store
        const result = await authStore.login(email.value, password.value);
        console.log('Login result from auth store:', result);

        if (!result.success) {
            // Handle specific error cases
            if (result.error && (result.error.includes('fetch') || result.error.includes('Failed to fetch'))) {
                throw new Error('Could not connect to the server. Please check if the backend is running.');
            } else if (result.error && result.error.includes('status: 404')) {
                throw new Error('Login API endpoint not found. Please check your API configuration.');
            } else if (result.error && result.error.includes('status: 401')) {
                throw new Error('Invalid email or password. Please try again.');
            } else {
                throw new Error(result.error || 'Failed to login');
            }
        }

        console.log('User details:', authStore.user);

        // Validate the user has ADMIN or EDITOR role before redirecting
        if (!result.user || (result.user.role !== 'ADMIN' && result.user.role !== 'EDITOR')) {
            console.error('User does not have required permissions:', result.user);
            authStore.logout();
            throw new Error('Access denied. Only administrators and editors can access the dashboard.');
        }

        console.log('User has admin/editor role, redirecting to dashboard');
        const dashboardPath = '/admin/dashboard';

        // Store the authenticated state before navigation
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('last_route', dashboardPath);
        localStorage.setItem('user_role', result.user.role);

        // Use a more reliable approach to redirection
        console.log('Redirecting to admin dashboard');

        // For most reliable redirection, use window.location.href
        window.location.href = dashboardPath;
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.value = error.message || 'An error occurred during login';
    } finally {
        loading.value = false;
    }
};

const navigateToHome = () => {
    router.push('/');
};

const testApiConnection = async () => {
    testingApi.value = true;
    try {
        const config = useRuntimeConfig();
        const apiBase = config.public.apiBase;
        console.log('Testing API connection to:', apiBase);

        // Try the health endpoint first
        try {
            console.log('Testing health endpoint:', `${apiBase}/api/health`);
            const healthResponse = await fetch(`${apiBase}/api/health`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (healthResponse.ok) {
                const data = await healthResponse.json();
                console.log('Health check successful:', data);
                errorMessage.value = `API health check successful! Server is running. Response: ${JSON.stringify(data)}`;
                return;
            }
        } catch (healthError) {
            console.warn('Health endpoint test failed:', healthError);
            // Continue with login endpoint test
        }

        // If health check fails, try the login endpoint
        console.log('Testing login endpoint:', `${apiBase}/api/auth/login`);
        const loginResponse = await fetch(`${apiBase}/api/auth/login`, {
            method: 'OPTIONS',
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('Login endpoint test response:', loginResponse);

        if (loginResponse.ok || loginResponse.status === 204 || loginResponse.status === 405) {
            errorMessage.value = `Login endpoint exists! API server is accessible at ${apiBase}/api/auth/login`;
        } else {
            errorMessage.value = `API server responded with status: ${loginResponse.status} for login endpoint. Check server configuration.`;
        }
    } catch (error) {
        console.error('API connection test failed:', error);
        errorMessage.value = `Failed to connect to API server: ${error.message}. Tried to connect to ${config.public.apiBase}/api/auth/login`;
    } finally {
        testingApi.value = false;
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
