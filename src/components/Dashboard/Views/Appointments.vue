<template>
    <transition name="fade" mode="out-in">

    <div class="content" :key="selectedRange" :class="{'provider-selected' : siteProviderSelected}">
      <!-- <button class="btn btn-danger float-right">Button</button> -->
      <div class="container-fluid">
        
              Scroll Position {{scrollPosition}}

        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">No Show & Cancel Summary Stats</h4>
        </div>
      
        <!-- appointmentNoShowCancelSummary FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="appointmentNoShowCancelSummary"/> 
          </div>
        </div>
      
        <div class="row d-flex justify-content-center">

          <div class="col-xl-3 col-md-3">
            <stats-card >
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-chart-pie-36 text-danger"></i>
              </div>
              <div slot="content">
                <p class="card-category">No Show/All<br/> ({{ siteEncounterApptNoShowTotal }}/{{ siteEncounterApptTotalStr}})</p>
                <h4 class="card-title">{{ notNumber(siteEncounterAppNoShowPercent) }}%</h4>
              </div>
            </stats-card>
          </div>

          <div class="col-xl-3 col-md-3">
            <stats-card >
              <div slot="header" class="icon-info">
                <i class="nc-icon nc-simple-remove text-danger"></i>
              </div>
              <div slot="content">
                <p class="card-category">Cancelled/All ({{ formatNumber(siteEncounterApptCancelTotal) }}/{{ siteEncounterApptTotalStr }})</p>
                <h4 class="card-title">{{ notNumber(siteEncounterAppCancelPercent) }}%</h4>
              </div>
            </stats-card>
          </div>

        </div>

        <div class="row d-flex justify-content-center">
              <!-- :class="(siteProviderSelected ? 'provider-selected' : '')" -->

          <div class="col-md-8" >
            <template>
              <vue-highcharts :options="pieChartOptions"  ref="pieChart">
              </vue-highcharts>
            </template>
          </div>

        </div>

        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Clinic Level Cancel & No Show Summary</h4> 
        </div>

        <!-- appointmentNoShowCancelSummary FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="appointmentNoShowCancelByClinicTable"/> 
          </div>
        </div>

<!-- Whitelist Warning -->
<!-- <h5 v-show="whitelisted" class="text-danger text-center">(Only 3 Months Data Showing)</h5> -->


        <!-- Alert if no -->
        <!-- <div v-show="whitelisted">
          <div class="row d-flex justify-content-center text-danger">
            <h4 class="section-head">Clinic Level Cancel & No Show Summary</h4>
          </div>
        </div> -->

        <div class="d-flex flex-row justify-content-center">

          <div class="col-md-12 ">
            <card >
              <template slot="header">
                <span>Hover Over Column Header to View Menu</span>
                <button class="float-right" @click="gridOptions3.api.exportDataAsCsv()">Export to CSV</button>
              </template>
              <!-- {{siteEncounterApptProviderClinicNoShowTotal}} -->
                <ag-grid-vue style="font-size: 12px; height: 400px;" 
                class="ag-theme-balham grid" 
                :gridOptions="gridOptions3" 
                :rowData="rowData3" 
                :gridReady="onGridReady3"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                >
                </ag-grid-vue>
              <template slot="footer">
                <div class="legend">
                  Detailed CPT Categories Listing
                </div>
              </template>
            </card>
          </div>

        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'
import LTable from 'src/components/UIComponents/Table.vue'
import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'

import VueHighcharts from 'vue2-highcharts'

import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";

import { addCommas, totalAndPercent } from 'src/utils'

