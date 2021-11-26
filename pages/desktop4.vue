<template>
  <div class="flex flex-col gap-y-20">
    <!-- part 1 -->
    <Container :px="0" fluid class="flex flex-col-reverse items-center lg:flex-row lg:mt-0">
      <div class="flex-1 p-5 rounded-lg -mt-16 lg:mt-0 z-10 shadow-lg lg:shadow-none bg-white mx-5">
        <div class="flex flex-col items-center lg:items-start gap-y-3 mx-5 xl:mx-36  lg:mr-0">
          <h1 class="h1">{{ part1.title }}</h1>
          <div class="text-lg font-medium text-center lg:text-left">{{ part1.des }}</div>
        </div>
      </div>
      <div class="flex-1 overflow-hidden">
        <div class="flex-1 lg:hidden">
          <img class="w-full overflow-hidden h-full" :src="part1.img.Vector4" alt="img">
        </div>
        <div class="flex-1 justify-end hidden lg:flex">
          <div class="w-full overflow-hidden" style="transform: skew(-10deg); margin-right: -60px;">
            <div style="transform: skew(10deg);">
              <img style="margin-left: -60px" :src="part1.img.Vector4" alt="img">
            </div>
          </div>
        </div>
      </div>
    </Container>
    <!-- part 2 -->
    <Container class="flex flex-col md:flex-row gap-x-5 justify-between items-start">
      <div class="flex-1 flex flex-col gap-y-5" style="max-width: 700px">
        <div class="flex flex-col gap-y-3">
          <h3 class="h3">What should be done with your project?</h3>
          <p class="font-medium text-lg">I wanted to remove two walls in my new apartment and have the load-bearing capacity of the ceiling checked in order to connect the living room with the kitchen and thus create more space. Of course, for this I also needed the static calculations of a structural engineer. Since I don't necessarily know the industry myself and don't have any structural engineers in my circle of friends, I only had to search the Internet and I'm very happy that it came about!</p>
        </div>
        <div class="flex flex-col gap-y-3">
          <h3 class="h3">How did you find Construyo?</h3>
          <p class="font-medium text-lg">The renovation of my kitchen is my first own renovation project, so I wanted to find out a little bit about the processes and requirements before I started. While searching the Internet, I came across a post on the Construyo site, in which the wall breakthrough is explained in great detail and simply, which helped me a lot to get an idea of ​​the extent of the renovation work.</p>
        </div>
        <div class="flex flex-col gap-y-3">
          <h3 class="h3">Why did you choose Construyo?</h3>
          <p>The really good information on the website led me to fill out the contact form at Construyo. But also the advice on the phone and the very fair price finally led to the fact that I commissioned the statics for the breakthrough from Construyo. Although I had little idea about the subject, the client consultant never took advantage of it, on the contrary. All the steps and processes were explained to me in detail.</p>
          <img :src="part2.img.item1" alt="img">
        </div>
        <div class="flex flex-col gap-y-3">
          <h3 class="h3">How did you find Construyo?</h3>
          <div class="font-medium text-lg">The renovation of my kitchen is my first own renovation project, so I wanted to find out a little bit about the processes and requirements before I started. While searching the Internet, I came across a post on the Construyo site, in which the wall breakthrough is explained in great detail and simply, which helped me a lot to get an idea of ​​the extent of the renovation work.</div>
        </div>
        <div class="flex flex-col gap-y-3">
          <h3 class="h3">Why did you choose Construyo?</h3>
          <p class="font-medium text-lg">The really good information on the website led me to fill out the contact form at Construyo. But also the advice on the phone and the very fair price finally led to the fact that I commissioned the statics for the breakthrough from Construyo. Although I had little idea about the subject, the client consultant never took advantage of it, on the contrary. All the steps and processes were explained to me in detail.</p>
        </div>
      </div>
      <div class="flex-1 hidden md:flex" style="max-width: 300px">
        <div class="flex flex-col gap-y-3 border rounded-xl p-5 font-semibold shadow-md">
          <div class="font-bold text-lg">Moritz F.</div>
          <hr>
          <div class="grid gap-y-3">
            <div>
              <div class="text-gray-400 font-bold">PROJECT</div>
              <a class="text-indigo-800 hover:underline" href="#">Static calculator for the opening of two walls as well as static</a>
              <a class="text-indigo-800 hover:underline" href="#">Calculation of the load-bering capacity of the celling</a>
            </div>
            <div>
              <div class="text-gray-400 font-bold">LOCATION</div>
              <a class="text-indigo-800 hover:underline" href="#">Grafelling</a>
            </div>
            <div>
              <div class="text-gray-400 font-bold">DATE</div>
              <a class="text-indigo-800 hover:underline" href="#">November 2019</a>
            </div>
          </div>
          <hr>
          <div class="flex flex-col items-center">
            <button class="w-full bg-indigo-800 text-white px-10 py-2 rounded-sm" style="max-width: 300px;">Get my offer now</button>
            <a class="text-sm text-indigo-700 underline" href="#">Contect Construyo</a>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
export default {
  components: { Container },
  data () {
    return {
      part1: {
        title: 'Expansion of an eat-in kitchen',
        des: "In my opinion, Construyo is the perfect solution for everyone who simply doesn't have the experience with such projects or the time in everyday life.",
        img: {
          Vector4: require('@/assets/images/desktop4/vector4.jpg')
        }
      },
      part2: {
        img: {
          item1: require('@/assets/images/desktop4/item1.jpg')
        }
      }
    }
  }
}
</script>

<style>

</style>
