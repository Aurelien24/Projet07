<template>
    <div class="home">
        <HeaderCo/>        
        <div class="bg-seize flex center bg-secondary-perso">
            <div class="connexion col-12 col-md-10 col-lg-8 maxWidth700px">
                <div class="title">
                    <h1>Vous êtes "connecter"</h1>
                    <div class="flex">
                        <button v-on:click="mesPost" class="btn bg-primary-perso h5">Vos publications</button>
                        <button v-on:click="allPost" class="btn bg-primary-perso h5">Nouveauté</button>
                    </div>
                </div>
                <div>
                    <form @submit.prevent="newPost">
                        <textarea id="textMsg" name="textMsg" rows="5" cols="33" class="form-control" placeholder="Votre text" required="true" v-model="textMsg"> </textarea> <!-- required="false" avec image -->
                        <!-- Zone pour l'intégration des images non requis dans la version actuelle
                        <label for="myfile">Selectionne une image:</label>
                        <input type="file" id="imageMsg" name="imageMsg" accept="image/png, image/jpeg">-->
                        <button type="submit" class="btn bg-primary-perso h5 mt-3">Poster</button>
                    </form>
                    <router-link :to="{ name: 'PostId', params: { id: post.id }}" v-for="post in posts " v-bind:key="post.id" class="router-link" >
                        <div class="bg-secondary-perso-hover border post">
                            <div class="flex justify-content-around colomne flex-370-row">
                                <p class="title"> Part : {{post.userName}}</p>
                                <DateVue :date ="post.createdAt"/>
                            </div>
                            <!-- <img v-if="post.image != undifine" src="{{post.image}}"> --><!-- J'ai un sérieux doute src Voir doc-->
                            <p>{{post.text}}</p>
                            <DateModifVue :item ="post"/>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
// @ is an alias to /src
import HeaderCo from '@/components/HeaderCo.vue'
import DateVue from '@/components/DateVue.vue'
import DateModifVue from '@/components/DateModifVue.vue'

export default {
    name: 'Home',
    components: {
    HeaderCo,
    DateVue,
    DateModifVue
    },
    
    data() {
        return {
            posts : [],
            textMsg : '',
            imageMsg : ''
        }
    },
    methods: {
        newPost() {
            
            let data = {
                text: this.textMsg
            }

            let token = window.sessionStorage.token;

            let option = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            }
            
            fetch("http://localhost:3000/api/post", option)
                .then((response) =>{
                    if(response.status == 201){
                        response.json()
                        .then((responseJson) => {
                            // Puch le nouveau post. Il est renvoyé part le frontend. Il as tout ce qu'il faut
                            this.posts.push(responseJson)
                            // Compare et trie la liste. Ce fait avec L'id et donc l'ordre de création des postes.
                            this.posts.sort( function (a,b) {return b.id - a.id})
                        })
                    }
                })
                .catch(() => alert("Une erreur est survenu"));

            
        },

        allPost(){
            // Reprend tout les posts. Si on clique sur nouveauté. Évite de recharger la page.
            let token = window.sessionStorage.token;

            let option = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }

            fetch("http://localhost:3000/api/post", option)
                .then(response => response.json())
                    .then(data => this.posts=data)
        },

        mesPost(){
            // Retire tout les postes qui ne sont pas les notres de la liste
            const id = window.sessionStorage.id
            
            const supr = this.posts.filter(post => post.userId == id)
            this.posts = supr
        }
    },
    mounted() { 

        let token = window.sessionStorage.token;

        let option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        // Récupère directement la liste des posts pour l'établir
        fetch("http://localhost:3000/api/post", option)
            .then(response => response.json())
                .then(datas => this.posts=datas) 
    }
}

</script>