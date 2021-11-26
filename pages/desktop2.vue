<template>
  <div class="">
    <!-- part-1 -->
    <div class="bg-beige">
      <div class="max-w-6xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base font-semibold tracking-wide uppercase text-indigo-800">ABOUT US</h2>
          <p class="mt-1 text-4xl font-extrabold text-gray-800 sm:text-5xl sm:tracking-tight lg:text-6xl">
            We are the <span class="text-indigo-700">project planner</span> for your new home
          </p>
          <p class="max-w-4xl mx-auto mt-5 text-xl text-gray">We are a curious, passionate and innovative team.
            We have made it our business to shape the construction industry in a new and future-oriented way.
            We offer the all-encompassing solution for smooth and efficient project handling during construction.
          </p>
          <p class="max-w-sm mx-auto mt-5">
            <nuxt-link
              class="flex items-center justify-center px-8 py-1.5 text-base font-medium md:py-1.5 md:text-lg md:px-10 btn-primary"
              to="#">Start Your Query
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
    <!-- part-2 -->
    <div class="relative py-16 pt-0 bg-white sm:pt-0 lg:pt-24 sm:py-24">
      <div
        class="flex flex-col-reverse lg:flex-none lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
        <div class="relative sm:py-16 lg:py-0">
          <div aria-hidden="true" class="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
            <div class="absolute inset-y-0 w-full right-1/2 bg-beige rounded-r-3xl lg:right-72"></div><svg
              class="absolute -ml-3 top-8 left-1/2 lg:-right-8 lg:left-auto lg:top-12 text-beige-dark" width="404"
              height="392" viewBox="0 0 404 392" fill="currentColor">
              <defs>
                <pattern id="56409614-3d62-4985-9a10-7ca758a8f4f0" x="0" y="0" width="20" height="20"
                  patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                </pattern>
              </defs>
              <rect width="404" height="784" fill="url(#56409614-3d62-4985-9a10-7ca758a8f4f0)"></rect>
            </svg>
          </div>
          <div class="relative max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
            <div class="relative pt-64 pb-10 overflow-hidden shadow-xl rounded-2xl">
              <div class="absolute inset-0 object-cover w-full h-full">
                <div
                  style="display: block; overflow: hidden; position: absolute; inset: 0px; box-sizing: border-box; margin: 0px;">
                  <img :src="part2.img.founder"
                    class="object-cover" sizes="100vw"
                    :srcset="part2.img.founder"
                    style="visibility: inherit; position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;">
                </div>
              </div>
              <div class="absolute inset-0 bg-gray-lightest mix-blend-multiply"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-gray-dark via-gray-dark opacity-90"></div>
              <div class="relative px-8">
                <blockquote class="mt-8">
                  <div class="relative text-lg font-medium text-white md:flex-grow">
                    <svg
                      class="absolute top-0 left-0 w-8 h-8 text-indigo-400 transform -translate-x-3 -translate-y-2"
                      aria-hidden="true"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 144 144">
                      <path stroke-width="2" d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
                      >
                      </path>
                    </svg>
                    <p class="relative">Wir haben Construyo gegründet, weil Bauen kundenzentrierter werden muss. Unsere
                      Mission ist es, den Haus- und Wohnungsbau mit Technologie für alle zu vereinfachen.</p>
                  </div>
                  <footer class="mt-4">
                    <p class="text-base font-semibold text-beige-dark">Leonhard Jeub and Fabian Müller, Co-founders</p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        <div class="relative max-w-md px-4 pb-8 mx-auto sm:max-w-3xl sm:px-6 lg:px-0 lg:pb-0">
          <div class="pt-12 sm:pt-16 lg:pt-20">
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-dark sm:text-4xl">Our way since 2019</h2>
            <div class="mt-6 space-y-6 text-gray">
              <p class="text-base leading-7">
                After many years of working together, our founders Leo and Fabian teamed up to make building easier and more digital: to find the right specialists for building projects and to carry them out fairly and on time.
                With a small team of architects, structural engineers, engineers and programmers, Construyo is dedicated to the goal of developing the optimal platform with which all building owners can easily, transparently and reliably implement their construction project. After another round of financing, we continue to grow and every day we can help to make living dreams come true.
              </p>
            </div>
          </div>
          <div class="mt-10">
            <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
              <div class="pt-6 border-t-2 border-gray-lightest">
                <dt class="text-base font-medium text-gray-dark">Founded</dt>
                <dd class="text-3xl font-extrabold tracking-tight text-gray-dark">2019</dd>
              </div>
              <div class="pt-6 border-t-2 border-gray-lightest">
                <dt class="text-base font-medium text-gray-dark">Empployee</dt>
                <dd class="text-3xl font-extrabold tracking-tight text-gray-dark">50</dd>
              </div>
              <div class="pt-6 border-t-2 border-gray-lightest">
                <dt class="text-base font-medium text-gray-dark">Project</dt>
                <dd class="text-3xl font-extrabold tracking-tight text-gray-dark">2.500+</dd>
              </div>
              <div class="pt-6 border-t-2 border-gray-lightest">
                <dt class="text-base font-medium text-gray-dark">Patners</dt>
                <dd class="text-3xl font-extrabold tracking-tight text-gray-dark">200+</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- part 3 -->
    <div class="relative bg-white">
      <div class="max-w-md px-4 mx-auto sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
        <div class="text-left sm:text-center">
          <h2 class="text-base font-semibold tracking-wider uppercase text-indigo-800">OUR VISION</h2>
          <p class="max-w-2xl mx-auto mt-2 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
            We want to help create a world in which living is accessible to everyone.
          </p>
          <p class="mx-auto mt-5 text-xl max-w-prose text-gray-500">
            We simplify your construction process for you through transparency and low construction
            costs. With our app and our team of architects, engineers and construction experts, we
            make sure that we stay in touch with you every step of the way.
          </p>
        </div>
        <div class="mt-6">
          <dl class="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            <div v-for="(item, index) in part3.items" :key="`part3-item-${index}`">
              <dt>
                <div class="flex items-center justify-center w-12 h-12 text-white rounded-md bg-indigo-dark">
                  <img :src="item.logo" alt="logo">
                </div>
                <p class="mt-5 text-lg font-medium leading-6 text-gray-dark">{{ item.title }}</p>
              </dt>
              <dd class="mt-2 text-base text-gray">{{item.des}}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- part-4 -->
    <div class="relative pt-16 bg-white sm:pt-24 lg:pt-32">
      <div class="max-w-md px-4 mx-auto text-left sm:text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
        <div>
          <h2 class="text-base font-semibold tracking-wider uppercase text-indigo-800">OUR MISSION</h2>
          <p class="mt-2 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
            We simplify house building through technology
          </p>
          <p class="mx-auto mt-5 text-xl max-w-prose text-gray">
            For many builders, the process of implementing a construction project is still hardly digital. We have made it our mission to use technology to make the lives of builders, architects and engineers easier. Our app and our team of experts help bring the construction industry into the age of digitization.
          </p>
        </div>
      </div>
    </div>
    <!-- part-5 -->
    <div class="bg-white">
      <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div class="space-y-5 sm:space-y-4">
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-800">
              {{ part5.head.title }}
            </h2>
            <p class="text-xl text-gray-500">{{ part5.head.des }}</p>
          </div>
          <div class="lg:col-span-2">
            <ul class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
              <li v-for="(item, index) in part5.investors" :key="`part5-investors-item-${index}`">
                <div class="flex items-center space-x-4 lg:space-x-6">
                  <div class="relative w-16 h-16 lg:w-20 lg:h-20">
                    <div
                      style="display: block; overflow: hidden; position: absolute; inset: 0px; box-sizing: border-box; margin: 0px;">
                      <img
                        :alt="item.name"
                        :src="item.avatar"
                        decoding="async"
                        class="rounded-full"
                        sizes="100vw"
                        :srcset="item.avatar"
                        style="visibility: inherit; position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: contain;">
                    </div>
                  </div>
                  <div class="space-y-1 text-lg font-medium leading-6">
                    <h3>{{ item.name }}</h3>
                    <p class="text-indigo-800">{{ item.dig }}</p>
                    <div class="relative w-20 h-6">
                      <div
                        style="display: block; overflow: hidden; position: absolute; inset: 0px; box-sizing: border-box; margin: 0px;">
                        {{ item.company }}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- part-6 -->
    <div class="relative pb-16 bg-white sm:pb-24 lg:pb-32">
      <div class="max-w-md px-4 mx-auto text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
        <div>
          <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-gray-dark sm:text-4xl">{{ part6.head.title }}</h2>
          <p class="mx-auto mt-5 text-xl max-w-prose text-gray">{{part6.head.des}}</p>
        </div>
        <div class="relative w-full h-full mx-auto mt-12 md:w-11/12 lg:w-10/12">
          <div style="display: block; overflow: hidden; position: relative; box-sizing: border-box; margin: 0px;">
            <div style="display: block; box-sizing: border-box; padding-top: 59.375%;" />
            <img
              :src="part6.img.rttt1"
              decoding="async"
              sizes="100vw"
              :srcset="part6.img.rttt1"
              style="visibility: inherit; position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: contain;"
            >
          </div>
        </div>
      </div>
    </div>
    <!-- part-7 -->
    <div class="bg-indigo-dark">
      <div class="max-w-2xl px-4 py-16 mx-auto text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">{{part7.head.title}}</h2>
        <p class="mt-4 text-lg leading-6 text-gray-200">{{part7.head.des}}</p>
        <nuxt-link
          class="inline-flex items-center justify-center w-full px-5 py-1.5 mt-8 text-base font-medium sm:w-auto btn-secondary"
          to="#">Become the part Of a team
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
export default {
  components: { Container },
  data () {
    return {
      part2: {
        img: {
          xxs1: require('@/assets/images/desktop2/xxs1.png'),
          founder: require('@/assets/images/desktop2/founders.webp')
        }
      },
      part3: {
        items: [
          {
            logo: require('@/assets/images/desktop2/lightbulb.svg'),
            title: 'Innovative',
            des: 'With our app and our experts you always have an overview of all documents and construction steps'
          },
          {
            logo: require('@/assets/images/desktop2/scale.svg'),
            title: 'Transparent',
            des: 'We bring transparency to your construction project and let you decide about every step.'
          },
          {
            logo: require('@/assets/images/desktop2/lightbulb.svg'),
            title: 'Here for you',
            des: 'No matter what challenges await you, we are by your side.'
          }
        ]
      },
      part5: {
        head: {
          title: 'Our investors',
          des: 'We are proud to have Tall Capital and the Signa Group on board as our investors.'
        },
        title: 'Our investors',
        des: 'We are proud to have Tall Capital and the Signa Group on board as our investors.',
        investors: [
          {
            name: 'Beatrice Alipandi',
            avatar: require('@/assets/images/desktop2/avatar.webp'),
            dig: 'Principal',
            company: 'Tails Capital'
          },
          {
            name: 'Mark Harre',
            avatar: require('@/assets/images/desktop2/avatar.webp'),
            dig: 'MD. Venture Capital',
            company: 'Singna'
          }
        ]
      },
      part6: {
        head: {
          title: 'Our Team',
          des: 'We are a young, international and dynamic team with a modern work culture.'
        },
        img: {
          rttt1: require('@/assets/images/desktop2/rttt1.png')
        }
      },
      part7: {
        head: {
          title: 'We are changing the construction industry. And you can take part.',
          des: 'We want to develop the construction industry further. Can you help us'
        },
        img: {
          rttt1: require('@/assets/images/desktop2/rttt1.png')
        }
      }
    }
  }
}
</script>

<style>

</style>
