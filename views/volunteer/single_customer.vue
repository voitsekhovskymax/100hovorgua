<style lang="less">@import "./../../css/main.less";</style>

<template>
    <div id="single_customer" class="page">
        <div class="content_center">
            <div class="customer_card">
                <img :src="'/files/images/'+customer[0].img" alt="">
                <p class="name">{{customer[0].first_name}} {{customer[0].last_name}}</p>
                <div class="rating">
                    <Rate allow-half v-model="rating" disabled></Rate>
                </div>
                <div class="info">
                    Контактна особа:
                </div>
                <div class="contacts">
                    <div>{{customer[0].phone}}</div>
                    <div>{{customer[0].email}}</div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="about">
                <p class="label">Про замовника</p>
                <p>{{customer[1].about}}</p>
            </div>

            <div class="task_list mt3">
                <div v-for="task in customer[0].tasks" :key="task.id">
                    <div class="img_task">
                        <img :src="task.direction_activity.img" alt="img">
                    </div>
                    <div class="details">
                        <h3 class="title">{{task.name}}</h3>
                        <div class="mt1">
                            <div class="dates">
                                <p>Завдання створене:<b>{{task.created_at}}</b></p>
                                <p v-if="task.type_state !=null">Статус завдання:<b>{{task.type_state.name}}</b></p>

                            </div>
                            <div class="dates i_time_wrap">
                                <p><b>Старт:</b> {{task.start}}</p>
                                <p><b>Термін до:</b> {{task.finish}}</p>
                            </div>
                        </div>
                        <div class="mt1 mb2 details">
                            <span class="i_time mr1"> {{task.level.count_hours}} год.</span>
                            <span class="i_persons mr1" v-if="task.type_task == 1"> Індивідуальне</span>
                            <span class="i_persons mr1" v-else> Командне</span>
                            <span class="level_id mr1">
                                    <img :src="task.level.img" alt="1"> {{task.level.title}}</span>
                        </div>
                        <div class="buttons">
                            <button class="m_btn_blue_chevron mr1" @click="toTask(task.id)">Деталі завдання
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                customer: {}
            };
        },
        mounted() {

        },
        created() {
            this.getCustomer();
        },
        methods: {
            getCustomer() {
                this.axios.get('/api/customers/' + this.$route.params.id + "/edit").then((response) => {
                    this.customer = response.data;
                    console.log(this.customer);
                    let arr_rating = this.customer[1].rating;
                    let sum_rating = 0;
                    let i = 0;
                    for (;i < arr_rating.length; i++) {
                        sum_rating += arr_rating[i].rating;
                    }
                    this.rating = sum_rating/i;
                    console.log(sum_rating);
                    console.log(i);
                    console.log(this.rating);

                });


            },
            toTask(id) {
                console.log(id);
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
