<style lang="less">
    @import "./../../css/main.less";
    @import "./../../css/auth.less";
</style>
<template>
    <div class="page_register">
        <h1 style="text-align: center">Реєстрація волонтера</h1>
        <!--<button @click="panel=2">clk</button>-->
        <div class="register-step">
            <!--<div class="register-step-block active ">-->
            <template v-if="panel==1">
                <div class="register-step-block active ">
                    <div class="register-step-number">1</div>
                    <div class="register-step-title">Вкажіть особисті дані</div>
                </div>
                <div class="register-step-arrow"></div>
                <div class="register-step-block">
                    <div class="register-step-number">2</div>
                    <div class="register-step-title">Заповніть анкету</div>
                </div>
            </template>
            <template v-else>
                <div class="register-step-block  ">
                    <div class="register-step-number">1</div>
                    <div class="register-step-title">Вкажіть особисті дані</div>
                </div>
                <div class="register-step-arrow"></div>
                <div class="register-step-block active">
                    <div class="register-step-number">2</div>
                    <div class="register-step-title">Заповніть анкету</div>
                </div>
            </template>
        </div>
        <transition name="fade">
            <div v-if="panel == 1" key="1">
                <Form :model="user" ref="userValidator" label-position="top" :rules="ruleValidate">
                    <Row>
                        <Col :sm="24" :lg="12">
                        <FormItem label="Ім’я" prop="first_name">
                            <Input class="form-icon form-person" v-model="user.first_name" placeholder="Ваше ім’я"
                                   name="first_name"></Input>
                        </FormItem>
                        <FormItem label="Прізвище" prop="last_name">
                            <Input class="form-icon form-person" v-model="user.last_name" placeholder="Прізвище"
                                   name="last_name"></Input>
                        </FormItem>
                        <FormItem class="form-icon form-year" label="Рік народження" prop="birth_year">
                            <Select v-model="user.birth_year"   placeholder="Оберіть рік народження">
                                <Option v-for="year in years" :value="year" :key="year">{{ year }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="Місце роботи / навчання" prop="work_place">
                            <Input class="form-icon form-location" v-model="user.work_place"
                                   placeholder="Місце роботи / навчання"
                                   name="work_place"></Input>
                        </FormItem>
                        </Col>
                        <Col :sm="24" :lg="12">
                        <FormItem label="Телефон" prop="phone">
                            <Input class="form-icon form-tel" v-model="user.phone" placeholder="Ваш номер телефону"
                                   name="phone"></Input>
                        </FormItem>
                        <FormItem label="Email" prop="email">
                            <Input class="form-icon form-email" v-model="user.email" placeholder="Ваш e-mail"
                                   name="email"></Input>
                        </FormItem>
                        <FormItem label="Пароль" prop="password">
                            <Input class="form-icon form-password" v-model="user.password" placeholder="Пароль"
                                   name="password"></Input>
                        </FormItem>
                        <FormItem label="Повторити пароль" prop="password_confirmation">
                            <Input class="form-icon form-password" v-model="user.password_confirmation" placeholder=""
                                   name="password_confirmation"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                        <FormItem label="Посилання на соціальну мережу" prop="social_link">
                            <Input class="form-icon form-social" v-model="user.social_link"
                                   placeholder="Посилання на соціальну мережу"
                                   name="password_confirmation"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style="margin:30px 0;">
                        <div class="row">
                            <label v-if="image">
                                <img :src="image" class="profile_img">
                                <input type="file" hidden v-on:change="onImageChange" class="form-control">

                            </label>
                        </div>
                    </Row>
                    <Row>
                        <div class="checkboxes">
                            <CheckboxGroup v-model="allchecked">
                                <Checkbox label="ch1">
                                <span>Я згоден/згодна на обробку, зберігання, поширення та використання обсягу  наданих мною  <a
                                        href="http://zakon5.rada.gov.ua/laws/show/2297-17" class="link" target="_blank">персональних даних</a> на сайті <a
                                        href="http://www.100hov.org.ua" class="link"
                                        target="_blank">www.100hov.org.ua</a></span>
                                </Checkbox>
                                <Checkbox label="ch2">
                                <span>Підтверджую, що ознайомився/ознайомилася з порядком, правилами та вимогами отримання <a
                                        href="http://zakon2.rada.gov.ua/laws/show/3236-17" class="link" target="_blank">волонтерської допомоги</a></span>
                                </Checkbox>
                                <Checkbox label="ch3">
                                <span>Я згоден/згодна на використання фото/відео з моєю участю на сайті <a
                                        href="http://www.100hov.org.ua" class="link"
                                        target="_blank">www.100hov.org.ua</a> та в соціальних мережах</span>
                                </Checkbox>
                                <Checkbox label="ch4">
                                <span>Я ознайомився / ознайомилася і приймаю  <router-link class="link"
                                                                                           :to="{name:'terms'}">Умови користування</router-link> і  <router-link
                                        :to="{name:'policy'}"
                                        class="link">Політику конфіденційності.</router-link></span>
                                </Checkbox>
                            </CheckboxGroup>
                        </div>
                    </Row>
                    <Row type="flex" justify="center">
                        <button class="m_btn_blue_chevron mt1" :disabled="next_btn==true"
                                @click.prevent="handleSubmit('userValidator')">
                            Наступний крок
                        </button>
                    </Row>
                </Form>
            </div>
            <div v-if="panel == 2" key="2">
                <Form :model="user.info_json" label-position="top" class="anket">
                    <FormItem label="1. Ви маєте досвід волонтерства?">
                        <RadioGroup v-model="user.info_json.experience">
                            <Radio label="Так"></Radio>
                            <Radio label="Ні"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="2. Ваша стать">
                        <RadioGroup v-model="user.info_json.gender">
                            <Radio label="Жіноча"></Radio>
                            <Radio label="Чоловіча"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label=" 3. Яким напрямом волонтерської діяльності ви бажаєте
                    займатись?">
                        <CheckboxGroup v-model="user.info_json.direction">
                            <Checkbox label="Благоустрій"></Checkbox>
                            <Checkbox label="Культура"></Checkbox>
                            <Checkbox label="Туризм"></Checkbox>
                            <Checkbox label="Екологія"></Checkbox>
                            <Checkbox label="Освіта"></Checkbox>
                            <Checkbox label="Спорт"></Checkbox>
                            <Checkbox label="Соціальна сфера"></Checkbox>
                            <Checkbox label="Медицина"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="4. Кількість годин, які ви плануєте приділити виконанню одного
                                        завдання?">
                        <RadioGroup v-model="user.info_json.hours">
                            <Radio label="1 - 2 години"></Radio>
                            <Radio label="2 - 3 години"></Radio>
                            <Radio label="більше 3 годин"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="5. Район міста, в якому ви готові виконувати завдання">
                        <CheckboxGroup v-model="user.info_json.district">
                            <Checkbox label="Центральний"></Checkbox>
                            <Checkbox label="Лівобережний"></Checkbox>
                            <Checkbox label="Кальміуський"></Checkbox>
                            <Checkbox label="Приморський"></Checkbox>
                            <Checkbox label="В будь-якому районі"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="6. Ви плануєте у разі запрошення приймати участь у навчальних
                                        тренінгах?">
                        <RadioGroup v-model="user.info_json.training">
                            <Radio label="Так"></Radio>
                            <Radio label="Ні"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="7. Скільки часу ви готові присвятити навчальним тренінгам?">
                        <RadioGroup v-model="user.info_json.training_hours">
                            <Radio label="1 - 2 години"></Radio>
                            <Radio label="2 - 3 години"></Radio>
                            <Radio label="більше 3 годин"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="8. Як ви дізнались про наш проект?">
                        <CheckboxGroup v-model="user.info_json.find_project">
                            <Checkbox label="Від друзів, знайомих"></Checkbox>
                            <Checkbox label="В соціальній мережі"></Checkbox>
                            <Checkbox label="З реклами"></Checkbox>
                            <Checkbox label="Зі ЗМІ"></Checkbox>
                        </CheckboxGroup>
                        <Checkbox @on-change="find_input = !find_input">Інше</Checkbox>
                    </FormItem>
                    <FormItem label="">
                        <Input v-model="user.info_json.find_project_other" v-if="find_input" placeholder="Інше"></Input>
                    </FormItem>
                </Form>
                <Row type="flex" justify="center">
                    <button class="m_btn_blue_chevron" @click="submit">
                        Зареєструватись
                    </button>
                </Row>
            </div>
        </transition>
        <modal name="register_volunteer_ok" :width="300" :height="250"
               @before-close="beforeClose">>
            <div class="modal_login">
                <p class="header">
                    <span>Реєстрація успішна!</span>
                </p>
                <div class="content">
                    <p>Найближчим часом ви отримаєте підтвердження реєстрації від менеджера і зможете виконати ваше
                        перше завдання.</p>
                </div>
                <div class="footer mt1">
                    <router-link :to="{name:'map'}" class="link">Подивитись мапу завдань</router-link>
                </div>
            </div>
        </modal>

    </div>
</template>


<script>
    export default {
        data() {
            return {
                panel: 1,
                allchecked: [],
                image: '/img/upload_profile_img.png',
                find_input: false,
                next_btn: true,
                ruleValidate: {
                    first_name: [
                        {required: true, message: "Будь ласка, введіть ім'я", trigger: 'blur'}
                    ],
                    last_name: [
                        {required: true, message: "Будь ласка, введіть прізвище", trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: "Будь ласка, введіть телефон", trigger: 'blur'},
                        {type: 'string', min: 9, message: 'В форматі 380ХХХХХХХХХ', trigger: 'blur'}
                    ],
                    work_place: [
                        {required: true, message: "Будь ласка, введіть місце роботи / навчання", trigger: 'blur'},
                    ],
                    birth_year: [

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
                        {required: true, message: "Будь ласка, повторіть пароль", trigger: 'blur'},
                        {type: 'string', min: 6, message: 'Мінімальная кількість символів : 6', trigger: 'blur'}
                    ]
                },
                user: {
                    type_user: 4,
                    first_name: null,
                    last_name: null,
                    position: '',
                    birth_year: null,
                    work_place: '',
                    phone: '',
                    password: '',
                    email: '',
                    social_link: '',
                    password_confirmation: '',
                    img: null,
                    info_json: {
                        experience: '',
                        gender: "",
                        direction: [],
                        hours: '',
                        district: [],
                        training: '',
                        training_hours: '',
                        find_project: [],
                        find_project_input: ""
                    },
                },
                years: [],
            };
        },
        mounted() {

        },
        watch: {
            allchecked: function (val) {
                console.log(val.length);
                if (val.length == 4) {
                    this.next_btn = !this.next_btn;
                }
            },
        },
        created() {
            let cur_year = new Date().getFullYear() - 15;
            for (let i = cur_year; i > cur_year - 100; i--) {
                this.years.push(i);
            }
        },
        methods: {
            beforeClose(event) {
                event.stop()
            },
            // validator(){
            //     let validate = true;
            //     if(this.image == '/img/upload_profile_img.png'){
            //         this.$Notice.warning({ title: 'Виберіть зображення!'});
            //         validate = false;
            //     }
            //     if( this.user.first_name== ''){
            //         this.$Notice.warning({ title: "Введіть Ім'я"});
            //         validate = false;
            //     }
            //     if( this.user.last_name== ''){
            //         this.$Notice.warning({ title: "Введіть Прізвище"});
            //         validate = false;
            //     }
            //     if( this.user.birth_year== null){
            //         this.$Notice.warning({ title: "Оберіть рік народження"});
            //         validate = false;
            //     }
            //     if( this.user.work_place== ''){
            //         this.$Notice.warning({ title: "Введіть місце роботи / навчання"});
            //         validate = false;
            //     }
            //     if( this.user.phone== ''){
            //         this.$Notice.warning({ title: "Введіть телефон"});
            //         validate = false;
            //     }
            //     if(validate){
            //         this.panel = 2;
            //     }
            // },
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
                if (this.user.birth_year == null) {
                    this.$Notice.warning({title: 'Введіть рік народження'});
                    validate = false;
                }
                if (validate) {
                    this.panel = 2;
                }
            },
            show_find_input() {
                console.log('changed')
            },
            submit() {
                this.user.img = this.image;
                console.log('local user ↓');
                console.log(this.user);
                console.log('response ↓');
                this.$modal.show('register_volunteer_ok');
                this.axios.post('/register', this.user).then((response) => {
                    console.log(response);
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
            uploadImage() {
                console.log(this.image);
                this.axios.post('/image/store', {image: this.image}).then(response => {
                    if (response.data.success) {
                        alert(response.data.success);
                    }
                });
            },
        }
    }
</script>