<template>
  <div class="param">
    <HeaderCo/>
    <div class="pas-connecter flex center bg-secondary"> 
        <div class="post">
            <div>
                <p class="title"> Part : {{post.userId}}</p>
                <p class="title"> {{post.createdAt}}</p>
            </div>
            <p>{{post.text}}</p>
            <button v-on:click="postId"> examiner </button>
        </div>
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
    data() {
        return {
            post : [],
            coms : []
        }
    },
    mounted() {

        console.log(this.$route.params.id)

        let id = this.$route.params.id

        let token = window.sessionStorage.token;

        let postOption = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        let postRequest = new Request ('http://localhost:3000/api/post/' + id)

        fetch(postRequest, postOption)
            .then(response => response.json())
                .then(data => this.post=data)
        
        let comRequest = new Request ('http://localhost:3000/api/com/' + id)
    }
    // methods: {}
}
</script>