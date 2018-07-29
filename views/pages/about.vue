<style lang="less">@import "./../../css/main.less";

#volunteering {
    .directions{
        .img{    display: inline-block;}
        .text{
            display: inline-block;
            height: 40px;
            vertical-align: bottom;
            margin-left: 5px;
            font-weight: 600;
        }
    }
    .wi {
        position: relative;
        padding-left: 30px;
        &:before {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            background: url(../../../public/img/icons/title-icon.png) no-repeat center center;
            left: 0;
            top: 1px;
        }
    }
}
</style>

<template>
    <div id="about" class="page">
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{name:'home_index'}">Головна</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        Про проект
                    </li>
                </ol>
            </nav>
            <div class="single_page">
                <h1 class="page_title">Про проект</h1>
                <p><strong><span style="color: #ff8c0e;">100 годин волонтерства </span></strong> – це онлайн-платформа, створена для обміну інформацією у сфері волонтерського руху для допомоги некомерційним (громадським, соціальним) ініціативам.</p>
                <h2 class="wi">Ми віримо:</h2>
                <ul>
                    <li>#волонтерство – це модно, цікаво, весело та круто!</li>
                    <li>#кожен може допомогти</li>
                    <li>#для допомоги не потрібні гроші або багато часу</li>
                    <li>#ти сам можеш зробити своє місто кращим!</li>
                </ul>
                <h2 class="wi">Ми у дії:</h2>
                <div class="strong">#ТутВарто шукати помічників.</div>
                <p>У вас є громадська організація або соціальний проект, і вам потрібна допомога? Реєструйтеся та створюйте нове завдання. Ми допоможемо знайти небайдужу людину для його вирішення.</p>
                <div class="strong">#ТутВарто пропонувати свою допомогу. </div>
                <p>Любиш допомагати та хочеш змінити світ на краще? Наша платформа для тебе! Ретельно заповни свій профіль, слідкуй за оновленнями та відповідай на наші запити. Щойно з’явиться цікава задача – ти одразу про неї дізнаєшся.</p><br>
                <div class="flex-list flex flex-center flex-around"><img src="img/usaid.jpg" alt=""><img src="img/city_council.jpg" alt=""><img src="img/sign_maibutn.jpg" alt=""><img src="img/PDTU.jpg" alt=""></div><br><br>
                <p>Проект «100 годин волонтерства» виконується ГО «Майбутнє Маріуполя» в партнерстві з Маріупольською міською радою та Приазовським  державним технічним університетом в рамках проекту «Зміцнення громадської довіри» (UCBI ІІ), що фінансується Агентством США з міжнародного розвитку (USAID).</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: []
            };
        },
        mounted() {

        },
        created() {

        },
        methods: {}

    }
</script>
