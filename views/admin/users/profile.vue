<style lang="less">@import "./../../../css/main.less";</style>
<style lang="less">@import "./../../../css/admin.less";</style>

<template>
    <div id="admin_volunteer_profile" class="page">
        <div class="admin_user_toolbar">
            <Button v-if="user.is_approve==null" @click="user.is_approve = 1; aprrove()" type="success">
                Підтвердити користувача
            </Button>
            <Button v-if="user.is_approve==1" @click="user.is_approve = null; aprrove()" type="warning">Скасувати
                підтвердження
            </Button>

            <Button v-if="user.is_banned == null" type="error" @click="$modal.show('bann_modal')">Заблокувати
                користувача
            </Button>
            <Button v-if="user.is_banned == 1" type="success"
                    @click="user.ban_description=null; user.banned_before=null;user.is_banned=null;update();">
                Розблокувати користувача
            </Button>
            <template v-if="user.role==4">
                <Button v-if="user.volunteer.is_task_limit==null"
                        @click="user.volunteer.is_task_limit = 1; update()" type="warning">Обмежити
                </Button>
                <Button v-if="user.volunteer.is_task_limit==1"
                        @click="user.volunteer.is_task_limit = null; update()" type="success">Скасувати
                    обмеження
                </Button>
            </template>
            <Checkbox v-if="user.volunteer != null" v-model="user.volunteer.is_rabbit"
                      @on-change="user.volunteer.is_rabbit == !user.volunteer.is_rabbit; update()">Заєць
            </Checkbox>
            <Button type="success" @click="$modal.show('addBonus')">Додати бонус</Button>
            <Button type="success" @click="$modal.show('addPenalty')">Додати штраф</Button>
        </div>
        <div class="user_image">
            <label>
                <img :src="user.img" :key="user.id"
                     style="width:100px; height:100px; object-fit:cover; border-radius:50px;">
                <input type="file" hidden v-on:change="onImageChange" accept="image/x-png,image/gif,image/jpeg"
                       class="form-control">
            </label>
        </div>

        <div class="volunteer_form" v-if="user.role == 4">
            <div class="form">
                <Form :model="user" label-position="top">
                    <Row :gutter="16">
                        <Col :sm="24" :lg="12">
                        <FormItem label="Ім’я">
                            <Input class="form-icon form-person" v-model="user.first_name"
                                   placeholder="Ваше ім’я"></Input>
                        </FormItem>
                        <FormItem label="Прізвище">
                            <Input class="form-icon form-person" v-model="user.last_name"
                                   placeholder="Прізвище"></Input>
                        </FormItem>
                        <FormItem class="form-icon form-year" label="Рік народження">
                            <Select v-model="user.volunteer.birth_year" filterable placeholder="Оберіть рік народження">
                                <Option v-for="year in years" :value="year" :key="year">{{ year }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="Місце роботи / навчання">
                            <Input class="form-icon form-location" v-model="user.volunteer.work_place"
                                   placeholder="Місце роботи / навчання"
                            ></Input>
                        </FormItem>
                        </Col>
                        <Col :sm="24" :lg="12">
                        <FormItem label="Телефон">
                            <Input class="form-icon form-tel" v-model="user.phone"
                                   placeholder="Ваш номер телефону"
                                   name="phone"></Input>
                        </FormItem>
                        <FormItem label="Email">
                            <Input class="form-icon form-email" v-model="user.email" placeholder="Ваш e-mail"
                                   name="email"></Input>
                        </FormItem>
                        <FormItem label="Пароль">
                            <Input class="form-icon form-password" v-model="user.password" placeholder="Пароль"
                                   name="password"></Input>
                        </FormItem>
                        <FormItem label="Повторити пароль">
                            <Input class="form-icon form-password" v-model="user.password_confirmation"
                                   placeholder=""
                                   name="password_confirmation"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <FormItem label="Про мене">
                            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="Напишіть кілька слів" v-model="user.volunteer.about"></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <FormItem label="Наставник">
                            <Select v-model="user.volunteer.mentor_id" clearable filterable
                                    placeholder="Оберіть наставника">
                                <Option v-for="mentor_user in users" :value="mentor_user.id" :key="mentor_user.id"
                                        v-if="mentor_user.role==4 && mentor_user.id != user.id">{{
                                    mentor_user.first_name }} {{ mentor_user.last_name }}
                                </Option>
                                <!--<Option :value="0">Наставник відсутній</Option> -->
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <p><b>Є наставником цих волонтерів</b></p>
                        <p v-for="mentor_user in users">
                            <router-link
                                    v-if="mentor_user.volunteer !=null &&  mentor_user.volunteer.mentor_id == user.id"
                                    :key="mentor_user.id" :to="{name:'admin_edit_user', params:{id:mentor_user.id}}">
                                {{mentor_user.first_name}} {{mentor_user.last_name}}
                            </router-link>
                        </p>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        <div class="customer_form" v-if="user.role == 2 || user.role == 3">
            <div class="form">
                <Form :model="user" label-position="top">
                    <Row :gutter="16">
                        <Col :sm="24" :lg="12">
                        <template v-if="user.role == 2">
                            <FormItem label="Ім’я">
                                <Input class="form-icon form-person" v-model="user.first_name"
                                       placeholder="Ваше ім’я"
                                       name="first_name"></Input>
                            </FormItem>
                            <FormItem label="Прізвище">
                                <Input class="form-icon form-person" v-model="user.last_name"
                                       placeholder="Прізвище"
                                       name="last_name"></Input>
                            </FormItem>
                            <FormItem class="form-icon form-year" label="Рік народження">
                                <Select v-model="user.customer.birth_year" placeholder="Оберіть рік народження">
                                    <Option v-for="year in years" :value="year" :key="year">{{ year }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="Місце роботи / навчання">
                                <Input class="form-icon form-location" v-model="user.customer.work_place"
                                       placeholder="Місце роботи / навчання"
                                       name="work_place"></Input>
                            </FormItem>
                        </template>
                        <template v-if="user.role == 3">
                            <FormItem label="Назва організації">
                                <Input class="form-icon form-location" v-model="user.customer_org.work_place"
                                       placeholder="Місце роботи / навчання"
                                       name="work_place"></Input>
                            </FormItem>
                            <FormItem label="Ім’я контактної особи">
                                <Input class="form-icon form-person" v-model="user.first_name"
                                       placeholder="Ваше ім’я"
                                       name="first_name"></Input>
                            </FormItem>
                            <FormItem label="Прізвище контактної особи">
                                <Input class="form-icon form-person" v-model="user.last_name"
                                       placeholder="Прізвище"
                                       name="last_name"></Input>
                            </FormItem>
                            <FormItem label="Посада контактної особи">
                                <Input class="form-icon form-person" v-model="user.customer_org.position"
                                       placeholder="Посада"
                                       name="position"></Input>
                            </FormItem>
                        </template>
                        </Col>
                        <Col :sm="24" :lg="12">
                        <FormItem label="Телефон">
                            <Input class="form-icon form-tel" v-model="user.phone"
                                   placeholder="Ваш номер телефону"
                                   name="phone"></Input>
                        </FormItem>
                        <FormItem label="Email">
                            <Input class="form-icon form-email" v-model="user.email" placeholder="Ваш e-mail"
                                   name="email"></Input>
                        </FormItem>
                        <FormItem label="Новий пароль">
                            <Input class="form-icon form-password" v-model="user.password"
                                   placeholder="Пароль"
                                   name="password"></Input>
                        </FormItem>
                        <FormItem label="Повторити пароль">
                            <Input class="form-icon form-password" v-model="user.password_confirmation"
                                   placeholder=""
                                   name="password_confirmation"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <FormItem label="Про мене">
                            <Input type="textarea" v-if="user.role == 2" v-model="user.customer.about"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="Напишіть кілька слів"></Input>
                            <Input type="textarea" v-if="user.role == 3" v-model="user.customer_org.about"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="Напишіть кілька слів"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        <div class="submit" style="text-align:center; margin-bottom:30px;">
            <button @click="submit" class="m_btn_blue_chevron">Зберегти</button>
        </div>
        <div class="volunteer_anketa" v-if="user.role == 4">

        </div>
        <modal name="bann_modal" :width="300" :height="300">
            <div class="modal_login">
                <p class="header">
                    <span>Вкажіть дату та привід блокування</span>
                </p>
                <div class="content">
                    <DatePicker type="date" placeholder="Дата" v-model="ban.date"></DatePicker>
                    <Input v-model="ban.descr" type="textarea" :rows="4" placeholder="Привід блокування.."></Input>

                </div>
                <div class="footer">
                    <button class="m_btn_orange_chevron mt1"
                            @click="user.ban_description=ban.descr; user.banned_before=ban.date;user.is_banned=true;update();$modal.hide('bann_modal')">
                        Заблокувати
                    </button>
                </div>
            </div>
        </modal>


        <modal name="addBonus" :width="300" :height="300">
            <div class="modal_login">
                <p class="header">
                    <span>Вкажіть кількість бонусів</span>
                </p>
                <div class="content">
                    <InputNumber :max="10" :min="1"  :step="1" v-model="bonus"></InputNumber>
                </div>
                <div class="footer">
                    <button class="m_btn_orange_chevron mt1"
                            @click="addBonusCount();$modal.hide('addBonus')">
                        Додати
                    </button>
                </div>
            </div>
        </modal>

        <modal name="addPenalty" :width="300" :height="300">
            <div class="modal_login">
                <p class="header">
                    <span>Вкажіть кількість штрафних годин</span>
                </p>
                <div class="content">
                    <InputNumber :max="10" :min="1"  :step="1" v-model="penalty"></InputNumber>
                </div>
                <div class="footer">
                    <button class="m_btn_orange_chevron mt1"
                            @click="addPenaltyCount();$modal.hide('addPenalty')">
                        Додати
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
                user: {
                    img: '',
                    new_img: false
                },
                bonus:0,
                penalty:0,
                users: {},
                years: [],
                ban: {
                    descr: '',
                    date: null,
                }
            };
        },
        mounted() {
            this.axios.post('/api/get_user/' + this.$route.params.id).then((response) => {
                this.user = response.data;
                this.user.img = 'files/images/' + this.user.img;
                this.user.new_img = false;
                console.log(this.user);
            });
            this.axios.get('/api/users/').then((response) => {
                this.users = response.data;
            });
        },
        created() {
            let cur_year = new Date().getFullYear() - 15;
            for (let i = cur_year; i > cur_year - 100; i--) {
                this.years.push(i);
            }
        },
        watch: {
            '$route'(to, from) {
                this.axios.post('/api/get_user/' + this.$route.params.id).then((response) => {
                    this.user = response.data;
                    this.user.new_img = false;
                    console.log(this.user);
                });
            }
        },
        methods: {
            aprrove() {
                console.log(this.user);
                this.axios.post('/api/approve_user/' + this.$route.params.id, this.user).then((response) => {
                    console.log(response.data);
                });
                this.$Notice.success({
                    title: 'Увага!',
                    desc: 'Данні оновлено'
                });
            },
            submit() {
                console.log(this.user);
                this.axios.post('/api/update_user/' + this.$route.params.id, this.user).then((response) => {
                    console.log(response.data);
                });
                this.$Notice.success({
                    title: 'Увага!',
                    desc: 'Данні оновлено'
                });
                this.$router.push({
                    name: 'admin_users'
                });
            },
            addBonusCount(){
                this.axios.post('/api/set_bonuses/' + this.user.id, {bonus:this.bonus}).then((response) => {
                    console.log(response.data);
                });
                this.$Notice.success({
                    title: 'Увага!',
                    desc: 'Данні оновлено'
                });
            },
            addPenaltyCount(){
                this.axios.post('/api/set_bonuses/' + this.user.id, {penalty:this.penalty}).then((response) => {
                    console.log(response.data);
                });
                this.$Notice.success({
                    title: 'Увага!',
                    desc: 'Данні оновлено'
                });
            },
            update() {
                console.log(this.user);
                this.axios.post('/api/update_user/' + this.$route.params.id, this.user).then((response) => {
                    console.log(response.data);
                });
                this.$Notice.success({
                    title: 'Увага!',
                    desc: 'Данні оновлено'
                });
                this.user.new_img = false;
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
                    vm.user.img = e.target.result;
                    vm.user.new_img = true;
                };
                reader.readAsDataURL(file);
            },
        }
    }
</script>
