<template>
  <div class="bg-background text-text min-h-screen">
    <section class="from-primary/10 via-secondary/10 to-accent/10 bg-gradient-to-br py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-3xl text-center">
          <AppText
            variant="h1"
            :responsiveSize="{ sm: '4xl', md: '5xl', lg: '6xl' }"
            align="center"
            class="mb-4"
          >
            {{ appTitle }}
          </AppText>
          <AppText variant="p" size="lg" color="text-secondary" align="center" class="mb-2">
            {{ appDescription }}
          </AppText>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4">
        <AppText variant="h2" align="center" class="mb-10">Team</AppText>
        <ul
          class="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2"
          role="list"
        >
          <li v-for="member in teamMembers" :key="member.slug">
            <RouterLink
              :to="{ name: 'cv-member', params: { slug: member.slug } }"
              class="border-border bg-surface hover:border-primary/40 group flex flex-col rounded-xl border p-5 transition-colors"
            >
              <div class="mb-2 flex items-start justify-between gap-3">
                <AppText variant="h3" class="group-hover:text-primary text-left transition-colors">
                  {{ member.name }}
                </AppText>
                <AppIcon
                  name="icon-[heroicons-outline--arrow-top-right-on-square]"
                  :size="1.25"
                  class="text-text-secondary group-hover:text-primary shrink-0"
                />
              </div>
              <AppText v-if="member.role" variant="label" color="text-secondary" class="text-left">
                {{ member.role }}
              </AppText>
              <AppText v-else variant="caption" color="text-secondary" class="mt-1 text-left">
                View CV
              </AppText>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import AppIcon from '../components/global/AppIcon.vue';
  import AppText from '../components/global/AppText.vue';
  import { useAppConfig } from '../composables/useAppConfig';
  import { useSeo } from '../utils';
  import { teamMembers } from '../data/team';

  const { appTitle, appDescription } = useAppConfig();

  onMounted(() => {
    useSeo({
      title: appTitle.value,
      description: appDescription.value,
    });
  });
</script>
