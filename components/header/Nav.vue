<template>
    <div v-if="item.child" class="relative">
        <button type="button" @blur="isMenuShow = false" @click="isMenuShow = true" class="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-offset-2" aria-expanded="false">
            <span class="text-lg">{{ item.title }}</span>
            <svg class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
        <div v-if="isMenuShow" class="absolute z-10 -ml-4 mt-3 transform px-2 w-36 max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
            <div class="rounded-sm shadow-md ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div class="relative grid bg-white p-3">
                    <nuxt-link class="hover:bg-gray-100 p-2 text-lg" v-for="(nav, index) in item.child" :key="`nav-nav-${index}`" :to="nav.url">{{nav.title}}</nuxt-link>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <nuxt-link :to="item.url" class="text-lg text-gray-500 hover:text-gray-900">{{item.title}}</nuxt-link>
    </div>
</template>

<script>
import Nav from '@/components/header/Nav.vue'
export default {
  components: { Nav },
  props: {
    item: {
      require: true,
    },
  },
  data() {
    return {
        isMenuShow: false
    };
  },
  methods: {
      tigger (){
          this.isMenuShow = !this.isMenuShow
      }
  }
};
</script>

<style scoped>
.nav{
    @apply mx-4 hover:text-indigo-800 relative whitespace-nowrap;
}
.nav .nav__item{
    display: none;
}
.nav:hover .nav__item {
    display: block;
    border: 1px solid red;
}
</style>