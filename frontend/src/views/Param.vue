<template>
  <div class="param">
    <HeaderCo/>
    <div class="bg-seize flex center bg-secondary-perso"> 
      <div>
        <div class="title">
            <h1>Votre profil</h1>
        </div>
        <div class="container">
            <div class = "row">
                <div class="col-sm-4 col-12">
                    <div class="ChangeMail title2">
                        <h2>Vos information</h2>
                    </div>
                    <div class="flex-column flex">
                        <label for="nom">Votre nom :</label>
                        <div>
                            <p>{{ user.username }}</p>
                        </div>
                    </div>
                    <div class="flex-column flex">
                        <label for="email">Votre email :</label>
                        <div>
                            <p>{{ user.email }}</p>
                        </div>
                    </div>
                    <!--  Zone pour l'image utilisateur. Non implémenté.
                    <div class="flex-column flex">
                        <label for="image">Votre image :</label>
                        <div>
                            <p>{{ user.image }}</p>
                        </div>
                    </div>
                    -->
                    <div>
                        <button v-on:click="delCompte" class="btn bg-primary-perso h5">Suppression compte</button>
                    </div>
                </div>
                <div class="col-sm-4 col-12">
                    <div class="ChangeMail title2">
                        <h2>Changer votre email</h2>
                    </div>
                    <form @submit.prevent="changeMail">
                        <div class="flex-column flex">
                            <label for="pass">Votre mot de passe :</label>
                            <input type="password" class="form-control" placeholder="******" name="passwordMail" required="true" v-model="passwordMail"/>
                        </div>
                        <div class="flex-column flex">
                            <label for="pass">Votre nouveau email :</label>
                            <input type="text" class="form-control" placeholder="JeanMarcel@yahoo.com" name="newMail" required="true" v-model="newMail"/>
                        </div>
                        <div class="flex-column flex">
                            <label for="pass">Confirmer votre nouveau email :</label>
                            <input type="text" class="form-control" placeholder="JeanMarcel@yahoo.com" name="newMail2" required="true" v-model="newMail2"/>
                        </div>
                        <div>
                            <p id="messageMail" v-if= "emailError != ''">{{emailError}}</p>
                        </div>
                        <div class="button flex">
                            <button class="btn bg-primary-perso h5" type="submit">Changer votre email</button>
                        </div>
                    </form>
                </div>
                <div class="col-sm-4 col-12">
                    <div class="ChangeMDP title2">
                        <h2>Changer votre mot de passe</h2>
                    </div>
                    <form @submit.prevent="changeMDP">
                        <div class="flex-column flex">
                            <label for="pass">Votre mot de passe :</label>
                            <input type="password" class="form-control" placeholder="******" name="passwordMDP" required="true" v-model="passwordMDP"/>
                        </div>
                        <div class="flex-column flex">
                            <label for="pass">Votre nouveau mot de passe :</label>
                            <input type="password" class="form-control" placeholder="******" name="newPassword" required="true" v-model="newPassword"/>
                        </div>
                        <div class="flex-column flex">
                            <label for="pass">Confirmer votre nouveau mot de passe :</label>
                            <input type="password" class="form-control" placeholder="******" name="newPassword2" required="true" v-model="newPassword2"/>
                        </div>
                        <div>
                            <p v-if= "mdpError != ''">{{mdpError}}</p>
                        </div>
                        <div class="button flex">
                            <button class="btn bg-primary-perso h5" type="submit">Changer votre mot de passe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderCo from '@/components/HeaderCo.vue'

export default {
    name: 'Param',
    components: {
        HeaderCo
    },
    data() {
        return {
            passwordMail: '',
            newMail: '',
            newMail2: '',
            passwordMDP: '',
            newPassword: '',
            newPassword2: '',
            user: {},
            emailError: "",
            mdpError: ""
        }
    },
    methods: {
        changeMail() {

            let newMail = this.newMail;
            let newMail2 = this.newMail2;

            // Vérifie la concordence des email ne sera pas refait part le backend
            if(newMail == newMail2){
                
                let token = window.sessionStorage.token;

                let data = {
                    passwordMail: this.passwordMail,
                    email: this.newMail
                }

                let option = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                }

                fetch("http://localhost:3000/api/changeEmail", option)
                    .then(response => {
                        if( response.status == 200) {
                            // Change l'affichage de l'email
                            this.user.email = data.email
                        }
                        response.json()
                            .then(responseJson => {
                                // Dans tout les cas, affiche le résultat
                                this.emailError = responseJson.message
                            })
                    })
                    .catch(err => console.log(`Erreur avec le message : ${err}`));
            }else{
                this.emailError = "Vos deux email ne sont pas identique"
            }
        },
        changeMDP() {

            let newPassword = this.newPassword;
            let newPassword2 = this.newPassword2;

            // Compare les deux mot de passe
            if(newPassword == newPassword2){

                let token = window.sessionStorage.token;

                let data = {
                    oldPassword: this.passwordMDP,
                    password: this.newPassword
                }

                let option = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                }

                fetch("http://localhost:3000/api/changeMDP", option)
                    .then(response => {
                        response.json()
                            .then(responseJson => {
                                // Revoit le résultat du serveur
                                this.mdpError = responseJson.message
                            })
                    })
                    .catch(err => console.log(`Erreur avec le message : ${err}`));
            }else{
                this.mdpError = "Vos deux mot de passe ne son pas"
            }
        },
        delCompte() {

            // S'assure de la volonté de l'utilisateur via le prompt.
            let mdp = prompt("Etes vous sur de vouloir supprimer votre compte ? Toute suppression est déffinitive. Veuillez entrer votre mot de passe pour confirmer.")
            
            if(mdp != null){
                let data = {
                    password: mdp
                }

                let token = window.sessionStorage.token;

                let option = {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                }
                
                fetch("http://localhost:3000/api/suprCompte", option)
                    .then(response => {
                        
                        if(response.status == 200) {
                            // Le compte est supprimer, ont nettoy le sessionStorage et renvoit sur login
                            sessionStorage.clear()
                            this.$router.push('/login')
                        }else{
                            response.json()
                                .then(responseJSON => {
                                    alert(responseJSON.message)
                                })
                        }})
                    .catch(err => console.log(`Erreur avec le message : ${err}`));
            }
        }
    },
    mounted() {


        // Le backend récupére l'id du token pour savoir des identifiens

        let token = window.sessionStorage.token;

        let option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        fetch("http://localhost:3000/api/user", option)
            .then(response => response.json())
                .then(data => this.user=data)
            .catch(err => console.log(err))
    }
}
</script>

<style lang="scss">
.title2 {
    margin-top: 10px;
}
</style>