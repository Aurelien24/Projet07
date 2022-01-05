// ./components/HomeLink.vue
<template>
	<div class="pas-connecter flex center bg-secondary">
		<div class="connexion">
            <div class="title">
                <h1>Veuiller vous connecter</h1>
            </div>
            <div class="formulaire">
                <form>
                    <div class="form-groupe">
                        <label for="nom">Votre nom :</label>
                        <input type="text" class="form-control" placeholder="Jean" name="pseudo" id="nom" required="true"/>
                    </div>
                    <div class="form-groupe">
                        <label for="pass">Votre mot de passe :</label>
                        <input type="password" class="form-control" placeholder="******" name="password" id="nom" required="true"/>
                    </div>
                    <div class="button flex">
                        <button class="bg-primary h5">Connexion</button>
                    </div>
                </form>
            </div>
        </div>
	</div>
</template>

<style lang="scss">
// h1 seize ?
.pas-connecter {
	width: 100%;
    height: calc(100vh - 30px);
}

.button {
    width: 100%;
    margin-top: 15px;
    button {
        padding: 10px;
    }
}

</style>