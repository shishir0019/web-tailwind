<template>
  <div>
    <div class="">
      <Header />
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
