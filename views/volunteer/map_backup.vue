<style lang="less">
    @import "./../../css/main.less";
    @import "./../../css/map.less";
</style>

<template>
    <div id="map_page" class="page">
        <Row>
            <div class="map_sidebar">
                <div class="filter">
                    <Select v-model="direction"  @on-change="filter">
                        <Option :value="0">Всі напрями</Option>
                        <Option :value="1">Соціальна сфера</Option>
                        <Option :value="2">Спорт</Option>
                        <Option :value="3">Освіта</Option>
                        <Option :value="4">Медицина</Option>
                        <Option :value="5">Культура</Option>
                        <Option :value="6">Туризм</Option>
                    </Select>
                </div>
                <div class="task_list">
                    <div class="task_single_list" v-for="task in tasks">
                        <img :src="task.direction_activity.img" alt="напрям">
                        <div class="task_details">
                            <p>{{task.name}}</p>
                            <!--<a href="#" class="" @click="toTask(task.id)">Детальніше</a>-->
                            <router-link :to="{name:'volunteer_single_task',params:{id:task.id}}">Детальніше
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="map_container">
                <gmap-map :center="maps.center" :zoom="12" style="width: 100%; height: 80vh">
                    <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
                                      @closeclick="infoWinOpen=false">
                        {{infoContent}}
                    </gmap-info-window>
                    <gmap-marker v-for="(task, i) in tasks"
                                 v-show="task.display == true"
                                 :key="i"
                                 :position="{lat:parseFloat(task.adress_map[0]), lng:parseFloat(task.adress_map[1])}"
                                 :clickable="true"
                                 :draggable="true"
                                 :icon="{url: task.direction_activity.img_min}"
                                 @click="toggleInfoWindow(task,i)"
                                 :shape="shape"></gmap-marker>
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
                infoContent: '',
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
                    }
                },
                shape: {
                    coords: [10, 10, 10, 15, 15, 15, 15, 10],
                    type: 'poly'
                },
                direction: 0,
            };
        },
        mounted() {

        },
        created() {
            this.getTasks('/api/map');
        },
        methods: {
            filter() {
                for (let i = 0; i < this.tasks.length; i++) {
                    console.log('direction_activity_id - '+ this.tasks[i].direction_activity_id);
                    console.log('direction - ' + this.direction);
                    if (this.tasks[i].direction_activity_id != this.direction) {
                        this.tasks[i].display = false;
                    }

                }
            },
            toggleInfoWindow: function (marker, idx) {
                this.infoWindowPos = {lat: parseFloat(marker.adress_map[0]), lng: parseFloat(marker.adress_map[1])};
                this.infoContent = marker.name;
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
                        this.tasks[i].display = true;
                    }
                });
            },
            toTask(id) {
                this.$router.push({
                    name: 'volunteer_single_task',
                    params: {
                        id: id
                    }
                });
            }

        }
    }
</script>
