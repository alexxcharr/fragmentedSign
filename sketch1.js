//AIzaSyDzAfY_JsSMB1_HRdJnnZmk64w0abhHE70
//  'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=eye&key=[YOUR_API_KEY]' \
//  --header 'Accept: application/json' \
//  --compressed
//news key: 814e1a6cb3234cf196b738b789c6a78b
//var api = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet';//'https://api.giphy.com/v1/gifs/search?';
var pApiKey = "?key=25114507-d7a750132a50ad2f0ef510ed7";
var pVidApi = "https://pixabay.com/api/videos/";
var pImgApi = "https://pixabay.com/api"
var gApi = "http://api.giphy.com/v1/gifs/search";
var gApiKey = "?&api_key=vDqMv5CbZ5iJiZqRCNw0AHcQHTDs7CjN";
var apiKey = '&key=AIzaSyDzAfY_JsSMB1_HRdJnnZmk64w0abhHE70'//'&api_key=dc6zaTOxFJmzC';
var tApiKey =  "&apiKey=814e1a6cb3234cf196b738b789c6a78b";
var tApi =  "https://newsapi.org/v2/everything?"
var tquery = " ";
var query = ' ';
let playing = true;
let firstText = false;
let firstLoad = false;
var vid;
var imag;
var w, h,cc;
var  x = 0;
var start = false;
var string  = " ";
var string1;
var textW, textH;
let arrayX =[];
var arrayAdd = [];
var arrayY = [];
var arrayDispX = [];
var arrayDispY = [];
var randomVid;
var userInput;
var clearBack = false;


function setup() {
//  noCanvas();
  createCanvas(windowWidth,  windowHeight);
  background(0);
  var url = pVidApi  +  pApiKey + query;// + query;
  var urlImg = pImgApi  +  pApiKey + query;// + query;
  var textUrl = tApi + tquery + tApiKey;
  var giphUrl = gApi + gApiKey + query;
  loadJSON(url, gotData);
  loadJSON(textUrl, gotText);
  //loadJSON(giphUrl, gotGiph);

  //textFont(inconsolata);
  textSize(width/100);
  textAlign(CENTER, CENTER);
  textW = random(0, windowWidth-100);
  textH =  random(0, windowHeight-100);
  vidx = random(windowWidth);
  vidy = random(windowHeight);
  //////search/////
  userInput = select('#userinput');
  userInput.changed(startSearch); //when enter call startSearch
}

function startSearch() {
  vidx = 0;//random(windowWidth);
  vidy = 0;//random(windowHeight);
  textH = 0;
  textW = 0;
  string = "";
  string1 = "";
  term  = userInput.value();
  query = "&q=" + term;
  tquery = "q=" + term;
  console.log(term);
  var url = pVidApi  +  pApiKey + query;// + query;
  var urlImg = pImgApi  +  pApiKey + query;// + query;
  var textUrl = tApi + tquery + tApiKey;
  var giphUrl = gApi + gApiKey + query;
  loadJSON(url, gotData);
  loadJSON(textUrl, gotText);
  textW = random(0, windowWidth-100);
  textH =  random(0, windowHeight-100);
  vidx = random(windowWidth);
  vidy = random(windowHeight);
  clearBack =  true;
}




function gotData(data) {
//  background(0);
  randomVid = Math.round(random(20));//data.hits.legth));
  vid=createVideo(data.hits[randomVid].videos.tiny.url);
  vid.hide();
  vid.loadPixels();
  firstLoad = true
}

function draw() {
  text(string, textW, textH);
  if (clearBack && firstLoad) {
    background(0);
    x = 0;
    console.log(x);
    clearBack = false;
  }
  if (start) {
    filter(INVERT);

    vid.loadPixels();

    w =  vid.width;
    h = vid.height;
    var tH = map(h, 0, h, 0, windowHeight);
    copy(vid, w/2, 0, 1, h, x, 0, 1, tH);
    filter(INVERT);
    /////RANDOM CUTS X,Y//////
    if (firstLoad) {
    //  x  = w;
      for (var i = 0; i <10; i++) {
          arrayX[i] = Math.round(random(w-100));
          //console.log(i);//Math.round(random(w-100)));
          arrayAdd[i] = Math.round(random(w));
          arrayY[i] = Math.round(random(h));
          arrayDispX[i] = Math.round(random(windowWidth));// - randomX));
          arrayDispY[i] = Math.round(random(windowHeight));// - randomY));
        //  copy(vid, arrayX[i], arrayY[i], arrayX[i] + arrayAdd[i], arrayY[i] + arrayAdd[i], arrayDispX[i] + i* 10, arrayDispY[i], arrayAdd[i], h);
      }
      randomX = Math.round(random(w-100));
      randomAdd = Math.round(random(w-randomX));
      randomY = Math.round(random(h));
      randDispX = Math.round(random(windowWidth - randomX));
      randDispY = Math.round(random(windowHeight - randomY));
      firstLoad = false;
    }

    copy(vid, randomX, randomY, randomX + randomAdd, randomY + randomAdd, randDispX, randDispY, randomAdd, h);

    for  (var i=0; i <10; i++) {
      copy(vid, arrayX[i], arrayY[i], arrayX[i] + arrayAdd[i], arrayY[i] + arrayAdd[i], arrayDispX[i], arrayDispY[i], arrayAdd[i], h);
      copy(vid, randomX, randomY, randomX + randomAdd, randomY + randomAdd, randDispX + i*10, randDispY, randomAdd, h);
      copy(vid, randomX, randomY, randomX + randomAdd, randomY + randomAdd, randDispX, randDispY + i*10, randomAdd, h);
    }
    image(vid, vidx,  vidy, 500, 500);

    x = x+ 1;//++;
  }
  if ( firstText) {
    text(string, textW, textH);
    text(string1, textW/2, textH/3);
  }

}

function gotText(data) {
  var randomText = Math.round(random(data.articles.length));
  fill(255, 255, 255, 255);
  string = data.articles[randomText].title;//, random(windowWidth),  random(windowHeight);
  var randomText1 = Math.round(random(data.articles.length));
  string1 = data.articles[randomText1].title;
  firstText = true;
}

function mousePressed() {
  start = true;
  vid.loop(); // set the video to loop and start playing
}


function gotGiph(giph) {
  /////do in preloads
  //console.log(random(giph.data.length));
  var randomGiph = Math.round(random(giph.data.length));
  imag = createImg(giph.data[randomGiph].images.original.url, "not found");
  imag.hide();
//  imag.position(0, 0);
}
