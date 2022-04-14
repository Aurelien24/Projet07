<template>
  <div class="sign">
    <!-- POURQUOI ???? Mettre des messages innutil ???-->
    <Header/>
    <div class="bg-seize flex center bg-secondary-perso">
		<div class="connexion">
            <div class="title">
                <h1>Veuiller vous inscrire</h1>
            </div>
            <div class="formulaire">
                <form @submit.prevent="sign">
                    <div class="form-groupe flex">
                        <label for="nom">Votre nom :</label>
                        <input type="text" class="form-control" placeholder="Jean" name="username" required="true" v-model="username"/>
                    </div>
                    <div class="form-groupe flex">
                        <label for="nom">Votre email :</label>
                        <input type="text" class="form-control" placeholder="JeanMarcel@yahoo.com" name="email" required="true" v-model="email"/>
                    </div>
                    <div class="form-groupe flex">
                        <label for="pass">Votre mot de passe :</label>
                        <input type="password" class="form-control" placeholder="******" name="password" required="true" v-model="password"/>
                    </div>
                    <div class="form-groupe flex">
                        <label for="pass">Confirmer votre mot de passe :</label>
                        <input type="password" class="form-control" placeholder="******" name="password2" required="true" v-model="password2"/>
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
  name: 'Sign',
  components: {
    Header,
    StyleSignAndRegister
  },
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      email: '',
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

      console.log("Le fetch d'inscription va se lancer!")

      console.log(this.username)
      fetch("http://localhost:3000/api/signup", option)
        .then((data) => {
          if(data.status == 200){

            data.json()
              .then(responseJson => {
                //console.log(response.token)
                sessionStorage.setItem('token', responseJson.token)
                sessionStorage.setItem('id', responseJson.userId)
                sessionStorage.setItem('admin', responseJson.admin)
                this.$router.push('/')
              })
          }else{
            data.json()
              .then((dataJSON) => {
                console.log("l'erreur va s'afficher")
                const p = document.getElementById("erreur")
                p.innerText = dataJSON.message
              })
          }
        }) 
        .catch(err => console.log(`Erreur avec le message : ${err}`));
    }
  }
}
</script>
