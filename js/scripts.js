/* Clock */

$(document).ready(function(){
  
  // Set up variables to enable smooth animating past the 360deg point
  
  var secondsBoost = 0;
  var minutesBoost = 0;
  var hoursBoost = 0;
  
  // Run 'clock' function every second

  setInterval(function(){

    // Get Date, pull hours, minutes and seconds
 
    var dt = new Date();
    var seconds = dt.getSeconds();
    var minutes = dt.getMinutes();
    var hours = dt.getHours();
    
    // Add to 'boost' variables to ensure that the clock never winds backwards.
    
    if(seconds===0){
    secondsBoost+=60;
  	}
    if((minutes===0)&&(seconds===0)){
    minutesBoost+=60;
  	}
    if((hours===0)&&(minutes===0)&&(seconds===0)){
    hoursBoost+=12;
  	}
	
    // Offset variables based on current time + boosts. Seconds and minutes offset multiples of 6 degrees, hours 30 degrees

    var secondsOffset = (seconds+secondsBoost)*6;
    var minutesOffset = (minutes+minutesBoost)*6;
    var hoursOffset = ((hours+hoursBoost)*30)+((minutes*6)/12);
    
    // Set angle for each hand (270 degrees as a start point as hands are rotating about their left center point)

    var secondsAngle = 270+secondsOffset;
    var minutesAngle = 270+minutesOffset;
    var hoursAngle = 270+hoursOffset;

    // Alter CSS of clock hands using offset angle

    $('.seconds').css({'transform':'rotate('+secondsAngle+'deg)'});
    $('.minutes').css({'transform':'rotate('+minutesAngle+'deg)'});
    $('.hours').css({'transform':'rotate('+hoursAngle+'deg)'});
	  
    // Numbers to words 
    
    var words = ['', 'one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twenty-one','twenty-two','twenty-three','twenty-four','twenty-five','twenty-six','twenty-seven','twenty-eight','twenty-nine','thirty','thirty-one','thirty-two','thirty-three','thirty-four','thirty-five','thirty-six','thirty-seven','thirty-eight','thirty-nine','fourty','fourty-one','fourty-two','fourty-three','fourty-four','fourty-five','fourty-six','fourty-seven','fourty-eight','fourty-nine','fifty','fifty-one','fifty-two','fifty-three','fifty-four','fifty-five','fifty-six','fifty-seven','fifty-eight','fifty-nine'];
    
    // Display words
    
    // Minutes
    
    if(minutes === 0){
      $('.minutes span').html('O Clock');
    }
    else if(minutes == 15){
      $('.minutes span').html('Quarter Past');
    }
    else if(minutes == 30){
      $('.minutes span').html('Half Past');
    }
    else if(minutes == 45){
      $('.minutes span').html('Quarter To');
    }
    else if(minutes > 45){
      $('.minutes span').html(words[60-minutes]+' To');
    }
    else {
    $('.minutes span').html(words[minutes]+' Past');
    }
    
    // Flip text between 6-12
    
    if(minutes > 30){
      $('.minutes span').css({'transform':'rotate(180deg)','text-align':'left'});
    }
    
    // Hours
    
    if(hours === 0){
     $('.hours span').html('Midnight');
    }
    else if((hours > 12)&&(minutes >= 45)){
      $('.hours span').html(words[hours-11]+' PM');
    }
    else if(minutes >= 45){
      $('.hours span').html(words[hours+1]+' AM');
    }
    else if(hours > 12){
      $('.hours span').html(words[hours-12]+' PM');
    }
    else{
    $('.hours span').html(words[hours]+' AM');
    }
   
    // Flip text between 6-12
    
    if(((hours >= 6)&&(hours < 12))||(hours >= 18)){
    $('.hours span').css({'transform':'rotate(180deg)','text-align':'left'});
    } 
    
  }, 1000);

});

/*Day/Night*/

$(document).ready(function(){
  var d = new Date();
  var n = d.getHours();

  if (n > 20 || n < 6)
    // If time is after 8PM or before 6AM, apply night theme to ‘night’
    document.body.className = "night";
  else if (n > 16 && n < 20)
    // If time is between 5PM – 8PM sunset theme to ‘sunset’
    document.body.className = "sunset";
  else
    // Else use ‘day’ theme
    document.body.className = "day";
});





