<style lang="less">@import "./../../../css/main.less";</style>
<style lang="less">@import "./../../../css/single_task.less";</style>

<template>
    <div id="single_task_admin">
        <div class="toolbar_single_task">
            <div class="tf-wrap" v-if="task.task.type_state_id != 1">
                <label for="">Статус завдання </label>
                <Select v-model="task.task.type_state_id" style="width:200px"
                        @on-change="changeStateTask(task.task.type_state_id)">
                    <Option v-for="typeState in typeStateList" :value="typeState.id" :key="typeState.id">{{
                        typeState.name }}
                    </Option>
                </Select>
            </div>
            <Button type="success" v-if="task.task.type_state_id == 1" @click="changeStateTask(2)">Підтвердити
                завдання
            </Button>
            <Button type="info" @click="$modal.show('addBonusModal')">Додати бонуси
            </Button>
        </div>
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
                    <router-link :to="{name:'admin_map'}">Переглянути на мапі</router-link>
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
            <div v-if="task.tasks_img.length != 0" class="viewer">
                <div class="images" v-viewer>
                    <div class="admin_image_wrap" v-for="single_img in task.tasks_img">
                    <img :src="'files/tasks/images/'+single_img.img">
                    <Button type="error" shape="circle" icon="ios-trash" title="Видалити"
                            @click="deleteFile(single_img.id)">Видалити</Button>
                    </div>
                </div>
                <!-- component -->
                <viewer :images="task.tasks_img">
                    <img v-for="single_img in task.task.tasks_img" :src="single_img.img" :key="single_img.id">
                </viewer>
            </div>
            <div class="">
                <label v-if="image">
                    <img :src="image" class="profile_img">
                    <input type="file" hidden v-on:change="onImageChange" accept="image/x-png,image/gif,image/jpeg"
                           class="form-control">
                </label>
                <button @click="uploadFile">Завантажити</button>
            </div>

            <div class="comments_admin" v-if="comments != null">
                <div class="header"> Коментарі</div>
                <Row>
                    <div v-for="comment in comments" :key="comment.id">
                        <Col :xs="24" :sm="24" :md="12" :lg="12" v-if="comment.author_id == task.task.author_id">
                        <div class="comment_wrap">
                            <div class="author_name">{{comment.author.first_name}} {{comment.author.last_name}}</div>
                            <div class="role">Замовник</div>
                            <div class="comment">{{comment.comment}}</div>
                            <div class="date">{{comment.updated_at}}</div>
                        </div>
                        </Col>
                        <Col :xs="24" :sm="24" :md="12" :lg="12" v-if="comment.author_id != task.task.author_id">
                        <div class="comment_wrap">
                            <div class="author_name">{{comment.author.first_name}} {{comment.author.last_name}}</div>
                            <div class="role">Волонтер</div>
                            <div class="comment">{{comment.comment}}</div>
                            <div class="date">{{comment.updated_at}}</div>
                        </div>
                        </Col>
                    </div>
                </Row>
            </div>
        </Row>
        <modal name="addBonusModal" :width="300">
            <div class="modal_login">
                <p class="header">
                    <span>Додати бонуси за завдання</span>
                </p>
                <div class="content">
                    <InputNumber :max="10" :min="0" :step="0.5" v-model="task.task.extra_bonuses"></InputNumber>
                </div>
                <div class="footer">
                    <button class="m_btn_orange_chevron mt1"
                            @click="addBonus">
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
                user: {},
                count_selected: null,
                typeStateList: null,
                image: '/img/upload_profile_img.png',
                comments: null
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
            getComments() {

            },
            addBonus(){
                this.$modal.show('addBonusModal');
                this.axios.patch('/api/tasks/' + this.$route.params.id, this.task.task).then((response) => {
                    console.log('response:');
                    console.log(response);
                });
                this.$Notice.success({
                    title: 'Увага!',
                    desc: 'Данні оновлено'
                });

            },
            changeStateTask(taskState) {
                console.log(this.task.task);
                this.axios.post('/api/state_task/' + this.$route.params.id, {state: taskState}).then((response) => {
                    console.log(response.data);
                    this.getTask();
                });

            },
            getTypes() {
                this.axios.get('/api/type_task_state').then((response) => {
                    this.typeStateList = response.data;
                    console.log(this.typeStateList);
                });
            },
            getTask() {
                this.axios.get('/api/tasks/' + this.$route.params.id + '/edit').then((response) => {
                    this.task = response.data;
                    console.log(this.task);
                    this.axios.get('/api/comments/' + this.task.task.id).then((response) => {
                        this.comments = response.data;
                    });
                    if (this.task.volunteers != null) {
                        //Количество участников задания
                        this.count_selected = this.task.task.count_members - this.task.volunteers.length;
                    }else {
                        this.count_selected = this.task.task.count_members;
                    }
                    this.getTypes();
                });
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
                let request = {
                    img: this.image,
                    user_id: this.user[0].id,
                    task_id: this.task.task.id,
                };
                this.axios.post('/api/files', request).then((response) => {
                    console.log(response);
                });
                this.getTask();
            },
            deleteFile(file_id) {
                console.log(file_id);
                this.axios.delete('/api/files/' + file_id).then((response) => {
                    console.log(response);
                });
                this.getTask();
            }
        }
    }
</script>
