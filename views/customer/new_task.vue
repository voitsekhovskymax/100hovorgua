<style lang="less">@import "./../../css/main.less";</style>
<style lang="less">@import "./../../css/add_task.less";</style>

<template>
    <div id="customer_add_task" class="page">
        <template v-if="user[0].is_approve==1">
            <div class="container">
                <div class="title_page">Мої завдання</div>
                <div class="m_card">
                    <div class="m_toolbar m_toolbar_orange">
                        <router-link :to="{name:'customer_add_task'}" class="active">Створити завдання</router-link>
                        <router-link :to="{name:'customer_tasks'}">Мої завдання</router-link>
                        <router-link :to="{name:'customer_profile'}">Особистий кабінет</router-link>
                    </div>
                    <div class="m_card_body">
                        <div class="tf-wrap">
                            <label for="">Напишіть назву</label>
                            <Input placeholder="Напишіть назву вашого завдання" v-model="task.name"></Input>
                        </div>
                        <div class="tf-wrap">
                            <label for="">Вiдповiдальний</label>
                            <Input placeholder="Напишіть інформацію відповідального" v-model="task.responsible"></Input>
                        </div>

                        <div class="tf-wrap">
                            <label for="">Оберіть напрям діяльності</label>
                            <Row :gutter="20" class="direction_id">
                                <RadioGroup v-model="task.direction_activity_id">
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                    <Radio label="1"><img src="/img/map-icons/social.png"
                                                          alt=""><span>Соціальна сфера</span></Radio>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                    <Radio label="2"><img src="/img/map-icons/sport.png" alt=""><span>Спорт</span>
                                    </Radio>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                    <Radio label="3"><img src="/img/map-icons/education.png"
                                                          alt=""><span>Освіта</span></Radio>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                    <Radio label="4"><img src="/img/map-icons/medicine.png"
                                                          alt=""><span>Медицина</span></Radio>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                    <Radio label="5"><img src="/img/map-icons/culture.png"
                                                          alt=""><span>Культура</span></Radio>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                    <Radio label="6"><img src="/img/map-icons/tourism.png" alt=""><span>Туризм</span>
                                    </Radio>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                    <Radio label="7"><img src="/img/map-icons/beautification.png"
                                                          alt=""><span>Благоустрій</span>
                                    </Radio>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                    <Radio label="8"><img src="/img/map-icons/ecology.png"
                                                          alt=""><span>Екологія</span></Radio>
                                    </Col>
                                </RadioGroup>
                            </Row>
                        </div>
                        <hr>
                        <br>
                        <div class="tf-wrap">
                            <span><b>Старт:</b></span>
                            <!--<DatePicker type="date" format="yyyy-MM-dd" placeholder="Обрати дату"-->
                            <!--style="width: 120px" v-model="task.start_date"></DatePicker>-->
                            <!--<TimePicker format="HH:mm" :steps="[1, 5]" placeholder="Час" style="width: 75px"-->
                            <!--v-model="task.start_time"></TimePicker>-->

                            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Оберіть дату та час"
                                        style="width: 200px" v-model="task.start"></DatePicker>


                            <span class="ml2"><b>Термін до:</b></span>
                            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Оберіть дату та час"
                                        style="width: 200px" v-model="task.finish"></DatePicker>
                        </div>

                        <div class="tf-wrap"><b>Обсяг необхідного часу:</b>
                            <InputNumber :max="48" :min="1" placeholder="Вкажіть кількість годин"
                                         style="width: 50px" v-model="task.necessary_time"></InputNumber>
                            <span>годин</span></div>
                        <hr>
                        <br>
                        <div class="tf-wrap">
                            <label for="">Тип завдання</label>

                            <RadioGroup v-model="task.type_task">
                                <Row :gutter="20" class="type_id">
                                    <Col :xs="24" :sm="12" :md="12" :lg="12">
                                    <Radio label="1"><img src="/img/icons/ind.png"
                                                          alt=""><span>Індивідуальне</span></Radio>
                                    </Col>
                                    <Col :xs="24" :sm="12" :md="12" :lg="12">
                                    <Radio label="2" class="command_task"><img src="/img/icons/comm.png" alt=""><span>Командне</span>
                                    </Radio>
                                    <p v-if="task.type_task == 2">Введіть кількість участників</p>
                                    <InputNumber v-if="task.type_task == 2" placeholder="Кількість участників"
                                                 width="200px"
                                                 v-model="task.count_members" :max="64" :min="2" :editable="false"
                                                 :value=2>
                                    </InputNumber>

                                    </Col>
                                </Row>
                            </RadioGroup>


                        </div>


                        <div class="tf-wrap">
                            <label for="">Рівень складності:</label>
                            <Row :gutter="20" class="level_id">
                                <RadioGroup v-model="task.level_id">
                                    <Radio label="1"><img src="/img/icons/level0.png" alt=""><span>Юніор (бажання+присутність) вік волонтера 14 - 18 років</span>
                                    </Radio>
                                    <Radio label="2"><img src="/img/icons/level1.png" alt=""><span>Легкий (бажання+присутність)</span>
                                    </Radio>
                                    <Radio label="3"><img src="/img/icons/level2.png" alt=""><span>Середній (бажання+присутність+інвентар)</span>
                                    </Radio>
                                    <Radio label="4"><img src="/img/icons/level3.png" alt=""><span>Складний (бажання+присутність+iнвентар)</span>
                                    </Radio>
                                    <Radio label="5"><img src="/img/icons/level4.png" alt=""><span>Професійний (бажання+присутність+iнвентар+кваліфікація)</span>
                                    </Radio>
                                </RadioGroup>
                            </Row>
                        </div>
                        <div class="tf-wrap">
                            <label for="">Адреса:</label>
                            <P>Для добавления маркера, воспользуйтесь поиском, или кликните правой кнопкой мыши по
                                карте</P>
                            <div class="gmap-place-input">
                                <gmap-place-input class="input_map" :select-first-on-enter="true"
                                                  @place_changed="updatePlace($event)" v-model="task.adress_text"
                                                  placeholder="Адреса"></gmap-place-input>
                            </div>
                            <Gmap-Map style="height: 500px;" :center="maps.center" @rightclick="mapRclicked"
                                      @zoom_changed="updateZoom('zoom', $event)"
                                      :zoom="maps.zoom">
                                <gmap-marker v-if="maps.marker != null" :position="maps.marker.position">
                                </gmap-marker>
                            </Gmap-Map>
                        </div>


                        <div class="tf-wrap">
                            <label for="">Умови успішного виконання:</label>
                            <Input type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                                   placeholder="Опишіть деталі завдання та ваші очікування"
                                   v-model="task.conditions_successful_execution"></Input>
                        </div>

                        <div class="tf-wrap">
                            <label for="">Перелік інвентарю:</label>
                            <Input type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                                   placeholder="Перелік інвентарю для успішного аиконання завдання"
                                   v-model="task.inventory_list"></Input>
                        </div>


                        <div class="tf-wrap">
                            <label for="">Замовник надає</label>
                            <Input type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                                   placeholder="Перелік інвентарю яким будет забезбечений волонтер"
                                   v-model="task.customer_provides"></Input>
                        </div>


                        <div class="tf-wrap">
                            <label for="">Волонтеру взяти з собою:</label>
                            <Input type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                                   placeholder="Вкажіть який інвентар або особливі речі      волонтер має взяти з собою"
                                   v-model="task.volunteer_with"></Input>
                        </div>

                        <div class="tf-wrap">
                            <label for="">Додатково:</label>
                            <Input type="textarea" :autosize="{minRows: 3,maxRows: 5}" v-model="task.additionally"
                                   placeholder="Опишіть, що ще варто знати волонтеру передобранням цього завдання (можливо особливі умови,  гнучкий гарфік виконання,тощо)"></Input>
                        </div>

                        <div class="tf-wrap">
                            <button class="m_btn_blue_chevron mr1" @click="submit()">Створити завдання</button>
                        </div>
                    </div>
                </div>
            </div>
            <modal name="new_task_success"
                   transition="scale"
                   height="auto"
                   :adaptive="true"
                   :width="260"
                   @before-close="beforeClose">
                <div class="new_task_success" style="padding:15px;">
                    <p class="margin-bottom:10px;">Дякуємо за співпрацю!</p>
                    <p>Ваше завдання буде опубліковано на сайті після підтвердження менеджером</p>
                    <p class="m_btn_orange_chevron" @click="newTask">Створити ще завдання </p>
                    <router-link :to="{name:'customer_map'}">Подивитись мапу завдань </router-link:>
                </div>
            </modal>
        </template>
        <template v-else>
            <div class="container" style="padding-top:50px;">
                <Alert type="warning" > Зачекайте підтвердження реєстрації від менеджера. Ви обов'язково отримаєте лист на вказану почту.</Alert>
            </div>
        </template>
    </div>
