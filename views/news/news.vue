<style lang="less">
    @import "./../../css/main.less";
    @import "./../../css/news.less";
</style>

<template>
    <div id="news" class="">
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{name:'home_index'}">Головна</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        Новини
                    </li>
                </ol>
            </nav>
            <div class="single_page">
                <h1 class="page_title" >Новини</h1>
                <Row type="flex" justify="start"  :gutter="16">
                    <Col :xs="24" :sm="12" :md="8" :lg="6" v-for="post in posts" :key="post.id" class="post">
                    <div class="img">
                        <img :src="post.img" :alt="post.title">
                    </div>
                    <div class="details">
                        <img :src="post.direction_activity.img" :alt="post.direction_activity.name" class="news_direction">
                        <time :datetime="post.created_at">{{post.created_at}}</time>
                        <p class="author">{{post.author}}</p>
                    </div>
                    <h2 class="title">{{post.title}}</h2>
                    <router-link class="to_single_link" :to="{name:'single_news', params:{id:post.id}}">Докладніше</router-link>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: {}
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
