<style lang="less">@import "./../../css/main.less";</style>
<style lang="less">@import "./../../css/single_task.less";</style>

<template>
    <div id="single_task">
        <template v-if="user[0].is_approve==1">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link :to="{name:'home_index'}">Головна</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link :to="{name:'customer_tasks'}">Мої завдання</router-link>
                        </li>
                        <li class="breadcrumb-item active">{{ task.task.name }}
                        </li>
                    </ol>
                </nav>
                <Row class="single_task">
                    <Row class="details">
                        <Col span="2">
                        <img :src="task.task.direction_activity.img" :alt="task.task.direction_activity.title">
                        </Col>
                        <Col span="22">
                        <div>
                            <h1 class="title">{{task.task.name}}</h1>
                            <div class="mini">
                                <p> Завдання створене: <b>{{task.task.created_at}}</b></p>
                                <p> Статус завдання: <b>{{task.task.type_state.name}}</b></p>
                            </div>
                        </div>
                        </Col>
                    </Row>
                    <Row class="info" type="flex" justify="space-between">
                        <Col span="8">
                        <img src="/img/icons/icon-clock.png" alt="">
                        {{task.task.level.count_hours}}
                        </Col>
                        <Col span="8">
                        <img src="/img/icons/icon-users.png" alt="">
                        {{task.task.type_task == 1?'Індивідуальне':'Командне '}}
                        </Col>
                        <Col span="8">
                        <img :src="task.task.level.img" alt="" class="level">
                        {{task.task.level.title.split(' ')[0]}}
                        </Col>
                    </Row>
                    <div class="block_icon">
                        <div class="icon"><img src="/img/icons/icon-calendar.png" alt=""></div>
                        <div class="text">
                            <p><b> Старт:</b> {{task.task.start}}</p>
                            <p><b> Термін до:</b> {{task.task.finish}}</p>
                        </div>
                    </div>
                    <div class="block_icon">
                        <div class="icon"><img src="/img/icons/icon-pointer.png" alt=""></div>
                        <div class="text">
                            <p><b>Адреса:</b> {{task.task.adress_text}}</p>
                            <router-link to="/map">Переглянути на мапі</router-link>
                        </div>
                    </div>
                    <div class="block_icon" v-if="task.task.type_task == 2">
                        <div class="icon"><img src="/img/icons/icon-card.png" alt=""></div>
                        <div class="text">
                            <p><b>Кількість вільних місць :</b> {{count_selected}} з {{task.task.count_members}}</p>
                        </div>
                    </div>
                    <div class="block">
                        <div class="label">Волонтери які обрали це завдання:</div>
                        <div class="text">
                            <p v-for="member in members">
                                <router-link  :to="{name:'profile_volunteer', params:{id:member.id}}"
                                              :key="member.id">
                                    {{member.first_name }} {{member.last_name.charAt(0)}}
                                </router-link>
                            </p>

                        </div>
                    </div>


                    <div class="block">
                        <div class="label">Відповідальний:</div>
                        <div class="text">{{task.task.responsible}}</div>
                    </div>

                    <div class="block">
                        <div class="label">Умови успішного виконання:</div>
                        <div class="text">{{task.task.conditions_successful_execution}}</div>
                    </div>
                    <div class="block">
                        <div class="label">Перелік інвентарю:
                        </div>
                        <div class="text">{{task.task.inventory_list}}</div>
                    </div>
                    <div class="block">
                        <div class="label">Замовник надає:</div>
                        <div class="text">{{task.task.customer_provides}}</div>
                    </div>
                    <div class="block">
                        <div class="label">Волонтеру взяти з собою:</div>
                        <div class="text">{{task.task.volunteer_with}}</div>
                    </div>

                    <div class="block" v-if="task.task.additionally != ''">
                        <div class="label">Додатково:</div>
                        <div class="text">{{task.task.additionally}}</div>
                    </div>
                    <!-- directive -->
                    <div v-if="task.tasks_img.length != 0" class="viewer" style="display:inline-block;">
                        <div class="images" v-viewer>
                            <img v-for="single_img in task.tasks_img" :src="'files/tasks/images/'+single_img.img">
                        </div>
                        <!-- component -->
                        <viewer :images="task.tasks_img">
                            <img v-for="single_img in task.task.tasks_img" :src="single_img.img" :key="single_img.id">
                        </viewer>
                    </div>

                    <div class="" v-if="task.task.type_state_id == 5">
                        <button @click="setRating" class="m_btn_orange_chevron"> Завершити завдання</button>
                    </div>
                </Row>
            </div>
        </template>
        <template v-else>
            <div class="container" style="padding-top:50px;">
                <Alert type="warning"> Зачекайте підтвердження реєстрації від менеджера. Ви обов'язково отримаєте лист
                    на вказану почту.
                </Alert>
            </div>
        </template>
        <modal name="rating"
               transition="scale"
               height="auto"
               :adaptive="true"
               :width="600">
            <div class="set_volunteer_rating">
                <Row>
                    <Col :xs="24" :sm="24" :md="12" :lg="12">
                    <div class="content">
                        <div class="rating">
                            <p class="title">Оцініть виконання завдання</p>
                        </div>
                        <div class="rating">
                            <p class="title">Швидкість виконання </p>
                            <div class="rate">
                                <Rate allow-half v-model="rating.speed" @on-change="rateChange"></Rate>
                            </div>
                        </div>

                        <div class="rating">
                            <p class="title">Якість виконання </p>

                            <div class="rate">
                                <Rate allow-half v-model="rating.quality" @on-change="rateChange"></Rate>
                            </div>
                        </div>

                        <div class="rating">
                            <p class="title">Повнота виконання завдання</p>
                            <div class="rate">
                                <Rate allow-half v-model="rating.fullness" @on-change="rateChange"></Rate>
                            </div>
                        </div>

                        <div class="rating">
                            <p class="title">Привітність волонтера</p>
                            <div class="rate">
                                <Rate allow-half v-model="rating.hospitality" @on-change="rateChange"></Rate>
                            </div>
                        </div>
                        <div class="rating">
                            <div class="title">Загалом</div>
                            <div class="rate">
                                <Rate disabled allow-half v-model="rating.rating"></Rate>
                            </div>
                        </div>
                    </div>
                    </Col>
                    <Col :xs="24" :sm="24" :md="12" :lg="12">
                    <div class="set_customer_rating">
                        <div class="content">
                            <div class="set_comment">
                                <div class="title">
                                    Та залиште коментар
                                </div>
                                <div class="comment_form">
                                    <Input v-model="comment.comment" type="textarea"
                                           placeholder="Стислий комментар про виконання завдання та волонтера"></Input>
                                </div>
                            </div>
                            <button class="m_btn_orange_chevron mt1 ml2"
                                    @click="changeStateTask">
                                Підтвердити виконання
                            </button>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
        </modal>
        <modal name="rating_success"
               transition="scale"
               height="auto"
               :adaptive="true"
               :width="260"
               @before-close="beforeClose">
            <div class="rating_success">
                <p>Дякуємо за оцінку!</p>
                <p>Ваше завдання виконане</p>
                <router-link :to="{name:'customer_add_task'}" class="m_btn_orange_chevron">Створити нове
                    завдання </router-link:>
            </div>
        </modal>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                task: {},
                count_selected: null,
                members: {},
                user: {},
                rating: {
                    rating: 4,
                    speed: 4,
                    quality: 4,
                    fullness: 4,
                    hospitality: 4,
                    user_id: []
                },
                comment: {
                    comment: '',
                    author_id: '',
                    task_id: ''
                }
            };
        },
        mounted() {

        },
        created() {
            this.getTask();
            this.axios.get('/api/auth_user').then((response) => {
                this.user = response.data;
            });
        },
        methods: {
            beforeClose(event) {
                event.stop()
            },
            rateChange() {
                this.rating.rating = (this.rating.speed + this.rating.quality + this.rating.fullness + this.rating.hospitality) / 4;
            },
            setRating() {
                this.$modal.show('rating');
            },
            changeStateTask() {
                this.task.task.type_state_id = 6;
                this.rating.author_id = this.user[0].id;
                this.comment.author_id = this.user[0].id;
                this.comment.task_id = this.task.task.id;
                this.axios.post('/api/comments', this.comment).then((response) => {
                    console.log('comment');
                    console.log(response.data);
                });

                if (this.task.task.type_task == 2) {
                    for (let i = 0; i < this.task.volunteers.length; i++) {
                        this.rating.user_id.push(this.task.volunteers[i].id);
                    }
                }
                else {
                    this.rating.user_id.push(this.task.volunteers[0].id);
                }
                this.rating.task_id = this.task.task.id;
                console.log(this.rating);
                this.axios.post('/api/rating', this.rating).then((response) => {
                    console.log(response.data);
                });
                this.axios.patch('/api/tasks/' + this.$route.params.id, this.task.task).then((response) => {
                    console.log(response.data);
                });
                this.getTask();
                this.$modal.hide('rating');
                this.$modal.show('rating_success');
            },
            getTask() {
                this.axios.get('/api/tasks/' + this.$route.params.id + '/edit').then((response) => {
                    this.task = response.data;
                    console.log(this.task);
                    if (this.task.volunteers != null) {
                        this.count_selected = this.task.task.count_members - this.task.volunteers.length;
                        this.members = this.task.volunteers;
                    }
                    else {
                        //Количество участников задания
                        this.count_selected = this.task.task.count_members;
                    }
                });
            },

        }
    }
</script>
