//   /\_|_/\   NERV
//  /       \  gambling story [winter 2022]
/////////////////////////////////////// r1
const mainRenderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
mainRenderer.setSize(window.innerWidth, window.innerHeight);
mainRenderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(mainRenderer.domElement);
mainRenderer.domElement.style.position = 'fixed';
mainRenderer.domElement.style.display = 'block';
mainRenderer.domElement.style.top = 0;
const mainScene = new THREE.Scene();
const mainCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.01, 20);
mainScene.background = new THREE.Color(0xffffff);
const gameContainer = new THREE.Object3D();
gameContainer.position.z = -19;
const topUIContainer = new THREE.Object3D();
topUIContainer.position.z = -2;
mainScene.add(gameContainer, topUIContainer);
const renderTarget = [];
const renderTargetScene = [];
const renderTargetCamera = new THREE.OrthographicCamera(-249, 249, 540, -540, 0.01, 21);
for (let i = 0; i < 4; i++) {
  renderTarget[i] = new THREE.WebGLRenderTarget(996, 2160);
  renderTargetScene[i] = new THREE.Scene();
}
function loadPIC(url) {
  return new Promise(resolve => {
    new THREE.TextureLoader().load(url, resolve)
  })
}
const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00AB4E });
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const textMaterial = new THREE.MeshBasicMaterial({ color: 0x0F0F37 });
const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
const purpleMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
const redMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x00FFFF });
const transparentMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.0000001 });
const yellowColor = new THREE.Color(0x00FFFF);
const blueColor = new THREE.Color(0x546bab);
const blackColor = new THREE.Color(0x444444);
let TTTravelsRegular;
new THREE.FontLoader().load('fonts/TTTravelsRegular.json', function(font) {
  TTTravelsRegular = font;
  goLoadingScreen();
});
const loadingBar = new THREE.Object3D();
function goLoadingScreen() {
  loadingBar.bar = new THREE.Object3D();
  loadingBar.bar.part = [];
  const shape = new THREE.Shape();
  shape.moveTo(175, -84);
  shape.lineTo(175, 84);
  shape.lineTo(-175, 84);
  shape.lineTo(-175, -84);
  shape.lineTo(-145, -84);
  shape.lineTo(-145, 54);
  shape.lineTo(145, 54);
  shape.lineTo(145, -84);
  loadingBar.bar.part[0] = new THREE.Mesh(new THREE.ShapeBufferGeometry(shape, 1), greenMaterial);
  loadingBar.bar.add(loadingBar.bar.part[0]);
  loadingBar.circleGeometry = new THREE.CircleBufferGeometry(14.5, 24);
  for (let i = 1; i < 11; i++) {
    loadingBar.bar.part[i] = new THREE.Mesh(loadingBar.circleGeometry, greenMaterial);
    loadingBar.bar.part[i].position.set(-130.5 + 29 * (i - 1), -69.5, 0);
    loadingBar.bar.part[i].scale.set(0, 0, 1);
    loadingBar.bar.add(loadingBar.bar.part[i]);
  }
  loadingBar.bar.scale.set(0, 0, 1);
  loadingBar.text = new THREE.Mesh(new THREE.ShapeBufferGeometry(TTTravelsRegular.generateShapes(`0%`, 30), 3), greenMaterial);
  loadingBar.text.geometry.center();
  loadingBar.text.position.y = -140;
  loadingBar.text.scale.set(0, 0, 1);
  loadingBar.add(loadingBar.bar, loadingBar.text);
  loadingBar.scale.set(0.25, 0.25, 1);
  loadingBar.position.set(0, 0, -1);
  mainScene.add(loadingBar);
  gsap.to(loadingBar.bar.scale, { duration: 0.3, x: 1, y: 1, ease: "power1.inOut", onComplete: function() {
    gsap.to(loadingBar.text.scale, { duration: 0.2, x: 1, y: 1, ease: "power1.inOut", onComplete: function() {
      goLoad();
    } });
  } });
}
let loadingCount = 414;
const loadingFull = loadingCount;
const pic = [];
const tex = [];
let TTTravelsMedium;
let TTTravelsBlack;
let TTTravelsBold;
let level = 0;
function goLoad() {
  for (let i = 0; i < 404; i++) {
    loadPIC(`textures/pic${i}.png`).then(texture => {
      pic[i] = new THREE.MeshBasicMaterial( { map: texture, transparent: true, alphaTest: 0.5 } );
      checkLoading();
    });
  }
  for (let i = 0; i < 7; i++) {
    loadPIC(`textures/tex${i}.png`).then(texture => {
      tex[i] = texture;
      checkLoading();
    });
  }
  new THREE.FontLoader().load('fonts/TTTravelsMedium.json', function(font) {
    TTTravelsMedium = font;
    checkLoading();
  });
  new THREE.FontLoader().load('fonts/TTTravelsBlack.json', function(font) {
    TTTravelsBlack = font;
    checkLoading();
  });
  new THREE.FontLoader().load('fonts/TTTravelsBold.json', function(font) {
    TTTravelsBold = font;
    checkLoading();
  });
}
function checkLoading() {;
  loadingCount --;
  loadingBar.text.geometry.dispose();
  loadingBar.text.geometry = new THREE.ShapeBufferGeometry(TTTravelsRegular.generateShapes(`${Math.round(100 / loadingFull * (loadingFull - loadingCount))}%`, 30), 1);
  loadingBar.text.geometry.center();
  if (loadingBar.bar.part[Math.ceil((loadingFull - loadingCount) / (loadingFull / 10))].scale.x == 0) {
    gsap.to(loadingBar.bar.part[Math.ceil((loadingFull - loadingCount) / (loadingFull / 10))].scale, { duration: 0.3, x: 1, y: 1, ease: "power1.inOut" });
  }
  if (loadingCount == 0) {
    setTimeout(function() {
      createGraphics();
    }, 400);
  }
}
const startScreenContainer = new THREE.Object3D();
const finScreenContainer = new THREE.Object3D();
const levelScene = [];
let bet = 0;
let scoreBlock = new THREE.Object3D();
let resultBlock = new THREE.Object3D();
let timeline = new THREE.Object3D();
let currentScore = 0;
let currentLevel = 0;
let onGoal = false;
let border = new THREE.Object3D();
const goalSparkle = [];
let onHappy = false;
const levelContainer = [new THREE.Object3D(), new THREE.Object3D(), new THREE.Object3D(), new THREE.Object3D()];
function createGraphics() {
  pic[0].alphaTest = 0;
  pic[55].alphaTest = 0;
  pic[56].alphaTest = 0;
  pic[52].alphaTest = 0;
  pic[57].alphaTest = 0;
  pic[58].alphaTest = 0;
  pic[59].alphaTest = 0;
  pic[60].alphaTest = 0;
  pic[61].alphaTest = 0;
  pic[68].alphaTest = 0;
  pic[69].alphaTest = 0;
  pic[70].alphaTest = 0;
  pic[62].alphaTest = 0;
  pic[63].alphaTest = 0;
  pic[161].alphaTest = 0;
  pic[64].alphaTest = 0;
  pic[64].alphaTest = 0;
  pic[75].alphaTest = 0;
  pic[66].alphaTest = 0;
  pic[82].alphaTest = 0;
  pic[81].alphaTest = 0;
  pic[67].alphaTest = 0;
  pic[83].alphaTest = 0;
  pic[84].alphaTest = 0;
  pic[85].alphaTest = 0;
  pic[86].alphaTest = 0;
  pic[87].alphaTest = 0;
  pic[80].alphaTest = 0;
  pic[88].alphaTest = 0;
  pic[89].alphaTest = 0;
  pic[98].alphaTest = 0;
  pic[206].alphaTest = 0;
  pic[207].alphaTest = 0;
  pic[208].alphaTest = 0;
  pic[209].alphaTest = 0;
  pic[210].alphaTest = 0;
  pic[211].alphaTest = 0;
  pic[229].alphaTest = 0;
  pic[231].alphaTest = 0;
  pic[303].alphaTest = 0;
  pic[304].alphaTest = 0;
  pic[305].alphaTest = 0;
  pic[306].alphaTest = 0;
  pic[307].alphaTest = 0;
  pic[308].alphaTest = 0;
  pic[326].alphaTest = 0;
  pic[391].alphaTest = 0;
  pic[392].alphaTest = 0;
  pic[393].alphaTest = 0;
  pic[394].alphaTest = 0;
  pic[395].alphaTest = 0;
  pic[396].alphaTest = 0;
  pic[309].alphaTest = 0;
  startScreenContainer.back = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[55].map.image.width * 0.35, pic[55].map.image.height * 0.35), pic[55]);
  startScreenContainer.title = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[58].map.image.width * 0.35, pic[58].map.image.height * 0.35), pic[58]);
  startScreenContainer.title.position.set(-4.6, 71, 0.001);
  startScreenContainer.title.scale.set(0, 0, 1);
  startScreenContainer.logo = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[66].map.image.width * 0.15, pic[66].map.image.height * 0.15), pic[66]);
  startScreenContainer.logo.position.y = -160;
  startScreenContainer.text = [];
  
  const sparkleGeometry = new THREE.CircleBufferGeometry(6, 24);
  for (let i = 1; i < 48; i++) {
  	goalSparkle[i] = new THREE.Mesh(sparkleGeometry, whiteMaterial);
  	goalSparkle[i].position.set(15, -60, -17);
  	goalSparkle[i].scale.set(0, 0, 1);
  	levelContainer[2].add(goalSparkle[i]);
  }
  
  for (let i = 0; i < 7; i++) {
    startScreenContainer.text[i] = new THREE.Mesh(new THREE.ShapeBufferGeometry(TTTravelsRegular.generateShapes(textArray[0][i], 7.9), 3), textMaterial);
    startScreenContainer.text[i].geometry.computeBoundingBox();
    startScreenContainer.text[i].geometry.translate(-0.5 * startScreenContainer.text[i].geometry.boundingBox.max.x, 0, 0);
    startScreenContainer.text[i].position.set(-4.6, 37 - 13.5 * i, 0.001);
    startScreenContainer.text[i].scale.y = 0;
    if (i > 2) startScreenContainer.text[i].position.y -= 9;
    startScreenContainer.add(startScreenContainer.text[i]);
  }
  startScreenContainer.button = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[56].map.image.width * 0.35, pic[56].map.image.height * 0.35), pic[56]);
  startScreenContainer.button.position.set(-3.5, -115, 0.001);
  startScreenContainer.button.scale.set(0, 0, 1);
  startScreenContainer.button.ready = false;
  startScreenContainer.add(startScreenContainer.logo, startScreenContainer.button, startScreenContainer.back, startScreenContainer.title);
  startScreenContainer.position.set(5, 15, -1);
  startScreenContainer.scale.set(0, 0, 1);
  finScreenContainer.back = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[97].map.image.width * 0.18, pic[97].map.image.height * 0.18), pic[97]);
  finScreenContainer.coin = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[100].map.image.width * 0.2, pic[100].map.image.height * 0.2), pic[100]);
  finScreenContainer.coin.position.set(0, -105, 0.001);
  finScreenContainer.coin.rotation.z = 0.1;
  gsap.to(finScreenContainer.coin.rotation, { duration: 1, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  finScreenContainer.coin.scale.set(0, 0, 1);
  finScreenContainer.text = [];
  for (let i = 0; i < 6; i++) {
    finScreenContainer.text[i] = new THREE.Mesh(new THREE.ShapeBufferGeometry(TTTravelsRegular.generateShapes(textArray[5][i], 7.4), 3), textMaterial);
    finScreenContainer.text[i].geometry.computeBoundingBox();
    finScreenContainer.text[i].geometry.translate(-0.5 * finScreenContainer.text[i].geometry.boundingBox.max.x, 0, 0);
    finScreenContainer.text[i].position.set(0, 55 - 12 * i, 0.001);
    finScreenContainer.text[i].scale.y = 0;
    finScreenContainer.add(finScreenContainer.text[i]);
  }
  for (let i = 6; i < 9; i++) {
    finScreenContainer.text[i] = new THREE.Mesh(new THREE.ShapeBufferGeometry(TTTravelsBold.generateShapes(textArray[6][i - 6], 7), 3), textMaterial);
    finScreenContainer.text[i].geometry.computeBoundingBox();
    finScreenContainer.text[i].geometry.translate(-0.5 * finScreenContainer.text[i].geometry.boundingBox.max.x, 0, 0);
    finScreenContainer.text[i] .position.set(0, 45 - 12 * i, 0.001);
    finScreenContainer.text[i].scale.y = 0;
    finScreenContainer.add(finScreenContainer.text[i]);
  }
  finScreenContainer.logo = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[66].map.image.width * 0.12, pic[66].map.image.height * 0.12), pic[66]);
  finScreenContainer.logo.position.set(0, -215, 0.1);
  finScreenContainer.button = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[98].map.image.width * 0.18, pic[98].map.image.height * 0.18), pic[98]);
  finScreenContainer.button.position.set(0, -180, 0.001);
  finScreenContainer.button.scale.set(0, 0, 1);
  finScreenContainer.button.ready = false;
  finScreenContainer.sparkle = [];
  for (let i = 0; i < 12; i++) {
    finScreenContainer.sparkle[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[74].map.image.width * 0.15, pic[74].map.image.height * 0.15), pic[74]);
    finScreenContainer.sparkle[i].rotation.z = Math.random() * 6;
    finScreenContainer.sparkle[i].scale.set(0, 0, 1);
    finScreenContainer.sparkle[i].position.set(0, -105, 0.002);
    finScreenContainer.add(finScreenContainer.sparkle[i]);
  }
  finScreenContainer.add(finScreenContainer.logo, finScreenContainer.button, finScreenContainer.back, finScreenContainer.coin);
  finScreenContainer.position.set(0, 50, -1);
  finScreenContainer.scale.set(0, 0, 1);
  resultBlock.win = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[75].map.image.width * 0.22, pic[75].map.image.height * 0.22), pic[75]);
  resultBlock.win.scale.set(0, 0, 1);
  resultBlock.lose = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[76].map.image.width * 0.22, pic[76].map.image.height * 0.22), pic[76]);
  resultBlock.lose.position.y = -3;
  resultBlock.lose.scale.set(0, 0, 1);
  resultBlock.arrow = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[77].map.image.width * 0.22, pic[77].map.image.height * 0.22), pic[77]);
  resultBlock.arrow.position.set(70, -110, 0);
  resultBlock.arrow.scale.set(0, 0, 1);
  resultBlock.add(resultBlock.arrow, resultBlock.win, resultBlock.lose);
  resultBlock.position.set(0, 80, 1);
  gameContainer.add(resultBlock);
  
  let shape = new THREE.Shape();
  shape.absarc(-document.body.clientWidth / mainScene.scale.x / 2 + 5, 0, 3, Math.PI * 0.5, Math.PI * 1.5);
  shape.absarc(document.body.clientWidth / mainScene.scale.x / 2 - 5, 0, 3, Math.PI * 1.5, Math.PI * 2.5);
  timeline.block = new THREE.Mesh(new THREE.ShapeBufferGeometry(shape, 8), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
  
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(-document.body.clientWidth / mainScene.scale.x / 2 + 5, 0, 2.5, Math.PI * 0.5, Math.PI * 1.5);
  shape.absarc(document.body.clientWidth / mainScene.scale.x / 2 - 5, 0, 2.5, Math.PI * 1.5, Math.PI * 2.5);
  timeline.back = new THREE.Mesh(new THREE.ShapeBufferGeometry(shape, 8), new THREE.MeshBasicMaterial({ color: 0x444444 }));
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(0, 0, 2.5, Math.PI * 0.5, Math.PI * 1.5);
  shape.absarc(0, 0, 2.5, Math.PI * 1.5, Math.PI * 2.5);
  timeline.bar = new THREE.Mesh(new THREE.ShapeBufferGeometry(shape, 8), new THREE.MeshBasicMaterial({ color: 0x438f10 }));
  timeline.bar.position.x = -document.body.clientWidth / mainScene.scale.x / 2 + 5;
  timeline.icon = [];
  timeline.text = [`13к лет до н.э.`, `80 год н.э.`, `1988 год`, `2122 год`];
  for (let i = 0; i < 4; i++) {
    timeline.icon[i] = new THREE.Object3D();
    timeline.icon[i].part = [];
    timeline.icon[i].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[397 + i].map.image.width * 0.08, pic[397 + i].map.image.height * 0.08), pic[397 + i]);
    timeline.icon[i].part[0].geometry.translate(pic[397 + i].map.image.width * 0.04, 0, 0);
    timeline.icon[i].part[1] = new THREE.Mesh(new THREE.ShapeBufferGeometry(TTTravelsRegular.generateShapes(timeline.text[i], 4), 1.8), whiteMaterial);
    timeline.icon[i].part[1].position.set(15, -4, 0);
    timeline.icon[i].position.set(-document.body.clientWidth / mainScene.scale.x / 2 + 5 + (document.body.clientWidth / mainScene.scale.x / 2 - 5) / 2 * i, 12, 0);
    timeline.icon[i].add(timeline.icon[i].part[0], timeline.icon[i].part[1]);
    timeline.add(timeline.icon[i]);
  }
  timeline.point = [];
  for (let i = 0; i < 3; i++) {
    timeline.point[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.5, 8), whiteMaterial);
    timeline.point[i].position.set(-(document.body.clientWidth / mainScene.scale.x / 2 - 5) / 2 + (document.body.clientWidth / mainScene.scale.x / 2 - 5) / 2 * i, 1, 0.1);
    timeline.add(timeline.point[i]);
  }
  timeline.add(timeline.block, timeline.back, timeline.bar);
  timeline.position.z = -1;
  timeline.scale.set(0, 0, 1);
  
  mainScene.add(timeline, finScreenContainer, startScreenContainer);
  for (let i = 0; i < 4; i++) {
    levelScene[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(249, 540), new THREE.MeshBasicMaterial({ map: renderTarget[i].texture, transparent: true, opacity: 0 }));
    levelScene[i].part = [];
    levelScene[i].title = [];
    for (let j = 0; j < textArray[i + 1].length - 1; j++) {
      levelScene[i].title[j] = new THREE.Mesh(new THREE.ShapeBufferGeometry(TTTravelsBlack.generateShapes(textArray[i + 1][j], 16), 3), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
      levelScene[i].title[j].geometry.computeBoundingBox();
      levelScene[i].title[j].geometry.translate(-0.5 * levelScene[i].title[j].geometry.boundingBox.max.x, 0, 0);
      levelScene[i].title[j].position.set(249 * i, 30 - 26 * j, 0.2);
      gameContainer.add(levelScene[i].title[j]);
    }
    levelScene[i].title[textArray[i + 1].length - 1] = new THREE.Mesh(new THREE.ShapeBufferGeometry(TTTravelsMedium.generateShapes(textArray[i + 1][textArray[i + 1].length - 1], 8), 3), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
    levelScene[i].title[textArray[i + 1].length - 1].geometry.computeBoundingBox();
    levelScene[i].title[textArray[i + 1].length - 1].geometry.translate(-0.5 * levelScene[i].title[textArray[i + 1].length - 1].geometry.boundingBox.max.x, 0, 0);
    levelScene[i].title[textArray[i + 1].length - 1].position.set(249 * i, 40 - 26 * textArray[i + 1].length - 1, 0.2);
    gameContainer.add(levelScene[i].title[textArray[i + 1].length - 1]);
    levelScene[i].position.x = 249 * i;
    gameContainer.add(levelScene[i]);
    levelContainer[i].part = [];
    renderTargetScene[i].add(levelContainer[i]);
  }
  border.part = [];
  for (let i = 0; i < 3; i++) {
    border.part[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(540 / pic[401 + i].map.image.height * pic[401 + i].map.image.width, 540), pic[401 + i]);
    border.part[i].position.set(249 / 2 + 249 * i, 0, 0.5);
    border.add(border.part[i]);
    gameContainer.add(border);
    
  }
  //gameContainer.position.x = -249 * 3
  scoreBlock.back = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[73].map.image.width * 0.25, pic[73].map.image.height * 0.25), pic[73]);
  scoreBlock.coin = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[74].map.image.width * 0.25, pic[74].map.image.height * 0.25), pic[74]);
  scoreBlock.coin.position.set(42, 0, 0.001);
  scoreBlock.count = new THREE.Object3D();
  scoreBlock.count.text = new THREE.Mesh(new THREE.ShapeBufferGeometry(TTTravelsBold.generateShapes("0", 13), 3), whiteMaterial);
  scoreBlock.count.text.geometry.computeBoundingBox();
  scoreBlock.count.text.geometry.translate(-scoreBlock.count.text.geometry.boundingBox.max.x, 0, 0);
  scoreBlock.count.shadow = new THREE.Mesh(scoreBlock.count.text.geometry, new THREE.MeshBasicMaterial({ color: 0x387225 }));
  scoreBlock.count.shadow.position.set(1, -1, -0.001);
  scoreBlock.count.add(scoreBlock.count.text, scoreBlock.count.shadow);
  scoreBlock.count.position.set(22, -6, 0.01);
  scoreBlock.scale.set(0, 0, 1);
  scoreBlock.sparkle = [];
  for (let i = 0; i < 12; i++) {
    scoreBlock.sparkle[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[74].map.image.width * 0.15, pic[74].map.image.height * 0.15), pic[74]);
    scoreBlock.sparkle[i].rotation.z = Math.random() * 6;
    scoreBlock.sparkle[i].scale.set(0, 0, 1);
    scoreBlock.sparkle[i].position.set(42, 0, 0.001);
    scoreBlock.add(scoreBlock.sparkle[i]);
  }
  scoreBlock.add(scoreBlock.count, scoreBlock.back, scoreBlock.coin);
  scoreBlock.position.x = 60;
  scoreBlock.position.z = 1;
  gameContainer.add(scoreBlock);
  levelContainer[0].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[0].map.image.width * pic[0].map.image.height), pic[0]);
  levelContainer[0].part[0].position.z = -10;
  levelContainer[0].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[1].map.image.width * pic[1].map.image.height), pic[1]);
  levelContainer[0].part[1].geometry.translate(0, -249 / pic[0].map.image.width * pic[1].map.image.height, 0);
  levelContainer[0].part[1].position.set(0, 540, -19);
  levelContainer[0].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[5].map.image.width * 0.815, pic[5].map.image.height * 0.815), pic[5]);
  levelContainer[0].part[2].position.set(-201, -42, -8);
  levelContainer[0].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[3].map.image.width * 0.92, pic[3].map.image.height * 0.92), pic[3]);
  levelContainer[0].part[3].position.set(115, -190, -6);
  levelContainer[0].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[4].map.image.width * 0.605, pic[4].map.image.height * 0.605), pic[4]);
  levelContainer[0].part[4].scale.x = -1;
  levelContainer[0].part[4].rotation.z = 0.13;
  levelContainer[0].part[4].position.set(-244, -270, -4);
  levelContainer[0].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[6].map.image.width * 0.85, pic[6].map.image.height * 0.85), pic[6]);
  levelContainer[0].part[5].rotation.z = 0.05;
  levelContainer[0].part[5].position.set(-27, -215, -8);
  levelContainer[0].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 1080), pic[59]);
  levelContainer[0].part[6].position.set(0, 0, -1);
  levelContainer[0].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[10].map.image.width * 0.15, pic[10].map.image.height * 0.15), pic[10]);
  levelContainer[0].part[7].position.set(125, 200, -9.5);
  levelContainer[0].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[9].map.image.width * 0.19, pic[9].map.image.height * 0.19), pic[9]);
  levelContainer[0].part[8].position.set(10, 100, -9);
  levelContainer[0].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[2].map.image.width * 0.85, pic[2].map.image.height * 0.85), pic[2]);
  levelContainer[0].part[9].position.set(140, 122, -8.9);
  levelContainer[0].part[10] = new THREE.Object3D();
  levelContainer[0].part[10].part = [];
  levelContainer[0].part[10].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[10].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[10].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[10].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[10].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[10].add(levelContainer[0].part[10].part[0], levelContainer[0].part[10].part[1]);
  levelContainer[0].part[10].scale.set(0.29, 0.29, 1);
  levelContainer[0].part[10].position.set(-300, 195, -11);
  gsap.to(levelContainer[0].part[10].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[10].tween = gsap.to(levelContainer[0].part[10].position, { duration: 12, x: 300, ease: "none", repeat: -1 });
  levelContainer[0].part[11] = new THREE.Object3D();
  levelContainer[0].part[11].part = [];
  levelContainer[0].part[11].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[11].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[11].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[11].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[11].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[11].add(levelContainer[0].part[11].part[0], levelContainer[0].part[11].part[1]);
  levelContainer[0].part[11].scale.set(0.29, 0.29, 1);
  levelContainer[0].part[11].position.set(-300, 190, -11);
  gsap.to(levelContainer[0].part[11].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[11].tween = gsap.to(levelContainer[0].part[11].position, { duration: 12, x: 300, ease: "none", repeat: -1, delay: 3.2 });
  levelContainer[0].part[12] = new THREE.Object3D();
  levelContainer[0].part[12].part = [];
  levelContainer[0].part[12].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[12].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[12].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[12].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[12].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[12].add(levelContainer[0].part[12].part[0], levelContainer[0].part[12].part[1]);
  levelContainer[0].part[12].scale.set(0.29, 0.29, 1);
  levelContainer[0].part[12].position.set(-300, 195, -11);
  gsap.to(levelContainer[0].part[12].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[12].tween = gsap.to(levelContainer[0].part[12].position, { duration: 12, x: 300, ease: "none", repeat: -1, delay: 5.8 });
  levelContainer[0].part[13] = new THREE.Object3D();
  levelContainer[0].part[13].part = [];
  levelContainer[0].part[13].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[13].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[13].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[13].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[13].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[13].add(levelContainer[0].part[13].part[0], levelContainer[0].part[13].part[1]);
  levelContainer[0].part[13].scale.set(0.29, 0.29, 1);
  levelContainer[0].part[13].position.set(-300, 200, -11);
  gsap.to(levelContainer[0].part[13].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[13].tween = gsap.to(levelContainer[0].part[13].position, { duration: 12, x: 300, ease: "none", repeat: -1, delay: 9 });
  levelContainer[0].part[46] = new THREE.Object3D();
  levelContainer[0].part[46].part = [];
  levelContainer[0].part[46].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[46].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[46].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[46].part[1].position.set(165, 105, 0.001);
  levelContainer[0].part[46].headTween = gsap.to(levelContainer[0].part[46].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[46].add(levelContainer[0].part[46].part[0], levelContainer[0].part[46].part[1]);
  levelContainer[0].part[46].scale.set(0.3, 0.3, 1);
  levelContainer[0].part[46].position.set(-300, 205, -10.5);
  levelContainer[0].part[46].bodyTween = gsap.to(levelContainer[0].part[46].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[14] = new THREE.Object3D();
  levelContainer[0].part[14].part = [];
  levelContainer[0].part[14].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[14].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[14].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[14].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[14].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[14].add(levelContainer[0].part[14].part[0], levelContainer[0].part[14].part[1]);
  levelContainer[0].part[14].scale.set(0.26, 0.26, 1);
  levelContainer[0].part[14].position.set(-300, 215, -11.1);
  gsap.to(levelContainer[0].part[14].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[14].tween = gsap.to(levelContainer[0].part[14].position, { duration: 15, x: 300, ease: "none", repeat: -1 });
  levelContainer[0].part[15] = new THREE.Object3D();
  levelContainer[0].part[15].part = [];
  levelContainer[0].part[15].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[15].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[15].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[15].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[15].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[15].add(levelContainer[0].part[15].part[0], levelContainer[0].part[15].part[1]);
  levelContainer[0].part[15].scale.set(0.26, 0.26, 1);
  levelContainer[0].part[15].position.set(-300, 220, -11.1);
  gsap.to(levelContainer[0].part[15].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[15].tween = gsap.to(levelContainer[0].part[15].position, { duration: 15, x: 300, ease: "none", repeat: -1, delay: 3.2 });
  levelContainer[0].part[16] = new THREE.Object3D();
  levelContainer[0].part[16].part = [];
  levelContainer[0].part[16].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[16].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[16].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[16].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[16].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[16].add(levelContainer[0].part[16].part[0], levelContainer[0].part[16].part[1]);
  levelContainer[0].part[16].scale.set(0.26, 0.26, 1);
  levelContainer[0].part[16].position.set(-300, 210, -11.1);
  gsap.to(levelContainer[0].part[16].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[16].tween = gsap.to(levelContainer[0].part[16].position, { duration: 15, x: 300, ease: "none", repeat: -1, delay: 5.9 });
  levelContainer[0].part[17] = new THREE.Object3D();
  levelContainer[0].part[17].part = [];
  levelContainer[0].part[17].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[17].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[17].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[17].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[17].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[17].add(levelContainer[0].part[17].part[0], levelContainer[0].part[17].part[1]);
  levelContainer[0].part[17].scale.set(0.26, 0.26, 1);
  levelContainer[0].part[17].position.set(-300, 215, -11.1);
  gsap.to(levelContainer[0].part[17].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[17].tween = gsap.to(levelContainer[0].part[17].position, { duration: 15, x: 300, ease: "none", repeat: -1, delay: 9 });
  levelContainer[0].part[18] = new THREE.Object3D();
  levelContainer[0].part[18].part = [];
  levelContainer[0].part[18].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[18].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[18].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[18].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[18].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[18].add(levelContainer[0].part[18].part[0], levelContainer[0].part[18].part[1]);
  levelContainer[0].part[18].scale.set(0.26, 0.26, 1);
  levelContainer[0].part[18].position.set(-300, 215, -11.1);
  gsap.to(levelContainer[0].part[18].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[18].tween = gsap.to(levelContainer[0].part[18].position, { duration: 15, x: 300, ease: "none", repeat: -1, delay: 12 });
  levelContainer[0].part[19] = new THREE.Object3D();
  levelContainer[0].part[19].part = [];
  levelContainer[0].part[19].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[19].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[19].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[19].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[19].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[19].add(levelContainer[0].part[19].part[0], levelContainer[0].part[19].part[1]);
  levelContainer[0].part[19].scale.set(0.23, 0.23, 1);
  levelContainer[0].part[19].position.set(-300, 230, -11.2);
  gsap.to(levelContainer[0].part[19].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[19].tween = gsap.to(levelContainer[0].part[19].position, { duration: 17, x: 300, ease: "none", repeat: -1 });
  levelContainer[0].part[20] = new THREE.Object3D();
  levelContainer[0].part[20].part = [];
  levelContainer[0].part[20].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[20].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[20].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[20].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[20].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[20].add(levelContainer[0].part[20].part[0], levelContainer[0].part[20].part[1]);
  levelContainer[0].part[20].scale.set(0.23, 0.23, 1);
  levelContainer[0].part[20].position.set(-300, 235, -11.2);
  gsap.to(levelContainer[0].part[20].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[20].tween = gsap.to(levelContainer[0].part[20].position, { duration: 17, x: 300, ease: "none", repeat: -1, delay: 4.5 });
  levelContainer[0].part[21] = new THREE.Object3D();
  levelContainer[0].part[21].part = [];
  levelContainer[0].part[21].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[21].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[21].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[21].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[21].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[21].add(levelContainer[0].part[21].part[0], levelContainer[0].part[21].part[1]);
  levelContainer[0].part[21].scale.set(0.23, 0.23, 1);
  levelContainer[0].part[21].position.set(-300, 230, -11.2);
  gsap.to(levelContainer[0].part[21].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[21].tween = gsap.to(levelContainer[0].part[21].position, { duration: 17, x: 300, ease: "none", repeat: -1, delay: 8 });
  levelContainer[0].part[22] = new THREE.Object3D();
  levelContainer[0].part[22].part = [];
  levelContainer[0].part[22].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[7].map.image.width, pic[7].map.image.height), pic[7]);
  levelContainer[0].part[22].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[8].map.image.width, pic[8].map.image.height), pic[8]);
  levelContainer[0].part[22].part[1].geometry.translate(pic[8].map.image.width * 0.25, -pic[8].map.image.height * 0.3, 0);
  levelContainer[0].part[22].part[1].position.set(165, 105, 0.001);
  gsap.to(levelContainer[0].part[22].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[22].add(levelContainer[0].part[22].part[0], levelContainer[0].part[22].part[1]);
  levelContainer[0].part[22].scale.set(0.23, 0.23, 1);
  levelContainer[0].part[22].position.set(-300, 235, -11.2);
  gsap.to(levelContainer[0].part[22].rotation, { duration: 0.5 + Math.random(), z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[22].tween = gsap.to(levelContainer[0].part[22].position, { duration: 17, x: 300, ease: "none", repeat: -1, delay: 12.5 });
  levelContainer[0].part[23] = new THREE.Object3D();
  levelContainer[0].part[23].part = [];
  levelContainer[0].part[23].part[0] = new THREE.Object3D();
  levelContainer[0].part[23].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[11].map.image.width, pic[11].map.image.height), pic[11]);
  levelContainer[0].part[23].part[1].geometry.translate(0, pic[11].map.image.height * 0.4, 0);
  levelContainer[0].part[23].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[12].map.image.width, pic[12].map.image.height), pic[12]);
  levelContainer[0].part[23].part[2].geometry.translate(pic[12].map.image.width * 0.1, pic[12].map.image.height * 0.4, 0);
  levelContainer[0].part[23].part[2].position.set(-10, 245, 0.001);
  levelContainer[0].part[23].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[23].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[23].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[13].map.image.width, pic[13].map.image.height), pic[13]);
  levelContainer[0].part[23].part[3].geometry.translate(-pic[13].map.image.width * 0.4, -pic[13].map.image.height * 0.4, 0);
  levelContainer[0].part[23].part[3].position.set(-45, 218, -0.001);
  gsap.to(levelContainer[0].part[23].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[23].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[14].map.image.width, pic[14].map.image.height), pic[14]);
  levelContainer[0].part[23].part[4].geometry.translate(-pic[14].map.image.width * 0.4, -pic[14].map.image.height * 0.4, 0);
  levelContainer[0].part[23].part[4].position.set(80, 205, 0.001);
  gsap.to(levelContainer[0].part[23].part[4].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[23].part[0].add(levelContainer[0].part[23].part[4], levelContainer[0].part[23].part[3], levelContainer[0].part[23].part[2], levelContainer[0].part[23].part[1]);
  levelContainer[0].part[23].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[23].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[23].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[15].map.image.width, pic[15].map.image.height), pic[15]);
  levelContainer[0].part[23].part[5].position.set(-7, -55, -0.001);
  levelContainer[0].part[23].add(levelContainer[0].part[23].part[0], levelContainer[0].part[23].part[5]);
  levelContainer[0].part[23].scale.set(0.26, 0.26, 1);
  levelContainer[0].part[23].position.set(210, 125, -8.7);
  levelContainer[0].part[24] = new THREE.Object3D();
  levelContainer[0].part[24].part = [];
  levelContainer[0].part[24].part[0] = new THREE.Object3D();
  levelContainer[0].part[24].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[16].map.image.width, pic[16].map.image.height), pic[16]);
  levelContainer[0].part[24].part[1].geometry.translate(0, pic[16].map.image.height * 0.4, 0);
  levelContainer[0].part[24].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[17].map.image.width, pic[17].map.image.height), pic[17]);
  levelContainer[0].part[24].part[2].geometry.translate(pic[17].map.image.width * 0.1, pic[17].map.image.height * 0.4, 0);
  levelContainer[0].part[24].part[2].position.set(-20, 250, 0.001);
  levelContainer[0].part[24].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[24].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[24].part[3] = new THREE.Object3D();
  levelContainer[0].part[24].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[18].map.image.width, pic[18].map.image.height), pic[18]);
  levelContainer[0].part[24].part[4].geometry.translate(-pic[18].map.image.width * 0.1, -pic[18].map.image.height * 0.4, 0);
  levelContainer[0].part[24].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[19].map.image.width, pic[19].map.image.height), pic[19]);
  levelContainer[0].part[24].part[5].geometry.translate(-pic[19].map.image.width * 0.4, -pic[19].map.image.height * 0.4, 0);
  levelContainer[0].part[24].part[5].position.set(-5, -75, 0.001);
  levelContainer[0].part[24].part[3].add(levelContainer[0].part[24].part[4], levelContainer[0].part[24].part[5]);
  levelContainer[0].part[24].part[3].position.set(-48, 230, -0.01);
  levelContainer[0].part[24].handTween1 = gsap.to(levelContainer[0].part[24].part[3].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[0].part[24].handTween2 = gsap.to(levelContainer[0].part[24].part[5].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[0].part[24].part[6] = new THREE.Object3D();
  levelContainer[0].part[24].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[18].map.image.width, pic[18].map.image.height), pic[18]);
  levelContainer[0].part[24].part[7].geometry.translate(-pic[18].map.image.width * 0.1, -pic[18].map.image.height * 0.4, 0);
  levelContainer[0].part[24].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[20].map.image.width, pic[20].map.image.height), pic[20]);
  levelContainer[0].part[24].part[8].geometry.translate(-pic[20].map.image.width * 0.3, -pic[20].map.image.height * 0.4, 0);
  levelContainer[0].part[24].part[8].position.set(-7, -80, 0.001);
  levelContainer[0].part[24].part[8].rotation.z = -0.5;
  levelContainer[0].part[24].handTween3 = gsap.to(levelContainer[0].part[24].part[6].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[24].handTween4 = gsap.to(levelContainer[0].part[24].part[8].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[24].part[6].add(levelContainer[0].part[24].part[7], levelContainer[0].part[24].part[8]);
  levelContainer[0].part[24].part[6].position.set(58, 228, 0.01);
  levelContainer[0].part[24].part[6].rotation.z = 0.5;
  levelContainer[0].part[24].part[9] = new THREE.Object3D();
  levelContainer[0].part[24].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[21].map.image.width, pic[21].map.image.height), pic[21]);
  levelContainer[0].part[24].part[10].geometry.translate(0, -pic[21].map.image.height * 0.4, 0);
  levelContainer[0].part[24].part[11] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[22].map.image.width, pic[22].map.image.height), pic[22]);
  levelContainer[0].part[24].part[11].geometry.translate(-pic[22].map.image.width * 0.2, -pic[22].map.image.height * 0.3, 0);
  levelContainer[0].part[24].part[11].position.set(7, -80, -0.001);
  levelContainer[0].part[24].part[9].add(levelContainer[0].part[24].part[10], levelContainer[0].part[24].part[11]);
  levelContainer[0].part[24].part[9].position.set(-40, 50, -0.01);
  levelContainer[0].part[24].part[9].rotation.z = 0.2;
  levelContainer[0].part[24].part[11].rotation.z = 0.5;
  levelContainer[0].part[24].legTween1 = gsap.to(levelContainer[0].part[24].part[9].rotation, { duration: 0.3, z: -0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[24].legTween2 = gsap.to(levelContainer[0].part[24].part[11].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[24].part[12] = new THREE.Object3D();
  levelContainer[0].part[24].part[13] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[21].map.image.width, pic[21].map.image.height), pic[21]);
  levelContainer[0].part[24].part[13].geometry.translate(0, -pic[21].map.image.height * 0.4, 0);
  levelContainer[0].part[24].part[14] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[22].map.image.width, pic[22].map.image.height), pic[22]);
  levelContainer[0].part[24].part[14].geometry.translate(-pic[22].map.image.width * 0.2, -pic[22].map.image.height * 0.3, 0);
  levelContainer[0].part[24].part[14].position.set(7, -80, -0.001);
  levelContainer[0].part[24].part[12].add(levelContainer[0].part[24].part[13], levelContainer[0].part[24].part[14]);
  levelContainer[0].part[24].part[12].position.set(35, 50, -0.01);
  levelContainer[0].part[24].part[12].rotation.z = -0.3;
  levelContainer[0].part[24].legTween3 = gsap.to(levelContainer[0].part[24].part[12].rotation, { duration: 0.3, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[24].legTween4 = gsap.to(levelContainer[0].part[24].part[14].rotation, { duration: 0.3, z: 0.5, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[24].part[0].add(levelContainer[0].part[24].part[9], levelContainer[0].part[24].part[6], levelContainer[0].part[24].part[3], levelContainer[0].part[24].part[2], levelContainer[0].part[24].part[1]);
  levelContainer[0].part[24].add(levelContainer[0].part[24].part[12], levelContainer[0].part[24].part[9], levelContainer[0].part[24].part[0]);
  levelContainer[0].part[24].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[24].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[24].scale.set(-0.45, 0.45, 1);
  levelContainer[0].part[24].position.set(-350, -280, -2);
  levelContainer[0].part[25] = new THREE.Object3D();
  levelContainer[0].part[25].part = [];
  levelContainer[0].part[25].part[0] = new THREE.Object3D();
  levelContainer[0].part[25].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[23].map.image.width, pic[23].map.image.height), pic[23]);
  levelContainer[0].part[25].part[1].geometry.translate(0, pic[23].map.image.height * 0.4, 0);
  levelContainer[0].part[25].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[24].map.image.width, pic[24].map.image.height), pic[24]);
  levelContainer[0].part[25].part[2].geometry.translate(pic[24].map.image.width * 0.1, pic[24].map.image.height * 0.4, 0);
  levelContainer[0].part[25].part[2].position.set(-10, 230, 0.001);
  levelContainer[0].part[25].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[25].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[25].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[25].map.image.width, pic[25].map.image.height), pic[25]);
  levelContainer[0].part[25].part[3].geometry.translate(-pic[25].map.image.width * 0.4, -pic[25].map.image.height * 0.4, 0);
  levelContainer[0].part[25].part[3].position.set(-45, 218, -0.001);
  gsap.to(levelContainer[0].part[25].part[3].rotation, { duration: 1 + Math.random() * 2, z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[25].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[26].map.image.width, pic[26].map.image.height), pic[26]);
  levelContainer[0].part[25].part[4].geometry.translate(-pic[26].map.image.width * 0.2, -pic[26].map.image.height * 0.4, 0);
  levelContainer[0].part[25].part[4].position.set(70, 215, 0.001);
  gsap.to(levelContainer[0].part[25].part[4].rotation, { duration: 1 + Math.random() * 2, z: -0.5, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[25].part[0].add(levelContainer[0].part[25].part[4], levelContainer[0].part[25].part[3], levelContainer[0].part[25].part[2], levelContainer[0].part[25].part[1]);
  levelContainer[0].part[25].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[25].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[25].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[27].map.image.width, pic[27].map.image.height), pic[27]);
  levelContainer[0].part[25].part[5].position.set(-7, -55, -0.001);
  levelContainer[0].part[25].add(levelContainer[0].part[25].part[0], levelContainer[0].part[25].part[5]);
  levelContainer[0].part[25].scale.set(0.34, 0.34, 1);
  levelContainer[0].part[25].position.set(-40, -220, -6.01);
  levelContainer[0].part[26] = new THREE.Object3D();
  levelContainer[0].part[26].part = [];
  levelContainer[0].part[26].part[0] = new THREE.Object3D();
  levelContainer[0].part[26].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[28].map.image.width, pic[28].map.image.height), pic[28]);
  levelContainer[0].part[26].part[1].geometry.translate(0, pic[28].map.image.height * 0.4, 0);
  levelContainer[0].part[26].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[29].map.image.width, pic[29].map.image.height), pic[29]);
  levelContainer[0].part[26].part[2].geometry.translate(pic[29].map.image.width * 0.1, pic[29].map.image.height * 0.4, 0);
  levelContainer[0].part[26].part[2].position.set(-30, 200, 0.001);
  levelContainer[0].part[26].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[26].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[26].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[30].map.image.width, pic[30].map.image.height), pic[30]);
  levelContainer[0].part[26].part[3].geometry.translate(-pic[30].map.image.width * 0.4, -pic[30].map.image.height * 0.4, 0);
  levelContainer[0].part[26].part[3].position.set(-50, 175, -0.001);
  gsap.to(levelContainer[0].part[26].part[3].rotation, { duration: 1 + Math.random() * 2, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[26].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[31].map.image.width, pic[31].map.image.height), pic[31]);
  levelContainer[0].part[26].part[4].geometry.translate(pic[31].map.image.width * 0.2, -pic[31].map.image.height * 0.4, 0);
  levelContainer[0].part[26].part[4].position.set(50, 170, 0.001);
  gsap.to(levelContainer[0].part[26].part[4].rotation, { duration: 1 + Math.random() * 2, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[26].part[0].add(levelContainer[0].part[26].part[4], levelContainer[0].part[26].part[3], levelContainer[0].part[26].part[2], levelContainer[0].part[26].part[1]);
  levelContainer[0].part[26].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[26].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[26].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[32].map.image.width, pic[32].map.image.height), pic[32]);
  levelContainer[0].part[26].part[5].position.set(5, -50, -0.001);
  levelContainer[0].part[26].add(levelContainer[0].part[26].part[0], levelContainer[0].part[26].part[5]);
  levelContainer[0].part[26].scale.set(0.22, 0.22, 1);
  levelContainer[0].part[26].position.set(-90, 205, -9.4);
  levelContainer[0].part[27] = new THREE.Object3D();
  levelContainer[0].part[27].part = [];
  levelContainer[0].part[27].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[33].map.image.width * 0.58, pic[33].map.image.height * 0.58), pic[33]);
  levelContainer[0].part[27].part[0].geometry.translate(0, pic[33].map.image.height * 0.4 * 0.58, 0);
  levelContainer[0].part[27].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[34].map.image.width, pic[34].map.image.height), pic[34]);
  levelContainer[0].part[27].part[1].geometry.translate(pic[34].map.image.width * 0.1, pic[34].map.image.height * 0.4, 0);
  levelContainer[0].part[27].part[1].position.set(-12, 273, 0.001);
  levelContainer[0].part[27].part[1].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[27].part[1].rotation, { duration: 1 + Math.random() * 2, z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[27].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[35].map.image.width, pic[35].map.image.height), pic[35]);
  levelContainer[0].part[27].part[2].geometry.translate(-pic[35].map.image.width * 0.4, -pic[35].map.image.height * 0.4, 0);
  levelContainer[0].part[27].part[2].position.set(-45, 250, -0.001);
  gsap.to(levelContainer[0].part[27].part[2].rotation, { duration: 1 + Math.random() * 2, z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[27].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[36].map.image.width, pic[36].map.image.height), pic[36]);
  levelContainer[0].part[27].part[3].geometry.translate(-pic[36].map.image.width * 0.2, -pic[36].map.image.height * 0.4, 0);
  levelContainer[0].part[27].part[3].position.set(57, 250, 0.001);
  gsap.to(levelContainer[0].part[27].part[3].rotation, { duration: 1 + Math.random() * 2, z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[27].add(levelContainer[0].part[27].part[0], levelContainer[0].part[27].part[1], levelContainer[0].part[27].part[2], levelContainer[0].part[27].part[3]);
  levelContainer[0].part[27].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[27].rotation, { duration: 2 + Math.random() * 3, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[27].position.set(170, -300, -5.5);
  levelContainer[0].part[27].scale.set(0.45, 0.45, 1);
  levelContainer[0].part[28] = new THREE.Object3D();
  levelContainer[0].part[28].part = [];
  levelContainer[0].part[28].part[0] = new THREE.Object3D();
  levelContainer[0].part[28].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[37].map.image.width, pic[37].map.image.height), pic[37]);
  levelContainer[0].part[28].part[1].geometry.translate(0, pic[37].map.image.height * 0.4, 0);
  levelContainer[0].part[28].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[38].map.image.width, pic[38].map.image.height), pic[38]);
  levelContainer[0].part[28].part[2].geometry.translate(pic[38].map.image.width * 0.1, pic[38].map.image.height * 0.4, 0);
  levelContainer[0].part[28].part[2].position.set(-20, 240, 0.001);
  levelContainer[0].part[28].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[28].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[28].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[39].map.image.width, pic[39].map.image.height), pic[39]);
  levelContainer[0].part[28].part[3].geometry.translate(-pic[39].map.image.width * 0.4, -pic[39].map.image.height * 0.4, 0);
  levelContainer[0].part[28].part[3].position.set(-65, 200, -0.001);
  gsap.to(levelContainer[0].part[28].part[3].rotation, { duration: 1 + Math.random() * 2, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[28].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[40].map.image.width, pic[40].map.image.height), pic[40]);
  levelContainer[0].part[28].part[4].geometry.translate(pic[40].map.image.width * 0.2, -pic[40].map.image.height * 0.4, 0);
  levelContainer[0].part[28].part[4].position.set(55, 195, 0.001);
  gsap.to(levelContainer[0].part[28].part[4].rotation, { duration: 1 + Math.random() * 2, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[28].part[0].add(levelContainer[0].part[28].part[4], levelContainer[0].part[28].part[3], levelContainer[0].part[28].part[2], levelContainer[0].part[28].part[1]);
  levelContainer[0].part[28].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[28].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[28].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[41].map.image.width, pic[41].map.image.height), pic[41]);
  levelContainer[0].part[28].part[5].position.set(-15, -65, -0.001);
  levelContainer[0].part[28].add(levelContainer[0].part[28].part[0], levelContainer[0].part[28].part[5]);
  levelContainer[0].part[28].scale.set(-0.22, 0.22, 1);
  levelContainer[0].part[28].position.set(-155, 215, -9.5);
  levelContainer[0].part[29] = new THREE.Object3D();
  levelContainer[0].part[29].part = [];
  levelContainer[0].part[29].part[0] = new THREE.Object3D();
  levelContainer[0].part[29].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[42].map.image.width, pic[42].map.image.height), pic[42]);
  levelContainer[0].part[29].part[1].geometry.translate(0, pic[42].map.image.height * 0.4, 0);
  levelContainer[0].part[29].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[43].map.image.width, pic[43].map.image.height), pic[43]);
  levelContainer[0].part[29].part[2].geometry.translate(pic[43].map.image.width * 0.1, pic[43].map.image.height * 0.4, 0);
  levelContainer[0].part[29].part[2].position.set(-10, 245, 0.001);
  levelContainer[0].part[29].part[2].rotation.z = -0.05;
  gsap.to(levelContainer[0].part[29].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[29].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[44].map.image.width, pic[44].map.image.height), pic[44]);
  levelContainer[0].part[29].part[3].geometry.translate(-pic[44].map.image.width * 0.4, -pic[44].map.image.height * 0.2, 0);
  levelContainer[0].part[29].part[3].position.set(-55, 215, -0.001);
  gsap.to(levelContainer[0].part[29].part[3].rotation, { duration: 1 + Math.random() * 2, z: -0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[29].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[45].map.image.width, pic[45].map.image.height), pic[45]);
  levelContainer[0].part[29].part[4].geometry.translate(0, -pic[45].map.image.height * 0.4, 0);
  levelContainer[0].part[29].part[4].position.set(75, 210, 0.001);
  gsap.to(levelContainer[0].part[29].part[4].rotation, { duration: 1 + Math.random() * 2, z: -0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[29].part[0].add(levelContainer[0].part[29].part[4], levelContainer[0].part[29].part[3], levelContainer[0].part[29].part[2], levelContainer[0].part[29].part[1]);
  levelContainer[0].part[29].part[0].rotation.z = -0.05;
  gsap.to(levelContainer[0].part[29].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[29].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[46].map.image.width, pic[46].map.image.height), pic[46]);
  levelContainer[0].part[29].part[5].position.set(-7, -55, -0.001);
  levelContainer[0].part[29].add(levelContainer[0].part[29].part[0], levelContainer[0].part[29].part[5]);
  levelContainer[0].part[29].scale.set(-0.37, 0.37, 1);
  levelContainer[0].part[29].position.set(-205, -260, -3);
  levelContainer[0].part[30] = new THREE.Object3D();
  levelContainer[0].part[30].part = [];
  levelContainer[0].part[30].part[0] = new THREE.Object3D();
  levelContainer[0].part[30].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[47].map.image.width, pic[47].map.image.height), pic[47]);
  levelContainer[0].part[30].part[1].geometry.translate(0, pic[47].map.image.height * 0.4, 0);
  levelContainer[0].part[30].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[48].map.image.width, pic[48].map.image.height), pic[48]);
  levelContainer[0].part[30].part[2].geometry.translate(pic[48].map.image.width * 0.1, pic[48].map.image.height * 0.4, 0);
  levelContainer[0].part[30].part[2].position.set(-12, 245, -0.001);
  levelContainer[0].part[30].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[30].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[30].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[49].map.image.width, pic[49].map.image.height), pic[49]);
  levelContainer[0].part[30].part[3].geometry.translate(-pic[49].map.image.width * 0.4, -pic[49].map.image.height * 0.4, 0);
  levelContainer[0].part[30].part[3].position.set(-40, 215, -0.001);
  gsap.to(levelContainer[0].part[30].part[3].rotation, { duration: 1 + Math.random() * 2, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[30].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[50].map.image.width, pic[50].map.image.height), pic[50]);
  levelContainer[0].part[30].part[4].geometry.translate(0, -pic[50].map.image.height * 0.4, 0);
  levelContainer[0].part[30].part[4].position.set(80, 210, 0.001);
  gsap.to(levelContainer[0].part[30].part[4].rotation, { duration: 1 + Math.random() * 2, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[30].part[0].add(levelContainer[0].part[30].part[4], levelContainer[0].part[30].part[3], levelContainer[0].part[30].part[2], levelContainer[0].part[30].part[1]);
  levelContainer[0].part[30].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[30].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[30].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[51].map.image.width, pic[51].map.image.height), pic[51]);
  levelContainer[0].part[30].part[5].position.set(-7, -55, -0.001);
  levelContainer[0].part[30].add(levelContainer[0].part[30].part[0], levelContainer[0].part[30].part[5]);
  levelContainer[0].part[30].scale.set(0.26, 0.26, 1);
  levelContainer[0].part[30].position.set(150, 140, -9.1);
  levelScene[0].part[0] = new THREE.Object3D();
  levelScene[0].part[0].back = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[60].map.image.width, pic[60].map.image.height), pic[60]);
  levelScene[0].part[0].button = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[61].map.image.width, pic[61].map.image.height), pic[61]);
  levelScene[0].part[0].button.position.set(-10, -120, 0.001);
  levelScene[0].part[0].add(levelScene[0].part[0].button, levelScene[0].part[0].back);
  //levelScene[0].part[0].back.position.set(-pic[60].map.image.width * 0.3, pic[60].map.image.height * 0.5, 0);
  levelScene[0].part[0].position.set(0, -115, 3);
  levelScene[0].part[0].scale.set(0, 0, 1);
  levelScene[0].part[0].button.ready = false;
  levelContainer[0].part[31] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[62].map.image.width * 0.4, pic[62].map.image.height * 0.4), pic[62]);
  levelContainer[0].part[31].geometry.translate(pic[62].map.image.width * 0.15, pic[62].map.image.height * -0.2, 0);
  levelContainer[0].part[31].position.set(-100, 250, -2);
  levelContainer[0].part[31].scale.set(0, 0, 1);
  levelContainer[0].part[32] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[63].map.image.width * 0.4, pic[63].map.image.height * 0.4), pic[63]);
  levelContainer[0].part[32].geometry.translate(pic[63].map.image.width * 0.15, pic[63].map.image.height * -0.2, 0);
  levelContainer[0].part[32].position.set(-140, 205, -1.5);
  levelContainer[0].part[32].scale.set(0, 0, 1);
  levelContainer[0].part[33] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[65].map.image.width * 0.4, pic[65].map.image.height * 0.4), pic[65]);
  levelContainer[0].part[33].geometry.translate(pic[65].map.image.width * -0.15, pic[65].map.image.height * 0.2, 0);
  levelContainer[0].part[33].position.set(130, 225, -2);
  levelContainer[0].part[33].scale.set(0, 0, 1);
  levelContainer[0].part[34] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[64].map.image.width * 0.4, pic[64].map.image.height * 0.4), pic[64]);
  levelContainer[0].part[34].geometry.translate(pic[64].map.image.width * -0.15, pic[64].map.image.height * 0.2, 0);
  levelContainer[0].part[34].position.set(190, 275, -1.5);
  levelContainer[0].part[34].scale.set(0, 0, 1);
  levelContainer[0].part[35] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[66].map.image.width * 0.4, pic[66].map.image.height * 0.4), pic[66]);
  levelContainer[0].part[35].geometry.translate(pic[66].map.image.width * 0.15, pic[66].map.image.height * 0.2, 0);
  levelContainer[0].part[35].position.set(-200, -120, -0.5);
  levelContainer[0].part[35].scale.set(0, 0, 1);
  levelContainer[0].part[36] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[67].map.image.width * 0.4, pic[67].map.image.height * 0.4), pic[67]);
  levelContainer[0].part[36].geometry.translate(-pic[67].map.image.width * 0.15, -pic[67].map.image.height * 0.2, 0);
  levelContainer[0].part[36].position.set(-52, -155, -0.5);
  levelContainer[0].part[36].scale.set(0, 0, 1);
  levelScene[0].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[68].map.image.width * 0.192, pic[68].map.image.height * 0.192), pic[68]);
  levelScene[0].part[1].position.set(0, -45, 1);
  levelScene[0].part[1].scale.set(0, 0, 1);
  levelScene[0].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[69].map.image.width * 0.192, pic[69].map.image.height * 0.192), pic[69]);
  levelScene[0].part[2].position.set(-44, -85, 1);
  levelScene[0].part[2].scale.set(0, 0, 1);
  levelScene[0].part[2].ready = false;
  levelScene[0].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[70].map.image.width * 0.192, pic[70].map.image.height * 0.192), pic[70]);
  levelScene[0].part[3].position.set(44, -85, 1);
  levelScene[0].part[3].scale.set(0, 0, 1);
  levelScene[0].part[3].ready = false;
  levelContainer[0].part[37] = new THREE.Object3D();
  levelContainer[0].part[37].part = [];
  levelContainer[0].part[37].part[0] = new THREE.Object3D();
  levelContainer[0].part[37].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[105].map.image.width, pic[105].map.image.height), pic[105]);
  levelContainer[0].part[37].part[1].geometry.translate(0, pic[105].map.image.height * 0.4, 0);
  levelContainer[0].part[37].part[0].rotation.z = 0.15;
  levelContainer[0].part[37].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[104].map.image.width, pic[104].map.image.height), pic[104]);
  levelContainer[0].part[37].part[2].geometry.translate(pic[104].map.image.width * 0.1, pic[104].map.image.height * 0.4, 0);
  levelContainer[0].part[37].part[2].position.set(-20, 210, 0.001);
  levelContainer[0].part[37].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[37].part[2].rotation, { duration: 0.5 + Math.random() * 1, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[37].part[3] = new THREE.Object3D();
  levelContainer[0].part[37].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[106].map.image.width, pic[106].map.image.height), pic[106]);
  levelContainer[0].part[37].part[4].geometry.translate(-pic[106].map.image.width * 0.1, -pic[106].map.image.height * 0.4, 0);
  levelContainer[0].part[37].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[107].map.image.width, pic[107].map.image.height), pic[107]);
  levelContainer[0].part[37].part[5].geometry.translate(-pic[107].map.image.width * 0.4, -pic[107].map.image.height * 0.4, 0);
  levelContainer[0].part[37].part[5].position.set(5, -65, 0.001);
  levelContainer[0].part[37].part[3].add(levelContainer[0].part[37].part[4], levelContainer[0].part[37].part[5]);
  levelContainer[0].part[37].part[3].position.set(-55, 200, -0.01);
  levelContainer[0].part[37].handTween1 = gsap.to(levelContainer[0].part[37].part[3].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[0].part[37].handTween2 = gsap.to(levelContainer[0].part[37].part[5].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[0].part[37].part[6] = new THREE.Object3D();
  levelContainer[0].part[37].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[108].map.image.width, pic[108].map.image.height), pic[108]);
  levelContainer[0].part[37].part[7].geometry.translate(-pic[108].map.image.width * 0.1, -pic[108].map.image.height * 0.4, 0);
  levelContainer[0].part[37].part[15] = new THREE.Object3D();
  levelContainer[0].part[37].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[109].map.image.width, pic[109].map.image.height), pic[109]);
  levelContainer[0].part[37].part[8].geometry.translate(-pic[109].map.image.width * 0.3, -pic[109].map.image.height * 0.4, 0);
  levelContainer[0].part[37].part[15].position.set(20, -65, 0.001);
  levelContainer[0].part[37].handTween3 = gsap.to(levelContainer[0].part[37].part[6].rotation, { duration: 0.5 + Math.random(), z: 0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[37].handTween4 = gsap.to(levelContainer[0].part[37].part[15].rotation, { duration: 0.5 + Math.random() * 1, z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[37].part[16] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[112].map.image.width, pic[112].map.image.height), pic[112]);
  levelContainer[0].part[37].part[16].rotation.z = 2.7;
  levelContainer[0].part[37].part[16].position.set(-50, -87, -0.001);
  levelContainer[0].part[37].part[15].add(levelContainer[0].part[37].part[16], levelContainer[0].part[37].part[8]);
  levelContainer[0].part[37].part[6].add(levelContainer[0].part[37].part[7], levelContainer[0].part[37].part[15]);
  levelContainer[0].part[37].part[6].position.set(70, 210, 0.01);
  levelContainer[0].part[37].part[6].rotation.z = 0.5;
  levelContainer[0].part[37].part[9] = new THREE.Object3D();
  levelContainer[0].part[37].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[110].map.image.width, pic[110].map.image.height), pic[110]);
  levelContainer[0].part[37].part[10].geometry.translate(0, -pic[110].map.image.height * 0.4, 0);
  levelContainer[0].part[37].part[11] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[111].map.image.width, pic[111].map.image.height), pic[111]);
  levelContainer[0].part[37].part[11].geometry.translate(-pic[111].map.image.width * 0.2, -pic[111].map.image.height * 0.3, 0);
  levelContainer[0].part[37].part[11].position.set(8, -85, -0.001);
  levelContainer[0].part[37].part[9].add(levelContainer[0].part[37].part[10], levelContainer[0].part[37].part[11]);
  levelContainer[0].part[37].part[9].position.set(-40, 50, -0.01);
  levelContainer[0].part[37].part[9].rotation.z = -0.5;
  levelContainer[0].part[37].part[11].rotation.z = 0.9;
  levelContainer[0].part[37].part[12] = new THREE.Object3D();
  levelContainer[0].part[37].part[13] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[110].map.image.width, pic[110].map.image.height), pic[110]);
  levelContainer[0].part[37].part[13].geometry.translate(0, -pic[110].map.image.height * 0.4, 0);
  levelContainer[0].part[37].part[14] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[111].map.image.width, pic[111].map.image.height), pic[111]);
  levelContainer[0].part[37].part[14].geometry.translate(-pic[111].map.image.width * 0.2, -pic[111].map.image.height * 0.3, 0);
  levelContainer[0].part[37].part[14].position.set(5, -85, -0.001);
  levelContainer[0].part[37].part[12].add(levelContainer[0].part[37].part[13], levelContainer[0].part[37].part[14]);
  levelContainer[0].part[37].part[12].position.set(32, 50, -0.01);
  levelContainer[0].part[37].part[12].rotation.z = -0.3;
  levelContainer[0].part[37].part[14].rotation.z = 0.6;
  levelContainer[0].part[37].part[0].add(levelContainer[0].part[37].part[9], levelContainer[0].part[37].part[6], levelContainer[0].part[37].part[3], levelContainer[0].part[37].part[2], levelContainer[0].part[37].part[1]);
  levelContainer[0].part[37].add(levelContainer[0].part[37].part[12], levelContainer[0].part[37].part[9], levelContainer[0].part[37].part[0]);
  levelContainer[0].part[37].bodyTween = gsap.to(levelContainer[0].part[37].part[0].rotation, { duration: 1 + Math.random() * 1, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[37].scale.set(0.36, 0.36, 1);
  levelContainer[0].part[37].position.set(85, -55, -8);
  levelContainer[0].part[38] = new THREE.Object3D();
  levelContainer[0].part[38].part = [];
  levelContainer[0].part[38].part[0] = new THREE.Object3D();
  levelContainer[0].part[38].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[113].map.image.width, pic[113].map.image.height), pic[113]);
  levelContainer[0].part[38].part[1].geometry.translate(pic[113].map.image.width * 0.3, pic[113].map.image.height * 0.1, 0);
  levelContainer[0].part[38].part[0].rotation.z = -0.1;
  levelContainer[0].part[38].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[114].map.image.width, pic[114].map.image.height), pic[114]);
  levelContainer[0].part[38].part[2].geometry.translate(pic[114].map.image.width * 0.1, pic[114].map.image.height * 0.4, 0);
  levelContainer[0].part[38].part[2].position.set(-10, 210, 0.001);
  levelContainer[0].part[38].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[38].part[2].rotation, { duration: 0.5 + Math.random() * 1, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[38].part[3] = new THREE.Object3D();
  levelContainer[0].part[38].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[115].map.image.width, pic[115].map.image.height), pic[115]);
  levelContainer[0].part[38].part[4].geometry.translate(-pic[115].map.image.width * 0.1, -pic[115].map.image.height * 0.4, 0);
  levelContainer[0].part[38].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[116].map.image.width, pic[116].map.image.height), pic[116]);
  levelContainer[0].part[38].part[5].geometry.translate(-pic[116].map.image.width * 0.4, -pic[116].map.image.height * 0.4, 0);
  levelContainer[0].part[38].part[5].position.set(5, -69, 0.001);
  levelContainer[0].part[38].part[3].add(levelContainer[0].part[38].part[4], levelContainer[0].part[38].part[5]);
  levelContainer[0].part[38].part[3].position.set(-55, 200, -0.01);
  gsap.to(levelContainer[0].part[38].part[3].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  gsap.to(levelContainer[0].part[38].part[5].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[0].part[38].part[6] = new THREE.Object3D();
  levelContainer[0].part[38].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[117].map.image.width, pic[117].map.image.height), pic[117]);
  levelContainer[0].part[38].part[7].geometry.translate(-pic[117].map.image.width * 0.1, -pic[117].map.image.height * 0.4, 0);
  levelContainer[0].part[38].part[15] = new THREE.Object3D();
  levelContainer[0].part[38].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[118].map.image.width, pic[118].map.image.height), pic[118]);
  levelContainer[0].part[38].part[8].geometry.translate(-pic[118].map.image.width * 0.3, -pic[118].map.image.height * 0.4, 0);
  levelContainer[0].part[38].part[15].position.set(17, -60, 0.001);
  levelContainer[0].part[38].handTween3 = gsap.to(levelContainer[0].part[38].part[6].rotation, { duration: 0.5 + Math.random(), z: 0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[38].handTween4 = gsap.to(levelContainer[0].part[38].part[15].rotation, { duration: 0.5 + Math.random() * 1, z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[38].part[16] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[112].map.image.width, pic[112].map.image.height), pic[112]);
  levelContainer[0].part[38].part[16].rotation.z = 2.7;
  levelContainer[0].part[38].part[16].position.set(-50, -85, -0.001);
  levelContainer[0].part[38].part[15].add(levelContainer[0].part[38].part[16], levelContainer[0].part[38].part[8]);
  levelContainer[0].part[38].part[6].add(levelContainer[0].part[38].part[7], levelContainer[0].part[38].part[15]);
  levelContainer[0].part[38].part[6].position.set(85, 215, 0.01);
  levelContainer[0].part[38].part[6].rotation.z = 0.5;
  levelContainer[0].part[38].part[9] = new THREE.Object3D();
  levelContainer[0].part[38].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[119].map.image.width, pic[119].map.image.height), pic[119]);
  levelContainer[0].part[38].part[10].geometry.translate(0, -pic[119].map.image.height * 0.4, 0);
  levelContainer[0].part[38].part[11] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[111].map.image.width, pic[111].map.image.height), pic[111]);
  levelContainer[0].part[38].part[11].geometry.translate(-pic[111].map.image.width * 0.2, -pic[111].map.image.height * 0.3, 0);
  levelContainer[0].part[38].part[11].position.set(8, -85, -0.001);
  levelContainer[0].part[38].part[9].add(levelContainer[0].part[38].part[10], levelContainer[0].part[38].part[11]);
  levelContainer[0].part[38].part[9].position.set(-40, 50, -0.01);
  levelContainer[0].part[38].part[11].visible = false;
  levelContainer[0].part[38].part[11].rotation.z = 0.9;
  levelContainer[0].part[38].part[12] = new THREE.Object3D();
  levelContainer[0].part[38].part[13] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[119].map.image.width, pic[119].map.image.height), pic[119]);
  levelContainer[0].part[38].part[13].geometry.translate(0, -pic[119].map.image.height * 0.4, 0);
  levelContainer[0].part[38].part[14] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[111].map.image.width, pic[111].map.image.height), pic[111]);
  levelContainer[0].part[38].part[14].geometry.translate(-pic[111].map.image.width * 0.2, -pic[111].map.image.height * 0.3, 0);
  levelContainer[0].part[38].part[14].position.set(5, -85, -0.001);
  levelContainer[0].part[38].part[14].visible = false;
  levelContainer[0].part[38].part[12].add(levelContainer[0].part[38].part[13], levelContainer[0].part[38].part[14]);
  levelContainer[0].part[38].part[12].position.set(32, 50, -0.01);
  levelContainer[0].part[38].part[14].rotation.z = 0.6;
  levelContainer[0].part[38].part[0].add(levelContainer[0].part[38].part[9], levelContainer[0].part[38].part[6], levelContainer[0].part[38].part[3], levelContainer[0].part[38].part[2], levelContainer[0].part[38].part[1]);
  levelContainer[0].part[38].add(levelContainer[0].part[38].part[12], levelContainer[0].part[38].part[9], levelContainer[0].part[38].part[0]);
  gsap.to(levelContainer[0].part[38].part[0].rotation, { duration: 1 + Math.random() * 1, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[38].scale.set(-0.36, 0.36, 1);
  levelContainer[0].part[38].position.set(-60, -60, -8.1);
  levelContainer[0].part[39] = new THREE.Object3D();
  levelContainer[0].part[39].part = [];
  levelContainer[0].part[39].part[0] = new THREE.Object3D();
  levelContainer[0].part[39].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[120].map.image.width, pic[120].map.image.height), pic[120]);
  levelContainer[0].part[39].part[1].geometry.translate(0, pic[120].map.image.height * 0.4, 0);
  levelContainer[0].part[39].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[121].map.image.width, pic[121].map.image.height), pic[121]);
  levelContainer[0].part[39].part[2].geometry.translate(pic[121].map.image.width * 0.1, pic[121].map.image.height * 0.4, 0);
  levelContainer[0].part[39].part[2].position.set(-10, 245, 0.001);
  levelContainer[0].part[39].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[39].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[39].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[122].map.image.width, pic[122].map.image.height), pic[122]);
  levelContainer[0].part[39].part[3].geometry.translate(-pic[122].map.image.width * 0.4, -pic[122].map.image.height * 0.4, 0);
  levelContainer[0].part[39].part[3].position.set(-45, 218, -0.001);
  gsap.to(levelContainer[0].part[39].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[39].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[123].map.image.width, pic[123].map.image.height), pic[123]);
  levelContainer[0].part[39].part[4].geometry.translate(-pic[123].map.image.width * 0.45, -pic[123].map.image.height * 0.45, 0);
  levelContainer[0].part[39].part[4].position.set(120, 230, 0.001);
  gsap.to(levelContainer[0].part[39].part[4].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[39].part[0].add(levelContainer[0].part[39].part[4], levelContainer[0].part[39].part[3], levelContainer[0].part[39].part[2], levelContainer[0].part[39].part[1]);
  levelContainer[0].part[39].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[39].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[39].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[124].map.image.width, pic[124].map.image.height), pic[124]);
  levelContainer[0].part[39].part[5].position.set(-7, -45, -0.001);
  levelContainer[0].part[39].add(levelContainer[0].part[39].part[0], levelContainer[0].part[39].part[5]);
  levelContainer[0].part[39].scale.set(-0.29, 0.29, 1);
  levelContainer[0].part[39].position.set(-80, 110, -9);
  levelContainer[0].part[40] = new THREE.Object3D();
  levelContainer[0].part[40].part = [];
  levelContainer[0].part[40].part[0] = new THREE.Object3D();40
  levelContainer[0].part[40].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[129].map.image.width, pic[129].map.image.height), pic[129]);
  levelContainer[0].part[40].part[1].geometry.translate(0, pic[129].map.image.height * 0.4, 0);
  levelContainer[0].part[40].part[0].rotation.z = -0.05;
  levelContainer[0].part[40].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[130].map.image.width, pic[130].map.image.height), pic[130]);
  levelContainer[0].part[40].part[2].geometry.translate(pic[130].map.image.width * 0.1, pic[130].map.image.height * 0.4, 0);
  levelContainer[0].part[40].part[2].position.set(-18, 245, 0.001);
  levelContainer[0].part[40].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[40].part[2].rotation, { duration: 0.5 + Math.random() * 1, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[40].part[3] = new THREE.Object3D();
  levelContainer[0].part[40].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[131].map.image.width, pic[131].map.image.height), pic[131]);
  levelContainer[0].part[40].part[4].geometry.translate(-pic[131].map.image.width * 0.1, -pic[131].map.image.height * 0.4, 0);
  levelContainer[0].part[40].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[132].map.image.width, pic[132].map.image.height), pic[132]);
  levelContainer[0].part[40].part[5].geometry.translate(-pic[132].map.image.width * 0.4, -pic[132].map.image.height * 0.4, 0);
  levelContainer[0].part[40].part[5].position.set(-5, -87, 0.001);
  levelContainer[0].part[40].part[3].add(levelContainer[0].part[40].part[4], levelContainer[0].part[40].part[5]);
  levelContainer[0].part[40].part[3].position.set(-45, 220, -0.01);
  levelContainer[0].part[40].part[3].rotation.z = -2.3;
  levelContainer[0].part[40].part[6] = new THREE.Object3D();
  levelContainer[0].part[40].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[131].map.image.width, pic[131].map.image.height), pic[131]);
  levelContainer[0].part[40].part[7].geometry.translate(-pic[131].map.image.width * 0.1, -pic[131].map.image.height * 0.4, 0);
  levelContainer[0].part[40].part[15] = new THREE.Object3D();
  levelContainer[0].part[40].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[132].map.image.width, pic[132].map.image.height), pic[132]);
  levelContainer[0].part[40].part[8].geometry.translate(-pic[132].map.image.width * 0.3, -pic[132].map.image.height * 0.4, 0);
  levelContainer[0].part[40].part[8].scale.x = -1;
  levelContainer[0].part[40].part[15].position.set(5, -85, 0.001);
  levelContainer[0].part[40].part[16] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[126].map.image.width, pic[126].map.image.height), pic[126]);
  levelContainer[0].part[40].part[16].rotation.z = 3.7;
  levelContainer[0].part[40].part[16].position.set(180, -60, 0.001);
  levelContainer[0].part[40].part[15].add(levelContainer[0].part[40].part[16], levelContainer[0].part[40].part[8]);
  levelContainer[0].part[40].part[6].add(levelContainer[0].part[40].part[7], levelContainer[0].part[40].part[15]);
  levelContainer[0].part[40].part[6].position.set(55, 215, 0.01);
  levelContainer[0].part[40].part[6].rotation.z = 2.5;
  levelContainer[0].part[40].part[9] = new THREE.Object3D();
  levelContainer[0].part[40].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[133].map.image.width, pic[133].map.image.height), pic[133]);
  levelContainer[0].part[40].part[10].geometry.translate(0, -pic[133].map.image.height * 0.4, 0);
  levelContainer[0].part[40].part[11] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[134].map.image.width, pic[134].map.image.height), pic[134]);
  levelContainer[0].part[40].part[11].geometry.translate(-pic[134].map.image.width * 0.2, -pic[134].map.image.height * 0.3, 0);
  levelContainer[0].part[40].part[11].position.set(14, -105, -0.001);
  levelContainer[0].part[40].part[9].add(levelContainer[0].part[40].part[10], levelContainer[0].part[40].part[11]);
  levelContainer[0].part[40].part[9].position.set(-40, 70, -0.01);
  levelContainer[0].part[40].part[12] = new THREE.Object3D();
  levelContainer[0].part[40].part[13] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[133].map.image.width, pic[133].map.image.height), pic[133]);
  levelContainer[0].part[40].part[13].geometry.translate(0, -pic[133].map.image.height * 0.4, 0);
  levelContainer[0].part[40].part[14] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[134].map.image.width, pic[134].map.image.height), pic[134]);
  levelContainer[0].part[40].part[14].geometry.translate(-pic[134].map.image.width * 0.2, -pic[134].map.image.height * 0.3, 0);
  levelContainer[0].part[40].part[14].position.set(14, -105, -0.001);
  levelContainer[0].part[40].part[12].add(levelContainer[0].part[40].part[13], levelContainer[0].part[40].part[14]);
  levelContainer[0].part[40].part[12].position.set(32, 70, -0.01);
  levelContainer[0].part[40].part[0].add(levelContainer[0].part[40].part[9], levelContainer[0].part[40].part[6], levelContainer[0].part[40].part[3], levelContainer[0].part[40].part[2], levelContainer[0].part[40].part[1]);
  levelContainer[0].part[40].add(levelContainer[0].part[40].part[12], levelContainer[0].part[40].part[9], levelContainer[0].part[40].part[0]);
  gsap.to(levelContainer[0].part[40].part[0].rotation, { duration: 1 + Math.random() * 1, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[40].scale.set(0.32, 0.32, 1);
  levelContainer[0].part[40].position.set(130, -0, -8.5);
  levelContainer[0].part[41] = new THREE.Object3D();
  levelContainer[0].part[41].part = [];
  levelContainer[0].part[41].part[0] = new THREE.Object3D();40
  levelContainer[0].part[41].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[135].map.image.width, pic[135].map.image.height), pic[135]);
  levelContainer[0].part[41].part[1].geometry.translate(0, pic[135].map.image.height * 0.4, 0);
  levelContainer[0].part[41].part[0].rotation.z = -0.05;
  levelContainer[0].part[41].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[136].map.image.width, pic[136].map.image.height), pic[136]);
  levelContainer[0].part[41].part[2].geometry.translate(pic[136].map.image.width * 0.1, pic[136].map.image.height * 0.4, 0);
  levelContainer[0].part[41].part[2].position.set(-18, 250, 0.001);
  levelContainer[0].part[41].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[0].part[41].part[2].rotation, { duration: 0.5 + Math.random() * 1, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[41].part[3] = new THREE.Object3D();
  levelContainer[0].part[41].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[137].map.image.width, pic[137].map.image.height), pic[137]);
  levelContainer[0].part[41].part[4].geometry.translate(-pic[137].map.image.width * 0.1, -pic[137].map.image.height * 0.4, 0);
  levelContainer[0].part[41].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[138].map.image.width, pic[138].map.image.height), pic[138]);
  levelContainer[0].part[41].part[5].geometry.translate(-pic[138].map.image.width * 0.4, -pic[138].map.image.height * 0.4, 0);
  levelContainer[0].part[41].part[5].position.set(-5, -87, 0.001);
  levelContainer[0].part[41].part[3].add(levelContainer[0].part[41].part[4], levelContainer[0].part[41].part[5]);
  levelContainer[0].part[41].part[3].position.set(-55, 190, -0.01);
  levelContainer[0].part[41].part[3].rotation.z = -2.3;
  levelContainer[0].part[41].part[6] = new THREE.Object3D();
  levelContainer[0].part[41].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[137].map.image.width, pic[137].map.image.height), pic[137]);
  levelContainer[0].part[41].part[7].geometry.translate(-pic[137].map.image.width * 0.1, -pic[137].map.image.height * 0.4, 0);
  levelContainer[0].part[41].part[15] = new THREE.Object3D();
  levelContainer[0].part[41].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[138].map.image.width, pic[138].map.image.height), pic[138]);
  levelContainer[0].part[41].part[8].geometry.translate(-pic[138].map.image.width * 0.3, -pic[138].map.image.height * 0.4, 0);
  levelContainer[0].part[41].part[8].scale.x = -1;
  levelContainer[0].part[41].part[15].position.set(5, -85, 0.001);
  levelContainer[0].part[41].part[16] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[127].map.image.width, pic[127].map.image.height), pic[127]);
  levelContainer[0].part[41].part[16].rotation.z = 3.74;
  levelContainer[0].part[41].part[16].position.set(190, -80, 0.001);
  levelContainer[0].part[41].part[15].add(levelContainer[0].part[41].part[16], levelContainer[0].part[41].part[8]);
  levelContainer[0].part[41].part[6].add(levelContainer[0].part[41].part[7], levelContainer[0].part[41].part[15]);
  levelContainer[0].part[41].part[6].position.set(55, 195, 0.01);
  levelContainer[0].part[41].part[6].rotation.z = 2.5;
  levelContainer[0].part[41].part[9] = new THREE.Object3D();
  levelContainer[0].part[41].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[133].map.image.width, pic[133].map.image.height), pic[133]);
  levelContainer[0].part[41].part[10].geometry.translate(0, -pic[133].map.image.height * 0.4, 0);
  levelContainer[0].part[41].part[11] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[134].map.image.width, pic[134].map.image.height), pic[134]);
  levelContainer[0].part[41].part[11].geometry.translate(-pic[134].map.image.width * 0.2, -pic[134].map.image.height * 0.3, 0);
  levelContainer[0].part[41].part[11].position.set(14, -105, -0.001);
  levelContainer[0].part[41].part[9].add(levelContainer[0].part[41].part[10], levelContainer[0].part[41].part[11]);
  levelContainer[0].part[41].part[9].position.set(-40, 70, -0.01);
  levelContainer[0].part[41].part[12] = new THREE.Object3D();
  levelContainer[0].part[41].part[13] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[133].map.image.width, pic[133].map.image.height), pic[133]);
  levelContainer[0].part[41].part[13].geometry.translate(0, -pic[133].map.image.height * 0.4, 0);
  levelContainer[0].part[41].part[14] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[134].map.image.width, pic[134].map.image.height), pic[134]);
  levelContainer[0].part[41].part[14].geometry.translate(-pic[134].map.image.width * 0.2, -pic[134].map.image.height * 0.3, 0);
  levelContainer[0].part[41].part[14].position.set(14, -105, -0.001);
  levelContainer[0].part[41].part[12].add(levelContainer[0].part[41].part[13], levelContainer[0].part[41].part[14]);
  levelContainer[0].part[41].part[12].position.set(32, 70, -0.01);
  levelContainer[0].part[41].part[0].add(levelContainer[0].part[41].part[9], levelContainer[0].part[41].part[6], levelContainer[0].part[41].part[3], levelContainer[0].part[41].part[2], levelContainer[0].part[41].part[1]);
  levelContainer[0].part[41].add(levelContainer[0].part[41].part[12], levelContainer[0].part[41].part[9], levelContainer[0].part[41].part[0]);
  gsap.to(levelContainer[0].part[41].part[0].rotation, { duration: 1 + Math.random() * 1, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[41].scale.set(0.32, 0.32, 1);
  levelContainer[0].part[41].position.set(200, -30, -8.4);
  levelContainer[0].part[42] = new THREE.Object3D();
  levelContainer[0].part[42].part = [];
  levelContainer[0].part[42].part[0] = new THREE.Object3D();
  levelContainer[0].part[42].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[141].map.image.width, pic[141].map.image.height), pic[141]);
  levelContainer[0].part[42].part[1].geometry.translate(0, pic[141].map.image.height * 0.4, 0);
  levelContainer[0].part[42].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[142].map.image.width, pic[142].map.image.height), pic[142]);
  levelContainer[0].part[42].part[2].geometry.translate(pic[142].map.image.width * 0.1, pic[142].map.image.height * 0.4, 0);
  levelContainer[0].part[42].part[2].position.set(-10, 240, 0.001);
  levelContainer[0].part[42].part[2].rotation.z = -0.05;
  levelContainer[0].part[42].part[2].tween = gsap.to(levelContainer[0].part[42].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[42].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[143].map.image.width, pic[143].map.image.height), pic[143]);
  levelContainer[0].part[42].part[3].geometry.translate(-pic[143].map.image.width * 0.4, -pic[143].map.image.height * 0.4, 0);
  levelContainer[0].part[42].part[3].position.set(-55, 215, -0.001);
  levelContainer[0].part[42].part[3].rotation.z = -2.3;
  levelContainer[0].part[42].part[6] = new THREE.Object3D();
  levelContainer[0].part[42].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[143].map.image.width, pic[143].map.image.height), pic[143]);
  levelContainer[0].part[42].part[4].geometry.translate(-pic[143].map.image.width * 0.4, -pic[143].map.image.height * 0.4, 0);
  levelContainer[0].part[42].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[128].map.image.width, pic[128].map.image.height), pic[128]);
  levelContainer[0].part[42].part[7].rotation.z = -3.8;
  levelContainer[0].part[42].part[7].position.set(-200, -120, 0.001);
  levelContainer[0].part[42].part[7].scale.x = -1;
  levelContainer[0].part[42].part[6].position.set(65, 200, 0.001);
  levelContainer[0].part[42].part[6].scale.x = -1;
  levelContainer[0].part[42].part[6].rotation.z = 2.4;
  levelContainer[0].part[42].part[6].add(levelContainer[0].part[42].part[4], levelContainer[0].part[42].part[7]);
  levelContainer[0].part[42].part[0].add(levelContainer[0].part[42].part[6], levelContainer[0].part[42].part[3], levelContainer[0].part[42].part[2], levelContainer[0].part[42].part[1]);
  levelContainer[0].part[42].part[0].rotation.z = -0.05;
  levelContainer[0].part[42].part[0].tween = gsap.to(levelContainer[0].part[42].part[0].rotation, { duration: 0.5 + Math.random(), z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[42].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[144].map.image.width, pic[144].map.image.height), pic[144]);
  levelContainer[0].part[42].part[5].position.set(0, -50, -0.001);
  levelContainer[0].part[42].add(levelContainer[0].part[42].part[0], levelContainer[0].part[42].part[5]);
  levelContainer[0].part[42].scale.set(-0.32, 0.32, 1);
  levelContainer[0].part[42].position.set(-190, -20, -8.4);
  levelContainer[0].part[43] = new THREE.Object3D();
  levelContainer[0].part[43].part = [];
  levelContainer[0].part[43].part[0] = new THREE.Object3D();
  levelContainer[0].part[43].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[145].map.image.width, pic[145].map.image.height), pic[145]);
  levelContainer[0].part[43].part[1].geometry.translate(0, pic[145].map.image.height * 0.4, 0);
  levelContainer[0].part[43].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[146].map.image.width, pic[146].map.image.height), pic[146]);
  levelContainer[0].part[43].part[2].geometry.translate(pic[146].map.image.width * 0.1, pic[146].map.image.height * 0.4, 0);
  levelContainer[0].part[43].part[2].position.set(-10, 250, 0.001);
  levelContainer[0].part[43].part[2].rotation.z = -0.05;
  levelContainer[0].part[43].part[2].tween = gsap.to(levelContainer[0].part[43].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[43].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[147].map.image.width, pic[147].map.image.height), pic[147]);
  levelContainer[0].part[43].part[3].geometry.translate(-pic[147].map.image.width * 0.4, -pic[147].map.image.height * 0.4, 0);
  levelContainer[0].part[43].part[3].position.set(-60, 180, -0.001);
  levelContainer[0].part[43].part[3].rotation.z = -2.3;
  levelContainer[0].part[43].part[6] = new THREE.Object3D();
  levelContainer[0].part[43].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[147].map.image.width, pic[147].map.image.height), pic[147]);
  levelContainer[0].part[43].part[4].geometry.translate(-pic[147].map.image.width * 0.4, -pic[147].map.image.height * 0.4, 0);
  levelContainer[0].part[43].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[125].map.image.width, pic[125].map.image.height), pic[125]);
  levelContainer[0].part[43].part[7].rotation.z = -3.8;
  levelContainer[0].part[43].part[7].position.set(-230, -145, 0.001);
  levelContainer[0].part[43].part[6].position.set(70, 170, 0.001);
  levelContainer[0].part[43].part[6].scale.x = -1;
  levelContainer[0].part[43].part[6].rotation.z = 2.4;
  levelContainer[0].part[43].part[6].add(levelContainer[0].part[43].part[4], levelContainer[0].part[43].part[7]);
  levelContainer[0].part[43].part[0].add(levelContainer[0].part[43].part[6], levelContainer[0].part[43].part[3], levelContainer[0].part[43].part[2], levelContainer[0].part[43].part[1]);
  levelContainer[0].part[43].part[0].rotation.z = -0.05;
  levelContainer[0].part[43].part[0].tween = gsap.to(levelContainer[0].part[43].part[0].rotation, { duration: 0.5 + Math.random() , z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[0].part[43].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[148].map.image.width, pic[148].map.image.height), pic[148]);
  levelContainer[0].part[43].part[5].position.set(-10, -50, -0.001);
  levelContainer[0].part[43].add(levelContainer[0].part[43].part[0], levelContainer[0].part[43].part[5]);
  levelContainer[0].part[43].scale.set(-0.32, 0.32, 1);
  levelContainer[0].part[43].position.set(-120, 0, -8.5);
  levelContainer[0].part[44] = new THREE.Object3D();
  levelContainer[0].part[44].part = [];
  levelContainer[0].part[44].part[0] = new THREE.Object3D();
  levelContainer[0].part[44].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[149].map.image.width, pic[149].map.image.height), pic[149]);
  levelContainer[0].part[44].part[1].geometry.translate(-pic[149].map.image.width * 0.2, pic[149].map.image.height * 0.1, 0);
  levelContainer[0].part[44].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[150].map.image.width, pic[150].map.image.height), pic[150]);
  levelContainer[0].part[44].part[2].geometry.translate(pic[150].map.image.width * 0.1, pic[150].map.image.height * 0.4, 0);
  levelContainer[0].part[44].part[2].position.set(-30, 210, -0.001);
  levelContainer[0].part[44].part[2].rotation.z = -0.05;
  levelContainer[0].part[44].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[151].map.image.width, pic[151].map.image.height), pic[151]);
  levelContainer[0].part[44].part[3].geometry.translate(-pic[151].map.image.width * 0, -pic[151].map.image.height * 0.4, 0);
  levelContainer[0].part[44].part[3].position.set(-75, 200, -0.001);
  levelContainer[0].part[44].part[6] = new THREE.Object3D();
  levelContainer[0].part[44].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[152].map.image.width, pic[152].map.image.height), pic[152]);
  levelContainer[0].part[44].part[4].geometry.translate(pic[152].map.image.width * 0.3, -pic[152].map.image.height * 0.4, 0);
  levelContainer[0].part[44].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[112].map.image.width, pic[112].map.image.height), pic[112]);
  levelContainer[0].part[44].part[7].rotation.z = 1;
  levelContainer[0].part[44].part[7].position.set(90, -115, -0.001);
  levelContainer[0].part[44].part[6].position.set(50, 200, 0.001);
  levelContainer[0].part[44].part[6].add(levelContainer[0].part[44].part[4], levelContainer[0].part[44].part[7]);
  levelContainer[0].part[44].part[0].add(levelContainer[0].part[44].part[6], levelContainer[0].part[44].part[3], levelContainer[0].part[44].part[2], levelContainer[0].part[44].part[1]);
  levelContainer[0].part[44].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[153].map.image.width, pic[153].map.image.height), pic[153]);
  levelContainer[0].part[44].part[5].position.set(-40, -40, -0.001);
  levelContainer[0].part[44].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[153].map.image.width, pic[153].map.image.height), pic[153]);
  levelContainer[0].part[44].part[8].geometry.translate(0, -pic[153].map.image.height * 0.4, 0);
  levelContainer[0].part[44].part[8].position.set(35, 45, -0.001);
  levelContainer[0].part[44].add(levelContainer[0].part[44].part[0], levelContainer[0].part[44].part[5], levelContainer[0].part[44].part[8]);
  levelContainer[0].part[44].scale.set(0.36, 0.36, 1);
  levelContainer[0].part[44].position.set(-70, -60, -8.1);
  levelContainer[0].part[44].visible = false;
  levelContainer[0].scale.set(1.01, 1.01, 1);
  levelContainer[0].part[45] = new THREE.Object3D();
  levelContainer[0].part[45].part = [];
  levelContainer[0].part[45].part[0] = new THREE.Object3D();
  levelContainer[0].part[45].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[154].map.image.width, pic[154].map.image.height), pic[154]);
  levelContainer[0].part[45].part[1].geometry.translate(0, pic[154].map.image.height * 0.4, 0);
  levelContainer[0].part[45].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[155].map.image.width, pic[155].map.image.height), pic[155]);
  levelContainer[0].part[45].part[2].geometry.translate(pic[155].map.image.width * 0.1, pic[155].map.image.height * 0.4, 0);
  levelContainer[0].part[45].part[2].position.set(-10, 210, -0.001);
  levelContainer[0].part[45].part[2].rotation.z = -0.05;
  levelContainer[0].part[45].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[156].map.image.width, pic[156].map.image.height), pic[156]);
  levelContainer[0].part[45].part[3].geometry.translate(-pic[156].map.image.width * 0, -pic[156].map.image.height * 0.4, 0);
  levelContainer[0].part[45].part[3].position.set(-75, 200, -0.001);
  levelContainer[0].part[45].part[6] = new THREE.Object3D();
  levelContainer[0].part[45].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[157].map.image.width, pic[157].map.image.height), pic[157]);
  levelContainer[0].part[45].part[4].geometry.translate(pic[157].map.image.width * 0.3, -pic[157].map.image.height * 0.4, 0);
  levelContainer[0].part[45].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[112].map.image.width, pic[112].map.image.height), pic[112]);
  levelContainer[0].part[45].part[7].rotation.z = 1;
  levelContainer[0].part[45].part[7].position.set(90, -115, -0.001);
  levelContainer[0].part[45].part[6].position.set(60, 195, 0.001);
  levelContainer[0].part[45].part[6].add(levelContainer[0].part[45].part[4], levelContainer[0].part[45].part[7]);
  levelContainer[0].part[45].part[0].add(levelContainer[0].part[45].part[6], levelContainer[0].part[45].part[3], levelContainer[0].part[45].part[2], levelContainer[0].part[45].part[1]);
  levelContainer[0].part[45].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[158].map.image.width, pic[158].map.image.height), pic[158]);
  levelContainer[0].part[45].part[5].position.set(-20, -40, -0.001);
  levelContainer[0].part[45].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[158].map.image.width, pic[158].map.image.height), pic[158]);
  levelContainer[0].part[45].part[8].geometry.translate(0, -pic[158].map.image.height * 0.4, 0);
  levelContainer[0].part[45].part[8].position.set(45, 45, -0.001);
  levelContainer[0].part[45].add(levelContainer[0].part[45].part[0], levelContainer[0].part[45].part[5], levelContainer[0].part[45].part[8]);
  levelContainer[0].part[45].scale.set(-0.36, 0.36, 1);
  levelContainer[0].part[45].position.set(85, -55, -8);
  levelContainer[0].part[45].visible = false;
  levelContainer[0].scale.set(1.01, 1.01, 1);
  levelContainer[1].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[159].map.image.width * pic[159].map.image.height), pic[159]);
  levelContainer[1].part[0].position.z = -19;
  levelContainer[1].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[160].map.image.width * pic[160].map.image.height), pic[160]);
  levelContainer[1].part[1].geometry.translate(0, -498 / pic[160].map.image.width * pic[160].map.image.height / 2, 0);
  levelContainer[1].part[1].position.set(0, 540, -20.6);
  levelContainer[1].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[161].map.image.width * pic[161].map.image.height), pic[161]);
  pic[161].opacity = 0;
  levelContainer[1].part[2].geometry.translate(0, -498 / pic[161].map.image.width * pic[161].map.image.height / 2, 0);
  levelContainer[1].part[2].position.set(0, 540, -20.5);
  levelContainer[1].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[162].map.image.width * pic[162].map.image.height), pic[162]);
  levelContainer[1].part[3].position.set(0, 142, -15);
  levelContainer[1].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[163].map.image.width * pic[163].map.image.height), pic[163]);
  levelContainer[1].part[4].position.set(0, 69, -10);
  levelContainer[1].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[164].map.image.width * pic[164].map.image.height), pic[164]);
  levelContainer[1].part[5].position.set(0, -165, -5);
  levelContainer[1].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[165].map.image.width * pic[165].map.image.height), pic[165]);
  levelContainer[1].part[6].position.set(0, -245, -3);
  levelContainer[1].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[166].map.image.width * 0.6, pic[166].map.image.height * 0.6), pic[166]);
  levelContainer[1].part[7].position.set(-178, -154, -2.9);
  levelContainer[1].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[167].map.image.width * 0.6, pic[167].map.image.height * 0.6), pic[167]);
  levelContainer[1].part[8].position.set(165, -220, -2.9);
  levelContainer[1].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[168].map.image.width * 0.16, pic[168].map.image.height * 0.16), pic[168]);
  levelContainer[1].part[9].geometry.translate(0, pic[168].map.image.height * 0.09, 0);
  levelContainer[1].part[9].scale.x = -1;
  levelContainer[1].part[9].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[9].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[9].position.set(-5, 135, -16);
  levelContainer[1].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[168].map.image.width * 0.16, pic[168].map.image.height * 0.16), pic[168]);
  levelContainer[1].part[10].geometry.translate(0, pic[168].map.image.height * 0.09, 0);
  levelContainer[1].part[10].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[10].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[10].position.set(72, 70, -14);
  levelContainer[1].part[11] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[169].map.image.width * 0.16, pic[169].map.image.height * 0.16), pic[169]);
  levelContainer[1].part[11].geometry.translate(0, pic[169].map.image.height * 0.09, 0);
  levelContainer[1].part[11].scale.x = -1;
  levelContainer[1].part[11].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[11].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[11].position.set(-135, 130, -16);
  levelContainer[1].part[12] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[170].map.image.width * 0.16, pic[170].map.image.height * 0.16), pic[170]);
  levelContainer[1].part[12].geometry.translate(0, pic[170].map.image.height * 0.09, 0);
  levelContainer[1].part[12].scale.x = -1;
  levelContainer[1].part[12].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[12].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[12].position.set(-25, 58, -14);
  levelContainer[1].part[13] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[170].map.image.width * 0.16, pic[170].map.image.height * 0.16), pic[170]);
  levelContainer[1].part[13].geometry.translate(0, pic[170].map.image.height * 0.09, 0);
  levelContainer[1].part[13].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[13].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[13].position.set(165, 130, -16);
  levelContainer[1].part[14] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[170].map.image.width * 0.15, pic[170].map.image.height * 0.15), pic[170]);
  levelContainer[1].part[14].geometry.translate(0, pic[170].map.image.height * 0.09, 0);
  levelContainer[1].part[14].scale.x = -1;
  levelContainer[1].part[14].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[14].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[14].position.set(-65, 170, -17);
  levelContainer[1].part[15] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[171].map.image.width * 0.16, pic[171].map.image.height * 0.16), pic[171]);
  levelContainer[1].part[15].geometry.translate(0, pic[171].map.image.height * 0.09, 0);
  levelContainer[1].part[15].scale.x = -1;
  levelContainer[1].part[15].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[15].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[15].position.set(-130, 50, -14);
  levelContainer[1].part[16] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[171].map.image.width * 0.16, pic[171].map.image.height * 0.16), pic[171]);
  levelContainer[1].part[16].geometry.translate(0, pic[171].map.image.height * 0.09, 0);
  levelContainer[1].part[16].scale.x = -1;
  levelContainer[1].part[16].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[16].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[16].position.set(-50, 135, -16);
  levelContainer[1].part[17] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[171].map.image.width * 0.16, pic[171].map.image.height * 0.16), pic[171]);
  levelContainer[1].part[17].geometry.translate(0, pic[171].map.image.height * 0.09, 0);
  levelContainer[1].part[17].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[17].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[17].position.set(115, 50, -13);
  levelContainer[1].part[18] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[172].map.image.width * 0.16, pic[172].map.image.height * 0.16), pic[172]);
  levelContainer[1].part[18].geometry.translate(0, pic[172].map.image.height * 0.09, 0);
  levelContainer[1].part[18].scale.x = -1;
  levelContainer[1].part[18].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[18].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[18].position.set(-185, 40, -11);
  levelContainer[1].part[19] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[172].map.image.width * 0.16, pic[172].map.image.height * 0.16), pic[172]);
  levelContainer[1].part[19].geometry.translate(0, pic[172].map.image.height * 0.09, 0);
  levelContainer[1].part[19].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[19].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[19].position.set(70, 150, -16);
  levelContainer[1].part[20] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[172].map.image.width * 0.16, pic[172].map.image.height * 0.16), pic[172]);
  levelContainer[1].part[20].geometry.translate(0, pic[172].map.image.height * 0.09, 0);
  levelContainer[1].part[20].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[20].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[20].position.set(155, 60, -14.9);
  levelContainer[1].part[21] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[173].map.image.width * 0.16, pic[173].map.image.height * 0.16), pic[173]);
  levelContainer[1].part[21].geometry.translate(0, pic[173].map.image.height * 0.09, 0);
  levelContainer[1].part[21].scale.x = -1;
  levelContainer[1].part[21].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[21].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[21].position.set(-225, 38, -14);
  levelContainer[1].part[22] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[173].map.image.width * 0.16, pic[173].map.image.height * 0.16), pic[173]);
  levelContainer[1].part[22].geometry.translate(0, pic[173].map.image.height * 0.09, 0);
  levelContainer[1].part[22].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[22].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[22].position.set(220, 65, -14);
  levelContainer[1].part[23] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[173].map.image.width * 0.16, pic[173].map.image.height * 0.16), pic[173]);
  levelContainer[1].part[23].geometry.translate(0, pic[173].map.image.height * 0.09, 0);
  levelContainer[1].part[23].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[23].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[23].position.set(20, 155, -16.2);
  levelContainer[1].part[24] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[174].map.image.width * 0.16, pic[174].map.image.height * 0.16), pic[174]);
  levelContainer[1].part[24].geometry.translate(0, pic[174].map.image.height * 0.09, 0);
  levelContainer[1].part[24].scale.x = -1;
  levelContainer[1].part[24].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[24].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[24].position.set(-205, 55, -14.2);
  levelContainer[1].part[25] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[174].map.image.width * 0.16, pic[174].map.image.height * 0.16), pic[174]);
  levelContainer[1].part[25].geometry.translate(0, pic[174].map.image.height * 0.09, 0);
  levelContainer[1].part[25].scale.x = -1;
  levelContainer[1].part[25].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[25].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[25].position.set(-25, 160, -16.2);
  levelContainer[1].part[26] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[174].map.image.width * 0.16, pic[174].map.image.height * 0.16), pic[174]);
  levelContainer[1].part[26].geometry.translate(0, pic[174].map.image.height * 0.09, 0);
  levelContainer[1].part[26].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[26].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[26].position.set(40, 135, -14.2);
  levelContainer[1].part[27] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[175].map.image.width * 0.16, pic[175].map.image.height * 0.16), pic[175]);
  levelContainer[1].part[27].geometry.translate(0, pic[175].map.image.height * 0.09, 0);
  levelContainer[1].part[27].scale.x = -1;
  levelContainer[1].part[27].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[27].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[27].position.set(-185, 140, -16);
  levelContainer[1].part[28] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[175].map.image.width * 0.16, pic[175].map.image.height * 0.16), pic[175]);
  levelContainer[1].part[28].geometry.translate(0, pic[175].map.image.height * 0.09, 0);
  levelContainer[1].part[28].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[28].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[28].position.set(105, 170, -17);
  levelContainer[1].part[29] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[175].map.image.width * 0.16, pic[175].map.image.height * 0.16), pic[175]);
  levelContainer[1].part[29].geometry.translate(0, pic[175].map.image.height * 0.09, 0);
  levelContainer[1].part[29].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[29].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[29].position.set(25, 55, -12);
  levelContainer[1].part[30] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[176].map.image.width * 0.16, pic[176].map.image.height * 0.16), pic[176]);
  levelContainer[1].part[30].geometry.translate(0, pic[176].map.image.height * 0.09, 0);
  levelContainer[1].part[30].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[30].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[30].position.set(-100, 120, -16);
  levelContainer[1].part[31] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[177].map.image.width * 0.16, pic[177].map.image.height * 0.16), pic[177]);
  levelContainer[1].part[31].geometry.translate(0, pic[177].map.image.height * 0.09, 0);
  levelContainer[1].part[31].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[31].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[31].position.set(130, 50, -11);
  levelContainer[1].part[32] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[178].map.image.width * 0.16, pic[178].map.image.height * 0.16), pic[178]);
  levelContainer[1].part[32].geometry.translate(0, pic[178].map.image.height * 0.09, 0);
  levelContainer[1].part[32].scale.x = -1;
  levelContainer[1].part[32].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[32].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[32].position.set(-158, 60, -15);
  levelContainer[1].part[33] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[178].map.image.width * 0.16, pic[178].map.image.height * 0.16), pic[178]);
  levelContainer[1].part[33].geometry.translate(0, pic[178].map.image.height * 0.09, 0);
  levelContainer[1].part[33].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[33].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[33].position.set(90, 120, -16);
  levelContainer[1].part[34] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[179].map.image.width * 0.16, pic[179].map.image.height * 0.16), pic[179]);
  levelContainer[1].part[34].geometry.translate(0, pic[179].map.image.height * 0.09, 0);
  levelContainer[1].part[34].rotation.z = 0.05;
  gsap.to(levelContainer[1].part[34].rotation, { duration: 1 + Math.random() * 1, z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[34].position.set(175, 50, -10.5);
  levelContainer[1].part[35] = new THREE.Object3D();
  levelContainer[1].part[35].part = [];
  levelContainer[1].part[35].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[180].map.image.width * 0.4, pic[180].map.image.height * 0.4), pic[180]);
  levelContainer[1].part[35].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[181].map.image.width * 0.4, pic[181].map.image.height * 0.4), pic[181]);
  levelContainer[1].part[35].part[1].position.set(0, 55.5, -0.002);
  levelContainer[1].part[35].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[182].map.image.width * 0.4, pic[182].map.image.height * 0.4), pic[182]);
  levelContainer[1].part[35].part[2].geometry.translate(-pic[182].map.image.width * 0.1, pic[182].map.image.height * 0.15, 0);
  levelContainer[1].part[35].part[2].position.set(0, 45, -0.001);
  gsap.to(levelContainer[1].part[35].part[2].rotation, { duration: 0.6, z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[35].add(levelContainer[1].part[35].part[2], levelContainer[1].part[35].part[0], levelContainer[1].part[35].part[1]);
  levelContainer[1].part[35].scale.set(0.7, 0.7, 1);
  levelContainer[1].part[35].position.set(-200, -275, -2);
  levelContainer[1].part[36] = new THREE.Object3D();
  levelContainer[1].part[36].part = [];
  levelContainer[1].part[36].part[0] = new THREE.Object3D();
  levelContainer[1].part[36].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[183].map.image.width, pic[183].map.image.height), pic[183]);
  levelContainer[1].part[36].part[1].geometry.translate(0, pic[183].map.image.height * 0.4, 0);
  levelContainer[1].part[36].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[184].map.image.width, pic[184].map.image.height), pic[184]);
  levelContainer[1].part[36].part[2].geometry.translate(pic[184].map.image.width * 0.1, pic[184].map.image.height * 0.4, 0);
  levelContainer[1].part[36].part[2].position.set(-10, 245, 0.001);
  levelContainer[1].part[36].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[36].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[36].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[185].map.image.width, pic[185].map.image.height), pic[185]);
  levelContainer[1].part[36].part[3].geometry.translate(-pic[185].map.image.width * 0.4, -pic[185].map.image.height * 0.4, 0);
  levelContainer[1].part[36].part[3].position.set(-45, 218, -0.001);
  gsap.to(levelContainer[1].part[36].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[36].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[186].map.image.width, pic[186].map.image.height), pic[186]);
  levelContainer[1].part[36].part[4].geometry.translate(0, -pic[186].map.image.height * 0.4, 0);
  levelContainer[1].part[36].part[4].position.set(73, 218, 0.001);
  gsap.to(levelContainer[1].part[36].part[4].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[36].part[0].add(levelContainer[1].part[36].part[4], levelContainer[1].part[36].part[3], levelContainer[1].part[36].part[2], levelContainer[1].part[36].part[1]);
  levelContainer[1].part[36].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[36].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[36].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[187].map.image.width, pic[187].map.image.height), pic[187]);
  levelContainer[1].part[36].part[5].position.set(-10, -45, -0.001);
  levelContainer[1].part[36].add(levelContainer[1].part[36].part[0], levelContainer[1].part[36].part[5]);
  levelContainer[1].part[36].scale.set(0.24, 0.24, 1);
  levelContainer[1].part[36].position.set(-13, -245, -4);
  levelContainer[1].part[37] = new THREE.Object3D();
  levelContainer[1].part[37].part = [];
  levelContainer[1].part[37].part[0] = new THREE.Object3D();
  levelContainer[1].part[37].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[188].map.image.width, pic[188].map.image.height), pic[188]);
  levelContainer[1].part[37].part[1].geometry.translate(0, pic[188].map.image.height * 0.4, 0);
  levelContainer[1].part[37].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[189].map.image.width, pic[189].map.image.height), pic[189]);
  levelContainer[1].part[37].part[2].geometry.translate(pic[189].map.image.width * 0.1, pic[189].map.image.height * 0.4, 0);
  levelContainer[1].part[37].part[2].position.set(-10, 245, 0.001);
  levelContainer[1].part[37].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[37].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[37].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[190].map.image.width, pic[190].map.image.height), pic[190]);
  levelContainer[1].part[37].part[3].geometry.translate(-pic[190].map.image.width * 0.4, -pic[190].map.image.height * 0.4, 0);
  levelContainer[1].part[37].part[3].position.set(-50, 218, -0.001);
  gsap.to(levelContainer[1].part[37].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[37].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[191].map.image.width, pic[191].map.image.height), pic[191]);
  levelContainer[1].part[37].part[4].geometry.translate(0, -pic[191].map.image.height * 0.4, 0);
  levelContainer[1].part[37].part[4].position.set(50, 218, 0.001);
  gsap.to(levelContainer[1].part[37].part[4].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[37].part[0].add(levelContainer[1].part[37].part[4], levelContainer[1].part[37].part[3], levelContainer[1].part[37].part[2], levelContainer[1].part[37].part[1]);
  levelContainer[1].part[37].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[37].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[37].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[192].map.image.width, pic[192].map.image.height), pic[192]);
  levelContainer[1].part[37].part[5].position.set(-10, -45, -0.001);
  levelContainer[1].part[37].add(levelContainer[1].part[37].part[0], levelContainer[1].part[37].part[5]);
  levelContainer[1].part[37].scale.set(-0.24, 0.24, 1);
  levelContainer[1].part[37].position.set(-100, -245, -4);
  levelContainer[1].part[38] = new THREE.Object3D();
  levelContainer[1].part[38].part = [];
  levelContainer[1].part[38].part[0] = new THREE.Object3D();
  levelContainer[1].part[38].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[193].map.image.width * 0.57, pic[193].map.image.height * 0.57), pic[193]);
  levelContainer[1].part[38].part[1].geometry.translate(0, pic[193].map.image.height * 0.2 * 0.57, 0);
  levelContainer[1].part[38].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[194].map.image.width, pic[194].map.image.height), pic[194]);
  levelContainer[1].part[38].part[2].geometry.translate(pic[194].map.image.width * 0.1, pic[194].map.image.height * 0.4, 0);
  levelContainer[1].part[38].part[2].position.set(-10, 245, 0.001);
  levelContainer[1].part[38].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[38].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[38].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[195].map.image.width, pic[195].map.image.height), pic[195]);
  levelContainer[1].part[38].part[3].geometry.translate(-pic[195].map.image.width * 0.4, -pic[195].map.image.height * 0.4, 0);
  levelContainer[1].part[38].part[3].position.set(-45, 223, -0.001);
  gsap.to(levelContainer[1].part[38].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[38].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[196].map.image.width, pic[196].map.image.height), pic[196]);
  levelContainer[1].part[38].part[4].geometry.translate(-pic[196].map.image.width * 0.35, -pic[196].map.image.height * 0.4, 0);
  levelContainer[1].part[38].part[4].position.set(68, 223, 0.001);
  gsap.to(levelContainer[1].part[38].part[4].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[38].part[0].add(levelContainer[1].part[38].part[4], levelContainer[1].part[38].part[3], levelContainer[1].part[38].part[2], levelContainer[1].part[38].part[1]);
  levelContainer[1].part[38].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[38].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[38].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[192].map.image.width, pic[192].map.image.height), pic[192]);
  levelContainer[1].part[38].part[5].position.set(-10, -45, -0.001);
  levelContainer[1].part[38].add(levelContainer[1].part[38].part[0], levelContainer[1].part[38].part[5]);
  levelContainer[1].part[38].scale.set(0.3, 0.3, 1);
  levelContainer[1].part[38].position.set(175, -265, -2);
  levelContainer[1].part[39] = new THREE.Object3D();
  levelContainer[1].part[39].part = [];
  levelContainer[1].part[39].part[0] = new THREE.Object3D();
  levelContainer[1].part[39].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[197].map.image.width, pic[197].map.image.height), pic[197]);
  levelContainer[1].part[39].part[1].geometry.translate(0, pic[197].map.image.height * 0.15, 0);
  levelContainer[1].part[39].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[198].map.image.width, pic[198].map.image.height), pic[198]);
  levelContainer[1].part[39].part[2].geometry.translate(pic[198].map.image.width * 0.1, pic[198].map.image.height * 0.4, 0);
  levelContainer[1].part[39].part[2].position.set(-23, 250, 0.001);
  levelContainer[1].part[39].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[39].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[39].part[3] = new THREE.Object3D();
  levelContainer[1].part[39].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[199].map.image.width, pic[199].map.image.height), pic[199]);
  levelContainer[1].part[39].part[4].geometry.translate(-pic[199].map.image.width * 0.1, -pic[199].map.image.height * 0.4, 0);
  levelContainer[1].part[39].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[200].map.image.width, pic[200].map.image.height), pic[200]);
  levelContainer[1].part[39].part[5].geometry.translate(-pic[200].map.image.width * 0.4, -pic[200].map.image.height * 0.4, 0);
  levelContainer[1].part[39].part[5].position.set(-5, -75, 0.001);
  levelContainer[1].part[39].part[3].add(levelContainer[1].part[39].part[4], levelContainer[1].part[39].part[5]);
  levelContainer[1].part[39].part[3].position.set(-60, 230, -0.01);
  levelContainer[1].part[39].handTween1 = gsap.to(levelContainer[1].part[39].part[3].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[1].part[39].handTween2 = gsap.to(levelContainer[1].part[39].part[5].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[1].part[39].part[6] = new THREE.Object3D();
  levelContainer[1].part[39].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[201].map.image.width, pic[201].map.image.height), pic[201]);
  levelContainer[1].part[39].part[7].geometry.translate(pic[201].map.image.width * 0.3, -pic[201].map.image.height * 0.4, 0);
  levelContainer[1].part[39].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[202].map.image.width, pic[202].map.image.height), pic[202]);
  levelContainer[1].part[39].part[8].geometry.translate(-pic[202].map.image.width * 0.3, -pic[202].map.image.height * 0.4, 0);
  levelContainer[1].part[39].part[8].position.set(30, -80, -0.001);
  levelContainer[1].part[39].part[8].rotation.z = -0.2;
  levelContainer[1].part[39].handTween3 = gsap.to(levelContainer[1].part[39].part[6].rotation, { duration: 0.3, z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[39].handTween4 = gsap.to(levelContainer[1].part[39].part[8].rotation, { duration: 0.3, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[39].part[6].add(levelContainer[1].part[39].part[7], levelContainer[1].part[39].part[8]);
  levelContainer[1].part[39].part[6].position.set(50, 240, 0.01);
  levelContainer[1].part[39].part[6].rotation.z = 0;
  levelContainer[1].part[39].part[9] = new THREE.Object3D();
  levelContainer[1].part[39].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[203].map.image.width, pic[203].map.image.height), pic[203]);
  levelContainer[1].part[39].part[10].geometry.translate(0, -pic[203].map.image.height * 0.4, 0);
  levelContainer[1].part[39].part[11] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[204].map.image.width, pic[204].map.image.height), pic[204]);
  levelContainer[1].part[39].part[11].geometry.translate(-pic[204].map.image.width * 0.2, -pic[204].map.image.height * 0.3, 0);
  levelContainer[1].part[39].part[11].position.set(7, -80, -0.001);
  levelContainer[1].part[39].part[9].add(levelContainer[1].part[39].part[10], levelContainer[1].part[39].part[11]);
  levelContainer[1].part[39].part[9].position.set(-40, 50, -0.01);
  levelContainer[1].part[39].part[9].rotation.z = 0.2;
  levelContainer[1].part[39].part[11].rotation.z = 0.5;
  levelContainer[1].part[39].legTween1 = gsap.to(levelContainer[1].part[39].part[9].rotation, { duration: 0.25, z: -0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[39].legTween2 = gsap.to(levelContainer[1].part[39].part[11].rotation, { duration: 0.25, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[39].part[12] = new THREE.Object3D();
  levelContainer[1].part[39].part[13] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[203].map.image.width, pic[203].map.image.height), pic[203]);
  levelContainer[1].part[39].part[13].geometry.translate(0, -pic[203].map.image.height * 0.4, 0);
  levelContainer[1].part[39].part[14] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[204].map.image.width, pic[204].map.image.height), pic[204]);
  levelContainer[1].part[39].part[14].geometry.translate(-pic[204].map.image.width * 0.2, -pic[204].map.image.height * 0.3, 0);
  levelContainer[1].part[39].part[14].position.set(7, -80, -0.001);
  levelContainer[1].part[39].part[12].add(levelContainer[1].part[39].part[13], levelContainer[1].part[39].part[14]);
  levelContainer[1].part[39].part[12].position.set(35, 50, -0.01);
  levelContainer[1].part[39].part[12].rotation.z = -0.4;
  levelContainer[1].part[39].legTween3 = gsap.to(levelContainer[1].part[39].part[12].rotation, { duration: 0.25, z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[39].legTween4 = gsap.to(levelContainer[1].part[39].part[14].rotation, { duration: 0.25, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[39].part[15] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[205].map.image.width, pic[205].map.image.height), pic[205]);
  levelContainer[1].part[39].part[15].position.set(0, 0, -0.02);
  levelContainer[1].part[39].part[0].add(levelContainer[1].part[39].part[15], levelContainer[1].part[39].part[9], levelContainer[1].part[39].part[6], levelContainer[1].part[39].part[3], levelContainer[1].part[39].part[2], levelContainer[1].part[39].part[1]);
  levelContainer[1].part[39].add(levelContainer[1].part[39].part[12], levelContainer[1].part[39].part[9], levelContainer[1].part[39].part[0]);
  levelContainer[1].part[39].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[39].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[39].scale.set(-0.31, 0.31, 1);
  levelContainer[1].part[39].position.set(-320, -300, -1);
  levelContainer[1].part[40] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[206].map.image.width * 0.4, pic[206].map.image.height * 0.4), pic[206]);
  levelContainer[1].part[40].geometry.translate(pic[206].map.image.width * 0.15, pic[206].map.image.height * -0.2, 0);
  levelContainer[1].part[40].position.set(-120, 315, -2);
  levelContainer[1].part[40].scale.set(0, 0, 1);
  levelContainer[1].part[41] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[207].map.image.width * 0.4, pic[207].map.image.height * 0.4), pic[207]);
  levelContainer[1].part[41].geometry.translate(pic[207].map.image.width * 0.15, pic[207].map.image.height * -0.2, 0);
  levelContainer[1].part[41].position.set(-80, 270, -2.001);
  levelContainer[1].part[41].scale.set(0, 0, 1);
  levelContainer[1].part[42] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[208].map.image.width * 0.4, pic[208].map.image.height * 0.4), pic[208]);
  levelContainer[1].part[42].geometry.translate(-pic[208].map.image.width * 0.15, pic[208].map.image.height * -0.2, 0);
  levelContainer[1].part[42].position.set(180, 250, -2);
  levelContainer[1].part[42].scale.set(0, 0, 1);
  levelContainer[1].part[43] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[209].map.image.width * 0.4, pic[209].map.image.height * 0.4), pic[209]);
  levelContainer[1].part[43].geometry.translate(-pic[209].map.image.width * 0.15, pic[209].map.image.height * -0.2, 0);
  levelContainer[1].part[43].position.set(120, 200, -2.001);
  levelContainer[1].part[43].scale.set(0, 0, 1);
  levelContainer[1].part[44] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[210].map.image.width * 0.4, pic[210].map.image.height * 0.4), pic[210]);
  levelContainer[1].part[44].geometry.translate(pic[210].map.image.width * 0.15, pic[210].map.image.height * -0.2, 0);
  levelContainer[1].part[44].position.set(-100, -35, -1.5);
  levelContainer[1].part[44].scale.set(0, 0, 1);
  levelContainer[1].part[45] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[211].map.image.width * 0.4, pic[211].map.image.height * 0.4), pic[211]);
  levelContainer[1].part[45].geometry.translate(pic[211].map.image.width * 0.15, pic[211].map.image.height * -0.2, 0);
  levelContainer[1].part[45].position.set(0, -80, -1.5);
  levelContainer[1].part[45].scale.set(0, 0, 1);
  levelContainer[1].part[46] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 1080), pic[52]);
  levelContainer[1].part[46].position.set(0, 0, -1);
  levelContainer[1].part[47] = new THREE.Object3D();
  levelContainer[1].part[47].part = [];
  levelContainer[1].part[47].part[0] = new THREE.Object3D();
  levelContainer[1].part[47].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[212].map.image.width, pic[212].map.image.height), pic[212]);
  levelContainer[1].part[47].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[213].map.image.width, pic[213].map.image.height), pic[213]);
  levelContainer[1].part[47].part[2].geometry.translate(pic[198].map.image.width * 0.1, pic[198].map.image.height * 0.4, 0);
  levelContainer[1].part[47].part[2].position.set(-23, 200, 0.001);
  levelContainer[1].part[47].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[47].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[47].part[3] = new THREE.Object3D();
  levelContainer[1].part[47].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[199].map.image.width, pic[199].map.image.height), pic[199]);
  levelContainer[1].part[47].part[4].geometry.translate(-pic[199].map.image.width * 0.1, -pic[199].map.image.height * 0.4, 0);
  levelContainer[1].part[47].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[200].map.image.width, pic[200].map.image.height), pic[200]);
  levelContainer[1].part[47].part[5].geometry.translate(-pic[200].map.image.width * 0.4, -pic[200].map.image.height * 0.4, 0);
  levelContainer[1].part[47].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[214].map.image.width, pic[214].map.image.height), pic[214]);
  levelContainer[1].part[47].part[7].position.set(-140, -10, 0.002);
  levelContainer[1].part[47].part[7].rotation.z = 0.5;
  levelContainer[1].part[47].part[7].scale.set(0, 0, 1);
  levelContainer[1].part[47].part[6] = new THREE.Object3D();
  levelContainer[1].part[47].part[6].add(levelContainer[1].part[47].part[7], levelContainer[1].part[47].part[5]);
  levelContainer[1].part[47].part[6].position.set(5, -70, 0.001);
  levelContainer[1].part[47].part[3].add(levelContainer[1].part[47].part[4], levelContainer[1].part[47].part[6]);
  levelContainer[1].part[47].part[3].position.set(-75, 158, -0.01);
  levelContainer[1].part[47].part[3].rotation.z = -0.1;
  levelContainer[1].part[47].part[8] = new THREE.Object3D();
  levelContainer[1].part[47].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[199].map.image.width, pic[199].map.image.height), pic[199]);
  levelContainer[1].part[47].part[9].geometry.translate(-pic[199].map.image.width * 0.1, -pic[199].map.image.height * 0.4, 0);
  levelContainer[1].part[47].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[200].map.image.width, pic[200].map.image.height), pic[200]);
  levelContainer[1].part[47].part[10].geometry.translate(-pic[200].map.image.width * 0.4, -pic[200].map.image.height * 0.4, 0);
  levelContainer[1].part[47].part[12] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[214].map.image.width, pic[214].map.image.height), pic[214]);
  levelContainer[1].part[47].part[12].position.set(-140, -10, 0.002);
  levelContainer[1].part[47].part[12].rotation.z = 0.5;
  levelContainer[1].part[47].part[12].scale.set(0, 0, 1);
  levelContainer[1].part[47].part[11] = new THREE.Object3D();
  levelContainer[1].part[47].part[11].add(levelContainer[1].part[47].part[12], levelContainer[1].part[47].part[10]);
  levelContainer[1].part[47].part[11].position.set(5, -70, 0.001);
  levelContainer[1].part[47].part[8].add(levelContainer[1].part[47].part[11], levelContainer[1].part[47].part[9]);
  levelContainer[1].part[47].part[8].position.set(80, 160, -0.01);
  levelContainer[1].part[47].part[8].scale.x = -1;
  levelContainer[1].part[47].part[8].rotation.z = 0.1;
  levelContainer[1].part[47].handTween1 = gsap.to(levelContainer[1].part[47].part[6].rotation, { duration: 1 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[1].part[47].handTween2 = gsap.to(levelContainer[1].part[47].part[11].rotation, { duration: 1 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[1].part[47].part[0].add(levelContainer[1].part[47].part[1], levelContainer[1].part[47].part[2]);
  levelContainer[1].part[47].add(levelContainer[1].part[47].part[8], levelContainer[1].part[47].part[3], levelContainer[1].part[47].part[0]);
  levelContainer[1].part[47].scale.set(0.2, 0.2, 1);
  levelContainer[1].part[47].position.set(0, 70, -9.5);
  levelContainer[1].part[48] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[215].map.image.width * 0.58, pic[215].map.image.height * 0.58), pic[215]);
  levelContainer[1].part[48].position.set(0, 48.5, -9);
  levelContainer[1].part[49] = new THREE.Object3D();
  levelContainer[1].part[49].part = [];
  levelContainer[1].part[49].part[0] = new THREE.Object3D();
  levelContainer[1].part[49].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[216].map.image.width, pic[216].map.image.height), pic[216]);
  levelContainer[1].part[49].part[1].geometry.translate(0, pic[216].map.image.height * 0.15, 0);
  levelContainer[1].part[49].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[217].map.image.width, pic[217].map.image.height), pic[217]);
  levelContainer[1].part[49].part[2].geometry.translate(pic[217].map.image.width * 0.1, pic[217].map.image.height * 0.4, 0);
  levelContainer[1].part[49].part[2].position.set(-10, 200, 0.001);
  levelContainer[1].part[49].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[49].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[49].part[3] = new THREE.Object3D();
  levelContainer[1].part[49].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[218].map.image.width, pic[218].map.image.height), pic[218]);
  levelContainer[1].part[49].part[4].geometry.translate(-pic[218].map.image.width * 0.3, -pic[218].map.image.height * 0.4, 0);
  levelContainer[1].part[49].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[221].map.image.width, pic[221].map.image.height), pic[221]);
  levelContainer[1].part[49].part[5].position.set(-105, -110, 0.001);
  levelContainer[1].part[49].part[5].rotation.z = 0.3;
  levelContainer[1].part[49].part[3].add(levelContainer[1].part[49].part[4], levelContainer[1].part[49].part[5]);
  levelContainer[1].part[49].part[3].position.set(-80, 175, -0.01);
  levelContainer[1].part[49].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[219].map.image.width, pic[219].map.image.height), pic[219]);
  levelContainer[1].part[49].part[6].geometry.translate(pic[219].map.image.width * 0.1, -pic[219].map.image.height * 0.4, 0);
  levelContainer[1].part[49].part[6].position.set(65, 178, 0.01);
  levelContainer[1].part[49].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[220].map.image.width, pic[220].map.image.height), pic[220]);
  levelContainer[1].part[49].part[7].geometry.translate(pic[220].map.image.width * 0.1, -pic[220].map.image.height * 0.4, 0);
  levelContainer[1].part[49].part[7].position.set(-55, -10, -0.001);
  levelContainer[1].part[49].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[220].map.image.width, pic[220].map.image.height), pic[220]);
  levelContainer[1].part[49].part[8].geometry.translate(pic[220].map.image.width * 0.1, -pic[220].map.image.height * 0.4, 0);
  levelContainer[1].part[49].part[8].position.set(30, -10, -0.001);
  levelContainer[1].part[49].part[0].add(levelContainer[1].part[49].part[6], levelContainer[1].part[49].part[3], levelContainer[1].part[49].part[1], levelContainer[1].part[49].part[2]);
  levelContainer[1].part[49].add(levelContainer[1].part[49].part[8], levelContainer[1].part[49].part[7], levelContainer[1].part[49].part[0]);
  levelContainer[1].part[49].scale.set(-0.2, 0.2, 1);
  levelContainer[1].part[49].position.set(-50, -40, -6);
  levelContainer[1].part[49].nandTween = gsap.to(levelContainer[1].part[49].part[6].rotation, { duration: 0.3, z: 0.5, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[49].bodyTween = gsap.to(levelContainer[1].part[49].part[0].rotation, { duration: 0.4, z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[49].hitTween = gsap.to(levelContainer[1].part[49].part[3].rotation, { duration: 0.15, z: 1, ease: "power1.in", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[1].part[49].hitTween !== undefined && levelContainer[1].part[49].hitTween !== null) levelContainer[1].part[49].hitTween.restart();
    }, Math.random() * 400);
  } });
  levelContainer[1].part[49].jumpTween = gsap.to(levelContainer[1].part[49].part[0].position, { duration: 0.1, y: -20, ease: "power2.in", onComplete: function() {
    gsap.to(levelContainer[1].part[49].part[0].position, { duration: 0.1, y: 0, ease: "power2.out" });
    if (levelContainer[1].part[49].jumpTween !== undefined && levelContainer[1].part[49].jumpTween !== null) {
      gsap.to(levelContainer[1].part[49].position, { duration: 0.4, x: -60 + Math.random() * 20, ease: "none" });
      gsap.to(levelContainer[1].part[49].position, { duration: 0.2, y: -30, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
        setTimeout(function() {
          if (levelContainer[1].part[49].jumpTween !== undefined && levelContainer[1].part[49].jumpTween !== null) levelContainer[1].part[49].jumpTween.restart();
        }, Math.random() * 400);
      } });
    }
  } });
  levelContainer[1].part[50] = new THREE.Object3D();
  levelContainer[1].part[50].part = [];
  levelContainer[1].part[50].part[0] = new THREE.Object3D();
  levelContainer[1].part[50].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[222].map.image.width, pic[222].map.image.height), pic[222]);
  levelContainer[1].part[50].part[1].geometry.translate(0, pic[222].map.image.height * 0.15, 0);
  levelContainer[1].part[50].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[223].map.image.width, pic[223].map.image.height), pic[223]);
  levelContainer[1].part[50].part[2].geometry.translate(pic[223].map.image.width * 0.1, pic[223].map.image.height * 0.4, 0);
  levelContainer[1].part[50].part[2].position.set(-10, 200, 0.001);
  levelContainer[1].part[50].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[1].part[50].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[50].part[3] = new THREE.Object3D();
  levelContainer[1].part[50].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[224].map.image.width, pic[224].map.image.height), pic[224]);
  levelContainer[1].part[50].part[4].geometry.translate(-pic[224].map.image.width * 0.3, -pic[224].map.image.height * 0.4, 0);
  levelContainer[1].part[50].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[227].map.image.width, pic[227].map.image.height), pic[227]);
  levelContainer[1].part[50].part[5].position.set(-140, -70, 0.001);
  levelContainer[1].part[50].part[5].rotation.z = 0.3;
  levelContainer[1].part[50].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[228].map.image.width, pic[228].map.image.height), pic[228]);
  levelContainer[1].part[50].part[3].add(levelContainer[1].part[50].part[4], levelContainer[1].part[50].part[5]);
  levelContainer[1].part[50].part[3].position.set(-60, 165, -0.01);
  levelContainer[1].part[50].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[225].map.image.width, pic[225].map.image.height), pic[225]);
  levelContainer[1].part[50].part[6].geometry.translate(pic[225].map.image.width * 0.1, -pic[225].map.image.height * 0.4, 0);
  levelContainer[1].part[50].part[6].position.set(70, 178, 0.01);
  levelContainer[1].part[50].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[226].map.image.width, pic[226].map.image.height), pic[226]);
  levelContainer[1].part[50].part[7].geometry.translate(pic[226].map.image.width * 0.1, -pic[226].map.image.height * 0.4, 0);
  levelContainer[1].part[50].part[7].position.set(-40, -10, -0.001);
  levelContainer[1].part[50].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[226].map.image.width, pic[226].map.image.height), pic[226]);
  levelContainer[1].part[50].part[8].geometry.translate(pic[226].map.image.width * 0.1, -pic[226].map.image.height * 0.4, 0);
  levelContainer[1].part[50].part[8].position.set(35, -10, -0.001);
  levelContainer[1].part[50].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[228].map.image.width, pic[228].map.image.height), pic[228]);
  levelContainer[1].part[50].part[9].position.set(50, 0, 0.1);
  levelContainer[1].part[50].part[0].add(levelContainer[1].part[50].part[9], levelContainer[1].part[50].part[6], levelContainer[1].part[50].part[3], levelContainer[1].part[50].part[1], levelContainer[1].part[50].part[2]);
  levelContainer[1].part[50].add(levelContainer[1].part[50].part[8], levelContainer[1].part[50].part[7], levelContainer[1].part[50].part[0]);
  levelContainer[1].part[50].scale.set(0.2, 0.2, 1);
  levelContainer[1].part[50].position.set(50, -40, -6.02);
  levelContainer[1].part[50].nandTween = gsap.to(levelContainer[1].part[50].part[9].rotation, { duration: 0.35, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[50].bodyTween = gsap.to(levelContainer[1].part[50].part[0].rotation, { duration: 0.45, z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[1].part[50].hitTween = gsap.to(levelContainer[1].part[50].part[3].rotation, { duration: 0.2, z: -1.5, ease: "power2.out", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[1].part[50].hitTween !== undefined && levelContainer[1].part[50].hitTween !== null) levelContainer[1].part[50].hitTween.restart();
    }, Math.random() * 600);
  } });
  levelContainer[1].part[50].jumpTween = gsap.to(levelContainer[1].part[50].part[0].position, { duration: 0.1, y: -20, ease: "power2.in", onComplete: function() {
    gsap.to(levelContainer[1].part[50].part[0].position, { duration: 0.1, y: 0, ease: "power2.out" });
    if (levelContainer[1].part[50].jumpTween !== undefined && levelContainer[1].part[50].jumpTween !== null) {
      gsap.to(levelContainer[1].part[50].position, { duration: 0.4, x: 60 - Math.random() * 20, ease: "none" });
      gsap.to(levelContainer[1].part[50].position, { duration: 0.2, y: -30, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
        setTimeout(function() {
          if (levelContainer[1].part[50].jumpTween !== undefined && levelContainer[1].part[50].jumpTween !== null) levelContainer[1].part[50].jumpTween.restart();
        }, Math.random() * 400);
      } });
    }
  } });
  levelContainer[1].part[51] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[229].map.image.width * 0.5, pic[229].map.image.height * 0.5), pic[229]);
  levelContainer[1].part[51].geometry.translate(0, 450, 0);
  levelContainer[1].part[51].position.set(0, 0, -20);
  levelContainer[1].part[51].rotation.z = 0.8;
  levelScene[1].part[0] = new THREE.Object3D();
  levelScene[1].part[0].back = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[78].map.image.width, pic[78].map.image.height), pic[78]);
  levelScene[1].part[0].button = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[61].map.image.width, pic[61].map.image.height), pic[61]);
  levelScene[1].part[0].button.position.set(-10, -95, 0.001);
  levelScene[1].part[0].add(levelScene[1].part[0].button, levelScene[1].part[0].back);
  //levelScene[1].part[0].back.position.set(-pic[78].map.image.width * 0.3, pic[78].map.image.height * 0.5, 0);
  levelScene[1].part[0].position.set(0, -110, 1);
  levelScene[1].part[0].scale.set(0, 0, 1);
  levelScene[1].part[0].button.ready = false;
  levelScene[1].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[81].map.image.width * 0.192, pic[81].map.image.height * 0.192), pic[81]);
  levelScene[1].part[1].position.set(0, -30, 1);
  levelScene[1].part[1].scale.set(0, 0, 1);
  levelScene[1].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[83].map.image.width * 0.192, pic[83].map.image.height * 0.192), pic[83]);
  levelScene[1].part[2].position.set(-44, -70, 1);
  levelScene[1].part[2].scale.set(0, 0, 1);
  levelScene[1].part[2].ready = false;
  levelScene[1].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[84].map.image.width * 0.192, pic[84].map.image.height * 0.192), pic[84]);
  levelScene[1].part[3].position.set(44, -70, 1);
  levelScene[1].part[3].scale.set(0, 0, 1);
  levelScene[1].part[3].ready = false;
  levelScene[1].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[85].map.image.width * 0.192, pic[85].map.image.height * 0.192), pic[85]);
  levelScene[1].part[4].position.set(0, -107, 1);
  levelScene[1].part[4].scale.set(0, 0, 1);
  levelScene[1].part[4].ready = false;
  levelContainer[2].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[230].map.image.width * pic[230].map.image.height), pic[230]);
  levelContainer[2].part[0].position.z = -19;
  levelContainer[2].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 1080), pic[231]);
  levelContainer[2].part[1].position.set(0, 0, -1);
  levelContainer[2].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 498 / pic[232].map.image.width * pic[232].map.image.height), pic[232]);
  levelContainer[2].part[2].position.set(-1, -284, -6);
  levelContainer[2].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 498 / pic[233].map.image.width * pic[233].map.image.height), pic[233]);
  levelContainer[2].part[3].position.set(-1, -285, -5);
  levelContainer[2].part[4] = new THREE.Object3D();
  levelContainer[2].part[4].part = [];
  levelContainer[2].part[4].part[0] = new THREE.Object3D();
  levelContainer[2].part[4].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[234].map.image.width, pic[234].map.image.height), pic[234]);
  levelContainer[2].part[4].part[1].geometry.translate(0, pic[234].map.image.height * 0.4, 0);
  levelContainer[2].part[4].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[235].map.image.width, pic[235].map.image.height), pic[235]);
  levelContainer[2].part[4].part[2].geometry.translate(pic[235].map.image.width * 0.1, pic[235].map.image.height * 0.4, 0);
  levelContainer[2].part[4].part[2].position.set(-5, 200, 0.001);
  levelContainer[2].part[4].part[2].rotation.z = -0.04;
  gsap.to(levelContainer[2].part[4].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.04, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[4].part[3] = new THREE.Object3D();
  levelContainer[2].part[4].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[236].map.image.width, pic[236].map.image.height), pic[236]);
  levelContainer[2].part[4].part[4].geometry.translate(-pic[236].map.image.width * 0.1, -pic[236].map.image.height * 0.4, 0);
  levelContainer[2].part[4].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[237].map.image.width, pic[237].map.image.height), pic[237]);
  levelContainer[2].part[4].part[5].geometry.translate(-pic[237].map.image.width * 0.4, -pic[237].map.image.height * 0.4, 0);
  levelContainer[2].part[4].part[5].position.set(-5, -75, 0.001);
  levelContainer[2].part[4].part[3].add(levelContainer[2].part[4].part[4], levelContainer[2].part[4].part[5]);
  levelContainer[2].part[4].part[3].position.set(-60, 175, -0.01);
  gsap.to(levelContainer[2].part[4].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  gsap.to(levelContainer[2].part[4].part[5].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[2].part[4].part[6] = new THREE.Object3D();
  levelContainer[2].part[4].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[238].map.image.width, pic[238].map.image.height), pic[238]);
  levelContainer[2].part[4].part[7].geometry.translate(pic[238].map.image.width * 0.3, -pic[238].map.image.height * 0.4, 0);
  levelContainer[2].part[4].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[239].map.image.width, pic[239].map.image.height), pic[239]);
  levelContainer[2].part[4].part[8].geometry.translate(-pic[239].map.image.width * 0.3, -pic[239].map.image.height * 0.4, 0);
  levelContainer[2].part[4].part[8].position.set(45, -80, 0.001);
  gsap.to(levelContainer[2].part[4].part[6].rotation, { duration: 0.5 + Math.random(), z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(levelContainer[2].part[4].part[8].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[4].part[6].add(levelContainer[2].part[4].part[7], levelContainer[2].part[4].part[8]);
  levelContainer[2].part[4].part[6].position.set(65, 180, 0.01);
  levelContainer[2].part[4].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[240].map.image.width, pic[240].map.image.height), pic[240]);
  levelContainer[2].part[4].part[9].position.set(-6, -95, -0.01);
  levelContainer[2].part[4].part[0].add(levelContainer[2].part[4].part[9], levelContainer[2].part[4].part[6], levelContainer[2].part[4].part[3], levelContainer[2].part[4].part[2], levelContainer[2].part[4].part[1]);
  levelContainer[2].part[4].add(levelContainer[2].part[4].part[9], levelContainer[2].part[4].part[0]);
  levelContainer[2].part[4].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[2].part[4].part[0].rotation, { duration: 1 + Math.random(), z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[4].scale.set(0.37, 0.37, 1);
  levelContainer[2].part[4].position.set(-95, -260, -5.5);
  levelContainer[2].part[5] = new THREE.Object3D();
  levelContainer[2].part[5].part = [];
  levelContainer[2].part[5].part[0] = new THREE.Object3D();
  levelContainer[2].part[5].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[241].map.image.width, pic[241].map.image.height), pic[241]);
  levelContainer[2].part[5].part[1].geometry.translate(0, pic[241].map.image.height * 0.4, 0);
  levelContainer[2].part[5].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[242].map.image.width, pic[242].map.image.height), pic[242]);
  levelContainer[2].part[5].part[2].geometry.translate(pic[242].map.image.width * 0.1, pic[242].map.image.height * 0.4, 0);
  levelContainer[2].part[5].part[2].position.set(-5, 200, 0.001);
  levelContainer[2].part[5].part[2].rotation.z = -0.04;
  gsap.to(levelContainer[2].part[5].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.04, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[5].part[3] = new THREE.Object3D();
  levelContainer[2].part[5].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[236].map.image.width, pic[236].map.image.height), pic[236]);
  levelContainer[2].part[5].part[4].geometry.translate(-pic[236].map.image.width * 0.1, -pic[236].map.image.height * 0.4, 0);
  levelContainer[2].part[5].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[237].map.image.width, pic[237].map.image.height), pic[237]);
  levelContainer[2].part[5].part[5].geometry.translate(-pic[237].map.image.width * 0.4, -pic[237].map.image.height * 0.4, 0);
  levelContainer[2].part[5].part[5].position.set(-5, -75, 0.001);
  levelContainer[2].part[5].part[3].add(levelContainer[2].part[5].part[4], levelContainer[2].part[5].part[5]);
  levelContainer[2].part[5].part[3].position.set(-60, 175, -0.01);
  gsap.to(levelContainer[2].part[5].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  gsap.to(levelContainer[2].part[5].part[5].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[2].part[5].part[6] = new THREE.Object3D();
  levelContainer[2].part[5].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[238].map.image.width, pic[238].map.image.height), pic[238]);
  levelContainer[2].part[5].part[7].geometry.translate(pic[238].map.image.width * 0.3, -pic[238].map.image.height * 0.4, 0);
  levelContainer[2].part[5].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[239].map.image.width, pic[239].map.image.height), pic[239]);
  levelContainer[2].part[5].part[8].geometry.translate(-pic[239].map.image.width * 0.3, -pic[239].map.image.height * 0.4, 0);
  levelContainer[2].part[5].part[8].position.set(45, -80, 0.001);
  gsap.to(levelContainer[2].part[5].part[6].rotation, { duration: 0.5 + Math.random(), z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(levelContainer[2].part[5].part[8].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[5].part[6].add(levelContainer[2].part[5].part[7], levelContainer[2].part[5].part[8]);
  levelContainer[2].part[5].part[6].position.set(65, 180, 0.01);
  levelContainer[2].part[5].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[240].map.image.width, pic[240].map.image.height), pic[240]);
  levelContainer[2].part[5].part[9].position.set(-6, -95, -0.01);
  levelContainer[2].part[5].part[0].add(levelContainer[2].part[5].part[9], levelContainer[2].part[5].part[6], levelContainer[2].part[5].part[3], levelContainer[2].part[5].part[2], levelContainer[2].part[5].part[1]);
  levelContainer[2].part[5].add(levelContainer[2].part[5].part[9], levelContainer[2].part[5].part[0]);
  levelContainer[2].part[5].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[2].part[5].part[0].rotation, { duration: 1 + Math.random(), z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[5].scale.set(-0.37, 0.37, 1);
  levelContainer[2].part[5].position.set(-190, -260, -5.5);
  levelContainer[2].part[6] = new THREE.Object3D();
  levelContainer[2].part[6].part = [];
  levelContainer[2].part[6].part[0] = new THREE.Object3D();
  levelContainer[2].part[6].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[248].map.image.width * 0.66, pic[248].map.image.height * 0.66), pic[248]);
  levelContainer[2].part[6].part[1].geometry.translate(0, pic[248].map.image.height * 0.4 * 0.66, 0);
  levelContainer[2].part[6].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[242].map.image.width, pic[242].map.image.height), pic[242]);
  levelContainer[2].part[6].part[2].visible = false;
  levelContainer[2].part[6].part[3] = new THREE.Object3D();
  levelContainer[2].part[6].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[249].map.image.width * 0.66, pic[249].map.image.height * 0.66), pic[249]);
  levelContainer[2].part[6].part[4].geometry.translate(-pic[249].map.image.width * 0.1 * 0.66, -pic[249].map.image.height * 0.4 * 0.66, 0);
  levelContainer[2].part[6].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[250].map.image.width * 0.66, pic[250].map.image.height * 0.66), pic[250]);
  levelContainer[2].part[6].part[5].geometry.translate(-pic[250].map.image.width * 0.4 * 0.66, -pic[250].map.image.height * 0.4 * 0.66, 0);
  levelContainer[2].part[6].part[5].position.set(-5, -75, 0.001);
  levelContainer[2].part[6].part[3].add(levelContainer[2].part[6].part[4], levelContainer[2].part[6].part[5]);
  levelContainer[2].part[6].part[3].position.set(-60, 175, -0.01);
  gsap.to(levelContainer[2].part[6].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  gsap.to(levelContainer[2].part[6].part[5].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[2].part[6].part[6] = new THREE.Object3D();
  levelContainer[2].part[6].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[251].map.image.width * 0.66, pic[251].map.image.height * 0.66), pic[251]);
  levelContainer[2].part[6].part[7].geometry.translate(pic[251].map.image.width * 0.1 * 0.66, -pic[251].map.image.height * 0.4 * 0.66, 0);
  levelContainer[2].part[6].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[252].map.image.width * 0.66, pic[252].map.image.height * 0.66), pic[252]);
  levelContainer[2].part[6].part[8].geometry.translate(-pic[252].map.image.width * 0.3 * 0.66, -pic[252].map.image.height * 0.4 * 0.66, 0);
  levelContainer[2].part[6].part[8].position.set(15, -90, 0.001);
  gsap.to(levelContainer[2].part[6].part[6].rotation, { duration: 0.5 + Math.random(), z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(levelContainer[2].part[6].part[8].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[6].part[6].add(levelContainer[2].part[6].part[7], levelContainer[2].part[6].part[8]);
  levelContainer[2].part[6].part[6].position.set(80, 185, 0.01);
  levelContainer[2].part[6].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[253].map.image.width * 0.66, pic[253].map.image.height * 0.66), pic[253]);
  levelContainer[2].part[6].part[9].position.set(-12, -95, -0.01);
  levelContainer[2].part[6].part[0].add(levelContainer[2].part[6].part[9], levelContainer[2].part[6].part[6], levelContainer[2].part[6].part[3], levelContainer[2].part[6].part[2], levelContainer[2].part[6].part[1]);
  levelContainer[2].part[6].add(levelContainer[2].part[6].part[9], levelContainer[2].part[6].part[0]);
  levelContainer[2].part[6].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[2].part[6].part[0].rotation, { duration: 1 + Math.random(), z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[6].scale.set(0.45, 0.45, 1);
  levelContainer[2].part[6].position.set(170, -285, -5.5);
  levelContainer[2].part[7] = new THREE.Object3D();
  levelContainer[2].part[7].part = [];
  levelContainer[2].part[7].part[0] = new THREE.Object3D();
  levelContainer[2].part[7].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[254].map.image.width, pic[254].map.image.height), pic[254]);
  levelContainer[2].part[7].part[1].geometry.translate(0, pic[254].map.image.height * 0.4, 0);
  levelContainer[2].part[7].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[255].map.image.width, pic[255].map.image.height), pic[255]);
  levelContainer[2].part[7].part[2].geometry.translate(pic[17].map.image.width * 0.1, pic[255].map.image.height * 0.4, 0);
  levelContainer[2].part[7].part[2].position.set(-24, 175, 0.001);
  levelContainer[2].part[7].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[2].part[7].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[7].part[3] = new THREE.Object3D();
  levelContainer[2].part[7].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[256].map.image.width, pic[256].map.image.height), pic[256]);
  levelContainer[2].part[7].part[4].geometry.translate(-pic[256].map.image.width * 0.1, -pic[256].map.image.height * 0.4, 0);
  levelContainer[2].part[7].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[257].map.image.width, pic[257].map.image.height), pic[257]);
  levelContainer[2].part[7].part[5].geometry.translate(-pic[257].map.image.width * 0.4, -pic[257].map.image.height * 0.4, 0);
  levelContainer[2].part[7].part[5].position.set(-5, -75, 0.001);
  levelContainer[2].part[7].part[3].add(levelContainer[2].part[7].part[4], levelContainer[2].part[7].part[5]);
  levelContainer[2].part[7].part[3].position.set(-63, 172, -0.02);
  levelContainer[2].part[7].handTween1 = gsap.to(levelContainer[2].part[7].part[3].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[2].part[7].handTween2 = gsap.to(levelContainer[2].part[7].part[5].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[2].part[7].part[6] = new THREE.Object3D();
  levelContainer[2].part[7].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[258].map.image.width, pic[258].map.image.height), pic[258]);
  levelContainer[2].part[7].part[7].geometry.translate(pic[258].map.image.width * 0.2, -pic[258].map.image.height * 0.4, 0);
  levelContainer[2].part[7].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[259].map.image.width, pic[259].map.image.height), pic[259]);
  levelContainer[2].part[7].part[8].geometry.translate(-pic[259].map.image.width * 0.3, -pic[259].map.image.height * 0.4, 0);
  levelContainer[2].part[7].part[8].position.set(30, -80, 0.001);
  levelContainer[2].part[7].part[8].rotation.z = -0.5;
  levelContainer[2].part[7].handTween3 = gsap.to(levelContainer[2].part[7].part[6].rotation, { duration: 0.3, z: 0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[7].handTween4 = gsap.to(levelContainer[2].part[7].part[8].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[7].part[6].add(levelContainer[2].part[7].part[7], levelContainer[2].part[7].part[8]);
  levelContainer[2].part[7].part[6].position.set(58, 180, 0.01);
  levelContainer[2].part[7].part[6].rotation.z = 0;
  levelContainer[2].part[7].part[9] = new THREE.Object3D();
  levelContainer[2].part[7].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[260].map.image.width, pic[260].map.image.height), pic[260]);
  levelContainer[2].part[7].part[10].geometry.translate(0, -pic[260].map.image.height * 0.4, 0);
  levelContainer[2].part[7].part[11] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[261].map.image.width, pic[261].map.image.height), pic[261]);
  levelContainer[2].part[7].part[11].geometry.translate(-pic[261].map.image.width * 0.2, -pic[261].map.image.height * 0.3, 0);
  levelContainer[2].part[7].part[11].position.set(7, -80, -0.001);
  levelContainer[2].part[7].part[9].add(levelContainer[2].part[7].part[10], levelContainer[2].part[7].part[11]);
  levelContainer[2].part[7].part[9].position.set(-40, 10, -0.01);
  levelContainer[2].part[7].part[9].rotation.z = 0.2;
  levelContainer[2].part[7].part[11].rotation.z = 0.5;
  levelContainer[2].part[7].legTween1 = gsap.to(levelContainer[2].part[7].part[9].rotation, { duration: 0.3, z: -0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[7].legTween2 = gsap.to(levelContainer[2].part[7].part[11].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[7].part[12] = new THREE.Object3D();
  levelContainer[2].part[7].part[13] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[260].map.image.width, pic[260].map.image.height), pic[260]);
  levelContainer[2].part[7].part[13].geometry.translate(0, -pic[260].map.image.height * 0.4, 0);
  levelContainer[2].part[7].part[14] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[261].map.image.width, pic[261].map.image.height), pic[261]);
  levelContainer[2].part[7].part[14].geometry.translate(-pic[261].map.image.width * 0.2, -pic[261].map.image.height * 0.3, 0);
  levelContainer[2].part[7].part[14].position.set(7, -80, -0.001);
  levelContainer[2].part[7].part[12].add(levelContainer[2].part[7].part[13], levelContainer[2].part[7].part[14]);
  levelContainer[2].part[7].part[12].position.set(20, 10, -0.01);
  levelContainer[2].part[7].part[12].rotation.z = -0.3;
  levelContainer[2].part[7].legTween3 = gsap.to(levelContainer[2].part[7].part[12].rotation, { duration: 0.3, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[7].legTween4 = gsap.to(levelContainer[2].part[7].part[14].rotation, { duration: 0.3, z: 0.5, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[7].part[0].add(levelContainer[2].part[7].part[9], levelContainer[2].part[7].part[6], levelContainer[2].part[7].part[3], levelContainer[2].part[7].part[2], levelContainer[2].part[7].part[1]);
  levelContainer[2].part[7].add(levelContainer[2].part[7].part[12], levelContainer[2].part[7].part[9], levelContainer[2].part[7].part[0]);
  levelContainer[2].part[7].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[2].part[7].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[7].scale.set(-0.48, 0.48, 1);
  levelContainer[2].part[7].position.set(-350, -280, -2);
  levelContainer[2].part[8] = new THREE.Object3D();
  levelContainer[2].part[8].part = [];
  levelContainer[2].part[8].part[0] = new THREE.Object3D();
  levelContainer[2].part[8].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[262].map.image.width, pic[262].map.image.height), pic[262]);
  levelContainer[2].part[8].part[1].geometry.translate(0, pic[262].map.image.height * 0.4, 0);
  levelContainer[2].part[8].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[263].map.image.width, pic[263].map.image.height), pic[263]);
  levelContainer[2].part[8].part[2].geometry.translate(pic[263].map.image.width * 0.1, pic[263].map.image.height * 0.4, 0);
  levelContainer[2].part[8].part[2].position.set(-5, 170, 0.001);
  levelContainer[2].part[8].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[2].part[8].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[8].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[264].map.image.width, pic[264].map.image.height), pic[264]);
  levelContainer[2].part[8].part[3].geometry.translate(-pic[264].map.image.width * 0.4, -pic[264].map.image.height * 0.4, 0);
  levelContainer[2].part[8].part[3].position.set(-50, 135, -0.001);
  gsap.to(levelContainer[2].part[8].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[8].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[265].map.image.width, pic[265].map.image.height), pic[265]);
  levelContainer[2].part[8].part[4].geometry.translate(-pic[265].map.image.width * 0.4, -pic[265].map.image.height * 0.4, 0);
  levelContainer[2].part[8].part[4].position.set(75, 130, 0.001);
  gsap.to(levelContainer[2].part[8].part[4].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[8].part[0].add(levelContainer[2].part[8].part[4], levelContainer[2].part[8].part[3], levelContainer[2].part[8].part[2], levelContainer[2].part[8].part[1]);
  levelContainer[2].part[8].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[2].part[8].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[8].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[266].map.image.width, pic[266].map.image.height), pic[266]);
  levelContainer[2].part[8].part[5].position.set(-15, -95, -0.001);
  levelContainer[2].part[8].add(levelContainer[2].part[8].part[0], levelContainer[2].part[8].part[5]);
  levelContainer[2].part[8].scale.set(0.16, 0.16, 1);
  levelContainer[2].part[8].position.set(180, -58, -18);
  levelContainer[2].part[9] = new THREE.Object3D();
  levelContainer[2].part[9].part = [];
  levelContainer[2].part[9].part[0] = new THREE.Object3D();
  levelContainer[2].part[9].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[267].map.image.width, pic[267].map.image.height), pic[267]);
  levelContainer[2].part[9].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[268].map.image.width, pic[268].map.image.height), pic[268]);
  levelContainer[2].part[9].part[2].geometry.translate(pic[268].map.image.width * 0.1, pic[268].map.image.height * 0.4, 0);
  levelContainer[2].part[9].part[2].position.set(-11, 205, 0.001);
  levelContainer[2].part[9].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[2].part[9].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[9].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[269].map.image.width, pic[269].map.image.height), pic[269]);
  levelContainer[2].part[9].part[3].geometry.translate(-pic[269].map.image.width * 0.4, -pic[269].map.image.height * 0.4, 0);
  levelContainer[2].part[9].part[3].position.set(-41, 182, -0.001);
  gsap.to(levelContainer[2].part[9].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[9].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[270].map.image.width, pic[270].map.image.height), pic[270]);
  levelContainer[2].part[9].part[4].geometry.translate(pic[270].map.image.width * 0.3, -pic[270].map.image.height * 0.4, 0);
  levelContainer[2].part[9].part[4].position.set(60, 175, 0.001);
  gsap.to(levelContainer[2].part[9].part[4].rotation, { duration: 1 + Math.random() * 2, z: -0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[9].part[0].add(levelContainer[2].part[9].part[4], levelContainer[2].part[9].part[3], levelContainer[2].part[9].part[2], levelContainer[2].part[9].part[1]);
  levelContainer[2].part[9].part[0].rotation.z = -0.03;
  levelContainer[2].part[9].add(levelContainer[2].part[9].part[0]);
  levelContainer[2].part[9].scale.set(0.16, 0.16, 1);
  levelContainer[2].part[9].position.set(142, -58, -18.5);
  levelContainer[2].part[10] = new THREE.Object3D();
  levelContainer[2].part[10].part = [];
  levelContainer[2].part[10].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[271].map.image.width, pic[271].map.image.height), pic[271]);
  levelContainer[2].part[10].part[0].scale.set(0.7, 0.7, 1);
  levelContainer[2].part[10].part[0].position.set(-150, 0, 0.001);
  levelContainer[2].part[10].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[272].map.image.width, pic[272].map.image.height), pic[272]);
  levelContainer[2].part[10].part[1].geometry.translate(pic[272].map.image.width * 0.5, 0, 0);
  levelContainer[2].part[10].add(levelContainer[2].part[10].part[0], levelContainer[2].part[10].part[1]);
  levelContainer[2].part[10].scale.set(0.6, 0.6, 1);
  levelContainer[2].part[10].position.set(1000, 450, -2);
  gsap.to(levelContainer[2].part[10].position, { duration: 15, x: -1000, y: 250, ease: "none", repeat: -1 });
  gsap.to(levelContainer[2].part[10].part[1].scale, { duration: 0.4, x: 1.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(levelContainer[2].part[10].part[1].scale, { duration: 0.5, y: 1.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[11] = new THREE.Object3D();
  levelContainer[2].part[11].part = [];
  levelContainer[2].part[11].part[0] = new THREE.Object3D();
  levelContainer[2].part[11].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[273].map.image.width, pic[273].map.image.height), pic[273]);
  levelContainer[2].part[11].part[1].geometry.translate(0, pic[273].map.image.height * 0.4, 0);
  levelContainer[2].part[11].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[274].map.image.width, pic[274].map.image.height), pic[274]);
  levelContainer[2].part[11].part[2].geometry.translate(pic[274].map.image.width * 0.1, pic[274].map.image.height * 0.4, 0);
  levelContainer[2].part[11].part[2].position.set(-11, 205, 0.001);
  levelContainer[2].part[11].part[2].rotation.z = -0.03;
  levelContainer[2].part[11].headTween = gsap.to(levelContainer[2].part[11].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[11].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[275].map.image.width, pic[275].map.image.height), pic[275]);
  levelContainer[2].part[11].part[3].geometry.translate(-pic[275].map.image.width * 0.3, -pic[275].map.image.height * 0.4, 0);
  levelContainer[2].part[11].part[3].position.set(-60, 175, -0.02);
  levelContainer[2].part[11].handTween1 = gsap.to(levelContainer[2].part[11].part[3].rotation, { duration: 0.3 + Math.random() * 0.8, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[11].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[276].map.image.width, pic[276].map.image.height), pic[276]);
  levelContainer[2].part[11].part[4].geometry.translate(pic[276].map.image.width * 0.3, -pic[276].map.image.height * 0.4, 0);
  levelContainer[2].part[11].part[4].position.set(53, 180, 0.02);
  levelContainer[2].part[11].handTween2 = gsap.to(levelContainer[2].part[11].part[4].rotation, { duration: 0.3 + Math.random() * 0.8, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[11].part[5] = new THREE.Object3D();
  levelContainer[2].part[11].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[277].map.image.width, pic[277].map.image.height), pic[277]);
  levelContainer[2].part[11].part[6].geometry.translate(0, -pic[277].map.image.height * 0.4, 0);
  levelContainer[2].part[11].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[278].map.image.width, pic[278].map.image.height), pic[278]);
  levelContainer[2].part[11].part[7].geometry.translate(0, -pic[278].map.image.height * 0.4, 0);
  levelContainer[2].part[11].part[7].position.set(-10, -112, -0.001);
  levelContainer[2].part[11].part[5].add(levelContainer[2].part[11].part[6], levelContainer[2].part[11].part[7]);
  levelContainer[2].part[11].part[5].position.set(-40, 17, 0.01);
  levelContainer[2].part[11].part[8] = new THREE.Object3D();
  levelContainer[2].part[11].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[279].map.image.width, pic[279].map.image.height), pic[279]);
  levelContainer[2].part[11].part[9].geometry.translate(0, -pic[279].map.image.height * 0.4, 0);
  levelContainer[2].part[11].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[278].map.image.width, pic[278].map.image.height), pic[278]);
  levelContainer[2].part[11].part[10].geometry.translate(0, -pic[278].map.image.height * 0.4, 0);
  levelContainer[2].part[11].part[10].position.set(-12, -110, -0.001);
  levelContainer[2].part[11].part[8].add(levelContainer[2].part[11].part[9], levelContainer[2].part[11].part[10]);
  levelContainer[2].part[11].part[8].position.set(37, 16, 0.015);
  levelContainer[2].part[11].part[0].add(levelContainer[2].part[11].part[4], levelContainer[2].part[11].part[3], levelContainer[2].part[11].part[2], levelContainer[2].part[11].part[1]);
  levelContainer[2].part[11].part[0].rotation.z = -0.03;
  levelContainer[2].part[11].bodyTween = gsap.to(levelContainer[2].part[11].part[0].rotation, { duration: 0.5 + Math.random(), z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[11].add(levelContainer[2].part[11].part[0], levelContainer[2].part[11].part[5], levelContainer[2].part[11].part[8]);
  levelContainer[2].part[11].scale.set(-0.22, 0.22, 1);
  levelContainer[2].part[11].position.set(-160, -130, -8);
  levelContainer[2].part[11].hitTween1 = gsap.to(levelContainer[2].part[11].part[5].rotation, { duration: 0.5, z: 0.2, ease: "power3.out" });
  levelContainer[2].part[11].hitTween2 = gsap.to(levelContainer[2].part[11].part[7].rotation, { duration: 0.5, z: 1, ease: "power3.out", onComplete: function() {
    gsap.to(levelContainer[2].part[11].part[5].rotation, { duration: 0.3, z: -0.7, ease: "power2.in" });
    gsap.to(levelContainer[2].part[11].part[7].rotation, { duration: 0.3, z: 0, ease: "power2.in", onComplete: function() {
      gsap.to(levelContainer[2].part[11].part[5].rotation, { duration: 0.3, z: 0, ease: "power2.in" });
      if (!onGoal) {
        kickBall(195, 145);
      } else {
        goal();
      }
    } });
  } });
  levelContainer[2].part[12] = new THREE.Object3D();
  levelContainer[2].part[12].part = [];
  levelContainer[2].part[12].part[0] = new THREE.Object3D();
  levelContainer[2].part[12].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[288].map.image.width, pic[288].map.image.height), pic[288]);
  levelContainer[2].part[12].part[1].geometry.translate(0, pic[288].map.image.height * 0.4, 0);
  levelContainer[2].part[12].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[289].map.image.width, pic[289].map.image.height), pic[289]);
  levelContainer[2].part[12].part[2].geometry.translate(pic[289].map.image.width * 0.1, pic[289].map.image.height * 0.4, 0);
  levelContainer[2].part[12].part[2].position.set(-15, 205, 0.001);
  levelContainer[2].part[12].part[2].rotation.z = -0.03;
  levelContainer[2].part[12].headTween = gsap.to(levelContainer[2].part[12].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[12].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[275].map.image.width, pic[275].map.image.height), pic[275]);
  levelContainer[2].part[12].part[3].geometry.translate(-pic[290].map.image.width * 0.3, -pic[290].map.image.height * 0.4, 0);
  levelContainer[2].part[12].part[3].position.set(-60, 175, -0.02);
  levelContainer[2].part[12].handTween1 = gsap.to(levelContainer[2].part[12].part[3].rotation, { duration: 0.3 + Math.random() * 0.8, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[12].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[276].map.image.width, pic[276].map.image.height), pic[276]);
  levelContainer[2].part[12].part[4].geometry.translate(pic[276].map.image.width * 0.3, -pic[276].map.image.height * 0.4, 0);
  levelContainer[2].part[12].part[4].position.set(53, 180, 0.02);
  levelContainer[2].part[12].handTween2 = gsap.to(levelContainer[2].part[12].part[4].rotation, { duration: 0.3 + Math.random() * 0.8, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[12].part[5] = new THREE.Object3D();
  levelContainer[2].part[12].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[277].map.image.width, pic[277].map.image.height), pic[277]);
  levelContainer[2].part[12].part[6].geometry.translate(0, -pic[277].map.image.height * 0.4, 0);
  levelContainer[2].part[12].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[278].map.image.width, pic[278].map.image.height), pic[278]);
  levelContainer[2].part[12].part[7].geometry.translate(0, -pic[278].map.image.height * 0.4, 0);
  levelContainer[2].part[12].part[7].position.set(-10, -112, -0.001);
  levelContainer[2].part[12].part[5].add(levelContainer[2].part[12].part[6], levelContainer[2].part[12].part[7]);
  levelContainer[2].part[12].part[5].position.set(-40, 17, 0.01);
  levelContainer[2].part[12].part[8] = new THREE.Object3D();
  levelContainer[2].part[12].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[279].map.image.width, pic[279].map.image.height), pic[279]);
  levelContainer[2].part[12].part[9].geometry.translate(0, -pic[279].map.image.height * 0.4, 0);
  levelContainer[2].part[12].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[278].map.image.width, pic[278].map.image.height), pic[278]);
  levelContainer[2].part[12].part[10].geometry.translate(0, -pic[278].map.image.height * 0.4, 0);
  levelContainer[2].part[12].part[10].position.set(-12, -110, -0.001);
  levelContainer[2].part[12].part[8].add(levelContainer[2].part[12].part[9], levelContainer[2].part[12].part[10]);
  levelContainer[2].part[12].part[8].position.set(37, 16, 0.015);
  levelContainer[2].part[12].part[0].add(levelContainer[2].part[12].part[4], levelContainer[2].part[12].part[3], levelContainer[2].part[12].part[2], levelContainer[2].part[12].part[1]);
  levelContainer[2].part[12].part[0].rotation.z = -0.03;
  levelContainer[2].part[12].bodyTween = gsap.to(levelContainer[2].part[12].part[0].rotation, { duration: 0.5 + Math.random(), z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[12].add(levelContainer[2].part[12].part[0], levelContainer[2].part[12].part[5], levelContainer[2].part[12].part[8]);
  levelContainer[2].part[12].scale.set(0.22, 0.22, 1);
  levelContainer[2].part[12].position.set(240, -130, -12);
  levelContainer[2].part[12].hitTween1 = gsap.to(levelContainer[2].part[12].part[5].rotation, { duration: 0.5, z: 0.2, ease: "power3.out" });
  levelContainer[2].part[12].hitTween2 = gsap.to(levelContainer[2].part[12].part[7].rotation, { duration: 0.5, z: 1, ease: "power3.out", onComplete: function() {
    gsap.to(levelContainer[2].part[12].part[5].rotation, { duration: 0.3, z: -0.7, ease: "power2.in" });
    gsap.to(levelContainer[2].part[12].part[7].rotation, { duration: 0.3, z: 0, ease: "power2.in", onComplete: function() {
      gsap.to(levelContainer[2].part[12].part[5].rotation, { duration: 0.3, z: 0, ease: "power2.in" });
      if (!onGoal) {
        kickBall(-115, -65);
      } else {
        goal();
      }
    } });
  } });
  levelContainer[2].part[12].hitTween1.pause();
  levelContainer[2].part[12].hitTween2.pause();
  levelContainer[2].part[13] = new THREE.Object3D();
  levelContainer[2].part[13].part = [];
  levelContainer[2].part[13].part[0] = new THREE.Object3D();
  levelContainer[2].part[13].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[294].map.image.width, pic[294].map.image.height), pic[294]);
  levelContainer[2].part[13].part[1].geometry.translate(0, pic[294].map.image.height * 0.4, 0);
  levelContainer[2].part[13].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[295].map.image.width, pic[295].map.image.height), pic[295]);
  levelContainer[2].part[13].part[2].geometry.translate(pic[295].map.image.width * 0.1, pic[295].map.image.height * 0.4, 0);
  levelContainer[2].part[13].part[2].position.set(-15, 215, 0.001);
  levelContainer[2].part[13].part[2].rotation.z = -0.03;
  levelContainer[2].part[13].headTween = gsap.to(levelContainer[2].part[13].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[13].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[296].map.image.width, pic[296].map.image.height), pic[296]);
  levelContainer[2].part[13].part[3].geometry.translate(-pic[296].map.image.width * 0.3, -pic[296].map.image.height * 0.4, 0);
  levelContainer[2].part[13].part[3].position.set(-70, 187, -0.02);
  levelContainer[2].part[13].handTween1 = gsap.to(levelContainer[2].part[13].part[3].rotation, { duration: 0.3 + Math.random() * 0.7, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[13].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[297].map.image.width, pic[297].map.image.height), pic[297]);
  levelContainer[2].part[13].part[4].geometry.translate(pic[276].map.image.width * 0.1, -pic[297].map.image.height * 0.4, 0);
  levelContainer[2].part[13].part[4].position.set(65, 195, 0.02);
  levelContainer[2].part[13].handTween2 = gsap.to(levelContainer[2].part[13].part[4].rotation, { duration: 0.3 + Math.random() * 0.7, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[13].part[5] = new THREE.Object3D();
  levelContainer[2].part[13].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[298].map.image.width, pic[298].map.image.height), pic[298]);
  levelContainer[2].part[13].part[6].geometry.translate(0, -pic[298].map.image.height * 0.4, 0);
  levelContainer[2].part[13].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[300].map.image.width, pic[300].map.image.height), pic[300]);
  levelContainer[2].part[13].part[7].geometry.translate(0, -pic[300].map.image.height * 0.4, 0);
  levelContainer[2].part[13].part[7].position.set(-10, -112, -0.001);
  levelContainer[2].part[13].part[5].add(levelContainer[2].part[13].part[6], levelContainer[2].part[13].part[7]);
  levelContainer[2].part[13].part[5].position.set(-46, 20, 0.01);
  levelContainer[2].part[13].part[8] = new THREE.Object3D();
  levelContainer[2].part[13].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[299].map.image.width, pic[299].map.image.height), pic[299]);
  levelContainer[2].part[13].part[9].geometry.translate(0, -pic[299].map.image.height * 0.4, 0);
  levelContainer[2].part[13].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[300].map.image.width, pic[300].map.image.height), pic[300]);
  levelContainer[2].part[13].part[10].geometry.translate(0, -pic[300].map.image.height * 0.4, 0);
  levelContainer[2].part[13].part[10].position.set(-12, -110, -0.001);
  levelContainer[2].part[13].part[8].add(levelContainer[2].part[13].part[9], levelContainer[2].part[13].part[10]);
  levelContainer[2].part[13].part[8].position.set(40, 20, 0.015);
  levelContainer[2].part[13].part[0].add(levelContainer[2].part[13].part[4], levelContainer[2].part[13].part[3], levelContainer[2].part[13].part[2], levelContainer[2].part[13].part[1]);
  levelContainer[2].part[13].part[0].rotation.z = -0.03;
  levelContainer[2].part[13].bodyTween = gsap.to(levelContainer[2].part[13].part[0].rotation, { duration: 0.3 + Math.random() * 0.7, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[13].add(levelContainer[2].part[13].part[0], levelContainer[2].part[13].part[5], levelContainer[2].part[13].part[8]);
  levelContainer[2].part[13].scale.set(0.2, 0.2, 1);
  levelContainer[2].part[13].position.set(-90, -120, -9);
  levelContainer[2].part[13].jumpTween = function() {
    gsap.to([levelContainer[2].part[13].part[5].rotation, levelContainer[2].part[13].part[8].rotation], { duration: 0.1, z: -0.25, ease: "power1.out", repeat: 1, yoyo: true });
    gsap.to([levelContainer[2].part[13].part[7].rotation, levelContainer[2].part[13].part[10].rotation], { duration: 0.1, z: 0.5, ease: "power1.out", repeat: 1, yoyo: true });
    gsap.to(levelContainer[2].part[13].position, { duration: 0.1, y: levelContainer[2].part[13].position.y - 2, ease: "power1.in", onComplete: function() {
      gsap.to(levelContainer[2].part[13].position, { duration: 0.4, x: -115 + Math.random() * 50, ease: "none" });
      gsap.to(levelContainer[2].part[13].position, { duration: 0.2, y: levelContainer[2].part[13].position.y + 15, ease: "power1.out", onComplete: function() {
        gsap.to(levelContainer[2].part[13].position, { duration: 0.2, y: levelContainer[2].part[13].position.y - 13, ease: "power1.in", onComplete: function() {
          setTimeout(function() {
            if (!onHappy) levelContainer[2].part[13].jumpTween();
          }, Math.random() * 500);
        } });
      } });
    } });
  }
  levelContainer[2].part[13].jumpTween();
  levelContainer[2].part[14] = new THREE.Object3D();
  levelContainer[2].part[14].part = [];
  levelContainer[2].part[14].part[0] = new THREE.Object3D();
  levelContainer[2].part[14].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[301].map.image.width, pic[301].map.image.height), pic[301]);
  levelContainer[2].part[14].part[1].geometry.translate(0, pic[301].map.image.height * 0.4, 0);
  levelContainer[2].part[14].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[302].map.image.width, pic[302].map.image.height), pic[302]);
  levelContainer[2].part[14].part[2].scale.x = -1;
  levelContainer[2].part[14].part[2].geometry.translate(pic[302].map.image.width * 0.1, pic[302].map.image.height * 0.4, 0);
  levelContainer[2].part[14].part[2].position.set(10, 215, 0.001);
  levelContainer[2].part[14].part[2].rotation.z = -0.03;
  levelContainer[2].part[14].headTween = gsap.to(levelContainer[2].part[14].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[14].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[296].map.image.width, pic[296].map.image.height), pic[296]);
  levelContainer[2].part[14].part[3].geometry.translate(-pic[296].map.image.width * 0.3, -pic[296].map.image.height * 0.4, 0);
  levelContainer[2].part[14].part[3].position.set(-70, 187, -0.02);
  levelContainer[2].part[14].handTween1 = gsap.to(levelContainer[2].part[14].part[3].rotation, { duration: 0.3 + Math.random() * 0.7, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[14].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[297].map.image.width, pic[297].map.image.height), pic[297]);
  levelContainer[2].part[14].part[4].geometry.translate(pic[276].map.image.width * 0.1, -pic[297].map.image.height * 0.4, 0);
  levelContainer[2].part[14].part[4].position.set(65, 195, 0.02);
  levelContainer[2].part[14].handTween2 = gsap.to(levelContainer[2].part[14].part[4].rotation, { duration: 0.3 + Math.random() * 0.7, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[14].part[5] = new THREE.Object3D();
  levelContainer[2].part[14].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[298].map.image.width, pic[298].map.image.height), pic[298]);
  levelContainer[2].part[14].part[6].geometry.translate(0, -pic[298].map.image.height * 0.4, 0);
  levelContainer[2].part[14].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[300].map.image.width, pic[300].map.image.height), pic[300]);
  levelContainer[2].part[14].part[7].geometry.translate(0, -pic[300].map.image.height * 0.4, 0);
  levelContainer[2].part[14].part[7].position.set(-10, -112, -0.001);
  levelContainer[2].part[14].part[5].add(levelContainer[2].part[14].part[6], levelContainer[2].part[14].part[7]);
  levelContainer[2].part[14].part[5].position.set(-44, 20, 0.01);
  levelContainer[2].part[14].part[8] = new THREE.Object3D();
  levelContainer[2].part[14].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[299].map.image.width, pic[299].map.image.height), pic[299]);
  levelContainer[2].part[14].part[9].geometry.translate(0, -pic[299].map.image.height * 0.4, 0);
  levelContainer[2].part[14].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[300].map.image.width, pic[300].map.image.height), pic[300]);
  levelContainer[2].part[14].part[10].geometry.translate(0, -pic[300].map.image.height * 0.4, 0);
  levelContainer[2].part[14].part[10].position.set(-12, -110, -0.001);
  levelContainer[2].part[14].part[8].add(levelContainer[2].part[14].part[9], levelContainer[2].part[14].part[10]);
  levelContainer[2].part[14].part[8].position.set(42, 20, 0.015);
  levelContainer[2].part[14].part[0].add(levelContainer[2].part[14].part[4], levelContainer[2].part[14].part[3], levelContainer[2].part[14].part[2], levelContainer[2].part[14].part[1]);
  levelContainer[2].part[14].part[0].rotation.z = -0.03;
  levelContainer[2].part[14].bodyTween = gsap.to(levelContainer[2].part[14].part[0].rotation, { duration: 0.3 + Math.random() * 0.7, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[14].add(levelContainer[2].part[14].part[0], levelContainer[2].part[14].part[5], levelContainer[2].part[14].part[8]);
  levelContainer[2].part[14].scale.set(-0.2, 0.2, 1);
  levelContainer[2].part[14].position.set(110, -120, -11);
  levelContainer[2].part[14].jumpTween = function() {
    gsap.to([levelContainer[2].part[14].part[5].rotation, levelContainer[2].part[14].part[8].rotation], { duration: 0.1, z: -0.25, ease: "power1.out", repeat: 1, yoyo: true });
    gsap.to([levelContainer[2].part[14].part[7].rotation, levelContainer[2].part[14].part[10].rotation], { duration: 0.1, z: 0.5, ease: "power1.out", repeat: 1, yoyo: true });
    gsap.to(levelContainer[2].part[14].position, { duration: 0.1, y: levelContainer[2].part[14].position.y - 2, ease: "power1.in", onComplete: function() {
      gsap.to(levelContainer[2].part[14].position, { duration: 0.4, x: 85 + Math.random() * 50, ease: "none" });
      gsap.to(levelContainer[2].part[14].position, { duration: 0.2, y: levelContainer[2].part[14].position.y + 15, ease: "power1.out", onComplete: function() {
        gsap.to(levelContainer[2].part[14].position, { duration: 0.2, y: levelContainer[2].part[14].position.y - 13, ease: "power1.in", onComplete: function() {
          setTimeout(function() {
            if (!onHappy) levelContainer[2].part[14].jumpTween();
          }, Math.random() * 500);
        } });
      } });
    } });
  }
  levelContainer[2].part[14].jumpTween();
  levelContainer[2].part[15] = new THREE.Object3D();
  levelContainer[2].part[15].part = [];
  levelContainer[2].part[15].part[0] = new THREE.Object3D();
  levelContainer[2].part[15].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[53].map.image.width, pic[53].map.image.height), pic[53]);
  levelContainer[2].part[15].part[1].geometry.translate(0, pic[53].map.image.height * 0.4, 0);
  levelContainer[2].part[15].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[292].map.image.width, pic[292].map.image.height), pic[292]);
  levelContainer[2].part[15].part[2].geometry.translate(pic[292].map.image.width * 0.1, pic[292].map.image.height * 0.4, 0);
  levelContainer[2].part[15].part[2].position.set(-11, 205, 0.001);
  levelContainer[2].part[15].part[2].rotation.z = -0.03;
  levelContainer[2].part[15].headTween = gsap.to(levelContainer[2].part[15].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[15].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[275].map.image.width, pic[275].map.image.height), pic[275]);
  levelContainer[2].part[15].part[3].geometry.translate(-pic[275].map.image.width * 0.3, -pic[275].map.image.height * 0.4, 0);
  levelContainer[2].part[15].part[3].position.set(-60, 175, -0.02);
  levelContainer[2].part[15].part[3].rotation.z = -0.3;
  levelContainer[2].part[15].handTween1 = gsap.to(levelContainer[2].part[15].part[3].rotation, { duration: 0.5 + Math.random(), z: -1.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[15].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[275].map.image.width, pic[275].map.image.height), pic[275]);
  levelContainer[2].part[15].part[4].geometry.translate(-pic[275].map.image.width * 0.3, -pic[275].map.image.height * 0.4, 0);
  levelContainer[2].part[15].part[4].position.set(53, 183, 0.02);
  levelContainer[2].part[15].part[4].rotation.z = 0.3;
  levelContainer[2].part[15].part[4].scale.x = -1;
  levelContainer[2].part[15].handTween2 = gsap.to(levelContainer[2].part[15].part[4].rotation, { duration: 0.5 + Math.random(), z: 1.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[15].part[5] = new THREE.Object3D();
  levelContainer[2].part[15].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[277].map.image.width, pic[277].map.image.height), pic[277]);
  levelContainer[2].part[15].part[6].geometry.translate(0, -pic[277].map.image.height * 0.4, 0);
  levelContainer[2].part[15].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[278].map.image.width, pic[278].map.image.height), pic[278]);
  levelContainer[2].part[15].part[7].geometry.translate(0, -pic[278].map.image.height * 0.4, 0);
  levelContainer[2].part[15].part[7].position.set(-10, -112, -0.001);
  levelContainer[2].part[15].part[5].add(levelContainer[2].part[15].part[6], levelContainer[2].part[15].part[7]);
  levelContainer[2].part[15].part[5].position.set(-40, 17, 0.01);
  levelContainer[2].part[15].part[8] = new THREE.Object3D();
  levelContainer[2].part[15].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[279].map.image.width, pic[279].map.image.height), pic[279]);
  levelContainer[2].part[15].part[9].geometry.translate(0, -pic[279].map.image.height * 0.4, 0);
  levelContainer[2].part[15].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[278].map.image.width, pic[278].map.image.height), pic[278]);
  levelContainer[2].part[15].part[10].geometry.translate(0, -pic[278].map.image.height * 0.4, 0);
  levelContainer[2].part[15].part[10].position.set(-12, -110, -0.001);
  levelContainer[2].part[15].part[8].add(levelContainer[2].part[15].part[9], levelContainer[2].part[15].part[10]);
  levelContainer[2].part[15].part[8].position.set(37, 16, 0.015);
  levelContainer[2].part[15].part[0].add(levelContainer[2].part[15].part[4], levelContainer[2].part[15].part[3], levelContainer[2].part[15].part[2], levelContainer[2].part[15].part[1]);
  levelContainer[2].part[15].part[0].rotation.z = -0.03;
  levelContainer[2].part[15].bodyTween = gsap.to(levelContainer[2].part[15].part[0].rotation, { duration: 0.5 + Math.random(), z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[15].add(levelContainer[2].part[15].part[0], levelContainer[2].part[15].part[5], levelContainer[2].part[15].part[8]);
  levelContainer[2].part[15].scale.set(-0.16, 0.16, 1);
  levelContainer[2].part[15].position.set(40, -90, -12);
  levelContainer[2].part[15].jumpTween = function() {
    gsap.to([levelContainer[2].part[15].part[5].rotation, levelContainer[2].part[15].part[8].rotation], { duration: 0.2, z: -0.25, ease: "power1.out", repeat: 1, yoyo: true });
    gsap.to([levelContainer[2].part[15].part[7].rotation, levelContainer[2].part[15].part[10].rotation], { duration: 0.2, z: 0.5, ease: "power1.out", repeat: 1, yoyo: true });
    gsap.to(levelContainer[2].part[15].position, { duration: 0.25, y: levelContainer[2].part[15].position.y - 2, ease: "power1.in", onComplete: function() {
      gsap.to(levelContainer[2].part[15].position, { duration: 0.6, x: 20 + Math.random() * 40, ease: "none" });
      gsap.to(levelContainer[2].part[15].position, { duration: 0.3, y: levelContainer[2].part[15].position.y + 20, ease: "power1.out", onComplete: function() {
        gsap.to(levelContainer[2].part[15].position, { duration: 0.3, y: levelContainer[2].part[15].position.y - 18, ease: "power1.in", onComplete: function() {
          setTimeout(function() {
            if (!onGoal) levelContainer[2].part[15].jumpTween();
          }, Math.random() * 1000);
        } });
      } });
    } });
  }
  levelContainer[2].part[15].jumpTween();
  levelContainer[2].part[16] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[280].map.image.width * 0.09, pic[280].map.image.height * 0.09), pic[280]);
  levelContainer[2].part[16].position.set(-115, -150, -8);
  levelContainer[2].part[17] = new THREE.Object3D();
  levelContainer[2].part[17].part = [];
  levelContainer[2].part[17].part[0] = new THREE.Object3D();
  levelContainer[2].part[17].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[281].map.image.width, pic[281].map.image.height), pic[281]);
  levelContainer[2].part[17].part[1].geometry.translate(0, pic[281].map.image.height * 0.4, 0);
  levelContainer[2].part[17].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[282].map.image.width, pic[282].map.image.height), pic[282]);
  levelContainer[2].part[17].part[2].geometry.translate(pic[282].map.image.width * 0.1, pic[282].map.image.height * 0.4, 0);
  levelContainer[2].part[17].part[2].position.set(-15, 185, -0.001);
  levelContainer[2].part[17].part[2].rotation.z = -0.03;
  levelContainer[2].part[17].headTween = gsap.to(levelContainer[2].part[17].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[17].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[283].map.image.width, pic[283].map.image.height), pic[283]);
  levelContainer[2].part[17].part[3].geometry.translate(-pic[283].map.image.width * 0.15, -pic[283].map.image.height * 0.4, 0);
  levelContainer[2].part[17].part[3].position.set(-78, 161, 0.02);
  levelContainer[2].part[17].handTween1 = gsap.to(levelContainer[2].part[17].part[3].rotation, { duration: 0.3 + Math.random() * 0.8, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[17].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[284].map.image.width, pic[284].map.image.height), pic[284]);
  levelContainer[2].part[17].part[4].geometry.translate(pic[276].map.image.width * 0.2, -pic[284].map.image.height * 0.4, 0);
  levelContainer[2].part[17].part[4].position.set(55, 170, -0.02);
  levelContainer[2].part[17].handTween2 = gsap.to(levelContainer[2].part[17].part[4].rotation, { duration: 0.3 + Math.random() * 0.8, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[17].part[5] = new THREE.Object3D();
  levelContainer[2].part[17].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[285].map.image.width, pic[285].map.image.height), pic[285]);
  levelContainer[2].part[17].part[6].geometry.translate(0, -pic[285].map.image.height * 0.4, 0);
  levelContainer[2].part[17].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[287].map.image.width, pic[287].map.image.height), pic[287]);
  levelContainer[2].part[17].part[7].geometry.translate(0, -pic[287].map.image.height * 0.35, 0);
  levelContainer[2].part[17].part[7].position.set(-10, -105, -0.001);
  levelContainer[2].part[17].part[5].add(levelContainer[2].part[17].part[6], levelContainer[2].part[17].part[7]);
  levelContainer[2].part[17].part[5].position.set(-42, 18, 0.015);
  levelContainer[2].part[17].part[8] = new THREE.Object3D();
  levelContainer[2].part[17].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[286].map.image.width, pic[286].map.image.height), pic[286]);
  levelContainer[2].part[17].part[9].geometry.translate(0, -pic[286].map.image.height * 0.4, 0);
  levelContainer[2].part[17].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[287].map.image.width, pic[287].map.image.height), pic[287]);
  levelContainer[2].part[17].part[10].geometry.translate(0, -pic[287].map.image.height * 0.35, 0);
  levelContainer[2].part[17].part[10].position.set(-12, -105, -0.001);
  levelContainer[2].part[17].part[8].add(levelContainer[2].part[17].part[9], levelContainer[2].part[17].part[10]);
  levelContainer[2].part[17].part[8].position.set(35, 20, 0.01);
  levelContainer[2].part[17].part[8].rotation.z = 0.4;
  levelContainer[2].part[17].part[0].add(levelContainer[2].part[17].part[4], levelContainer[2].part[17].part[3], levelContainer[2].part[17].part[2], levelContainer[2].part[17].part[1]);
  levelContainer[2].part[17].part[0].rotation.z = -0.03;
  levelContainer[2].part[17].bodyTween = gsap.to(levelContainer[2].part[17].part[0].rotation, { duration: 0.5 + Math.random(), z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[2].part[17].add(levelContainer[2].part[17].part[0], levelContainer[2].part[17].part[5], levelContainer[2].part[17].part[8]);
  levelContainer[2].part[17].scale.set(0.4, 0.4, 1);
  levelContainer[2].part[17].position.set(350, -250, -10);
  levelContainer[2].part[18] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[308].map.image.width * 0.4, pic[308].map.image.height * 0.4), pic[308]);
  levelContainer[2].part[18].geometry.translate(pic[308].map.image.width * 0.15, pic[308].map.image.height * 0.2, 0);
  levelContainer[2].part[18].position.set(15, 200, -2.001);
  levelContainer[2].part[18].scale.set(0, 0, 1);
  levelContainer[2].part[19] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[303].map.image.width * 0.4, pic[303].map.image.height * 0.4), pic[303]);
  levelContainer[2].part[19].geometry.translate(pic[303].map.image.width * 0.15, pic[303].map.image.height * 0.2, 0);
  levelContainer[2].part[19].position.set(50, 150, -2);
  levelContainer[2].part[19].scale.set(0, 0, 1);
  levelContainer[2].part[20] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[304].map.image.width * 0.4, pic[304].map.image.height * 0.4), pic[304]);
  levelContainer[2].part[20].geometry.translate(-pic[304].map.image.width * 0.15, pic[304].map.image.height * 0.2, 0);
  levelContainer[2].part[20].position.set(175, 30, -2);
  levelContainer[2].part[20].scale.set(0, 0, 1);
  levelContainer[2].part[21] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[305].map.image.width * 0.4, pic[305].map.image.height * 0.4), pic[305]);
  levelContainer[2].part[21].geometry.translate(-pic[305].map.image.width * 0.15, pic[305].map.image.height * 0.2, 0);
  levelContainer[2].part[21].position.set(130, -20, -2.001);
  levelContainer[2].part[21].scale.set(0, 0, 1);
  levelContainer[2].part[22] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[306].map.image.width * 0.4, pic[306].map.image.height * 0.4), pic[306]);
  levelContainer[2].part[22].geometry.translate(-pic[306].map.image.width * 0.15, pic[306].map.image.height * 0.2, 0);
  levelContainer[2].part[22].position.set(-95, -140, -2);
  levelContainer[2].part[22].scale.set(0, 0, 1);
  levelContainer[2].part[23] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[307].map.image.width * 0.4, pic[307].map.image.height * 0.4), pic[307]);
  levelContainer[2].part[23].geometry.translate(pic[307].map.image.width * 0.15, -pic[307].map.image.height * 0.2, 0);
  levelContainer[2].part[23].position.set(-190, -195, -1.5);
  levelContainer[2].part[23].scale.set(0, 0, 1);
  levelScene[2].part[0] = new THREE.Object3D();
  levelScene[2].part[0].back = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[79].map.image.width, pic[79].map.image.height), pic[79]);
  levelScene[2].part[0].button = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[61].map.image.width, pic[61].map.image.height), pic[61]);
  levelScene[2].part[0].button.position.set(-10, -135, 0.001);
  levelScene[2].part[0].add(levelScene[2].part[0].button, levelScene[2].part[0].back);
  //levelScene[2].part[0].back.position.set(-pic[78].map.image.width * 0.3, pic[78].map.image.height * 0.5, 0);
  levelScene[2].part[0].position.set(0, -110, 1);
  levelScene[2].part[0].scale.set(0, 0, 1);
  levelScene[2].part[0].button.ready = false;
  levelScene[2].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[82].map.image.width * 0.192, pic[82].map.image.height * 0.192), pic[82]);
  levelScene[2].part[1].position.set(0, -55, 1);
  levelScene[2].part[1].scale.set(0, 0, 1);
  levelScene[2].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[86].map.image.width * 0.192, pic[86].map.image.height * 0.192), pic[86]);
  levelScene[2].part[2].position.set(-44, -95, 1);
  levelScene[2].part[2].scale.set(0, 0, 1);
  levelScene[2].part[2].ready = false;
  levelScene[2].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[87].map.image.width * 0.192, pic[87].map.image.height * 0.192), pic[87]);
  levelScene[2].part[3].position.set(44, -95, 1);
  levelScene[2].part[3].scale.set(0, 0, 1);
  levelScene[2].part[3].ready = false;

  


  levelContainer[3].part[0] = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 498 / pic[54].map.image.width * pic[54].map.image.height), pic[54]);
  levelContainer[3].part[0].position.set(-1, 0, -19);
  levelContainer[3].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 498 / pic[309].map.image.width * pic[309].map.image.height), pic[309]);
  levelContainer[3].part[1].position.set(0, 0, -1);
  levelContainer[3].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[310].map.image.width * 0.657, pic[310].map.image.height * 0.657), pic[310]);
  levelContainer[3].part[2].position.set(-3, 99, -15);
  levelContainer[3].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[0].image.width , tex[0].image.height), new THREE.MeshBasicMaterial({ map: tex[0], transparent: true }));
  levelContainer[3].part[3].scale.set(-0.3, 0.3, 1);
  levelContainer[3].part[3].position.set(-225, 147, -18);
  gsap.to(levelContainer[3].part[3].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[1].image.width , tex[1].image.height), new THREE.MeshBasicMaterial({ map: tex[1], transparent: true }));
  levelContainer[3].part[4].scale.set(-0.3, 0.3, 1);
  levelContainer[3].part[4].position.set(-130, 10, -14.5);
  gsap.to(levelContainer[3].part[4].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[5].scale.set(-0.3, 0.3, 1);
  levelContainer[3].part[5].position.set(-185, 140, -18);
  gsap.to(levelContainer[3].part[5].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[6].image.width , tex[6].image.height), new THREE.MeshBasicMaterial({ map: tex[6], transparent: true }));
  levelContainer[3].part[6].scale.set(-0.3, 0.3, 1);
  levelContainer[3].part[6].position.set(-130, 115, -18);
  gsap.to(levelContainer[3].part[6].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  gsap.to(levelContainer[3].part[6].position, { duration: 0.1 + Math.random() * 0.1, x: -132, ease: "none", repeat: -1, yoyo: true });
  gsap.to(levelContainer[3].part[6].position, { duration: 0.1 + Math.random() * 0.1, y: 117, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[5].image.width , tex[5].image.height), new THREE.MeshBasicMaterial({ map: tex[5], transparent: true }));
  levelContainer[3].part[7].scale.set(-0.3, 0.3, 1);
  levelContainer[3].part[7].position.set(-90, 10, -14.5);
  gsap.to(levelContainer[3].part[7].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[2].image.width , tex[2].image.height), new THREE.MeshBasicMaterial({ map: tex[2], transparent: true }));
  levelContainer[3].part[8].scale.set(-0.3, 0.3, 1);
  levelContainer[3].part[8].position.set(-50, 3, -14.5);
  gsap.to(levelContainer[3].part[8].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[5].image.width , tex[5].image.height), new THREE.MeshBasicMaterial({ map: tex[5], transparent: true }));
  levelContainer[3].part[9].scale.set(-0.25, 0.25, 1);
  levelContainer[3].part[9].position.set(-130, 40, -14.6);
  gsap.to(levelContainer[3].part[9].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[2].image.width , tex[2].image.height), new THREE.MeshBasicMaterial({ map: tex[2], transparent: true }));
  levelContainer[3].part[10].scale.set(-0.2, 0.2, 1);
  levelContainer[3].part[10].position.set(-100, 40, -14.6);
  gsap.to(levelContainer[3].part[10].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[11] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[11].scale.set(0.4, 0.4, 1);
  levelContainer[3].part[11].position.set(220, 95, -14.5);
  gsap.to(levelContainer[3].part[11].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[12] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[3].image.width , tex[3].image.height), new THREE.MeshBasicMaterial({ map: tex[3], transparent: true }));
  levelContainer[3].part[12].scale.set(0.39, 0.39, 1);
  levelContainer[3].part[12].position.set(160, 85, -14.5);
  gsap.to(levelContainer[3].part[12].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[13] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[1].image.width , tex[1].image.height), new THREE.MeshBasicMaterial({ map: tex[1], transparent: true }));
  levelContainer[3].part[13].scale.set(0.38, 0.38, 1);
  levelContainer[3].part[13].position.set(105, 75, -14.5);
  gsap.to(levelContainer[3].part[13].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[14] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[5].image.width , tex[5].image.height), new THREE.MeshBasicMaterial({ map: tex[5], transparent: true }));
  levelContainer[3].part[14].scale.set(0.37, 0.37, 1);
  levelContainer[3].part[14].position.set(55, 65, -14.5);
  gsap.to(levelContainer[3].part[14].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[15] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[2].image.width , tex[2].image.height), new THREE.MeshBasicMaterial({ map: tex[2], transparent: true }));
  levelContainer[3].part[15].scale.set(0.36, 0.36, 1);
  levelContainer[3].part[15].position.set(10, 60, -14.5);
  gsap.to(levelContainer[3].part[15].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[16] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[16].scale.set(0.28, 0.28, 1);
  levelContainer[3].part[16].position.set(230, 130, -14.5);
  gsap.to(levelContainer[3].part[16].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[17] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[3].image.width , tex[3].image.height), new THREE.MeshBasicMaterial({ map: tex[3], transparent: true }));
  levelContainer[3].part[17].scale.set(0.27, 0.27, 1);
  levelContainer[3].part[17].position.set(190, 125, -14.5);
  gsap.to(levelContainer[3].part[17].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[18] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[1].image.width , tex[1].image.height), new THREE.MeshBasicMaterial({ map: tex[1], transparent: true }));
  levelContainer[3].part[18].scale.set(0.26, 0.26, 1);
  levelContainer[3].part[18].position.set(150, 115, -14.5);
  gsap.to(levelContainer[3].part[18].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[19] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[5].image.width , tex[5].image.height), new THREE.MeshBasicMaterial({ map: tex[5], transparent: true }));
  levelContainer[3].part[19].scale.set(0.25, 0.25, 1);
  levelContainer[3].part[19].position.set(110, 105, -14.5);
  gsap.to(levelContainer[3].part[19].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[20] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[2].image.width , tex[2].image.height), new THREE.MeshBasicMaterial({ map: tex[2], transparent: true }));
  levelContainer[3].part[20].scale.set(0.24, 0.24, 1);
  levelContainer[3].part[20].position.set(75, 90, -14.5);
  gsap.to(levelContainer[3].part[20].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[21] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[3].image.width , tex[3].image.height), new THREE.MeshBasicMaterial({ map: tex[3], transparent: true }));
  levelContainer[3].part[21].scale.set(0.25, 0.25, 1);
  levelContainer[3].part[21].position.set(225, 265, -14.5);
  gsap.to(levelContainer[3].part[21].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[22] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[5].image.width , tex[5].image.height), new THREE.MeshBasicMaterial({ map: tex[5], transparent: true }));
  levelContainer[3].part[22].scale.set(0.24, 0.24, 1);
  levelContainer[3].part[22].position.set(190, 250, -14.5);
  gsap.to(levelContainer[3].part[22].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[23] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[2].image.width , tex[2].image.height), new THREE.MeshBasicMaterial({ map: tex[2], transparent: true }));
  levelContainer[3].part[23].scale.set(0.23, 0.23, 1);
  levelContainer[3].part[23].position.set(160, 240, -14.5);
  gsap.to(levelContainer[3].part[23].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[24] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[3].image.width , tex[3].image.height), new THREE.MeshBasicMaterial({ map: tex[3], transparent: true }));
  levelContainer[3].part[24].scale.set(-0.2, 0.22, 1);
  levelContainer[3].part[24].position.set(125, 230, -18.5);
  gsap.to(levelContainer[3].part[24].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[25] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[2].image.width , tex[2].image.height), new THREE.MeshBasicMaterial({ map: tex[2], transparent: true }));
  levelContainer[3].part[25].scale.set(-0.2, 0.2, 1);
  levelContainer[3].part[25].position.set(100, 230, -18.5);
  gsap.to(levelContainer[3].part[25].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[26] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[5].image.width , tex[5].image.height), new THREE.MeshBasicMaterial({ map: tex[5], transparent: true }));
  levelContainer[3].part[26].scale.set(-0.2, 0.2, 1);
  levelContainer[3].part[26].position.set(75, 235, -18.5);
  gsap.to(levelContainer[3].part[26].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[27] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[5].image.width , tex[5].image.height), new THREE.MeshBasicMaterial({ map: tex[5], transparent: true }));
  levelContainer[3].part[27].scale.set(0.2, 0.2, 1);
  levelContainer[3].part[27].position.set(50, 235, -18.5);
  gsap.to(levelContainer[3].part[27].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[28] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[2].image.width , tex[2].image.height), new THREE.MeshBasicMaterial({ map: tex[2], transparent: true }));
  levelContainer[3].part[28].scale.set(0.2, 0.2, 1);
  levelContainer[3].part[28].position.set(25, 230, -18.5);
  gsap.to(levelContainer[3].part[28].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[29] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[1].image.width , tex[1].image.height), new THREE.MeshBasicMaterial({ map: tex[1], transparent: true }));
  levelContainer[3].part[29].scale.set(-0.2, 0.2, 1);
  levelContainer[3].part[29].position.set(5, 260, -18.5);
  gsap.to(levelContainer[3].part[29].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[30] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[3].image.width , tex[3].image.height), new THREE.MeshBasicMaterial({ map: tex[3], transparent: true }));
  levelContainer[3].part[30].scale.set(-0.2, 0.2, 1);
  levelContainer[3].part[30].position.set(-25, 265, -18.5);
  gsap.to(levelContainer[3].part[30].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[31] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[31].scale.set(-0.2, 0.2, 1);
  levelContainer[3].part[31].position.set(-55, 270, -18.5);
  gsap.to(levelContainer[3].part[31].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[32] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[1].image.width , tex[1].image.height), new THREE.MeshBasicMaterial({ map: tex[1], transparent: true }));
  levelContainer[3].part[32].scale.set(-0.15, 0.15, 1);
  levelContainer[3].part[32].position.set(-75, 305, -18.5);
  gsap.to(levelContainer[3].part[32].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[33] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[3].image.width , tex[3].image.height), new THREE.MeshBasicMaterial({ map: tex[3], transparent: true }));
  levelContainer[3].part[33].scale.set(-0.15, 0.15, 1);
  levelContainer[3].part[33].position.set(-95, 310, -18.5);
  gsap.to(levelContainer[3].part[33].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[34] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[34].scale.set(-0.15, 0.15, 1);
  levelContainer[3].part[34].position.set(-115, 315, -18.5);
  gsap.to(levelContainer[3].part[34].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[35] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[1].image.width , tex[1].image.height), new THREE.MeshBasicMaterial({ map: tex[1], transparent: true }));
  levelContainer[3].part[35].scale.set(-0.15, 0.15, 1);
  levelContainer[3].part[35].position.set(-10, 300, -18.5);
  gsap.to(levelContainer[3].part[35].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[36] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[3].image.width , tex[3].image.height), new THREE.MeshBasicMaterial({ map: tex[3], transparent: true }));
  levelContainer[3].part[36].scale.set(-0.15, 0.15, 1);
  levelContainer[3].part[36].position.set(-30, 305, -18.5);
  gsap.to(levelContainer[3].part[36].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[37] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[37].scale.set(-0.15, 0.15, 1);
  levelContainer[3].part[37].position.set(-50, 310, -18.5);
  gsap.to(levelContainer[3].part[37].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[38] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[1].image.width , tex[1].image.height), new THREE.MeshBasicMaterial({ map: tex[1], transparent: true }));
  levelContainer[3].part[38].scale.set(-0.15, 0.15, 1);
  levelContainer[3].part[38].position.set(55, 305, -18.5);
  gsap.to(levelContainer[3].part[38].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[39] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[3].image.width , tex[3].image.height), new THREE.MeshBasicMaterial({ map: tex[3], transparent: true }));
  levelContainer[3].part[39].scale.set(-0.15, 0.15, 1);
  levelContainer[3].part[39].position.set(35, 310, -18.5);
  gsap.to(levelContainer[3].part[39].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[40] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[40].scale.set(-0.15, 0.15, 1);
  levelContainer[3].part[40].position.set(15, 315, -18.5);
  gsap.to(levelContainer[3].part[40].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[41] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[1].image.width , tex[1].image.height), new THREE.MeshBasicMaterial({ map: tex[1], transparent: true }));
  levelContainer[3].part[41].scale.set(-0.17, 0.17, 1);
  levelContainer[3].part[41].position.set(70, 265, -18.5);
  gsap.to(levelContainer[3].part[41].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[42] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[3].image.width , tex[3].image.height), new THREE.MeshBasicMaterial({ map: tex[3], transparent: true }));
  levelContainer[3].part[42].scale.set(-0.17, 0.17, 1);
  levelContainer[3].part[42].position.set(50, 275, -18.5);
  gsap.to(levelContainer[3].part[42].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[43] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[43].scale.set(-0.17, 0.17, 1);
  levelContainer[3].part[43].position.set(25, 285, -18.5);
  gsap.to(levelContainer[3].part[43].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[44] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[1].image.width , tex[1].image.height), new THREE.MeshBasicMaterial({ map: tex[1], transparent: true }));
  levelContainer[3].part[44].scale.set(0.15, 0.15, 1);
  levelContainer[3].part[44].position.set(78, 309, -18.5);
  gsap.to(levelContainer[3].part[44].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[45] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[3].image.width , tex[3].image.height), new THREE.MeshBasicMaterial({ map: tex[3], transparent: true }));
  levelContainer[3].part[45].scale.set(0.15, 0.15, 1);
  levelContainer[3].part[45].position.set(99, 315, -18.5);
  gsap.to(levelContainer[3].part[45].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[46] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[46].scale.set(0.15, 0.15, 1);
  levelContainer[3].part[46].position.set(115, 305, -18.5);
  gsap.to(levelContainer[3].part[46].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[47] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[47].scale.set(0.15, 0.15, 1);
  levelContainer[3].part[47].position.set(97, 255, -18.5);
  gsap.to(levelContainer[3].part[47].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[48] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[0].image.width , tex[0].image.height), new THREE.MeshBasicMaterial({ map: tex[0], transparent: true }));
  levelContainer[3].part[48].scale.set(0.15, 0.15, 1);
  levelContainer[3].part[48].position.set(115, 265, -18.5);
  gsap.to(levelContainer[3].part[48].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[49] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[4].image.width , tex[4].image.height), new THREE.MeshBasicMaterial({ map: tex[4], transparent: true }));
  levelContainer[3].part[49].scale.set(0.24, 0.24, 1);
  levelContainer[3].part[49].position.set(145, 335, -18.5);
  gsap.to(levelContainer[3].part[49].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  levelContainer[3].part[50] = new THREE.Mesh(new THREE.PlaneBufferGeometry(tex[0].image.width , tex[0].image.height), new THREE.MeshBasicMaterial({ map: tex[0], transparent: true }));
  levelContainer[3].part[50].scale.set(0.24, 0.24, 1);
  levelContainer[3].part[50].position.set(175, 350, -18.5);
  gsap.to(levelContainer[3].part[50].material, { duration: 0.05 + Math.random() * 0.05, opacity: 0.8, ease: "none", repeat: -1, yoyo: true });
  
  levelContainer[3].part[51] = new THREE.Object3D();
  levelContainer[3].part[51].part = [];
  levelContainer[3].part[51].part[0] = new THREE.Object3D();
  levelContainer[3].part[51].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[311].map.image.width, pic[311].map.image.height), pic[311]);
  levelContainer[3].part[51].part[1].geometry.translate(0, pic[311].map.image.height * 0.4, 0);
  levelContainer[3].part[51].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[312].map.image.width, pic[312].map.image.height), pic[312]);
  levelContainer[3].part[51].part[2].geometry.translate(pic[312].map.image.width * 0.1, pic[312].map.image.height * 0.4, 0);
  levelContainer[3].part[51].part[2].position.set(-10, 200, 0.001);
  levelContainer[3].part[51].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[51].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[51].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[313].map.image.width, pic[313].map.image.height), pic[313]);
  levelContainer[3].part[51].part[3].geometry.translate(-pic[313].map.image.width * 0.4, -pic[313].map.image.height * 0.4, 0);
  levelContainer[3].part[51].part[3].position.set(-60, 152, -0.001);
  gsap.to(levelContainer[3].part[51].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[51].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[314].map.image.width, pic[314].map.image.height), pic[314]);
  levelContainer[3].part[51].part[4].geometry.translate(pic[314].map.image.width * 0.1, -pic[314].map.image.height * 0.4, 0);
  levelContainer[3].part[51].part[4].position.set(80, 170, 0.001);
  gsap.to(levelContainer[3].part[51].part[4].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[51].part[0].add(levelContainer[3].part[51].part[4], levelContainer[3].part[51].part[3], levelContainer[3].part[51].part[2], levelContainer[3].part[51].part[1]);
  levelContainer[3].part[51].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[51].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[51].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[315].map.image.width, pic[315].map.image.height), pic[315]);
  levelContainer[3].part[51].part[5].position.set(13, -120, -0.001);
  levelContainer[3].part[51].add(levelContainer[3].part[51].part[0], levelContainer[3].part[51].part[5]);
  levelContainer[3].part[51].scale.set(0.175, 0.175, 1);
  levelContainer[3].part[51].position.set(-85, 85, -17);


  levelContainer[3].part[52] = new THREE.Object3D();
  levelContainer[3].part[52].part = [];
  levelContainer[3].part[52].part[0] = new THREE.Object3D();
  levelContainer[3].part[52].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[316].map.image.width, pic[316].map.image.height), pic[316]);
  levelContainer[3].part[52].part[1].geometry.translate(0, pic[316].map.image.height * 0.4, 0);
  levelContainer[3].part[52].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[317].map.image.width, pic[317].map.image.height), pic[317]);
  levelContainer[3].part[52].part[2].geometry.translate(pic[317].map.image.width * 0.1, pic[317].map.image.height * 0.4, 0);
  levelContainer[3].part[52].part[2].position.set(-10, 200, 0.001);
  levelContainer[3].part[52].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[52].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[52].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[318].map.image.width, pic[318].map.image.height), pic[318]);
  levelContainer[3].part[52].part[3].geometry.translate(-pic[318].map.image.width * 0.4, -pic[318].map.image.height * 0.4, 0);
  levelContainer[3].part[52].part[3].position.set(-40, 158, -0.001);
  gsap.to(levelContainer[3].part[52].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[52].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[319].map.image.width, pic[319].map.image.height), pic[319]);
  levelContainer[3].part[52].part[4].geometry.translate(pic[319].map.image.width * 0.1, -pic[319].map.image.height * 0.4, 0);
  levelContainer[3].part[52].part[4].position.set(70, 160, 0.001);
  gsap.to(levelContainer[3].part[52].part[4].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[52].part[0].add(levelContainer[3].part[52].part[4], levelContainer[3].part[52].part[3], levelContainer[3].part[52].part[2], levelContainer[3].part[52].part[1]);
  levelContainer[3].part[52].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[52].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[52].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[320].map.image.width, pic[320].map.image.height), pic[320]);
  levelContainer[3].part[52].part[5].position.set(0, -100, -0.001);
  levelContainer[3].part[52].add(levelContainer[3].part[52].part[0], levelContainer[3].part[52].part[5]);
  levelContainer[3].part[52].scale.set(0.18, 0.18, 1);
  levelContainer[3].part[52].position.set(45, 180, -17);


  levelContainer[3].part[53] = new THREE.Object3D();
  levelContainer[3].part[53].part = [];
  levelContainer[3].part[53].part[0] = new THREE.Object3D();
  levelContainer[3].part[53].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[321].map.image.width, pic[321].map.image.height), pic[321]);
  levelContainer[3].part[53].part[1].geometry.translate(0, pic[321].map.image.height * 0.4, 0);
  levelContainer[3].part[53].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[322].map.image.width, pic[322].map.image.height), pic[322]);
  levelContainer[3].part[53].part[2].geometry.translate(pic[322].map.image.width * 0.1, pic[322].map.image.height * 0.4, 0);
  levelContainer[3].part[53].part[2].position.set(-10, 210, 0.001);
  levelContainer[3].part[53].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[53].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[53].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[323].map.image.width, pic[323].map.image.height), pic[323]);
  levelContainer[3].part[53].part[3].geometry.translate(-pic[323].map.image.width * 0.4, -pic[323].map.image.height * 0.4, 0);
  levelContainer[3].part[53].part[3].position.set(-80, 170, -0.001);
  gsap.to(levelContainer[3].part[53].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[53].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[324].map.image.width, pic[324].map.image.height), pic[324]);
  levelContainer[3].part[53].part[4].geometry.translate(pic[324].map.image.width * 0.1, -pic[324].map.image.height * 0.4, 0);
  levelContainer[3].part[53].part[4].position.set(80, 175, 0.001);
  gsap.to(levelContainer[3].part[53].part[4].rotation, { duration: 1 + Math.random() * 2, z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[53].part[0].add(levelContainer[3].part[53].part[4], levelContainer[3].part[53].part[3], levelContainer[3].part[53].part[2], levelContainer[3].part[53].part[1]);
  levelContainer[3].part[53].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[53].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[53].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[325].map.image.width, pic[325].map.image.height), pic[325]);
  levelContainer[3].part[53].part[5].position.set(-8, -110, -0.001);
  levelContainer[3].part[53].add(levelContainer[3].part[53].part[0], levelContainer[3].part[53].part[5]);
  levelContainer[3].part[53].scale.set(0.18, 0.18, 1);
  levelContainer[3].part[53].position.set(90, 185, -17);


  levelContainer[3].part[54] = new THREE.Mesh(new THREE.PlaneBufferGeometry(498, 498 / pic[326].map.image.width * pic[326].map.image.height), pic[326]);
  levelContainer[3].part[54].position.set(0, -285, -5);


  levelContainer[3].part[55] = new THREE.Object3D();
  levelContainer[3].part[55].part = [];
  levelContainer[3].part[55].part[0] = new THREE.Object3D();
  levelContainer[3].part[55].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[327].map.image.width, pic[327].map.image.height), pic[327]);
  levelContainer[3].part[55].part[1].geometry.translate(0, pic[327].map.image.height * 0.4, 0);
  levelContainer[3].part[55].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[328].map.image.width, pic[328].map.image.height), pic[328]);
  levelContainer[3].part[55].part[2].geometry.translate(pic[328].map.image.width * 0.1, pic[328].map.image.height * 0.4, 0);
  levelContainer[3].part[55].part[2].position.set(-10, 200, 0.001);
  levelContainer[3].part[55].part[2].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[55].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[55].part[3] = new THREE.Object3D();
  levelContainer[3].part[55].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[329].map.image.width, pic[329].map.image.height), pic[329]);
  levelContainer[3].part[55].part[4].geometry.translate(-pic[329].map.image.width * 0.1, -pic[329].map.image.height * 0.4, 0);
  levelContainer[3].part[55].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[330].map.image.width, pic[330].map.image.height), pic[330]);
  levelContainer[3].part[55].part[5].geometry.translate(-pic[330].map.image.width * 0.4, -pic[330].map.image.height * 0.4, 0);
  levelContainer[3].part[55].part[5].position.set(-5, -75, 0.001);
  levelContainer[3].part[55].part[3].add(levelContainer[3].part[55].part[4], levelContainer[3].part[55].part[5]);
  levelContainer[3].part[55].part[3].position.set(-65, 175, -0.02);
  levelContainer[3].part[55].handTween1 = gsap.to(levelContainer[3].part[55].part[3].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[3].part[55].handTween2 = gsap.to(levelContainer[3].part[55].part[5].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[3].part[55].part[6] = new THREE.Object3D();
  levelContainer[3].part[55].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[331].map.image.width, pic[331].map.image.height), pic[331]);
  levelContainer[3].part[55].part[7].geometry.translate(pic[331].map.image.width * 0.2, -pic[331].map.image.height * 0.4, 0);
  levelContainer[3].part[55].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[332].map.image.width, pic[332].map.image.height), pic[332]);
  levelContainer[3].part[55].part[8].geometry.translate(-pic[332].map.image.width * 0.3, -pic[332].map.image.height * 0.4, 0);
  levelContainer[3].part[55].part[8].position.set(30, -80, 0.001);
  levelContainer[3].part[55].part[8].rotation.z = -0.5;
  levelContainer[3].part[55].handTween3 = gsap.to(levelContainer[3].part[55].part[6].rotation, { duration: 0.3, z: 0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[55].handTween4 = gsap.to(levelContainer[3].part[55].part[8].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[55].part[6].add(levelContainer[3].part[55].part[7], levelContainer[3].part[55].part[8]);
  levelContainer[3].part[55].part[6].position.set(65, 185, 0.01);
  levelContainer[3].part[55].part[6].rotation.z = 0;
  levelContainer[3].part[55].part[9] = new THREE.Object3D();
  levelContainer[3].part[55].part[10] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[333].map.image.width, pic[333].map.image.height), pic[333]);
  levelContainer[3].part[55].part[10].geometry.translate(0, -pic[333].map.image.height * 0.4, 0);
  levelContainer[3].part[55].part[11] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[334].map.image.width, pic[334].map.image.height), pic[334]);
  levelContainer[3].part[55].part[11].geometry.translate(-pic[334].map.image.width * 0.2, -pic[334].map.image.height * 0.3, 0);
  levelContainer[3].part[55].part[11].position.set(7, -80, -0.001);
  levelContainer[3].part[55].part[9].add(levelContainer[3].part[55].part[10], levelContainer[3].part[55].part[11]);
  levelContainer[3].part[55].part[9].position.set(-45, 10, -0.01);
  levelContainer[3].part[55].part[9].rotation.z = 0.2;
  levelContainer[3].part[55].part[11].rotation.z = 0.5;
  levelContainer[3].part[55].legTween1 = gsap.to(levelContainer[3].part[55].part[9].rotation, { duration: 0.3, z: -0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[55].legTween2 = gsap.to(levelContainer[3].part[55].part[11].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[55].part[12] = new THREE.Object3D();
  levelContainer[3].part[55].part[13] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[333].map.image.width, pic[333].map.image.height), pic[333]);
  levelContainer[3].part[55].part[13].geometry.translate(0, -pic[333].map.image.height * 0.4, 0);
  levelContainer[3].part[55].part[14] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[334].map.image.width, pic[334].map.image.height), pic[334]);
  levelContainer[3].part[55].part[14].geometry.translate(-pic[334].map.image.width * 0.2, -pic[334].map.image.height * 0.3, 0);
  levelContainer[3].part[55].part[14].position.set(7, -80, -0.001);
  levelContainer[3].part[55].part[12].add(levelContainer[3].part[55].part[13], levelContainer[3].part[55].part[14]);
  levelContainer[3].part[55].part[12].position.set(29, 10, -0.01);
  levelContainer[3].part[55].part[12].rotation.z = -0.3;
  levelContainer[3].part[55].legTween3 = gsap.to(levelContainer[3].part[55].part[12].rotation, { duration: 0.3, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[55].legTween4 = gsap.to(levelContainer[3].part[55].part[14].rotation, { duration: 0.3, z: 0.5, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[55].part[0].add(levelContainer[3].part[55].part[9], levelContainer[3].part[55].part[6], levelContainer[3].part[55].part[3], levelContainer[3].part[55].part[2], levelContainer[3].part[55].part[1]);
  levelContainer[3].part[55].add(levelContainer[3].part[55].part[12], levelContainer[3].part[55].part[9], levelContainer[3].part[55].part[0]);
  levelContainer[3].part[55].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[55].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.03, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[55].scale.set(-0.45, 0.45, 1);
  levelContainer[3].part[55].position.set(-350, -270, -2);

  levelContainer[3].part[56] = new THREE.Object3D();
  levelContainer[3].part[56].part = [];
  levelContainer[3].part[56].part[0] = new THREE.Object3D();
  levelContainer[3].part[56].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[335].map.image.width * 0.57, pic[335].map.image.height * 0.57), pic[335]);
  levelContainer[3].part[56].part[1].geometry.translate(0, pic[335].map.image.height * 0.4 * 0.57, 0);
  levelContainer[3].part[56].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[336].map.image.width, pic[336].map.image.height), pic[336]);
  levelContainer[3].part[56].part[2].geometry.translate(pic[336].map.image.width * 0.1, pic[336].map.image.height * 0.4, 0);
  levelContainer[3].part[56].part[2].position.set(-15, 210, 0.001);
  levelContainer[3].part[56].part[2].rotation.z = -0.04;
  gsap.to(levelContainer[3].part[56].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.04, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[56].part[3] = new THREE.Object3D();
  levelContainer[3].part[56].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[337].map.image.width * 0.57, pic[337].map.image.height * 0.57), pic[337]);
  levelContainer[3].part[56].part[4].geometry.translate(-pic[337].map.image.width * 0.1 * 0.57, -pic[337].map.image.height * 0.4 * 0.57, 0);
  levelContainer[3].part[56].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[338].map.image.width * 0.57, pic[338].map.image.height * 0.57), pic[338]);
  levelContainer[3].part[56].part[5].geometry.translate(-pic[338].map.image.width * 0.4 * 0.57, -pic[338].map.image.height * 0.4 * 0.57, 0);
  levelContainer[3].part[56].part[5].position.set(0, -70, -0.001);
  levelContainer[3].part[56].part[3].add(levelContainer[3].part[56].part[4], levelContainer[3].part[56].part[5]);
  levelContainer[3].part[56].part[3].position.set(-70, 185, -0.01);
  gsap.to(levelContainer[3].part[56].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  gsap.to(levelContainer[3].part[56].part[5].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[3].part[56].part[6] = new THREE.Object3D();
  levelContainer[3].part[56].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[339].map.image.width, pic[339].map.image.height), pic[339]);
  levelContainer[3].part[56].part[7].geometry.translate(pic[339].map.image.width * 0.3, -pic[339].map.image.height * 0.4, 0);
  levelContainer[3].part[56].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[340].map.image.width, pic[340].map.image.height), pic[340]);
  levelContainer[3].part[56].part[8].geometry.translate(-pic[340].map.image.width * 0.3, -pic[340].map.image.height * 0.4, 0);
  levelContainer[3].part[56].part[8].position.set(20, -85, 0.001);
  gsap.to(levelContainer[3].part[56].part[6].rotation, { duration: 0.5 + Math.random(), z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(levelContainer[3].part[56].part[8].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[56].part[6].add(levelContainer[3].part[56].part[7], levelContainer[3].part[56].part[8]);
  levelContainer[3].part[56].part[6].position.set(55, 195, 0.01);
  levelContainer[3].part[56].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[341].map.image.width * 0.57, pic[341].map.image.height * 0.57), pic[341]);
  levelContainer[3].part[56].part[9].position.set(-20, -95, -0.01);
  levelContainer[3].part[56].part[0].add(levelContainer[3].part[56].part[9], levelContainer[3].part[56].part[6], levelContainer[3].part[56].part[3], levelContainer[3].part[56].part[2], levelContainer[3].part[56].part[1]);
  levelContainer[3].part[56].add(levelContainer[3].part[56].part[9], levelContainer[3].part[56].part[0]);
  levelContainer[3].part[56].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[56].part[0].rotation, { duration: 1 + Math.random(), z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[56].scale.set(0.44, 0.44, 1);
  levelContainer[3].part[56].position.set(150, -210, -4);

  levelContainer[3].part[57] = new THREE.Object3D();
  levelContainer[3].part[57].part = [];
  levelContainer[3].part[57].part[0] = new THREE.Object3D();
  levelContainer[3].part[57].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[342].map.image.width, pic[342].map.image.height), pic[342]);
  levelContainer[3].part[57].part[1].geometry.translate(0, pic[342].map.image.height * 0.4, 0);
  levelContainer[3].part[57].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[343].map.image.width, pic[343].map.image.height), pic[343]);
  levelContainer[3].part[57].part[2].geometry.translate(pic[343].map.image.width * 0.1, pic[343].map.image.height * 0.4, 0);
  levelContainer[3].part[57].part[2].position.set(-15, 200, 0.001);
  levelContainer[3].part[57].part[2].rotation.z = -0.04;
  gsap.to(levelContainer[3].part[57].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.04, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[57].part[3] = new THREE.Object3D();
  levelContainer[3].part[57].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[344].map.image.width, pic[344].map.image.height), pic[344]);
  levelContainer[3].part[57].part[4].geometry.translate(-pic[344].map.image.width * 0.1, -pic[344].map.image.height * 0.4, 0);
  levelContainer[3].part[57].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[345].map.image.width, pic[345].map.image.height), pic[345]);
  levelContainer[3].part[57].part[5].geometry.translate(-pic[345].map.image.width * 0.4, -pic[345].map.image.height * 0.4, 0);
  levelContainer[3].part[57].part[5].position.set(-10, -80, -0.001);
  levelContainer[3].part[57].part[3].add(levelContainer[3].part[57].part[4], levelContainer[3].part[57].part[5]);
  levelContainer[3].part[57].part[3].position.set(-70, 170, -0.01);
  gsap.to(levelContainer[3].part[57].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  gsap.to(levelContainer[3].part[57].part[5].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[3].part[57].part[6] = new THREE.Object3D();
  levelContainer[3].part[57].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[346].map.image.width, pic[346].map.image.height), pic[346]);
  levelContainer[3].part[57].part[7].geometry.translate(pic[346].map.image.width * 0.3, -pic[346].map.image.height * 0.4, 0);
  levelContainer[3].part[57].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[347].map.image.width, pic[347].map.image.height), pic[347]);
  levelContainer[3].part[57].part[8].geometry.translate(-pic[347].map.image.width * 0.3, -pic[347].map.image.height * 0.4, 0);
  levelContainer[3].part[57].part[8].position.set(45, -90, 0.001);
  gsap.to(levelContainer[3].part[57].part[6].rotation, { duration: 0.5 + Math.random(), z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(levelContainer[3].part[57].part[8].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[57].part[6].add(levelContainer[3].part[57].part[7], levelContainer[3].part[57].part[8]);
  levelContainer[3].part[57].part[6].position.set(65, 180, 0.01);
  levelContainer[3].part[57].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[348].map.image.width, pic[348].map.image.height), pic[348]);
  levelContainer[3].part[57].part[9].position.set(-15, -95, -0.01);
  levelContainer[3].part[57].part[0].add(levelContainer[3].part[57].part[9], levelContainer[3].part[57].part[6], levelContainer[3].part[57].part[3], levelContainer[3].part[57].part[2], levelContainer[3].part[57].part[1]);
  levelContainer[3].part[57].add(levelContainer[3].part[57].part[9], levelContainer[3].part[57].part[0]);
  levelContainer[3].part[57].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[57].part[0].rotation, { duration: 1 + Math.random(), z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[57].scale.set(-0.38, 0.38, 1);
  levelContainer[3].part[57].position.set(-210, -215, -5.5);

  levelContainer[3].part[58] = new THREE.Object3D();
  levelContainer[3].part[58].part = [];
  levelContainer[3].part[58].part[0] = new THREE.Object3D();
  levelContainer[3].part[58].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[349].map.image.width, pic[349].map.image.height), pic[349]);
  levelContainer[3].part[58].part[1].geometry.translate(0, pic[349].map.image.height * 0.4, 0);
  levelContainer[3].part[58].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[350].map.image.width, pic[350].map.image.height), pic[350]);
  levelContainer[3].part[58].part[2].geometry.translate(pic[350].map.image.width * 0.1, pic[350].map.image.height * 0.4, 0);
  levelContainer[3].part[58].part[2].position.set(-15, 200, 0.001);
  levelContainer[3].part[58].part[2].rotation.z = -0.04;
  gsap.to(levelContainer[3].part[58].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.04, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[58].part[3] = new THREE.Object3D();
  levelContainer[3].part[58].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[351].map.image.width, pic[351].map.image.height), pic[351]);
  levelContainer[3].part[58].part[4].geometry.translate(-pic[351].map.image.width * 0.1, -pic[351].map.image.height * 0.4, 0);
  levelContainer[3].part[58].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[352].map.image.width, pic[352].map.image.height), pic[352]);
  levelContainer[3].part[58].part[5].geometry.translate(-pic[352].map.image.width * 0.4, -pic[352].map.image.height * 0.4, 0);
  levelContainer[3].part[58].part[5].position.set(-10, -80, -0.001);
  levelContainer[3].part[58].part[3].add(levelContainer[3].part[58].part[4], levelContainer[3].part[58].part[5]);
  levelContainer[3].part[58].part[3].position.set(-70, 170, -0.01);
  gsap.to(levelContainer[3].part[58].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  gsap.to(levelContainer[3].part[58].part[5].rotation, { duration: 0.5 + Math.random(), z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  levelContainer[3].part[58].part[6] = new THREE.Object3D();
  levelContainer[3].part[58].part[7] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[353].map.image.width, pic[353].map.image.height), pic[353]);
  levelContainer[3].part[58].part[7].geometry.translate(pic[353].map.image.width * 0.3, -pic[353].map.image.height * 0.4, 0);
  levelContainer[3].part[58].part[8] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[354].map.image.width, pic[354].map.image.height), pic[354]);
  levelContainer[3].part[58].part[8].geometry.translate(-pic[354].map.image.width * 0.3, -pic[354].map.image.height * 0.4, 0);
  levelContainer[3].part[58].part[8].position.set(45, -90, 0.001);
  gsap.to(levelContainer[3].part[58].part[6].rotation, { duration: 0.5 + Math.random(), z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(levelContainer[3].part[58].part[8].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[58].part[6].add(levelContainer[3].part[58].part[7], levelContainer[3].part[58].part[8]);
  levelContainer[3].part[58].part[6].position.set(65, 180, 0.01);
  levelContainer[3].part[58].part[9] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[355].map.image.width, pic[355].map.image.height), pic[355]);
  levelContainer[3].part[58].part[9].position.set(-15, -95, -0.01);
  levelContainer[3].part[58].part[0].add(levelContainer[3].part[58].part[9], levelContainer[3].part[58].part[6], levelContainer[3].part[58].part[3], levelContainer[3].part[58].part[2], levelContainer[3].part[58].part[1]);
  levelContainer[3].part[58].add(levelContainer[3].part[58].part[9], levelContainer[3].part[58].part[0]);
  levelContainer[3].part[58].part[0].rotation.z = -0.03;
  gsap.to(levelContainer[3].part[58].part[0].rotation, { duration: 1 + Math.random(), z: -0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[58].scale.set(0.38, 0.38, 1);
  levelContainer[3].part[58].position.set(-90, -215, -5.5);

  levelContainer[3].part[59] = new THREE.Object3D();
  levelContainer[3].part[59].part = [];
  levelContainer[3].part[59].part[0] = new THREE.Object3D();
  levelContainer[3].part[59].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[356].map.image.width, pic[356].map.image.height), pic[356]);
  levelContainer[3].part[59].part[1].geometry.translate(0, pic[356].map.image.height * 0.4, 0);
  levelContainer[3].part[59].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[357].map.image.width, pic[357].map.image.height), pic[357]);
  levelContainer[3].part[59].part[2].geometry.translate(-pic[357].map.image.width * 0.4, -pic[357].map.image.height * 0.4, 0);
  levelContainer[3].part[59].part[2].position.set(-40, 130, -0.1);
  levelContainer[3].part[59].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[358].map.image.width, pic[358].map.image.height), pic[358]);
  levelContainer[3].part[59].part[3].geometry.translate(pic[358].map.image.width * 0.05, -pic[358].map.image.height * 0.4, 0);
  levelContainer[3].part[59].part[3].position.set(45, 120, 0.1);
  levelContainer[3].part[59].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[359].map.image.width, pic[359].map.image.height), pic[359]);
  levelContainer[3].part[59].part[4].position.set(-75, -75, -0.01);
  levelContainer[3].part[59].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[360].map.image.width, pic[360].map.image.height), pic[360]);
  levelContainer[3].part[59].part[5].position.set(75, -75, 0.01);
  levelContainer[3].part[59].part[0].add(levelContainer[3].part[59].part[2], levelContainer[3].part[59].part[3], levelContainer[3].part[59].part[1]);
  levelContainer[3].part[59].add(levelContainer[3].part[59].part[5], levelContainer[3].part[59].part[4], levelContainer[3].part[59].part[0]);
  levelContainer[3].part[59].scale.set(0.31, 0.31, 1);
  levelContainer[3].part[59].position.set(60, -0, -13.5);
  levelContainer[3].part[59].hitTween1 = gsap.to(levelContainer[3].part[59].part[3].rotation, { duration: 0.2, z: -2.2, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[59].hitTween1 !== undefined && levelContainer[3].part[59].hitTween1 !== null) levelContainer[3].part[59].hitTween1.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[59].hitTween2 = gsap.to(levelContainer[3].part[59].part[2].rotation, { duration: 0.2, z: -3, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[59].hitTween2 !== undefined && levelContainer[3].part[59].hitTween2 !== null) levelContainer[3].part[59].hitTween2.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[59].hitTween3 = gsap.to(levelContainer[3].part[59].part[0].rotation, { duration: 0.3, z: 0.3, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[59].hitTween3 !== undefined && levelContainer[3].part[59].hitTween3 !== null) levelContainer[3].part[59].hitTween3.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[59].jumpTween = gsap.to(levelContainer[3].part[59].part[0].position, { duration: 0.1, y: -20, ease: "power2.in", onComplete: function() {
    gsap.to(levelContainer[3].part[59].part[0].position, { duration: 0.1, y: 0, ease: "power2.out" });
    if (levelContainer[3].part[59].jumpTween !== undefined && levelContainer[3].part[59].jumpTween !== null) {
      gsap.to(levelContainer[3].part[59].position, { duration: 0.4, x: 75 - Math.random() * 30, ease: "none" });
      gsap.to(levelContainer[3].part[59].position, { duration: 0.2, y: 30, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
        setTimeout(function() {
          if (levelContainer[3].part[59].jumpTween !== undefined && levelContainer[3].part[59].jumpTween !== null) levelContainer[3].part[59].jumpTween.restart();
        }, 500 + Math.random() * 500);
      } });
    }
  } });
  
  
  levelContainer[3].part[60] = new THREE.Object3D();
  levelContainer[3].part[60].part = [];
  levelContainer[3].part[60].part[0] = new THREE.Object3D();
  levelContainer[3].part[60].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[361].map.image.width, pic[361].map.image.height), pic[361]);
  levelContainer[3].part[60].part[1].geometry.translate(0, pic[356].map.image.height * 0.4, 0);
  levelContainer[3].part[60].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[362].map.image.width, pic[362].map.image.height), pic[362]);
  levelContainer[3].part[60].part[2].geometry.translate(-pic[362].map.image.width * 0.4, -pic[362].map.image.height * 0.4, 0);
  levelContainer[3].part[60].part[2].position.set(-50, 110, -0.1);
  levelContainer[3].part[60].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[363].map.image.width, pic[363].map.image.height), pic[363]);
  levelContainer[3].part[60].part[3].geometry.translate(-pic[363].map.image.width * 0.4, -pic[363].map.image.height * 0.4, 0);
  levelContainer[3].part[60].part[3].position.set(55, 100, 0.1);
  levelContainer[3].part[60].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[364].map.image.width, pic[364].map.image.height), pic[364]);
  levelContainer[3].part[60].part[4].position.set(-110, -10, -0.01);
  levelContainer[3].part[60].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[365].map.image.width, pic[365].map.image.height), pic[365]);
  levelContainer[3].part[60].part[5].position.set(0, -50, 0.01);
  levelContainer[3].part[60].part[6] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[366].map.image.width, pic[366].map.image.height), pic[366]);
  levelContainer[3].part[60].part[6].position.set(140, -10, 0.01);
  levelContainer[3].part[60].part[0].add(levelContainer[3].part[60].part[2], levelContainer[3].part[60].part[3], levelContainer[3].part[60].part[1]);
  levelContainer[3].part[60].add(levelContainer[3].part[60].part[6], levelContainer[3].part[60].part[5], levelContainer[3].part[60].part[4], levelContainer[3].part[60].part[0]);
  levelContainer[3].part[60].scale.set(-0.31, 0.31, 1);
  levelContainer[3].part[60].position.set(-80, -30, -14);
  levelContainer[3].part[60].hitTween1 = gsap.to(levelContainer[3].part[60].part[3].rotation, { duration: 0.2, z: -2.2, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[59].hitTween1 !== undefined && levelContainer[3].part[60].hitTween1 !== null) levelContainer[3].part[60].hitTween1.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[60].hitTween2 = gsap.to(levelContainer[3].part[60].part[2].rotation, { duration: 0.2, z: -3, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[60].hitTween2 !== undefined && levelContainer[3].part[60].hitTween2 !== null) levelContainer[3].part[60].hitTween2.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[60].hitTween3 = gsap.to(levelContainer[3].part[60].part[0].rotation, { duration: 0.3, z: 0.3, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[60].hitTween3 !== undefined && levelContainer[3].part[60].hitTween3 !== null) levelContainer[3].part[60].hitTween3.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[60].jumpTween = gsap.to(levelContainer[3].part[60].part[0].position, { duration: 0.1, y: -20, ease: "power2.in", onComplete: function() {
    gsap.to(levelContainer[3].part[60].part[0].position, { duration: 0.1, y: 0, ease: "power2.out" });
    if (levelContainer[3].part[60].jumpTween !== undefined && levelContainer[3].part[60].jumpTween !== null) {
      gsap.to(levelContainer[3].part[60].position, { duration: 0.4, x: -65 - Math.random() * 30, ease: "none" });
      gsap.to(levelContainer[3].part[60].position, { duration: 0.2, y: 0, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
        setTimeout(function() {
          if (levelContainer[3].part[60].jumpTween !== undefined && levelContainer[3].part[60].jumpTween !== null) levelContainer[3].part[60].jumpTween.restart();
        }, 500 + Math.random() * 500);
      } });
    }
  } });

  levelContainer[3].part[61] = new THREE.Object3D();
  levelContainer[3].part[61].part = [];
  levelContainer[3].part[61].part[0] = new THREE.Object3D();
  levelContainer[3].part[61].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[367].map.image.width, pic[367].map.image.height), pic[367]);
  levelContainer[3].part[61].part[1].geometry.translate(0, pic[367].map.image.height * 0.4, 0);
  levelContainer[3].part[61].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[368].map.image.width, pic[368].map.image.height), pic[368]);
  levelContainer[3].part[61].part[2].geometry.translate(-pic[368].map.image.width * 0.4, -pic[368].map.image.height * 0.4, 0);
  levelContainer[3].part[61].part[2].position.set(-50, 160, -0.1);
  levelContainer[3].part[61].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[369].map.image.width, pic[369].map.image.height), pic[369]);
  levelContainer[3].part[61].part[3].geometry.translate(-pic[369].map.image.width * 0.15, -pic[369].map.image.height * 0.35, 0);
  levelContainer[3].part[61].part[3].position.set(90, 160, 0.1);
  levelContainer[3].part[61].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[370].map.image.width, pic[370].map.image.height), pic[370]);
  levelContainer[3].part[61].part[4].position.set(-55, -35, -0.01);
  levelContainer[3].part[61].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[371].map.image.width, pic[371].map.image.height), pic[371]);
  levelContainer[3].part[61].part[5].position.set(30, -30, 0.01);
  levelContainer[3].part[61].part[0].add(levelContainer[3].part[61].part[2], levelContainer[3].part[61].part[3], levelContainer[3].part[61].part[1]);
  levelContainer[3].part[61].add(levelContainer[3].part[61].part[5], levelContainer[3].part[61].part[4], levelContainer[3].part[61].part[0]);
  levelContainer[3].part[61].scale.set(0.4, 0.4, 1);
  levelContainer[3].part[61].position.set(90, -70, -13);
  levelContainer[3].part[61].hitTween1 = gsap.to(levelContainer[3].part[61].part[3].rotation, { duration: 0.2, z: -2.2, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[61].hitTween1 !== undefined && levelContainer[3].part[61].hitTween1 !== null) levelContainer[3].part[61].hitTween1.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[61].hitTween2 = gsap.to(levelContainer[3].part[61].part[2].rotation, { duration: 0.2, z: -3, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[61].hitTween2 !== undefined && levelContainer[3].part[61].hitTween2 !== null) levelContainer[3].part[61].hitTween2.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[61].hitTween3 = gsap.to(levelContainer[3].part[61].part[0].rotation, { duration: 0.3, z: 0.3, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[61].hitTween3 !== undefined && levelContainer[3].part[61].hitTween3 !== null) levelContainer[3].part[61].hitTween3.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[61].jumpTween = gsap.to(levelContainer[3].part[61].part[0].position, { duration: 0.1, y: -20, ease: "power2.in", onComplete: function() {
    gsap.to(levelContainer[3].part[61].part[0].position, { duration: 0.1, y: 0, ease: "power2.out" });
    if (levelContainer[3].part[61].jumpTween !== undefined && levelContainer[3].part[61].jumpTween !== null) {
      gsap.to(levelContainer[3].part[61].position, { duration: 0.4, x: 105 - Math.random() * 30, ease: "none" });
      gsap.to(levelContainer[3].part[61].position, { duration: 0.2, y: -40, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
        setTimeout(function() {
          if (levelContainer[3].part[61].jumpTween !== undefined && levelContainer[3].part[61].jumpTween !== null) levelContainer[3].part[61].jumpTween.restart();
        }, 500 + Math.random() * 500);
      } });
    }
  } });


  levelContainer[3].part[62] = new THREE.Object3D();
  levelContainer[3].part[62].part = [];
  levelContainer[3].part[62].part[0] = new THREE.Object3D();
  levelContainer[3].part[62].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[372].map.image.width, pic[372].map.image.height), pic[372]);
  levelContainer[3].part[62].part[1].geometry.translate(0, pic[372].map.image.height * 0.4, 0);
  levelContainer[3].part[62].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[373].map.image.width, pic[373].map.image.height), pic[373]);
  levelContainer[3].part[62].part[2].geometry.translate(-pic[373].map.image.width * 0.4, -pic[373].map.image.height * 0.4, 0);
  levelContainer[3].part[62].part[2].position.set(-60, 200, 0.1);
  levelContainer[3].part[62].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[374].map.image.width, pic[374].map.image.height), pic[374]);
  levelContainer[3].part[62].part[3].geometry.translate(-pic[374].map.image.width * 0, -pic[374].map.image.height * 0.35, 0);
  levelContainer[3].part[62].part[3].position.set(120, 160, 0.1);
  levelContainer[3].part[62].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[375].map.image.width, pic[375].map.image.height), pic[375]);
  levelContainer[3].part[62].part[4].position.set(-85, -15, -0.01);
  levelContainer[3].part[62].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[376].map.image.width, pic[376].map.image.height), pic[376]);
  levelContainer[3].part[62].part[5].position.set(95, -20, 0.01);
  levelContainer[3].part[62].part[0].add(levelContainer[3].part[62].part[2], levelContainer[3].part[62].part[3], levelContainer[3].part[62].part[1]);
  levelContainer[3].part[62].add(levelContainer[3].part[62].part[5], levelContainer[3].part[62].part[4], levelContainer[3].part[62].part[0]);
  levelContainer[3].part[62].scale.set(-0.45, 0.45, 1);
  levelContainer[3].part[62].position.set(-130, -50, -13.5);
  levelContainer[3].part[62].hitTween1 = gsap.to(levelContainer[3].part[62].part[3].rotation, { duration: 0.2, z: -2.2, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[62].hitTween1 !== undefined && levelContainer[3].part[62].hitTween1 !== null) levelContainer[3].part[62].hitTween1.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[62].hitTween2 = gsap.to(levelContainer[3].part[62].part[2].rotation, { duration: 0.2, z: -0.3, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[62].hitTween2 !== undefined && levelContainer[3].part[62].hitTween2 !== null) levelContainer[3].part[62].hitTween2.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[62].hitTween3 = gsap.to(levelContainer[3].part[62].part[0].rotation, { duration: 0.3, z: 0.3, ease: "none", repeat: 1, yoyo: true, onComplete: function() {
    setTimeout(function() {
      if (levelContainer[3].part[62].hitTween3 !== undefined && levelContainer[3].part[62].hitTween3 !== null) levelContainer[3].part[62].hitTween3.restart();
    }, Math.random() * 600);
  } });
  levelContainer[3].part[62].jumpTween = gsap.to(levelContainer[3].part[62].part[0].position, { duration: 0.1, y: -20, ease: "power2.in", onComplete: function() {
    gsap.to(levelContainer[3].part[62].part[0].position, { duration: 0.1, y: 0, ease: "power2.out" });
    if (levelContainer[3].part[62].jumpTween !== undefined && levelContainer[3].part[62].jumpTween !== null) {
      gsap.to(levelContainer[3].part[62].position, { duration: 0.4, x: -115 - Math.random() * 30, ease: "none" });
      gsap.to(levelContainer[3].part[62].position, { duration: 0.2, y: -20, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
        setTimeout(function() {
          if (levelContainer[3].part[62].jumpTween !== undefined && levelContainer[3].part[62].jumpTween !== null) levelContainer[3].part[62].jumpTween.restart();
        }, 500 + Math.random() * 500);
      } });
    }
  } });

  levelContainer[3].part[63] = new THREE.Object3D();
  levelContainer[3].part[63].part = [];
  levelContainer[3].part[63].part[0] = new THREE.Object3D();
  levelContainer[3].part[63].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[377].map.image.width, pic[377].map.image.height), pic[377]);
  levelContainer[3].part[63].part[1].geometry.translate(0, pic[377].map.image.height * 0.4, 0);
  levelContainer[3].part[63].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[378].map.image.width, pic[378].map.image.height), pic[378]);
  levelContainer[3].part[63].part[2].geometry.translate(pic[378].map.image.width * 0.1, pic[379].map.image.height * 0.4, 0);
  levelContainer[3].part[63].part[2].position.set(-10, 200, 0.001);
  levelContainer[3].part[63].part[2].rotation.z = -0.03;
  levelContainer[3].part[63].headTween = gsap.to(levelContainer[3].part[63].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[63].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[379].map.image.width, pic[379].map.image.height), pic[379]);
  levelContainer[3].part[63].part[3].geometry.translate(-pic[379].map.image.width * 0.4, -pic[379].map.image.height * 0.4, 0);
  levelContainer[3].part[63].part[3].position.set(-60, 175, -0.001);
  levelContainer[3].part[63].handTween1 = gsap.to(levelContainer[3].part[63].part[3].rotation, { duration: 0.3 + Math.random() * 0.5, z: -0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[63].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[380].map.image.width, pic[380].map.image.height), pic[380]);
  levelContainer[3].part[63].part[4].geometry.translate(pic[380].map.image.width * 0.1, -pic[380].map.image.height * 0.4, 0);
  levelContainer[3].part[63].part[4].position.set(75, 178, 0.001);
  levelContainer[3].part[63].handTween2 = gsap.to(levelContainer[3].part[63].part[4].rotation, { duration: 0.3 + Math.random() * 0.5, z: -0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[63].part[0].add(levelContainer[3].part[63].part[4], levelContainer[3].part[63].part[3], levelContainer[3].part[63].part[2], levelContainer[3].part[63].part[1]);
  levelContainer[3].part[63].part[0].rotation.z = -0.03;
  levelContainer[3].part[63].bodyTween = gsap.to(levelContainer[3].part[63].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[63].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[381].map.image.width, pic[381].map.image.height), pic[381]);
  levelContainer[3].part[63].part[5].position.set(-10, -105, -0.001);
  levelContainer[3].part[63].add(levelContainer[3].part[63].part[0], levelContainer[3].part[63].part[5]);
  levelContainer[3].part[63].scale.set(-0.2, 0.2, 1);
  levelContainer[3].part[63].position.set(-170, -90, -10);

  levelContainer[3].part[64] = new THREE.Object3D();
  levelContainer[3].part[64].part = [];
  levelContainer[3].part[64].part[0] = new THREE.Object3D();
  levelContainer[3].part[64].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[382].map.image.width, pic[382].map.image.height), pic[382]);
  levelContainer[3].part[64].part[1].geometry.translate(0, pic[382].map.image.height * 0.4, 0);
  levelContainer[3].part[64].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[383].map.image.width, pic[383].map.image.height), pic[383]);
  levelContainer[3].part[64].part[2].geometry.translate(pic[383].map.image.width * 0.1, pic[383].map.image.height * 0.4, 0);
  levelContainer[3].part[64].part[2].position.set(-10, 200, 0.001);
  levelContainer[3].part[64].part[2].rotation.z = -0.03;
  levelContainer[3].part[64].headTween = gsap.to(levelContainer[3].part[64].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[64].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[379].map.image.width, pic[379].map.image.height), pic[379]);
  levelContainer[3].part[64].part[3].geometry.translate(-pic[379].map.image.width * 0.4, -pic[379].map.image.height * 0.4, 0);
  levelContainer[3].part[64].part[3].position.set(-60, 175, -0.001);
  levelContainer[3].part[64].handTween1 = gsap.to(levelContainer[3].part[64].part[3].rotation, { duration: 0.3 + Math.random() * 0.5, z: -0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[64].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[380].map.image.width, pic[380].map.image.height), pic[380]);
  levelContainer[3].part[64].part[4].geometry.translate(pic[380].map.image.width * 0.1, -pic[380].map.image.height * 0.4, 0);
  levelContainer[3].part[64].part[4].position.set(75, 178, 0.001);
  levelContainer[3].part[64].handTween2 = gsap.to(levelContainer[3].part[64].part[4].rotation, { duration: 0.3 + Math.random() * 0.5, z: -0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[64].part[0].add(levelContainer[3].part[64].part[4], levelContainer[3].part[64].part[3], levelContainer[3].part[64].part[2], levelContainer[3].part[64].part[1]);
  levelContainer[3].part[64].part[0].rotation.z = -0.03;
  levelContainer[3].part[64].bodyTween = gsap.to(levelContainer[3].part[64].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[64].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[381].map.image.width, pic[381].map.image.height), pic[381]);
  levelContainer[3].part[64].part[5].position.set(-10, -105, -0.001);
  levelContainer[3].part[64].add(levelContainer[3].part[64].part[0], levelContainer[3].part[64].part[5]);
  levelContainer[3].part[64].scale.set(-0.2, 0.2, 1);
  levelContainer[3].part[64].position.set(-130, -85, -10.1);

  levelContainer[3].part[65] = new THREE.Object3D();
  levelContainer[3].part[65].part = [];
  levelContainer[3].part[65].part[0] = new THREE.Object3D();
  levelContainer[3].part[65].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[384].map.image.width, pic[384].map.image.height), pic[384]);
  levelContainer[3].part[65].part[1].geometry.translate(0, pic[384].map.image.height * 0.4, 0);
  levelContainer[3].part[65].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[385].map.image.width, pic[385].map.image.height), pic[385]);
  levelContainer[3].part[65].part[2].geometry.translate(pic[385].map.image.width * 0.1, pic[385].map.image.height * 0.4, 0);
  levelContainer[3].part[65].part[2].position.set(-10, 200, 0.001);
  levelContainer[3].part[65].part[2].rotation.z = -0.03;
  levelContainer[3].part[65].headTween = gsap.to(levelContainer[3].part[65].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[65].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[386].map.image.width, pic[386].map.image.height), pic[386]);
  levelContainer[3].part[65].part[3].geometry.translate(-pic[386].map.image.width * 0.4, -pic[386].map.image.height * 0.4, 0);
  levelContainer[3].part[65].part[3].position.set(-60, 175, -0.001);
  levelContainer[3].part[65].handTween1 = gsap.to(levelContainer[3].part[65].part[3].rotation, { duration: 0.3 + Math.random() * 0.5, z: -0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[65].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[387].map.image.width, pic[387].map.image.height), pic[387]);
  levelContainer[3].part[65].part[4].geometry.translate(pic[387].map.image.width * 0.1, -pic[387].map.image.height * 0.4, 0);
  levelContainer[3].part[65].part[4].position.set(75, 178, 0.001);
  levelContainer[3].part[65].handTween2 = gsap.to(levelContainer[3].part[65].part[4].rotation, { duration: 0.3 + Math.random() * 0.5, z: -0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[65].part[0].add(levelContainer[3].part[65].part[4], levelContainer[3].part[65].part[3], levelContainer[3].part[65].part[2], levelContainer[3].part[65].part[1]);
  levelContainer[3].part[65].part[0].rotation.z = -0.03;
  levelContainer[3].part[65].bodyTween = gsap.to(levelContainer[3].part[65].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[65].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[388].map.image.width, pic[388].map.image.height), pic[388]);
  levelContainer[3].part[65].part[5].position.set(-10, -105, -0.001);
  levelContainer[3].part[65].add(levelContainer[3].part[65].part[0], levelContainer[3].part[65].part[5]);
  levelContainer[3].part[65].scale.set(0.2, 0.2, 1);
  levelContainer[3].part[65].position.set(215, -60, -14);

  levelContainer[3].part[66] = new THREE.Object3D();
  levelContainer[3].part[66].part = [];
  levelContainer[3].part[66].part[0] = new THREE.Object3D();
  levelContainer[3].part[66].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[389].map.image.width, pic[389].map.image.height), pic[389]);
  levelContainer[3].part[66].part[1].geometry.translate(0, pic[389].map.image.height * 0.4, 0);
  levelContainer[3].part[66].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[390].map.image.width, pic[390].map.image.height), pic[390]);
  levelContainer[3].part[66].part[2].geometry.translate(pic[390].map.image.width * 0.1, pic[390].map.image.height * 0.4, 0);
  levelContainer[3].part[66].part[2].position.set(-10, 200, 0.001);
  levelContainer[3].part[66].part[2].rotation.z = -0.03;
  levelContainer[3].part[66].headTween = gsap.to(levelContainer[3].part[66].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[66].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[386].map.image.width, pic[386].map.image.height), pic[386]);
  levelContainer[3].part[66].part[3].geometry.translate(-pic[386].map.image.width * 0.4, -pic[386].map.image.height * 0.4, 0);
  levelContainer[3].part[66].part[3].position.set(-60, 175, -0.001);
  levelContainer[3].part[66].handTween1 = gsap.to(levelContainer[3].part[66].part[3].rotation, { duration: 0.3 + Math.random() * 0.5, z: -0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[66].part[4] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[387].map.image.width, pic[387].map.image.height), pic[387]);
  levelContainer[3].part[66].part[4].geometry.translate(pic[387].map.image.width * 0.1, -pic[387].map.image.height * 0.4, 0);
  levelContainer[3].part[66].part[4].position.set(75, 178, 0.001);
  levelContainer[3].part[66].handTween2 = gsap.to(levelContainer[3].part[66].part[4].rotation, { duration: 0.3 + Math.random() * 0.5, z: -0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[66].part[0].add(levelContainer[3].part[66].part[4], levelContainer[3].part[66].part[3], levelContainer[3].part[66].part[2], levelContainer[3].part[66].part[1]);
  levelContainer[3].part[66].part[0].rotation.z = -0.03;
  levelContainer[3].part[66].bodyTween = gsap.to(levelContainer[3].part[66].part[0].rotation, { duration: 2 + Math.random() * 3, z: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
  levelContainer[3].part[66].part[5] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[388].map.image.width, pic[388].map.image.height), pic[388]);
  levelContainer[3].part[66].part[5].position.set(-10, -105, -0.001);
  levelContainer[3].part[66].add(levelContainer[3].part[66].part[0], levelContainer[3].part[66].part[5]);
  levelContainer[3].part[66].scale.set(0.2, 0.2, 1);
  levelContainer[3].part[66].position.set(180, -40, -14.1);

  levelContainer[3].part[67] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[392].map.image.width * 0.4, pic[392].map.image.height * 0.4), pic[392]);
  levelContainer[3].part[67].geometry.translate(-pic[392].map.image.width * 0.15, pic[392].map.image.height * 0.2, 0);
  levelContainer[3].part[67].position.set(15, 210, -2.1);
  levelContainer[3].part[67].scale.set(0, 0, 1);
  levelContainer[3].part[68] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[391].map.image.width * 0.4, pic[391].map.image.height * 0.4), pic[391]);
  levelContainer[3].part[68].geometry.translate(-pic[391].map.image.width * 0.15, pic[391].map.image.height * 0.2, 0);
  levelContainer[3].part[68].position.set(70, 255, -2);
  levelContainer[3].part[68].scale.set(0, 0, 1);
  levelContainer[3].part[69] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[394].map.image.width * 0.4, pic[394].map.image.height * 0.4), pic[394]);
  levelContainer[3].part[69].geometry.translate(pic[394].map.image.width * 0.15, -pic[394].map.image.height * 0.2, 0);
  levelContainer[3].part[69].position.set(-75, 120, -2.1);
  levelContainer[3].part[69].scale.set(0, 0, 1);
  levelContainer[3].part[70] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[393].map.image.width * 0.4, pic[393].map.image.height * 0.4), pic[393]);
  levelContainer[3].part[70].geometry.translate(pic[393].map.image.width * 0.15, pic[393].map.image.height * 0.2, 0);
  levelContainer[3].part[70].position.set(-120, 140, -2);
  levelContainer[3].part[70].scale.set(0, 0, 1);
  levelContainer[3].part[71] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[395].map.image.width * 0.4, pic[395].map.image.height * 0.4), pic[395]);
  levelContainer[3].part[71].geometry.translate(pic[395].map.image.width * 0.15, -pic[395].map.image.height * 0.2, 0);
  levelContainer[3].part[71].position.set(-210, -190, -2.1);
  levelContainer[3].part[71].scale.set(0, 0, 1);
  levelContainer[3].part[72] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[396].map.image.width * 0.4, pic[396].map.image.height * 0.4), pic[396]);
  levelContainer[3].part[72].geometry.translate(pic[396].map.image.width * 0.15, -pic[396].map.image.height * 0.2, 0);
  levelContainer[3].part[72].position.set(-80, -140, -1.5);
  levelContainer[3].part[72].scale.set(0, 0, 1);

  levelScene[3].part[0] = new THREE.Object3D();
  levelScene[3].part[0].back = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[80].map.image.width, pic[80].map.image.height), pic[80]);
  levelScene[3].part[0].button = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[61].map.image.width, pic[61].map.image.height), pic[61]);
  levelScene[3].part[0].button.position.set(-10, -135, 0.001);
  levelScene[3].part[0].add(levelScene[3].part[0].button, levelScene[3].part[0].back);
  //levelScene[3].part[0].back.position.set(-pic[78].map.image.width * 0.3, pic[78].map.image.height * 0.5, 0);
  levelScene[3].part[0].position.set(0, -95, 1);
  levelScene[3].part[0].scale.set(0, 0, 1);
  levelScene[3].part[0].button.ready = false;
  levelScene[3].part[1] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[81].map.image.width * 0.192, pic[81].map.image.height * 0.192), pic[81]);
  levelScene[3].part[1].position.set(0, -50, 1);
  levelScene[3].part[1].scale.set(0, 0, 1);
  levelScene[3].part[2] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[88].map.image.width * 0.192, pic[88].map.image.height * 0.192), pic[88]);
  levelScene[3].part[2].position.set(-44, -90, 1);
  levelScene[3].part[2].scale.set(0, 0, 1);
  levelScene[3].part[2].ready = false;
  levelScene[3].part[3] = new THREE.Mesh(new THREE.PlaneBufferGeometry(pic[89].map.image.width * 0.192, pic[89].map.image.height * 0.192), pic[89]);
  levelScene[3].part[3].position.set(44, -90, 1);
  levelScene[3].part[3].scale.set(0, 0, 1);
  levelScene[3].part[3].ready = false;

  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < levelContainer[i].part.length; j++) {
      levelContainer[i].add(levelContainer[i].part[j]);
    }
    for (let j = 0; j < levelScene[i].part.length; j++) {
      levelScene[i].add(levelScene[i].part[j]);
    }
  }
  hideLoadingScreen();
}
function animateTimeLine(pos, delay) {
  let timer = { step: pos - 1 };
  gsap.to(timer, { duration: 2, step: pos, ease: "none", delay: delay, onUpdate: function() {
    shape = null;
    shape = new THREE.Shape();
    shape.absarc(0, 0, 2.5, Math.PI * 0.5, Math.PI * 1.5);
    shape.absarc((document.body.clientWidth / mainScene.scale.x - 10) / 8 * timer.step, 0, 2.5, Math.PI * 1.5, Math.PI * 2.5);
    timeline.bar.geometry.dispose();
    timeline.bar.geometry = new THREE.ShapeBufferGeometry(shape, 8);
  } });
  
  /*shape = null;
  shape = new THREE.Shape();
  shape.absarc(-document.body.clientWidth / mainScene.scale.x / 2 + 5, 0, 2.5, Math.PI * 0.5, Math.PI * 1.5);
  shape.absarc(document.body.clientWidth / mainScene.scale.x / 2 + 5, 0, 2.5, Math.PI * 1.5, Math.PI * 2.5);
  timeline.back.geometry.dispose();
  timeline.back.geometry = new THREE.ShapeBufferGeometry(shape, 8);*/

}
function kickBall(dir, posX) {
  gsap.to(levelContainer[2].part[16].position, { duration: 0.5, y: 50, ease: "power1.out", onComplete: function() {
    gsap.to(levelContainer[2].part[16].position, { duration: 0.5, y: -160, ease: "power1.in" });
  } });
  gsap.to(levelContainer[2].part[16].rotation, { duration: 1, z: -20 + 40 * Math.random(), ease: "power1.inOut" });
  gsap.to(levelContainer[2].part[16].position, { duration: 1, x: posX, ease: "none", onComplete: function() {
    gsap.to(levelContainer[2].part[16].position, { duration: 0.4, y: -50, ease: "power1.out", onComplete: function() {
      gsap.to(levelContainer[2].part[16].position, { duration: 0.4, y: -150, ease: "power1.in" });
    } });
    gsap.to(levelContainer[2].part[16].rotation, { duration: 0.8, z: -20 + 40 * Math.random(), ease: "power1.inOut" });
    gsap.to(levelContainer[2].part[16].position, { duration: 0.8, x: dir, ease: "none" });
    if (dir > 0) {
      levelContainer[2].part[12].hitTween1.restart();
      levelContainer[2].part[12].hitTween2.restart();
    } else {
      levelContainer[2].part[11].hitTween1.restart();
      levelContainer[2].part[11].hitTween2.restart();
    }
  } });
}
function goal() {
  gsap.to(levelContainer[2].part[16].position, { duration: 0.75, y: 100, ease: "power1.out", onComplete: function() {
    gsap.to(levelContainer[2].part[16].position, { duration: 0.75, y: -180, ease: "power1.in" });
  } });
  gsap.to(levelContainer[2].part[16].rotation, { duration: 1.5, z: -20 + 40 * Math.random(), ease: "power1.inOut" });
  gsap.to(levelContainer[2].part[16].position, { duration: 1.5, x: 60, ease: "none" });
  gsap.to(levelContainer[2].part[17].position, { duration: 1.8, x: 100, y: -150, ease: "power1.out" });
  gsap.to(levelContainer[2].part[17].scale, { duration: 1.8, x: 0.26, y: 0.26, ease: "power1.out" });
  gsap.to(levelContainer[2].part[17].part[5].rotation, { duration: 0.3, z: -0.4, ease: "power1.inOut", repeat: 3, yoyo: true });
  gsap.to(levelContainer[2].part[17].part[7].rotation, { duration: 0.3, z: 0.8, ease: "power1.inOut", repeat: 3, yoyo: true, delay: 0.3 });
  gsap.to(levelContainer[2].part[17].part[8].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: 3, yoyo: true, delay: 0.3 });
  gsap.to(levelContainer[2].part[17].part[10].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: 3, yoyo: true, onComplete: function() {
    
    gsap.to(levelContainer[2].part[17].part[10].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut" });
    gsap.to(levelContainer[2].part[17].part[7].rotation, { duration: 0.2, z: 0.8, ease: "power1.inOut", onComplete: function() {
      levelContainer[2].part[15].handTween1.kill();
      levelContainer[2].part[15].handTween1 = null;
      levelContainer[2].part[15].handTween2.kill();
      levelContainer[2].part[15].handTween2 = null;
      gsap.to([levelContainer[2].part[15].part[5].rotation, levelContainer[2].part[15].part[8].rotation], { duration: 0.2, z: -0.25, ease: "power1.out", repeat: 1, yoyo: true });
      gsap.to([levelContainer[2].part[15].part[7].rotation, levelContainer[2].part[15].part[10].rotation], { duration: 0.2, z: 0.5, ease: "power1.out", repeat: 1, yoyo: true });
      gsap.to([levelContainer[2].part[15].part[3].rotation, levelContainer[2].part[15].part[4].rotation], { duration: 0.2, z: 0, ease: "power1.out" });
      levelContainer[2].part[15].bodyTween.kill();
      levelContainer[2].part[15].bodyTween = null;
      gsap.to(levelContainer[2].part[15].position, { duration: 0.25, y: levelContainer[2].part[15].position.y - 2, ease: "power1.in", onComplete: function() {
        gsap.to(levelContainer[2].part[15].position, { duration: 1, x: levelContainer[2].part[15].position.x + 70, ease: "none" });
        gsap.to(levelContainer[2].part[15].rotation, { duration: 1, z: -1.5, ease: "none" });
        gsap.to(levelContainer[2].part[15].part[3].rotation, { duration: 1, z: -3, ease: "power1.out" });
        gsap.to(levelContainer[2].part[15].part[4].rotation, { duration: 1, z: 3, ease: "power1.out" });
        gsap.to(levelContainer[2].part[15].position, { duration: 0.5, y: levelContainer[2].part[15].position.y + 30, ease: "power1.out", onComplete: function() {
          gsap.to(levelContainer[2].part[15].position, { duration: 0.5, y: levelContainer[2].part[15].position.y - 40, ease: "power1.in", onComplete: function() {
            gsap.to(levelContainer[2].part[15].position, { duration: 0.2, y: levelContainer[2].part[15].position.y + 5, ease: "power1.out", repeat: 1, yoyo: true });
            gsap.to(levelContainer[2].part[15].position, { duration: 0.4, x: levelContainer[2].part[15].position.x + 5, ease: "power1.out" });
          } });
        } });
      } });
      gsap.to(levelContainer[2].part[17].part[5].rotation, { duration: 0.1, z: -0.4, ease: "power1.in" });
      gsap.to(levelContainer[2].part[17].part[7].rotation, { duration: 0.1, z: 0, ease: "power1.in", onComplete: function() {
        onHappy = true;
        levelContainer[2].part[16].position.z = -11;
        gsap.to(levelContainer[2].part[17].position, { duration: 2, x: -20, y: levelContainer[2].part[17].position.y + 20, ease: "power1.out" });
        gsap.to(levelContainer[2].part[17].scale, { duration: 2, x: 0.22, y: 0.22, ease: "power1.out" });
        gsap.to(levelContainer[2].part[16].rotation, { duration: 1, z: -20 + 40 * Math.random(), ease: "power1.inOut" });
        gsap.to(levelContainer[2].part[16].position, { duration: 1, x: 15, y: -60, ease: "power1.out" });
        gsap.to(levelContainer[2].part[16].scale, { duration: 1, x: 0.6, y: 0.6, ease: "power1.out", onComplete: function() {
          for (let i = 1; i < 48; i++) {
          	
          	const tweenTime = 0.2 + Math.random() * 0.6;
          	gsap.to(goalSparkle[i].scale, { duration: tweenTime, x: 0.8, y: 0.8, ease: "power2.inOut", repeat: 1, yoyo: true });
          	gsap.to(goalSparkle[i].position, { duration: tweenTime * 2, x: -135 + 300 * Math.random(), y: -140 + 200 * Math.random(), ease: "power2.out" });
          
          }
          levelContainer[2].part[12].handTween1.kill();
          levelContainer[2].part[12].handTween1 = null;
          levelContainer[2].part[12].handTween2.kill();
          levelContainer[2].part[12].handTween2 = null;
          levelContainer[2].part[11].handTween1.kill();
          levelContainer[2].part[11].handTween1 = null;
          levelContainer[2].part[11].handTween2.kill();
          levelContainer[2].part[11].handTween2 = null;
          levelContainer[2].part[11].bodyTween.kill();
          levelContainer[2].part[11].bodyTween = null;
          levelContainer[2].part[11].headTween.kill();
          levelContainer[2].part[11].headTween = null;
          levelContainer[2].part[12].bodyTween.kill();
          levelContainer[2].part[12].bodyTween = null;
          levelContainer[2].part[12].headTween.kill();
          levelContainer[2].part[12].headTween = null;
          levelContainer[2].part[13].handTween1.kill();
          levelContainer[2].part[13].handTween1 = null;
          levelContainer[2].part[13].handTween2.kill();
          levelContainer[2].part[13].handTween2 = null;
          levelContainer[2].part[14].handTween1.kill();
          levelContainer[2].part[14].handTween1 = null;
          levelContainer[2].part[14].handTween2.kill();
          levelContainer[2].part[14].handTween2 = null;
          gsap.to([levelContainer[2].part[13].part[3].rotation, levelContainer[2].part[14].part[3].rotation], { duration: 0.5, z: -2, ease: "power1.inOut" });
          gsap.to([levelContainer[2].part[13].part[4].rotation, levelContainer[2].part[14].part[4].rotation], { duration: 0.5, z: -3, ease: "power1.inOut", onComplete: function() {
            gsap.to(levelContainer[2].part[13].part[3].rotation, { duration: 0.3 + Math.random() * 0.5, z: -2.2, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[14].part[3].rotation, { duration: 0.3 + Math.random() * 0.5, z: -2.2, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[13].part[4].rotation, { duration: 0.3 + Math.random() * 0.5, z: -3.2, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[14].part[4].rotation, { duration: 0.3 + Math.random() * 0.5, z: -3.2, ease: "power1.inOut", repeat: -1, yoyo: true });
          } });
          levelContainer[2].part[14].happyTween = function() {
            gsap.to([levelContainer[2].part[14].part[5].rotation, levelContainer[2].part[14].part[8].rotation], { duration: 0.1, z: -0.25, ease: "power1.out", repeat: 1, yoyo: true });
            gsap.to([levelContainer[2].part[14].part[7].rotation, levelContainer[2].part[14].part[10].rotation], { duration: 0.1, z: 0.5, ease: "power1.out", repeat: 1, yoyo: true });
            gsap.to(levelContainer[2].part[14].position, { duration: 0.1, y: levelContainer[2].part[14].position.y - 2, ease: "power1.in", onComplete: function() {
                gsap.to(levelContainer[2].part[14].position, { duration: 0.2, y: levelContainer[2].part[14].position.y + 15, ease: "power1.out", onComplete: function() {
                gsap.to(levelContainer[2].part[14].position, { duration: 0.2, y: levelContainer[2].part[14].position.y - 13, ease: "power1.in", onComplete: function() {
                  levelContainer[2].part[14].happyTween();
                } });
              } });
            } });
          }
          levelContainer[2].part[14].happyTween();
          levelContainer[2].part[13].happyTween = function() {
            gsap.to([levelContainer[2].part[13].part[5].rotation, levelContainer[2].part[13].part[8].rotation], { duration: 0.12, z: -0.25, ease: "power1.out", repeat: 1, yoyo: true });
            gsap.to([levelContainer[2].part[13].part[7].rotation, levelContainer[2].part[13].part[10].rotation], { duration: 0.12, z: 0.5, ease: "power1.out", repeat: 1, yoyo: true });
            gsap.to(levelContainer[2].part[13].position, { duration: 0.12, y: levelContainer[2].part[13].position.y - 2, ease: "power1.in", onComplete: function() {
                gsap.to(levelContainer[2].part[13].position, { duration: 0.24, y: levelContainer[2].part[13].position.y + 15, ease: "power1.out", onComplete: function() {
                gsap.to(levelContainer[2].part[13].position, { duration: 0.24, y: levelContainer[2].part[13].position.y - 13, ease: "power1.in", onComplete: function() {
                  levelContainer[2].part[13].happyTween();
                } });
              } });
            } });
          }
          levelContainer[2].part[13].happyTween();
          gsap.to([levelContainer[2].part[12].part[0].rotation, levelContainer[2].part[11].part[0].rotation], { duration: 1, z: 0.1, ease: "power1.inOut" });
          gsap.to([levelContainer[2].part[12].part[2].rotation, levelContainer[2].part[11].part[2].rotation], { duration: 1, z: 0.3, ease: "power1.inOut" });
          gsap.to([levelContainer[2].part[12].part[3].rotation, levelContainer[2].part[11].part[3].rotation], { duration: 1, z: 0.2, ease: "power1.inOut" });
          gsap.to([levelContainer[2].part[12].part[4].rotation, levelContainer[2].part[11].part[4].rotation], { duration: 1, z: -0.2, ease: "power1.inOut", onComplete: function() {
            gsap.to(levelContainer[2].part[11].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[12].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[11].part[4].rotation, { duration: 1 + Math.random() * 2, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[12].part[4].rotation, { duration: 1 + Math.random() * 2, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[11].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[12].part[2].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[11].part[0].rotation, { duration: 1 + Math.random() * 2, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[12].part[0].rotation, { duration: 1 + Math.random() * 2, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
          } });
          gsap.to(levelContainer[2].part[16].position, { duration: 0.5, y: -100, ease: "power2.in" });
          gsap.to(levelContainer[2].part[16].scale, { duration: 0.5, x: 0.7, y: 0.7, ease: "power2.in", onComplete: function() {
            gsap.to(levelContainer[2].part[16].position, { duration: 0.4, y: -80, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
              gsap.to(levelContainer[2].part[16].position, { duration: 0.3, y: -90, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
                gsap.to(levelContainer[2].part[16].position, { duration: 0.2, y: -95, ease: "power1.out", repeat: 1, yoyo: true });
              } });
            } });
          } });
        } });
        gsap.to([levelContainer[2].part[17].part[5].rotation, levelContainer[2].part[17].part[8].rotation], { duration: 0.6, z: 0, ease: "power1.inOut" });
        gsap.to([levelContainer[2].part[17].part[7].rotation, levelContainer[2].part[17].part[10].rotation], { duration: 0.6, z: 1.7, ease: "power1.inOut" });
        levelContainer[2].part[17].handTween1.kill();
        levelContainer[2].part[17].handTween1 = null;
        levelContainer[2].part[17].handTween2.kill();
        levelContainer[2].part[17].handTween2 = null;
        gsap.to(levelContainer[2].part[17].part[3].rotation, { duration: 0.6, z: -3, ease: "power1.inOut" });
        gsap.to(levelContainer[2].part[17].part[4].rotation, { duration: 0.6, z: -3.5, ease: "power1.inOut", onComplete: function() {
          gsap.to(levelContainer[2].part[17].part[3].rotation, { duration: 0.3 + Math.random() * 0.5, z: -2.5, ease: "power1.inOut", repeat: -1, yoyo: true });
          gsap.to(levelContainer[2].part[17].part[4].rotation, { duration: 0.3 + Math.random() * 0.5, z: -3, ease: "power1.inOut", repeat: -1, yoyo: true });
          setTimeout(function() {
             if (bet == 0) {
               endLevel(false, 1);
             } else {
               endLevel(true, 1)
             }
          }, 2000);
        } });
      } });
    } });
  } });
}
function hideLoadingScreen() {
  gsap.to(loadingBar.text.scale, { duration: 0.3, x: 0, y: 0, ease: "power1.inOut", onComplete: function() {
    gsap.to(loadingBar.bar.scale, { duration: 0.2, x: 0, y: 0, ease: "power1.inOut", onComplete: function() {
      loadingBar.visible = false;
      showStartScreen();
    } });
  } });
}
function showStartScreen() {
  for (let i = 0; i < 4; i++) {
    gsap.to(levelScene[i].material, { duration: 1 + i, opacity: 1, ease: "power1.inOut" });
  }
  gsap.from(startScreenContainer.position, { duration: 0.8, y: -150, ease: "power2.out" });
  gsap.to(startScreenContainer.scale, { duration: 0.8, x: 1, ease: "back.out" });
  gsap.to(startScreenContainer.title.scale, { duration: 1, x: 1, ease: "back.out" });
  gsap.to(startScreenContainer.title.scale, { duration: 0.7, y: 1, ease: "back.out" });
  gsap.to(startScreenContainer.scale, { duration: 0.6, y: 1, ease: "back.out" });
  for (let i = 0; i < 7; i++) {
    gsap.to(startScreenContainer.text[i].scale, { duration: 0.5, y: 1, ease: "power2.out", delay: 0.4 + 0.05 * i });
  }
  gsap.to(startScreenContainer.button.scale, { duration: 0.3, y: 1, ease: "back.out", delay: 0.8 });
  gsap.to(startScreenContainer.button.scale, { duration: 0.5, x: 1, ease: "back.out", delay: 0.8, onComplete: function() {
    startScreenContainer.button.tween = gsap.to(startScreenContainer.button.scale, { duration: 0.6, x: 0.95, y: 0.95, ease: "power1.inOut", repeat: -1, yoyo: true });
    startScreenContainer.button.ready = true;
    document.body.addEventListener('touchstart', onDocumentTouchStart, false);
    document.body.addEventListener('mousedown', onDocumentMouseDown, false);
    //document.body.addEventListener('touchend', onDocumentTouchEnd, false);
  } });
}
function hideStartScreen() {
  //goFuture();
  
  startScreenContainer.button.tween.kill();
  startScreenContainer.button.tween = null;
  startScreenContainer.button.material = pic[57];
  startScreenContainer.button.scale.set(1, 0.87, 1);
  startScreenContainer.button.position.y += 3.5;
  gsap.to(startScreenContainer.button.scale, { duration: 0.2, x: startScreenContainer.button.scale.x * 0.8, y: startScreenContainer.button.scale.y * 0.8, ease: "power2.out", onComplete: function() {
    gsap.to(startScreenContainer.button.scale, { duration: 0.2, x: startScreenContainer.button.scale.x * 1.1, y: startScreenContainer.button.scale.y * 1.1, ease: "power2.in", onComplete: function() {
      gsap.to(startScreenContainer.position, { duration: 0.5, y: -800, ease: "power3.in" });
      gsap.to(startScreenContainer.scale, { duration: 0.5, x: startScreenContainer.button.scale.x * 2, y: startScreenContainer.button.scale.y * 2, ease: "power3.in", onComplete: function() {
        for (let i = 0; i < textArray[1].length; i++) {
          gsap.to(levelScene[0].title[i].material, { duration: 0.6, opacity: 1, ease: "power1.inOut", delay: 0.2 * i });
        }
        gsap.to(timeline.scale, { duration: 0.6, x: 1, y: 1, ease: "power1.inOut" });

        gsap.to(levelContainer[0].part[6].material, { duration: 1.5, opacity: 0, ease: "power1.inOut" });
        setTimeout(function() {
          requestAnimationFrame(function() {
            gsap.to(levelContainer[0].part[31].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", onComplete: function() {
              gsap.to(levelContainer[0].part[32].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", onComplete: function() {
                
              } });
            } });
            for (let i = 0; i < textArray[1].length; i++) {
              gsap.to(levelScene[0].title[i].material, { duration: 0.6, opacity: 0, ease: "power1.inOut", delay: 0.2 * i });
            }
            animateTimeLine(1, 2.5);
            gsap.to(levelContainer[0].part[24].position, { duration: 1.5, x: 10, ease: "none", delay: 2.5, onComplete: function() {
              levelContainer[0].part[24].legTween1.kill();
              levelContainer[0].part[24].legTween1 = null;
              levelContainer[0].part[24].legTween2.kill();
              levelContainer[0].part[24].legTween2 = null;
              levelContainer[0].part[24].legTween3.kill();
              levelContainer[0].part[24].legTween3 = null;
              levelContainer[0].part[24].legTween4.kill();
              levelContainer[0].part[24].legTween4 = null;
              levelContainer[0].part[24].handTween1.kill();
              levelContainer[0].part[24].handTween1 = null;
              levelContainer[0].part[24].handTween2.kill();
              levelContainer[0].part[24].handTween2 = null;
              levelContainer[0].part[24].handTween3.kill();
              levelContainer[0].part[24].handTween3 = null;
              levelContainer[0].part[24].handTween4.kill();
              levelContainer[0].part[24].handTween4 = null;
              gsap.to(levelScene[0].part[0].scale, { duration: 0.6, x: 0.2, y: 0.2, ease: "back.out" });
              gsap.from(levelScene[0].part[0].rotation, { duration: 0.6, z: 0.5, ease: "back.out", onComplete: function() {
                levelScene[0].part[0].button.ready = true;
                //gsap.to(levelContainer[0].part[36].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out" });
              } });
              gsap.to([levelContainer[0].part[24].part[3].rotation, levelContainer[0].part[24].part[5].rotation, levelContainer[0].part[24].part[11].rotation, levelContainer[0].part[24].part[12].rotation, levelContainer[0].part[24].part[9].rotation, levelContainer[0].part[24].part[14].rotation], { duration: 0.4, z: 0, ease: "power1.inOut" });
              gsap.to(levelContainer[0].part[24].part[6].rotation, { duration: 0.4, z: 0.5, ease: "power1.inOut" });
              gsap.to(levelContainer[0].part[24].part[8].rotation, { duration: 0.4, z: -0.5, ease: "power1.inOut",onComplete: function() {
                levelContainer[0].part[24].handTween1 = gsap.to(levelContainer[0].part[24].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
                levelContainer[0].part[24].handTween2 = gsap.to(levelContainer[0].part[24].part[5].rotation, { duration: 1 + Math.random() * 2, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
                levelContainer[0].part[24].handTween3 = gsap.to(levelContainer[0].part[24].part[6].rotation, { duration: 1 + Math.random() * 2, z: 0.6, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
                levelContainer[0].part[24].handTween4 = gsap.to(levelContainer[0].part[24].part[8].rotation, { duration: 1 + Math.random() * 2, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
              } });
            } });
          });
        }, 1300);
      } });
    } });
  } });
}
function startBet(level) {
  if (level == 0) {
    gsap.to(levelScene[0].part[0].button.scale, { duration: 0.15, x: 0.8, y: 0.8, ease: "power2.out", repeat: 1, yoyo: true, onComplete: function() {
      gsap.to(levelScene[0].part[0].scale, { duration: 0.4, x: 0, y: 0, ease: "back.in" });
      gsap.to(levelScene[0].part[0].rotation, { duration: 0.4, z: -0.5, ease: "back.in", onComplete: function() {
        gsap.to(levelContainer[0].part[33].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", onComplete: function() {
          gsap.to(levelContainer[0].part[34].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", onComplete: function() {
                
          } });
        } });
        for (let i = 31; i < 33; i++) {
          gsap.to(levelContainer[0].part[i].material, { duration: 0.6, opacity: 0, ease: "none", delay: 0.1 * (i - 31) });
        }
        
        //gsap.to(levelContainer[0].part[35].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out" });
        //gsap.to(levelContainer[0].part[36].material, { duration: 0.6, opacity: 0, ease: "none", delay: 1.5 });
        //gsap.to(levelContainer[0].part[35].material, { duration: 0.6, opacity: 0, ease: "none", delay: 1.6, onComplete: function() {
          gsap.to(levelScene[0].part[1].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 1.5, onComplete: function() {
            for (let i = 0; i < levelContainer[0].part[38].part.length; i++) {
              if (levelContainer[0].part[38].part[i].material !== undefined) {
                gsap.to(levelContainer[0].part[38].part[i].material.color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 0.5 });
              }
            }
            gsap.to(levelContainer[0].part[38].scale, { duration: 0.1, x: -0.38, y: 0.38, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 0.5 });
            gsap.to(levelScene[0].part[2].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 0.5 });
            for (let i = 0; i < levelContainer[0].part[37].part.length; i++) {
              if (levelContainer[0].part[37].part[i].material !== undefined) {
                gsap.to(levelContainer[0].part[37].part[i].material.color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 1.5 });
              }
            }
            gsap.to(levelContainer[0].part[37].scale, { duration: 0.1, x: 0.38, y: 0.38, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 1.5 });
            gsap.to(levelScene[0].part[3].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 1.5, onComplete: function() {
              levelScene[0].part[2].ready = true;
              levelScene[0].part[3].ready = true;
            } });
          } });
        //} });
      } });
    } });
  } else if (level == 1) {
    gsap.to(levelScene[1].part[0].button.scale, { duration: 0.15, x: 0.8, y: 0.8, ease: "power2.out", repeat: 1, yoyo: true, onComplete: function() {
      gsap.to(levelContainer[1].part[43].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", onComplete: function() {
        gsap.to(levelContainer[1].part[42].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", delay: 1 });
      } });
      gsap.to(levelScene[1].part[0].scale, { duration: 0.4, x: 0, y: 0, ease: "back.in" });
      gsap.to(levelScene[1].part[0].rotation, { duration: 0.4, z: -0.5, ease: "back.in", onComplete: function() {
        //gsap.to(levelContainer[1].part[44].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out" });
        //gsap.to(levelContainer[1].part[45].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", delay: 0.5 });
        gsap.to(levelContainer[1].part[40].material, { duration: 0.6, opacity: 0, ease: "none" });
        gsap.to(levelContainer[1].part[41].material, { duration: 0.6, opacity: 0, ease: "none", delay: 0.1, onComplete: function() {
          gsap.to(levelContainer[1].part[43].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", onComplete: function() {
            gsap.to(levelContainer[1].part[42].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", delay: 1 });
          } });
          
        } });
        gsap.to(levelScene[1].part[1].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 3, onComplete: function() {
          for (let i = 0; i < levelContainer[1].part[49].part.length; i++) {
            if (levelContainer[1].part[49].part[i].material !== undefined) {
              gsap.to(levelContainer[1].part[49].part[i].material.color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 0.5 });
            }
          }
          gsap.to(levelContainer[1].part[49].scale, { duration: 0.1, x: -0.21, y: 0.21, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 0.5 });
          gsap.to(levelScene[1].part[2].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 0.5 });
          for (let i = 0; i < levelContainer[1].part[50].part.length; i++) {
            if (levelContainer[1].part[50].part[i].material !== undefined) {
              gsap.to(levelContainer[1].part[50].part[i].material.color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 1.5 });
            }
          }
          gsap.to(levelContainer[1].part[50].scale, { duration: 0.1, x: 0.21, y: 0.21, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 1.5 });
          gsap.to(levelScene[1].part[3].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 1.5 });
          gsap.to(levelScene[1].part[4].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 2.5, onComplete: function() {
            levelScene[1].part[2].ready = true;
            levelScene[1].part[3].ready = true;
            levelScene[1].part[4].ready = true;
          } });
        } });
      } });
    } });
  } else if (level == 2) {
    gsap.to(levelScene[2].part[0].button.scale, { duration: 0.15, x: 0.8, y: 0.8, ease: "power2.out", repeat: 1, yoyo: true, onComplete: function() {
      gsap.to(levelScene[2].part[0].scale, { duration: 0.4, x: 0, y: 0, ease: "back.in" });
      gsap.to(levelScene[2].part[0].rotation, { duration: 0.4, z: -0.5, ease: "back.in", onComplete: function() {
        gsap.to(levelContainer[2].part[21].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", delay: 0.5 });
        gsap.to(levelContainer[2].part[20].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", delay: 1 });
        gsap.to(levelContainer[2].part[18].material, { duration: 0.6, opacity: 0, ease: "none" });
        gsap.to(levelContainer[2].part[19].material, { duration: 0.6, opacity: 0, ease: "none", delay: 0.1 });
        /*gsap.to(levelContainer[2].part[22].material, { duration: 0.6, opacity: 0, ease: "none", delay: 3 });
        gsap.to(levelContainer[2].part[23].material, { duration: 0.6, opacity: 0, ease: "none", delay: 3.1 });
        gsap.to(levelContainer[2].part[21].material, { duration: 0.6, opacity: 0, ease: "none", delay: 6 });
        gsap.to(levelContainer[2].part[20].material, { duration: 0.6, opacity: 0, ease: "none", delay: 6.1 });*/
        gsap.to(levelScene[2].part[1].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 1, onComplete: function() {
          gsap.to(levelScene[2].part[2].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 0.5 });
          for (let i = 0; i < levelContainer[2].part[11].part.length; i++) {
            if (levelContainer[2].part[11].part[i].material !== undefined) {
              gsap.to(levelContainer[2].part[11].part[i].material.color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 0.5 });
            }
          }
          for (let i = 0; i < levelContainer[2].part[12].part.length; i++) {
            if (levelContainer[2].part[12].part[i].material !== undefined) {
              gsap.to(levelContainer[2].part[12].part[i].material.color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 0.5 });
            }
          }
          for (let i = 0; i < levelContainer[2].part[15].part.length; i++) {
            if (levelContainer[2].part[15].part[i].material !== undefined) {
              gsap.to(levelContainer[2].part[15].part[i].material.color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 0.5 });
            }
          }
          gsap.to(levelContainer[2].part[11].scale, { duration: 0.1, x: -0.21, y: 0.21, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 0.5 });
          gsap.to(levelContainer[2].part[12].scale, { duration: 0.1, x: 0.21, y: 0.21, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 0.5 });
          gsap.to(levelContainer[2].part[15].scale, { duration: 0.1, x: -0.21, y: 0.21, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 0.5, onComplete: function() {
            for (let i = 0; i < levelContainer[2].part[11].part.length; i++) {
              if (levelContainer[2].part[11].part[i].material !== undefined) levelContainer[2].part[11].part[i].material.color.setHex(0xFFFFFF);
            }
            for (let i = 0; i < levelContainer[2].part[12].part.length; i++) {
              if (levelContainer[2].part[12].part[i].material !== undefined) levelContainer[2].part[12].part[i].material.color.setHex(0xFFFFFF);
            }
            for (let i = 0; i < levelContainer[2].part[15].part.length; i++) {
              if (levelContainer[2].part[15].part[i].material !== undefined) levelContainer[2].part[15].part[i].material.color.setHex(0xFFFFFF);
            }
          } });
          for (let i = 0; i < levelContainer[2].part[13].part.length; i++) {
            if (levelContainer[2].part[13].part[i].material !== undefined) {
              gsap.to(levelContainer[2].part[13].part[i].material.color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 1.5 });
            }
          }
          for (let i = 0; i < levelContainer[2].part[14].part.length; i++) {
            if (levelContainer[2].part[14].part[i].material !== undefined) {
              gsap.to(levelContainer[2].part[14].part[i].material.color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 1.5 });
            }
          }
          gsap.to(levelContainer[2].part[13].scale, { duration: 0.1, x: 0.21, y: 0.21, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 1.5 });
          gsap.to(levelContainer[2].part[14].scale, { duration: 0.1, x: -0.21, y: 0.21, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 1.5, onComplete: function() {
            for (let i = 0; i < levelContainer[2].part[13].part.length; i++) {
              if (levelContainer[2].part[13].part[i].material !== undefined) levelContainer[2].part[13].part[i].material.color.setHex(0xFFFFFF);
            }
            for (let i = 0; i < levelContainer[2].part[14].part.length; i++) {
              if (levelContainer[2].part[14].part[i].material !== undefined) levelContainer[2].part[14].part[i].material.color.setHex(0xFFFFFF);
            }
          } });
          gsap.to(levelScene[2].part[3].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 1.5, onComplete: function() {
            levelScene[2].part[2].ready = true;
            levelScene[2].part[3].ready = true;
          } });
        } });
      } });
    } });
  } else if (level == 3) {
    gsap.to(levelScene[3].part[0].button.scale, { duration: 0.15, x: 0.8, y: 0.8, ease: "power2.out", repeat: 1, yoyo: true, onComplete: function() {
      gsap.to(levelScene[3].part[0].scale, { duration: 0.4, x: 0, y: 0, ease: "back.in" });
      gsap.to(levelScene[3].part[0].rotation, { duration: 0.4, z: -0.5, ease: "back.in", onComplete: function() {
        //gsap.to(levelContainer[3].part[72].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out" });
        gsap.to(levelContainer[3].part[69].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", delay: 0.5 });
        gsap.to(levelContainer[3].part[70].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", delay: 1 });
        gsap.to(levelContainer[3].part[67].material, { duration: 0.6, opacity: 0, ease: "none" });
        gsap.to(levelContainer[3].part[68].material, { duration: 0.6, opacity: 0, ease: "none", delay: 0.1 });
       /* gsap.to(levelContainer[3].part[71].material, { duration: 0.6, opacity: 0, ease: "none", delay: 3 });
        gsap.to(levelContainer[3].part[72].material, { duration: 0.6, opacity: 0, ease: "none", delay: 3.1 });
        gsap.to(levelContainer[3].part[69].material, { duration: 0.6, opacity: 0, ease: "none", delay: 6.1 });
        gsap.to(levelContainer[3].part[70].material, { duration: 0.6, opacity: 0, ease: "none", delay: 6.1 });*/
        gsap.to(levelScene[3].part[1].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 3, onComplete: function() {
          for (let i = 372; i < 384; i++) {
            gsap.to(pic[i].color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 0.5 });
          }
          for (let i = 361; i < 367; i++) {
            gsap.to(pic[i].color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 0.5 });
          }
          gsap.to(levelContainer[3].part[60].scale, { duration: 0.1, x: -0.35, y: 0.35, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 0.5 });
          gsap.to(levelContainer[3].part[62].scale, { duration: 0.1, x: -0.5, y: 0.5, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 0.5 });
          gsap.to([levelContainer[3].part[63].scale, levelContainer[3].part[64].scale], { duration: 0.1, x: -0.22, y: 0.22, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 0.5 });

          gsap.to(levelScene[3].part[2].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 0.5 });
          for (let i = 384; i < 391; i++) {
            gsap.to(pic[i].color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 1.5 });
          }
          for (let i = 356; i < 361; i++) {
            gsap.to(pic[i].color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 1.5 });
          }
          for (let i = 367; i < 372; i++) {
            gsap.to(pic[i].color, { duration: 0.1, r: yellowColor.r, g: yellowColor.g, b: yellowColor.b, ease: "none", repeat: 5, yoyo: true, delay: 1.5 });
          }
          gsap.to(levelContainer[3].part[59].scale, { duration: 0.1, x: 0.35, y: 0.35, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 1.5 });
          gsap.to(levelContainer[3].part[61].scale, { duration: 0.1, x: 0.44, y: 0.44, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 1.5 });
          gsap.to([levelContainer[3].part[65].scale, levelContainer[3].part[66].scale], { duration: 0.1, x: 0.22, y: 0.22, ease: "power1.inOut", repeat: 5, yoyo: true, delay: 1.5 });
          gsap.to(levelScene[3].part[3].scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 1.5, onComplete: function() {
            levelScene[3].part[2].ready = true;
            levelScene[3].part[3].ready = true;
          } });
        } });
      } });
    } });
  }
}
function startGame(level) {
  if (level == 0) {
  	for (let i = 33; i < 35; i++) {
  		gsap.to(levelContainer[0].part[i].material, { duration: 0.6, opacity: 0, ease: "none", delay: 0.1 * (i - 33) });
  	}
    levelScene[0].part[2 + bet].material = pic[71 + bet];
    levelScene[0].part[2 + bet].scale.set(pic[71 + bet].map.image.width / pic[69 + bet].map.image.width, pic[71 + bet].map.image.height / pic[69 + bet].map.image.height, 1);
    gsap.to([levelScene[0].part[2].scale, levelScene[0].part[1].scale, levelScene[0].part[3].scale], { duration: 0.5, x: 0, y: 0, ease: "back.in", delay: 0.2, onComplete: function() {
      gsap.to(scoreBlock.scale, { duration: 0.6, x: 0.9, y: 0.9, ease: "back.out", onComplete: function() {
        levelContainer[0].part[38].visible = false;
        levelContainer[0].part[44].visible = true;
        gsap.to(levelContainer[0].part[44].part[0].rotation, { duration: 0.5, z: 0.5, ease: "power2.out" });
        gsap.to(levelContainer[0].part[44].part[8].rotation, { duration: 0.5, z: 2, ease: "power2.out" });
        gsap.to(levelContainer[0].part[44].part[6].rotation, { duration: 0.5, z: 4, ease: "power2.out", onComplete: function() {
          gsap.to([levelContainer[0].part[44].part[6].rotation, levelContainer[0].part[44].part[0].rotation, levelContainer[0].part[44].part[8].rotation], { duration: 0.3, z: 0, ease: "power2.out" });
          levelContainer[0].part[44].vector = new THREE.Vector3();
          levelContainer[0].part[44].part[7].getWorldPosition(levelContainer[0].part[44].vector);
          levelContainer[0].part[44].part[6].remove(levelContainer[0].part[44].part[7]);
          levelContainer[0].part[44].part[7].position.set(levelContainer[0].part[44].vector.x, levelContainer[0].part[44].vector.y, levelContainer[0].part[44].vector.z);
          levelContainer[0].part[44].part[7].scale.set(-0.36, 0.36, 1);
          levelContainer[0].add(levelContainer[0].part[44].part[7]);
          gsap.to(levelContainer[0].part[44].part[7].position, { duration: 1.6, x: 300, ease: "power1.out" });
          gsap.to(levelContainer[0].part[44].part[7].position, { duration: 0.8, y: 350, ease: "power1.out", repeat: 1, yoyo: true });
          gsap.to(levelContainer[0].part[44].part[7].rotation, { duration: 1.6, z: levelContainer[0].part[44].part[7].rotation.z - 2.5, ease: "power1.inOut" });
          gsap.to(levelContainer[0].part[44].part[7].scale, { duration: 1.6, x: levelContainer[0].part[44].part[7].scale.x * 0.5, y: levelContainer[0].part[44].part[7].scale.y * 0.5, ease: "power1.inOut", onComplete: function() {
            gsap.to([levelContainer[0].part[44].part[0].rotation, levelContainer[0].part[44].part[2].rotation], { duration: 1, z: -0.3, ease: "power1.inOut" });
            gsap.to(levelContainer[0].part[44].part[6].rotation, { duration: 1, z: -0.3, ease: "power1.inOut", onComplete: function() {
              gsap.to(levelContainer[0].part[44].part[6].rotation, { duration: 1, z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
              gsap.to(levelContainer[0].part[44].part[3].rotation, { duration: 1, z: -0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
              gsap.to(levelContainer[0].part[44].part[0].rotation, { duration: 1.5, z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
            } });
            levelContainer[0].part[43].part[0].tween.kill();
            levelContainer[0].part[43].part[0].tween = null;
            levelContainer[0].part[43].part[2].tween.kill();
            levelContainer[0].part[43].part[2].tween = null;
            levelContainer[0].part[42].part[0].tween.kill();
            levelContainer[0].part[42].part[0].tween = null;
            levelContainer[0].part[42].part[2].tween.kill();
            levelContainer[0].part[42].part[2].tween = null;
            gsap.to([levelContainer[0].part[43].part[0].rotation, levelContainer[0].part[43].part[2].rotation, levelContainer[0].part[42].part[0].rotation, levelContainer[0].part[42].part[2].rotation], { duration: 1, z: 0.3, ease: "power1.inOut" });
            gsap.to([levelContainer[0].part[43].part[3].rotation, levelContainer[0].part[42].part[3].rotation, levelContainer[0].part[42].part[6].rotation], { duration: 2, z: 0, ease: "power1.inOut" });
            gsap.to(levelContainer[0].part[43].part[6].rotation, { duration: 2, z: 0.8, ease: "power1.inOut" });
            gsap.to(levelContainer[0].part[43].part[3].position, { duration: 2, y: levelContainer[0].part[43].part[3].position.y + 23, ease: "power1.inOut" });
            gsap.to(levelContainer[0].part[42].part[3].position, { duration: 2, y: levelContainer[0].part[42].part[3].position.x + 7, ease: "power1.inOut" });
            gsap.to(levelContainer[0].part[42].part[6].position, { duration: 2, y: levelContainer[0].part[42].part[6].position.y - 5, ease: "power1.inOut" });
            gsap.to(levelContainer[0].part[43].part[6].position, { duration: 2, x: levelContainer[0].part[43].part[6].position.x - 30,  y: levelContainer[0].part[43].part[6].position.y + 35, ease: "power1.inOut", onComplete: function() {
              gsap.to([levelContainer[0].part[43].part[0].rotation, levelContainer[0].part[43].part[2].rotation], { duration: 2 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
              gsap.to([levelContainer[0].part[42].part[0].rotation, levelContainer[0].part[42].part[2].rotation], { duration: 2 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
              gsap.to([levelContainer[0].part[43].part[3].rotation, levelContainer[0].part[43].part[3].rotation], { duration: 2 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
              gsap.to([levelContainer[0].part[43].part[6].rotation, levelContainer[0].part[43].part[6].rotation], { duration: 2 + Math.random() * 2, z: 0.5, ease: "power1.inOut", repeat: -1, yoyo: true });
            } });
          } });
        } });
      } });
    } })
    levelContainer[0].part[46].moveTween = gsap.to(levelContainer[0].part[46].position, { duration: 5, x: 0, ease: "none" });
    setTimeout(function() {
      requestAnimationFrame(function() {
        levelContainer[0].part[37].visible = false;
        levelContainer[0].part[45].visible = true;
        gsap.to(levelContainer[0].part[45].part[0].rotation, { duration: 0.5, z: 0.5, ease: "power2.out" });
        gsap.to(levelContainer[0].part[45].part[8].rotation, { duration: 0.5, z: 2, ease: "power2.out" });
        gsap.to(levelContainer[0].part[45].part[6].rotation, { duration: 0.5, z: 3.2, ease: "power2.out", onComplete: function() {
          gsap.to([levelContainer[0].part[45].part[6].rotation, levelContainer[0].part[45].part[0].rotation, levelContainer[0].part[45].part[8].rotation], { duration: 0.3, z: 0, ease: "power2.out" });
          levelContainer[0].part[45].vector = new THREE.Vector3();
          levelContainer[0].part[45].part[7].getWorldPosition(levelContainer[0].part[45].vector);
          levelContainer[0].part[45].part[6].remove(levelContainer[0].part[45].part[7]);
          levelContainer[0].part[45].part[7].position.set(levelContainer[0].part[45].vector.x, levelContainer[0].part[45].vector.y, levelContainer[0].part[45].vector.z);
          levelContainer[0].part[45].part[7].scale.set(-0.36, 0.36, 1);
          levelContainer[0].part[45].part[7].rotation.z += 0.7;
          levelContainer[0].add(levelContainer[0].part[45].part[7]);
          gsap.to(levelContainer[0].part[45].part[7].position, { duration: 1.6, x: 20, z: -10.4, ease: "power1.out" });
          gsap.to(levelContainer[0].part[45].part[7].position, { duration: 0.8, y: 350, ease: "power1.out", onComplete: function() {
            gsap.to(levelContainer[0].part[45].part[7].position, { duration: 0.8, y: 270, ease: "power1.in" });
          } });
          gsap.to(levelContainer[0].part[45].part[7].rotation, { duration: 1.6, z: levelContainer[0].part[45].part[7].rotation.z + 2.7, ease: "power1.inOut" });
          gsap.to(levelContainer[0].part[45].part[7].scale, { duration: 1.6, x: levelContainer[0].part[45].part[7].scale.x * 0.8, y: levelContainer[0].part[45].part[7].scale.y * 0.8, ease: "power1.inOut", onComplete: function() {
            for (let i = 10; i < 23; i++) {
              levelContainer[0].part[i].tween.kill();
              levelContainer[0].part[i].tween = null;
              gsap.to(levelContainer[0].part[i].position, { duration: 3, x: levelContainer[0].part[i].position.x + 600, ease: "none" });
            }
            levelContainer[0].part[46].moveTween.kill();
            levelContainer[0].part[46].moveTween = null;
            levelContainer[0].part[46].headTween.kill();
            levelContainer[0].part[46].headTween = null;
            levelContainer[0].part[46].bodyTween.kill();
            levelContainer[0].part[46].bodyTween = null;
            levelContainer[0].part[37].handTween1.kill();
            levelContainer[0].part[37].handTween1 = null;
            levelContainer[0].part[37].handTween2.kill();
            levelContainer[0].part[37].handTween2 = null;
            levelContainer[0].part[37].handTween3.kill();
            levelContainer[0].part[37].handTween3 = null;
            levelContainer[0].part[37].handTween4.kill();
            levelContainer[0].part[37].handTween4 = null;
            levelContainer[0].part[37].bodyTween.kill();
            levelContainer[0].part[37].bodyTween = null;
            levelContainer[0].remove(levelContainer[0].part[45].part[7]);
            levelContainer[0].part[45].part[7].position.x += 35;
            levelContainer[0].part[45].part[7].position.z = 0.002;
            levelContainer[0].part[45].part[7].scale.set(-1, 1, 1);
            levelContainer[0].part[45].part[7].rotation.z -= levelContainer[0].part[46].rotation.z;
            levelContainer[0].part[46].add(levelContainer[0].part[45].part[7]);
            gsap.to(levelContainer[0].part[45].part[7].material.map.offset, { duration: 0.1, x: 0.2, ease: "power1.out" });
            gsap.to(levelContainer[0].part[46].rotation, { duration: 1, z: 1.3, ease: "power2.out", onComplete: function() {
              gsap.to(levelContainer[0].part[46].rotation, { duration: 0.5, z: 2.8, ease: "power2.in" });
              gsap.to(levelContainer[0].part[46].position, { duration: 0.5, y: 180, ease: "power2.in" });
            } });
            levelContainer[0].part[45].visible = false;
            levelContainer[0].part[37].part[16].visible = false;
            levelContainer[0].part[37].part[0].rotation.z = 0;
            levelContainer[0].part[37].part[3].rotation.z = 0;
            levelContainer[0].part[37].part[5].rotation.z = 0;
            levelContainer[0].part[37].part[6].rotation.z = 0;
            levelContainer[0].part[37].part[15].rotation.z = 0;
            levelContainer[0].part[37].part[6].position.y -= 10;
            levelContainer[0].part[37].part[6].position.x += 10;
            levelContainer[0].part[37].visible = true;
            gsap.to(levelContainer[0].part[37].position, { duration: 0.3, y: levelContainer[0].part[37].position.y + 40, ease: "power1.out", repeat: -1, yoyo: true });
            gsap.to(levelContainer[0].part[37].part[3].rotation, { duration: 0.3, z: -1, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[0].part[37].part[6].rotation, { duration: 0.3, z: 1, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[0].part[37].part[6].position, { duration: 0.3, x: levelContainer[0].part[37].part[6].position.x - 15, y: levelContainer[0].part[37].part[6].position.y + 10, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to([levelContainer[0].part[37].part[9].rotation, levelContainer[0].part[37].part[11].rotation, levelContainer[0].part[37].part[12].rotation, levelContainer[0].part[37].part[14].rotation], { duration: 0.3, z: 0, ease: "power1.out", repeat: -1, yoyo: true });
            gsap.to([levelContainer[0].part[41].part[9].rotation, levelContainer[0].part[41].part[12].rotation, levelContainer[0].part[40].part[9].rotation, levelContainer[0].part[40].part[12].rotation], { duration: 0.2, z: -0.3, ease: "power1.out" });
            gsap.to([levelContainer[0].part[41].part[11].rotation, levelContainer[0].part[41].part[14].rotation, levelContainer[0].part[40].part[11].rotation, levelContainer[0].part[40].part[14].rotation], { duration: 0.2, z: 0.6, ease: "power1.out", onComplete: function() {
              gsap.to(levelContainer[0].part[40].position, { duration: 0.4, y: levelContainer[0].part[40].position.y + 30, ease: "power1.out", repeat: -1, yoyo: true });
              gsap.to([levelContainer[0].part[40].part[9].rotation, levelContainer[0].part[40].part[11].rotation, levelContainer[0].part[40].part[12].rotation, levelContainer[0].part[40].part[14].rotation], { duration: 0.4, z: 0, ease: "power1.out", repeat: -1, yoyo: true });
              gsap.to(levelContainer[0].part[41].position, { duration: 0.35, y: levelContainer[0].part[41].position.y + 30, ease: "power1.out", repeat: -1, yoyo: true });
              gsap.to([levelContainer[0].part[41].part[9].rotation, levelContainer[0].part[41].part[11].rotation, levelContainer[0].part[41].part[12].rotation, levelContainer[0].part[41].part[14].rotation], { duration: 0.35, z: 0, ease: "power1.out", repeat: -1, yoyo: true });
              setTimeout(function() {
                if (bet == 0) {
                  endLevel(false, 0);
                } else {
                  endLevel(true, 0)
                }
              }, 1500);
            } });
          } });
        } });
      });
    }, 2900);
  } else if (level == 1) {
  	gsap.to(levelContainer[1].part[43].material, { duration: 0.6, opacity: 0, ease: "none" });
    gsap.to(levelContainer[1].part[42].material, { duration: 0.6, opacity: 0, ease: "none", delay: 0.2 });

    levelScene[1].part[2 + bet].material = pic[90 + bet];
    levelScene[1].part[2 + bet].scale.set(pic[90 + bet].map.image.width / pic[83 + bet].map.image.width, pic[90 + bet].map.image.height / pic[83 + bet].map.image.height, 1);
    gsap.to([levelScene[1].part[2].scale, levelScene[1].part[1].scale, levelScene[1].part[3].scale, levelScene[1].part[4].scale], { duration: 0.5, x: 0, y: 0, ease: "back.in", delay: 0.2, onComplete: function() {
      scoreBlock.position.x += 249;
      resultBlock.position.x += 249;
      gsap.to(scoreBlock.scale, { duration: 0.6, x: 0.9, y: 0.9, ease: "back.out", onComplete: function() {
        gsap.to(levelContainer[1].part[51].rotation, { duration: 2, z: -0.8, ease: "none", repeat: 2 });
        gsap.to(pic[161], { duration: 1, opacity: 1, ease: "power1.inOut", repeat: 5, yoyo: true });
        gsap.to(levelScene[1].material.color, { duration: 1, r: blueColor.r, g: blueColor.g, b: blueColor.b, ease: "power1.inOut", repeat: 5, yoyo: true, onComplete: function() {
          gsap.to(levelContainer[1].part[47].position, { duration: 0.3, y: levelContainer[1].part[47].position.y - 10, ease: "power1.inOut", onComplete: function() {
            gsap.to([levelContainer[1].part[47].part[7].scale, levelContainer[1].part[47].part[12].scale], { duration: 0.2, x: 0.6, y: 0.6, ease: "power1.inOut" });
            levelContainer[1].part[47].handTween1.kill();
            levelContainer[1].part[47].handTween1 = null;
            levelContainer[1].part[47].handTween2.kill();
            levelContainer[1].part[47].handTween2 = null;
            gsap.to([levelContainer[1].part[47].part[6].rotation, levelContainer[1].part[47].part[11].rotation], { duration: 0.6, z: -0.5, ease: "power1.inOut" });
            gsap.to([levelContainer[1].part[47].part[6].position, levelContainer[1].part[47].part[11].position], { duration: 0.6, y: levelContainer[1].part[47].part[6].position.y - 10, ease: "power1.inOut" });
            gsap.to(levelContainer[1].part[47].position, { duration: 0.6, y: levelContainer[1].part[47].position.y + 15, ease: "power1.inOut", onComplete: function() {
              levelContainer[1].part[49].nandTween.kill();
              levelContainer[1].part[49].nandTween = null;
              levelContainer[1].part[49].bodyTween.kill();
              levelContainer[1].part[49].bodyTween = null;
              levelContainer[1].part[49].hitTween.kill();
              levelContainer[1].part[49].hitTween = null;
              levelContainer[1].part[49].jumpTween.kill();
              levelContainer[1].part[49].jumpTween = null;
              levelContainer[1].part[50].nandTween.kill();
              levelContainer[1].part[50].nandTween = null;
              levelContainer[1].part[50].bodyTween.kill();
              levelContainer[1].part[50].bodyTween = null;
              levelContainer[1].part[50].hitTween.kill();
              levelContainer[1].part[50].hitTween = null;
              levelContainer[1].part[50].jumpTween.kill();
              levelContainer[1].part[50].jumpTween = null;
              gsap.to([levelContainer[1].part[50].part[0].position, levelContainer[1].part[49].part[0].position], { duration: 0.1, y: -20, ease: "power2.in", onComplete: function() {
                gsap.to([levelContainer[1].part[50].part[0].position, levelContainer[1].part[49].part[0].position], { duration: 0.1, y: 0, ease: "power2.out" });
                gsap.to(levelContainer[1].part[49].position, { duration: 0.4, x: -45, ease: "none" });
                gsap.to(levelContainer[1].part[50].position, { duration: 0.4, x: 45, ease: "none" });
                gsap.to([levelContainer[1].part[50].position, levelContainer[1].part[49].position], { duration: 0.2, y: -30, ease: "power1.out", onComplete: function() {
                  gsap.to([levelContainer[1].part[50].position, levelContainer[1].part[49].position], { duration: 0.2, y: -40, ease: "power1.in" });
                } });
                gsap.to([levelContainer[1].part[50].part[3].rotation, levelContainer[1].part[49].part[3].rotation], { duration: 0.3, z: 0, ease: "power1.inOut", onComplete: function() {
                  gsap.to([levelContainer[1].part[50].part[3].rotation, levelContainer[1].part[49].part[3].rotation], { duration: 0.3, z: -2.5, ease: "power1.in", onComplete: function() {
                    gsap.to([levelContainer[1].part[50].part[5].rotation, levelContainer[1].part[49].part[5].rotation], { duration: 0.6, z: -30, ease: "none" });
                    gsap.to(levelContainer[1].part[50].part[9].position, { duration: 0.6, x: 1000, y: -400, ease: "none" });
                    gsap.to(levelContainer[1].part[50].part[6].rotation, { duration: 0.3, z: 0.6, ease: "none", onComplete: function() {
                      gsap.to([levelContainer[1].part[50].part[0].rotation, levelContainer[1].part[49].part[0].rotation, levelContainer[1].part[50].part[3].rotation, levelContainer[1].part[49].part[3].rotation, levelContainer[1].part[50].part[6].rotation, levelContainer[1].part[49].part[6].rotation], { duration: 0.6, z: 0, ease: "none", delay: 0.5, onComplete: function() {
                        gsap.to(levelContainer[1].part[50].part[6].rotation, { duration: 0.5 + Math.random(), z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
                        gsap.to(levelContainer[1].part[49].part[6].rotation, { duration: 0.5 + Math.random(), z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
                        gsap.to([levelContainer[1].part[50].part[3].position, levelContainer[1].part[49].part[3].position], { duration: 0.4, x: levelContainer[1].part[49].part[3].position.x + 20, ease: "power1.inOut" });
                        gsap.to([levelContainer[1].part[50].part[3].rotation, levelContainer[1].part[49].part[3].rotation], { duration: 0.4, z: -1.5, ease: "power1.inOut", onComplete: function() {
                          gsap.to([levelContainer[1].part[47].part[6].rotation, levelContainer[1].part[47].part[11].rotation], { duration: 0.4, z: -0.3, ease: "power1.inOut", onComplete: function() {
                            gsap.to([levelContainer[1].part[50].part[3].rotation, levelContainer[1].part[49].part[3].rotation], { duration: 0.4, z: -1.8, ease: "power1.inOut" });
                            gsap.to([levelContainer[1].part[47].part[6].rotation, levelContainer[1].part[47].part[11].rotation], { duration: 0.3, z: -0.6, ease: "power1.inOut", onComplete: function() {
                              gsap.to([levelContainer[1].part[47].part[6].rotation, levelContainer[1].part[47].part[11].rotation], { duration: 0.6, z: -0.3, ease: "power1.inOut" });
                              levelContainer[1].part[47].part[3].remove(levelContainer[1].part[47].part[7]);
                              levelContainer[1].part[47].part[6].remove(levelContainer[1].part[47].part[12]);
                              levelContainer[1].part[47].part[7].position.set(-38, 108, -6.02);
                              levelContainer[1].part[47].part[7].rotation.z = -0.28;
                              levelContainer[1].part[47].part[7].scale.set(0.121, 0.121, 0.2);
                              levelContainer[1].part[47].part[12].position.set(38, 108, -6);
                              levelContainer[1].part[47].part[12].rotation.z = 0.28;
                              levelContainer[1].part[47].part[12].scale.set(0.121, 0.121, 0.2);
                              levelContainer[1].add(levelContainer[1].part[47].part[7], levelContainer[1].part[47].part[12]);
                              gsap.to(levelContainer[1].part[47].part[7].position, { duration: 0.5, y: 150, ease: "power1.out", onComplete: function() {
                                gsap.to(levelContainer[1].part[47].part[7].position, { duration: 0.5, y: 29, ease: "power1.in" });
                              } });
                              gsap.to(levelContainer[1].part[47].part[7].position, { duration: 1, x: 17, ease: "none" });
                              gsap.to(levelContainer[1].part[47].part[7].rotation, { duration: 1, z: -Math.PI * 10 - 0.6, ease: "none" });
                              gsap.to(levelContainer[1].part[47].part[12].position, { duration: 0.5, y: 150, ease: "power1.out", onComplete: function() {
                                gsap.to(levelContainer[1].part[47].part[12].position, { duration: 0.5, y: 31, ease: "power1.in", onComplete: function() {
                                  levelContainer[1].remove(levelContainer[1].part[47].part[7], levelContainer[1].part[47].part[12]);
                                  levelContainer[1].part[47].part[7].position.set(-170, -140, 0.001);
                                  levelContainer[1].part[47].part[7].scale.set(0.6, 0.6, 1);
                                  levelContainer[1].part[47].part[7].rotation.z = 1.5;
                                  levelContainer[1].part[47].part[12].position.set(-170, -140, 0.001);
                                  levelContainer[1].part[47].part[12].scale.set(0.6, 0.6, 1);
                                  levelContainer[1].part[47].part[12].rotation.z = 1.5;
                                  levelContainer[1].part[49].part[3].add(levelContainer[1].part[47].part[12]);
                                  levelContainer[1].part[50].part[3].add(levelContainer[1].part[47].part[7]);
                                  gsap.to(levelContainer[1].part[50].part[3].rotation, { duration: 0.5 + Math.random(), z: -2, ease: "power1.inOut", repeat: -1, yoyo: true });
                                  gsap.to(levelContainer[1].part[49].part[3].rotation, { duration: 0.5 + Math.random(), z: -2, ease: "power1.inOut", repeat: -1, yoyo: true });
                                  gsap.to(levelContainer[1].part[50].part[0].rotation, { duration: 0.5 + Math.random(), z: -0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
                                  gsap.to(levelContainer[1].part[49].part[0].rotation, { duration: 0.5 + Math.random(), z: -0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
                                  for (let i = 9; i < 35; i++) {
                                    gsap.to(levelContainer[1].part[i].position, { duration: 0.1 + Math.random() * 0.2, y: levelContainer[1].part[i].position.y + 3 + Math.random() * 3, ease: "power1.inOut", repeat: -1, yoyo: true });
                                  }
                                  setTimeout(function() {
                                    if (bet == 0 || bet == 1) {
                                      endLevel(false, 1);
                                    } else {
                                      endLevel(true, 1)
                                    }
                                  }, 2000);
                                } });
                              } });
                              gsap.to(levelContainer[1].part[47].part[12].position, { duration: 1, x: -19, ease: "none" });
                              gsap.to(levelContainer[1].part[47].part[12].rotation, { duration: 1, z: Math.PI * 10 + 0.6, ease: "none" });
                            } });
                          } });
                        } });
                      } });
                    } });
                    gsap.to(levelContainer[1].part[50].part[9].rotation, { duration: 1, z: -10, ease: "none" });
                    gsap.to([levelContainer[1].part[50].part[5].position, levelContainer[1].part[49].part[5].position], { duration: 0.6, x: -3000, y: 0, ease: "none", onComplete: function() {
                      levelContainer[1].part[50].part[5].visible = false;
                      levelContainer[1].part[49].part[5].visible = false;
                      levelContainer[1].part[50].part[9].visible = true;
                    } });
                  } });
                } });
              } });
            } });
          } });
        } });
      } });
    } });
  } else if (level == 2) {
  	gsap.to(levelContainer[2].part[21].material, { duration: 0.6, opacity: 0, ease: "none" });
    gsap.to(levelContainer[2].part[20].material, { duration: 0.6, opacity: 0, ease: "none", delay: 0.1 });

    levelScene[2].part[2 + bet].material = pic[93 + bet];
    levelScene[2].part[2 + bet].scale.set(pic[93 + bet].map.image.width / pic[86 + bet].map.image.width, pic[93 + bet].map.image.height / pic[86 + bet].map.image.height, 1);
    gsap.to([levelScene[2].part[2].scale, levelScene[2].part[1].scale, levelScene[2].part[3].scale], { duration: 0.5, x: 0, y: 0, ease: "back.in", delay: 0.2, onComplete: function() {
      scoreBlock.position.x += 249;
      resultBlock.position.x += 249;
      gsap.to(scoreBlock.scale, { duration: 0.6, x: 0.9, y: 0.9, ease: "back.out", onComplete: function() {
        onGoal = true;
      } });
    } });
  } else if (level == 3) {
  	gsap.to(levelContainer[3].part[69].material, { duration: 0.6, opacity: 0, ease: "none" });
    gsap.to(levelContainer[3].part[70].material, { duration: 0.6, opacity: 0, ease: "none", delay: 0.1 });

  	//
    levelScene[3].part[2 + bet].material = pic[95 + bet];
    levelScene[3].part[2 + bet].scale.set(pic[95 + bet].map.image.width / pic[88 + bet].map.image.width, pic[95 + bet].map.image.height / pic[88 + bet].map.image.height, 1);
    gsap.to([levelScene[3].part[2].scale, levelScene[3].part[1].scale, levelScene[3].part[3].scale], { duration: 0.5, x: 0, y: 0, ease: "back.in", delay: 0.2, onComplete: function() {
    scoreBlock.position.x += 249;
    resultBlock.position.x += 249;
    gsap.to(scoreBlock.scale, { duration: 0.6, x: 0.9, y: 0.9, ease: "back.out", onComplete: function() {
      levelContainer[3].part[59].hitTween1.kill();
      levelContainer[3].part[59].hitTween1 = null;
      levelContainer[3].part[59].hitTween2.kill();
      levelContainer[3].part[59].hitTween2 = null;
      levelContainer[3].part[59].hitTween3.kill();
      levelContainer[3].part[59].hitTween3 = null;
      levelContainer[3].part[59].jumpTween.kill();
      levelContainer[3].part[59].jumpTween = null;
      levelContainer[3].part[61].hitTween1.kill();
      levelContainer[3].part[61].hitTween1 = null;
      levelContainer[3].part[61].hitTween2.kill();
      levelContainer[3].part[61].hitTween2 = null;
      levelContainer[3].part[61].hitTween3.kill();
      levelContainer[3].part[61].hitTween3 = null;
      levelContainer[3].part[61].jumpTween.kill();
      levelContainer[3].part[61].jumpTween = null;
     
      gsap.to([levelContainer[3].part[59].part[2].rotation, levelContainer[3].part[59].part[0].rotation, levelContainer[3].part[61].part[0].rotation, levelContainer[3].part[59].part[3].rotation, levelContainer[3].part[61].part[2].rotation, levelContainer[3].part[61].part[3].rotation], { duration: 0.2, z: 0, ease: "power2.inOut" });
      gsap.to(levelContainer[3].part[59].part[0].position, { duration: 0.2, y: -20, ease: "power2.in", onComplete: function() {
        gsap.to(levelContainer[3].part[59].part[0].position, { duration: 1, y: 0, ease: "power2.out" });
        gsap.to(levelContainer[3].part[59].part[2].rotation, { duration: 0.5, z: -3, ease: "power2.out", repeat: 1, yoyo: true });
        gsap.to(levelContainer[3].part[59].part[3].rotation, { duration: 0.5, z: -2.2, ease: "power2.out", repeat: 1, yoyo: true });

        gsap.to(levelContainer[3].part[59].position, { duration: 1, x: 0, ease: "none" });
        gsap.to(levelContainer[3].part[59].position, { duration: 0.5, y: 100, ease: "power2.out", repeat: 1, yoyo: true, onComplete: function() {
          gsap.to(levelContainer[3].part[59].position, { duration: 0.4, x: 40, ease: "none" });
          gsap.to(levelContainer[3].part[59].position, { duration: 0.2, y: 30, ease: "power2.out", repeat: 1, yoyo: true, onComplete: function() {
            gsap.to(levelContainer[3].part[59].part[3].rotation, { duration: 0.5, z: -2.5, ease: "power1.inOut", onComplete: function() {
              gsap.to(levelContainer[3].part[59].part[2].rotation, { duration: 0.5 + Math.random(), z: -0.7, ease: "none", repeat: -1, yoyo: true });
              gsap.to(levelContainer[3].part[59].part[3].rotation, { duration: 0.5 + Math.random(), z: -2.7, ease: "none", repeat: -1, yoyo: true });

            } });
            
          } });
        } });
      } });
      gsap.to(levelContainer[3].part[61].part[0].position, { duration: 0.2, y: -20, ease: "power2.in", onComplete: function() {
        gsap.to(levelContainer[3].part[61].part[0].position, { duration: 1, y: 0, ease: "power2.out" });
        gsap.to(levelContainer[3].part[61].part[2].rotation, { duration: 0.5, z: -3, ease: "power2.out", repeat: 1, yoyo: true });
        gsap.to(levelContainer[3].part[61].part[3].rotation, { duration: 0.5, z: -2.2, ease: "power2.out", repeat: 1, yoyo: true });
        gsap.to(levelContainer[3].part[61].position, { duration: 1, x: -30, ease: "none" });
        gsap.to(levelContainer[3].part[61].position, { duration: 0.5, y: 120, ease: "power2.out", repeat: 1, yoyo: true, onComplete: function() {
          levelContainer[3].part[60].hitTween1.kill();
          levelContainer[3].part[60].hitTween1 = null;
          levelContainer[3].part[60].hitTween2.kill();
          levelContainer[3].part[60].hitTween2 = null;
          levelContainer[3].part[60].hitTween3.kill();
          levelContainer[3].part[60].hitTween3 = null;
          levelContainer[3].part[60].jumpTween.kill();
          levelContainer[3].part[60].jumpTween = null;
          levelContainer[3].part[62].hitTween1.kill();
          levelContainer[3].part[62].hitTween1 = null;
          levelContainer[3].part[62].hitTween2.kill();
          levelContainer[3].part[62].hitTween2 = null;
          levelContainer[3].part[62].hitTween3.kill();
          levelContainer[3].part[62].hitTween3 = null;
          levelContainer[3].part[62].jumpTween.kill();
          levelContainer[3].part[62].jumpTween = null;
          gsap.to(levelContainer[3].part[62].part[0].rotation, { duration: 0.6, z: -1.5, ease: "power1.inOut" });
          gsap.to(levelContainer[3].part[62].part[4].rotation, { duration: 0.6, z: 1.8, ease: "power2.in" });
          gsap.to(levelContainer[3].part[62].part[4].position, { duration: 0.6, x: -150, y: -60, ease: "power2.in" });
          gsap.to(levelContainer[3].part[62].part[0].position, { duration: 0.6, x: 200, ease: "power1.in" });
          gsap.to(levelContainer[3].part[62].part[0].position, { duration: 0.3, y: 150, ease: "power1.out", onComplete: function() {
            gsap.to(levelContainer[3].part[62].part[0].position, { duration: 0.3, y: -30, ease: "power1.in" });
          } });
          gsap.to(levelContainer[3].part[60].part[0].rotation, { duration: 0.6, z: -3, ease: "power1.inOut" });
          gsap.to(levelContainer[3].part[60].part[4].rotation, { duration: 0.6, z: 1.8, ease: "power2.in" });
          gsap.to(levelContainer[3].part[60].part[5].rotation, { duration: 1, z: 0.6, ease: "power2.in" });
          gsap.to(levelContainer[3].part[60].part[6].rotation, { duration: 0.8, z: -0.6, ease: "power2.in" });
          gsap.to(levelContainer[3].part[60].part[4].position, { duration: 0.6, x: -150, y: -60, ease: "power2.in" });
          gsap.to(levelContainer[3].part[60].part[0].position, { duration: 0.3, y: 150, ease: "power1.out", onComplete: function() {
            gsap.to(levelContainer[3].part[60].part[0].position, { duration: 0.3, y: -30, ease: "power1.in" });
          } });
          gsap.to(levelContainer[3].part[61].position, { duration: 0.4, x: 90, ease: "none" });
          gsap.to(levelContainer[3].part[61].position, { duration: 0.2, y: 30, ease: "power2.out", repeat: 1, yoyo: true, onComplete: function() {
              levelContainer[3].part[63].handTween1.kill();
              levelContainer[3].part[63].handTween1 = null;
              levelContainer[3].part[63].handTween2.kill();
              levelContainer[3].part[63].handTween2 = null;
              levelContainer[3].part[63].headTween.kill();
              levelContainer[3].part[63].headTween = null;
              levelContainer[3].part[63].bodyTween.kill();
              levelContainer[3].part[63].bodyTween = null;
              levelContainer[3].part[64].handTween1.kill();
              levelContainer[3].part[64].handTween1 = null;
              levelContainer[3].part[64].handTween2.kill();
              levelContainer[3].part[64].handTween2 = null;
              levelContainer[3].part[64].headTween.kill();
              levelContainer[3].part[64].headTween = null;
              levelContainer[3].part[64].bodyTween.kill();
              levelContainer[3].part[64].bodyTween = null;
              levelContainer[3].part[65].handTween1.kill();
              levelContainer[3].part[65].handTween1 = null;
              levelContainer[3].part[65].handTween2.kill();
              levelContainer[3].part[65].handTween2 = null;
              levelContainer[3].part[66].handTween1.kill();
              levelContainer[3].part[66].handTween1 = null;
              levelContainer[3].part[66].handTween2.kill();
              levelContainer[3].part[66].handTween2 = null;
              gsap.to([levelContainer[3].part[64].part[4].rotation, levelContainer[3].part[64].part[3].rotation, levelContainer[3].part[63].part[3].rotation, levelContainer[3].part[63].part[4].rotation, levelContainer[3].part[63].part[0].rotation, levelContainer[3].part[63].part[2].rotation, levelContainer[3].part[64].part[0].rotation, levelContainer[3].part[64].part[2].rotation], { duration: 1, z: 0.3, ease: "power1.inOut", onComplete: function() {
                gsap.to(levelContainer[3].part[63].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[63].part[4].rotation, { duration: 0.5 + Math.random(), z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[63].part[0].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[63].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[64].part[3].rotation, { duration: 0.5 + Math.random(), z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[64].part[4].rotation, { duration: 0.5 + Math.random(), z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[64].part[0].rotation, { duration: 0.5 + Math.random(), z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[64].part[2].rotation, { duration: 0.5 + Math.random(), z: 0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
              } });
              gsap.to([levelContainer[3].part[65].part[3].rotation, levelContainer[3].part[65].part[4].rotation, levelContainer[3].part[66].part[3].rotation, levelContainer[3].part[66].part[4].rotation], { duration: 0.2, z: -3, ease: "power1.inOut", onComplete: function() {
                gsap.to(levelContainer[3].part[65].part[3].rotation, { duration: 0.3 + Math.random() * 0.5, z: -2.5, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[65].part[4].rotation, { duration: 0.3 + Math.random() * 0.5, z: -2.5, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[66].part[3].rotation, { duration: 0.3 + Math.random() * 0.5, z: -2.5, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[66].part[4].rotation, { duration: 0.3 + Math.random() * 0.5, z: -2.5, ease: "power1.inOut", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[65].position, { duration: 0.2, y: levelContainer[3].part[65].position.y + 15, ease: "power1.out", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[66].position, { duration: 0.23, y: levelContainer[3].part[66].position.y + 15, ease: "power1.out", repeat: -1, yoyo: true });
              } });
              gsap.to(levelContainer[3].part[61].part[3].rotation, { duration: 0.5, z: -2.5, ease: "power1.inOut", onComplete: function() {
                gsap.to(levelContainer[3].part[61].part[2].rotation, { duration: 0.5 + Math.random(), z: -0.3, ease: "none", repeat: -1, yoyo: true });
                gsap.to(levelContainer[3].part[61].part[3].rotation, { duration: 0.5 + Math.random(), z: -2.7, ease: "none", repeat: -1, yoyo: true });
                setTimeout(function() {
                  if (bet == 0) {
                    endLevel(false, 1);
                  } else {
                    endLevel(true, 1)
                  }
                }, 2000);
              } });
            } });
          } });
        } });
      } });
    } });
  }
}
function endLevel(win, level) {
  gsap.from(resultBlock.position, { duration: 0.5, y: -100, ease: "power2.out" });

  if (win) {
    gsap.to(resultBlock.win.scale, { duration: 0.5, x: 1, ease: "back.out" });
    gsap.to(resultBlock.win.scale, { duration: 0.3, y: 1, ease: "back.out", onComplete: function() {
      addScore();
    } });
  } else {
    gsap.to(resultBlock.lose.scale, { duration: 0.3, y: 1, ease: "back.out" });
    gsap.to(resultBlock.lose.scale, { duration: 0.5, x: 1, ease: "back.out", onComplete: function() {
      if (currentLevel < 3) {
        gsap.from(resultBlock.arrow.position, { duration: 0.5, x: -70, ease: "power2.out", delay: 0.5 });
        gsap.to(resultBlock.arrow.scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 0.5 });
      } else {
        goFin();
      }
    } });
  }
}
function addScore() {
  currentScore += 500;
  gsap.to(scoreBlock.count.position, { duration: 0.2, y: scoreBlock.count.position.y + 13, ease: "back.in" });
  gsap.to(scoreBlock.count.scale, { duration: 0.2, y: 0, ease: "back.in", onComplete: function() {
    scoreBlock.count.text.geometry.dispose();
    scoreBlock.count.shadow.geometry.dispose();
    scoreBlock.count.text.geometry = new THREE.ShapeBufferGeometry(TTTravelsBold.generateShapes(`${currentScore}`, 13), 3);
    scoreBlock.count.text.geometry.computeBoundingBox();
    scoreBlock.count.text.geometry.translate(-scoreBlock.count.text.geometry.boundingBox.max.x, 0, 0);
    scoreBlock.count.shadow.geometry = scoreBlock.count.text.geometry;
    scoreBlock.count.position.y = -6;
    gsap.to(scoreBlock.count.scale, { duration: 0.2, y: 1, ease: "back.out" });
    for (let i = 0; i < 12; i++) {
      scoreBlock.sparkle[i].position.set(42, 0, 0.001);
      const randomTime = 0.5 + Math.random();
      gsap.to(scoreBlock.sparkle[i].scale, { duration: randomTime / 2, x: 1, y: 1, ease: "power2.out", repeat: 1, yoyo: true });
      gsap.to(scoreBlock.sparkle[i].position, { duration: randomTime, x: 60 - 200 * Math.random(), y: 50 - 200 * Math.random(), ease: "power2.out", repeat: 1, yoyo: true });
    }
    gsap.to(scoreBlock.coin.scale, { duration: 0.05, x: 1.3, y: 1.3, ease: "power1.inOut", repeat: 5, yoyo: true, onComplete: function() {
      if (currentLevel < 3) {
        gsap.from(resultBlock.arrow.position, { duration: 0.5, x: -70, ease: "power2.out", delay: 0.5 });
        gsap.to(resultBlock.arrow.scale, { duration: 0.5, x: 1, y: 1, ease: "back.out", delay: 0.5 });
      } else {
        goFin();
      }
    } });
  } });
}
function goFin() {
  gsap.to(timeline.scale, { duration: 0.6, x: 0, y: 0, ease: "power1.inOut" });
  gsap.to([resultBlock.win.scale, resultBlock.lose.scale], { duration: 0.3, x: 0, y: 0, delay: 1, ease: "back.in", onComplete: function() {
    gsap.to(scoreBlock.scale, { duration: 0.3, x: 0, y: 0, ease: "back.in", onComplete: function() {
      gsap.to(levelContainer[0].part[6].material, { duration: 1.5, opacity: 1, ease: "power1.inOut" });
      gsap.to(levelContainer[1].part[46].material, { duration: 1.5, opacity: 1, ease: "power1.inOut" });
      gsap.to(levelContainer[2].part[1].material, { duration: 1.5, opacity: 1, ease: "power1.inOut" });
      gsap.to(levelContainer[3].part[1].material, { duration: 1.5, opacity: 1, ease: "power1.inOut" });
      gsap.to(levelContainer[0].part[6].material.color, { duration: 1.5, r: blackColor.r, g: blackColor.g, b: blackColor.b, ease: "power1.inOut" });
      gsap.to(levelContainer[1].part[46].material.color, { duration: 1.5, r: blackColor.r, g: blackColor.g, b: blackColor.b, ease: "power1.inOut" });
      gsap.to(levelContainer[2].part[1].material.color, { duration: 1.5, r: blackColor.r, g: blackColor.g, b: blackColor.b, ease: "power1.inOut" });
      gsap.to(levelContainer[3].part[1].material.color, { duration: 1.5, r: blackColor.r, g: blackColor.g, b: blackColor.b, ease: "power1.inOut" });
      gsap.to([pic[401].color, pic[402].color, pic[403].color], { duration: 1.5, r: blackColor.r, g: blackColor.g, b: blackColor.b, ease: "power1.inOut" });


      gsap.from(finScreenContainer.position, { duration: 0.8, y: -150, ease: "power2.out" });
      gsap.to(finScreenContainer.scale, { duration: 0.8, x: 1, ease: "back.out" });
      if (currentScore > 0) finScreenContainer.coin.material = pic[99 + currentScore / 500];
      gsap.to(finScreenContainer.coin.scale, { duration: 0.7, x: 1, ease: "back.out", delay: 0.8 });
      gsap.to(finScreenContainer.coin.scale, { duration: 0.4, y: 1, ease: "back.out", delay: 0.8 });
      for (let i = 0; i < 12; i++) {
        const randomTime = 0.5 + Math.random();
        gsap.to(finScreenContainer.sparkle[i].scale, { duration: randomTime / 2, x: 1, y: 1, ease: "power2.out", repeat: 1, yoyo: true, delay: 0.8 });
        gsap.to(finScreenContainer.sparkle[i].position, { duration: randomTime, x: 150 - 300 * Math.random(), y: -255 + 300 * Math.random(), ease: "power2.out", repeat: 1, yoyo: true, delay: 0.8 });
      }
      gsap.to(finScreenContainer.scale, { duration: 0.6, y: 1, ease: "back.out" });
      for (let i = 0; i < 9; i++) {
        gsap.to(finScreenContainer.text[i].scale, { duration: 0.5, y: 1, ease: "power2.out", delay: 0.4 + 0.05 * i });
      }
      gsap.to(finScreenContainer.button.scale, { duration: 0.3, y: 1, ease: "back.out", delay: 1.2 });
      gsap.to(finScreenContainer.button.scale, { duration: 0.5, x: 1, ease: "back.out", delay: 1.2, onComplete: function() {
        finScreenContainer.button.tween = gsap.to(finScreenContainer.button.scale, { duration: 0.6, x: 0.95, y: 0.95, ease: "power1.inOut", repeat: -1, yoyo: true });
        finScreenContainer.button.ready = true;
      } });
    } });
  } });
}
function goNextLevel() {
  gsap.to(resultBlock.arrow.scale, { duration: 0.15, x: 0.8, y: 0.8, ease: "power2.out", onComplete: function() {
    gsap.to(resultBlock.arrow.scale, { duration: 0.3, x: 0, y: 0, ease: "back.in", onComplete: function() {
      gsap.to([resultBlock.win.scale, resultBlock.lose.scale], { duration: 0.3, x: 0, y: 0, ease: "back.in", onComplete: function() {
        gsap.to(scoreBlock.scale, { duration: 0.3, x: 0, y: 0, ease: "back.in" });
        if (currentLevel == 0) {
          levelContainer[0].part[24].handTween1.kill();
          levelContainer[0].part[24].handTween1 = null;
          levelContainer[0].part[24].handTween2.kill();
          levelContainer[0].part[24].handTween2 = null;
          levelContainer[0].part[24].handTween3.kill();
          levelContainer[0].part[24].handTween3 = null;
          levelContainer[0].part[24].handTween4.kill();
          levelContainer[0].part[24].handTween4 = null;
          gsap.to([levelContainer[0].part[24].part[3].rotation, levelContainer[0].part[24].part[14].rotation, levelContainer[0].part[24].part[5].rotation], { duration: 0.2, z: 0, ease: "power1.inOut" });
          gsap.to([levelContainer[0].part[24].part[6].rotation, levelContainer[0].part[24].part[11].rotation], { duration: 0.2, z: 0.5, ease: "power1.inOut" });
          gsap.to(levelContainer[0].part[24].part[9].rotation, { duration: 0.2, z: 0.2, ease: "power1.inOut" });
          gsap.to(levelContainer[0].part[24].part[12].rotation, { duration: 0.2, z: -0.3, ease: "power1.inOut" });
          animateTimeLine(2, 0);
          gsap.to(levelContainer[0].part[24].position, { duration: 1.3, x: 350, ease: "power1.in" });
          gsap.to(levelContainer[0].part[24].part[8].rotation, { duration: 0.2, z: -0.5, ease: "power1.inOut",onComplete: function() {
            gsap.to(levelContainer[0].part[24].part[3].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
            gsap.to(levelContainer[0].part[24].part[5].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
            gsap.to(levelContainer[0].part[24].part[6].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[0].part[24].part[8].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[0].part[24].part[9].rotation, { duration: 0.3, z: -0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[0].part[24].part[11].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[0].part[24].part[12].rotation, { duration: 0.3, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[0].part[24].part[14].rotation, { duration: 0.3, z: 0.5, ease: "power1.inOut", repeat: -1, yoyo: true });
          } });
          if (document.body.clientWidth / mainScene.scale.x == 249) {
            gameContainer.slideTween = gsap.to(gameContainer.position, { duration: 1.3, x: gameContainer.position.x - 249, ease: "power1.inOut", onComplete: function() {
              goRome();
            } });
          } else if (document.body.clientWidth / mainScene.scale.x < 996) {
            gameContainer.slideTween = gsap.to(gameContainer.position, { duration: 1.3, x: gameContainer.position.x - (996 - document.body.clientWidth / mainScene.scale.x) / 3, ease: "power1.inOut", onComplete: function() {
              goRome();
            } });
          } else {
            gameContainer.slideTween = gsap.to(gameContainer.position, { duration: 1.3, x: gameContainer.position.x, ease: "power1.inOut", onComplete: function() {
              goRome();
            } });
          }
          
        } else if (currentLevel == 1) {
          levelContainer[1].part[39].handTween1.kill();
          levelContainer[1].part[39].handTween1 = null;
          levelContainer[1].part[39].handTween2.kill();
          levelContainer[1].part[39].handTween2 = null;
          levelContainer[1].part[39].handTween3.kill();
          levelContainer[1].part[39].handTween3 = null;
          levelContainer[1].part[39].handTween4.kill();
          levelContainer[1].part[39].handTween4 = null;
          gsap.to([levelContainer[1].part[39].part[6].rotation, levelContainer[1].part[39].part[3].rotation, levelContainer[1].part[39].part[14].rotation, levelContainer[1].part[39].part[5].rotation], { duration: 0.2, z: 0, ease: "power1.inOut" });
          gsap.to([levelContainer[1].part[39].part[11].rotation], { duration: 0.2, z: 0.5, ease: "power1.inOut" });
          gsap.to(levelContainer[1].part[39].part[9].rotation, { duration: 0.2, z: 0.2, ease: "power1.inOut" });
          gsap.to(levelContainer[1].part[39].part[12].rotation, { duration: 0.2, z: -0.3, ease: "power1.inOut" });
          animateTimeLine(4, 0);
          gsap.to(levelContainer[1].part[39].position, { duration: 1.3, x: 350, ease: "power1.in" });
          gsap.to(levelContainer[1].part[39].part[8].rotation, { duration: 0.2, z: -0.3, ease: "power1.inOut",onComplete: function() {
            gsap.to(levelContainer[1].part[39].part[3].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
            gsap.to(levelContainer[1].part[39].part[5].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
            gsap.to(levelContainer[1].part[39].part[6].rotation, { duration: 0.3, z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[1].part[39].part[8].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[1].part[39].part[9].rotation, { duration: 0.3, z: -0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[1].part[39].part[11].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[1].part[39].part[12].rotation, { duration: 0.3, z: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[1].part[39].part[14].rotation, { duration: 0.3, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
          } });
          if (document.body.clientWidth / mainScene.scale.x == 249) {
            gameContainer.slideTween = gsap.to(gameContainer.position, { duration: 1.3, x: gameContainer.position.x - 249, ease: "power1.inOut", onComplete: function() {
              goFootball();
            } });
          } else if (document.body.clientWidth / mainScene.scale.x < 996) {
            gameContainer.slideTween = gsap.to(gameContainer.position, { duration: 1.3, x: gameContainer.position.x - (996 - document.body.clientWidth / mainScene.scale.x) / 3, ease: "power1.inOut", onComplete: function() {
              goFootball();
            } });
          } else {
            gameContainer.slideTween = gsap.to(gameContainer.position, { duration: 1.3, x: gameContainer.position.x, ease: "power1.inOut", onComplete: function() {
              goFootball();
            } });
          }
        } else if (currentLevel == 2) {
          levelContainer[2].part[7].handTween1.kill();
          levelContainer[2].part[7].handTween1 = null;
          levelContainer[2].part[7].handTween2.kill();
          levelContainer[2].part[7].handTween2 = null;
          levelContainer[2].part[7].handTween3.kill();
          levelContainer[2].part[7].handTween3 = null;
          levelContainer[2].part[7].handTween4.kill();
          levelContainer[2].part[7].handTween4 = null;
          gsap.to([levelContainer[2].part[7].part[3].rotation, levelContainer[2].part[7].part[14].rotation, levelContainer[2].part[7].part[5].rotation], { duration: 0.2, z: 0, ease: "power1.inOut" });
          gsap.to([levelContainer[2].part[7].part[6].rotation, levelContainer[2].part[7].part[11].rotation], { duration: 0.2, z: 0.5, ease: "power1.inOut" });
          gsap.to(levelContainer[2].part[7].part[9].rotation, { duration: 0.2, z: 0.2, ease: "power1.inOut" });
          gsap.to(levelContainer[2].part[7].part[12].rotation, { duration: 0.2, z: -0.3, ease: "power1.inOut" });
          animateTimeLine(6, 0);
          gsap.to(levelContainer[2].part[7].position, { duration: 1.3, x: 350, ease: "power1.in" });
          gsap.to(levelContainer[2].part[7].part[8].rotation, { duration: 0.2, z: -0.5, ease: "power1.inOut",onComplete: function() {
            gsap.to(levelContainer[2].part[7].part[3].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
            gsap.to(levelContainer[2].part[7].part[5].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
            gsap.to(levelContainer[2].part[7].part[6].rotation, { duration: 0.3, z: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[7].part[8].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[7].part[9].rotation, { duration: 0.3, z: -0.4, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[7].part[11].rotation, { duration: 0.3, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[7].part[12].rotation, { duration: 0.3, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
            gsap.to(levelContainer[2].part[7].part[14].rotation, { duration: 0.3, z: 0.5, ease: "power1.inOut", repeat: -1, yoyo: true });
          } });
          if (document.body.clientWidth / mainScene.scale.x == 249) {
            gameContainer.slideTween = gsap.to(gameContainer.position, { duration: 1.3, x: gameContainer.position.x - 249, ease: "power1.inOut", onComplete: function() {
              goFuture();
            } });
          } else if (document.body.clientWidth / mainScene.scale.x < 996) {
            gameContainer.slideTween = gsap.to(gameContainer.position, { duration: 1.3, x: gameContainer.position.x - (996 - document.body.clientWidth / mainScene.scale.x) / 3, ease: "power1.inOut", onComplete: function() {
              goFuture();
            } });
          } else {
            gameContainer.slideTween = gsap.to(gameContainer.position, { duration: 1.3, x: gameContainer.position.x, ease: "power1.inOut", onComplete: function() {
              goFuture();
            } });
          }
        }
      } });
    } });
  } });
}
function goRome() {
  currentLevel ++;
  for (let i = 0; i < textArray[2].length; i++) {
    gsap.to(levelScene[1].title[i].material, { duration: 0.6, opacity: 1, ease: "power1.inOut", delay: 0.2 * i });
  }
  gsap.to(levelContainer[1].part[46].material, { duration: 1.5, opacity: 0, ease: "power1.inOut" });
  setTimeout(function() {
    requestAnimationFrame(function() {
      for (let i = 0; i < textArray[2].length; i++) {
        gsap.to(levelScene[1].title[i].material, { duration: 0.6, opacity: 0, ease: "power1.inOut", delay: 0.2 * i });
      }
      gsap.to(levelContainer[1].part[41].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", onComplete: function() {
        gsap.to(levelContainer[1].part[40].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", onComplete: function() {
         } });
      } });
      animateTimeLine(3, 1.5);
      gsap.to(levelContainer[1].part[39].position, { duration: 1.5, x: 60, ease: "none", delay: 1.5, onComplete: function() {
        levelContainer[1].part[39].legTween1.kill();
        levelContainer[1].part[39].legTween1 = null;
        levelContainer[1].part[39].legTween2.kill();
        levelContainer[1].part[39].legTween2 = null;
        levelContainer[1].part[39].legTween3.kill();
        levelContainer[1].part[39].legTween3 = null;
        levelContainer[1].part[39].legTween4.kill();
        levelContainer[1].part[39].legTween4 = null;
        levelContainer[1].part[39].handTween1.kill();
        levelContainer[1].part[39].handTween1 = null;
        levelContainer[1].part[39].handTween2.kill();
        levelContainer[1].part[39].handTween2 = null;
        levelContainer[1].part[39].handTween3.kill();
        levelContainer[1].part[39].handTween3 = null;
        levelContainer[1].part[39].handTween4.kill();
        levelContainer[1].part[39].handTween4 = null;
        gsap.to(levelScene[1].part[0].scale, { duration: 0.6, x: 0.2, y: 0.2, ease: "back.out" });
        gsap.from(levelScene[1].part[0].rotation, { duration: 0.6, z: 0.5, ease: "back.out", onComplete: function() {
          levelScene[1].part[0].button.ready = true;
        } });
        gsap.to([levelContainer[1].part[39].part[3].rotation, levelContainer[1].part[39].part[5].rotation, levelContainer[1].part[39].part[11].rotation, levelContainer[1].part[39].part[12].rotation, levelContainer[1].part[39].part[9].rotation, levelContainer[1].part[39].part[14].rotation], { duration: 0.4, z: 0, ease: "power1.inOut" });
        gsap.to(levelContainer[1].part[39].part[6].rotation, { duration: 0.4, z: -0.2, ease: "power1.inOut" });
        gsap.to(levelContainer[1].part[39].part[8].rotation, { duration: 0.4, z: 0, ease: "power1.inOut",onComplete: function() {
          levelContainer[1].part[39].handTween1 = gsap.to(levelContainer[1].part[39].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
          levelContainer[1].part[39].handTween2 = gsap.to(levelContainer[1].part[39].part[5].rotation, { duration: 1 + Math.random() * 2, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
          levelContainer[1].part[39].handTween3 = gsap.to(levelContainer[1].part[39].part[6].rotation, { duration: 1 + Math.random() * 2, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
          levelContainer[1].part[39].handTween4 = gsap.to(levelContainer[1].part[39].part[8].rotation, { duration: 1 + Math.random() * 2, z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
        } });
      } });
    });
  }, 1300);
}
function goFootball() {
  currentLevel ++;
  for (let i = 0; i < textArray[3].length; i++) {
    gsap.to(levelScene[2].title[i].material, { duration: 0.6, opacity: 1, ease: "power1.inOut", delay: 0.2 * i });
  }
  gsap.to(levelContainer[2].part[1].material, { duration: 1.5, opacity: 0, ease: "power1.inOut" });
  setTimeout(function() {
    requestAnimationFrame(function() {
      for (let i = 0; i < textArray[3].length; i++) {
        gsap.to(levelScene[2].title[i].material, { duration: 0.6, opacity: 0, ease: "power1.inOut", delay: 0.2 * i });
      }
      gsap.to(levelContainer[2].part[18].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", onComplete: function() {
        gsap.to(levelContainer[2].part[19].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", delay: 1 });
      } });
      animateTimeLine(5, 1);
      gsap.to(levelContainer[2].part[7].position, { duration: 1.5, x: 0, ease: "none", delay: 1, onComplete: function() {
        levelContainer[2].part[7].legTween1.kill();
        levelContainer[2].part[7].legTween1 = null;
        levelContainer[2].part[7].legTween2.kill();
        levelContainer[2].part[7].legTween2 = null;
        levelContainer[2].part[7].legTween3.kill();
        levelContainer[2].part[7].legTween3 = null;
        levelContainer[2].part[7].legTween4.kill();
        levelContainer[2].part[7].legTween4 = null;
        levelContainer[2].part[7].handTween1.kill();
        levelContainer[2].part[7].handTween1 = null;
        levelContainer[2].part[7].handTween2.kill();
        levelContainer[2].part[7].handTween2 = null;
        levelContainer[2].part[7].handTween3.kill();
        levelContainer[2].part[7].handTween3 = null;
        levelContainer[2].part[7].handTween4.kill();
        levelContainer[2].part[7].handTween4 = null;
        gsap.to(levelScene[2].part[0].scale, { duration: 0.6, x: 0.2, y: 0.2, ease: "back.out" });
        gsap.from(levelScene[2].part[0].rotation, { duration: 0.6, z: 0.5, ease: "back.out", onComplete: function() {
          levelScene[2].part[0].button.ready = true;
        } });
        gsap.to([levelContainer[2].part[7].part[3].rotation, levelContainer[2].part[7].part[5].rotation, levelContainer[2].part[7].part[11].rotation, levelContainer[2].part[7].part[12].rotation, levelContainer[2].part[7].part[9].rotation, levelContainer[2].part[7].part[14].rotation], { duration: 0.4, z: 0, ease: "power1.inOut" });
        gsap.to(levelContainer[2].part[7].part[6].rotation, { duration: 0.4, z: -0.2, ease: "power1.inOut" });
        gsap.to(levelContainer[2].part[7].part[8].rotation, { duration: 0.4, z: 0, ease: "power1.inOut",onComplete: function() {
          levelContainer[2].part[7].handTween1 = gsap.to(levelContainer[2].part[7].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
          levelContainer[2].part[7].handTween2 = gsap.to(levelContainer[2].part[7].part[5].rotation, { duration: 1 + Math.random() * 2, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
          levelContainer[2].part[7].handTween3 = gsap.to(levelContainer[2].part[7].part[6].rotation, { duration: 1 + Math.random() * 2, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
          levelContainer[2].part[7].handTween4 = gsap.to(levelContainer[2].part[7].part[8].rotation, { duration: 1 + Math.random() * 2, z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
        } });
      } });
    });
  }, 1300);
}

function goFuture() {
  currentLevel ++;
  for (let i = 0; i < textArray[4].length; i++) {
    gsap.to(levelScene[3].title[i].material, { duration: 0.6, opacity: 1, ease: "power1.inOut", delay: 0.2 * i });
  }
  gsap.to(levelContainer[3].part[1].material, { duration: 1.5, opacity: 0, ease: "power1.inOut" });
  setTimeout(function() {
    requestAnimationFrame(function() {
      for (let i = 0; i < textArray[4].length; i++) {
        gsap.to(levelScene[3].title[i].material, { duration: 0.6, opacity: 0, ease: "power1.inOut", delay: 0.2 * i });
      }
      gsap.to(levelContainer[3].part[67].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", onComplete: function() {
        gsap.to(levelContainer[3].part[68].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", delay: 1, onComplete: function() {
          //gsap.to(levelContainer[3].part[71].scale, { duration: 0.6, x: 1, y: 1, ease: "back.out", delay: 0.5 });
        } });
      } });
      animateTimeLine(8, 1);
      gsap.to(levelContainer[3].part[55].position, { duration: 1.5, x: 0, ease: "none", delay: 1, onComplete: function() {
        levelContainer[3].part[55].legTween1.kill();
        levelContainer[3].part[55].legTween1 = null;
        levelContainer[3].part[55].legTween2.kill();
        levelContainer[3].part[55].legTween2 = null;
        levelContainer[3].part[55].legTween3.kill();
        levelContainer[3].part[55].legTween3 = null;
        levelContainer[3].part[55].legTween4.kill();
        levelContainer[3].part[55].legTween4 = null;
        levelContainer[3].part[55].handTween1.kill();
        levelContainer[3].part[55].handTween1 = null;
        levelContainer[3].part[55].handTween2.kill();
        levelContainer[3].part[55].handTween2 = null;
        levelContainer[3].part[55].handTween3.kill();
        levelContainer[3].part[55].handTween3 = null;
        levelContainer[3].part[55].handTween4.kill();
        levelContainer[3].part[55].handTween4 = null;
        gsap.to(levelScene[3].part[0].scale, { duration: 0.6, x: 0.2, y: 0.2, ease: "back.out" });
        gsap.from(levelScene[3].part[0].rotation, { duration: 0.6, z: 0.5, ease: "back.out", onComplete: function() {
          levelScene[3].part[0].button.ready = true;
        } });
        gsap.to([levelContainer[3].part[55].part[3].rotation, levelContainer[3].part[55].part[5].rotation, levelContainer[3].part[55].part[11].rotation, levelContainer[3].part[55].part[12].rotation, levelContainer[3].part[55].part[9].rotation, levelContainer[3].part[55].part[14].rotation], { duration: 0.4, z: 0, ease: "power1.inOut" });
        gsap.to(levelContainer[3].part[55].part[6].rotation, { duration: 0.4, z: -0.2, ease: "power1.inOut" });
        gsap.to(levelContainer[3].part[55].part[8].rotation, { duration: 0.4, z: 0, ease: "power1.inOut",onComplete: function() {
          levelContainer[3].part[55].handTween1 = gsap.to(levelContainer[3].part[55].part[3].rotation, { duration: 1 + Math.random() * 2, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
          levelContainer[3].part[55].handTween2 = gsap.to(levelContainer[3].part[55].part[5].rotation, { duration: 1 + Math.random() * 2, z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
          levelContainer[3].part[55].handTween3 = gsap.to(levelContainer[3].part[55].part[6].rotation, { duration: 1 + Math.random() * 2, z: 0, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
          levelContainer[3].part[55].handTween4 = gsap.to(levelContainer[3].part[55].part[8].rotation, { duration: 1 + Math.random() * 2, z: -0.2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.3 });
        } });
      } });

    });
  }, 1300);
}


let touchReady = false;
const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2();
function onDocumentMouseDown(event) {
  event.preventDefault();
  if (!touchReady) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, mainCamera);
    checkInteractive(raycaster);
  }
}
function onDocumentTouchStart(event) {
  touchReady = true;
  event.preventDefault();
  mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, mainCamera);
  checkInteractive(raycaster);
}
function checkInteractive(raycaster) {
  intersects = raycaster.intersectObject(startScreenContainer.button);
  if (intersects.length > 0 && startScreenContainer.button.ready) {
    startScreenContainer.button.ready = false;
    hideStartScreen();
  }
  intersects = raycaster.intersectObject(levelScene[0].part[0].button);
  if (intersects.length > 0 && levelScene[0].part[0].button.ready) {
    levelScene[0].part[0].button.ready = false;
    startBet(0);
  }
  intersects = raycaster.intersectObject(levelScene[1].part[0].button);
  if (intersects.length > 0 && levelScene[1].part[0].button.ready) {
    levelScene[1].part[0].button.ready = false;
    startBet(1);
  }
  intersects = raycaster.intersectObject(levelScene[2].part[0].button);
  if (intersects.length > 0 && levelScene[2].part[0].button.ready) {
    levelScene[2].part[0].button.ready = false;
    startBet(2);
  }
  intersects = raycaster.intersectObject(levelScene[3].part[0].button);
  if (intersects.length > 0 && levelScene[3].part[0].button.ready) {
    levelScene[3].part[0].button.ready = false;
    startBet(3);
  }
  intersects = raycaster.intersectObject(levelScene[0].part[2]);
  if (intersects.length > 0 && levelScene[0].part[2].ready) {
    levelScene[0].part[2].ready = false;
    levelScene[0].part[3].ready = false;
    bet = 0;
    startGame(0);
  }
  intersects = raycaster.intersectObject(levelScene[0].part[3]);
  if (intersects.length > 0 && levelScene[0].part[3].ready) {
    levelScene[0].part[2].ready = false;
    levelScene[0].part[3].ready = false;
    bet = 1;
    startGame(0);
  }
  intersects = raycaster.intersectObject(levelScene[1].part[2]);
  if (intersects.length > 0 && levelScene[1].part[2].ready) {
    levelScene[1].part[2].ready = false;
    levelScene[1].part[3].ready = false;
    levelScene[1].part[4].ready = false;
    bet = 0;
    startGame(1);
  }
  intersects = raycaster.intersectObject(levelScene[1].part[3]);
  if (intersects.length > 0 && levelScene[1].part[3].ready) {
    levelScene[1].part[2].ready = false;
    levelScene[1].part[3].ready = false;
    levelScene[1].part[4].ready = false;
    bet = 1;
    startGame(1);
  }
  intersects = raycaster.intersectObject(levelScene[1].part[4]);
  if (intersects.length > 0 && levelScene[1].part[4].ready) {
    levelScene[1].part[2].ready = false;
    levelScene[1].part[3].ready = false;
    levelScene[1].part[4].ready = false;
    bet = 2;
    startGame(1);
  }
  intersects = raycaster.intersectObject(levelScene[2].part[2]);
  if (intersects.length > 0 && levelScene[2].part[2].ready) {
    levelScene[2].part[2].ready = false;
    levelScene[2].part[3].ready = false;
    bet = 0;
    startGame(2);
  }
  intersects = raycaster.intersectObject(levelScene[2].part[3]);
  if (intersects.length > 0 && levelScene[2].part[3].ready) {
    levelScene[2].part[2].ready = false;
    levelScene[2].part[3].ready = false;
    bet = 1;
    startGame(2);
  }
  intersects = raycaster.intersectObject(levelScene[3].part[2]);
  if (intersects.length > 0 && levelScene[3].part[2].ready) {
    levelScene[3].part[2].ready = false;
    levelScene[3].part[3].ready = false;
    bet = 0;
    startGame(3);
  }
  intersects = raycaster.intersectObject(levelScene[3].part[3]);
  if (intersects.length > 0 && levelScene[3].part[3].ready) {
    levelScene[3].part[2].ready = false;
    levelScene[3].part[3].ready = false;
    bet = 1;
    startGame(3);
  }
  intersects = raycaster.intersectObject(resultBlock.arrow);
  if (intersects.length > 0 && resultBlock.arrow.scale.x == 1) {
    goNextLevel();
  }
}
let oldWindow = document.body.clientWidth / document.body.clientHeight;
onWindowResize();
function onWindowResize() {
  if (gameContainer.slideTween !== undefined && gameContainer.slideTween !== null) {
    gameContainer.slideTween.kill();
    gameContainer.slideTween = null;
  }
  if (document.body.clientHeight / document.body.clientWidth >= 1.4) {
    mainScene.scale.set(document.body.clientWidth / 249, document.body.clientWidth / 249, 1);
    gameContainer.position.x = 0 - 249 * currentLevel;
  } else {
    if (document.body.clientWidth / document.body.clientHeight <= 1.84) {
      mainScene.scale.set(document.body.clientHeight / 540, document.body.clientHeight / 540, 1);
    } else {
      if (document.body.clientWidth / document.body.clientHeight >= 2.67) {
        mainScene.scale.set(document.body.clientHeight / 373, document.body.clientHeight / 373, 1);
      } else {
        mainScene.scale.set(document.body.clientWidth / 996, document.body.clientWidth / 996, 1);
      }
    }
    if (document.body.clientWidth / mainScene.scale.x >= 996) {
      gameContainer.position.x = -249 * 1.5;
    } else {
      gameContainer.position.x = -document.body.clientWidth / mainScene.scale.x / 2 + 249 / 2 + currentLevel * ((996 - document.body.clientWidth / mainScene.scale.x) / 3);
    }
  }
  if (timeline.point !== undefined) {
  if (document.body.clientWidth / mainScene.scale.x == 249) {
    for (let i = 0; i < 3; i++) {
      timeline.point[i].visible = true;
    }
  } else {
    for (let i = 0; i < 3; i++) {
      timeline.point[i].visible = false;
    }
  }
  }
 
  timeline.position.y = -document.body.clientHeight / mainScene.scale.y / 2 + 20;
  scoreBlock.position.y = document.body.clientHeight / mainScene.scale.y / 2 - 25;
  mainRenderer.setPixelRatio(window.devicePixelRatio)
  mainRenderer.setSize(document.body.clientWidth, document.body.clientHeight);
  mainCamera.left = -document.body.clientWidth / 2;
  mainCamera.right = document.body.clientWidth / 2;
  mainCamera.top = document.body.clientHeight / 2;
  mainCamera.bottom = -document.body.clientHeight / 2;
  mainCamera.updateProjectionMatrix();
  oldWindow = document.body.clientWidth / document.body.clientHeight;
}
loop();
function loop() {
  if (oldWindow !== document.body.clientWidth / document.body.clientHeight) {
    onWindowResize();
  }
  for (let i = 0; i < 4; i++) {
    mainRenderer.setRenderTarget(renderTarget[i]);
    mainRenderer.render(renderTargetScene[i], renderTargetCamera);
    mainRenderer.setRenderTarget(null);
  }
  mainRenderer.render(mainScene, mainCamera);
  requestAnimationFrame(loop);
}
const textArray = [
  [ `Спор и спорт— друзья,`,
    `идущие рука об руку вот`,
    `уже десятки тысячелетий.`,
    `Сможешь ли ты пройти`,
    `их путь развития,`,
    `правильно угадав всех`,
    `победителей ?` ],
  [ `ОХОТА НА`,
    `МАМОНТОВ`,
    `13000 лет до н.э.`],
  [ `ПЕРВЫЙ БОЙ`,
    `В КОЛИЗЕЕ`,
    `80 год н.э.` ],
  [ `ОЛИМПИЙСКИЙ`,
    `ФИНАЛ`,
    `ПО ФУТБОЛУ`,
    `1988 год` ],
  [ `ФИНАЛ`,
    `INTERNATIONAL`,
    `BOTA 2`,
    `2122 год`],
  [ `Сколько лет пройдет,`,
    `все о том же шумит стадион —`,
    `у кого-то ставка сыграла…`,
    `Да, ставка делает любые`,
    `соревнования интереснее`,
    `и зрелищнее уже тысячи лет!` ],
  [ `Пришло время и тебе сделать`,
    `спорт ярче — с фрибетом`,
    `от Лиги Ставок.` ]
]