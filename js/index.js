const { createApp } = Vue


createApp({
    data() {
        return {
            url:"../productos.json",
            error: false,
            datos:[],

                                  
        }
    },
    methods:{
        fetchData(url){
            fetch(url)
            .then(response => response.json())
            .then(data => {
                    console.log(data)
                    this.datos= data.baseDeDatos
            })
         },

    },
    
    created(){
        this.fetchData(this.url)

    }
    
}).mount('#app')