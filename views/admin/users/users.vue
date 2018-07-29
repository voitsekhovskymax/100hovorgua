<style lang="less">@import "./../../../css/main.less";</style>

<template>
    <div id="admin_users" class="rating_page">
        <div class="users">
            <Row :gutter="30" class="user" v-for="(user, key, index) in users" v-if="user.role != 1" :key="user.id">
                <Col :xs="4" :sm="4" :md="2" :lg="2">
                <div class="rating-number">{{key}}</div>
                </Col>
                <Col :xs="6" :sm="6" :md="4" :lg="4">
                <img class="rating_img"
                     :src="'files/images/'+user.img"></Col>
                <Col :xs="14" :sm="14" :md="18" :lg="18">
                <div class="rating_info">
                    <template v-if="user.role==3">
                        <p class="rating_name">{{ user.customer_org.work_place }} (Організація)</p>
                        <div class="rating_contact_person">Контактна особа
                            : {{ user.first_name}} {{user.last_name }}
                        </div>
                    </template>
                    <p class="rating_name" v-if="user.role==2"> {{ user.first_name}} {{user.last_name }}
                        (Приватна особа)</p>
                    <p class="rating_name" v-if="user.role==4"> {{ user.first_name}} {{user.last_name }}
                        (Волонтер)</p>
                    <div class="created_at"> Дата реєстрації {{user.created_at}}</div>
                    <p>
                        <span v-if="user.is_approve==1" class="approved">Користувач схвалений</span>
                        <span v-else class="no_approved">Несхвалений користувач</span>
                        <span class="rabbit" v-if="user.volunteer.is_rabbit != null">
                    <img src="/img/icons/bunny.png" alt="Заєць">
                        </span>
                    </p>

                    <div class="">
                        <router-link class="m_btn_blue_chevron" :to="{name:'admin_edit_user', params:{id:user.id}}">
                            Редагувати
                        </router-link>
                    </div>
                </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                users: []
            };
        },
        mounted() {

        },
        computed: {
            sortedArray() {
                return this.users.sort((a, b) => a.updated_at - b.updated_at);
            }
        },
        created() {
            this.axios.get('/api/users/').then((response) => {
                this.users = response.data;
                console.log(this.users);
            });
        },
        methods: {}

    }
</script>
