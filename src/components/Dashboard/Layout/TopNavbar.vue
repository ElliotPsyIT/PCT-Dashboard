<template>
  <!-- <transition name="fade" mode="out-in"> -->
  <nav class="navbar navbar-expand-lg" style="position: fixed; z-index: 1000; min-width: 100vw; ">
    <div class="container-fluid">

      <!-- placeholder for provider filter -->
      <fade-transition :duration="duration">
        <span v-if="showProvider()" class="px-2" >
          <a class="navbar-brand px-2" href="#" style="color: black; background-color: lightgrey;">{{selectedProvider}}</a>
        </span>
      </fade-transition>

      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      
      <div class="collapse navbar-collapse ">
        <ul class="nav navbar-nav mx-auto py-0">
          <!-- <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="dropdown">
              <i class="nc-icon nc-palette"></i>
            </a>
          </li> -->
          <!-- <drop-down tag="li">
            <template slot="title">
              <i class="nc-icon nc-planet"></i>
              <b class="caret"></b>
              <span class="notification">5</span>
            </template>
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down> -->
          <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-zoom-split"></i>
              <span class="d-lg-block">&nbsp;Search</span>
            </a>
          </li> -->
          
          <li class="nav-item py-0 mr-2">
          <form class="form-inline">
            <div class="form-group">  <!--  pt-1 py-0 -->
              <label for="station">
                <div class="px-2">
                  <span class="h5 "><strong>Station</strong></span>  <!-- pr-3 mb-4 -->
                </div>
                <div>
                <select v-model="siteSelected" class="form-control" id="station">
                  <option value="" disabled>Select Medical Center...</option>
                  <option v-for="site in siteNames" :value="site.StaPa" :key="site.StaPa">
                    {{ site.InstitutionNameLong}}
                  </option>
                </select>
                </div>
              </label>
            </div>
          </form>
          </li>
          <li class="nav-item py-0">
          <form class="form-inline">
            <div class="form-group "> <!-- pt-1 pl-3 ml-4 -->
              <label for="dataRange">
                <div class="px-2">
                  <span class="h5 "><strong>Date Range</strong></span> <!-- pr-3 mb-4 -->
                </div>
                <div>
                  <select v-model="rangeSelected" class="form-control" id="dateRange">
                    <option value="" disabled>Select Date Range ...</option>
                    <option v-for="range in dateRanges" :value="range.name" :key="range.name">
                        {{ range.dateRange }}
                      </option>
                  </select>
                </div>
              </label>
            </div>
          </form>
          </li>
          </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <!-- {{ selectedSite }}   {{ selectedRange }} -->
            </a>
          </li>
          <li class="nav-item">
          </li>
          <!-- <drop-down title="Dropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </drop-down> -->
          <li class="nav-item">
            <!-- <a href="#" class="nav-link">
              Log out
            </a> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import NProgress from 'nprogress'

  import {FadeTransition} from 'vue2-transitions'

  export default {
    components: {
      FadeTransition,
    },
    
    // beforeMount  () {
    //   console.log('topnav beforeMount, selectedSite is: ', this.selectedSite)
    // },
    // watch: {
    //   selectedSite : function(site, oldSite){
    //     console.log('oldVal: ', oldSite)
    //     console.log('val: ', site)
    //     this.setSelectedSite(site)
    //   },
    //   selectedRange : function(range, oldRange){
    //     // console.log('oldVal: ', oldRange)
    //     // console.log('val: ', range)
    //     this.setSelectedRange(range)
    //   }
    // },
    // created () {
    //   console.log('topnav created siteSelected: ', this.selectedSite)
    //   if (this.selectedSite ) { 

    //   }
    //   if (this.selectedRange) {

    //   }
    // },
    watch:{
      siteSelected (val) {
        // my new value in val. Perform your
        // select update methods here
         NProgress.start()
        // console.log('watcher for siteSelected triggered with new value of: ', val)
         NProgress.done()
      },
      rangeSelected (val) {
        // my new value in val. Perform your
        // select update methods here
         NProgress.start()
        // console.log('watcher for siteSelected triggered with new value of: ', val)
         NProgress.done()
      },
      selectedProvider (newVal, oldVal) {
        // when triggered, if there was a previous provider
        // and allow the showProvider method to animate in the new provider
        // console.log('watch on selectedProvider is triggered with: ', this.selectedProvider)
        // console.log('this is the newVal ', newVal)
        // console.log('this is the oldVal ', oldVal)
        
      }
    },
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      },
      ...mapState(['siteNames','dateRanges','selectedSite','selectedRange','selectedProvider']),
      siteSelected: {
        get () {
          // return this.$store.selectedSite
          return this.selectedSite
        },
        set (site) {
          // this.$store.dispatch('setSelectedSite', site)
          this.setSelectedSite(site)
        }   
      },
      rangeSelected: {
        get () {
          // return this.$store.selectedRange
          return this.selectedRange
        },
        set (range) {
          // this.$store.dispatch('setSelectedRange', range)
          this.setSelectedRange(range)
        }   
      }
    },
    data () {
      return {
        activeNotifications: false,
        // selectedSite: '',
        // selectedRange: ''
        shouldStick: true,
        duration: 1000,
        showName: false,
        previousProvider: false,
        newProvider: false,
      }
    },
    methods: {
      showProvider(val) {
        // console.log('showProvider is triggered with this selectedProvider: ', this.selectedProvider)

        let previousProviderSelected = this.previousProvider 
        // console.log('previousProviderSelected: ', previousProviderSelected)
        let newProviderSelected = this.newProvider
        // console.log('newProviderSelected: ', previousProviderSelected)
        let pageLoad = !previousProviderSelected  && !newProviderSelected
        // console.log('pageload: ', pageLoad)        
        // no previous provider selected - either page load, or new provider selected
        return this.selectedProvider
      },
      ...mapActions(
        ['setSelectedSite','setSelectedRange']
      ),
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    }
  }

</script>
<style scoped>

 /* fade page in and out when site changes */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }
  
</style>
