<style lang="less">@import "./../../css/main.less";</style>

<template>
    <div id="profile_customer" class="page">
        <div class="container">
            <div class="title_page">Особистий кабінет</div>
            <div class="m_card">
                <div class="m_toolbar m_toolbar_orange">
                    <router-link :to="{name:'customer_add_task'}">Створити завдання</router-link>
                    <router-link :to="{name:'customer_tasks'}">Мої завдання</router-link>
                    <router-link :to="{name:'customer_profile'}" class="active">Особистий кабінет</router-link>
                </div>
                <div class="m_card_body">
                    <div class="photo"></div>
                    <div class="form">
                        <Form :model="user" label-position="top">
                            <Row :gutter="16">


                                <Col :sm="24" :lg="12">
                                <template v-if="user[0].role == 2">
                                    <FormItem label="Ім’я">
                                        <Input class="form-icon form-person" v-model="user[0].first_name"
                                               placeholder="Ваше ім’я"
                                               name="first_name"></Input>
                                    </FormItem>
                                    <FormItem label="Прізвище">
                                        <Input class="form-icon form-person" v-model="user[0].last_name"
                                               placeholder="Прізвище"
                                               name="last_name"></Input>
                                    </FormItem>
                                    <FormItem class="form-icon form-year" label="Рік народження">
                                        <Select v-model="user[1].birth_year" placeholder="Оберіть рік народження">
                                            <Option v-for="year in years" :value="year" :key="year">{{ year }}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="Місце роботи / навчання">
                                        <Input class="form-icon form-location" v-model="user[1].work_place"
                                               placeholder="Місце роботи / навчання"
                                               name="work_place"></Input>
                                    </FormItem>
                                </template>
                                <template v-if="user[0].role == 3">
                                    <FormItem label="Назва організації">
                                        <Input class="form-icon form-location" v-model="user[1].work_place"
                                               placeholder="Місце роботи / навчання"
                                               name="work_place"></Input>
                                    </FormItem>
                                    <FormItem label="Ім’я контактної особи">
                                        <Input class="form-icon form-person" v-model="user[0].first_name"
                                               placeholder="Ваше ім’я"
                                               name="first_name"></Input>
                                    </FormItem>
                                    <FormItem label="Прізвище контактної особи">
                                        <Input class="form-icon form-person" v-model="user[0].last_name"
                                               placeholder="Прізвище"
                                               name="last_name"></Input>
                                    </FormItem>
                                    <FormItem label="Посада контактної особи">
                                        <Input class="form-icon form-person" v-model="user[1].position"
                                               placeholder="Посада"
                                               name="position"></Input>
                                    </FormItem>
                                </template>
                                </Col>


                                <Col :sm="24" :lg="12">
                                <FormItem label="Телефон">
                                    <Input class="form-icon form-tel" v-model="user[0].phone"
                                           placeholder="Ваш номер телефону"
                                           name="phone"></Input>
                                </FormItem>
                                <FormItem label="Email">
                                    <Input class="form-icon form-email" v-model="user[0].email" placeholder="Ваш e-mail"
                                           name="email"></Input>
                                </FormItem>
                                <FormItem label="Новий пароль">
                                    <Input class="form-icon form-password" v-model="user[0].password"
                                           placeholder="Пароль"
                                           name="password"></Input>
                                </FormItem>
                                <FormItem label="Повторити пароль">
                                    <Input class="form-icon form-password" v-model="user[0].password_confirmation"
                                           placeholder=""
                                           name="password_confirmation"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <FormItem label="Про мене">
                                    <Input type="textarea" v-model="user[1].about" :autosize="{minRows: 2,maxRows: 5}"
                                           placeholder="Напишіть кілька слів"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <button class="m_btn_orange_chevron mr2" @click="submit">Зберегти
                        </button>
                        <!--<button class="link_orange">Скасувати</button>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';

    export default {

        data() {
            return {
                image: '/img/upload_profile_img.png',
                user: {},
                years: [],
            };
        },
        mounted() {
            this.axios.get('/api/auth_user').then((response) => {
                this.user = response.data;
                console.log(response.data);
            });
        },
        created() {
          this.init();
        },
        methods: {
            init(){
                let cur_year = new Date().getFullYear();
                for (let i = cur_year; i > cur_year - 100; i--) {
                    this.years.push(i);
                }
            },
            submit() {
                this.axios.patch('/api/customers/' + this.user[0].id, this.user).then((response) => {
                    console.log(response.data);
                });
                this.$Notice.success({
                    title: 'Увага!',
                    desc: 'Данні оновлено'
                });
            }
        }

    }
</script>
