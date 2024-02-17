const move_speed=5;
const gravity=0.4;
const no_name="No Name";
const searchInput =document.querySelector("[data-searchInput]");
const searchForm=document.querySelector("[data-searchForm]");
const bird=document.querySelector('.bird');
const img=document.getElementById('bird-1');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');
let music=new Audio('sounds effect/game.mp3');
let bird_props=bird.getBoundingClientRect(); //by using this you wil get the exact location of this element in your DOM

let background=document.querySelector('.background').getBoundingClientRect();
let score_val=document.querySelector(".score_val");
const message=document.querySelector(".message");
let score_title=document.querySelector(".score_title");
message.style.display='none';
let game_state='start';
img.style.display='none';


function names(){
    searchInput.value="";
    searchForm.addEventListener("submit",(event)=>{   // is pure code m jo event pass hua hai vo default hota hai aur ye search
 /*is prevent ka mtlb hai ki jo submit                //ke input m jo value aai hai use fetch krne ke kaam m aata hai
 ki default working hai use haa do aur
mere hisab se kaam kro*/
    event.preventDefault();      
        let naame=searchInput.value.toUpperCase();
    
        if(naame!=""){
    document.querySelector(".player_name").innerHTML=naame;


searchForm.style.display='none';
message.style.display='block';
message.classList.add("messageStyle");
    }
    main_game(); 
});
return ;
}
names();
function main_game(){
    document.addEventListener('keypress',(e)=>{   //by using keydown attribute we will fetch that which key is pressed in place of keydown we can also use keyup/keypress
        if(e.key=='Enter' && game_state!='Play'){
            document.querySelectorAll(".pipe_sprite").forEach((e)=>{
                e.remove();
            });
            img.style.display='block';
            bird.style.top='40vh';
            game_state='Play';
            message.innerHTML = '';
            score_title.innerHTML='Score : ';
            score_val.innerHTML='0';
            music.play();
            message.classList.remove("messageStyle");
            play();
        }
    });

    function play(){
        function move(){
            if(game_state!='Play'){
            
            return;}
        let pipe_sprite=document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element)=>{
            let pipe_sprite_props=element.getBoundingClientRect();
            bird_props=bird.getBoundingClientRect();
    
            if(pipe_sprite_props.right<=0)
            {
                element.remove();
            }
            else{
                 if((bird_props.left < (pipe_sprite_props.left + pipe_sprite_props.width)) && (bird_props.left + bird_props.width > pipe_sprite_props. left) && (bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height) && (bird_props.top + bird_props.height >pipe_sprite_props.top )){
                    game_state='End';
                    music.pause();
    message.innerHTML="Game Over".fontcolor('red')+"<br>Press Enter To Restart";
    message.classList.add('messageStyle');
    img.style.display='none';
    sound_die.play();
    return;
             }
             else{
                if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                    score_val.innerHTML =+ score_val.innerHTML + 1;
                    sound_point.play();
                }
                element.style.left=pipe_sprite_props.left-move_speed+'px';
    
             }
            }
        });
        requestAnimationFrame(move);  //this request function is used to do animation allback: Unless you want the animation to stop, you should write the callback function so that it calls itself so that a request to the next frame is made. Callback function takes timestamp or simply a time value at which it should start executing
    
        //	Required. A function to call when it is time to update your animation for the next repaint. The callback has one single argument, a DOMHighResTimeStamp, which indicates the current time (the time returned from performance.now() ) for when requestAnimationFrame() starts to fire callbacks
    
        // defination-The requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.
    }
        requestAnimationFrame(move);
    let bird_dy=0;
    function apply_gravity()
    {
        if(game_state!='Play')
        return ;
    
        bird_dy=bird_dy + gravity;
        document.addEventListener('keydown',(e)=>{ //keydown ka mtlb hota h ki press krne pr aur keyup ka mtlb hota hai ki ko prees krne ke badd chodna
            if(e.key=='ArrowUp' || e.key==' '){   //hm game ya to up key khel skte hai ya space bar se bhi khel skte hai
                img.src='images/Bird-2.png';
                bird_dy=-7.6   // ye dicide kr rha h ki key prees krne pr vo bird kitni upr jaa rhi h 
            }
            
        });
        document.addEventListener('keyup',(e)=>{
            if(e.key=='ArrowUp' || e.key==' '){
                img.src='images/Bird.png';
            }
        });
    
        if(bird_props.top<=0 || bird_props.bottom>=background.bottom) //ye bata rha hai ki game end ho jayega jaise hi gudda diwaar ya jameen ko chuyega
    {
    
        game_state='End';
        
      message.innerHTML="Game Over".fontcolor('red')+"<br>Press Enter To Restart";
      img.style.display='none';
            message.classList.add('messageStyle');
             sound_die.play();
            music.pause();
            document.addEventListener('keyup',(e)=>{
                if((e.key=="Enter" || e.key==" "))//&&(game_state!='Play'))
                {
                window.location.reload();    
                 }
            });
        
             
            return ;
          
        
    }
    
    bird.style.top=bird_props.top + bird_dy +'px';
    bird_props=bird.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);
    
    let pipe_seperation=0;
    let pipe_gap=37;
    function create_pipe(){
        if(game_state!='Play')
        return;
    
        if(pipe_seperation>80){
            pipe_seperation=0;
            let pipe_posi=Math.floor(Math.random()*45)+8;
            let pipe_sprite_inv=document.createElement('div'); // yha pr pipe ke upr wala hissa ban rha hai 
            pipe_sprite_inv.className='pipe_sprite';
            pipe_sprite_inv.style.top=pipe_posi-70+'vh';
            pipe_sprite_inv.style.left='100vw';  //yha hm 100vw isilie le rhe hai kyuki jo element hai vo to banaega isilie m extreme right se hi
    
            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite=document.createElement('div');  //yha pr pipe ke niche ka part ban rha hai
            pipe_sprite.className='pipe_sprite';
            pipe_sprite.style.top=pipe_posi+pipe_gap+'vh';
            pipe_sprite.style.left='100vw';
            pipe_sprite.increase_score='1';  // why  ????
    
    document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
    }


}
  