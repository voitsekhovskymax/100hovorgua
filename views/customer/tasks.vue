<style lang="less">@import "./../../css/main.less";
@import "./../../css/customer.less";</style>

<template>
    <div id="customer_tasks" class="page">
        <template v-if="user[0].is_approve==1">
            <div class="container">
                <div class="title_page">Мої завдання</div>
                <div class="m_card">
                    <div class="m_toolbar m_toolbar_orange">
                        <router-link :to="{name:'customer_add_task'}">Створити завдання</router-link>
                        <router-link :to="{name:'customer_tasks'}" class="active">Мої завдання</router-link>
                        <router-link :to="{name:'customer_profile'}">Особистий кабінет</router-link>
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
                            <Row class="task mb3" :gutter="16" v-for="task in tasks" :key="task.id">
                                <div class="img_task">
                                    <img :src="task.direction_activity.img" alt="img">
                                </div>
                                <Col :sm="20" :lg="20">
                                <h3 class="title">{{task.name}}</h3>
                                <div class="mt1">
                                    <div class="dates">
                                        <p>Завдання створене:<b>{{task.created_at}}</b></p>
                                        <p v-if="task.type_state !=null">Статус завдання:<b>{{task.type_state.name}}</b>
                                        </p>

                                    </div>
                                    <div class="dates i_time_wrap">
                                        <p><b>Старт:</b> {{task.start}}</p>
                                        <p><b>Термін до:</b> {{task.finish}}</p>
                                    </div>
                                </div>
                                <div class="mt1 mb2 details">
                                    <span class="i_time mr1"> {{task.level.count_hours}} год.</span>
                                    <span class="i_persons mr1" v-if="task.type_task == 1"> Індивідуальне</span>
                                    <span class="i_persons mr1" v-else> Командне</span>
                                    <span class="level_id mr1">
                                    <img :src="task.level.img" alt="1"> {{task.level.title}}</span>
                                </div>
                                <div class="buttons">
                                    <button class="m_btn_blue_chevron_outline mr1" @click="detailsTask(task.id)">Деталі
                                        завдання
                                    </button>
                                    <button class="m_btn_edit mr1" @click="updateTask(task.id)"
                                            v-if="task.type_state_id == 1 || task.type_state_id == 2 ">Редагувати
                                    </button>
                                    <button class="m_btn_cancel"
                                            v-if="task.type_state_id == 1|| task.type_state_id == 2">Скасувати
                                    </button>
                                </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="container" style="padding-top:50px;">
                <Alert type="warning" > Зачекайте підтвердження реєстрації від менеджера. Ви
                    обов'язково отримаєте лист на вказану почту.
                </Alert>
            </div>
        </template>
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
            this.axios.get('/api/auth_user').then((response) => {
                this.user = response.data;
                console.log(response.data);
            });
        },
        created() {
            this.getTasks('/api/customer_tasks');
        },
        methods: {
            getTasks(url) {
                this.axios.get(url).then((response) => {
                    this.tasks = response.data;
                    console.log(this.tasks);
                });
            },
            updateTask(task_id) {
                this.$router.push({
                    name: 'customer_update_task',
                    params: {
                        id: task_id
                    }
                });
            },
            detailsTask(task_id) {
                this.$router.push({
                    name: 'customer_single_task',
                    params: {
                        id: task_id
                    }
                });
            },
        }

    }
</script>
