import api from './index.js'

const submit = (type,disease,fileList,source)=>{
    return api({
        url: '/platform/analysis',
        method: 'post',
        data:{
            type:type,
            disease:disease,
            fileList:fileList,
            source:source
        }
    })
}

export default {
    submit
}