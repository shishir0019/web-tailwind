<template>
  <Container>
    <div class="py-12 lg:py-16">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <!-- col 1 -->
        <div class="space-y-8 xl:col-span-1">
          <div style="display:inline-block;max-width:100%;overflow:hidden;position:relative;box-sizing:border-box;margin:0">
            <div style="box-sizing:border-box;display:block;max-width:100%">
              <img width="150" style="max-width:100%;display:block;margin:0;border:none;padding:0" alt="" aria-hidden="true" role="presentation" :src="logo">
            </div>
            <img :src="logo" decoding="async" class="object-contain" style="visibility: inherit; position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;" srcset="/_next/image?url=%2Fimg%2Flogo-full.png&amp;w=256&amp;q=75 1x, /_next/image?url=%2Fimg%2Flogo-full.png&amp;w=384&amp;q=75 2x">
          </div>
          <p class="text-base text-gray-dark">Just build</p>
          <div class="flex space-x-6">
            <a href="https://www.facebook.com/wirsindConstruyo/" class="text-gray-light hover:text-gray" target="_blank" rel="noreferrer"><span class="sr-only">Facebook</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="https://www.instagram.com/wirsindconstruyo/" class="text-gray-light hover:text-gray" target="_blank" rel="noreferrer"><span class="sr-only">Instagram</span><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="https://www.linkedin.com/company/wirsindconstruyo/" class="text-gray-light hover:text-gray" target="_blank" rel="noreferrer"><span class="sr-only">LinkedIn</span><svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M 17.833 2 L 6.167 2 C 3.867 2 2 3.867 2 6.167 L 2 17.833 C 2 20.133 3.867 22 6.167 22 L 17.833 22 C 20.135 22 22 20.133 22 17.833 L 22 6.167 C 22 3.867 20.135 2 17.833 2 Z M 8.668 17.833 L 6.167 17.833 L 6.167 8.667 L 8.668 8.667 L 8.668 17.833 Z M 7.417 7.61 C 6.611 7.61 5.959 6.951 5.959 6.14 C 5.959 5.329 6.611 4.67 7.417 4.67 C 8.222 4.67 8.875 5.329 8.875 6.14 C 8.875 6.951 8.223 7.61 7.417 7.61 Z M 18.668 17.833 L 16.168 17.833 L 16.168 13.163 C 16.168 10.356 12.834 10.57 12.834 13.163 L 12.834 17.833 L 10.333 17.833 L 10.333 8.667 L 12.834 8.667 L 12.834 10.138 C 13.997 7.983 18.668 7.823 18.668 12.2 L 18.668 17.833 Z" clip-rule="evenodd"></path></svg>
            </a>
            <div class="font-medium text-gray">
              <span class="text-indigo">DE</span><span> / </span>
              <button type="button" class="cursor-pointer text-gray-dark hover:text-indigo">EN</button>
            </div>
          </div>
        </div>
        <!-- col -2 -->
        <div class="mt-12 xl:mt-0 xl:col-span-2">
          <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div v-for="(link, index) in linkData" :key="`links--${index}`">
              <h3 class="text-xs font-semibold tracking-wider uppercase text-gray-light md:text-sm">{{ link.title }}</h3>
              <ul v-if="link.child" class="mt-2 space-y-1 md:space-y-3">
                <li v-for="(item, index) in link.child" :key="`links--child-${index}`" class="break-words">
                  <a class="text-xs md:text-base text-gray hover:text-gray-dark" href="/bauvorhaben/neubau">{{ item.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-8 mt-12 border-t border-gray-lightest">
        <ul class="flex xl:justify-center mb-2">
          <li class="inline-flex mr-2"><a class="text-sm text-gray-light hover:text-gray" href="/impressum">Imprint</a></li>
          <li class="inline-flex mr-2"><a class="text-sm text-gray-light hover:text-gray" href="/agb">Contitions</a></li>
          <li class="inline-flex mr-2"><a class="text-sm text-gray-light hover:text-gray" href="/privacy">Data protection</a></li>
        </ul>
        <p class="text-base text-gray-light xl:text-center">© 2020 Partum GmbH. All rights reserved.</p>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '@/components/Container.vue'
export default {
  components: { Container },
  data () {
    return {
      logo: require('@/assets/images/logo.png'),
      linkData: [
        {
          title: 'Constraction Project',
          child: [
            { title: 'New building', url: '#' },
            { title: 'Modification', url: '#' },
            { title: 'Cultivation', url: '#' },
            { title: 'Breackthrough', url: '#' },
            { title: 'Increase', url: '#' },
            { title: 'Loft conversion', url: '#' },
            { title: 'Change of use', url: '#' },
            { title: 'Redevelopment', url: '#' }
          ]
        },
        {
          title: 'Services',
          child: [
            { title: 'ARCHITECTURE', url: '#' },
            { title: 'Feasibility study', url: '#' },
            { title: 'Approval planning', url: '#' },
            { title: 'Implementation planning', url: '#' },
            { title: 'Execution drawings', url: '#' },
            { title: 'Building survey', url: '#' },
            { title: 'CIVIL ENGINEERING', url: '#' },
            { title: 'Statics', url: '#' },
            { title: 'TGA pplanning', url: '#' },
            { title: 'LANDSCAPE ARCHITECTURE', url: '#' },
            { title: 'Landscape architecture', url: '#' }
          ]
        },
        {
          title: 'Constraction Work',
          child: [
            { title: 'Construction supervision', url: '#' },
            { title: 'Construction work', url: '#' },
            { title: 'Construction management', url: '#' },
            { title: 'EVIDENCE & EXPERT OPINING', url: '#' },
            { title: 'Building land appraisal', url: '#' },
            { title: 'Enery advice', url: '#' },
            { title: 'Soundproofing certificate (DIN 4109)', url: '#' },
            { title: 'Mortgage lending', url: '#' },
            { title: 'FIRE PROTECTION', url: '#' },
            { title: 'Fire protection concepts', url: '#' },
            { title: 'Fire protection certificate', url: '#' },
            { title: 'Fire protection certificate according to DIN 4102-1', url: '#' }
          ]
        },
        {
          title: 'Companies',
          child: [
            { title: 'about us', url: '#' },
            { title: 'Became a partner', url: '#' },
            { title: 'Credentials', url: '#' },
            { title: 'Counselor', url: '#' },
            { title: 'Jobs', url: '#' },
            { title: 'Help', url: '#' },
            { title: 'FAQ', url: '#' },
            { title: 'Contact', url: '#' },
            { title: 'info@construyo', url: '#' },
            { title: '+49 30 896779777', url: '#' }
          ]
        }
      ]
    }
  }
}
</script>

<style>
</style>
