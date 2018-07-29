<style lang="less">@import "./../../css/main.less";

</style>

<template>
    <div id="rating" class="rating_page">
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{name:'home_index'}">Головна</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        Рейтинг волонтерів
                    </li>
                </ol>
            </nav>
            <div class="users">
                <Row :gutter="30" class="user" v-for="(user, key, index) in sortedArray" :key="user.id">
                    <Col :xs="24" :sm="4" :md="2" :lg="2">
                    <div class="rating_number">{{key+1}}.</div>
                    </Col>
                    <Col :xs="24" :sm="6" :md="4" :lg="4">
                    <img class="rating_img"
                         :src="'files/images/'+user.img"></Col>
                    <Col :xs="24" :sm="14" :md="18" :lg="18">
                    <div class="info">
                        <p class="rating_name"> {{ user.first_name}} {{user.last_name.substr(0,1) }}.</p>
                        <!--<div class="year"> {{getAge(user.volunteer.birth_year)}}</div>-->
                        <div class="year"> {{user.years}} років</div>
                        <div class="work_place">{{ user.volunteer.work_place}}</div>
                        <div class="rating_info">
                            <p class="all_time"><img src="/img/icons/clock.png" alt="">

                                <span v-if="user.volunteer.count_hours == null"> 0 </span>
                                <span v-if="user.volunteer.count_hours != null">  {{user.volunteer.count_hours}} </span>
                                годин</p>
                            <p class="count_tasks"><img src="/img/icons/flag.png" alt="">{{user.count_task}}
                                завдань</p>
                            <p class="bonus"><img src="/img/icons/trophy.png" alt="">{{user.bonus}}
                                годин</p>
                            <p class="penalty"><img src="/img/icons/warn.png" alt="">{{user.penalty}} годин</p>
                            <p class="rabbit" v-if="user.volunteer.is_rabbit != null"><img src="/img/icons/bunny.png"
                                                                                           alt="Заєць"></p>
                        </div>
                        <div class="user_rating">
                            <b>Рейтинг довіри</b>
                            <Rate disabled show-text allow-half v-model="user.rating">
                                <span style="color: #f5a623">{{ user.rating}}</span>
                            </Rate>
                        </div>
                        <router-link :to="{name:'success_story', params:{id:user.id}}"
                                     class="m_btn_blue_chevron_outline mt1">Історія успіху
                        </router-link>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
        <Spin size="large" class="all_page_spin" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                users: [],
                rating: {rating: 3.8},
                tasks: {},
                spinShow: true,
            };
        },
        mounted() {

        },
        computed: {
            sortedArray() {
                return this.users.sort((a, b) => b.volunteer.count_hours - a.volunteer.count_hours);
            }
        },
        created() {
            this.axios.get('/api/get_all_rating').then((response) => {
                this.users = response.data;
                let current_year = new Date().getFullYear();
                for (let i = 0; i < this.users.length; i++) {
                    console.log('1sss')
                    this.users[i].years = current_year - this.users[i].volunteer.birth_year;
                }
                this.spinShow = false;
            });
        },
        methods: {
            getAge(years) {
                return new Date().getFullYear() - years;
            },
        }

    }
</script>
