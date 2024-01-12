<template>
  <div class="flex justify-center mt-14">
    <div class="w-full max-w-[500px]">
      <form class="bg-white shadow-lg rounded px-8  pb-8 mb-4">
        <p class="block font-bold pt-8 text-3xl text-gray-900 flex justify-center">X-Max Diary</p>
        <div class="mb-10 mt-5">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Email
          </label>
          <input v-model="email" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="password" required class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        </div>
        <p class="flex justify-center mt-3 mb-7 text-sm">If you don't have an account <RouterLink to="/register" class="underline font-semibold text-blue-500 ml-2"> Sign Up</RouterLink></p>

        <div class="flex items-center justify-center">
          <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="login()">
            Log In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {useCookies} from "vue3-cookies";
import {useAuthStore} from "/stores/auth";
import {useRouter} from "vue-router";
import {useUserStore} from "../../stores/user-store";

const email = ref('');
const password = ref('');

const auth = useAuthStore();
const {cookies} = useCookies();
const router = useRouter();
const userStore = useUserStore();

const login = async () =>{
  await axios.post("http://127.0.0.1:8000/api/login", {
    email: email.value,
    password: password.value,
  })
      .then(async (result) => {
        console.log('sss', result.data)
        axios.defaults.headers.common.Authorization = "Bearer " + result.data.token;
        cookies.set("Token", result.data.token, '5h');
        auth.setUser(result.data);
        userStore.setUserId(result.data.id);
        await router.push('/');
      }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'An error has occurred!',
          text: e,
        })
      });
}
</script>