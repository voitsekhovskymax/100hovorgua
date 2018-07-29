<style lang="less">
    @import "./../css/main.less";

    .layout-footer-center {
        text-align: center;
        margin-top: 150px;
    }
    div.locale{
        padding:30px;
        background:gray;
    }
</style>
<template>
    <div class="layout">
        <!--<div class="locale">-->
            <!--{{  $t('home') }}-->
        <!--</div>-->
        <!--<RadioGroup :value="lang" @on-change="handleSwitch" vertical>-->
            <!--<Radio label="uk-UA">-->
                <!--<span>Українська</span>-->
            <!--</Radio>-->
            <!--<Radio label="ru-RU">-->
                <!--<span>Русский</span>-->
            <!--</Radio>-->
        <!--</RadioGroup>-->
        <div class="site_layout">
            <div class="m_header">
                <div class="container top_header">
                    <Row type="flex" justify="space-between" align="middle" class="">
                        <Col>
                        <div class="logo_wrapper">
                            <router-link :to="{ name: 'home_index'}">
                                <img src="/img/logo.png" alt="Волонтерство" title="Логотип">
                                <div class="logo_text">
                                    <div class="logo_text_line_1">100 годин</div>
                                    <div class="logo_text_line_2">волонтерства</div>
                                </div>
                            </router-link>
                        </div>
                        </Col>
                        <Col>
                        <div class="m_login" v-if="login_wrap">
                            <button class="m_btn_orange_chevron"
                                    @click="modalshow('login_modal')">Увійти
                            </button>

                        </div>

                        <div class="header-login" v-else>
                            <img class="header-login-img" width="30" height="30"
                                 :src="'files/images/'+user[0].img"><span
                                class="header-login-title"> {{user[0].first_name}}</span>
                            <ul class="header-login-menu" style="display: none">
                                <!--Администратор-->
                                <template v-if="user[0].role == 1">
                                    <li>
                                        <router-link :to="{ name: 'admin_tasks'}">Завдання</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'admin_users'}">Користувачі</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'admin_news'}">Новини</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'admin_messages'}">Повідомлення</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'admin_settings'}">Налаштування</router-link>
                                    </li>
                                </template>
                                <!--Обычный заказчик-->
                                <template v-if="user[0].role == 2">
                                    <li>
                                        <router-link :to="{ name: 'customer_add_task'}">Створити завдання</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'customer_tasks'}">Мої завдання</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'customer_profile'}">Особиста інформація</router-link>
                                    </li>
                                </template>
                                <!--Организация заказчик-->
                                <template v-if="user[0].role == 3">
                                    <li>
                                        <router-link :to="{ name: 'customer_add_task'}">Створити завдання</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'customer_tasks'}">Мої завдання</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'customer_profile'}">Особиста інформація</router-link>
                                    </li>
                                </template>
                                <!--Волонтер-->
                                <template v-if="user[0].role == 4">
                                    <li>
                                        <router-link :to="{ name: 'volunteer_achievement'}">Мої досягення</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'volunteer_tasks'}">Мої завдання</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'volunteer_profile'}">Особиста інформація
                                        </router-link>
                                    </li>
                                </template>


                                <li><a href="#"
                                       @click="logout">Вихід</a>
                                </li>
                            </ul>
                        </div>
                        </Col>
                    </Row>
                </div>
                <div class="menu_wrap">
                    <div class="container">
                        <nav class="mobile-menu">
                            <label for="show-menu" class="show-menu"><span>Меню</span>
                                <div class="lines"></div>
                            </label>
                            <input type="checkbox" id="show-menu">
                            <ul id="menu">
                                <li>
                                    <template v-if="user[0] != null">
                                        <router-link :to="{name:'customer_map'}"
                                                     v-if="user[0].role == 2 || user[0].role == 3  ">
                                            Мапа
                                            завдань
                                        </router-link>
                                        <router-link :to="{name:'volunteer_map'}" v-if="user[0].role == 4">Мапа завдань
                                        </router-link>
                                        <router-link :to="{name:'admin_map'}" v-if="user[0].role == 1">Мапа завдань
                                        </router-link>
                                    </template>
                                    <template v-else>
                                        <router-link :to="{name:'map'}">Мапа завдань</router-link>
                                    </template>

                                </li>
                                <li>
                                    <router-link :to="{name:'volunteering'}">Волонтерство</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'rating'}">Рейтинг волонтерів</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'about'}">Про проект</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'news'}">Новини</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'contacts'}">Контакти</router-link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="site_content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
            <div class="site_footer">
                <div class="container">
                    <Row>
                        <Col :xs="24" :sm="12" :md="6" :lg="6">
                        <div class="phone">
                            <a href="tel:+380973419453">+380973419453</a>
                            <a href="tel:+380973418846">+380973418846</a>
                            <a href="tel:+380995294091">+380995294091</a>
                        </div>
                        <div class="email">
                            <a href="mailto:100hovmrpl@gmail.com">100hovmrpl@gmail.com</a>
                        </div>
                        </Col>
                        <Col :xs="24" :sm="12" :md="6" :lg="6">
                        <p class='black_link'>
                            <router-link :to="{name:'about'}">Про проект</router-link>
                        </p>
                        <p class='black_link'>
                            <router-link :to="{name:'volunteering'}">Волонтерство</router-link>
                        </p>

                        </Col>
                        <Col :xs="24" :sm="12" :md="6" :lg="6">
                        <p class='black_link'>
                            <router-link :to="{name:'customer_map'}" v-if="user.role == 2 || user.role == 3  ">Мапа
                                завдань
                            </router-link>
                        </p class='black_link'>
                        <p class='black_link'>
                            <router-link :to="{name:'volunteer_map'}" v-if="user.role == 4">Мапа завдань</router-link>
                        </p>
                        <p class='black_link'>
                            <router-link :to="{name:'admin_map'}" v-if="user.role == 1">Мапа завдань</router-link>
                        </p>
                        <p class='black_link'>
                            <router-link :to="{name:'map'}" v-if="user.role == 0">Мапа завдань</router-link>
                        </p>
                        <p class='black_link'>
                            <router-link :to="{name:'news'}">Новини</router-link>
                        </p>
                        <p class='black_link'>
                            <router-link :to="{name:'contacts'}">Контакти</router-link>
                        </p>
                        </Col>
                        <Col :xs="24" :sm="12" :md="6" :lg="6">
                        <p class='black_link'>
                            <a href="http://webstud.com.ua/" target="_blank">
                                Створення сайту студія "Сомельє", 2018</a></p>
                        </Col>
                    </Row>
                    <Row>
                        <div class="center mt3">
                            <p>Ми у соціальних мережах:</p>
                            <div class="flex flex-center flex-content-center">
                                <a class="soc-link" href="https://www.youtube.com/channel/UCsU7g-w8BfmyDfF6cAZWOKQ"
                                   target="_blank"><i class="icon icon-youtube"></i></a>
                                <a class="soc-link" href="https://facebook.com/100hovmrpl" target="_blank"><i
                                        class="icon icon-fb"></i></a>
                                <a class="soc-link" href="https://instagram.com/100hovorgua" target="_blank"><i
                                        class="icon icon-insta"></i></a>
                            </div>
                            <p class="mt3 mb3">Під час передруку матеріалів активне посилання на <a
                                    href="https://100hov.org.ua ">100hov.org.ua</a> обов`язкове</p>
                        </div>
                    </Row>
                </div>
            </div>
        </div>

        <modal name="login_modal" :width="300" :height="350">
            <div class="modal_login">
                <p class="header">
                    <span>Увійти на сайт</span>
                </p>
                <div class="content">
                    <Input class="email" v-model="auth.email" placeholder="email"></Input>
                    <Input class="password" v-model="auth.password"
                           placeholder="Введіть пароль"></Input>
                    <Checkbox class="checkbox" v-model="auth.remember">Запам'ятати мене</Checkbox>
                    <button class="m_btn_orange_chevron"
                            @click="login">
                        Увійти
                    </button>
                </div>
                <div class="footer_login">
                    <p class="mt1"><a href="#" @click="showResetModal" class="link">Нагадати пароль</a></p>
                    <p class="mt2">Ще не зареєстровані?</p>
                    <p class=""><a href="#" @click="goto('home_index')" class="link">Приєднуйтесь до спільноти</a></p>
                </div>
            </div>
        </modal>

        <modal name="reset_modal" :width="300" :height="240">
            <div class="modal_login">
                <p class="header">
                    <span>Нагадати пароль</span>
                </p>
                <div class="content">
                    <p>Вкажіть ваш email щоб отримати на пошту нагадування паролю</p>
                    <Input class="email" v-model="auth.email" placeholder="email"></Input>
                </div>
                <div class="footer">
                    <button class="m_btn_orange_chevron"
                            @click="resetPassword">
                        Нагадати
                    </button>
                </div>
            </div>
        </modal>

        <modal name="reset_modal_ok" :width="300" :height="220">
            <div class="modal_login">
                <p class="header">
                    <span>На вказану електронну адресу  відправлене посилання  для відновлення пароля</span>
                </p>
                <div class="content">
                    <p>Перевірте, будь ласка, пошту</p>
                </div>
                <div class="footer">
                    <button class="m_btn_orange_chevron mt1"
                            @click="reset_modal_ok_close">
                        ОК
                    </button>
                </div>
            </div>
        </modal>

        <modal name="blocked"
               transition="scale"
               height="auto"
               :adaptive="true"
               :width="260"
               @before-close="beforeClose">
            <div class="blocked_info" v-if="user[0]  != null">
                <p><b>{{user[0].first_name}} {{user[0].last_name}}</b></p>
                <p>Ви заблоковані до {{user[0].banned_before}}</p>
                <p>{{user[0].ban_description}}</p>
                <a href="#" @click="logout">Вихід</a>
            </div>
        </modal>

    </div>
</template>


<script>
    import Cookies from 'js-cookie';
    import Vue from 'vue';
    export default {
        data() {
            return {
                showLoginModal: false,
                modal_loading: false,
                auth: {
                    email: '',
                    password: '',
                    remember: true
                },
                user: {
                    role: 0
                },
                lang: 'ru_RU',
                login_wrap: true,
            };
        },
        mounted() {

        },
        created() {
            this.axios.get('/api/auth_user').then((response) => {
                this.user = response.data;
                if (this.user[0] === null) {
                    this.login_wrap = true;
                } else {
                    this.login_wrap = false;
                }
                console.log(response.data);
                console.log(this.user[0].is_banned);
                if (this.user[0].is_banned == true) {
                    this.$modal.show('blocked');
                }
            });
        },
        beforeRouteUpdate(to, from, next) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
            next();
        },
        methods: {
            beforeClose(event) {
                event.stop()
            },
            handleSwitch (lang) {
                this.lang = lang;
                localStorage.lang = lang;
                this.$store.commit('switchLang', lang); // 如果你要自己实现多语言切换，那么只需要执行这行代码即可，修改语言类型

                this.columnsI18n = [
                    {
                        key: 'name',
                        title: this.$t('name')
                    },
                    {
                        key: 'company',
                        title: this.$t('company')
                    }
                ];
            },
            modalshow(name_modal) {
                this.$modal.show(name_modal);
            },
            goto(name_route) {
                this.$modal.hide('login_modal');
                this.$router.push({name: name_route,});
            },
            showResetModal() {
                this.$modal.hide('login_modal');
                this.$modal.show('reset_modal');
            },
            resetPassword() {
                console.log(this.auth.email);
                this.axios.post('/password/email', {email: this.auth.email}).then(response => {
                    console.log(response);
                });

                this.$modal.hide('reset_modal');
                this.$modal.show('reset_modal_ok');
            },
            reset_modal_ok_close() {
                this.$modal.hide('reset_modal_ok');
            },
            login() {
                // this.showLoginModal = false;
                this.axios.post('/login', this.auth).then(response => {
                    console.log(response);
                    this.user = response.data;
                    if (response.data == -1) {
                        this.$Notice.error({
                            title: 'Помилка',
                            desc: 'Невірно введений email  або пароль'
                        });
                    }
                    else{
                        if (this.user[0].role) {
                            this.user = response.data;
                            this.login_wrap = false;
                            this.$modal.hide('login_modal');
                            this.$Notice.success({
                                title: 'Успішно',
                                desc: 'Ви ввійшли до системи'
                            });
                            if (this.user[0].is_banned == true) {
                                this.modalshow('blocked');
                            }
                            else {
                                if (this.user[0].role == 2 || this.user[0].role == 3) {
                                    this.$router.push({
                                        name: 'customer_tasks',
                                    });
                                }
                                else if (this.user[0].role == 4) {
                                    this.$router.push({
                                        name: 'volunteer_tasks',
                                    });
                                }
                                else if (this.user[0].role == 1) {
                                    this.$router.push({
                                        name: 'admin_tasks',
                                    });
                                }
                            }

                        }
                    }

                });
            },
            logout() {
                this.axios.post('/logout', this.user).then(response => {
                    console.log(response.data);
                    Cookies.remove('user');
                    location.reload();
                });
            }

        }
    }
</script>