<template>
  <!-- Initial template from https://bootsnipp.com/snippets/featured/fancy-navbar-login-sign-in-form -->

 <div class="row" id="login-dp">
    <div class="col-md-12">
        Login via
        <ul class="social-buttons list-inline">
          <li><a href="#" class="btn"><i class="fa fa-google"></i> Google</a></li>
          <li><a href="#" class="btn"><i class="fa fa-facebook"></i> Facebook</a></li>
          <li><a href="#" class="btn"><i class="fa fa-github"></i> Github</a></li>
          <li><a href="#" class="btn"><i class="fa fa-twitter"></i> Twitter</a></li>
        </ul>
        or
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
                <a href="#" ><div id="forget">forget the password?</div></a>
            </div>
            <div class="checkbox">
                 <label>
                 <input type="checkbox"> keep me logged-in
                 </label>
            </div>
         </form>
    </div>
    <div class="bottom text-center">
        New here ? <a href="#"><b>Join Us</b></a>
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
      password: ''
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
        .login(this, credentials)
        .catch(err => EventBus.$emit('error', err))
    }
  }
}
</script>

<style>
#login-dp{
    min-width: 250px;
    max-width: 340px;
    padding: 14px 14px 0;
    overflow:hidden;
    background-color:rgba(255,255,255,.8);
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
