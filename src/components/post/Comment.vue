<template>
    <div class="text item" style="padding: 10px 0 0 0">
        <div style="display: flex; flex-direction: column" 
        v-on:mouseenter="showReplyBotton" v-on:mouseleave="showReplyBotton">
            <div style="display: flex; flex-direction: row">
                <user-info :userInfo="comment.commenter"></user-info>
                <div v-if="comment.commentId !== null" class="text item"
                style="padding: 0 5px; font-size: 14px; color: #454649"> Reply </div>
                <user-info v-if="comment.commentId !== null" :userInfo="comment.commenter"></user-info>
                <div class="text item" style="padding: 0; font-size: 15px; color: #454649">
                    : {{ comment.content }}
                </div>
            </div>
            <div style="display: flex; flex-direction: row">
                <span style="padding: 0; font-size: small; color: #606266; ">
                    {{ formatTime(comment.commentTime) }}
                </span>
                <el-button type=text size="mini" style="padding: 0; align-content: end" 
                v-show="isReplyBotton === true" @click="showReply">
                    Reply
                </el-button>
            </div>
        </div>

        <!-- comment form -->
        <el-form v-show="isReply === true" :inline="true" :model="reply" style="margin: 0">
            <el-form-item>
                <el-input v-model="reply.content" size="mini"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button plain round size="mini" @click="saveReply">Reply</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { formatTime } from '../../utils/time'
    import UserInfo from "../user/UserInfo";

    export default {
        name: "Comment",

        components: {
            "user-info": UserInfo
        },

        props: {
            postId: null,
            comment: Object
        },

        data() {
            return {
                reply: {
                    postId: this.postId,
                    commentId: this.comment.id,
                    content: ''
                },
                isReplyBotton: false,
                isReply: false
            }
        },

        methods: {
            formatTime(time) {
                return formatTime(time)
            },
            showReplyBotton() {
                this.isReplyBotton = !this.isReplyBotton
            },
            showReply() {
                this.isReply = !this.isReply
            },
            saveReply() {
                console.log(this.reply)
                this.isReply = false
            }
        }
    }
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0
}
</style>