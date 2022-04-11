<template>
  <div class="param">
    <HeaderCo/>
    <div class="bg-seize flex center bg-secondary-perso"> 
        <div class="post">
            <div>
                <p class="title"> Part : {{post.userName}}</p>
                <DateVue :date ="post.createdAt"/>
            </div>
            <p>{{post.text}}</p>
            <div>
                <button v-on:click="modifiePost = true" v-if="admin"> modifier </button>
                <button v-on:click="modifiePost = true" v-else-if="userId == post.userId"> modifier </button>
                <button v-on:click="suprPost" v-if="admin"> supprimer </button>
                <button v-on:click="suprPost" v-else-if="userId == post.userId"> supprimer </button>
            </div>
            
            <form @submit.prevent="modifiePostFonction" v-if="modifiePost">
                <input type="text" class="form-control" placeholder="Votre nouveau text" name="newTextPost" id="newTextPost" required="true" v-model="newTextPost"/>  <!-- required="false" avec image -->
                <!--<label for="myfile">Selectionne une image:</label>
                <input type="file" id="imageMsg" name="imageMsg" accept="image/png, image/jpeg">-->
                <button type="submit">modifier</button>
            </form>
        </div> 
        <div class="creeCom">
            <form @submit.prevent="creeCom">
                <input type="text" class="form-control" placeholder="Votre commentaire" name="textCom" id="textCom" required="true" v-model="textCom"/>  <!-- required="false" avec image -->
                <!--<label for="myfile">Selectionne une image:</label>
                <input type="file" id="imageMsg" name="imageMsg" accept="image/png, image/jpeg">-->
                <button type="submit">commenter</button>
            </form>
        </div>
        <div class="coms">
            <!--<router-link :to="{ name: 'ComId', params: { id: com.id }}" v-for="com in coms" v-bind:key="com.id" class="com">   Faire route ComId--> 
                <div v-for="com in coms" v-bind:key="com.id" class="com">
                    <div class="flex space-around">
                        <p class="title"> Part : {{com.userName}}</p>
                        <!--<p class="title">{{date(post.createdAt)}}</p> Faire un formatage avec le forma Date() -> to local format  date(post.createdAt) | dateFr -->
                        <DateVue :date ="com.createdAt"/>
                    </div>
                    <p>{{com.text}}</p>
                    <div>
                        <button v-on:click="modifieCom = true" v-if="admin"> modifier </button>
                        <button v-on:click="modifieCom = true" v-else-if="userId == post.userId"> modifier </button>
                        <button v-on:click="suprCom" v-if="admin"> supprimer </button>
                        <button v-on:click="suprCom" v-else-if="userId == post.userId"> supprimer </button>
                    </div>
                </div> 
            <!--</router-link>-->
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
            modifiePost : false
        }
    },
    methods: {

        zoneModifiePost(){
            //this.modifie
            //Post = true
            console.log("bubu")
        },
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
                    .then(data => this.post=data)
        },
        suprPost(){
            let id = this.$route.params.id
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
                    .then(data => this.post=data)

            let secondPostRequest = new Request ('http://localhost:3000/api/post/' + id + '/com')

            fetch(secondPostRequest, postOption)
                .then(response => response.json())
                    .then(data => this.post=data)
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
                    .then(data => this.post=data)
        },
        modifieCom(){
            let id = this.$route.params.id
            let comId = this.$route.params.comId // c'est FAUX !
            let token = window.sessionStorage.token;
            //let newTextPost = this.newTextPost

            let data = {
                text: this.textCom
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

            let comRequest = new Request ('http://localhost:3000/api/post/' + id + '/com' + comId)

            fetch(comRequest, postOption)
                .then(response => response.json())
                    .then(data => this.post=data)
        },
        suprCom(){
            let id = this.$route.params.id
            let comId = this.$route.params.comId // c'est FAUX !
            let token = window.sessionStorage.token;
            //let newTextPost = this.newTextPost

            let postOption = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }

            let comRequest = new Request ('http://localhost:3000/api/post/' + id + '/com' + comId)

            fetch(comRequest, postOption)
                .then(response => response.json())
                    .then(data => this.post=data)
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