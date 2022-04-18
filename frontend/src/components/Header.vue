<script>
export default {
	name: 'Header',
	props: ['url', 'url2', 'url3']
}
/*export default {
	name: 'Header',
    props: ['url', 'url2', 'url3']

    data(){
    return {

    }
    },
    methods: {
        hover() {
            const element = document.getElementById("logo") 
            element.setAttribute('src', '../assets/image/icon-left-font.svg');
        }
    }
}
*/
</script>

<!--
 // Utilise v-if et v-else pour le statue de connexion
 -->
<template>
	
    <header class="header flex couleur-principal bg-primary-perso">
        <nav class="flex space-around">
            <!-- Retirer le h3 fera remonté le logo -->
            <router-link to="/" class="h3"><img src="../assets/image/icon-left-font-monochrome-black.svg" alt="Logo groupomania" id="logo"></router-link>
            <router-link to="/login" class="h3 font-weight-bold">Connexion</router-link>
            <router-link to="/sign" class="h3 font-weight-bold">Inscription</router-link>
        </nav>
    </header>
</template>

<style lang="scss">
    header{
        height: 60px;
        nav {
            width: 100%;
        }
    }

    
</style>