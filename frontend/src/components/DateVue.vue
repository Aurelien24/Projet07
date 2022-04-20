<template>
    <p class="title">{{formatDate}}</p>
</template>

<script>

    let moment = require('moment');
    moment.locale('fr');

export default {
	name: 'DateVue',
    props: {
        date : {
            required: true
        }
    },
    computed: {
        formatDate () {
            // renvoit une date type : Il y as 12 heures
            return moment(this.date).startOf(this.date).fromNow();
        }
    }
}

</script>