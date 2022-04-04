

<!--
 // Utilise v-if et v-else pour le statue de connexion
 -->
<template>
	
    <header class="header flex couleur-principal bg-primary-perso">
        <nav class="flex space-around">
            <router-link to="/" class="h3">Accueil</router-link> 
            <router-link to="/param" class="h3">Profil</router-link>
            <router-link to="/login" class="h3" v-on:click="deco">Déconexion</router-link>
        </nav>
    </header>
</template>

<script>


export default {
	name: 'Header',

    data(){
    return {

    }
    },
    methods: {
        deco() {

            console.log("Déco en cour")
            //let token = window.sessionStorage.token;

            sessionStorage.clear()
            // redirection a faire
            this.$router.push('/login')
        }
    }
}

</script> 

<style lang="scss">
    header{
        height: 60px;
        nav {
            width: 100%;
        }
    }
</style>