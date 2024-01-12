<template>
  <div class="px-20">
    <div class="bg-white py-5">
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex space-x-3 justify-center">
          <h2 class="text-center text-2xl font-semibold text-gray-900">Add Post</h2>
        </div>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="name" class="block text-lg font-medium text-gray-900">Add a description</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <textarea v-model="form.description" rows="3" cols="150" type="text" name="name" id="name" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
            </div>
          </div>
        </div>
      </div>

      <div class="flex space-x-3 mt-10">
        <label for="name" class="block text-lg font-medium text-gray-900">Add a photo</label>
        <input @change="addPhoto" type="file">
      </div>

      <img v-if="selectedFile" :src="previewImage" alt="Preview Image" class="mt-10 h-100">

      <div class="mt-6 flex items-center justify-center gap-x-6 mb-10">
        <router-link :to="'/view_group/'+form.group_id" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</router-link>
        <button @click="savePost()" type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {Post} from "@/composables/Post";
import Swal from "sweetalert2";
import router from "@/router";
import {useRoute} from "vue-router";
import {useUserStore} from "../../stores/user-store";

const form = ref<Post>(new Post());
const route = useRoute();
const selectedFile = ref(null);
const previewImage = ref(null);
const userStore = useUserStore();

const addPhoto = (e) => {
  form.value.photo = e.target.files[0];
  selectedFile.value = e.target.files[0];

  if (selectedFile.value) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.value = reader.result;
    };
    reader.readAsDataURL(selectedFile.value);
  } else {
    previewImage.value = null;
  }
}

const savePost = async () => {
  const formData = new FormData();
  formData.append('description', form.value.description);
  formData.append('group_id', form.value.group_id);
  formData.append('user_id', form.value.user_id);
  formData.append('photo', form.value.photo);

    await axios.post("http://127.0.0.1:8000/api/post", formData)
        .then(async (result) => {
          if(result.data.status) {
            await Swal.fire({
              title: 'Post added successfully!',
              icon: 'success',
            })
          } else {
            await Swal.fire({
              title: 'An error has occurred...',
              html: result.data.message,
              icon: 'error',
            })
          }
          await router.push('/view_group/'+form.value.group_id);
        }).catch((e) => {
          Swal.fire({
            icon: 'error',
            title: 'An error has occurred!',
            text: e,
          })
        });
}

onMounted(() => {
  form.value.user_id = userStore.userId;
  form.value.group_id = route.params.group_id;
})
</script>
