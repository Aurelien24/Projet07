<template>
    <div class="home">
    <!-- Peut inclure les props-->
        <HeaderCo/>
        
        <div class="bg-seize flex center bg-secondary-perso">
            <div class="connexion">
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
                        <!--<label for="myfile">Selectionne une image:</label>-->
                        <!--<input type="file" id="imageMsg" name="imageMsg" accept="image/png, image/jpeg">-->
                        <button type="submit" class="btn bg-primary-perso h5 mt-3">Poster</button>
                    </form>
                    <router-link :to="{ name: 'PostId', params: { id: post.id }}" v-for="post in posts" v-bind:key="post.id" >
                        <div class="bg-secondary-perso border post">
                            <div class="flex space-around">
                                <p class="title"> Part : {{post.userName}}</p>
                                <!--<p class="title">{{date(post.createdAt)}}</p> Faire un formatage avec le forma Date() -> to local format  date(post.createdAt) | dateFr -->
                                <DateVue :date ="post.createdAt"/>
                            </div>
                            <!-- <img v-if="post.image != undifine" src="{{post.image}}"> --><!-- J'ai un sérieux doute v-src ? Voir doc-->
                            <p>{{post.text}}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script > // src="../assets/js/Date.js"
// @ is an alias to /src             setTimeout(() => {this.posts=data}, 5000)
import HeaderCo from '@/components/HeaderCo.vue'
//import Date from '@/components/Date.vue' Ex ligne pour le component
//import * as Date from '../assets/js/Date.js'
import DateVue from '@/components/DateVue.vue'
//import Bootstap from '@/components/DateVue.vue'
// import router from '@/router/index.js'


export default {
    name: 'Home',
    components: {
    HeaderCo,
    DateVue
    },
    
    data() {
        //let moment = require('moment')
        return {
            

            posts : [],  
            textMsg : '',
            imageMsg : '',
           //dateTest : moment(posts.Object.createdAt).format('MMMM Do YYYY, h:mm:ss a')   
        }
    },
    methods: {
        newPost(post) {

            console.log("le poste se crée")
            console.log(post.imageMsg)

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
                .then((response) => response.json()) // , this.$router.push('/#') ne fonctionne pas pour refresh
                .catch(() => alert("Une erreur est survenu"));
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
        }
    },
    mounted() { 

        let token = window.sessionStorage.token;

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
                
                /*.then(data => {
                    data.forEach(data.createdAt => {
                        moment(post.updatedAt).format('MMMM Do YYYY, h:mm:ss a')
                    });
                })
                   /*.then(posts => forEach(post => {
                       console.log('bubu consol.log passe !') 
                   });)
                    // post.createdAt ==  moment(post.updatedAt).format('MMMM Do YYYY, h:mm:ss a')
                    /*this.posts.forEach(post => {
                        console.log(post)
                        console.log('bubu consol.log passe !')
                    });  //dateTest : moment(posts.Object.createdAt).format('MMMM Do YYYY, h:mm:ss a')*/
        } else {
            this.$router.push('/login')
        }

        //posts.forEach(posts.date => let posts.newDate = moment().format('MMMM Do YYYY, h:mm:ss a'))
 
        //console.log(data)
    }
    //redirection() {
    //  window.location = "/#/login"
    //}

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