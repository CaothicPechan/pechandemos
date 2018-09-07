
<template lang="pug">
  .main-demo-component-container
    .img-container
      img(:src="img")
    .register-container(v-show="!videoOn")
      form(@submit="register")
        input(v-model="nombre" placeholder="Nombre")
        input(v-model="email" placeholder="Email" type="email")
        input(v-model="tel" placeholder="Telefono")
        button(value="Registrar" type="submit") Registrar
    .video-container(v-show="videoOn" :class=" { active : videoOn} " )
      video(width="320" height="240" controls ref="video" @timeupdate="updateTime" )
        source( src='https://s3.amazonaws.com/pechanlifecycle/carlos.mp4' type="video/mp4")
  

</template>
<script>
export default {
  name: 'VideoOn',
  data () {
    return {
      nombre: '',
      email: '',
      tel: '',
      authPhones: ['5215578783626', '5215533902514', '5215569091998'],
      called: false,
      img: '/static/logo.png',
      videoOn: false,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:
  {
    register(e){
      e.preventDefault();
      let form = e.target;
      let elements = form.elements;
      for(var i = 0; i < elements.length; i++){
        let el = elements[i];
        if(el.value == ''){
          el.classList.add('error');
        }
      }

      if(this.nombre && this.email && this.tel && this.authPhones.includes(this.tel)){
        this.videoOn = true;
        this.called = false;
        this.img = '/static/loadvideo.gif'
      }
    },
    updateTime(){
      let video = this.$refs.video;
      let time = video.currentTime;
      console.log(time);
      if(time > 9 && time < 9.8 && !this.called){

        let body = {
          type: 'call',
          id: '18937',
          phone: '5215569091998',
          nombre: this.nombre,
          email: this.email
        }
        this.$http.post('/makecall',body).then((res) => {
          console.log('Response');
          console.log(res);
        })
        console.log('INIT');
        this.called = true;
        // video.pause();
        // window.speechSynthesis.getVoices();
        
        // var msg = new SpeechSynthesisUtterance();
        // msg.text = `Hola ${this.nombre}. Pronto conocerás más sobre nosotros, nos comunicaremos por email`;
        
        // setTimeout(() => {
        //   msg.voice = speechSynthesis.getVoices()[5];
        //   window.speechSynthesis.speak(msg);
        // }, 1000 );  
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.img-container{
  width: 100%;
  padding-top: 60px;
}
.register-container{
  width: 360px;
  display: inline-block;
}
.register-container input{
  border-radius: 15px;
  width: 90%;
  padding: 10px;
  margin: 10px;
  border: solid 1px #D5D5D5;
}
.register-container input.error{
  border: solid 2px red ;
}
.register-container button{
  border-radius: 15px;
  padding: 10px;
  width: 150px;
  border: none;
  cursor: pointer;
}
.register-container button:before {
  content: "";
  position: absolute;
  background: #383736;
  bottom: 0;
  left: 0;
  right: 0;
  top: 100%;
  z-index: -1;
  -webkit-transition: top 0.2s ease-in;
}
.register-container button:hover:before{
  top: 0;
}
.register-container button:hover{
  background: #42b983;
  color: #FFF;
}
.video-container{
  padding: 20px;
}
.video-container:before {
  content: "";
  opacity: 1;
  position: absolute;
  background: #000066;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;
  animation: fadeIn 1s;
}

.video-container video{
  animation: button-focus 1s;
}

@keyframes button-focus {
  0%{
    transform: scale(0.1);
  }
  100%{
    transform: scale(1);
  }
}
@keyframes fadeIn {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
  
}
</style>

<style>
body{
  background: none !important;
}

</style>
