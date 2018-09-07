

const Nexmo = require('nexmo');
const privateKey = require('fs').readFileSync('./private.key');

const from = '12345678901';
const to = '5215569091998';
const dad = '5215578783626';
const text = 'SMS desde API ;v';
const AUDIO_URL = 'https://nexmo-community.github.io/ncco-examples/assets/voice_api_audio_streaming.mp3';


var CALL_UUID = '';

// nexmo.message.sendSms(from, to, text, (err,res)=> {console.log(res)}  )

const nexmo = new Nexmo({
    apiKey: '1e305e74',
    apiSecret: 'UIE4CWMJZKZcRXXS',
    applicationId: '84e854b5-2855-4a73-8f21-abbad16ce732',
    privateKey: privateKey
});

class Caller {
    constructor(id, phone){
        this.id = id;
        this.phone = phone;
    }
    call(){
        console.log('Calling phone phone-->');
        console.log(this.phone);
        
        nexmo.calls.create({
            to: [{
              type: 'phone',
              number: this.phone
            }],
            from: {
              type: 'phone',
              number: from
            },
            answer_url: ['https://s3.amazonaws.com/pechanlifecycle/callstream.json']
        },(err,res) => 
        {
            console.log(res); 
            console.log(err);
        })
    }
    printPhone(){
        console.log('printing phone-->');
        console.log(this.phone);
    }
}

module.exports = Caller;




