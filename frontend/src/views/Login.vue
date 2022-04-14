<template>
  <div class="login">
    <!-- POURQUOI ???? Mettre des messages innutil ???-->
    <Header/>
    <div class="bg-seize flex center bg-secondary-perso">
      <div class="connexion">
        <div class="title">
        <h1>Veuiller vous connecter</h1>
        </div>
        <div class="formulaire">
          <form @submit.prevent="login">
            <div class="form-groupe flex">
              <label for="nom">Votre nom :</label>
              <input type="text" class="form-control" placeholder="Jean" name="username" id="nom" required="true" v-model="username"/>
            </div>
            <div class="form-groupe flex">
              <label for="pass">Votre mot de passe :</label>
              <input type="password" class="form-control" placeholder="******" name="password" id="nom" required="true" v-model="password"/>
            </div>
            <div>
              <p id="erreur"></p>
            </div>
            <div class="button flex">
              <button class="bg-primary-perso h5" type="submit">Connexion</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <StyleSignAndRegister/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import StyleSignAndRegister from '@/components/StyleSignAndRegister.vue'

export default {
  name: 'Login',
  components: {
    Header,
    StyleSignAndRegister
  },
  
  mounted() {

    /*let paramFetch = {
      method: "POST",
      //body: json()),
      //headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };

    console.log("La page est monté");
    //fetch("http://localhost:3000/api/auth/login", paramFetch)
    //.then(response => response.json())
    // .then(data => this.posts=data)*/
  
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    
    login(){

    let data = {
      username: this.username,
      password: this.password
    }

    let option = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)//body: JSON.stringify(data) -> récupe la variable data du dessus et non le data()
    }
    //let url = "http://localhost:3000/api/login";
    //const response = await fetch(url, config);

    console.log("Le fetch de connexion va se lancer!")

    fetch("http://localhost:3000/api/login", option)
      .then(response => {
        console.log(response)
        if(response.status == 200) {
        response.json()
          
          .then(responseJson => {
            //console.log(response.token)
            sessionStorage.setItem('token', responseJson.token)
            sessionStorage.setItem('id', responseJson.userId)
            sessionStorage.setItem('admin', responseJson.admin)
            this.$router.push('/')
          })
        }else{
            response.json()
              .then(responseJson => {
                const p = document.getElementById("erreur")
                console.log(responseJson)
                p.innerText = responseJson.error
              })
            
        }
      })
      .catch(err => console.log(`Erreur avec le message : ${err}`));

      // réupérer event puis -> event prévenent default avec vueJs : 

    }
  }
}


</script>