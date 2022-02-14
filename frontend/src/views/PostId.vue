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
            <button v-on:click="modifie" v-if="admin"> modifier </button>
            <button v-on:click="modifie" v-else-if="userId == post.userId"> modifier </button>
            <button v-on:click="modifie" v-if="admin"> supprimer </button>
            <button v-on:click="modifie" v-else-if="userId == post.userId"> supprimer </button>
        </div>
        <div class="coms">
            <router-link :to="{ name: 'ComId', params: { id: com.id }}" v-for="com in coms" v-bind:key="com.id" class="com">
                <div>
                    <p class="title"> Part : {{com.userId}}</p>
                    <p class="title"> {{com.createdAt}}</p> <!-- Faire un formatage avec le forma Date() -> to local format -->
                </div>
                <p>{{com.text}}</p>
                <button v-on:click="comId"> commenter </button>
                <button v-on:click="comId" v-if="admin === true || userId == com.userId"> modifier </button>
                <button v-on:click="comId" v-if="admin === true || userId == com.userId"> supprimer </button>
            </router-link>
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
            coms : [],
            userId : window.sessionStorage.id,
            admin : window.sessionStorage.admin
        }
    },
    methods: {
    
        modifie(){
            console.log(this.userId)
            console.log(this.admin)
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
        
        let comRequest = new Request ('http://localhost:3000/api/post/' + id + '/com')

        //let data = {postId: id}

        let comOption = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            //body: JSON.stringify(data) NE FONCTIONNE PAS SUR UN GET
        }

        fetch(comRequest, comOption)
            .then(response => response.json())
                .then(data => this.coms=data)
    }
    // methods: {}
}
</script>