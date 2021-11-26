<template>
  <div>
    <div class="">
      <Header fluid class="fixed bg-white z-50 left-0 right-0 top-0" />
      <div class="py-10">
        <Nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  components: { Header, Footer }
}
</script>
