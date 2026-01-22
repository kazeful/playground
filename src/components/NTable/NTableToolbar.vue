<!-- eslint-disable vue/prop-name-casing -->
<script>
import { Download, FullScreen, Menu, Refresh } from '@element-plus/icons-vue'

export default {
  props: {
    'generalColumns': Array,
    'showExportExcel': Boolean,
    'showFullScreen': Boolean,
  },
  data() {
    return {
      Refresh: markRaw(Refresh),
      Menu: markRaw(Menu),
      Download: markRaw(Download),
      FullScreen: markRaw(FullScreen),
    }
  },
  computed: {
    generalColumnsLabel() {
      return this.generalColumns.map(item => item.label)
    },
    checkAll() {
      const visibleCount = this.generalColumns.filter(col => col.visible !== false).length
      const totalCount = this.generalColumns.length
      return visibleCount === totalCount && totalCount > 0
    },
    isIndeterminate() {
      const visibleCount = this.generalColumns.filter(col => col.visible !== false).length
      const totalCount = this.generalColumns.length
      return visibleCount > 0 && visibleCount < totalCount
    },
    visibleLabels() {
      return this.generalColumns
        .filter(col => col.visible !== false)
        .map(col => col.label)
    },
  },
  methods: {
    handleRefreshClick() {
      this.$parent.onCurrentPageChange?.()
    },
    handleCheckAll(val) {
      this.generalColumns.forEach((column) => {
        column.visible = val
      })
    },
    handleChange(value) {
      this.generalColumns.forEach((column) => {
        column.visible = value.includes(column.label)
      })
    },
  },
}
</script>

<template>
  <div flex="~" justify="between" align="items-center">
    <div>
      <slot name="buttons" />
    </div>
    <div flex="~" align="items-center" space="x-2">
      <slot name="tools" />
      <el-tooltip placement="top" content="刷新">
        <el-button :icon="Refresh" circle @click="handleRefreshClick" />
      </el-tooltip>
      <el-tooltip placement="top" content="自定义列">
        <el-dropdown trigger="click">
          <el-button :icon="Menu" circle />
          <template #dropdown>
            <div class="max-h-40 overflow-y-auto" p="!x-2">
              <el-checkbox :model-value="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAll">
                全选
              </el-checkbox>
              <el-checkbox-group :model-value="visibleLabels" flex="~ col" @change="handleChange">
                <el-checkbox v-for="label in generalColumnsLabel" :key="label" :label="label" :value="label" />
              </el-checkbox-group>
            </div>
          </template>
        </el-dropdown>
      </el-tooltip>
      <el-tooltip v-if="showExportExcel" placement="top" content="导出Excel">
        <el-button :icon="Download" circle />
      </el-tooltip>
      <el-tooltip v-if="showFullScreen" placement="top" content="全屏展示">
        <el-button :icon="FullScreen" circle />
      </el-tooltip>
    </div>
  </div>
</template>
