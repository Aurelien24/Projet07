// Mettre un span null
<template>
    <p id="span-component" class="title">{{formatDate}}</p>
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
    methods: {
        //date(date) {
            /*let moment = require('moment');

            moment.locale('fr');

            //moment().format('MMMM Do YYYY, h:mm:ss a')
            console.log(moment(date).format('MMMM Do YYYY, h:mm:ss a')) 
            return moment(date).startOf(date).fromNow(); //.format('MMMM Do YYYY, h:mm:ss a');
        }*/
    },
    computed: {
        formatDate () {
            console.log(this.date)

            return moment(this.date).startOf(this.date).fromNow();
        }
    }
}

</script>