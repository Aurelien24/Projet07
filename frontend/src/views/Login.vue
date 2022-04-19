<template>
  <div class="login">
    <Header/>
    <div class="bg-seize flex center bg-secondary-perso">
      <div class="connexion col-10 maxWidth500px">
        <div>
          <img src="../assets/image/icon-above-font.svg" alt="Logo goupomania" id ="logoETnom">
        </div>
        <div class="title">
        <h1>Veuiller vous connecter</h1>
        </div>
        <div class="formulaire">
          <form @submit.prevent="login">
            <div class="flex-column flex">
              <label for="nom">Votre nom :</label>
              <input type="text" class="form-control" placeholder="Jean" name="username" id="nom" required="true" v-model="username"/>
            </div>
            <div class="flex-column flex">
              <label for="pass">Votre mot de passe :</label>
              <input type="password" class="form-control" placeholder="******" name="password" id="nom" required="true" v-model="password"/>
            </div>
            <div>
              <p v-if= "error != '' ">{{error}}</p>
            </div>
            <div class="flex">
              <button class="btn bg-primary-perso h5" type="submit">Connexion</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Login',
  components: {
    Header
  },
  data() {
    return {
      username: '',
      password: '',
      error: ''
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
      body: JSON.stringify(data)
    }

    console.log("Le fetch de connexion va se lancer!")

    fetch("http://localhost:3000/api/login", option)
      .then(response => {
        console.log(response)
        if(response.status == 200) {
        response.json()
          
          .then(responseJson => {
            sessionStorage.setItem('token', responseJson.token)
            sessionStorage.setItem('id', responseJson.userId)
            sessionStorage.setItem('admin', responseJson.admin)
            this.$router.push('/')
          })
        }else{
          response.json()
            .then(responseJson => {
              this.error = responseJson.error
            })
        }
      })
      .catch(() => this.error = "Erreur d'envoit, vérifier votre connexion");
    }
  }
}


</script>