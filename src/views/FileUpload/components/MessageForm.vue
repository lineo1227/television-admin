<template>
    <el-form :model="form" label-width="auto" class="message__form">
        <el-form-item label="视频标题">
            <el-input placeholder="请输入..." v-model="form.name" />
        </el-form-item>
        <el-form-item label="视频分类">
            <el-select v-model="form.kind" placeholder="请选择...">
                <el-option v-for="item in videoChoose.kind " :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="视频资费">
            <el-select v-model="form.tariff" placeholder="请选择...">
                <el-option v-for="item in videoChoose.tariff " :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="视频年代">
            <el-select v-model="form.year" placeholder="请选择...">
                <el-option v-for="item in videoChoose.year " :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="视频语言">
            <el-select v-model="form.language" placeholder="请选择...">
                <el-option v-for="item in videoChoose.language " :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="制作地区">
            <el-select v-model="form.region" placeholder="请选择...">
                <el-option v-for="item in videoChoose.region " :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="热门">
            <el-switch v-model="form.isHot" />
        </el-form-item>
        <el-form-item label="视频类型">
            <el-checkbox-group v-model="form.type">
                <el-checkbox v-for="item in videoChoose.type" :value="item" :name="item">
                    {{ item }}
                </el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="简介">
            <el-input placeholder="请输入..." v-model="form.desc" type="textarea" />
        </el-form-item>
        <!-- <el-form-item label="视频封面">
            <ImgInput />
        </el-form-item> -->
    </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { TelevisionFormType as FormType, TelevisionChooseType as VideoChooseType } from '@/types';
const form = reactive<FormType>({
    name: '',
    region: '',
    isHot: false,
    type: [],
    desc: '',
    kind: "",
    tariff: "",
    year: "",
    language: ""
})
function resetForm() {
    form.name = ''
    form.region = ''
    form.isHot = false
    form.type = []
    form.desc = ''
    form.kind = ""
    form.tariff = ""
    form.year = ""
    form.language = ""
}

defineExpose({
    form,
    resetForm
})
const videoChoose = reactive<VideoChooseType<string[]>>({
    kind: ['电影', '动漫', '儿童'],
    type: ['动作', '戏剧', '爱情', '科幻'],
    year: ['2023', '2022', '2021', '更早'],
    language: ['国语', '日语', '英语', '其他'],
    region: ['全部', '内地', '欧美', '港台', '日本', '韩国', '其他'],
    tariff: ['全部', '免费', '会员'],
})
</script>
<style lang="scss">
.message__form {
    max-width: 40%;
    width: 600px;

    .el-checkbox__inner {
        width: 14px;
        height: 14px;
    }
}
</style>