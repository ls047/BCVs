<template>
  <div class="flex min-h-screen min-h-[100dvh] flex-col bg-background">
    <AppHeader />
    <main class="min-w-0 flex-1 pb-[env(safe-area-inset-bottom,0px)]">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
</script>
