<template>
  <router-view/>
</template>

<style lang="scss">

// Couleur
// fond header
$bg-primary : #6dc9f0;
// fond corps de page
$bg-secondary : #F0F2F5;
$bg-secondary-hover : #e6e8eb;
$couleurSecondair : #107761;
$policePrincipal : black;


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $policePrincipal;
  }
}

body{
  margin:0px;
}

// gestion des couleurs
.bg-primary-perso {
  background-color: $bg-primary;
}
.bg-secondary-perso {
  background-color: $bg-secondary;
}
a:hover {
  color: $couleurSecondair;
}
p, a {
  color: $policePrincipal;
}

.bg-secondary-perso-hover:hover {
  background-color: $bg-secondary-hover;
}
// taille du fond
.bg-seize{
  width: 100%;
  min-height: calc(100vh - 60px);
}
// gestion des liens
a
{
  text-decoration: none;
}
a:not([href]):not([class]), a:not([href]):not([class]):hover {
  color: inherit;
  text-decoration: none;
}
// gestion des bouttonsy
button
{
  border: none;
  border-radius: 15px;
}
input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
[role=button] {
  cursor: pointer;
}

.border {
    margin-top: 15px;
    padding: 5px;

    .title {
        text-align: left;
        margin-top: 5px;
    }
}
// gestion de flex
.flex
{
  display: flex;
}

.center{
  justify-content: center;
}

// Le flex colomne de bootstrap as un important. Ne permet pas le changement a 370px
.colomne{
  flex-direction: column;
  align-items: center;
  line-height: 10px;
  margin-bottom: 16px ;
}

@media (min-width: 370px) { 
  .flex-370-row {
    flex-direction: row;
    
  }
}

// Anti répétition
nav, button, .connexion {
  margin: auto;
  height: min-content;
}
// Gestion des polices
h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $policePrincipal;
}

// Taille polices
.title > h1 {
  font-size: 30px;
}
.title2 > h2 {
    font-size: 25px;
  }
.h3 {
  font-size: 20px;
}
#logo {
  height: 20px;
}
#logo:hover {
  margin-top: 6px;
  height: 22px;
  border-bottom: solid 2px black;
}

.maxWidth700px{
    max-width: 700px;
}

@media (min-width: 600px) { 
  .title > h1 {
    font-size: 35px;
  }
  .title2 > h2 {
    font-size: 30px;
  }
  .h3 {
    font-size: 28px;
  }
  #logo {
    height: 28px;
  }
  #logo:hover {
    margin-top: 6px;
    height: 31px;
    border-bottom: solid 3px black;
  }
}
</style>