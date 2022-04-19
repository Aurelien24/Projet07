<template>
  <div class="param">
    <HeaderCo/>
    <div class="bg-seize flex center bg-secondary-perso">
        <div class="container">
            <div class="row flex center">
                <div class="col-12 col-md-10 col-lg-8 maxWidth700px border">
                    <div class="flex justify-content-around">
                        <p class="title"> Part : {{post.userName}}</p>
                        <DateVue :date ="post.createdAt"/>
                    </div>
                    <p>{{post.text}}</p>
                    <div class="flex justify-content-around">
                        <button v-on:click="modifiePost = true" v-if="admin == true" class="btn bg-primary-perso h5 mt-3"> modifier </button>
                        <button v-on:click="modifiePost = true" v-else-if="userId == post.userId" class="btn bg-primary-perso h5 mt-3"> modifier </button>
                        <button v-on:click="suprPost" v-if="admin == true" class="btn bg-primary-perso h5 mt-3"> supprimer </button>
                        <button v-on:click="suprPost" v-else-if="userId == post.userId" class="btn bg-primary-perso h5 mt-3"> supprimer </button>
                    </div>
                    
                    <form @submit.prevent="modifiePostFonction" v-if="modifiePost">
                        <input type="text" class="form-control" placeholder="Votre nouveau text" name="newTextPost" id="newTextPost" required="true" v-model="newTextPost"/>  <!-- required="false" avec image -->
                        <!--<label for="myfile">Selectionne une image:</label>
                        <input type="file" id="imageMsg" name="imageMsg" accept="image/png, image/jpeg">-->
                        <button type="submit" class="btn bg-primary-perso h5 mt-3">modifier</button>
                    </form>
                </div>
            </div>
            <div class="row flex center">
                <div class="col-12 col-md-10 col-lg-8 maxWidth700px border">
                    <form @submit.prevent="creeCom">
                        <input type="text" class="form-control" placeholder="Votre commentaire" name="textCom" id="textCom" required="true" v-model="textCom"/>
                        <button type="submit" class="btn bg-primary-perso h5 mt-3">commenter</button>
                    </form>
                </div>
                <div class="col-12 col-md-10 col-lg-8 maxWidth700px p-0">
                    <div v-for="com in coms" v-bind:key="com.id" class="com border w-100">
                        <div class="flex space-around">
                            <p class="title"> Part : {{com.userName}}</p>
                            <DateVue :date ="com.createdAt"/>
                        </div>
                        <p>{{com.text}}</p>

                        <!-- Ne peut pas concaténer modifieCom avec l'id du com -->
                        <div class="flex justify-content-around">
                            <button v-on:click="modifieCom = true" v-if="admin == true" class="btn bg-primary-perso h5 mt-3"> modifier </button>
                            <button v-on:click="modifieCom = true" v-else-if="userId == com.userId" class="btn bg-primary-perso h5 mt-3"> modifier </button>
                            <button v-on:click="suprCom(com.id)" v-if="admin == true" class="btn bg-primary-perso h5 mt-3"> supprimer </button>
                            <button v-on:click="suprCom(com.id)" v-else-if="userId == com.userId" class="btn bg-primary-perso h5 mt-3"> supprimer </button>
                        </div>
                        <form @submit.prevent="modifieComFunction(com.id)" v-if="modifieCom">
                            <input type="text" class="form-control" placeholder="Votre nouveau text" name="newTextCom" id="newTextCom" required="true" v-model="newTextCom"/>
                            <button type="submit" class="btn bg-primary-perso h5 mt-3">modifier</button>
                        </form>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import HeaderCo from '@/components/HeaderCo.vue'
import DateVue from '@/components/DateVue.vue'

export default {
    name: 'Param',
    components: {
        HeaderCo,
        DateVue
    },
    data() {
        return {
            post : [],
            coms : [],
            userId : window.sessionStorage.id,
            admin : window.sessionStorage.admin,
            newTextPost : '',
            textCom : '',
            modifiePost : false,
            //modifieCom : []
            modifieCom : false
        }
    },
    methods: {

        modifiePostFonction(){
            let id = this.$route.params.id;
            let token = window.sessionStorage.token;
            let newTextPost = this.newTextPost;

            console.log("newTextPost = " + newTextPost)

            let data = {
                text: newTextPost
            }

            let postOption = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            }

            let postRequest = new Request ('http://localhost:3000/api/post/' + id)

            fetch(postRequest, postOption)
                .then(response => response.json())
                    .then(data => {
                        this.post=data
                        this.$router.go()
                    })
        },
        suprPost(){
            let id = this.$route.params.id
            console.log(id)
            let token = window.sessionStorage.token;

            let postOption = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }

            let postRequest = new Request ('http://localhost:3000/api/post/' + id)

            fetch(postRequest, postOption)
                .then(response => response.json())
                    .then(data => {
                        this.post=data
                        this.$router.push('/')
                    })
        },
        creeCom(){
            let id = this.$route.params.id
            let token = window.sessionStorage.token;
            //let newTextPost = this.newTextPost

            let data = {
                text: this.textCom
            }

            let postOption = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            }

            let comRequest = new Request ('http://localhost:3000/api/post/' + id + '/com')

            fetch(comRequest, postOption)
                .then(response => response.json())
                    .then(data => {
                        this.post=data
                        this.$router.go()
                    })
        },
        modifieComFunction(com){
            console.log("modifieComFunction")
            console.log(com)
            let id = this.$route.params.id
            let comId = com // c'est FAUX !
            let token = window.sessionStorage.token;
            //let newTextPost = this.newTextPost

            console.log(this.newTextCom)

            let data = {
                text: this.newTextCom
            }

            console.log(data)

            let postOption = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            }

            let comRequest = new Request ('http://localhost:3000/api/post/' + id + '/com/' + comId)

            fetch(comRequest, postOption)
                .then(response => response.json())
                    .then(data => {
                        this.post=data
                        this.$router.go()
                    })
        },
        suprCom(comId){
            let id = this.$route.params.id
            //let comId = comId // c'est FAUX !
            let token = window.sessionStorage.token;
            //let newTextPost = this.newTextPost

            console.log(comId)

            let postOption = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }

            let comRequest = new Request ('http://localhost:3000/api/post/' + id + '/com/' + comId)

            console.log(comRequest)

            fetch(comRequest, postOption)
                .then(response => {
                    response.json()
                    this.$router.go()
                })
                    .then(data => this.post=data)
        }
    },
    mounted() {

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

<style lang="scss">
    .maxWidth700px{
        max-width: 700px;
    }
</style>