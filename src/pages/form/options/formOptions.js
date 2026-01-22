import { ElSwitch } from 'element-plus'
import { markRaw } from 'vue'

const model = reactive({
  // input: '',
  // select: '',
  // customLabel: '',
  // customForm: '',
  // radio: '',
  // checkbox: [],
  // treeselect: [],
  switch: false,
  // textarea: '',
})

const formOptions = [
  {
    formItem: {
      prop: 'input',
      label: '输入框',
    },
    type: 'input',
    // is: 'el-input',
  },
  {
    formItem: {
      prop: 'select',
      label: '下拉框',
    },
    type: 'select',
    input: {
      options: [
        {
          label: '区域一',
          value: '01',
        },
        {
          label: '区域二',
          value: '02',
        },
      ],
      clearable: true,
    },
  },
  {
    formItem: {
      prop: 'customLabel',
      label: '自定义标签',
    },
    type: 'input',
  },
  {
    formItem: {
      prop: 'customForm',
      label: '自定义表单',
    },
    type: 'input',
  },
  {
    formItem: {
      prop: 'radio',
      label: '单选框',
    },
    type: 'radio',
    input: {
      options: [
        {
          label: '区域一',
          value: '01',
        },
        {
          label: '区域二',
          value: '02',
        },
      ],
    },
  },
  {
    formItem: {
      prop: 'checkbox',
      label: '多选框',
    },
    type: 'checkbox',
    input: {
      options: [
        {
          label: '区域一',
          value: '01',
        },
        {
          label: '区域二',
          value: '02',
        },
      ],
    },
  },
  // {
  //   formItem: {
  //     prop: 'treeselect',
  //     label: 'treeselect',
  //   },
  //   type: 'treeselect',
  //   input: {
  //     multiple: true,
  //     options: [
  //       {
  //         id: 'a',
  //         label: 'a',
  //         children: [
  //           {
  //             id: 'aa',
  //             label: 'aa',
  //           },
  //           {
  //             id: 'ab',
  //             label: 'ab',
  //           },
  //         ],
  //       },
  //       {
  //         id: 'b',
  //         label: 'b',
  //       },
  //       {
  //         id: 'c',
  //         label: 'c',
  //       },
  //     ],
  //   },
  // },
  {
    formItem: {
      prop: 'switch',
      label: '开关',
    },
    // type: 'switch',
    is: markRaw(ElSwitch),
    children: [
      {
        show: computed(() => model.switch),
        col: {
          span: 24,
        },
        formItem: {
          prop: 'textarea',
          label: '文本域',
        },
        input: {
          type: 'textarea',
        },
        type: 'input',
      },
    ],
  },
  // {
  //   col: {
  //     span: 24,
  //   },
  //   formItem: {
  //     prop: 'textarea',
  //     label: '文本域',
  //   },
  //   input: {
  //     type: 'textarea',
  //   },
  //   type: 'input',
  // },
]

export { formOptions, model }
