<template>
  <div class="bg-background text-text min-h-screen">
    <section
      class="from-primary/10 via-secondary/10 to-accent/10 bg-gradient-to-br py-10 sm:py-16 md:py-24"
    >
      <div class="container mx-auto px-4 sm:px-6">
        <div class="mx-auto max-w-3xl text-center">
          <AppText
            variant="h1"
            size="3xl"
            align="center"
            class="mb-3 sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {{ appTitle }}
          </AppText>
          <AppText
            variant="p"
            size="base"
            color="text-secondary"
            align="center"
            wrap="balance"
            class="sm:text-lg"
          >
            {{ appDescription }}
          </AppText>
        </div>
      </div>
    </section>

    <section class="py-10 sm:py-12 md:py-16">
      <div class="container mx-auto px-4 sm:px-6">
        <AppText variant="h2" align="center" class="mb-6 text-2xl sm:mb-10 sm:text-3xl">
          Team
        </AppText>
        <ul class="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-4" role="list">
          <li v-for="member in teamMembers" :key="member.slug">
            <div
              class="border-border bg-surface hover:border-primary/40 flex min-h-[4.5rem] overflow-hidden rounded-xl border transition-colors sm:min-h-0"
            >
              <RouterLink
                :to="{ name: 'cv-member', params: { slug: member.slug } }"
                class="group flex min-w-0 flex-1 flex-col p-4 transition-colors active:bg-muted/50 sm:p-5"
              >
                <div class="mb-2 flex min-w-0 items-start justify-between gap-3">
                  <AppText
                    variant="h3"
                    class="group-hover:text-primary min-w-0 break-words text-left text-lg transition-colors sm:text-2xl"
                  >
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
              <div
                class="border-border flex shrink-0 flex-col justify-center border-s p-2 sm:p-3"
              >
                <button
                  type="button"
                  class="text-text-secondary hover:bg-muted hover:text-primary flex size-11 items-center justify-center rounded-lg transition-colors sm:size-10"
                  :aria-label="`Show QR code for ${member.name}`"
                  @click="openQr(member)"
                >
                  <AppIcon name="icon-[heroicons-outline--qr-code]" :size="1.25" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <MemberQrModal :is-open="qrMember !== null" :member="qrMember" @close="closeQr" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import AppIcon from '../components/global/AppIcon.vue';
  import AppText from '../components/global/AppText.vue';
  import MemberQrModal from '../components/MemberQrModal.vue';
  import { useAppConfig } from '../composables/useAppConfig';
  import { teamMembers, type TeamMember } from '../data/team';
  import { useSeo } from '../utils';

  const qrMember = ref<TeamMember | null>(null);

  function openQr(member: TeamMember) {
    qrMember.value = member;
  }

  function closeQr() {
    qrMember.value = null;
  }

  const { appTitle, appDescription } = useAppConfig();

  onMounted(() => {
    useSeo({
      title: appTitle.value,
      description: appDescription.value,
    });
  });
</script>
