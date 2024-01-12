<template>
    <template v-if="isLoading">
        Is loading...
    </template>
    <template v-else>
        <div class="px-20 py-5">
            <form>
                <div class="space-y-12">
                    <h2 class="text-3xl justify-center flex font-semibold text-gray-900">{{groupName}}</h2>
                </div>
                <div>
                    <RouterLink :to="'/add_post/'+groupId" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span class="sr-only">Action button</span>
                        Add Post
                    </RouterLink>
                </div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Membrii grupului
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Postari
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-for="post in posts">
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                              <div class="w-10 h-10 rounded-full" :style="{ backgroundColor: getRandomColor() }">
                                <div class="text-center mt-2 font-semibold">
                                  {{userName.charAt(0)}}
                                </div>
                              </div>
                              <div class="ps-3">
                                <div class="text-base font-semibold">{{post.user_name}}</div>
                                <div class="font-normal text-gray-500">{{post.user_email}}</div>
                              </div>
                            </th>
                            <td class="px-6 py-4">
                              <img :src="'http://127.0.0.1:8000/storage/'+post.photo" alt="photo"/>
                              <div class="font-normal text-gray-500">{{post.description}}</div>
                            </td>
                          </tr>
                        </template>
                        </tbody>
                    </table>
                </div>

                <div class="mt-6 flex items-center justify-center gap-x-6">
                    <RouterLink to="/" class="text-sm font-semibold leading-6 text-gray-900">Cancel</RouterLink>
                    <button type="submit" class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">Save</button>
                </div>
            </form>
        </div>

    </template>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {Post} from "@/composables/Post";

const isLoading = ref(true);
const groupId = ref('');
const route = useRoute();
const groupName = ref('');
const userName = ref('Ana');
const posts = ref<Post[]>([]);
groupId.value = String(route.params.group_id);

function getRandomColor() {
    const getRandomComponent = () => Math.floor(Math.random() * 150 + 100); // Bias towards higher values
    const r = getRandomComponent();
    const g = getRandomComponent();
    const b = getRandomComponent();
    return `rgb(${r}, ${g}, ${b})`;
}
const getGroups = async () => {
    axios.get('http://127.0.0.1:8000/api/getGroups')
        .then(response => {
            response.data.data.forEach((group) => {
                if(group.id == groupId.value){
                    groupName.value = group.name;
                }
            })
        })
        .catch(error => {

        });
}

const getPosts = async () => {
    axios.get('http://127.0.0.1:8000/api/getPosts/'+groupId.value)
        .then(response => {
            response.data.posts.forEach((post) => {
                posts.value.push(post);
            })
        })
        .catch(error => {
            console.log('error', error)
        });
}

onMounted(async () => {
    await getGroups();
    await getPosts();
    isLoading.value = false;
})
</script>