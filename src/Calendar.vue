<template>
  <div class="calendar">
    <div class="header">
      <table>
        <tr>
          <td v-for="w in weeks">
            {{w}}
          </td>
        </tr>
      </table>
    </div>
    <v-touch v-on:pan="onPan" v-on:panend="onPanEnd">
      <div :style="{transform:transform}" class="container">
        <table>
          <tr>
            <td @click="select(day)" :class="{today:day.isToday,current:day.isCurrent}" class="day" v-for="day in days">
              <span>{{day.date}}</span>
            </td>
          </tr>
        </table>
      </div>
    </v-touch>
  </div>
</template>
<script>
  import util from './util'
  var moment = require('moment')
  var _ = require('lodash')
  export default {
    data() {
      return {
        year: 0,
        month: 0,
        date: 0,
        days: [],
        deltaX: 0
      }
    },
    mounted: function () {
      this.render(this.convertMomentDate(moment()))
    },
    computed: {
      weeks(){
        return ['日', '一', '二', '三', '四', '五', '六']
      },
      transform(){
        return 'translateX(' + this.deltaX + 'px)'
      }
    },
    methods: {
      render({year, month, date}) {
        let data = util.getDaysOfWeek({year, month, date})
        console.log(data.days)
        _.assign(this, {
          year: data.year,
          month: data.month,
          date: data.date,
          days: data.days
        })
      },
      convertMomentDate(momentDate){
        return {
          year: momentDate.year(),
          month: momentDate.month(),
          date: momentDate.date()
        }
      },
      getCurrent(){
        return moment({y: this.year, M: this.month, d: this.date})
      },
      getTodayAtNextWeek(){
        return this.convertMomentDate(this.getCurrent().add(7, 'day'))
      },
      getTodayAtLastWeek(){
        return this.convertMomentDate(this.getCurrent().subtract(7, 'day'))
      },
      select({year, month, date}) {
        this.render({year, month, date})
      },
      onPan(e){
        this.deltaX = e.deltaX
      },
      onPanEnd(e){
        console.log(e)
        if (e.deltaX > window.innerWidth / 2) { // pan right
          this.render(this.getTodayAtLastWeek())
        } else if (e.deltaX < -window.innerWidth / 2) {
          this.render(this.getTodayAtNextWeek())
        }
        this.deltaX = 0
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  @main-color: #f25b48;
  @main-color-weak: #999;
  @main-text-color: #444;
  @span-size: 26px;
  .calendar {
    .header {
      table {
        width: 100%;
        td {
          text-align: center;
          font-size: 0.5rem;
        }
      }
    }
    .container {
      table {
        width: 100%;
        td {
          position: relative;
          text-align: center;
          padding: 5px 0;
          vertical-align: middle;
          color: @main-text-color;
          span {
            display: block;
            margin: 0 auto;
            width: @span-size;
            height: @span-size;
            line-height: @span-size;
            border-radius: 50%;
          }
          &.today {
            color: @main-color;
          }
          &.current {
            color: #fff !important;
            span {
              background-color: @main-color;
            }
          }
        }
      }
    }

  }
</style>
