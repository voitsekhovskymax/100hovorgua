<style lang="less">@import "./../../../css/main.less";</style>
<style lang="less">@import "./../../../css/admin.less";</style>

<template>
    <div id="send_message" class="">

        <div class="mail_form">
            <p class="mb2 mt2">За допомогою цієї сторінки Ви маєте змогу надіслати повідомлення всім участикам проекту.</p>
            <div class="mail_form_control">
                <Select v-model="data.emails" multiple placeholder="Виберіть користувачів">
                    <Option v-for="user in users" :value="user.email" :key="user.id">
                        <img :src="'files/images/'+user.img"
                             style="width:50px; height:50px; object-fit:cover; border-radius:50px; vertical-align:middle;">
                        <div style="display:inline-block  ;   padding-left: 10px;">
                            <p style="margin-bottom: 0px;">{{ user.first_name}} {{user.last_name }}</p>
                            <p style="color:gray; font-size:12px;" v-if="user.role==1">Адміністратор</p>
                            <p style="color:gray; font-size:12px;" v-if="user.role==2 ||user.role==3">Замовник</p>
                            <p style="color:gray; font-size:12px;" v-if="user.role==4">Волонтер</p>
                        </div>
                    </Option>
                </Select>
            </div>
            <div class="mail_form_control">
                <Input v-model="data.message" type="textarea" :autosize="{minRows: 5,maxRows: 8}"
                       placeholder="Введіть повідомлення"></Input>
            </div>

            <button class="m_btn_blue_chevron" @click="sendMail">Надіслати повідомлення</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: {
                    emails: [],
                    message: ''
                },
                users: {}
            };
        },
        mounted() {

        },
        created() {
            this.axios.get('/api/users/').then((response) => {
                this.users = response.data;
                console.log(this.users);
            });
        },
        methods: {
            sendMail() {
                console.log(this.data.emails.length);
                if (this.data.emails.length > 0) {
                    for (let i = 0; i < this.data.emails.length; i++) {
                        console.log(this.data.emails[i]);
                        console.log(this.data.message);
                        this.axios.post('/api/front_send_mail', {
                            mail_to: this.data.emails[i],
                            text: this.data.message
                        }).then((response) => {
                            console.log(response);
                        });
                    }
                    this.$Notice.success({title: 'Повідомлення надіслано'});
                } else {
                    this.$Notice.warning({title: 'Заповніть всі поля'});
                }
            }
        }
    }
</script>
