<style lang="less">@import "./../../css/main.less";</style>

<template>
    <div id="settings" class="container">
        <h2>Налаштування</h2>
        <Form :model="settings.settings_json" label-position="top" ref="settingsValidator" :rules="ruleValidate"
              style="max-width:500px; margin: 30px auto; padding:15px;">
            <FormItem label="Email для  повідомлень" prop="admin_email">
                <Input v-model="settings.settings_json.admin_email"></Input>
            </FormItem>
            <FormItem label="Ліміт завданнь для участі волонтера в рейтингу" prop="rating_limit">
                <InputNumber :max="10" :min="1" :step="1" v-model="settings.settings_json.rating_limit"></InputNumber>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('settingsValidator')">Зберегти</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                settings: {
                    admin_email: ''
                },
                ruleValidate: {
                    admin_email: [
                        {required: true, message: "Введіть корректний email", trigger: 'blur'},
                        {type: 'email', message: 'Не корректний email', trigger: 'blur'}
                    ],
                },
            };
        },
        mounted() {

        },
        created() {
            this.axios.get('/api/settings/1/edit').then((response) => {
                console.log(response);
                this.settings = response.data;
            });
        },
        methods: {
            handleSubmit(name) {
                let validate = true;
                this.$refs[name].validate((valid) => {
                    console.log(valid);
                    if (!valid) {
                        this.$Notice.warning({title: 'Заповніть всі поля'});
                        validate = false;
                    }
                });
                if (validate) {
                    this.submit();
                }
            },

            submit() {
                this.axios.patch('/api/settings/1', this.settings).then((response) => {
                    console.log(response);
                    this.$Notice.success({title: 'Данні оновлено'});
                });
            }
        }
    }
</script>
