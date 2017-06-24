<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" :disable-route-watcher=true>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-tile value="true">
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!--<v-btn icon @click.native.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>-->
      <!--<v-btn icon @click.native.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.native.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>-->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-list two-line>
          <v-list-item v-for="(item, index) in listitems" v-bind:key="item.fileName">
            <div id="example-5">
              <v-layout row-sm column child-flex-sm>
                <v-card class="secondary ma-1">
                  <v-card-row class="teal darken-1">
                    <v-card-title>
                      <span class="white--text">{{item.name}}</span>
                      <v-spacer></v-spacer>
                      <div>
                        <v-menu id="marriot" bottom left origin="top right">
                          <v-btn icon="icon" slot="activator" class="white--text">
                            <v-icon>more_vert</v-icon>
                          </v-btn>
                          <v-list>
                            <v-list-item>
                              <v-list-tile>
                                <v-list-tile-title>View</v-list-tile-title>
                              </v-list-tile>
                            </v-list-item>
                            <v-list-item>
                              <v-list-tile>
                                <v-list-tile-title>Delete</v-list-tile-title>
                              </v-list-tile>
                            </v-list-item>
                            <v-list-item>
                              <v-list-tile>
                                <v-list-tile-title>Order</v-list-tile-title>
                              </v-list-tile>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </v-card-title>
                  </v-card-row>
                  <v-card-text>
                    <v-card-row height="75px">
                      <v-icon x-large class="red--text text--lighten-2">attachment</v-icon>
                      <div>
                        <div left>File Name</div><strong>{{item.fileName}}</strong>
                      </div>
                    </v-card-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-row actions>
                    <!--<v-btn flat class="green--text darken-1">View Email</v-btn>-->
                  </v-card-row>
                </v-card>
              </v-layout>
            </div>
          </v-list-item>
        </v-list>
        <v-card class="grey lighten-4 elevation-0">
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 sm5>
                  <div>
                    <v-text-field prepend-icon="attach_file" single-line v-model="filename" :label="label" :required="required" @click.native="onFocus"
                      :disabled="disabled" ref="fileTextField"></v-text-field>
                    <input type="file" :accept="accept" :multiple="false" :disabled="disabled" ref="fileInput" @change="onFileChange">
                    <ul v-if="errors && errors.length">
                      <li v-for="error of errors">
                        {{error.message}}
                      </li>
                    </ul>
                  </div>
                </v-flex>
              </v-layout>

            </v-container>
          </v-card-text>
        </v-card>
        <v-dialog v-model="isProgress">
         <div id="progress-ring">
           <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="red--text"></v-progress-circular>
         </div>
         </v-dialog>
      </v-container>
    </main>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
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
        isProgress: false,
        listitems: [],
        filename: "",
        fileObject: '',
        errors: [],
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
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
      async onFileChange($event) {
        this.isProgress = true
        const files = $event.target.files || $event.dataTransfer.files;
        let data = new FormData();
        data.append('file', files[0]);
        try {
          let response = await axios.post(`http://print-book-service.ap-southeast-2.elasticbeanstalk.com/v1/printbooks/1234`,
            data, {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }
          )
          this.listitems.push(response.data)
          this.isProgress =false;
        } catch (e) {
          this.isProgress =false;
          this.errors.push(e)
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