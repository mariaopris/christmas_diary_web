<template>
  <div class="px-20 py-5">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-3xl justify-center flex font-semibold text-gray-900">Add new group</h2>
          <div class="mt-16 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="name" class="block text-lg font-medium text-gray-900">Group name</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input v-model="group_name" type="text" name="name" id="name" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="name" class="block text-lg font-medium text-gray-900">Members</label>
              <div class="mt-3">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div v-if="selected_users.length > 0" class="mb-2">
                  <template v-for="(user, user_index) in selected_users">
                    <div class="flex space-x-10 mt-2">
                      <p>{{user.name}}</p>
                      <button
                          @click="deleteUser(user_index)"
                          class="px-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white p-1 text-sm border border-red-500 hover:border-transparent rounded">Delete</button>
                    </div>
                  </template>
                </div>
                <input @input="searchUsers()" v-model="searched_name" type="search" id="default-search" class="block w-1/3 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user">
                <p class="m-2 text-gray-500 text-sm" v-if="searched_name && user_results.length === 0">It looks like there is no user with this name</p>

              <div v-if="user_results.length > 0">
                <template v-for="(user) in user_results">
                  <div class="flex space-x-10 mt-2">
                    <p>{{user.name}}</p>
                    <button
                        @click="addUser(user)"
                        class="px-3 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white p-1 text-sm border border-green-500 hover:border-transparent rounded">
                      Add
                    </button>
                  </div>
                </template>
              </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-center gap-x-6">
        <RouterLink to="/" class="text-sm font-semibold leading-6 text-gray-900">Cancel</RouterLink>
        <button @click="addNewGroup()" class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">Save</button>
      </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {useUserStore} from "../../stores/user-store";
import Swal from "sweetalert2";
import router from "@/router";

const users = ref([]);
const searched_name = ref("");
const user_results = ref([]);
const selected_users = ref([]);
const userStore = useUserStore();
const user_id = userStore.userId;
const group_name = ref('');

const getUsers = async() => {
  await axios.get('http://127.0.0.1:8000/api/users')
      .then((response) =>{
        users.value = response.data.users;
      })
}


const searchUsers = () => {
  user_results.value = [];
  if(searched_name.value !== '') {
    users.value.forEach(user => {
      if(user.name.includes(searched_name.value) && user.id != user_id){
        if(!selected_users.value.some(el => el.name === user.name)){
          user_results.value.push(user);
        }
      }
    })
  }
}

const addUser = (user) => {
  selected_users.value.push(user);
  let i = user_results.value.map(item => item.id).indexOf(user.id);
  if(i >= 0){
    user_results.value.splice(i, 1);
  }
}

const deleteUser = (index) => {
  if(searched_name.value) {
    if(selected_users.value[index].name.includes(searched_name.value)){
      user_results.value.push(selected_users.value[index]);
    }
  }
  selected_users.value.splice(index, 1);
}


const addNewGroup = async () => {
  let users = [];
  selected_users.value.forEach(user => {
    users.push(user.id);
  })
  let payload = {
    name: group_name.value,
    members: JSON.stringify(users)
  }
  await axios.post('http://127.0.0.1:8000/api/add-group', payload)
      .then((response) => {
          if(response.data.status){
            Swal.fire({
              icon: 'success',
              title: response.data.message,
            })
            router.push('/');
          }
          else{
            console.log('error', response.data);
          }

      })
}

onMounted(async() => {
  await getUsers();
})

</script>