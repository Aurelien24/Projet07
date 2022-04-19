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
            type : String,
            required: true
        }
    },
    computed: {
        formatDate () {
            return moment(this.date).startOf(this.date).fromNow();
        }
    }
}

</script>