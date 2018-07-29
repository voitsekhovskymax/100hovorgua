<style lang="less">@import "./../../../css/main.less";
#admin_news{
.posts{
    padding:15px;
    .post{
        height: 100px;
        position: relative;
        overflow: hidden;
        margin-bottom: 15px;
        padding-bottom: 15px;
        img{    width: 100px;
            height: 100px;
            object-fit: cover;
            float: left;border-radius: 50px;}
        .content{    font-size: 14px;
            top: 15px;
            height: 40px;
            overflow: hidden;
            line-height: 20px;
            position: absolute;
            left: 110px;}
        .edit{    position: absolute;
            left: 110px;
            bottom: 5px;
            padding: 5px 10px;
            background: #ff8c0e;
            color: white;
            border-radius: 5px;
            cursor: pointer;}
    }
}
}
</style>

<template>
    <div id="admin_news" class="page">
        <router-link :to="{name:'admin_add_news'}" style="margin:15px;" class="m_btn_blue_chevron">Додати</router-link>


        <div class="posts mt2">
            <div class="post" v-for="post in posts">
                <img :src="post.img"  :alt="post.title">
                <p class="content">{{post.title}}</p>
                <router-link class="edit" :to="{name:'admin_edit_news', params:{id:post.id}}"> Редагувати</router-link>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                posts:{}
            };
        },
        mounted() {

        },
        created() {
            this.getPosts('/api/posts');
        },
        methods: {
            getPosts(uri) {
                this.axios.get(uri).then((response) => {
                    this.posts = response.data;
                    console.log(this.posts);
                });
            },
        }

    }
</script>
