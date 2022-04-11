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
        .then((data) => console.log(data)) 
        .catch(err => console.log(`Erreur avec le message : ${err}`));
    },
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

      fetch("http://localhost:3000/api/login", option)
        .then(response => response.json())

          .then(tokenContenaire => {
            sessionStorage.setItem('token', tokenContenaire.token)
            sessionStorage.setItem('id', tokenContenaire.userId)
            sessionStorage.setItem('admin', tokenContenaire.admin)
          })//, sessionStorage.setItem('id', tokenContenaire.userId)) //, sessionStorage.setItem('admin', tokenContenaire.admin)) // , sessionStorage.setItem('username', username Problème : la réponse ne se récupère pas. [objet sans réponse] code : sessionStorage.setItem('token', response.token), console.log(this.response)
            .then(() => this.$router.push('/'))
        .catch(err => console.log(`Erreur avec le message : ${err}`));

        // réupérer event puis -> event prévenent default avec vueJs : 

    }
  }
}
</script>
