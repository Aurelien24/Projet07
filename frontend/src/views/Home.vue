<template>
    <div class="home">
    Peut inclure les props-->
        <HeaderCo/>
        <div class="pas-connecter flex center bg-secondary">
            <div class="connexion">
                <div class="title">
                    <h1>Vous êtes "connecter"</h1>
                    <button v-on:click="mesPost">Vos publications</button>
                    <button v-on:click="allPost">Nouveauté</button>
                </div>
                <div>
                    <form @submit.prevent="newPost">
                        <input type="text" class="form-control" placeholder="Votre text" name="textMsg" id="textPost" required="true" v-model="textMsg"/>  <!-- required="false" avec image -->
                        <button type="submit">Poster</button>
                    </form>
                   <!-- <router-link :to="{ path: 'post/', params: { id: post.id }}" v-for="post in posts" v-bind:key="post.id" class="post"> -->
                    <form @submit.prevent="postId(post.id)" v-for="post in posts" v-bind:key="post.id" class="post">
                        <div>
                            <p class="title"> Part : {{post.userId}}</p>
                            <p class="title"> {{post.createdAt}}</p>
                        </div>
                        <p>{{post.text}}</p>
                        <button v-on:click="postId"> examiner </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src             setTimeout(() => {this.posts=data}, 5000)
import HeaderCo from '@/components/HeaderCo.vue'

// import router from '@/router/index.js'


export default {
    name: 'Home',
    components: {
    HeaderCo
    },
    
    data() {
        return {
            posts : [],
            textMsg : ''
        }
    },
    methods: {
        newPost() {

            console.log("le poste se crée")

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
                body: JSON.stringify(data)//body: JSON.stringify(data) -> récupe la variable data du dessus et non le data()
            }

            //if(textPost.length >= 12){ // textMsg ne fonctionne pas non plus
            fetch("http://localhost:3000/api/post", option)
                .then((response) => response.json()) // , this.$router.push('/#') ne fonctionne pas pour refresh
                .catch(() => alert("Une erreur est survenu"))
            //} 
        },

        allPost(){
            console.log(window.sessionStorage.token) 

            let token = window.sessionStorage.token;

            console.log("bonjour");
            if(window.sessionStorage.token){

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
            } else {
                console.log("vous allez etre redirigé")
            }
        },

        mesPost(){

            console.log(window.sessionStorage.token) 

            let token = window.sessionStorage.token;

            console.log("bonjour");
            if(window.sessionStorage.token){

            let option = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }

            fetch("http://localhost:3000/api/mesPost", option)
                .then(response => response.json())
                    .then(data => this.posts=data)
            } else {
                console.log("vous allez etre redirigé")
            }
        },

       postId(id) {

            console.log(id)
            this.$router.push({ name: 'PostId', params: { id: id } })
        }


    },
    mounted() {

        console.log(window.sessionStorage.token) 

        let token = window.sessionStorage.token;

        console.log("bonjour");
        if(window.sessionStorage.token){

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
        } else {
            console.log("vous allez etre redirigé")
        }
    }
    //redirection() {
    //  window.location = "/#/login"
    //}

}

</script>

<style lang="scss">
// h1 seize ?
.pas-connecter {
    width: 100%;
    height: calc(100vh - 60px);
}
.post {
    margin-top: 15px;
    padding: 5px;
    //border: 1px, solid, black;
    border: solid;

    .title {
        text-align: left;
        margin-top: 5px;
    }
}
</style>