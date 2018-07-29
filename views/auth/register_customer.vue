<style lang="less">
    @import "./../../css/main.less";
    @import "./../../css/auth.less";
</style>
<template>
    <div class="page_register">
        <h1 style="text-align: center">Реєстрація замовника</h1>
        <Row type="flex" justify="center">
            <Tabs size="small" v-model="user.type_user">
                <TabPane label="Я приватна особа">
                    <Form :model="user" label-position="top" ref="userValidator"  :rules="ruleValidate">
                        <Row>
                            <Col :sm="24" :lg="12">
                            <FormItem label="Ім’я"  prop="first_name">
                                <Input class="form-icon form-person" v-model="user.first_name" placeholder="Ваше ім’я"
                                       name="first_name"></Input>
                            </FormItem>
                            <FormItem label="Прізвище"  prop="last_name">
                                <Input class="form-icon form-person" v-model="user.last_name" placeholder="Прізвище"
                                       name="last_name"></Input>
                            </FormItem>
                            <FormItem class="form-icon form-year" label="Рік народження"  prop="birth_year">
                                <Select v-model="user.birth_year"  placeholder="Оберіть рік народження">
                                    <Option v-for="year in years" :value="year" :key="year">{{ year }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="Місце роботи / навчання"  prop="work_place">
                                <Input class="form-icon form-location" v-model="user.work_place"
                                       placeholder="Місце роботи / навчання"
                                       name="work_place"></Input>
                            </FormItem>
                            </Col>
                            <Col :sm="24" :lg="12">
                            <FormItem label="Телефон"  prop="phone">
                                <Input class="form-icon form-tel" v-model="user.phone" placeholder="Ваш номер телефону"
                                       name="phone"></Input>
                            </FormItem>
                            <FormItem label="Email"  prop="email">
                                <Input class="form-icon form-email" v-model="user.email" placeholder="Ваш e-mail"
                                       name="email"></Input>
                            </FormItem>
                            <FormItem label="Пароль"  prop="password">
                                <Input class="form-icon form-password" v-model="user.password" placeholder="Пароль"
                                       name="password"></Input>
                            </FormItem>
                            <FormItem label="Повторити пароль"  prop="password_confirmation" >
                                <Input class="form-icon form-password" v-model="user.password_confirmation"
                                       placeholder=""
                                       name="password_confirmation"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="Я представник організації">
                    <Form :model="user" label-position="top" ref="userValidator"  :rules="ruleValidate">
                        <Row>
                            <Col :sm="24" :lg="12">
                            <FormItem label="Назва організації"  prop="work_place">
                                <Input class="form-icon form-org" v-model="user.work_place"
                                       placeholder="Назва організації"
                                       name="work_place"></Input>
                            </FormItem>
                            <FormItem label="Ім’я"  prop="first_name">
                                <Input class="form-icon form-person" v-model="user.first_name" placeholder="Ваше ім’я"
                                       name="first_name"></Input>
                            </FormItem>
                            <FormItem label="Прізвище"  prop="last_name">
                                <Input class="form-icon form-person" v-model="user.last_name" placeholder="Прізвище"
                                       name="last_name"></Input>
                            </FormItem>
                            <FormItem label="Посада" >
                                <Input class="form-icon form-id" v-model="user.position" placeholder="Посада"
                                       name="last_name"></Input>
                            </FormItem>

                            </Col>
                            <Col :sm="24" :lg="12">
                            <FormItem label="Телефон"  prop="phone">
                                <Input class="form-icon form-tel" v-model="user.phone" placeholder="Ваш номер телефону"
                                       name="phone"></Input>
                            </FormItem>
                            <FormItem label="Email"  prop="email">
                                <Input class="form-icon form-email" v-model="user.email" placeholder="Ваш e-mail"
                                       name="email"></Input>
                            </FormItem>
                            <FormItem label="Пароль"  prop="password">
                                <Input class="form-icon form-password" v-model="user.password" placeholder="Пароль"
                                       name="password"></Input>
                            </FormItem>
                            <FormItem label="Повторити пароль"  prop="password_confirmation">
                                <Input class="form-icon form-password" v-model="user.password_confirmation"
                                       placeholder=""
                                       name="password_confirmation"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>

                </TabPane>
            </Tabs>

        </Row>
        <Row type="flex" justify="center">
            <div class="row">
                <label v-if="image">
                    <img :src="image" class="profile_img">
                    <input type="file" hidden v-on:change="onImageChange" accept="image/x-png,image/gif,image/jpeg" class="form-control">
                </label>
            </div>
        </Row>
        <Row>
            <div class="checkboxes">
                <Checkbox v-model="ch1"> <span>Я згоден/згодна на обробку, зберігання, поширення та використання обсягу  наданих мною  <a
                        href="http://zakon5.rada.gov.ua/laws/show/2297-17" class="link" target="_blank">персональних даних</a> на сайті <a
                        href="http://www.100hov.org.ua" class="link"
                        target="_blank">www.100hov.org.ua</a></span>
                </Checkbox>
                <Checkbox v-model="ch2">   <span>Підтверджую, що ознайомився/ознайомилася з порядком, правилами та вимогами отримання <a
                        href="http://zakon2.rada.gov.ua/laws/show/3236-17" class="link" target="_blank">волонтерської допомоги</a></span>
                </Checkbox>
                <Checkbox v-model="ch3">  <span>Я згоден/згодна на використання фото/відео з моєю участю на сайті <a
                        href="http://www.100hov.org.ua" class="link"
                        target="_blank">www.100hov.org.ua</a> та в соціальних мережах</span>
                </Checkbox>
                <Checkbox v-model="ch4">  <span>Я ознайомився / ознайомилася і приймаю  <router-link class="link"
                                                                                                     :to="{name:'terms'}">Умови користування</router-link> і  <router-link
                        :to="{name:'policy'}"
                        class="link">Політику конфіденційності.</router-link></span>
                </Checkbox>
            </div>
        </Row>
        <Row type="flex" justify="center">
            <template v-if="ch1 == true && ch2 == true && ch3 == true && ch4 ==true ">
                <button class="m_btn_blue_chevron " @click="handleSubmit('userValidator')">Зареєструватись</button>
            </template>
            <template v-else>
                <button class="m_btn_blue_chevron " style="opacity:0.5;">Зареєструватись</button>
            </template>
        </Row>

        <modal name="register_customer_ok" :width="310" :height="230"
               @before-close="beforeClose">>
            <div class="modal_login">
                <p class="header">
                    <span>Реєстрація успішна!</span>
                </p>
                <div class="content">
                    <p>Найближчим часом ви отримаєте підтвердження реєстрації від менеджера  і зможете виконати ваше перше завдання.</p>
                </div>
                <div class="footer mt1">
                    <router-link :to="{name:'map'}" class="m_btn_blue_chevron " >Подивитись мапу завдань</router-link>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ch1: false,
                ch2: false,
                ch3: false,
                ch4: false,
                image: '/img/upload_profile_img.png',
                ruleValidate: {
                    first_name: [
                        {required: true, message: "Будь ласка, введіть ім'я", trigger: 'blur'}
                    ],
                    last_name: [
                        {required: true, message: "Будь ласка, введіть прізвище", trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: "Будь ласка, введіть телефон", trigger: 'blur'},
                        {type: 'string', min: 10, message: 'В форматі 380ХХХХХХХХХ', trigger: 'blur'}
                    ],
                    work_place: [
                        {required: true, message: "Будь ласка, введіть місце роботи / навчання", trigger: 'blur'},
                    ],

                    email: [
                        {required: true, message: "Будь ласка, введіть свій email", trigger: 'blur'},
                        {type: 'email', message: 'Не корректний email', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "Будь ласка, введіть пароль", trigger: 'blur'},
                        {type: 'string', min: 6, message: 'Мінімальная кількість символів : 6', trigger: 'blur'}
                    ],
                    password_confirmation: [
                        {required: true, message: "Будь ласка, введіть пароль", trigger: 'blur'},
                        {type: 'string', min: 6, message: 'Мінімальная кількість символів : 6', trigger: 'blur'}
                    ]
                },
                user: {
                    type_user: 0,
                    first_name: '',
                    last_name: '',
                    position: '',
                    birth_year: null,
                    work_place: '',
                    phone: '',
                    password: '',
                    email: '',
                    password_confirmation: '',
                    img: null
                },
                years: [],
            };
        },
        mounted() {

        },
        created() {
            let cur_year = new Date().getFullYear()
            for (let i = cur_year - 18; i > cur_year - 100; i--) {
                this.years.push(i);
            }
        },
        methods: {
            beforeClose(event) {
                event.stop()
            },
            handleSubmit(name) {
                let validate = true;
                console.log('handleSubmit');
                console.log(name);
                this.$refs[name].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        console.log('valid');
                        // this.$Message.success('Всі поля введені вірно!');
                        // this.$Notice.warning({title: 'Виберіть зображення!'});
                    } else {
                        console.log('un valid');
                        this.$Notice.warning({title: 'Заповніть всі поля'});
                        validate = false;
                    }
                });
                if (this.image == '/img/upload_profile_img.png') {
                    this.$Notice.warning({title: 'Виберіть зображення!'});
                    validate = false;
                }
                if (this.user.password != this.user.password_confirmation) {
                    this.$Notice.warning({title: 'Паролі повинні співпадати!'});
                    validate = false;
                }
                // if (this.user.birth_year == null) {
                //     this.$Notice.warning({title: 'Введіть рік народження'});
                //     validate = false;
                // }
                if (validate) {
                    this.submit();
                }
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
            submit() {
                this.user.img = this.image;
                if (this.user.type_user == 0)
                    this.user.type_user = 2;
                else
                    this.user.type_user = 3;
                console.log('local user ↓');
                console.log(this.user);
                console.log('response ↓');
                this.axios.post('/register', this.user).then((response) => {
                    console.log(response.data);
                    if (typeof response.data === 'number') {
                        this.$Notice.success({
                            title: 'Увага!',
                            desc: 'Вас зареестровано'
                        });
                        this.$modal.show('register_customer_ok');
                    }
                    else {
                        for (let key in response.data) {
                            this.$Notice.warning({
                                title: key ,
                                desc: " Помилка: "+ response.data[key]
                            });
                        }
                    }
                });
            },
            backendValidate(data) {
                let vm = this;
                data.forEach(function (item, i, arr) {
                    console.log(item[0]);
                    console.log(item[1]);
                    let errors = item[0]
                    for (let key in errors) {
                        /* ... делать что-то с obj[key] ... */
                        vm.$Notice.warning({
                            title: key,
                            desc: errors[key]
                        });
                    }

                });
            },
        }
    }
</script>