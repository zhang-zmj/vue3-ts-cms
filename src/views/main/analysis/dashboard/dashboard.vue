<template>
  <div class="dashboard">
    <!-- 1.顶部数据统计 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <statistical-panel :panelData="item" />
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="7">
        <mj-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount" />
        </mj-card>
      </el-col>
      <el-col :span="10">
        <mj-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale" />
        </mj-card>
      </el-col>

      <el-col :span="7">
        <mj-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount" />
        </mj-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <mj-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale" />
        </mj-card>
      </el-col>

      <el-col :span="12">
        <mj-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor" />
        </mj-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue"
import { useStore } from "@/store"
import MjCard from "@/base-ui/card"
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from "@/components/page-eacharts"
import StatisticalPanel from "@/components/statistical-panel"

export default defineComponent({
  name: "dashboard",
  components: {
    MjCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart,
    StatisticalPanel
  },
  setup() {
    const store = useStore()
    store.dispatch("dashboard/getDashboardDataAction")

    // 2.获取顶部PanelData
    const topPanelData = computed(() => store.state.dashboard.topPanelDatas)
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      topPanelData,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  .content-row {
    margin-top: 20px;
  }
}
</style>
