<template>
    <div class="main">
        <div class="container">
            <span class="fonts h1">智能诊断平台</span>
            <div class="col form">
                <div class="option-item row">
                    <span class="fonts normal">诊断类型:</span>
                    <el-select size="large" v-model="type" placeholder="" style="width: 300px; margin-left: 1vw;">
                        <template #label="type">
                            <span style="font-weight: bold;font-size: 20px;">{{ type.value }}</span>
                        </template>
                        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" style="margin-left: 3vw;">实时诊断</el-button>
                </div>
                <div class="option-item row">
                    <span class="fonts normal">诊断疾病:</span>
                    <el-select size="large" v-model="disease" placeholder="" style="width: 300px; margin-left: 1vw;">
                        <template #label="disease">
                            <span style="font-weight: bold;font-size: 20px;">{{ disease.value }}</span>
                        </template>
                        <el-option v-for="item in diseases" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="option-item row top">
                    <span class="fonts normal">选择影像数据:</span>
                    <el-select size="large" v-model="source" placeholder="" style=" margin-left: 1vw;">
                        <template #label="sources">
                            <span style="font-weight: bold;font-size: 20px;">{{ sources.value }}</span>
                        </template>
                        <el-option v-for="item in sources" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-upload
                        class="upload-demo"
                        v-model:file-list="fileList"
                        drag
                        :action="uploadUrl"
                        multiple
                        :on-progress="handleChange"
                    >
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                        拖拽文件到此处 或 <em>点击上传</em>
                        </div>
                        <template #tip>
                        <div class="el-upload__tip">
                            jpg/png 文件小于 500kb
                        </div>
                        </template>
                    </el-upload>
                <el-row justify="space-between">
                    <el-col :span="6"><el-button size="large" type="success" style="width: 150px;" @click="submit">开始诊断</el-button></el-col>
                    <el-col :span="6"><el-button  size="large" type="primary" style="width: 150px;">保存结果</el-button></el-col>
                </el-row>
            </div>
            <div class="col form">
                <div class="option-item row top">
                    <span class="fonts normal">诊断结果：</span>
                    <el-card style="width: 480px;" shadow="hover">
                        <div style="white-space: pre-line;text-align: left;line-height: 25px;">
                            {{ result }}
                        </div>
                    </el-card>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// import platform from '@/api/platform'
const types = ref([
    { value: '单人诊断', label: '单人诊断' },
    { value: '批量诊断', label: '批量诊断' }
])
const level = ["Ⅰ","Ⅱ","Ⅲ"]
const diseases = ref([
    { value: '肿瘤分期', label: '肿瘤分期' },
    { value: '阿尔兹海默症', label: '阿尔兹海默症' }
])
const sources = ref([
    { value: '一维脑电信号', label: '一维脑电信号' },
    { value: '医学图像', label: '医学图像' },
    { value: '脑电信号+医学图像特征融合结果', label: '脑电信号+医学图像特征融合结果' }
])
const uploadUrl = ref("https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15")  //上传地址，这里后端要搞一个图床
const type = ref(types.value[0].value)
const disease = ref(diseases.value[0].value)
const source = ref(sources.value[0].value)
const result = ref("欢迎使用智能诊断平台")
const fileList = ref([
])

const handleChange = (e, uploadFile) => {
    console.log(uploadFile, e)
  fileList.value.push({
    name: uploadFile.name,
    url:"1111"
  })
}
const submit = () => {
    if(fileList.value.length == 0){
        alert("请上传影像数据")
        return
    }
    result.value = "脑电信号输出概率为"+Math.floor(Math.random() * 10+90 )+"%,\n"+
        "医学图像输出概率为"+Math.floor(Math.random() * 10+90 )+"%,\n"+
        "特征融合最终输出概率为"+Math.floor(Math.random() * 10+90 )+"%,\n"+
        "系统诊断病人为"+level[Math.floor(Math.random() *3 )]+"期\n"
    // ! 有算法后解开下面的注释
    // platform.submit(type.value, disease.value,fileList.value, source.value ).then(res => {
    //     console.log(res)
    //     if(res.code == 200){
    //         result.value += res.data
    //     }else{
    //         alert("诊断失败")
    //     }
    // }).catch(err => {
    //     console.log(err)
    //     alert("诊断失败")
    // })
    
}
</script>

<style scoped>
.main {
    width: 100%;
    height: 98vh;
    background-image: url('/src/assets/科幻科技.png');
    background-repeat: no-repeat;
    overflow: auto;
    background-size: cover;
    border-radius: 10px;
}
.container {
    margin: 20px;
    margin-top: 10vh;
    text-align: center;
}
.h1 {
    font-size: 50px;
    
}
.fonts {
    white-space: nowrap;
    font-weight: 900;
    letter-spacing: 10px;
    color: black;
}
.normal {
    font-size:1.5vw;
}
.row {
    display: flex;
    align-items: center;

}
.top {
    align-items: flex-start;
}
.form {
    padding: 20px;
    width: max-content;
    background-color: rgba(255, 255, 255, 0.95);
    margin: 0 auto;
    margin-top: 30px;
    justify-content: center;
    border-radius: 20px;
}
.form > * {
    margin-left: 2vw;
    margin-right: 2vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
}
.upload-demo {
    margin-left: 20px;
    width: 100%;
}

</style>