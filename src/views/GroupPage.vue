<template>
    <div>
        Viewww grouuup
      <RouterLink to="/add_post" class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Add post
      </RouterLink>
      <img src="http://127.0.0.1:8000/storage/posts/test.png" alt="Preview Image" class="mt-10 h-100">

    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useUserStore} from "/stores/user-store";
import axios from "axios";
import router from "@/router";

const userStore = useUserStore();

onMounted(() => {
    console.log('user iddd', userStore.userId)
})
</script>