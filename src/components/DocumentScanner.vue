<template>
  <WebCamera @camera:capture="submitImage" />

  <Loader v-if="isLoading" />

  <dl v-if="response && !isLoading">
    <dt>Title:</dt>
    <dd v-text="response.title"></dd>
    <dt>Transcription:</dt>
    <dd v-html="markdownTranscription"></dd>
  </dl>
</template>

<script setup lang="ts">
import { marked } from 'marked';
import { actions } from 'astro:actions';
import { computed, ref } from 'vue'
import WebCamera from './WebCamera.vue';
import Loader from './Loader.vue';

const isLoading = ref(false);

interface Response {
  [key: string]: any;
}

const response = ref<Response | null>(null);

const markdownTranscription = computed(() => response.value ? marked.parse(response.value.transcription) : '')

const submitImage = async (payload: any) => {
  if (payload) {

    isLoading.value = true;

    try {
      const { data, error } = await actions.gemini.scanDocument(payload)
      if (data) {
        response.value = JSON.parse(data);
      }

      if (error) {
        throw new Error(error.message || error.toString());
      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
}
</script>