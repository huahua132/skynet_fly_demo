<template>
    <el-descriptions title="服务实时信息" :column="3" border>
    <el-descriptions-item label="运行时长" >{{ run_time }}</el-descriptions-item>
    </el-descriptions>
</template>

<script>
import { serverinfo } from '@/api/monitor'

export default {
    props: {
    cluster: {
        type: String,
        default: ''
    },
    server: {
        type:String,
        default: ''
    }
  },

    data() {
        return {
            run_time : null,
        }
    },

    watch: {
        cluster: {
            handler(val) {
                
                this.getServerInfo()
            }
        },
        server: {
            handler(val) {
                this.getServerInfo()
            }
        }
    },

    methods: {
        async getServerInfo() {
            console.log("serverInfo 1",this.cluster,this.server)
            if (this.cluster == '' || this.server == '') {
                return
            }
            console.log("serverInfo 2",this.cluster,this.server)
            const res = await serverinfo(this.cluster,this.server)
            this.run_time = res.data.run_time
        }
    }
}
</script>