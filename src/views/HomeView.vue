<template>
 <div class="px-20">
  <div class="bg-white py-5">
    <div class="mx-auto max-w-7xl px-6">
      <div class="flex space-x-3 justify-center">
        <h2 class="text-center text-2xl font-semibold text-gray-900">Your groups</h2>
        <RouterLink to="/add-group">
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-1 text-sm border border-blue-500 hover:border-transparent rounded">
            Add Group
          </button>
        </RouterLink>
      </div>
      <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <template v-for="(group, group_index) in 6">
          <div class="border border-1 p-5 rounded-lg flex-col items-center justify-center hover:bg-gray-100">
            <p class="flex mb-1 items-center justify-center">Group 1</p>
            <img class="h-24 w-fit rounded-md" src="/src/assets/generic-photo.jpg" alt="">
          </div>
        </template>
      </div>
    </div>
  </div>

 </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useUserStore} from "/stores/user-store";

const userStore = useUserStore();

onMounted(() => {
  console.log('user iddd', userStore.userId)
})
</script>