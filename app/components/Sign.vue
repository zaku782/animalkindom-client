<template id="login">
    <div class="login-screen">
        <div class="login-form">
            <div>
                <input type="text" class="form-control icon-input" v-model="name" :placeholder=" 'your_name' | msg "
                       id="login-name">
            </div>
            <div>
                <input type="password" class="form-control icon-input" v-model="password"
                       :placeholder=" 'password' | msg " id="login-pass">
            </div>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary sign-btn" :data-loading-text=" 'signing' | msg "
                        disabled="disabled" @click="signIn">{{ 'sign_in' | msg }}
                </button>
                <button type="button" class="btn btn-warning sign-btn" :data-loading-text=" 'signing' | msg "
                        disabled="disabled" @click="signUp">{{ 'sign_up' | msg }}
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    import Toastr from '../plugin/toastr/toastr.min'
    import Account from '../script/server/account.js'
    import App from '../script/app.js'
    import Message from '../script/message.js'

    export default {
        data: function () {
            return {
                name: '',
                password: ''
            }
        },
        watch: {
            name: function () {
                this.checkInput();
            },
            password: function () {
                this.checkInput();
            }
        },
        methods: {
            checkInput: function () {
                if (this.password && this.name) {
                    $(".sign-btn").removeAttr("disabled");
                } else {
                    $(".sign-btn").attr("disabled", "disabled");
                }
            },
            signIn: function () {
                Account.signIn({
                    name: this.name,
                    password: this.password
                }).then(this.signCallback).catch(this.serverErrorCallback);
            },
            signUp: function () {
                Account.signUp({
                    name: this.name,
                    password: this.password
                }).then(this.signCallback).catch(this.serverErrorCallback);
            },
            signCallback: function (res) {
                let $btn = $(this.$el).find(".sign-btn").button('loading');

                if (res.type === 'danger') {
                    $btn.button('reset');
                    Toastr.error(Message.filters(res.content));
                } else if (res.type === 'success') {
                    App.router.$router.push('index')
                }
            },
            serverErrorCallback: function () {
                $(this.$el).find(".sign-btn").button('loading').button('reset');
            }
        },
        mounted: function () {
            $(document).on('keydown', (e) => {
                if (e.keyCode === 13) {
                    if (this.password && this.name) {
                        this.signIn();
                    }
                }
            });

            Account.isLogin().then((res) => {
                if (res.type === 'success') {
                    App.router.$router.push('index');
                }
            });
        },
        filters: {
            msg: Message.filters
        }
    }
</script>

<style scoped>
    .login-screen {
        display: flex;
        width: 100%;
        justify-content: center;
        height: inherit;
    }

    .login-form {
        width: 300px;
        margin: auto;
        background-color: #eceff1;
        border-radius: 6px;
        padding: 10px 10px;
        text-align: center;
    }

    .sign-btn {

    }

    .icon-input {
        margin-bottom: 10px;
    }

    .icon-input:focus + label {
        color: #1aba9c
    }
</style>
