<style lang="less">@import "./../../../css/main.less";
#admin_pages {
    .content{

        margin-bottom: 15px;
        font-weight: 600;
    }
    .post{
        padding: 15px;
        margin-bottom:25px;
    }
}
</style>

<template>
    <div id="admin_pages" class="page">
        <h2 style="text-align:center; margin-bottom:45px; padding-top:30px;">Сторінки</h2>

        <div class="pages mt2">
            <div class="post" v-for="page in pages">
                <p class="content">{{page.title}}</p>
                <router-link class="m_btn_blue_chevron" :to="{name:'admin_edit_page', params:{id:page.id}}"> Редагувати</router-link>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                pages:{}
            };
        },
        mounted() {

        },
        created() {
            this.getPages('/api/pages');
        },
        methods: {
            getPages(uri) {
                this.axios.get(uri).then((response) => {
                    this.pages = response.data;
                    console.log(this.pages);
                });
            },
        }

    }
</script>
