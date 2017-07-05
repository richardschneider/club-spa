<template>
  <!-- Initial template from https://bootsnipp.com/snippets/featured/fancy-navbar-login-sign-in-form -->

 <div id="login-dp">
    <div>
        <ul class="social-buttons list-inline">
          <li><a href="#" class="btn"><i class="fa fa-google"></i> Google</a></li>
          <li><a href="#" class="btn"><i class="fa fa-facebook"></i> Facebook</a></li>
          <li><a href="#" class="btn"><i class="fa fa-github"></i> Github</a></li>
          <li><a href="#" class="btn"><i class="fa fa-twitter"></i> Twitter</a></li>
        </ul>
         <form class="form" role="form" id="login-nav">
            <div class="form-group">
                 <label class="sr-only" for="email">email address</label>
                 <input type="email" class="form-control" id="email" placeholder="email address" v-model="email" required>
            </div>
            <div class="form-group">
                 <label class="sr-only" for="passwor">password</label>
                 <input type="password" class="form-control" id="password" placeholder="password" v-model="password" required>
            </div>
            <div class="form-group">
                 <button type="submit" @click="login" class="btn btn-primary">Sign in</button>
                <a href="#" ><div id="forget"><small>forgot password?</small></div></a>
            </div>
            <div class="checkbox">
                 <label>
                 <input type="checkbox" v-model="remember"> remember me
                 </label>
            </div>
         </form>
    </div>
    <div class="bottom text-center">
      New here? <router-link to="/join"><b>Join us</b></router-link>
    </div>
 </div>
</template>

<script>
import auth from '../auth'
import {EventBus} from '@/eventbus.js'

export default {
  data () {
    return {
      email: '',
      password: '',
      remember: false
    }
  },
  computed: {
  },
  methods: {
    login () {
      let credentials = {
        username: this.email,
        password: this.password
      }
      auth
        .login(this, credentials, this.remember)
        .catch(err => EventBus.$emit('error', err))
    }
  }
}
</script>

<style>
#login-dp{
    min-width: 250px;
    max-width: 340px;
    padding: 6px 6px 0;
    overflow:hidden;
    background-color:rgba(255,255,255,.8);
}

  #login-dp .social-buttons {
    border-bottom: 1px solid #ddd;
    margin-bottom: 14px;
    clear:both;
  }

  #login-dp .checkbox {
    border-top: 1px solid #ddd;
    padding-top: 10px;
  }

#login-dp .bottom{
    background-color:rgba(255,255,255,.8);
    border-top:1px solid #ddd;
    clear:both;
    padding:14px;
}
#login-dp .form-group {
    margin-bottom: 10px;
    width: 100%;
}
  #forget {
    float: right;
    margin-top: 8px;
  }
</style>
