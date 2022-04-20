<template>
  <div class="sign">
    <Header/>
    <div class="bg-seize flex center bg-secondary-perso">
		<div class="connexion col-10 maxWidth500px">
      <div>
        <img src="../assets/image/icon-above-font.svg" alt="Logo goupomania" id ="logoETnom">
      </div>
      <div class="title">
        <h1>Veuiller vous inscrire</h1>
      </div>
      <div class="formulaire">
        <form @submit.prevent="sign">
          <div class="flex-column flex">
            <label for="nom">Votre nom :</label>
            <input type="text" class="form-control" placeholder="Jean" name="username" required="true" v-model="username"/>
          </div>
          <div class="flex-column flex">
            <label for="nom">Votre email :</label>
            <input type="text" class="form-control" placeholder="JeanMarcel@yahoo.com" name="email" required="true" v-model="email"/>
          </div>
          <div class="flex-column flex">
            <label for="pass">Votre mot de passe :</label>
            <input type="password" class="form-control" placeholder="******" name="password" required="true" v-model="password"/>
          </div>
          <div class="flex-column flex">
            <label for="pass">Confirmer votre mot de passe :</label>
            <input type="password" class="form-control" placeholder="******" name="password2" required="true" v-model="password2"/>
          </div>
          <div>
            <p>{{error}}</p>
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
  name: 'Sign',
  components: {
    Header
  },
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      email: '',
      error: ''
    }
  },
  methods: {
    
    sign(){

      let data = {
        username: this.username,
        password: this.password,
        password2: this.password2,
        email: this.email
      }

      let option = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }

      fetch("http://localhost:3000/api/signup", option)
        .then((data) => {
          // Si c'est bon nous passon a la suite, sinon message d'erreur
          if(data.status == 200){

            data.json()
              .then(responseJson => {
                // Connexion automatique après inscription
                sessionStorage.setItem('token', responseJson.token)
                sessionStorage.setItem('id', responseJson.userId)
                sessionStorage.setItem('admin', responseJson.admin)
                this.$router.push('/')
              })
          }else{
            data.json()
              .then((dataJSON) => {
                this.error = dataJSON.message
              })
          }
        }) 
      .catch(() => this.error = "Erreur d'envoit, vérifier votre connexion");
    }
  }
}
</script>
