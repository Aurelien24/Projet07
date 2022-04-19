<template>
    <p v-if ="item.updatedAt != item.createdAt" class="mt-4">Dernière modification : {{formatDate}}</p>
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
            console.log(moment(this.item.updatedAt).calendar())
            return moment(this.item.updatedAt).calendar();
        }
    }
}

</script>