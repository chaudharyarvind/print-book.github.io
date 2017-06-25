<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" :disable-route-watcher=true>
      <v-list>
        <template v-for="(item, i) in items">
          <v-layout row v-if="item.heading" align-center :key="i">  
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-divider
            dark
            v-else-if="item.divider"
            class="my-4"
            :key="i"
          ></v-divider>
          <v-list-item
            :key="i"
            v-else
          >
            <v-list-tile v-bind:href="item.href">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title >
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </template>
        
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
    <div class="container container--fluid">
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
      </div>
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
        items: [
        { icon: 'home', text: 'Home' ,href: '/'},
        { icon: 'touch_app', text: 'Reminders' },
        { divider: true },
        { icon: 'add', text: 'Create new book' ,href: '/new-book'},
        { divider: true },
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' },
        { divider: true },
        { icon: 'settings', text: 'Settings' },
        { icon: 'help', text: 'Help' }
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