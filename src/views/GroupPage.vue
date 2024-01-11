<template>
    <div>
        Viewww grouuup
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