<style lang="less">@import "./../../css/main.less";</style>

<template>
    <div id="success_story" class="rating_page container">
        <div class="user_success_story">
            <div class="story_img">
                <img :src="'files/images/' + user.img" alt="">
            </div>
            <div class="story_name">
                {{ user.first_name}} {{user.last_name.substr(0,1) }}.
            </div>
            <div class="rating_position">
                <!--№{{key+1}} у загальному рейтингу волонтерів-->
            </div>
            <div>
                <p> {{user.years}} рік. </p>
                <p>{{ user.volunteer.work_place}}</p>
            </div>
            <div class="rating_info">
                <p class="all_time"><img src="/img/icons/clock.png" alt="">

                    <span v-if="user.volunteer.count_hours == null"> 0 </span>
                    <span v-if="user.volunteer.count_hours != null">  {{user.volunteer.count_hours}} </span>
                    годин</p>
                <p class="count_tasks"><img src="/img/icons/flag.png" alt="">{{user.count_task}}
                    завдань</p>
                <p class="bonus"><img src="/img/icons/trophy.png" alt="">{{user.bonus}}
                    годин</p>
                <p class="penalty"><img src="/img/icons/warn.png" alt="">{{user.penalty}} годин</p>
            </div>
            <div class="user_rating">
                <b>Рейтинг довіри</b>
                <Rate disabled show-text allow-half v-model="user.rating">
                    <span style="color: #f5a623">{{ user.rating}}</span>
                </Rate>
            </div>
            <div>
                <p>{{user.phone}}</p>
                <p>{{user.email}}</p>
            </div>

            <div class="about mt2">
                <h3 style="text-align:left;">Про мене</h3>
                <p v-if="user.volunteer.about != null" style="text-align:left;">
                    {{user.volunteer.about}}
                </p>
            </div>
            <div class=" mt2">
                <router-link :to="{name:'success_story', params:{id:user.id}}"
                             class="m_btn_blue_chevron_outline mt1">Історія успіху
                </router-link>
            </div>
        </div>
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

        },
        created() {
            this.axios.post('/api/get_rating/' + this.$route.params.id).then((response) => {
                this.user = response.data;
                this.user.years = new Date().getFullYear() - this.user.volunteer.birth_year;

                console.log(this.user);
            });
        },
        methods: {}
    }
</script>
