<script lang="jsx">
import { h } from 'vue'
import NFormValueItem from './NFormValueItem.vue'

export default {
  name: 'NFormItem',
  props: {
    formOption: Object,
    model: Object,
    defaultColSpan: Number,
  },
  setup(props, { slots }) {
    const { formOption, model, defaultColSpan } = props

    const { formItem = {}, col } = formOption

    const elFormItemSlots = {
      label: () => slots[`${formItem.prop}_label`] && slots[`${formItem.prop}_label`](formOption),
      default: () =>
        slots[formItem.prop]
          ? slots[formItem.prop](formOption)
          : h(NFormValueItem, { model, formOption }),
    }

    return () => (
      formOption.if !== false && [
        <el-col
          span={defaultColSpan}
          {...col}
          style={{ display: formOption.show !== false ? null : 'none' }}
        >
          <el-form-item key={formItem.prop} {...formItem} v-slots={elFormItemSlots} />
        </el-col>,
        formOption.children?.length
        && formOption.children.map(child => (
          <NFormItem
            formOption={child}
            model={model}
            defaultColSpan={defaultColSpan}
            v-slots={slots}
          />
        )),
      ]
    )
  },
}
</script>
