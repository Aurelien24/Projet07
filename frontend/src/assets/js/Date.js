
export default {
	name: 'Date',

    data(){
    return {

    }
    },
    methods: {
        date(date) {
            let moment = require('moment');

            moment.locale('fr');

            //moment().format('MMMM Do YYYY, h:mm:ss a')
            console.log(moment(date).format('MMMM Do YYYY, h:mm:ss a')) 
            return moment(date).startOf(date).fromNow(); //.format('MMMM Do YYYY, h:mm:ss a');
        }
    }
}
