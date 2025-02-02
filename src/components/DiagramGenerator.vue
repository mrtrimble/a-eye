<template>
  <WebCamera @camera:capture="submitImage" />

  <Loader v-if="isLoading" />

  <dl v-if="response && !isLoading">
    <dt>Title:</dt>
    <dd v-text="response.title"></dd>
    <dt>Image:</dt>
    <dd v-if="response.image">
      <pre>{{ response.image }}</pre>
    </dd>
  </dl>

  <ErrorCmp v-if="error"
            :error="error" />
</template>

<script setup lang="ts">
import { actions } from 'astro:actions';
import { ref } from 'vue'
import WebCamera from './WebCamera.vue';
import Loader from './Loader.vue';
import ErrorCmp from './Error.vue';

const error = ref('');
const isLoading = ref(false);

interface Response {
  [key: string]: any;
}

const response = ref<Response | null>(null);

const submitImage = async (payload: any) => {
  if (payload) {

    isLoading.value = true;

    try {
      const { data, error } = await actions.gemini.generateDiagram(payload)
      
      if (data) {
        response.value = JSON.parse(data);
        console.log({ response: response.value });
      }

      if (error) {
        throw new Error(error.message || error.toString());
      }
    } catch (err) {
      error.value = String(err);
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
}
</script>