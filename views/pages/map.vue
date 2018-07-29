<style lang="less">
    @import "./../../css/main.less";
    @import "./../../css/map.less";
</style>

<template>
    <div id="map_page" class="page">
        <Row>
            <div class="map_sidebar">
                <div class="filter">
                    <p class="mb1">
                        <Select v-model="direction" @on-change="filter">
                            <Option :value="0">Всі напрями</Option>
                            <Option :value="1">Соціальна сфера</Option>
                            <Option :value="2">Спорт</Option>
                            <Option :value="3">Освіта</Option>
                            <Option :value="4">Медицина</Option>
                            <Option :value="5">Культура</Option>
                            <Option :value="6">Туризм</Option>
                            <Option :value="7">Благоустрій</Option>
                            <Option :value="8">Екологія</Option>
                        </Select>
                    </p>
                    <p class="mb1">
                        <RadioGroup v-model="type_task" @on-change="filter">
                            <Radio label="0">
                                <span>Всі</span>
                            </Radio>
                            <Radio label="1">
                                <span>Індивідуальні</span>
                            </Radio>
                            <Radio label="2">
                                <span>Командні</span>
                            </Radio>
                        </RadioGroup>
                    </p>
                    <p class="mb1">
                    <p><b>Рівень складності</b></p>
                    <CheckboxGroup v-model="level" @on-change="filter">
                        <Checkbox label="1">
                            <span>Юніор</span>
                        </Checkbox>
                        <Checkbox label="2">
                            <span>Легкий</span>
                        </Checkbox>
                        <Checkbox label="3">
                            <span>Середній</span>-
                        </Checkbox>
                        <Checkbox label="4">
                            <span>Складний</span>
                        </Checkbox>
                        <Checkbox label="5">
                            <span>Професійний</span>
                        </Checkbox>
                    </CheckboxGroup>
                    </p>
                    <p class="mb1">
                    <p><b>Статус завдання</b></p>
                    <CheckboxGroup v-model="task_status" @on-change="filter">
                        <Checkbox label="1">
                            <span>Термінові</span>
                        </Checkbox>
                        <Checkbox label="2">
                            <span>Бонусні</span>
                        </Checkbox>
                    </CheckboxGroup>
                </div>
                <div class="task_list">
                    <div class="task_single_list" v-for="task in tasks"
                         v-if="task.display == true">
                        <template v-if="task.type_state_id != 1">
                            <img :src="task.direction_activity.img" alt="напрям">
                            <div class="task_details">
                                <p>{{task.name}}</p>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="map_container">
                <gmap-map :center="maps.center" :zoom="12">
                    <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
                                      @closeclick="infoWinOpen=false">
                        <div class="marker_info">
                            <img :src="infoContent.direction_activity.img_min" class="image">
                            <div class="title">{{infoContent.name}}</div>
                            <div class="block_icon_marker">
                                <div class="calendar"><img src="/img/icons/icon-calendar.png" alt=""></div>
                                <div class="text">
                                    <p><b> Старт:</b> {{infoContent.start}}</p>
                                    <p><b> Термін до:</b> {{infoContent.finish}}</p>
                                </div>
                            </div>
                            <div class="task_info">
                                <!--<div class="block">-->
                                <!--<img src="/img/icons/time.png" alt="Час">-->
                                <!--<p>{{infoContent.level.count_hours}}</p>-->
                                <!--<p>{{infoContent.level}}</p>-->
                                <!--</div>-->
                                <div class="block" v-if="infoContent.type_task == 2">
                                    <img src="/img/icons/comm.png" alt="Командне">
                                    <p>Командне</p>
                                </div>
                                <div class="block" v-if="infoContent.type_task == 1">
                                    <img src="/img/icons/ind.png" alt="Індивідуальне">
                                    <p>Індивідуальне</p>
                                </div>
                                <div class="block" v-if="infoContent.level_id == 1">
                                    <img src="/img/icons/level0.png" alt="Юніор">
                                    <p>Юніор</p>
                                </div>
                                <div class="block" v-if="infoContent.level_id == 2">
                                    <img src="/img/icons/level1.png" alt="Легкий">
                                    <p>Легкий</p>
                                </div>
                                <div class="block" v-if="infoContent.level_id == 3">
                                    <img src="/img/icons/level2.png" alt="Середній">
                                    <p>Середній</p>
                                </div>
                                <div class="block" v-if="infoContent.level_id == 4">
                                    <img src="/img/icons/level3.png" alt="Складний">
                                    <p>Складний</p>
                                </div>
                                <div class="block" v-if="infoContent.level_id == 5">
                                    <img src="/img/icons/level4.png" alt="Професійний">
                                    <p>Професійний</p>
                                </div>
                            </div>

                            <div class="block_icon_marker">
                                <div class="calendar"><img src="/img/icons/icon-pointer.png" class="pointer" alt="">
                                </div>
                                <div class="text">
                                    {{infoContent.adress_text}}
                                </div>
                            </div>
                        </div>
                    </gmap-info-window>
                    <gmap-marker v-for="task in tasks"
                                 v-if="task.display"
                                 :key="task.id"
                                 :position="{lat:parseFloat(task.adress_map[0]), lng:parseFloat(task.adress_map[1])}"
                                 :clickable="true"
                                 :icon="{url: task.direction_activity.img_min}"
                                 @click="toggleInfoWindow(task,i)"
                    ></gmap-marker>
                </gmap-map>
            </div>
        </Row>


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
                tasks: {},
                maps: {
                    center: {lat: parseFloat(47.09514), lng: parseFloat(37.54131)},
                    zoom: 12,
                    markers: {
                        enabled: false,
                        name: '',
                        position: {
                            lat: null,
                            lng: null
                        },
                    },
                },
                markers: {
                    enabled: false,
                    name: 'marker1',
                    position: {
                        lat: null,
                        lng: null
                    },
                },
                infoContent: {
                    direction_activity: {}
                },
                infoWindowPos: {
                    lat: 0,
                    lng: 0
                },
                infoWinOpen: false,
                currentMidx: null,
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    },
                    maxWidth: 300
                },
                shape: {
                    coords: [10, 10, 10, 15, 15, 15, 15, 10],
                    type: 'poly'
                },
                direction: 0,
                type_task: 0,
                level: [],
                task_status: [],
                user: {}
            };
        },
        mounted() {

        },
        created() {
            this.getTasks('/api/map');
        },
        methods: {
            filter() {

                var date1 = new Date();
                for (let i = 0; i < this.tasks.length; i++) {
                    this.tasks[i].display = false;
                    if (this.tasks[i].type_state_id == 2 || this.tasks[i].type_state_id == 3) {
                        if (this.direction == 0) {
                            if (this.type_task == 0) {
                                if (this.level.length > 0) {
                                    for (let k = 0; k < this.level.length; k++) {
                                        if (this.tasks[i].level_id == this.level[k]) {
                                            if (this.task_status.length > 0) {
                                                for (let k = 0; k < this.task_status.length; k++) {
                                                    if (this.task_status[k] == 1) {
                                                        var date2 = new Date(this.tasks[i].finish);
                                                        if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                            this.tasks[i].display = true;
                                                        }
                                                    }
                                                    if (this.task_status[k] == 1 && this.task_status[k] == 2) {
                                                        var date2 = new Date(this.tasks[i].finish);
                                                        if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                            if (this.tasks[i].extra_bonuses > 0) {
                                                                this.tasks[i].display = true;
                                                            }
                                                        }
                                                    }
                                                    if (this.task_status[k] == 2) {
                                                        if (this.tasks[i].extra_bonuses > 0) {
                                                            this.tasks[i].display = true;
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                this.tasks[i].display = true;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (this.task_status.length > 0) {
                                        for (let k = 0; k < this.task_status.length; k++) {
                                            if (this.task_status[k] == 1) {
                                                var date2 = new Date(this.tasks[i].finish);
                                                if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                    this.tasks[i].display = true;
                                                }
                                            }
                                            if (this.task_status[k] == 1 && this.task_status[k] == 2) {
                                                var date2 = new Date(this.tasks[i].finish);
                                                if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                    if (this.tasks[i].extra_bonuses > 0) {
                                                        this.tasks[i].display = true;
                                                    }
                                                }
                                            }
                                            if (this.task_status[k] == 2) {
                                                if (this.tasks[i].extra_bonuses > 0) {
                                                    this.tasks[i].display = true;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        this.tasks[i].display = true;
                                    }
                                }
                            }
                            else {
                                if (this.tasks[i].type_task == this.type_task) {
                                    if (this.level.length > 0) {
                                        for (let k = 0; k < this.level.length; k++) {
                                            if (this.tasks[i].level_id == this.level[k]) {
                                                if (this.task_status.length > 0) {
                                                    for (let k = 0; k < this.task_status.length; k++) {
                                                        if (this.task_status[k] == 1) {
                                                            var date2 = new Date(this.tasks[i].finish);
                                                            if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                                this.tasks[i].display = true;
                                                            }
                                                        }
                                                        if (this.task_status[k] == 1 && this.task_status[k] == 2) {
                                                            var date2 = new Date(this.tasks[i].finish);
                                                            if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                                if (this.tasks[i].extra_bonuses > 0) {
                                                                    this.tasks[i].display = true;
                                                                }
                                                            }
                                                        }
                                                        if (this.task_status[k] == 2) {
                                                            if (this.tasks[i].extra_bonuses > 0) {
                                                                this.tasks[i].display = true;
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    this.tasks[i].display = true;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (this.task_status.length > 0) {
                                            for (let k = 0; k < this.task_status.length; k++) {
                                                if (this.task_status[k] == 1) {
                                                    var date2 = new Date(this.tasks[i].finish);
                                                    if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                        this.tasks[i].display = true;
                                                    }
                                                }
                                                if (this.task_status[k] == 1 && this.task_status[k] == 2) {
                                                    var date2 = new Date(this.tasks[i].finish);
                                                    if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                        if (this.tasks[i].extra_bonuses > 0) {
                                                            this.tasks[i].display = true;
                                                        }
                                                    }
                                                }
                                                if (this.task_status[k] == 2) {
                                                    if (this.tasks[i].extra_bonuses > 0) {
                                                        this.tasks[i].display = true;
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            this.tasks[i].display = true;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (this.tasks[i].direction_activity_id == this.direction) {
                                if (this.type_task == 0) {
                                    if (this.level.length > 0) {
                                        for (let k = 0; k < this.level.length; k++) {
                                            if (this.tasks[i].level_id == this.level[k]) {
                                                if (this.task_status.length > 0) {
                                                    for (let k = 0; k < this.task_status.length; k++) {
                                                        if (this.task_status[k] == 1) {
                                                            var date2 = new Date(this.tasks[i].finish);
                                                            if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                                this.tasks[i].display = true;
                                                            }
                                                        }
                                                        if (this.task_status[k] == 1 && this.task_status[k] == 2) {
                                                            var date2 = new Date(this.tasks[i].finish);
                                                            if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                                if (this.tasks[i].extra_bonuses > 0) {
                                                                    this.tasks[i].display = true;
                                                                }
                                                            }
                                                        }
                                                        if (this.task_status[k] == 2) {
                                                            if (this.tasks[i].extra_bonuses > 0) {
                                                                this.tasks[i].display = true;
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    this.tasks[i].display = true;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (this.task_status.length > 0) {
                                            for (let k = 0; k < this.task_status.length; k++) {
                                                if (this.task_status[k] == 1) {
                                                    var date2 = new Date(this.tasks[i].finish);
                                                    if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                        this.tasks[i].display = true;
                                                    }
                                                }
                                                if (this.task_status[k] == 1 && this.task_status[k] == 2) {
                                                    var date2 = new Date(this.tasks[i].finish);
                                                    if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                        if (this.tasks[i].extra_bonuses > 0) {
                                                            this.tasks[i].display = true;
                                                        }
                                                    }
                                                }
                                                if (this.task_status[k] == 2) {
                                                    if (this.tasks[i].extra_bonuses > 0) {
                                                        this.tasks[i].display = true;
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            this.tasks[i].display = true;
                                        }
                                    }
                                }
                                else {
                                    if (this.tasks[i].type_task == this.type_task) {
                                        if (this.level.length > 0) {
                                            for (let k = 0; k < this.level.length; k++) {
                                                if (this.tasks[i].level_id == this.level[k]) {
                                                    if (this.task_status.length > 0) {
                                                        for (let k = 0; k < this.task_status.length; k++) {
                                                            if (this.task_status[k] == 1) {
                                                                var date2 = new Date(this.tasks[i].finish);
                                                                if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                                    this.tasks[i].display = true;
                                                                }
                                                            }
                                                            if (this.task_status[k] == 1 && this.task_status[k] == 2) {
                                                                var date2 = new Date(this.tasks[i].finish);
                                                                if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                                    if (this.tasks[i].extra_bonuses > 0) {
                                                                        this.tasks[i].display = true;
                                                                    }
                                                                }
                                                            }
                                                            if (this.task_status[k] == 2) {
                                                                if (this.tasks[i].extra_bonuses > 0) {
                                                                    this.tasks[i].display = true;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        this.tasks[i].display = true;
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if (this.task_status.length > 0) {
                                                for (let k = 0; k < this.task_status.length; k++) {
                                                    if (this.task_status[k] == 1) {
                                                        var date2 = new Date(this.tasks[i].finish);
                                                        if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                            this.tasks[i].display = true;
                                                        }
                                                    }
                                                    if (this.task_status[k] == 1 && this.task_status[k] == 2) {
                                                        var date2 = new Date(this.tasks[i].finish);
                                                        if ((date2 - date1) < 432000000 && (date2 - date1) > 0) {
                                                            if (this.tasks[i].extra_bonuses > 0) {
                                                                this.tasks[i].display = true;
                                                            }
                                                        }
                                                    }
                                                    if (this.task_status[k] == 2) {
                                                        if (this.tasks[i].extra_bonuses > 0) {
                                                            this.tasks[i].display = true;
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                this.tasks[i].display = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            toggleInfoWindow: function (marker, idx) {
                this.infoWindowPos = {lat: parseFloat(marker.adress_map[0]), lng: parseFloat(marker.adress_map[1])};
                this.infoContent = marker;
                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx == idx) {
                    this.infoWinOpen = !this.infoWinOpen;
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                    this.infoWinOpen = true;
                    this.currentMidx = idx;
                }
            },
            getTasks(url) {
                this.axios.get(url).then((response) => {
                    this.tasks = response.data;
                    console.log(this.tasks);
                    for (let i = 0; i < this.tasks.length; i++) {
                        // НЕ ВЫВОДЯТСЯ  задание созданніе и не подтвержденные администратором, и выполненные задания.
                        if(this.tasks[i].type_state_id==1 || this.tasks[i].type_state_id==7){
                            this.tasks[i].display = false;
                        }else{
                            this.tasks[i].display = true;
                        }
                    }
                });
            },
        }
    }
</script>
