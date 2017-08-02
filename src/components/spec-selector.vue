<template>
  <div id="spec-selector">
    <div>
      <dl>
        <dt>尺码</dt>
        <dd>
          <el-radio-group v-model="radioSize">
            <el-radio-button v-for="(item, key, index) in dataShowObj[radioInstock]" :label="key" :key="index"></el-radio-button>
          </el-radio-group>
        </dd>
        <dt>颜色</dt>
        <dd>
          <el-radio-group v-model="radioColor" v-if="radioSize !== ''">
            <el-radio-button v-for="(item, key, index) in dataShowObj[radioInstock][radioSize]" :label="key" :key="index"></el-radio-button>
          </el-radio-group>
        </dd>
        <dt>pattern</dt>
        <dd>
          <el-radio-group v-model="radioPattern" v-if="radioColor !== ''">
            <el-radio-button v-for="(item, key, index) in dataShowObj[radioInstock][radioSize][radioColor]" :label="key" :key="index"></el-radio-button>
          </el-radio-group>
        </dd>
      </dl>
    </div>
    <div>选中数据：
      <div>方法1：源数据中寻找</div>
      <var>{{getSelectedSearch}}</var>
      <div>方法2：按照源数据格式拼接</div>
      <var>{{getSelectedNew}}</var>
    </div>
  </div>
</template>

<script>
  import dataArr from '../assets/skus.json'

  export default {
    name: 'specSelector',
    components: {
    },
    data: function () {
      return {
        radioInstock: true,
        radioSize: '',
        radioColor: '',
        radioPattern: '',
        dataOrigin: dataArr.skus,
        dataShowObj: {},
      }
    },
    computed: {
      getSelectedSearch: function () {
        let arr = this.dataOrigin
        let size = this.radioSize
        let color = this.radioColor
        let pattern = this.radioPattern
        let ret = []
        if(Array.isArray(arr)) {
          ret = arr.filter(function (elemt) {
            let attrs = elemt.attrs
            return attrs.size === size && attrs.color === color && attrs.pattern === pattern
          })
        }
        return ret
      },
      getSelectedNew: function () {
        function skusObj(Instock, Size, Color, Pattern) {
          this.attrs = {}
          this.attrs.size = Size
          this.attrs.color = Color
          this.attrs.pattern = Pattern
          this.instock = Instock
        }
        let ret = new skusObj(this.radioInstock, this.radioSize, this.radioColor, this.radioPattern)
        return ret
      }
    },
    methods: {
      arrUniq: function (arr) {
        let retarr = Array.from(new Set(arr.map( (value) => {
          return JSON.stringify(value)
        }))).map( (value) => {
          return JSON.parse(value)
        })
        return retarr
      },
      newChild: function (arr, child) {
        if (!arr.hasOwnProperty(child)) {
          arr[child] = {}
        }
        return arr[child]
      },
      getDataShowObj: function (objOrigin) {
        let dataObj = {}
        objOrigin.forEach(function (value) {
          this.newChild(dataObj,value.instock)
          this.newChild(dataObj[value.instock],value.attrs.size)
          this.newChild(dataObj[value.instock][value.attrs.size],value.attrs.color)
          this.newChild(dataObj[value.instock][value.attrs.size][value.attrs.color],value.attrs.pattern)
        }, this)
        return dataObj
      },
      sortObj: function (obj) {
        if (obj === undefined) {
          return obj
        }

        let temp = Object.keys(obj).sort(function(a,b){
          return a.charCodeAt()  - b.charCodeAt()
        })

        let retObj = {}
        for (let i = 0; i < temp.length; i++) {
          retObj[temp[i]] = obj[temp[i]]
        }
        return retObj
      },
      traversalObj: function (obj) {
        for (var a in obj) {
          if (typeof (obj[a]) == "object") {
            this.traversalObj(obj[a])
            obj[a] = this.sortObj(obj[a])
          }
        }
        return obj
      }
    },
    watch: {
      radioSize: function () {
        this.radioColor =''
      },
      radioColor: function () {
        this.radioPattern = ''
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.dataOrigin = this.arrUniq(dataArr.skus)
        this.dataShowObj = this.traversalObj(this.getDataShowObj(this.dataOrigin))
      })
    }
  }
</script>

<style scoped>

</style>
