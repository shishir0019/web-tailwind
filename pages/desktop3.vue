<template>
  <div class="">
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
    <Container>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-20 mx-5 md:mx-32 lg:mx-2">
        <div v-for="(item, index) in part2.customers" :key="`customer-${index}`" class="shadow-md ring-1 rounded-lg overflow-hidden ring-gray-200 hover:ring-1 hover:shadow-xl">
          <img :src="item.img" class="w-full" alt="img">
          <div class="p-3 font-bold">
            <div>{{ item.customer.name }}</div>
            <div>{{ item.customer.address }}</div>
          </div>
        </div>
      </div>
    </Container>
    <!-- part 3 -->
    <Container class="flex flex-col md:flex-row items-center justify-center py-10">
      <button class="btn-big" style="max-width: 300px;">Get my offer now</button>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
export default {
  components: { Container },
  layout: 'layout1',
  data () {
    return {
      part1: {
        title: 'Customer stories',
        des: 'Read here how our customers plan and implement their construction projects more efficiently and cost-effectively with the help of Construyo .',
        img: {
          Vector4: require('@/assets/images/desktop3/Vector4.jpg')
        }
      },
      part2: {
        customers: [
          {
            customer: {
              name: 'The Lindemann family',
              address: 'Sweden-style bungalow in a winegrowing regin'
            },
            img: require('@/assets/images/desktop3/item1.png')
          },
          {
            customer: {
              name: 'The Lindemann family',
              address: 'Sweden-style bungalow in a winegrowing regin'
            },
            img: require('@/assets/images/desktop3/item2.png')
          },
          {
            customer: {
              name: 'The Lindemann family',
              address: 'Sweden-style bungalow in a winegrowing regin'
            },
            img: require('@/assets/images/desktop3/item3.png')
          },
          {
            customer: {
              name: 'The Lindemann family',
              address: 'Sweden-style bungalow in a winegrowing regin'
            },
            img: require('@/assets/images/desktop3/item4.png')
          },
          {
            customer: {
              name: 'The Lindemann family',
              address: 'Sweden-style bungalow in a winegrowing regin'
            },
            img: require('@/assets/images/desktop3/item5.png')
          },
          {
            customer: {
              name: 'The Lindemann family',
              address: 'Sweden-style bungalow in a winegrowing regin'
            },
            img: require('@/assets/images/desktop3/item6.png')
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
