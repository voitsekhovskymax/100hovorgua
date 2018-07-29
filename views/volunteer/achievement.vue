<style lang="less">@import "./../../css/main.less";
</style>

<template>
    <div id="volunteer_achievement" class="page">
        <div v-if="user[0].is_approve==1">
            <div class="container">
                <div class="title_page">Особистий кабінет</div>
                <div class="m_card">
                    <div class="m_toolbar m_toolbar_orange">
                        <router-link :to="{name:'volunteer_achievement'}" class="active">Мої досягнення
                        </router-link>
                        <router-link :to="{name:'volunteer_tasks'}">Мої завдання</router-link>
                        <router-link :to="{name:'volunteer_profile'}">Особиста інформація</router-link>
                    </div>
                    <div class="m_card_body">
                        <div class="achievement_info">
                            <div class="rating_info">
                                <p class="all_time"><img src="/img/icons/clock.png" alt="">{{all_time}} годин</p>
                                <p class="count_tasks"><img src="/img/icons/flag.png" alt="">{{count_tasks}} завдань</p>
                                <p class="bonus"><img src="/img/icons/trophy.png" alt="">{{bonus}} годин</p>
                                <!--<p class="penalty"><img src="/img/icons/warn.png" alt="">{{penalty}} години</p>-->
                            </div>
                            <div class="user_rating mb1">
                                <b class="mr1">Рейтинг довіри</b>
                                <Rate disabled  allow-half v-model="average_rating">
                                </Rate>
                            </div>
                        </div>
                        <table>
                            <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Назва Завдання</th>
                                <th>Кількість годин</th>
                                <th>Бонуси</th>
                                <th>Штрафи</th>
                                <th>Оцінка</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="task in tasks" v-if="task.task.type_state_id == 7">
                                <td>{{task.task.finish.substr(0,10)}}</td>
                                <td>{{task.task.name}}</td>
                                <td>{{task.task.level.count_hours}}</td>
                                <td>{{task.bonus}}</td>
                                <td>{{task.penalty}}</td>
                                <td>
                                    <template v-if="task.rating!=null">
                                        <Rate disabled allow-half v-model="task.rating.rating"></Rate>
                                    </template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="container" style="padding-top:50px;">
                <Alert type="warning"> Зачекайте підтвердження реєстрації від менеджера. Ви обов'язково отримаєте
                    лист на вказану почту.
                </Alert>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: {},
                tasks: {},
                user: {},
                average_rating:0,
                all_time:0,
                count_tasks:0,
                bonus:0,
                penalty:null
            };
        },
        mounted() {

        },
        created() {
            this.axios.get('/api/auth_user').then((response) => {
                this.user = response.data;
                console.log(this.user);
                this.getTasks(this.user);
            });
        },
        methods: {
            getTasks(user_id) {
                this.axios.get('/api/volunteers/' + user_id[0].id).then((response) => {
                    // this.data = response.data;
                    this.tasks = response.data[1].tasks;
                    let rating = 0;
                    for(let i = 0; i < this.tasks.length; i++){
                        if(this.tasks[i].task.type_state_id == 7){
                            this.count_tasks++;
                            console.log(1);
                            rating += this.tasks[i].rating.rating;
                            this.all_time += parseFloat(this.tasks[i].task.necessary_time);
                            this.bonus += parseFloat(this.tasks[i].task.level.count_hours) + parseFloat(this.tasks[i].task.extra_bonuses);
                            // penalty +=
                        }
                    }
                    this.average_rating = rating / this.count_tasks;
                    console.log(this.tasks);
                });
            },
        }

    }
</script>
