<template>
    <p v-if ="item.updatedAt != item.createdAt" class="mt-4 font-italic">Dernière modification : {{formatDate}}</p>
</template>

<script>

    let moment = require('moment');
    moment.locale('fr');

export default {
	name: 'DateVue',
    props: {
        item : {
            type : Object,
            required: true
        }
    },
    computed: {
        formatDate () {
            // renvoit une date type : Hier à 21:22
            return moment(this.item.updatedAt).calendar();
        }
    }
}

</script>