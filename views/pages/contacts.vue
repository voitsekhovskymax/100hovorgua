<style lang="less">@import "./../../css/main.less";

#volunteering {
    .directions {
        .img {
            display: inline-block;
        }
        .text {
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
                        Контакти
                    </li>
                </ol>
            </nav>
            <div class="single_page">
                <h1 class="page_title">Контакти</h1>
                <p class="contact_subtitle center">Ми відкриті до спілкування та співпраці i з радістю вислухаємо ваші
                    зауваження та пропозиції</p>
                <div class="contact-flex">
                    <Row>

                        <Col :xs="24" :sm="12" :md="12" :lg="12">
                        <div class="center black_link">
                            <img src="img/icons/phone.png" alt="Контакти" title="Контакти" class="contact_img_small">
                            <p><a href="tel:+380973419453">+380973419453</a></p>
                            <p><a href="tel:+380973418846">+380973418846</a></p>
                            <p><a href="tel:+380995293880">+380995293880</a></p>
                            <p><a href="tel:+380995294091">+380995294091</a></p>
                        </div>
                        </Col>
                        <Col :xs="24" :sm="12" :md="12" :lg="12">
                        <div class="center black_link">
                            <img src="img/icons/message.png" alt="Пошта" title="Пошта" class="contact_img_small">
                            <p>
                                <a href="mailto:100hovmrpl@gmail.com">100hovmrpl@gmail.com</a>
                            </p>
                        </div>
                        </Col>
                        <Col span="24">
                        <div class="center">
                            <p>Ми у соціальних мережах:</p>
                            <div class="flex flex-center flex-content-center">
                                <a class="soc-link" href="https://www.youtube.com/channel/UCsU7g-w8BfmyDfF6cAZWOKQ"
                                   target="_blank"><i class="icon icon-youtube"></i></a>
                                <a class="soc-link" href="https://facebook.com/100hovmrpl" target="_blank"><i
                                        class="icon icon-fb"></i></a>
                                <a class="soc-link" href="https://instagram.com/100hovorgua" target="_blank"><i
                                        class="icon icon-insta"></i></a>
                            </div>
                        </div>
                        </Col>
                    </Row>
                </div>
                <div class="row">
                    <div class="mt-15 col-12 center">
                        Ми знаходимось за адресою:
                        м. Маріуполь, вул. Університетська 7,
                        5 корпус ПДТУ, 3 поверх, аудиторія 5.308-а
                    </div>
                    <p class="mt-15 col-12 center" style="font-style: italic;">приміщення надано за підтримки партнера
                        проекту Приазовського державного технічного університету</p>
                    <gmap-map :center="{lat: 47.09548100000001, lng: 37.541093000000046}" :zoom="17"
                              style="width: 100%; height: 80vh">
                        <gmap-marker :position="{lat: 47.09548100000001, lng: 37.541093000000046}"
                                     :clickable="true"
                        ></gmap-marker>
                    </gmap-map>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import * as VueGoogleMaps from 'vue2-google-maps';

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCqllseCO8TXEejE9m9nbYhbsu4gEjlpEA',
            libraries: 'places',
        },
    });
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
