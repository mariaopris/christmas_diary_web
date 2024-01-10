<template>
  <header class="">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      <div class="flex lg:flex-1">
        <template v-if="!is_logged_in">
          <div class="flex items-center space-x-3">
            <img class="h-10 w-10" src="/src/assets/christmas-market.svg" alt="">
            <h class="text-xl text-red-500 font-sans font-bold italic">X-Max Diary</h>
          </div>
        </template>
        <template v-else>
          <RouterLink to="/" class="-m-1.5 p-1.5">
            <div class="flex items-center space-x-3">
              <img class="h-10 w-10" src="/src/assets/christmas-market.svg" alt="">
              <h class="text-xl text-red-500 font-sans font-bold italic">X-Max Diary</h>
            </div>
          </RouterLink>
        </template>
      </div>
      <div v-if="!is_logged_in" class="hidden lg:flex lg:flex-1 lg:justify-end">
        <RouterLink class="text-sm font-bold text-red-500 p-2 bg-white" to="/register">Sign up
        </RouterLink>
        <RouterLink class="text-sm font-bold leading-6 text-white p-2 rounded-lg bg-red-500" to="/login">Log in <span
            aria-hidden="true">&rarr;</span></RouterLink>
      </div>
      <div v-if="is_logged_in" class="hidden lg:flex lg:flex-1 lg:justify-end">
         <button @click="logout()" class="text-sm font-semibold leading-6 text-gray-900 p-2" to="/login">Log out <span
            aria-hidden="true">&rarr;</span></button>
      </div>
    </nav>

  </header>

  <RouterView/>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import "tailwindcss/tailwind.css"
import {onMounted, ref} from "vue";
import {useUserStore} from "/stores/user-store";
import router from "@/router";

const userStore = useUserStore();
const is_logged_in = ref(false);

const logout = () => {
  userStore.setUserId('');
  is_logged_in.value = false;
  router.push('/login');
}

onMounted(() => {
  if(userStore.userId !== ''){
    is_logged_in.value = true;
  }
})
</script>
