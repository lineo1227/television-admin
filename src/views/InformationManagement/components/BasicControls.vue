<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px" class="basic__form">
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.sex" placeholder="选择性别">
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
        <el-option label="保密" value="保密" />
      </el-select>
    </el-form-item>

    <el-form-item label="简介">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="标签">
      <el-tag
        v-for="tag in form.tags"
        :key="tag"
        closable
        :style="{ height: (24 / 19.2) * pxToRem + 'px' }"
        style="margin-left: 6px"
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        size="small"
        :style="{ height: (24 / 19.2) * pxToRem + 'px' }"
        style="width: 80px; margin-left: 6px"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button
        v-else
        class="button-new-tag"
        :style="{ height: (24 / 19.2) * pxToRem + 'px' }"
        style="margin-left: 6px"
        size="small"
        @click="showInput"
      >
        添加
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :style="{ height: (30 / 19.2) * pxToRem + 'px' }" @click="onSubmit"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, nextTick, ref, withDefaults, watch } from 'vue'
import { ElInput } from 'element-plus'
import { pxToRem } from '@/utils/rem'
import type { Admin } from '@/types'
const { admin } = withDefaults(
  defineProps<{
    admin: Admin
  }>(),
  {
    admin: () => ({
      name: '',
      sex: '',
      desc: '',
      tags: []
    })
  }
)
const emits = defineEmits(['changeAdmin'])
// do not use same name with ref
const form = reactive({
  name: '',
  sex: '',
  desc: '',
  tags: ['Tag 1', 'Tag 2', 'Tag 3']
})
watch(
  admin,
  (n) => {
    form.name = n.name
    form.tags = n.tags
    form.desc = n.desc
    form.sex = n.sex
  },
  { deep: true, immediate: true }
)
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
const onSubmit = () => {
  console.log('submit!')
  emits('changeAdmin', form)
}
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
const handleClose = (tag: string) => {
  form.tags.splice(form.tags.indexOf(tag), 1)
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    form.tags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
<style>
.basic__form {
  margin-top: 8px;
}
</style>
