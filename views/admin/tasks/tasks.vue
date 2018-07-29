<style lang="less">@import "./../../../css/main.less";</style>

<template>
    <div id="admin_tasks" class="page">
        <div class="toolbar_tasks">
            <router-link :to="{name:'admin_new_task'}" class="m_btn_blue_chevron_outline mt1 ml1">Створити нове завдання</router-link>
        </div>
        <div class="task_list mt3" style="padding:30px;">
            <Row class="task mb3" :gutter="16" v-for="task in tasks" :key="task.id">
                <div class="img_task">
                    <img :src="task.direction_activity.img" alt="img">
                </div>
                <Col :sm="20" :lg="20">
                <h3 class="title">{{task.name}}</h3>
                <div class="mt1">
                    <div class="dates">
                        <p>Завдання створене:<b>{{task.created_at}}</b></p>
                        <p>Статус завдання:<b>{{task.type_state.name}}</b></p>
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
                    <router-link :to="{name:'admin_single_task', params: { id: task.id}}" class="m_btn_blue_chevron mr1">Деталі завдання</router-link>
                    <router-link :to="{name:'admin_edit_task', params: { id: task.id}}" class="m_btn_edit mr1">Редагувати</router-link>
                    <!--<button class="" @click="detailsTask(task.id)">Деталі завдання</button>-->
                    <!--<button class="m_btn_edit mr1" @click="updateTask(task.id)">Редагувати</button>-->
                    <button class="m_btn_cancel">Скасувати</button>
                </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tasks:{}
            };
        },
        mounted() {

        },
        created() {
            this.getTasks('/api/map');
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
                    name: 'admin_single_task',
                    params: {
                        id: task_id
                    }
                });
            },
        }
    }
</script>
