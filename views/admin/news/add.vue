<style lang="less">@import "./../../../css/main.less";

#urlIMG {
    height: 350px;
    width: 100%;
    border: 2px dashed #ccc;
    object-fit: cover;
    max-width: 100%;
    cursor: pointer
}
</style>

<template>
    <div id="add_news" class="page">
        <div class="imgpost">
            <img id="urlIMG" :src="post.img" alt="" @click="imgPost"/>
        </div>
        <Row>
            <Col :xs="24" :sm="24" :md="24" :lg="24" style="padding:15px;">
            <Input v-model="post.title" placeholder="Назва новини" @on-blur="titleBlur">
            </Input>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12" style="padding:15px;">
            <Select v-model="post.direction_activity_id" :placeholder="Категорія">
                <Option v-for="direction in directions" :value="direction.value" :label="direction.label"
                        :key="direction.label">
                    <img :src="direction.img" style="width: 30px; height: 30px; object-fit: cover;"
                         :alt="direction.value">
                    <span style="">{{direction.label}}</span>
                </Option>
            </Select>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12" style="padding:15px;">
            <Input v-model="post.author" placeholder="Введіть автора новини" ></Input>
            </Col>
        </Row>

        <div class="">
            <textarea id="articlePostCreate"></textarea>
        </div>

        <button @click="submit" class="m_btn_blue_chevron" style="margin:15px;">Додати новину</button>
    </div>
</template>

<script>
    import tinymce from 'tinymce';

    export default {
        data() {
            return {

                post: {
                    title: "",
                    url: "",
                    direction_activity_id: 1,
                    content: "",
                    author: "",
                    img: 'images/blog/blog-large-01.jpg',
                    lang: ''
                },
                directions: [
                    {
                        img: 'img/map-icons/social.png',
                        label: 'Соціальна сфера',
                        value: 1,
                    }, {
                        img: 'img/map-icons/sport.png',
                        label: 'Спорт',
                        value: 2,
                    }, {
                        img: 'img/map-icons/education.png',
                        label: 'Освіта',
                        value: 3,
                    }, {
                        img: 'img/map-icons/medicine.png',
                        label: 'Медицина',
                        value: 4,
                    }, {
                        img: 'img/map-icons/culture.png',
                        label: 'Культура',
                        value: 5,
                    }, {
                        img: 'img/map-icons/tourism.png',
                        label: 'Туризм',
                        value: 6,
                    }, {
                        img: 'img/map-icons/beautification.png',
                        label: 'Благоустрій',
                        value: 7,
                    }, {
                        img: 'img/map-icons/ecology.png',
                        label: 'Екологія',
                        value: 8,
                    },
                ],
            };
        },
        mounted() {
            tinymce.init({
                selector: '#articlePostCreate',
                branding: false,
                elementpath: false,
                height: 600,
                language: 'uk_UA',
                menubar: 'edit insert view format table tools',
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                    'searchreplace visualblocks visualchars code fullpage',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'paste textcolor colorpicker textpattern imagetools codesample'
                ],
                // content_css : '/css/tinymce_fix.css',
                toolbar1: 'formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
                toolbar2: ' advlist autolink lists link image charmap  preview hr anchor pagebreak | searchreplace wordcount visualblocks visualchars code  | insertdatetime media nonbreaking  table contextmenu directionality | template paste textcolor colorpicker textpattern imagetools toc  hr',
                autosave_interval: '20s',
                relative_urls: false,
                content_css : '/css/tinymce_fix.css',
                image_advtab: true,
                table_default_styles: {
                    width: '100%',
                    borderCollapse: 'collapse'
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
        },
        destroyed() {
            tinymce.get('articlePostCreate').destroy();
        },
        created() {

        },
        methods: {
            submit() {
                this.post.img = document.getElementById("urlIMG").src;
                this.post.content = tinymce.get('articlePostCreate').getContent();
                this.axios.post('/api/posts', this.post).then((response) => {
                    console.log(response);
                    this.$Notice.success({
                        title: 'Новину додано'
                    });
                    this.$router.push({
                        name: 'admin_news'
                    });
                });
            },
            titleBlur() {
                if (this.post.title.length !== 0) {
                    this.post.url = this.translit(this.post.title);
                    this.post.seo_title = this.post.title;

                } else {
                    this.$Message.error('Заголовок статьи не может быть пустым');
                }
            },
            imgPost() {
                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById("urlIMG").src = path;

                });
            },
            translit(url) {
// Символ, на который будут заменяться все спецсимволы
                var space = '-';
// Берем значение из нужного поля и переводим в нижний регистр
                var text = url.toLowerCase();

// Массив для транслитерации
                var transl = {
                    'а': 'a',
                    'б': 'b',
                    'в': 'v',
                    'г': 'g',
                    'д': 'd',
                    'е': 'e',
                    'ё': 'e',
                    'ж': 'zh',
                    'з': 'z',
                    'и': 'i',
                    'й': 'j',
                    'к': 'k',
                    'л': 'l',
                    'м': 'm',
                    'н': 'n',
                    'о': 'o',
                    'п': 'p',
                    'р': 'r',
                    'с': 's',
                    'т': 't',
                    'у': 'u',
                    'ф': 'f',
                    'х': 'h',
                    'ц': 'c',
                    'ч': 'ch',
                    'ш': 'sh',
                    'щ': 'sh',
                    'ъ': space,
                    'ы': 'y',
                    'ь': space,
                    'э': 'e',
                    'ю': 'yu',
                    'я': 'ya',
                    ' ': space,
                    '_': space,
                    '`': space,
                    '~': space,
                    '!': space,
                    '@': space,
                    '#': space,
                    '$': space,
                    '%': space,
                    '^': space,
                    '&': space,
                    '*': space,
                    '(': space,
                    ')': space,
                    '-': space,
                    '\=': space,
                    '+': space,
                    '[': space,
                    ']': space,
                    '\\': space,
                    '|': space,
                    '/': space,
                    '.': space,
                    ',': space,
                    '{': space,
                    '}': space,
                    '\'': space,
                    '"': space,
                    ';': space,
                    ':': space,
                    '?': space,
                    '<': space,
                    '>': space,
                    '№': space
                }

                var result = '';
                var curent_sim = '';

                for (var i = 0; i < text.length; i++) {
                    // Если символ найден в массиве то меняем его
                    if (transl[text[i]] != undefined) {
                        if (curent_sim != transl[text[i]] || curent_sim != space) {
                            result += transl[text[i]];
                            curent_sim = transl[text[i]];
                        }
                    }
                    // Если нет, то оставляем так как есть
                    else {
                        result += text[i];
                        curent_sim = text[i];
                    }
                }
                result = this.trim(result);
                return result;
            },
            trim(s) {
                s = s.replace(/^-/, '');
                return s.replace(/-$/, '');
            }
        }

    }
</script>
