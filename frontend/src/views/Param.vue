<template>
  <div class="param">
    <HeaderCo/>
    <div class="pas-connecter flex center bg-secondary"> 
      <div>
        <div class="title">
        <h1>Votre profil</h1>
        </div>
        <div class="profil"> <!-- A mettre dans un components ? Ou le gérer ici. Au choix. -->
            <form>
                <div class="form-groupe flex">
                    <label for="nom">Votre nom :</label>
                    <div>
                        <p>{{ name }}</p>
                    </div>
                </div>
                <div class="form-groupe flex">
                    <label for="nom">Votre email :</label>
                    <div>
                        <p>{{ email }}</p>
                    </div>
                </div>
                <div class="form-groupe flex">
                    <label for="nom">Votre image :</label>
                    <div>
                        <p>{{ image }}</p>
                    </div>
                </div>
            </form>
        </div>
        <div class="ChangeMail">
            <h2>Changer votre email</h2>
        </div>
        <div> <!-- A mettre dans un components ? Ou le gérer ici. Au choix. -->
            <form @submit.prevent="changeMail">
                <div class="form-groupe flex">
                    <label for="pass">Votre mot de passe :</label>
                    <input type="password" class="form-control" placeholder="******" name="passwordMail" required="true" v-model="passwordMail"/>
                </div>
                <div class="form-groupe flex">
                    <label for="pass">Votre nouveau email :</label>
                    <input type="text" class="form-control" placeholder="JeanMarcel@yahoo.com" name="newMail" required="true" v-model="newMail"/>
                </div>
                <div class="form-groupe flex">
                    <label for="pass">Confirmer votre nouveau email :</label>
                    <input type="text" class="form-control" placeholder="JeanMarcel@yahoo.com" name="newMail2" required="true" v-model="newMail2"/>
                </div>
                <div class="button flex">
                    <button class="bg-primary h5" type="submit">Changer votre email</button>
                </div>
            </form>
        </div>
        <div class="ChangeMDP">
            <h2>Changer votre mot de passe</h2>
        </div>
        <div> <!-- A mettre dans un components ? Ou le gérer ici. Au choix. -->
            <form @submit.prevent="changeMDP">
                <div class="form-groupe flex">
                    <label for="pass">Votre mot de passe :</label>
                    <input type="password" class="form-control" placeholder="******" name="passwordMDP" required="true" v-model="passwordMDP"/>
                </div>
                <div class="form-groupe flex">
                    <label for="pass">Votre nouveau mot de passe :</label>
                    <input type="password" class="form-control" placeholder="******" name="newPassword" required="true" v-model="newPassword"/>
                </div>
                <div class="form-groupe flex">
                    <label for="pass">Confirmer votre nouveau mot de passe :</label>
                    <input type="password" class="form-control" placeholder="******" name="newPassword2" required="true" v-model="newPassword2"/>
                </div>
                <div class="button flex">
                    <button class="bg-primary h5" type="submit">Changer votre mot de passe</button>
                </div>
            </form>
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
            name: window.sessionStorage.username
        }    
    },
    methods: {
        changeMail() {
            console.log("Changement de l'email lancer")

            let newMail = this.newMail;
            let newMail2 = this.newMail2;

            if(newMail == newMail2){
                
                let token = window.sessionStorage.token;

                let data = {
                    // ATTENTION CE USERNAME N'EST PAS SéCURISé
                    username: window.sessionStorage.username,
                    passwordMail: this.passwordMail,
                    newMail: this.newMail,
                    newMail2: this.newMail2
                }

                let option = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)//body: JSON.stringify(data) -> récupe la variable data du dessus et non le data()
                }
                console.log(newMail + " Seras le nouvel email")

                fetch("http://localhost:3000/api/changeEmail", option)
                    .then(response => response.json())
                    .catch(err => console.log(`Erreur avec le message : ${err}`));
            }
        },
        changeMDP() {
            console.log("Changement du mdp lancer")

            let newPassword = this.newPassword;
            let newPassword2 = this.newPassword2;

            if(newPassword == newPassword2){

                let token = window.sessionStorage.token;

                let data = {
                    username: window.sessionStorage.username,
                    password: this.passwordMDP,
                    newPassword: this.newPassword,
                    newPassword2: this.newPassword2
                }

                console.log(data.username)

                let option = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)//body: JSON.stringify(data) -> récupe la variable data du dessus et non le data()
                }
                console.log(newPassword + " Seras le nouvel mpd")
                
                fetch("http://localhost:3000/api/changeMDP", option)
                    .then(response => response.json())
                    .catch(err => console.log(`Erreur avec le message : ${err}`));
            }
        }
    },
    mounted() {


        // Récupérer l'id du token pour savoir des identifien !

        let token = window.sessionStorage.token;

        console.log("bonjour");

        let option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        fetch("http://localhost:3000/api/user", option)
            .then(data => data.json())
            .catch(err => console.log(err))
    }
}
</script>