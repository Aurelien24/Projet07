<template>
  <div class="param">
    <HeaderCo/>
    <div class="bg-seize flex center bg-secondary-perso">
        <div class="container">
            <div class="row flex center">
                <div class="col-12 col-md-10 col-lg-8 maxWidth700px border">
                    <div class="flex justify-content-around colomne flex-370-row">
                        <p class="title"> Part : {{post.userName}}</p>
                        <DateVue :date ="post.createdAt"/>
                    </div>
                    <p>{{post.text}}</p>
                    <DateModifVue :item ="post"/>
                    <div class="flex justify-content-around">
                        <button v-on:click="modifiePost = true" v-if="admin || userId == post.userId" class="btn bg-primary-perso h5 mt-3"> modifier </button>
                        <button v-on:click="suprPost" v-if="admin ||userId == post.userId" class="btn bg-primary-perso h5 mt-3"> supprimer </button>
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
                        <div class="flex justify-content-around colomne flex-370-row">
                            <p class="title"> Part : {{com.userName}}</p>
                            <DateVue :date ="com.createdAt"/>
                        </div>
                        <p>{{com.text}}</p>
                        <DateModifVue :item ="com"/>
                        <div class="flex justify-content-around">
                            <button v-on:click="modifieCom = com.id" v-if="admin || userId == com.userId" class="btn bg-primary-perso h5 mt-3"> modifier</button>
                            <button v-on:click="suprCom(com.id)" v-if="admin || userId == com.userId" class="btn bg-primary-perso h5 mt-3"> supprimer</button>
                        </div>
                        <form @submit.prevent="modifieComFunction(com.id)" v-if="modifieCom == com.id">
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
import DateModifVue from '@/components/DateModifVue.vue'

export default {
    name: 'Param',
    components: {
        HeaderCo,
        DateVue,
        DateModifVue
    },
    data() {
        return {
            post : [],
            coms : [],
            userId : parseInt(window.sessionStorage.id),
            admin : window.sessionStorage.admin === "true",
            newTextPost : '',
            textCom : '',
            modifiePost : false,
            modifieCom : ""
        }
    },
    methods: {

        modifiePostFonction(){
            let id = this.$route.params.id;
            let token = window.sessionStorage.token;
            let newTextPost = this.newTextPost;

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
                .then(response => {
                    if(response.status == 201) {
                        // Procède a la modification du rendu et retir le champ de modification
                        this.post.text = newTextPost
                        this.modifiePost = false
                    }
                })
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
                .then(response => {
                    if(response.status == 201) {
                        // Si le post est bien supprimer, renvoit sur Home
                        this.$router.push('/')
                    }
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
                        // Ajoute les nouveau com au début du tableau, soit en haut des commentaires pour etre bien visible.
                        this.coms.unshift(data)
                    })
        },
        modifieComFunction(com){

            let id = this.$route.params.id
            let comId = com
            let token = window.sessionStorage.token;

            let data = {
                text: this.newTextCom
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

            let comRequest = new Request ('http://localhost:3000/api/post/' + id + '/com/' + comId)

            fetch(comRequest, postOption)
                .then(response => {
                    if(response.status == 201) {
                        this.coms.forEach(com => {
                            // Vérifie si c'est le bon com qui passe
                            if(com.id == comId){
                                com.text = this.newTextCom
                                // Ferme la zone de modification
                                this.modifieCom = ''
                            }
                        });
                    }
                })
        },
        suprCom(comId){
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

            let comRequest = new Request ('http://localhost:3000/api/post/' + id + '/com/' + comId)

            fetch(comRequest, postOption)
                .then(response => {
                    // Si le post est bien supprimer du backend ont le fait sur le front
                    if(response.status == 201) {
                        this.coms.forEach(com => {
                            if(com.id == comId){
                                let cible = this.coms.indexOf(com)
                                this.coms.splice(cible, 1)
                            }
                        });
                    }
                })
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

        // Récupère le post
        fetch(postRequest, postOption)
            .then(response => response.json())
                .then(data => this.post=data)
        
        let comRequest = new Request ('http://localhost:3000/api/post/' + id + '/com')

        let comOption = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }

        // Récupère les coms
        fetch(comRequest, comOption)
            .then(response => response.json())
                .then(data => this.coms=data)
    }
}
</script>