//-------------------VETORES DE CONTROLE DE OBJETOS----------------------
var mobs = []; //VETOR PARA ALOCAÇÃO DE TODOS OS MONSTROS ATIVOS NA CENA
var mobShot = [];
var shots = []; //VETOR PARA ALOCAÇÃO DE TODOS PROJÉTEIS DISPARADOS NA CENA
//-------------------VETORES DE CONTROLE DE OBJETOS----------------------

//-------------------VARIÁVEIS DE ANIMAÇÃO----------------------
var scene, camera, renderer, keyboard; //keyboard recebe os eventos do teclado
//-------------------VARIÁVEIS DE ANIMAÇÃO----------------------

//-------------------ANIMAÇÃO----------------------
var animation; //VARIÁVEL COM ANIMAÇÃO COMPLETA
var animationPic; //VARIÁVEL COM AS IMAGENS DE ANIMAÇÃO
var updateClock; //TIMER PARA ATUALIZAR A ANIMAÇÃO
var standMisselerClock;
var attackingMisselerClock;
//-------------------ANIMAÇÃO----------------------

//-------------------ELEMENTOS DE CENA----------------------
var background, foreground;
var backgroundTexture, foregroundTexture;
var backgroundPlane, foregroundPlane;
var backgroundMaterial, foregroundMaterial;
//-------------------ELEMENTOS DE CENA----------------------

//-------------------OBJETOS GLOBAIS----------------------
var clock = new THREE.Clock(); //Tick tock, você criou o clock
keyboard = new KeyboardState(); //atribuição de listener do teclado
//-------------------OBJETOS GLOBAIS----------------------

init();//função de inicialização das variáveis da cena inicial
animate();//rotina principal do jogo

function init() {//PEGUE SUA TOALHA QUE A JORNADA VAI COMEÇAR
  var ScreenWidth = 800, ScreenHeight = 600;//tamanho da câmera do jogo largura x altura
  var viewAngle = 90;//ângulo de visualização
  var near = 0.1; //distancia da câmera perto
  var far = 2000; //valor

    //-------------------PLANOS DE FUNDO----------------------
    //Carregando imagens de plano de fundo da cena
    backgroundTexture = new THREE.ImageUtils.loadTexture('sprites/background/novobg.png');//mais ao fundo da cena
    foregroundTexture = new THREE.ImageUtils.loadTexture('sprites/background/foreground.png');//mais próximo da camera
    //-------------------PLANOS DE FUNDO----------------------

    //-------------------RENDERER----------------------
    //Carregando e setando o renderizador da cena
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(ScreenWidth, ScreenHeight);
    //-------------------RENDERER----------------------

    //-------------------CONTAINER HTML----------------------
    // Aqui a gente procura o <div id = ThreeJS> e encaixa o game no Web
    container = document.getElementById('ThreeJS');//captura qual <div> tem o id 'ThreeJS'
	  container.appendChild( renderer.domElement );//insere o renderizador dentro do div, na hierarquia do DOM
    //-------------------CONTAINER HTML----------------------

    //-------------------ELEMENTOS DE CENA----------------------
    scene = new THREE.Scene(); //criação do objeto cena
    //-------------------ELEMENTOS DE CENA----------------------

    //-------------------CÂMERA----------------------
    // \/ criação da câmera, params(ângulo de visão, aspecto, proximo, distante)
    camera = new THREE.PerspectiveCamera(viewAngle, ScreenWidth/ScreenHeight, near, far);
    scene.add(camera);//adiciona a câmera na cena
    camera.position.set(-3730, 130, 100);//posição da câmera dentro da cena
    camera.lookAt(-3730, 130, 100);//para onde a câmera está mirando
    //VERIFICAR ^^^ chance de bug na sombra?
    //-------------------CÂMERA----------------------

    //-------------------CRIAÇÃO DA LUA----------------------
    var geometry = new THREE.SphereGeometry( 15, 16, 16 );
    var material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('sprites/moon.jpg') } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(-3720, 140, 5);
    scene.add(mesh);
    //-------------------CRIAÇÃO DA LUA----------------------

    //função para ADICIONAR LUZESSSS
    addLights();//afinal todo paladino precisa da Luz

    //-------------------MATERIAL DOS PLANOS----------------------
    // É criado o material para ser aplicado no Mesh(objeto)
    backgroundMaterial = new THREE.MeshBasicMaterial(
      { map: backgroundTexture, side: THREE.DoubleSide, transparent: true }  );
    foregroundMaterial = new THREE.MeshBasicMaterial(
      { map: foregroundTexture,transparent: true } );
    //-------------------MATERIAL DOS PLANOS----------------------

    //-------------------GEOMETRIA DOS PLANOS----------------------
    // São criados os planos nos quais serão carregadas as imagens de fundo
    backgroundPlane = new THREE.PlaneGeometry( 4693,460,1, 1 );//não vai dar
    foregroundPlane = new THREE.PlaneGeometry( 7680,460,1,1 );
    //-------------------GEOMETRIA DOS PLANOS----------------------

    //-------------------FUSÃO DOS PLANOS----------------------
    // Junta-se o material com a geometria para criar o PLANO FINAL (o plano final é passar em CG)
    background = new THREE.Mesh(backgroundPlane, backgroundMaterial);
    foreground = new THREE.Mesh(foregroundPlane, foregroundMaterial);
    //-------------------FUSÃO DOS PLANOS----------------------


    //-------------------POSIÇÃO DOS PLANOS----------------------
    //Ajustando a posição do back, quanto do fore na cena
    background.position.set(-550,0,0);
    background.scale.set(1.5,1,1);//escala de imagem para melhor perspectiva
    foreground.position.set(0,0,20);
    //-------------------POSIÇÃO DOS PLANOS----------------------

    //-------------------FUNÇÃO DE CONTROLE DE ANIMAÇÃO----------------------
    initAnim(-3730, 119, 30);//parametrô = xyz em que o megaman vai aparecer
    //-------------------FUNÇÃO DE CONTROLE DE ANIMAÇÃO----------------------

    //-------------------ADIÇÃO DE COMPONENTES DA CENA----------------------
    scene.add(background);
    scene.add(foreground);
    scene.add(animationPic);//add a imagem de animação
    //-------------------ADIÇÃO DE COMPONENTES DA CENA----------------------

    //-------------------SETTING DO RENDERIZADOR----------------------
    //\/ renderizador aceita o background c/ fundo transparente \/
    renderer.setClearColor( new THREE.Color(0xffffff), 1);//params = cor, alpha (1 p/ transp.)
    // Comando pra renderizar a cena
    renderer.render(scene, camera);
    //-------------------SETTING DO RENDERIZADOR----------------------
}

