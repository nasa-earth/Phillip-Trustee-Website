&lt;template&gt; &lt;header class=&quot;bg-white shadow&quot;&gt; &lt;div
class=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between
items-center&quot;&gt; &lt;div class=&quot;flex items-center&quot;&gt; &lt;h1
class=&quot;text-xl font-semibold text-gray-900&quot;&gt;Admin
Dashboard&lt;/h1&gt; &lt;span v-if=&quot;auth.user&quot; class=&quot;ml-4 px-2
inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100
text-blue-800&quot;&gt;
{{ auth.user.role }}
&lt;/span&gt; &lt;/div&gt; &lt;div class=&quot;flex items-center&quot;&gt;
&lt;span v-if=&quot;auth.user&quot; class=&quot;text-sm text-gray-700
mr-4&quot;&gt;
{{ auth.user.name }}
&lt;/span&gt; &lt;button @click=&quot;handleLogout&quot;
:disabled=&quot;isLoading&quot; class=&quot;inline-flex items-center px-3 py-2
border border-transparent text-sm leading-4 font-medium rounded-md text-white
bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2
focus:ring-red-500 disabled:opacity-50&quot; &gt; &lt;span
v-if=&quot;isLoading&quot;&gt;Logging out...&lt;/span&gt; &lt;span
v-else&gt;Logout&lt;/span&gt; &lt;/button&gt; &lt;/div&gt; &lt;/div&gt;
&lt;/header&gt; &lt;/template&gt; &lt;script setup lang=&quot;ts&quot;&gt;
import { ref } from 'vue' import { useAuth } from '~/composables/useAuth' const
auth = useAuth() const router = useRouter() const isLoading = ref(false) async
function handleLogout() { try { isLoading.value = true auth.logout() await
router.push('/auth/login') } catch (error) { console.error('Logout error:',
error) } finally { isLoading.value = false } } &lt;/script&gt;
