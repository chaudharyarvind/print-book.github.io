<template>
<div>
  <v-card hover raised class="secondary ma-2">
    <v-card-row class="blue-grey darken-1">
      <v-card-title>
        <span class="white--text">Photo Album</span>
        <v-spacer></v-spacer>
        <v-menu id="space" bottom left origin="top right" transition="v-scale-transition">
          <v-btn icon="icon" slot="activator" class="white--text">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-item>
              <v-list-tile>
                <v-list-tile-title>Print</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile>
                <v-list-tile-title>Send Feedback</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
    </v-card-row>
    <v-card-row v-bind:img="items[card_index].image" height="300px"></v-card-row>
    <v-card-text class="blue-grey darken-3 white--text">
      <div v-text="items[card_index].text"></div>
    </v-card-text>
     
  </v-card>
  <v-card class="secondary ma-2">
  <v-bottom-nav absolute class="transparent">
      <v-btn flat dark class="teal--text" @click.native="previous" :value="e3 === 1">
        <span>Previous</span>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn flat dark class="teal--text" @click.native="next" :value="e3 === 2">
        <span>Next</span>
        <v-icon>arrow_forward</v-icon>
      </v-btn>
    </v-bottom-nav>
          </v-card>
    </div>

</template>

<script>
  import axios from 'axios';
  export default {
    props: {
      value: {
        type: [Array, String]
      },
      accept: {
        type: String,
        default: "*"
      },
      label: {
        type: String,
        default: "Please choose..."
      },
      required: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean, // not yet possible because of data
        default: false
      }
    },
   async beforeCreate() {
     try{
      let response = await axios.get(`http://print-book-service.ap-southeast-2.elasticbeanstalk.com/v1/printbooks/1234`)
      this.listitems = response.data
     }
     catch(e){
       this.errors.push(e)
     }
    },
    data() {
      return {
        e3: 1,
        card_index: 0,
        card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.',
        isProgress: false,
        listitems: [],
        filename: "",
        fileObject: '',
        errors: [],
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
        { image: 'https://static.pexels.com/photos/110854/pexels-photo-110854.jpeg', text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.' },
        { image: 'https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg', text: 'These are the most beautiful pictures of nature on Pexels. This search result page is the central page for nature photography and free nature stock photos on Pexels. Feel free to use all of these nature images for commercial use. The photo license is a Creative Commons Zero (CC0) license.' },
        { image: 'https://static.pexels.com/photos/50704/car-race-ferrari-racing-car-pirelli-50704.jpeg', text: 'On this page you can browse car images and discover the beauty of car photography. These car pictures feature a wide range of cars including photos of luxury cars, oldtimers and cars in blue, yellow and other colors.' },
        { image: 'https://static.pexels.com/photos/31715/pexels-photo.jpg', text: 'The lion (Panthera leo) is one of the big cats in the genus Panthera and a member of the family Felidae. The commonly used term African lion collectively denotes the several subspecies in Africa.' }

      ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Print-Book'
      }
    },
    watch: {
      value(v) {
        this.filename = v;
      }
    },
    mounted() {
      this.filename = this.value;
    },
    methods: {
      onFocus() {
        if (!this.disabled) {
          debugger;
          this.$refs.fileInput.click();
        }
      },
      previous($event) {
        this.e3 = 1;
        if(this.card_index !=0){
this.card_index=this.card_index-1;
        }
      },
      next($event) {
        this.e3 = 2
        if(this.card_index < this.items.length-1){
this.card_index=this.card_index+1;
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  #example-5 {
    color: #fff;
    text-align: center;
  }
  #progress-ring
    text-align: center

  .progress-circular
    margin: 1rem
  #example-5 .card {
    margin-bottom: 16px;
  }
  .dialog {
    box-shadow: none
  }
</style>