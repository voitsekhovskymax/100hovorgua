<style lang="less">
    @import "./../../css/main.less";
    @import "./../../css/news.less";
</style>


<template>
    <div id="single_news" class="">
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{name:'home_index'}">Головна</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link :to="{name:'news'}">Новини</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        {{post.title}}
                    </li>
                </ol>
            </nav>
            <div class="single_page">
                <Row type="flex" justify="space-between" :gutter="30">
                    <Col :xs="24" :sm="14" :md="18" :lg="18" class="single_post">
                    <div class="post_img">
                        <img :src="post.img" :alt="post.title">
                    </div>
                    <h1 class="title">
                        {{post.title}}
                    </h1>
                    <div class="details">
                        <img src="img/map-icons/social.png" class="news_direction">
                        <time :datetime="post.created_at">{{post.created_at}}</time>
                        <p class="author">{{post.author}}</p>
                    </div>
                    <div class="post_content" v-html="post.content">

                    </div>
                    <div class="to_news">
                        <router-link :to="{name:'news'}" class="m_btn_blue_chevron_outline">До інших новин</router-link>
                    </div>
                    </Col>
                    <Col :xs="24" :sm="10" :md="6" :lg="6" class="news_sidebar">
                    <div  v-for="(post, key, index) in posts"  v-if="key < 3" :key="post.id" class="post">

                        <div class="img">
                            <img :src="post.img" :alt="post.title">
                        </div>
                        <div class="details">
                            <img :src="post.direction_activity.img" :alt="post.direction_activity.name"
                                 class="news_direction">
                            <time :datetime="post.created_at">{{post.created_at}}</time>
                            <p class="author">{{post.author}}</p>
                        </div>
                        <h2 class="title">{{post.title}}</h2>
                        <router-link class="to_single_link" :to="{name:'single_news', params:{id:post.id}}">Докладніше
                        </router-link>
                    </div>

                    </Col>
                </Row>
            </div>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                post: {},
                posts: {},
                spinShow: true,
            };
        },
        mounted() {

        },
        watch: {
            '$route' (to, from) {
                this.getPosts();
            }
        },
        created() {
            this.getPosts();
        },
        methods: {
            getPosts() {
                this.axios.get('/api/posts/' + this.$route.params.id + '/edit').then((response) => {
                    this.post = response.data;
                });
                this.axios.get('/api/posts').then((response) => {
                    this.posts = response.data;
                });
                this.spinShow = false;
            }
        }
    }
</script>
