<template>
  <div class="file">
    <h2 class="file__title">文件上传</h2>
    <div class="file__container">
      <div style="display: flex;">
        <MessageForm ref="messageForm" />
        <div class="video__box">
          <h4>视频文件</h4>
          <div class="content" @drop="handleDrop" @click="handleClick" @dragover.prevent
            @dragenter.prevent="isDragover = true" @dragleave.prevent="isDragover = false"
            :class="{ 'is-dragover': isDragover }">
            <el-icon :size="30">
              <Files v-show="!videoFile" />
              <FolderChecked v-show="videoFile" />
            </el-icon>
          </div>
          <ImgInput v-model="imgFile" />
        </div>
      </div>

      <el-button @click="handleUpload" type="primary" :loading="uploadCount > 0">{{ uploadCount > 0 ? "上传中" : "开始上传"
        }}</el-button>
      <el-scrollbar v-if="Object.keys(progressInfo).length > 0" class="file__progress">
        <div class="progress" v-for="(percent, name) in progressInfo" :key="name">
          <span>{{ name }}</span>
          <el-progress :percentage="percent"></el-progress>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import ImgInput from "./components/ImgInput.vue"
import MessageForm from "./components/MessageForm.vue"
import { Files, FolderChecked } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getOssToken } from "@/api"
import OSS from "ali-oss"
import log from '@/utils/log';
import type { AxiosResponse } from "axios";
interface OssType {
  credentials: {
    AccessKeyId: string
    AccessKeySecret: string
    SecurityToken: string
  }
}
const bucket = "lineo-pet-oss";// bucket名称
const region = "oss-cn-beijing";
const partSize = 1024 * 1024; // 每个分片大小(byte)
const parallel = 3; // 同时上传的分片数
const ossClient = ref()
async function resetOssToken() {
  const { data: { credentials: { AccessKeyId, AccessKeySecret, SecurityToken } } } = await getOssToken() as AxiosResponse<OssType>
  return {
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    stsToken: SecurityToken,
  }
}
const messageForm = ref()
getOssToken().then((res: any) => {
  const { AccessKeyId, AccessKeySecret, SecurityToken } = res.data.credentials
  ossClient.value = new OSS({
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    stsToken: SecurityToken,
    bucket,
    region,
    refreshSTSToken: async () => await resetOssToken(),
    secure: true,
  })
  log.info('AccessKeyId', AccessKeyId)
  log.info('SecurityToken', SecurityToken)
  log.info('AccessKeySecret', AccessKeySecret)
})
const isDragover = ref(false);
const videoFile = ref<File | null>(null);
const imgFile = ref<File | null>(null);
function rules(files: FileList) {
  const isMedia =
    files![0].type.indexOf("video") > -1;
  if (!isMedia) {
    return ElMessage.warning("只能上传视频");
  }
  videoFile.value = files[0];
}
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  const { files } = e.dataTransfer as DataTransfer;
  rules(files as FileList);
};
async function handleUpload() {
  const form = messageForm.value.form
  for (const key in form) {
    if (form[key].length === 0) {
      return ElMessage.warning("文件名信息未填写");
    }
  }
  if (videoFile.value === null || imgFile.value === null) {
    return ElMessage.warning("请先选择文件");
  }
  // 视频 v_
  const vi = videoFile.value.name.lastIndexOf('.')
  const vt = form.name + videoFile.value.name.slice(vi)
  const vfi = new File([videoFile.value], vt, { type: videoFile.value.type })
  // 图片 i_
  const ii = imgFile.value.name.lastIndexOf('.')
  const it = form.name + imgFile.value.name.slice(ii)
  const ifi = new File([imgFile.value], it, { type: imgFile.value.type })
  const ir = await request(ifi)
  log.success('封面链接', `https://${ir.bucket}.oss-cn-beijing.aliyuncs.com/${ir.name}`)
  ElMessage.success("封面上传成功");
  const vr = await request(vfi)
  log.success('视频链接', `https://${vr.bucket}.oss-cn-beijing.aliyuncs.com/${vr.name}`)
  ElMessage.success("视频上传成功");
  console.table(form)
  videoFile.value = null;
  imgFile.value = null;
  messageForm.value.resetForm()
}
const uploadCount = ref<number>(0);
async function request(file: File) {
  // 简单上传
  // await ossClient.value.put(file.name, file).then((result: any) => {
  //   console.log(`Common upload ${file.name} succeeded, result === `, result)
  // }).catch((err: any) => {
  //   console.log(`Common upload ${file.name} failed === `, err);
  // });
  // 切片上传
  uploadCount.value = 1
  const res = await ossClient.value.multipartUpload(file.name, file, {
    parallel,
    partSize,
    progress(p: number) {
      progressInfo.value[file.name] = Math.round(
        (p * 100)
      );
    }
  })
  uploadCount.value = 0
  return res
}
const progressInfo = ref<{ [key in string]: number }>({});
const handleClick = () => {
  const input = document.createElement("input");
  input.type = "file";
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


    .video__box {
      @include flex($fd: column);
      flex: 1;
      margin-right: 20px;

      h4 {
        font-size: 16px;
        color: #606266;
        margin-left: 20px;
        margin-bottom: 10px;
      }
    }

    .content {
      width: 100%;
      margin-left: 20px;
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
