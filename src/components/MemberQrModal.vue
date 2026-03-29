<template>
  <AppModal :is-open="isOpen" :title="modalTitle" max-width="md" @close="emit('close')">
    <div class="flex flex-col items-center gap-4 p-5 sm:p-6">
      <AppText v-if="error" color="error" align="center" class="text-sm">
        Could not generate QR code.
      </AppText>
      <AppSpinner v-else-if="loading" class="text-primary" />
      <img
        v-else-if="dataUrl"
        :src="dataUrl"
        class="border-border max-h-[min(70vh,560px)] w-full max-w-[640px] rounded-lg border object-contain object-top"
        alt=""
      />
      <AppButton
        v-if="dataUrl && member && !error"
        variant="outline"
        label="Download card"
        icon="icon-[heroicons-outline--arrow-down-tray]"
        class="w-full max-w-xs sm:w-auto"
        @click="downloadQr"
      />
      <AppText
        v-if="url && !error"
        variant="caption"
        color="text-secondary"
        align="center"
        class="break-all font-mono text-[0.7rem] leading-snug sm:text-xs"
      >
        {{ url }}
      </AppText>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import AppButton from './global/AppButton.vue';
  import AppModal from './global/AppModal.vue';
  import AppSpinner from './global/AppSpinner.vue';
  import AppText from './global/AppText.vue';
  import type { TeamMember } from '../data/team';
  import { buildMemberQrCardPng } from '../utils/memberQrCardImage';
  import { getMemberCvAbsoluteUrl } from '../utils/memberPageUrl';

  const props = defineProps<{
    isOpen: boolean;
    member: TeamMember | null;
  }>();

  const emit = defineEmits<{ close: [] }>();

  const loading = ref(false);
  const error = ref(false);
  const dataUrl = ref('');
  const url = ref('');

  const modalTitle = computed(() =>
    props.member ? `QR — ${props.member.name}` : 'QR code',
  );

  function downloadQr() {
    if (!dataUrl.value || !props.member) return;
    const a = document.createElement('a');
    a.href = dataUrl.value;
    a.download = `qr-card-${props.member.slug}.png`;
    a.rel = 'noopener';
    a.click();
  }

  watch(
    () => [props.isOpen, props.member?.slug] as const,
    async ([open, slug]) => {
      if (!open || !slug || !props.member) {
        dataUrl.value = '';
        url.value = '';
        error.value = false;
        loading.value = false;
        return;
      }

      loading.value = true;
      error.value = false;
      dataUrl.value = '';

      try {
        const absolute = getMemberCvAbsoluteUrl(props.member.slug);
        url.value = absolute;
        dataUrl.value = await buildMemberQrCardPng(props.member, absolute);
      } catch {
        error.value = true;
        url.value = '';
        dataUrl.value = '';
      } finally {
        loading.value = false;
      }
    },
    { immediate: true },
  );
</script>
