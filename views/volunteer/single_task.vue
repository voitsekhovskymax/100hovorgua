<style lang="less">@import "./../../css/main.less";</style>
<style lang="less">@import "./../../css/single_task.less";

.profile_img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #ff8c0e;
}

</style>

<template>
    <div id="single_task">
        <div v-if="true">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/home">Головна</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link :to="{name:'volunteer_tasks'}">Мої завдання</router-link>
                        </li>
                        <li class="breadcrumb-item active">{{ task.task.name }}
                        </li>
                    </ol>
                </nav>
                <Row class="single_task">
                    <Row class="details">
                        <Col :xs="6" :sm="6" :md="4" :lg="2">
                        <img :src="task.task.direction_activity.img" :alt="task.task.direction_activity.title">
                        </Col>
                        <Col :xs="18" :sm="18" :md="20" :lg="22">
                        <div>
                            <h1 class="title">{{task.task.name}}</h1>
                            <div class="mini">
                                <p> Завдання створене: <b>{{task.task.created_at}}</b></p>
                                <p> Статус завдання: <b>{{task.task.type_state.name}}</b></p>
                            </div>
                        </div>
                        </Col>
                    </Row>
                    <div class="m_row">
                        <Row class="info" type="flex" justify="space-between" :gutter="1">
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <img src="/img/icons/icon-clock.png" alt="">
                            {{task.task.level.count_hours}} год.
                            </Col>
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <img src="/img/icons/icon-users.png" alt="">
                            {{task.task.type_task == 1?'Індивідуальне':'Командне '}}
                            </Col>
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <img :src="task.task.level.img" alt="" class="level">
                            {{task.task.level.title.split(' ')[0]}}
                            </Col>
                        </Row>
                    </div>
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
                            <router-link :to="{name:'volunteer_map'}">Переглянути на мапі</router-link>
                        </div>
                    </div>
                    <div class="block_icon" v-if="task.task.type_task == 2">
                        <div class="icon"><img src="/img/icons/icon-card.png" alt=""></div>
                        <div class="text">
                            <p><b>Кількість вільних місць :</b> {{count_selected}} з {{task.task.count_members}}</p>
                        </div>
                    </div>
                    <div class="customer">
                        <p><b>Замовник</b></p>
                        <div class="customer_img">
                            <img :src="'/files/images/'+task.task.author.img" alt="beautification">
                        </div>
                        <div class="customer_details">
                            <template v-if="task.task.author.role==3">
                                <div class="title"> {{task.task.author.customer_org.work_place}}</div>
                                <div class=""> Контактна особа : {{task.task.author.first_name}}
                                    {{task.task.author.last_name}} ( {{task.task.author.phone}})
                                </div>
                            </template>
                            <template v-if="task.task.author.role==2">
                                <div class="title"> {{task.task.author.first_name}} {{task.task.author.last_name}}</div>
                                <div class=""> ( {{task.task.author.phone}})</div>
                            </template>
                            <div class="text">
                                <router-link :to="{name:'customer', params:{id : task.task.author.id}}">Дізнатись
                                    більше
                                    про замовника
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <template v-if="user[1].is_task_limit == null">
                        <div class="actions" v-if="task.task.type_state_id == 2 || task.task.type_state_id == 3">
                            <button @click="selectTask" v-if="showSelect" class="m_btn_blue_chevron">Обрати завдання
                            </button>
                            <template v-if="task.task.type_task == 2">
                                <button @click="selectCaptain" v-if="showCaptain" class="m_btn_blue_chevron_outline">
                                    Бути
                                    капітаном!
                                </button>
                            </template>
                        </div>
                    </template>
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

                    <div style="display:inline-block;" v-if="task.task.type_state_id == 4 && task.task.type_task == 2">
                        <template v-if="task.captain.id == this.user[0].id">
                            <img src="/img/upload_profile_img.png" style="margin-right: 15px;    margin-bottom: 15px;"
                                 alt="Завантажити фото" @click="$modal.show('downloadModal')">
                        </template>

                    </div>

                    <div style="display:inline-block;" v-if="task.task.type_state_id == 4 && task.task.type_task == 1">
                        <img src="/img/upload_profile_img.png" style="margin-right: 15px;    margin-bottom: 15px;"
                             alt="Завантажити фото" @click="$modal.show('downloadModal')">
                    </div>

                    <div v-if="task.task.type_state_id == 3 || task.task.type_state_id == 4">
                        <button @click="cancelTask" v-if="showCancel" class="m_btn_cancel">Скасувати вибір</button>
                    </div>
                    <div v-if="task.task.type_state_id == 4">
                        <div class="" v-if="showCompleted">
                            <button @click="setRating" class="m_btn_blue_chevron"> Завершити завдання</button>
                        </div>
                    </div>

                </Row>
            </div>
        </div>
        <div v-else>
            <div class="container" style="padding-top:50px;">
                <Alert type="warning"> Зачекайте підтвердження реєстрації від менеджера. Ви обов'язково отримаєте лист
                    на вказану почту.
                </Alert>
            </div>
        </div>
        <modal name="rating" :width="300">
            <div class="set_customer_rating">
                <div class="content">
                    <div class="rating">
                        <div class="title">
                            Оцініть замовника
                        </div>
                        <div class="rate">
                            <Rate allow-half v-model="rating.rating"></Rate>
                        </div>
                    </div>
                    <div class="set_comment">
                        <div class="title">
                            Та залиште коментар
                        </div>
                        <div class="comment_form">
                            <Input v-model="comment.comment" type="textarea"
                                   placeholder="Стислий комментар про завдання та замовника"></Input>
                        </div>
                    </div>
                    <button class="m_btn_orange_chevron mt1 ml2"
                            @click="changeStateTask">
                        Підтвердити виконання
                    </button>
                </div>
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
                <p>Завдання виконане</p>
                <router-link :to="{name:'volunteer_map'}" class="m_btn_orange_chevron">Обрати нове
                    завдання </router-link:>
            </div>
        </modal>
        <modal name="downloadModal" :width="300" :height="280">
            <div class="modal_login">
                <p class="header">
                    <span>Додати фото</span>
                </p>
                <div class="content">
                    <label v-if="image">
                        <img :src="image" class="profile_img">
                        <input type="file" hidden v-on:change="onImageChange" accept="image/x-png,image/gif,image/jpeg"
                               class="form-control">
                    </label>
                </div>
                <div class="footer">
                    <button class="m_btn_orange_chevron mt1"
                            @click="uploadFile">
                        Завантажити
                    </button>
                </div>
            </div>
        </modal>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                task: {},
                data: [],
                user: [
                    {
                        is_approve: false
                    },
                    {}
                ],
                showSelect: false,
                showCaptain: false,
                showCancel: false,
                showCompleted: false,
                count_selected: null,
                image: '/img/upload_profile_img.png',
                rating: {
                    rating: 2.5,
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
            this.axios.get('/api/auth_user').then((response) => {
                this.user = response.data;
                this.getTask();
            });


        },
        methods: {
            setRating() {
                this.$modal.show('rating');
            },
            onImageChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            uploadFile() {
                if (this.image != "/img/upload_profile_img.png") {
                    this.$modal.hide('downloadModal');
                    let request = {
                        img: this.image,
                        user_id: this.user[0].id,
                        task_id: this.task.task.id,
                    };
                    console.log(request);
                    this.axios.post('/api/files', request).then((response) => {
                        console.log(response);
                    });
                    this.image = "/img/upload_profile_img.png"
                    this.getTask();
                    location.reload();
                }
            },
            changeStateTask() {
                this.comment.author_id = this.user[0].id;
                this.comment.task_id = this.task.task.id;
                this.task.task.type_state_id = 5;
                this.rating.author_id = this.user[0].id;
                this.rating.user_id.push(this.task.task.author_id);
                this.rating.task_id = this.task.task.id;
                this.axios.post('/api/comments', this.comment).then((response) => {
                    console.log('comment');
                    console.log(response.data);
                    this.axios.post('/api/rating', this.rating).then((response) => {
                        console.log('rating');
                        console.log(response.data);
                        this.axios.patch('/api/tasks/' + this.$route.params.id, this.task.task).then((response) => {
                            console.log('tasks');
                            console.log(response.data);
                            this.getTask();
                            this.$modal.hide('rating');
                            this.$modal.show('rating_success');
                        });
                    });
                });


            },
            getTask() {
                this.axios.get('/api/tasks/' + this.$route.params.id + '/edit').then((response) => {
                    this.task = response.data;
                    console.log(this.task)
                    // подписан ли текущий пользователь на задание
                    if (this.task.volunteers != null) {
                        //Количество участников задания
                        this.count_selected = this.task.task.count_members - this.task.volunteers.length;
                        for (let i = 0; i < this.task.volunteers.length; ++i) {
                            if (this.task.volunteers[i].id == this.user[0].id) {
                                this.showSelect = false;
                                this.showCaptain = false;
                                this.showCancel = true;
                            }
                        }
                        if (this.showCancel == false) {
                            if (this.count_selected == (this.task.task.count_members - 1) && this.task.captain == null) {
                                this.showSelect = false;
                                this.showCaptain = true;
                            }
                            else if (this.count_selected == (this.task.task.count_members - 1) && this.task.captain != null) {
                                this.showSelect = true;
                                this.showCaptain = false;

                            }
                            else {
                                this.showSelect = true;
                                this.showCaptain = true;
                            }
                        }
                    } else {
                        this.count_selected = this.task.task.count_members;
                    }


                    console.log('this.task.tasks_img.length = ' + this.task.tasks_img.length);
                    if (this.task.tasks_img.length != 0) {
                        if (this.task.task.type_task == 2) {
                            if (this.task.captain.id == this.user[0].id) {
                                this.showCompleted = true;
                                this.showCancel = false;
                            }
                            else {
                                this.showCompleted = false;
                            }
                        }
                        else {
                            this.showCompleted = true;
                            this.showCancel = false
                        }

                    }
                });
            },
            selectTask() {
                this.axios.post('/api/take_task/' + this.task.task.id).then((response) => {
                    console.log(response);
                    this.showSelect = false;
                    this.showCancel = true;
                    if (response.data == -1) {
                        this.$Notice.warning({
                            title: 'Помилка',
                            desc: 'У цього завдання можливо тільки стати капітаном.'
                        });
                    } else {
                        this.$Notice.success({
                            title: 'Ви підписалися на це завдання',
                        });
                        this.getTask();
                    }
                });
            },
            cancelTask() {
                this.axios.post('/api/unsubscribe_task/' + this.task.task.id).then((response) => {
                    console.log(response);
                    this.showSelect = true;
                    this.showCancel = false;
                    this.getTask();
                    this.$Notice.success({
                        title: 'Ви відписалися на це завдання',
                    });
                });
            },
            selectCaptain() {
                this.axios.post('/api/take_task/' + this.task.task.id, {'captain': 1}).then((response) => {
                    console.log(response);
                    this.showSelect = false;
                    this.showCaptain = false;
                    this.showCancel = true;
                    this.getTask();
                    this.$Notice.success({
                        title: 'Вас обрано капітаном',
                    });
                });
            },
            toCustomer(id) {
                console.log(id);
                this.$router.push({
                    name: 'customer',
                    params: {
                        id: id
                    }
                });
            }

        }

    }
</script>
