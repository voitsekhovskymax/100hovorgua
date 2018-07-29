<style lang="less">@import "./../../../css/main.less";
</style>

<template>
    <div id="add_news" class="page">
        <h2 style="text-align:center; margin-bottom:45px; padding-top:30px;">{{page.title}}</h2>
        <div>
            <textarea id="articlePostUpdate"></textarea>
        </div>
        <button @click="submit" style="margin:15px;" class="m_btn_blue_chevron">Оновити сторінку</button>
    </div>
</template>

<script>
    import tinymce from 'tinymce';

    export default {
        data() {
            return {
                page: {},
            };
        },
        mounted() {
            this.getPage();
        },
        destroyed() {
            tinymce.get('articlePostUpdate').destroy();
        },
        created() {

        },
        methods: {
            getPage() {
                this.axios.get('/api/pages/' + this.$route.params.id + '/edit').then((response) => {
                    this.page = response.data;
                    console.log(this.page);
                    let vm = this;
                    let height = 600;
                    tinymce.init({
                        selector: '#articlePostUpdate',
                        branding: false,
                        elementpath: false,
                        language: 'uk_UA',
                        height: height,

                        menubar: 'edit insert view format table tools',
                        plugins: [
                            'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                            'searchreplace visualblocks visualchars code fullpage',
                            'insertdatetime media nonbreaking save table contextmenu directionality',
                            'paste textcolor colorpicker textpattern imagetools codesample'
                        ],
                        relative_urls: false,
                        content_css: '/css/tinymce_fix.css',
                        toolbar1: ' formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
                        toolbar2: ' advlist autolink lists link image charmap  preview hr anchor pagebreak | searchreplace wordcount visualblocks visualchars code  | insertdatetime media nonbreaking  table contextmenu directionality | template paste textcolor colorpicker textpattern imagetools toc  hr',
                        autosave_interval: '20s',
                        image_advtab: true,
                        table_default_styles: {
                            width: '100%',
                            borderCollapse: 'collapse'
                        },
                        setup: function (editor) {
                            editor.on('init', function (e) {
                                vm.spinShow = false;
                                tinymce.get('articlePostUpdate').setContent(vm.page.content);

                            });
                            editor.on('keydown', function (e) {
                                // localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
                            });
                        },
                        file_browser_callback: function (field_name, url, type, win) {
                            console.log("file_browser_callback open !");
                            let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
                            let y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
                            let cmsURL = '/laravel-filemanager?field_name=' + field_name;
                            if (type == 'image') {
                                cmsURL = cmsURL + "&type=Images";
                            } else {
                                cmsURL = cmsURL + "&type=Files";
                            }
                            tinyMCE.activeEditor.windowManager.open({
                                file: cmsURL,
                                title: 'Filemanager',
                                width: x,
                                height: y,
                                resizable: "yes",
                                close_previous: "no"
                            });
                        }
                    });

                });
            },
            submit() {
                this.page.content = tinymce.get('articlePostUpdate').getContent();
                console.log(this.post);
                this.axios.patch('/api/pages/' + this.$route.params.id, this.page).then((response) => {
                    if (response.data == 1) {
                        this.$Notice.success({
                            title: 'Збережено зміни!'
                        });
                        this.$router.push({
                            name: 'admin_pages'
                        });
                    }

                });
            },
        }

    }
</script>
