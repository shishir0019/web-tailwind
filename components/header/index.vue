<template>  
  <div class="relative bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div
        class="z-20 w-full px-4 py-3 bg-white lg:relative sm:px-6 lg:py-6 fixed inset-x-0 top-0 shadow-md lg:shadow-none lg:px-1">
        <nav class="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div class="flex items-center justify-between w-full lg:w-auto">
              <div class="relative">
                <a class="flex items-center" href="/">
                  <span class="relative h-8 w-28 sm:h-10 sm:w-32">
                    <div style="display:block;overflow:hidden;position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;margin:0">
                      <img
                        alt="Construyo Logo"
                        :src="logo"
                        decoding="async"
                        style="visibility: inherit; position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: contain;"
                        sizes="100vw"
                        :srcset="logo" >
                    </div>
                  </span></a></div>
              <div class="flex flex-grow items-center justify-end mr-3 lg:hidden">
                <nuxt-link class="px-4 py-1 text-base font-medium btn-secondary" to="#">Login</nuxt-link>
              </div>
              <div class="flex items-center -mr-2 lg:hidden">
                <button
                  id="main-menu"
                  type="button"
                  class="inline-flex items-center justify-center p-2 bg-white rounded-md text-indigo-dark hover:text-indigo hover:bg-indigo-lightest focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo"
                  aria-haspopup="true"
                  @click="isMenuOpen = true"
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="hidden lg:flex lg:space-x-8 flex-grow lg:ml-20">
            <Nav v-for="(nav, index) in navData" :key="`nav-${index}`" :item="nav" />
          </div>
          <div class="hidden lg:flex">
            <div class="flex justify-center">
              <div>
                <span class="text-gray lg:hidden">Hast du ein Konto?</span>
                <nuxt-link
                  class="text-indigo-dark lg:flex lg:items-center lg:justify-center lg:px-10 lg:py-1.5 text-base font-medium lg:border lg:border-gray-lightest lg:rounded-md lg:shadow lg:bg-white lg:hover:border-indigo-light lg:text-center"
                  to="/app/login">Login</nuxt-link>
              </div>
            </div>
          </div>
        </nav>
        <!-- small device -->
        <div class="fixed top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden">
          <div v-if="isMenuOpen" class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div class="pt-5 pb-6 px-5">
              <div class="flex items-center justify-between">
                <nuxt-link style="width:120px;" to="#">
                  <img :src="logo" alt="logo">
                </nuxt-link>
                <div class="-mr-2">
                  <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" @click="isMenuOpen = false">
                    <span class="sr-only">Close menu</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="mt-6">
                <nav class="grid gap-y-8">
                  <template v-for="(nav, index) in navData">
                    <nuxt-link :key="`nav-mobile-${index}`" to="#" class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                      <svg class="flex-shrink-0 h-6 w-6 text-indigo-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span class="ml-3 text-lg text-gray-900">
                        {{ nav.title }}
                      </span>
                    </nuxt-link>
                    <!-- <template v-if="nav.child">
                      <nuxt-link  v-for="(nav, i) in nav.child" :key="`${index}nav-nav-mobile-${i}`" to="#" class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                        <div class="flex-shrink-0 h-6 w-6 invisible"></div>
                        <span class="ml-3 text-base font-medium text-gray-900">
                          {{ nav.title }}
                        </span>
                      </nuxt-link>
                    </template> -->
                  </template>
                </nav>
              </div>
            </div>
            <div class="py-6 px-5 space-y-6">
              <div class="grid grid-cols-2 gap-5">
                <nuxt-link to="#">Project</nuxt-link>
                <nuxt-link to="#">Project</nuxt-link>
                <nuxt-link to="#">FAQ</nuxt-link>
                <nuxt-link to="#">Contract</nuxt-link>
              </div>
              <div>
                <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import Nav from '@/components/header/Nav.vue'
export default {
  components: { Container, Nav },
  props: {
    fluid: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      logo: require('@/assets/images/logo.png'),
      navData: [
        { title: 'About us', url: '#' },
        { title: 'credentials', url: '#', child: [
          { title: 'item 1', url: '#' },
          { title: 'item 1', url: '#' },
        ] },
        { title: 'help', url:'#', child: [
          { title: 'item 1', url: '#' },
          { title: 'item 1', url: '#' },
        ] },
        { title: 'DE/EN', url:'#', child: [
          { title: 'item 1', url: '#' },
          { title: 'item 1', url: '#' },
        ] },
      ],
      isMenuOpen: false
    };
  },
};
</script>

<style>
</style>