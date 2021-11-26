<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">
      Page not Found
    </h1>
    <h1 v-else>
      An error has occurred
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'blog',
  props: ['error'] // you can set a custom layout for the error page
};
</script>
