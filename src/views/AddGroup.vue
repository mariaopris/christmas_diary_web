<template>
  <div class="px-20 py-5">
    <form>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-3xl justify-center flex font-semibold text-gray-900">Add new group</h2>

          <div class="mt-16 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="name" class="block text-lg font-medium text-gray-900">Group name</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="text" name="name" id="name" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="name" class="block text-lg font-medium text-gray-900">Members</label>
              <div class="mt-3">
               <template v-for="(member, member_index) in 2">
                 <div class="flex space-x-10 mt-2">
                   <p>Name name</p>
                   <button class="underline text-red-500">delete</button>
                 </div>
               </template>
               <template v-for="(member, member_index) in 3">
                 <div class="flex space-x-10 mt-2">
                   <p>Name name</p>
                   <button class="px-3 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white p-1 text-sm border border-green-500 hover:border-transparent rounded">
                     Add
                   </button>
                 </div>
               </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-center gap-x-6">
        <RouterLink to="/" class="text-sm font-semibold leading-6 text-gray-900">Cancel</RouterLink>
        <button type="submit" class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

</script>