<template>
  <div>
    <header class="">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div class="flex lg:flex-1">
          <template v-if="auth.getUser === ''">
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
        <div v-if="auth.getUser !== ''" class="hidden lg:flex lg:flex-1 lg:justify-end">
          <button @click="logout()" class="text-sm font-semibold leading-6 text-gray-900 p-2" to="/login">Log out <span
              aria-hidden="true">&rarr;</span></button>
        </div>
        <div v-else class="hidden lg:flex lg:flex-1 lg:justify-end">
          <RouterLink class="text-sm font-bold text-red-500 p-2 bg-white" to="/register">Sign up
          </RouterLink>
          <RouterLink class="text-sm font-bold leading-6 text-white p-2 rounded-lg bg-red-500" to="/login">Log in <span
              aria-hidden="true">&rarr;</span></RouterLink>
        </div>
      </nav>

    </header>

    <RouterView/>
  </div>

</template>

<script setup lang="ts">
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import {onMounted, ref} from "vue";
import {useUserStore} from "/stores/user-store";
import {useAuthStore} from "../stores/auth";
import {useCookies} from "vue3-cookies";
import axios from "axios";
import Swal from "sweetalert2";

const userStore = useUserStore();
const is_logged_in = ref(false);
const auth = useAuthStore();
const {cookies} = useCookies();
const router = useRouter();
const route = useRoute();
const userId = ref(0);

const logout = async () => {
  try {
    await axios.post("http://127.0.0.1:8000/api/logout")
        .then(async (response) => {

          delete axios.defaults.headers.common.Authorization;
          cookies.remove('Token', response.data.token);
          auth.logout();

          await router.push('/login');

        });
  } catch (e) {
    console.log(e);
    if (e.response?.data?.error) {
      await Swal.fire({
        icon: 'error',
        title: 'Ooops..',
        text: e.response.data.error,
      })
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Ooops..',
        text: "An unknown error has occured",
      })
    }
  }
}

onMounted(() => {
  if(userStore.userId !== ''){
    is_logged_in.value = true;
  }
})
onMounted(async () => {
  axios.interceptors.response.use((response) => {
    return response
  }, function (error) {
    return Promise.reject(error)
  })

  let my_cookie_value = cookies.get("Token");

  axios.defaults.headers.common.Authorization = "Bearer " + my_cookie_value;

  await axios.get("http://127.0.0.1:8000/api/getUser")
      .then((result) => {
        console.log('result', result)
        auth.setUser(result.data);
        userId.value = result.data.id;
      })
      .catch((error) => {
        console.log('eroare: ', error);
        if (route.name) {
          if (route.name !== 'login' && route.name !== 'register') {
            if (error.response?.status === 401) {
              router.push('/login');
            }
          }
        }
      })
})
</script>
