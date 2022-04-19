<template>
	
    <header class="header flex couleur-principal bg-primary-perso">
        <nav class="flex space-around maxWidth700px">
            <router-link to="/login" class="h3 font-weight-bold">Connexion</router-link>
            <router-link to="/sign" class="h3 font-weight-bold">Inscription</router-link>
        </nav>
    </header>
</template>

<script>
export default {
	name: 'Header',
	props: ['url', 'url2', 'url3']
}
</script>

<style lang="scss">
    header{
        height: 60px;
        nav {
            width: 100%;
        }
    }

    // Style formulaire connexion inscription
    #logoETnom {
        width: 100%;
        margin: 15px 0px 15px 0px;
    }

    form > div {
        margin-top: 15px;
    }

    .maxWidth500px {
        max-width: 500px;
    }
</style>