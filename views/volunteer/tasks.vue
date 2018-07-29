<style lang="less">@import "./../../css/main.less";
@import "./../../css/customer.less";</style>

<template>
    <div id="volunteer_tasks" class="page">
        <div v-if="user[0].is_approve==1">
            <div class="container">
                <div class="title_page">Мої завдання</div>
                <div class="m_card">
                    <div class="m_toolbar m_toolbar_orange">
                        <router-link :to="{name:'volunteer_achievement'}">Мої досягнення</router-link>
                        <router-link :to="{name:'volunteer_tasks'}" class="active">Мої завдання</router-link>
                        <router-link :to="{name:'volunteer_profile'}">Особиста інформація</router-link>
                    </div>
                    <div class="m_card_body">
                        <!--<div class="filter">-->
                        <!--<p><b>Статус завдання</b></p>-->
                        <!--<Select v-model="filter" placeholder="Вибрати" style="width: 200px">-->
                        <!--&lt;!&ndash;<Option v-for="year in years" :value="year" :key="year">{{ year }}</Option>&ndash;&gt;-->
                        <!--<Option>Всі</Option>-->
                        <!--</Select>-->
                        <!--</div>-->
                        <div class="task_list mt3">
                            <Row class="task" :gutter="16" v-for="task in tasks" :key="task.id">
                                <div class="img_task">
                                    <img :src="task.direction_activity.img" alt="img">
                                </div>
                                <Col :sm="20" :lg="20">
                                <h3 class="title">{{task.name}}</h3>
                                <div class="mt1 dates_wrap">
                                    <div class="dates">
                                        <p>Завдання створене:<b> {{task.created_at}}</b></p>
                                        <p>Статус завдання:<b> {{task.type_state.name}}</b></p>
                                    </div>
                                    <div class="dates i_time_wrap">
                                        <p><b>Старт:</b> {{task.start}}</p>
                                        <p><b>Термін до:</b> {{task.finish}}</p>
                                    </div>
                                </div>
                                <div class="mt1 mb2 details">
                                    <span class="i_time mr1">{{task.necessary_time}} год. </span>
                                    <span class="i_trophy mr1 ">{{task.level.count_hours}} год.</span>
                                    <span class="i_penalty mr1">{{task.level.count_hours}} год.</span>
                                    <span class="i_persons mr1" v-if="task.type_task == 1"> Індивідуальне</span>
                                    <span class="i_persons mr1" v-else> Командне</span>
                                    <span class="level_id mr1">
                                    <img :src="task.level.img" alt="1"> {{task.level.title.split(' ')[0]}}
                                </span>
                                    <template v-if="task.captain != null">
                                        <span class="i_check mr1" v-if="task.captain.id == user[0].id"> Я капітан</span>
                                    </template>
                                </div>
                                <div class="buttons">
                                    <!--<button class="m_btn_details mr1"></button>-->
                                    <router-link class="m_btn_blue_chevron_outline"
                                                 :to="{ name: 'volunteer_single_task', params:{id:task.id}}">Деталі
                                        завдання
                                    </router-link>
                                    <!--<button class="m_btn_cancel">Скасувати</button>-->
                                </div>
                                </Col>
                            </Row>
                        </div>
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
                filter: null,
                tasks: {},
                user: {}
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
                this.axios.get('/api/volunteer_tasks/' + user_id[0].id).then((response) => {
                    this.tasks = response.data['tasks'];
                    console.log(this.tasks);
                });
            },
        }
    }
</script>
