<script lang="jsx">
function NTableColumn(props, { slots }) {
  // 如果visible为false，则不渲染
  if (props.visible === false)
    return null

  function RenderNTableColumn({ children, ...column }, slots) {
    return (
      <el-table-column
        align="center"
        {...column}
      >
        {{
          default: (scope) => {
            if (children)
              return children.map(child => RenderNTableColumn(child, slots))
            if (column.renderCell)
              return column.renderCell(scope)
            if (slots[column.prop])
              return slots[column.prop](scope)
            return scope.row[column.prop]
          },
          header: (scope) => {
            if (column.renderHeader)
              return column.renderHeader(scope)
            if (slots[`${column.prop}Header`])
              return slots[`${column.prop}Header`](scope)
            return column.label
          },
        }}
      </el-table-column>
    )
  }

  return RenderNTableColumn(props, slots)
}

export default NTableColumn
</script>
