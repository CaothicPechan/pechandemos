
<template lang="pug">
  div
    input(v-model="nombre")
    .video-container
      video(width="320" height="240" controls ref="video" @timeupdate="updateTime")
        source( src='https://s3.amazonaws.com/pechanlifecycle/video_2018-09-05_11-00-53.mp4' type="video/mp4")
  

</template>
<script>

export default {
  name: 'VideoOn',
  data () {
    return {
      nombre: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:
  {
    updateTime(){
      let video = this.$refs.video;
      let time = video.currentTime;
      if(time > 5){
        video.pause();
        // alert('Tiempo excedido! ' + time + ' segundos');
        speechSynthesis.getVoices();

        var msg = new SpeechSynthesisUtterance('Hi There');
        msg.voice = speechSynthesis.getVoices()[4];
        msg.text = 'Hola ' + this.nombre;
        window.speechSynthesis.speak(msg);  

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
</style>
