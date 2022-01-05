// ./components/HomeLink.vue

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
	
    <header class="header flex couleur-principal bg-primary">
        <nav class="flex space-around">
            <a href="urlIndex" class="h3">Accueil</a>
            <a href="urlConnexion" class="h3">Connexion</a> 
            <a href="urlInscription" class="h3">Inscription</a>
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
