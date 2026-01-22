<!-- eslint-disable vue/prop-name-casing -->
<script>
import { flatten } from '@/utils'
import { constant } from 'lodash-es'
import NTableColumn from './NTableColumn.vue'
import NTableToolbar from './NTableToolbar.vue'

export default {
  name: 'NTable',
  components: { NTableToolbar, NTableColumn },
  inheritAttrs: false,
  props: {
    'showToolbar': {
      type: Boolean,
      default: true,
    },
    'showExportExcel': Boolean,
    'showFullScreen': Boolean,
    'loading': Boolean,
    'columns': {
      type: Array,
      default: constant([]),
    },
    'showPagination': {
      type: Boolean,
      default: true,
    },
    'currentPage': {
      type: Number,
      default: 1,
    },
    'pageSize': {
      type: Number,
      default: 10,
    },
    'resetCurrentWhenSizeChange': {
      type: Boolean,
      default: true,
    },
    'pageSizes': {
      type: Array,
      default: constant([10, 20, 30, 40, 50]),
    },
    'total': {
      type: Number,
      default: 0,
    },
    'layout': {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    'onUpdate:currentPage': Function,
    'onUpdate:pageSize': Function,
    'onCurrentPageChange': Function,
    'onSizeChange': Function,
  },
  data() {
    return {
      radio: '',
    }
  },
  computed: {
    computedCurrentPage: {
      get() {
        return this.currentPage
      },
      set(newval) {
        this['onUpdate:currentPage']?.(newval)
      },
    },
    computedPageSize: {
      get() {
        return this.pageSize
      },
      set(newval) {
        this['onUpdate:pageSize']?.(newval)
      },
    },
    flatColumns() {
      return flatten(this.columns)
    },
    specificColumns() {
      return this.flatColumns.filter(item => item.type)
    },
    generalColumns() {
      return this.flatColumns.filter(item => !item.type)
    },
  },
  methods: {
    getRealRowKey(row) {
      const rowKey = this.$attrs['row-key']
      return typeof rowKey === 'function' ? rowKey(row) : row[rowKey]
    },
    handleCurrentChange(newCurrent, oldCurrent) {
      this.radio = this.getRealRowKey(newCurrent)
      this.$attrs.onCurrentChange?.(newCurrent, oldCurrent)
    },
    handleCurrentPageChange(...arg) {
      this.onCurrentPageChange?.(...arg)
    },
    handleSizeChange(...arg) {
      if (this.resetCurrentWhenSizeChange)
        this.computedCurrentPage = 1
      this.onSizeChange?.(...arg)
    },
  },
}
</script>

<!-- eslint-disable vue/no-unused-refs -->
<template>
  <div>
    <!-- toolbar -->
    <NTableToolbar
      v-if="showToolbar"
      :general-columns="generalColumns"
      :show-export-excel="showExportExcel"
      :show-full-screen="showFullScreen"
    >
      <template #buttons>
        <slot name="buttons" />
      </template>
      <template #tools>
        <slot name="tools" />
      </template>
    </NTableToolbar>
    <!-- elTable -->
    <el-table
      ref="elTable"
      v-loading="loading"
      :highlight-current-row="columns.some(item => item.type === 'radio')"
      v-bind="$attrs"
      :style="{
        marginTop: showToolbar ? '16px' : null,
        marginBottom: showPagination ? '16px' : null,
      }"
      @current-change="handleCurrentChange"
    >
      <slot />

      <template v-for="column in columns">
        <template v-if="column.type">
          <el-table-column
            v-if="column.type === 'radio'"
            :key="column.type"
            align="center"
            :width="48"
            v-bind="column"
          >
            <template #default="{ row }">
              <el-radio
                v-model="radio"
                :value="getRealRowKey(row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="`type-other-${column.type}`"
            align="center"
            v-bind="column"
          />
        </template>
        <NTableColumn v-else :key="column.prop" v-bind="column">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </NTableColumn>
      </template>

      <slot name="tail" />

      <template #append>
        <slot name="append" />
      </template>

      <template #empty>
        <slot name="empty" />
      </template>
    </el-table>
    <!-- elPagination -->
    <el-pagination
      v-if="showPagination"
      ref="elPagination"
      v-model:current-page="computedCurrentPage"
      v-model:page-size="computedPageSize"
      text="right"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      @current-change="handleCurrentPageChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style>
.el-table .el-table__body-wrapper .el-table__body .el-table__row .cell .el-radio .el-radio__label {
  display: none;
}
</style>