import VueFaqAccordion from 'vue-faq-accordion'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'encounters',
  components: {
    Card,
    ChartCard,
    StatsCard,
    VueHighcharts,
    AgGridVue,
    VueFaqAccordion
  },
  computed: {
    ...mapState([
      'selectedSite', 'selectedRange', 'whitelisted'
    ]),
    ...mapGetters([
      'siteEncounterApptClinicNoShowTotal',
      'siteEncounterApptCancelNoShowPieChart',
      'siteEncounterApptNoShowTotal',
      'siteEncounterApptCancelTotal',
      'siteEncounterApptTotalStr', // for display
      'siteEncounterApptTotal', // for computation
      'siteProviderSelected',
    ]),
    scrollPosition () {
      console.log('window.pageYOffset: ', window.pageYOffset)    
    },

    siteEncounterAppNoShowPercent () {
      return Math.round((this.siteEncounterApptNoShowTotal/this.siteEncounterApptTotal) * 100)
    },

    siteEncounterAppCancelPercent () {
      return Math.round((this.siteEncounterApptCancelTotal/this.siteEncounterApptTotal) * 100)
      // return precise_round((this.siteEBPSessionsPECPT/this.siteALLSessions) * 100, 1) 
    },
    pieChartOptions () {
      return {
        chart:      { type: "pie", 
                      options3d: { enabled: true, alpha: 45 },
                      // borderColor: '#EBBA95',
                      // borderWidth: 2,
                      // type: "line"
                     },
        title:      { text: 'Cancel No Show Totals' },
        subtitle:   { text: 'Hover over sections for Patient data' },
        credits:    { enabled: false },
        plotOptions: { pie: { innerSize: 100, depth: 45 },
                        series: { allowPointSelect: true }},
        series: [
          {
            name: "patient totals",
            events: {
              click: function (event) {
                console.log('pie slice clicked, here is event: ', event)
                let points = this.chart.getSelectedPoints()
                console.log('getSelectedPoints: ', typeof points[0])
              }
            },
            data: this.siteEncounterApptCancelNoShowPieChart,
            dataLabels: {
              formatter: function () {
                // console.log('this.point is: ', this.point)
                return this.point.name + ':<br/>' + '(' + this.y + ')'
                // return `${this.point.name}:<br/>(${this.y})`
              }
            }
          } 
        ]
      } 
    },
    rowData3 () {
      return this.siteEncounterApptClinicNoShowTotal 
    },
  },
  beforeMount() { 
    this.gridOptions3 = {
      columnDefs:  this.createColDefs3(),
      rowData: this.rowData, // computed prop
      suppressPropertyNamesCheck: true,
      onRowDataChanged: this.onRowDataChanged,
      overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Appointment Details Comments Loading ...</span>',

    }    
  },
  mounted() {
    this.APPOINTMENT_CLINIC_CANCEL_NOSHOW_TOTALS()
    this.APPOINTMENT_CANCEL_NOSHOW_TOTALS()
    this.APPOINTMENT_COUNT()

    this.CURRENT_PAGE('appointment')
  },
  methods: {
    ...mapActions([
      'APPOINTMENT_CLINIC_CANCEL_NOSHOW_TOTALS',
      'APPOINTMENT_CANCEL_NOSHOW_TOTALS',
      'APPOINTMENT_COUNT',

      'CURRENT_PAGE'
    ]),
    asyncValue(val) {
      return val == 0 ? 'Loading...' : val
    },
    notNumber(val) {
      // this.$nextTick(
        return isNaN(val) ? 'Loading...' : val
      // )
    },
    formatNumber(num) {
      return addCommas(num)
    },
    createColDefs3() {
      return [
        {headerName: "Provider Clinic Cancel NoShow",
          children: [
            { headerName: "Site", 
              field: "StaPa", 
              width: 15, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            // { headerName: "Staff", 
            //   field: "StaffName", 
            //   width: 30, 
            //   cellStyle: { 'text-align': "left" } ,
            //   filter: "agTextColumnFilter"
            // },
            { headerName: "Clinic", 
              field: "LocationName", 
              width: 30, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Appt Type", 
              field: "CancelNoShow", 
              width: 30, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Cancel/NS & Visits", 
              field: "CancelNoShowCount", 
              width: 25, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
            { headerName: "Clinic Appts", 
              field: "ClinicAppointmentTotal", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
            { headerName: "Site Appts", 
              field: "StaPaTotal", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
          ]
        },
      ]
    },
    onGridReady3() {
      this.gridOptions3.api.sizeColumnsToFit();
    },
    onRowDataChanged(event) {
      // console.log('onRowDataChanged event triggered!!')
      this.gridOptions3.api.showLoadingOverlay()
      Vue.nextTick(() => {
        this.gridOptions3.api.hideOverlay()
        this.gridOptions3.api.sizeColumnsToFit();
      });
    },
  },
  data() {
    return {
      gridOptions3: null,
      appointmentNoShowCancelSummary: [
        {
          title: "No Show & Cancelled Summary Cards",
          value: "<u><b>Description</b></u>: Clinic appointments that have not been 'Completed' are tagged by the VistAsystem with a reason.  " + 
          "For the PCT, two particularly noteworthy reasons are 'No Show' and 'Canceled' appointments.  These reasons, among others, contribute to an understanding of clinic efficiency'<br/><br/>" +
          "The '<b>No Show</b>' and '<b>Cancel</b>' two cards below tally clinic appointments, showing the percentage of all appointments with these two statuses.<br/><br/>" + 
          "<b>NOTE:</b> No Show and Cancel appointments here are those identified for PCT Clinics only based on the PCT Stop Codes:<br/><br/>" +
          "<b>Stop Codes:</b><br/>" + 
          "<u>516 PTSD - Group</u>:<br/>" +
          "<u>542 Telephone PTSD</u>:<br/>"	+ 
          "<u>562 PTSD - Individual</u><br/>",
          category: "No Show and Cancel Status Stats and Statuses Defined...",
        },
        {
          title: "Cancel No Show Pie Chart",
          value: "<u><b>Description</b></u>: The Cancel No Show pie chart breaks down incomplete appointments by their statuses from the following possible statuses: <br/><br/>" +
          " <u>NO-SHOW</u>:<br/> " +
			    " <u>NO-SHOW & AUTO RE-BOOK</u>:<br/> " +
          " <u>CANCELLED BY CLINIC</u>:<br/> " +
			    " <u>CANCELLED BY CLINIC & AUTO RE-BOOK</u>:<br/> " + 
			    " <u>CANCELLED BY PATIENT</u>:<br/> " +
			    " <u>CANCELLED BY PATIENT & AUTO-REBOOK</u>:<br/> " + 
			    " <u>NO ACTION TAKEN</u>:<br/> ",
          category: "No Show and Cancel Status Stats and Statuses Defined...",
        }
      ],
      appointmentNoShowCancelByClinicTable: [
        {
          title: "Clinic Level Cancel & No Show",
          value: "<u><b>Description</b></u>: In PCTs, Veterans are seen in a variety of provider clinics.  The table below tallies the number of No Show and Cancelled appointments " +
          "by provider clinic.  In each table row, the total number of incomplete appointments are listed by appointment status in comparison with the total number of clinic appointments." +
          "Displaying the number of incomplete appointment along with the total number of appointments allows for estimating the rate of each incomplete appointment type (no show, cancel, etc).",
          category:"Clinic Level Cancel & No Show Table Defined..."
        }
      ]
    }
  }
}

</script>

<style>
  
  .provider-selected {
    /* border: 4px solid red; */
    background-color: lightgray;
  }

  .section-head {
    font-size: 2rem;
  }

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




