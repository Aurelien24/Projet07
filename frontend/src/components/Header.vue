<script>
export default {
	name: 'Header',
	props: ['url', 'url2', 'url3']
}
</script>

<!--
 // Utilise v-if et v-else pour le statue de connexion
 -->
<template>
	
    <header class="header flex couleur-principal bg-primary-perso">
        <nav class="flex space-around">
            <router-link to="/" class="h3">Accueil</router-link>
            <router-link to="/login" class="h3">Connexion</router-link>
            <router-link to="/sign" class="h3">Inscription</router-link>
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