</template>

<script>

    import Vue from 'vue';
    import * as VueGoogleMaps from 'vue2-google-maps';


    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCqllseCO8TXEejE9m9nbYhbsu4gEjlpEA',
            libraries: 'places',
        }
    });
    export default {
        data() {
            return {
                task: {
                    name: '',
                    responsible: '',
                    direction_activity_id: "1",
                    start: null,
                    finish: null,
                    necessary_time: 1,
                    type_task: "1",
                    count_members: '',
                    level_id: '1',
                    adress_map: null,
                    adress_text: null,
                    conditions_successful_execution: null,
                    inventory_list: '',
                    customer_provides: '',
                    volunteer_with: '',
                    additionally: '',
                },
                maps: {
                    center: {lat: parseFloat(47.09514), lng: parseFloat(37.54131)},
                    zoom: 12,
                    marker: {
                        enabled: false,
                        name: '',
                        position: {
                            lat: null,
                            lng: null
                        },
                    },
                },
                data: [],
                direction: 'social',
                type: '',
                level: '',
                user: {}
            };
        },
        mounted() {

        },
        created() {
            this.axios.get('/api/auth_user').then((response) => {
                this.user = response.data;
                console.log(response.data);
            });
        },
        methods: {
            newTask() {
                location.reload();
            },
            beforeClose(event) {
                event.stop()
            },
            submit() {
                console.log(this.task);
                this.axios.post('/api/tasks', this.task).then((response) => {
                    console.log('response:');
                    console.log(response.data);
                });
                this.$modal.show('new_task_success');
            },
            mapRclicked(mouseArgs) {
                this.maps.marker.enabled = true;
                this.maps.marker.position.lat = mouseArgs.latLng.lat();
                this.maps.marker.position.lng = mouseArgs.latLng.lng();
                this.task.adress_map = [mouseArgs.latLng.lat(), mouseArgs.latLng.lng()];
            },
            updateZoom(field, event) {
                this.maps.zoom = event;
            },
            updatePlace(event) {
                console.log(event);
                this.task.adress_text = event.formatted_address;
                this.task.adress_map = [event.geometry.location.lat(), event.geometry.location.lng()];
                this.maps.marker.enabled = true;
                this.maps.center.lat = event.geometry.location.lat();
                this.maps.center.lng = event.geometry.location.lng();
                this.maps.marker.position.lat = event.geometry.location.lat();
                this.maps.marker.position.lng = event.geometry.location.lng();
            },
            geolocation: function () {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.maps.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            },
        }

    }
</script>
