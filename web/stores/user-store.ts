import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userId = ref(sessionStorage.getItem('U_userId'));

    function setUserId(_userId:string) {
        sessionStorage.setItem('U_userId',_userId.toString());
        userId.value = _userId;
    }

    return { userId, setUserId}
})
