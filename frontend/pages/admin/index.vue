<template>
  <div>
    <p>Redirecting to dashboard...</p>
  </div>
</template>

<script setup>
// Define layout and middleware for this page
definePageMeta({
  layout: 'admin/default',
  middleware: ['admin']
});

// Redirect to dashboard on mount
onMounted(() => {
  console.log('Admin index page redirecting to dashboard');
    try {
    navigateTo('/admin/dashboard');
    
    // In case navigateTo doesn't work, use the Vue Router after a short delay
    setTimeout(() => {
      const router = useRouter();
      console.log('Using router.push as backup');
      router.push('/admin/dashboard');
    }, 100);
  } catch (navError) {
    console.error('Navigation error:', navError);
    // Last resort: window.location
    window.location.href = '/admin/dashboard';
  }
});
</script>
