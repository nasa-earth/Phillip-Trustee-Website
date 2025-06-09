<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <main class="flex-grow">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
    <Footer />
  </div>
</template>
