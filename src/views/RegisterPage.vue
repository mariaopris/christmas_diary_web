<template>
  <div class="flex items-center justify-center mr-40 ml-40">
    <form @submit.prevent="save()">
      <div class="space-y-12 mt-10 w-[1000px]">
        <div>
          <h2 class="text-3xl font-bold leading-7 text-gray-900">Create a new profile</h2>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">hotels.com/</span>
                  <input v-model="username" required type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" />
                </div>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div class="mt-2">
                <input v-model="email" required type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="mt-2">
                <input v-model="password" required type="password" name="password" id="password" autocomplete="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="confirm_password" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
              <div class="mt-2">
                <input v-model="confirm_password" required type="password" name="confirm_password" id="confirm_password" autocomplete="confirm_password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6 mb-10">
        <router-link to="/login" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</router-link>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
import {useUserStore} from "/stores/user-store";

const userStore = useUserStore();
const username = ref('');
const password = ref('');
const email = ref('');
const confirm_password = ref('');

const save = async () => {
  if (password.value !== confirm_password.value) {
    await Swal.fire({
      title: 'Error!',
      text: "Passwords don't match",
      icon: 'error',
    })
  } else {
    try {
      await axios.post("http://127.0.0.1:8000/api/user", {
        name: username.value,
        password: password.value,
        email: email.value,
      })
          .then((response) => {
            console.log('responseee',response.data);
            Swal.fire({
              title: 'Account created successfully!',
              icon: 'success',
            })
            userStore.setUserId(response.data.user_id);
            router.push('/');
          });
    } catch (e) {
      await Swal.fire({
        title: 'Error!',
        text: e,
        icon: 'error',
      })
      console.log(e);
    }
  }
}

</script>