function addLights()//funçao de adicionar luz na cena
{
  //-------------------LUZES----------------------
  var light = new THREE.DirectionalLight(0xffffff);//Luz branca direcionada
  var amblight = new THREE.AmbientLight(0x990000);//luz carmim ambiente
  light.position.set(50, 50, 30)//posição da luz
	scene.add(light);
  scene.add(amblight);
  //VERIFICAR POSIÇÃO DA LUZ
  //-------------------LUZES----------------------
}
function animate() //LOOP principal PADRÃO
{
    requestAnimationFrame( animate );
	  renderer.render(scene, camera);
	  update();
}

function update()//ITERAÇÕES DO LOOP
{
  var auxiliar;
  var delta = clock.getDelta(); // Clock pra atualização da animação
  var moveDistance = 50 * delta; // Distância de movimento do megaman

  //-------------------ATUALIZAÇÃO DE OBJETOS----------------------
  keyboard.update(); // Atualiza listener do teclado
  animation.update(updateClock); //Update das animações c/ tempo de clock
  //-------------------ATUALIZAÇÃO DE OBJETOS----------------------

  //-------------------FUNÇÃO DE ANIMAÇÃO DE PROJÉTEIS----------------------
  animaShots(); //anima projéteis (se existirem)
  animaMob();
  //-------------------FUNÇÃO DE ANIMAÇÃO DE PROJÉTEIS----------------------

  //-------------------CAPTURA DE POSIÇÃO ATUAL----------------------
  megaman.x = animationPic.position.x;//CAPTURA xyz do Megaman
  megaman.y = animationPic.position.y;
  megaman.z = animationPic.position.z;
  //-------------------CAPTURA DE POSIÇÃO ATUAL----------------------

  //-------------------CAPTURA DE EVENTOS DO TECLADO----------------------
  // >>>TECLA "A" pressionada<<<
  if ( keyboard.down("A") || keyboard.pressed("A") ){
    running = true;
    animEsquerda = true;
    // \/ Troca de animação 'parado' para 'andando' \/
    if(shooting == true){
      changeAnim(pewRunMegamanAnim, pewRunMegaman, runningClock);
      if(shootRunEsquerda != true){
        changeSide();
        shootRunEsquerda = true;
      }
    }else{
      changeAnim(walkMegamanAnim, walkMegaman, runningClock);
      if(walkEsquerda != true){
        changeSide();
        walkEsquerda = true;
      }
    }

    //-------------------COLISÃO----------------------
    //Controla a câmera (para a câmera não passar dos limites)
    if(camera.position.x > -3730 && animationPic.position.x <= camera.position.x)
      camera.translateX( -moveDistance );//decrementa a posição em x
    //Verifica colisão do megaman com a parede do lado esquerdo
    if(animationPic.position.x > -3775)//-3775 é o posX da parede
      animationPic.translateX( -moveDistance );//decrementa para andar
    //-------------------COLISÃO----------------------
  }
 
