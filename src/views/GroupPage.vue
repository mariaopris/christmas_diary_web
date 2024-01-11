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

const isLoading = ref(true);
const groupId = ref('');
const route = useRoute();
const groupName = ref('');

groupId.value = String(route.params.group_id);

const getGroups = async () => {
    axios.get('http://127.0.0.1:8000/api/getGroups')
        .then(response => {
            console.log(response.data.data);
            response.data.data.forEach((group) => {
                if(group.id == groupId.value){
                    groupName.value = group.name;
                }
            })

            isLoading.value = false;

        })
        .catch(error => {

        });
}

onMounted(async () => {
    await getGroups();
})
</script>