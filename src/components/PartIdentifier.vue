<template>
  <WebCamera @camera:capture="submitImage" />

  <Loader v-if="isLoading" />

  <dl v-if="response && !isLoading">
    <dt>Name:</dt>
    <dd v-text="response.name"></dd>
    <dt>Description:</dt>
    <dd v-text="response.description"></dd>
    <dt>Dimensions</dt>
    <dd v-if="response.dimensions.height">Height: {{ response.dimensions.height }}</dd>
    <dd v-if="response.dimensions.width">Width: {{ response.dimensions.width }}</dd>
    <dd v-if="response.dimensions.depth">Depth: {{ response.dimensions.depth }}</dd>
  </dl>
</template>

<script setup lang="ts">
import { actions } from 'astro:actions';
import { ref } from 'vue'
import WebCamera from './WebCamera.vue';
import Loader from './Loader.vue';

const isLoading = ref(false);

interface Response {
  [key: string]: any;
}

const response = ref<Response | null>(null);

const submitImage = async (payload: any) => {
  if (payload) {

    isLoading.value = true;

    try {
      const { data, error } = await actions.gemini.identifyObject(payload)
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