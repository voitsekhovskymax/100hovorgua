<style lang="less">@import "./../../css/main.less";</style>

<template>
    <div id="success_story" class="rating_page container">
        <div class="user_success_story">
            <div class="story_img">
                <img :src="'files/images/' + user.img" alt="">
            </div>
            <div class="story_name">
                {{ user.first_name}} {{user.last_name.substr(0,1) }}.
            </div>
            <div class="rating_position">
                <!--№{{key+1}} у загальному рейтингу волонтерів-->
            </div>
            <div>
                <p> {{user.years}} рік. </p>
                <p>{{ user.volunteer.work_place}}</p>
            </div>
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
            </div>
            <div class="user_rating">
                <b>Рейтинг довіри</b>
                <Rate disabled show-text allow-half v-model="user.rating">
                    <span style="color: #f5a623">{{ user.rating}}</span>
                </Rate>
            </div>
            <div>
                <p>{{user.phone}}</p>
                <p>{{user.email}}</p>
            </div>

            <div class="aboutlnk">
                <router-link :to="{name:'profile_volunteer',params:{id:user.id}}"
                             class="m_btn_blue_chevron_outline mt1">Дивитись профіль
                </router-link>
            </div>
        </div>
        <h2 class="content_center mt2 mb1">Історія Успіху</h2>
        <div class="task_list mt3">
            <Row class="task" :gutter="16" v-for="task in user.tasks" :key="task.id"  v-if="task.task_complete !=null">
                <div class="img_task">
                    <img :src="task.task_complete.direction_activity.img" alt="img">
                </div>
                <Col :sm="20" :lg="20">
                <h3 class="title">{{task.task_complete.name}}</h3>
                <div class="mt1 dates_wrap">
                    <div class="dates">
                        <p>Завдання створене:<b> {{task.task_complete.created_at}}</b></p>
                        <p>Статус завдання:<b> {{task.task_complete.type_state.name}}</b></p>
                    </div>
                    <div class="dates i_time_wrap">
                        <p><b>Старт:</b> {{task.task_complete.start}}</p>
                        <p><b>Термін до:</b> {{task.task_complete.finish}}</p>
                    </div>
                </div>
                <div class="mt1 mb2 details">
                    <span class="i_time mr1">{{task.task_complete.necessary_time}} год. </span>
                    <span class="i_trophy mr1 ">{{task.task_complete.level.count_hours}} год.</span>
                    <span class="i_penalty mr1">{{task.task_complete.level.count_hours}} год.</span>
                    <span class="i_persons mr1" v-if="task.task_complete.type_task == 1"> Індивідуальне</span>
                    <span class="i_persons mr1" v-else> Командне</span>
                    <span class="level_id mr1">
                                    <img :src="task.task_complete.level.img" alt="1"> {{task.task_complete.level.title.split(' ')[0]}}
                                </span>
                    <template v-if="task.task_complete.captain != null">
                        <span class="i_check mr1" v-if="task.task_complete.captain.id == user.id"> Я капітан</span>
                    </template>
                </div>
                <div class="buttons">
                    <!--<button class="m_btn_details mr1"></button>-->
                    <!--<router-link class="m_btn_blue_chevron_outline"-->
                    <!--:to="{ name: 'volunteer_single_task', params:{id:task.task_complete.id}}">Деталі-->
                    <!--завдання-->
                    <!--</router-link>-->
                    <!--<button class="m_btn_cancel">Скасувати</button>-->
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
                user: {},
            };
        },
        mounted() {

        },
        created() {
            this.axios.post('/api/get_rating/' + this.$route.params.id).then((response) => {
                this.user = response.data;
                this.user.years = new Date().getFullYear() - this.user.volunteer.birth_year ;

                console.log(this.user);
            });
        },
        methods: {

        }
    }
</script>
