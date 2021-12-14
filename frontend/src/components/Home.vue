<template>
	<div class="Pas-Connecter">
		<div class="center">
            <div class="title">
                <h1>Veuiller vous connecter</h1>
            </div>
            <div class="formulaire">
                <form class="formulaire">
                    <div class="form-groupe">
                        <label for="nom">Votre nom :</label>
                        <input type="text" class="form-control" placeholder="Jean" name="pseudo" id="nom" required="true"/>
                    </div>
                    <div class="form-groupe">
                        <label for="pass">Votre mot de passe :</label>
                        <input type="password" class="form-control" placeholder="******" name="password" id="nom" required="true"/>
                    </div>
                </form>
            </div>
        </div>
	</div>
</template>

<style lang="scss">
// h1 seize ?
h1 {
	height: 20px;
}
</style>