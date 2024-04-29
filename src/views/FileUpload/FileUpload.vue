<template>
  <div class="file">
    <h2 class="file__title">文件上传</h2>
    <div class="file__container">
      <div
        class="content"
        @drop="handleDrop"
        @click="handleClick"
        @dragover.prevent
        @dragenter.prevent="isDragover = true"
        @dragleave.prevent="isDragover = false"
        :class="{ 'is-dragover': isDragover }"
      >
        <el-icon :size="30"><Files /></el-icon>
      </div>
      <el-button
        @click="handleUpload"
        type="primary"
        :loading="uploadCount > 0"
        >{{ uploadCount > 0 ? "上传中" : "开始上传" }}</el-button
      >
      <el-scrollbar
        v-if="Object.keys(progressInfo).length > 0"
        class="file__progress"
      >
        <div
          class="progress"
          v-for="(percent, name) in progressInfo"
          :key="name"
        >
          <span>{{ name }}</span>
          <el-progress :percentage="percent"></el-progress>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Files } from "@element-plus/icons-vue";
import { ref } from "vue";
import type { AxiosProgressEvent } from "axios";
const isDragover = ref(false);
const selectedFile = ref<{ url: string; file: File | null }[]>([]);
function rules(files: FileList) {
  for (let index = 0; index < files.length; index++) {
    const isMedia =
      files![index].type.indexOf("image") > -1 ||
      files![index].type.indexOf("video") > -1;
    if (!isMedia) {
      return ElMessage.warning("只能上传图片或视频");
    }
  }
  selectedFile.value = [];
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    selectedFile.value.push({
      url: URL.createObjectURL(element),
      file: element,
    });
  }
}
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  const { files } = e.dataTransfer as DataTransfer;
  rules(files as FileList);
};
async function handleUpload() {
  if (!selectedFile.value.length) {
    return ElMessage.warning("请先选择文件");
  }
  ElMessage.success("上传成功");
  const files = selectedFile.value.map((item) => item.file);
  for (let i = 0; i < files.length; i++) {
    // await reqeust(files[i] as File)
  }
}
const uploadCount = ref<number>(0);
async function reqeust(file: File) {}
const progressInfo = ref<{ [key in string]: number }>({});
const func = (progressEvent: AxiosProgressEvent, file: string) => {
  progressInfo.value[file] = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total!
  );
};
const handleClick = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.addEventListener("change", (e: Event) => {
    const { files } = e.target as HTMLInputElement;
    rules(files as FileList);
  });
  input.click();
};
</script>
<style lang="scss" scoped>
.file {
  @include routerView();
  &__container {
    @include flex(column);
    .content {
      height: 200px !important;
      line-height: 200px;
      text-align: center;
      border: 1px dashed #ccc;
      margin-bottom: 20px;
      transition: 0.3s;
      cursor: pointer;
      border-radius: 4px;
      &:hover,
      .is-dragover {
        border: 1px dashed #03bf8a;
        color: #03bf8a;
      }
    }
    .progress {
      margin-top: 2px;
      font-weight: 100;
      font-size: 14px;
    }
  }
  &__progress {
    flex: 1;
    margin-top: 20px;
  }
}
</style>
