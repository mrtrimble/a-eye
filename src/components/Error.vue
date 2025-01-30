<template>
  <div class="error">
    <dl>
      <dt>Error</dt>
      <dd>
        {{ props.error }}
      </dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: string;
}>()
</script>

<style>
.error {
  background: darkred;
  color: white;
  padding: 1rem;
  margin-block-start: 1rem;

  dl, dt, dd {
    padding: 0;
    margin: 0;
  }

  dt {
    font-weight: bold;
  }
}
</style>