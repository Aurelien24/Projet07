

<!--
 // Utilise v-if et v-else pour le statue de connexion
 -->
<template>
	
    <header class="header flex couleur-principal bg-primary-perso">
        <nav class="flex space-around align-items-center h-100">
            <!-- Retirer le h3 fera remonté le logo -->
            <router-link to="/" class="h3"><img src="../assets/image/icon-left-font-monochrome-black.svg"  alt="Logo goupomania" id="logo"></router-link>
            <router-link to="/param" class="h3 font-weight-bold">Profil</router-link>
            <router-link to="/login" class="h3 font-weight-bold" v-on:click="deco">Déconexion</router-link>
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
        },
        hover() {
            const element = document.getElementById("logo") 
            element.setAttribute('src', '../assets/image/icon-left-font-monochrome-black.svg');
        }
    }
}

</script> 

<style lang="scss">
    header{
        height: 60px;
        nav {
            width: 100%;

            a {
                margin-bottom: 0px;
            }
        }
    }

    
</style>