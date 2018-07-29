<style lang="less">@import "./../../../css/main.less";</style>
<style lang="less">@import "./../../../css/add_task.less";</style>
<template>
    <div id="customer_add_task" class="page">
        <div class="m_card_body">
            <div class="tf-wrap">
                <label for="">Напишіть назву</label>
                <Input placeholder="Напишіть назву вашого завдання" v-model="task.task.name"></Input>
            </div>
            <div class="tf-wrap">
                <label for="">Вiдповiдальний</label>
                <Input placeholder="Напишіть інформацію відповідального" v-model="task.task.responsible"></Input>
            </div>
            <div class="tf-wrap">
                <label for="">Оберіть напрям діяльності</label>
                <Row :gutter="20" class="direction_id">
                    <RadioGroup v-model="task.task.direction_activity_id" :value="task.task.direction_activity_id">

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
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Оберіть дату та час"
                            style="width: 200px" v-model="task.task.start"></DatePicker>
                <span class="ml2"><b>Термін до:</b></span>
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Оберіть дату та час"
                            style="width: 200px" v-model="task.task.finish"></DatePicker>
            </div>

            <div class="tf-wrap"><b>Обсяг необхідного часу:</b>
                <InputNumber :max="48" :min="1" placeholder="Вкажіть кількість годин"
                             style="width: 50px" v-model="task.task.necessary_time"></InputNumber>
                <span>годин</span></div>
            <hr>
            <br>
            <div class="tf-wrap">
                <label for="">Оберіть напрям діяльності</label>
                <Row :gutter="20" class="type_id">
                    <RadioGroup v-model="task.task.type_task">
                        <Col :xs="24" :sm="12" :md="12" :lg="12">
                        <Radio label="1"><img src="/img/icons/ind.png" alt=""><span>Індивідуальне</span></Radio>
                        </Col>
                        <Col :xs="24" :sm="12" :md="12" :lg="12">
                        <Radio label="2"><img src="/img/icons/comm.png" alt=""><span>Командне</span>
                        </Radio>
                        <InputNumber v-if="task.task.type_task == 2" placeholder="Кількість участників" width="200px"
                                     v-model="task.task.count_members" :max="64" :min="2" :editable="false" >
                        </InputNumber>
                        </Col>

                    </RadioGroup>

                </Row>
            </div>
            <div class="tf-wrap">
                <label for="">Рівень складності:</label>
                <Row :gutter="20" class="level_id">
                    <RadioGroup v-model="task.task.level_id">
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
                <div class="gmap-place-input">
                    <gmap-place-input class="input_map" :select-first-on-enter="true"
                                      @place_changed="updatePlace($event)" v-model="task.task.adress_text"
                                      :default-place="task.task.adress_text"
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
                       v-model="task.task.conditions_successful_execution"></Input>
            </div>
            <div class="tf-wrap">
                <label for="">Перелік інвентарю:</label>
                <Input type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                       placeholder="Перелік інвентарю для успішного аиконання завдання"
                       v-model="task.task.inventory_list"></Input>
            </div>
            <div class="tf-wrap">
                <label for="">Замовник надає</label>
                <Input type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                       placeholder="Перелік інвентарю яким будет забезбечений волонтер"
                       v-model="task.task.customer_provides"></Input>
            </div>
            <div class="tf-wrap">
                <label for="">Волонтеру взяти з собою:</label>
                <Input type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                       placeholder="Вкажіть який інвентар або особливі речі      волонтер має взяти з собою"
                       v-model="task.task.volunteer_with"></Input>
            </div>
            <div class="tf-wrap">
                <label for="">Додатково:</label>
                <Input type="textarea" :autosize="{minRows: 3,maxRows: 5}" v-model="task.task.additionally"
                       placeholder="Опишіть, що ще варто знати волонтеру передобранням цього завдання (можливо особливі умови,  гнучкий гарфік виконання,тощо)"></Input>
            </div>
            <div class="tf-wrap">
                <button class="m_btn_blue_chevron mr1" @click="submit()">Оновити завдання</button>
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
        }
    });
    export default {
        data() {
            return {
                task: {},
                data: [],
                direction: 'social',
                type: '',
                level: '',
                maps: {
                    center: {lat: parseFloat(47.09514), lng: parseFloat(37.54131)},
                    zoom: 15,
                    marker: {
                        enabled: true,
                        name: '',
                        position: {
                            lat: null,
                            lng: null
                        },
                    },
                },
            };
        },
        mounted() {

        },
        created() {
            this.getTask('/api/tasks/' + this.$route.params.id + '/edit');
        },
        methods: {
            getTask(url) {
                this.axios.get(url).then((response) => {
                    this.task = response.data;
                    console.log(this.task);
                    this.task.task.direction_activity_id = this.task.task.direction_activity_id.toString();
                    this.task.task.level_id = this.task.task.level_id.toString();
                    console.log(this.task.task.adress_map[0]);
                    console.log(this.task.task.adress_map[1]);
                    this.maps.center = {
                        lat: parseFloat(this.task.task.adress_map[0]),
                        lng: parseFloat(this.task.task.adress_map[1])
                    };
                    this.maps.marker.position = {
                        lat: parseFloat(this.task.task.adress_map[0]),
                        lng: parseFloat(this.task.task.adress_map[1])
                    };
                });
            },

            submit() {

                this.task.task.customer_update = true;
                console.log(this.task);
                this.axios.patch('/api/tasks/' + this.$route.params.id, this.task.task).then((response) => {
                    console.log('response:');
                    console.log(response.data);
                });
                this.$Notice.success({
                    title: 'Увага!',
                    desc: 'Данні оновлено'
                });
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
                this.task.task.adress_text = event.formatted_address;
                this.task.task.adress_map = [event.geometry.location.lat(), event.geometry.location.lng()];
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
