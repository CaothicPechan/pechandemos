
<template lang="pug">
  .main-demo-component-container
    .img-container
      img(:src="img" :class="{ 'video-display' : videoOn }" v-show=" !videoOn")
    .register-container(v-show="!videoOn")
      form(@submit="register")
        input(v-model="nombre" placeholder="Nombre")
        input(v-model="email" placeholder="Email" type="email")
        input(v-model="tel" placeholder="Telefono (10 dígitos)" maxlength="10")
        button(value="Registrar" type="submit") Registrar
    .video-container(v-show="videoOn" :class=" { active : videoOn } " )
      video(controls ref="video" @timeupdate="updateTime" @ended="bVideo = !bVideo" v-show="bVideo")
        source( src='https://s3.amazonaws.com/pechanlifecycle/carlosInit.mp4' type="video/mp4")
      video(controls ref="videoEnd" v-show="!bVideo" )
        source( src='https://s3.amazonaws.com/pechanlifecycle/carlosEnd.mp4' type="video/mp4")
      .contact-container
        span M&S Consulting 
          a(href="http://m-sconsulting.com.mx" target="_blank") m-sconsulting.com.mx 
          | | Rezongona 
          a(href="https://www.rezongona.com/" target="_blank") rezongona.com

</template>
<script>
export default {
  name: 'VideoOn',
  data () {
    return {
      nombre: '',
      email: '',
      tel: '',
      authPhones: ['5215578783626', '5215533902514', '5215569091998', '5217222549405', '5215542732568'],
      called: false,
      img: 'https://s3.amazonaws.com/pechanlifecycle/logorm.png',
      videoOn: false,
      bVideo: true,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:
  {
    register(e){
      e.preventDefault();
      let form = e.target;
      let elements = form.elements;
      this.tel = '521' + this.tel.trim();

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
      }else{
        if(!this.authPhones.includes(this.tel)){
          alert('El número que está intentanto ingresar no se encuentra registrado en el dominio :(');
        }
      }
    },
    updateTime(){
      let video = this.$refs.video;
      let videoFin = this.$refs.videoEnd;
      let time = video.currentTime;

      if(time > 10 && time < 10.8 && !this.called){

        let body = {
          type: 'call',
          id: '18937',
          phone: this.tel,
          nombre: this.nombre,
          email: this.email
        }
        this.$http.post('/makecall',body).then((res) => {
          console.log('Response');
          console.log(res);
          if(res.status == 200){
            setTimeout(()=>{
              console.log('Call Started/ Video to play');
              console.log(videoFin);
              videoFin.play();
            }, 24000);
          }
        })
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
.img-container img{
  width: 50%;
}
.img-container img.video-display{
  width: auto;
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
  background: #2da2c8;
  color: #FFF;
}
.video-container{
  padding: 20px;
}

.video-container:before {
  content: "";
  opacity: .4;
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
  width: 520px;
  height: 340px;
}

.contact-container{
  font-weight: 500;
  font-size: 1.2rem;
  color: white;
  padding: 15px;
}

@media only screen and (min-width: 320px) and (max-width: 550px) {
  .video-container video{
    width: 320px;
    height: 240px;
  }
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
    opacity: .4;
  }
  
}
</style>

<style>
body{
  background: none !important;
}

</style>
