<style>
    .links a {
        margin: 15px;
        background: #5c25d9;
        color: #f5f8fa;
        padding: 5px;
    }

    .home_page {
        background: url(../../../public/img/main_bg.jpg);
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center;
        margin-bottom:-30px;
    }

    .btn_home_registration_customer {
        cursor: pointer;
        box-shadow: none;
        color: rgb(255, 255, 255) !important;
        position: relative;
        background: rgb(255, 140, 14);
        border: 1px solid rgb(220, 115, 0);
        border-image: initial;
        transition: background-color 0.3s;
        text-decoration: none;
        padding: 7px 35px 7px 20px;
        font-weight: 700;
        border-radius: 20px;
    }

    .btn_home_registration_customer:before, .btn_home_registration_volunteer:before {
        content: '';
        width: 7px;
        height: 11px;
        background: url(../../../public/img/icons/arrow.png);
        display: block;
        position: absolute;
        right: 18px;
        top: 50%;
        margin-top: -5.5px;
    }

    .btn_home_registration_customer:hover {
        background-color: #dc7300 !important;
    }

    .btn_home_registration_volunteer:hover {
        background-color: #5c25d9 !important;
    }

    .btn_home_registration_volunteer {
        background-color: rgb(105, 47, 237);
        border-color: rgb(92, 37, 217);
        cursor: pointer;
        box-shadow: none;
        color: rgb(255, 255, 255) !important;
        position: relative;
        border-image: initial;
        transition: background-color 0.3s;
        text-decoration: none;
        padding: 7px 35px 7px 20px;
        font-weight: 700;
        border-radius: 20px;
    }

    .home_page_flex {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
    }

    .home_page {
        flex: 1;
    }

    .wrap_customer {
        margin-bottom: 150px;
    }

    .wrap_customer label, .wrap_volunteer label {
        font-weight: 700;
        line-height: 20px;
        margin-bottom: 11px;
        color: white;
        font-size: 14px;
    }

    .wrap_customer p, .wrap_volunteer p {
        font-size: 12px;
        line-height: 20px;
        color: white;
        margin-bottom: 27px;
    }

</style>
<template>
    <div class="home_page_flex">
        <Row type="flex" align="middle" justify="center" class="home_page">
            <Col :xs="{ span: 20, offset: 2 }" :sm="{ span: 9, offset: 3 }" :md="{ span: 9, offset: 3 }"
                 :lg="{ span: 6, offset: 2 }">
            <div class="wrap_customer">
                <label> Краще найменша допомога,<br> ніж найбільше співчуття</label>
                <p class="author">Владислав Лоренц</p>
                <router-link :to="{name:'register_customer'}" v-if="user[0] == null" class="btn_home_registration_customer">Реєстрація
                    Замовника
                </router-link>
            </div>
            </Col>
            <Col :xs="{ span: 20, offset: 2 }" :sm="{ span: 9, offset: 3 }" :md="{ span: 9, offset: 3 }"
                 :lg="{ span: 6, offset: 2 }">
            <div class="wrap_volunteer">
                <label>Роби, що можеш, з тим,<br> що маєш, там, де ти є</label>
                <p class="author">Теодор Рузвельт</p>
                <router-link :to="{name:'register_volunteer'}" v-if="user[0] == null" class="btn_home_registration_volunteer">Реєстрація
                    Волонтера
                </router-link>
            </div>
            </Col>
        </Row>
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
            console.log('home mounted.')
        },
        mounted() {
            this.axios.get('/api/auth_user').then((response) => {
                this.user = response.data;
                console.log(response.data);
            });
        }
    }

</script>