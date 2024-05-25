<template>
  <h4>视频封面</h4>
  <el-upload v-model:file-list="imageUrl" class="avatar-uploader" list-type="picture-card" @change="onSubmit"
    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="false">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>
  <el-dialog width="400" v-model="dialogVisible">
    <img :src="dialogImageUrl" style="height: 100%; width: 100%" lt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineModel, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadFile, UploadProps, UploadUserFile } from 'element-plus'
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const imgFile = defineModel()
const imageUrl = ref<{ [key in string]: string }[]>([])
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  imgFile.value = null
}
watch(imgFile, (newValue) => {
  if (newValue === null) {
    imageUrl.value = []
  }
})
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const onSubmit = (e: UploadFile) => {
  if (e.raw?.type !== 'image/jpeg') {
    ElMessage.warning('只能上传图片')
    return false
  } else if (e.raw?.size / 1024 / 1024 > 20) {
    ElMessage.warning('图片不能大于20MB')
    return false
  }
  imgFile.value = e.raw
  imageUrl.value = [{
    url:
      URL.createObjectURL(e.raw)
  }]
}
</script>

<style scoped>
h4 {
  font-size: 16px;
  color: #606266;
  margin-left: 20px;
  margin-bottom: 10px;
}

.avatar-uploader {
  margin-left: 20px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>