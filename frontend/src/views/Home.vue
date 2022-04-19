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
                    <router-link :to="{ name: 'PostId', params: { id: post.id }}" v-for="post in posts " v-bind:key="post.id" >
                        <div class="bg-secondary-perso border post">
                            <div class="flex space-around">
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

            console.log("le poste se crée")
            let data = {
                text: this.textMsg,
                image: this.imageMsg // regarder comment envoyer fichier avec fetch. Et pas en JSOn
            }

            let token = window.sessionStorage.token;

            let option = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)//body: JSON.stringify(data) -> récupe la variable data du dessus et non le data()
            }
            
            fetch("http://localhost:3000/api/post", option)
                .then((response) =>{
                    response.json()
                        .then((responseJson) => {
                            this.posts.push(responseJson)
                            // Compare et trie la liste. Ce fait avec L'id et donc l'ordre de création des postes.
                            this.posts.sort( function (a,b) {return b.id - a.id})
                        })
                    })
                .catch(() => alert("Une erreur est survenu"));

            
        },

        allPost(){
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
            const id = window.sessionStorage.id
            console.log(id)
            
            const supr = this.posts.filter(post => post.userId == id)
            this.posts = supr

            //return this.posts.filter(post => post.userId == id)
            console.log(supr)
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

        fetch("http://localhost:3000/api/post", option)
            .then(response => response.json())
                .then(datas => this.posts=datas) 
    }
}

</script>

<style lang="scss">
// h1 seize ?

.border {
    margin-top: 15px;
    padding: 5px;
    //border: 1px, solid, black;
    border: medium solid black;;

    .title {
        text-align: left;
        margin-top: 5px;
    }
}
</style>