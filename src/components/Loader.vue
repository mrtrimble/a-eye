<template>
  <div class="loader">
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 512 512">
      <path
            d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
    </svg>
    <span class="visually-hidden">Generating Response!</span>
  </div>
</template>

<style>
.loader {
  display: grid;
  place-content: center;
  text-align: center;
  margin-block: 1rem;

  svg {
    fill: currentColor;
    height: 2rem;
    animation: spin 1s linear infinite;
    margin-inline: auto;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>