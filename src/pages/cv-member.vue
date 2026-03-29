<template>
  <div class="bg-background text-text min-h-screen">
    <div v-if="member" class="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
      <div class="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="min-w-0">
          <RouterLink
            to="/"
            class="text-text-secondary hover:text-primary mb-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors sm:mb-3 sm:min-h-0"
          >
            <AppIcon name="icon-[heroicons-outline--arrow-left]" :size="1.125" />
            Back to team
          </RouterLink>
          <AppText variant="h1" size="2xl" class="break-words sm:text-3xl md:text-4xl">
            {{ member.name }}
          </AppText>
          <AppText v-if="member.role" variant="p" color="text-secondary" class="mt-1">
            {{ member.role }}
          </AppText>
        </div>
        <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
          <button
            type="button"
            class="border-border text-text hover:bg-muted inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border bg-transparent px-3 text-sm font-medium transition-all duration-150 active:scale-[0.97] sm:h-8 sm:min-h-0 sm:w-auto"
            @click="qrOpen = true"
          >
            <AppIcon name="icon-[heroicons-outline--qr-code]" :size="1" />
            Page QR
          </button>
          <a
            :href="pdfHref"
            target="_blank"
            rel="noopener noreferrer"
            class="border-border text-text hover:bg-muted inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border bg-transparent px-3 text-sm font-medium transition-all duration-150 active:scale-[0.97] sm:h-8 sm:min-h-0 sm:w-auto"
          >
            <AppIcon name="icon-[heroicons-outline--arrow-top-right-on-square]" :size="1" />
            Open in new tab
          </a>
          <a
            :href="pdfHref"
            :download="member.pdfFileName"
            class="bg-primary inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-primary/90 active:scale-[0.97] sm:h-8 sm:min-h-0 sm:w-auto"
          >
            <AppIcon name="icon-[heroicons-outline--arrow-down-tray]" :size="1" />
            Download PDF
          </a>
        </div>
      </div>

      <div class="border-border bg-surface overflow-hidden rounded-lg border shadow-sm sm:rounded-xl">
        <iframe
          :title="`${member.name} CV`"
          :src="pdfHref"
          class="h-[min(72dvh,900px)] w-full min-w-0 border-0 sm:h-[min(85vh,900px)]"
        />
      </div>
    </div>

    <div v-else class="container mx-auto px-4 py-12 text-center sm:px-6 sm:py-16">
      <AppText variant="h1" class="mb-4">CV not found</AppText>
      <AppText variant="p" color="text-secondary" class="mb-8">
        No team member matches this link.
      </AppText>
      <RouterLink
        to="/"
        custom
        v-slot="{ navigate }"
      >
        <AppButton
          variant="primary"
          label="Back to team"
          icon="icon-[heroicons-outline--home]"
          class="w-full max-w-xs sm:w-auto"
          @click="navigate"
        />
      </RouterLink>
    </div>

    <MemberQrModal
      v-if="member"
      :is-open="qrOpen"
      :member="member"
      @close="qrOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import MemberQrModal from '../components/MemberQrModal.vue';
  import AppButton from '../components/global/AppButton.vue';
  import AppIcon from '../components/global/AppIcon.vue';
  import AppText from '../components/global/AppText.vue';
  import { useAppConfig } from '../composables/useAppConfig';
  import { useSeo } from '../utils';
  import { getMemberBySlug, getTeamPdfHref } from '../data/team';

  const route = useRoute();
  const { appTitle } = useAppConfig();
  const qrOpen = ref(false);

  const member = computed(() => {
    const slug = route.params.slug as string;
    return getMemberBySlug(slug);
  });

  watch(member, () => {
    qrOpen.value = false;
  });

  const pdfHref = computed(() =>
    member.value ? getTeamPdfHref(member.value.pdfFileName) : '',
  );

  function applySeo() {
    const m = member.value;
    if (!m) {
      useSeo({
        title: `Not found — ${appTitle.value}`,
        description: 'The requested CV could not be found.',
      });
      return;
    }
    useSeo({
      title: `${m.name}${m.role ? ` — ${m.role}` : ''} — ${appTitle.value}`,
      description: `CV for ${m.name}${m.role ? ` (${m.role})` : ''}.`,
    });
  }

  onMounted(applySeo);
  watch(member, applySeo);
</script>
