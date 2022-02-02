<template>
  <div class="param">
    <HeaderCo/>
    <div class="pas-connecter flex center bg-secondary"> 

    </div>
  </div>
</template>

<script>

import HeaderCo from '@/components/HeaderCo.vue'
export default {
    name: 'Param',
    components: {
        HeaderCo
    },
    mounted() {

        console.log(this.$route.params.id)

        let id = this.$route.params.id

        let token = window.sessionStorage.token;

        let option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        let request = new Request ('http://localhost:3000/api/post/' + id)

        fetch(request, option)
            .then(response => response.json())
                .then(data => this.posts=data)
    }
    // methods: {}
}
</script>