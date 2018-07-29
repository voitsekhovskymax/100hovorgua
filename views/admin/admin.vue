<style lang="less">@import "./../../css/main.less";</style>

<template>
    <div id="admin" class="page">
        <div class="container">
            <div class="title_page">Панель адміністратора</div>
            <div class="m_card">
                <div class="m_toolbar m_toolbar_orange">
                    <router-link :to="{ name: 'admin_tasks'}">Завдання</router-link>
                    <router-link :to="{ name: 'admin_users'}">Користувачі</router-link>
                    <router-link :to="{ name: 'admin_news'}">Новини</router-link>
                </div>
                <div class="router_content">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
            };
        },
        mounted() {

        },
        created() {

        },
        methods: {}

    }
</script>
