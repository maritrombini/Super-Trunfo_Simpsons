var cartaHomer= {
    nome: "Homer",
    imagem: "http://3.bp.blogspot.com/_0VLDeGog4ME/TJ_x6TH0vGI/AAAAAAAAGFw/mMmdmpHeC6g/s1600/homersimpson.jpg",
    atributos: {
        Inteligencia: 30,
        Preguica: 95,
        Rebeldia: 10
    }
}

var cartaLisa= {
    nome: "Lisa",
    imagem: "https://wallpapercave.com/wp/wp5890481.gif",
    atributos: {
        Inteligencia: 90,
        Preguica: 40,
        Rebeldia: 85
    }
}

var cartaMaggie = {
    nome: "Maggie",
    imagem: "https://wallpapercave.com/wp/wp3824535.jpg",
    atributos: {
        Inteligencia: 90,
        Preguica: 60,
        Rebeldia: 45
    }
}

var cartaMarge = {
    nome: "Marge",
    imagem: "https://pbs.twimg.com/profile_images/1176961268/marge-simpson-with-blue-hair-beehive2.jpg",
    atributos: {
        Inteligencia: 80,
        Preguica: 20,
        Rebeldia: 85
    }
}

var cartaBart = {
    nome: "Bart",
    imagem: "https://www.mundopeliculas.tv/wp-content/uploads/2020/02/bart-simpson.jpg",
    atributos: {
        Inteligencia: 20,
        Preguica: 40,
        Rebeldia: 80
    }
}

var cartaMoe = {
    nome: "Moe",
    imagem: "https://desenhos.band.uol.com.br/wp-content/uploads/2017/11/Moe-500.jpg",
    atributos: {
        Inteligencia: 35,
        Preguica: 65,
        Rebeldia: 20
    }
}

var cartaBurns = {
    nome: "Burns",
    imagem: "https://i.pinimg.com/originals/25/59/78/2559789f28b1cb833bffd1af8af4f2ce.jpg",
    atributos: {
        Inteligencia: 68,
        Preguica: 20,
        Rebeldia: 80
    }
}

var cartaKrusty = {
    nome: "Krusty",
    imagem: "https://img.ohmymag.com.br/article/humor/originalmente-homer-deveria-ter-uma-identidade-secreta-que-seria-seu-alter-ego-krusty-o-palhaco-por-isso-a-semelhanca-entre-os-dois-personagens_489d6018d9fb3e1abe985d95a8541be995d30e65.jpg",
    atributos: {
        Inteligencia: 80,
        Preguica: 60,
        Rebeldia: 70
    }
}

var cartaMaquina
var cartaJogador
var cartas = [cartaHomer, cartaLisa, cartaMaggie, cartaMarge, cartaBart, cartaMoe, cartaBurns, cartaKrusty]
//            0           1           2          3         4            5            6           7     
var pontosJogador = 0
var pontosMaquina = 0

atualizaPlacar()
atualizaQuantidadeDecartas()

function atualizaQuantidadeDecartas() {
  var divQuantidadeCartas = document.getElementById('quantidade-cartas')
  var html = " Quantidade de cartas no jogo: " + cartas.length
  
  divQuantidadeCartas.innerHTML = html
}

function atualizaPlacar () {
  var divPlacar = document.getElementById('placar')
  var html = " Jogador " + pontosJogador + "/" + pontosMaquina + " Maquina"
  
  divPlacar.innerHTML = html
}

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
    cartaMaquina = cartas[numeroCartaMaquina]
    cartas.splice(numeroCartaMaquina, 1)
    
    var numeroCartaJogador = parseInt(Math.random() * cartas.length)
    cartaJogador = cartas[numeroCartaJogador]
    cartas.splice(numeroCartaJogador, 1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}


function exibeCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu</p>'
        pontosJogador++
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
        pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
    }

    if (cartas.length == 0){
      alert ("Fim de Jogo")
      if (pontosJogador > pontosMaquina){
        htmlResultado = '<p class="resultado-final">Venceu</p>'
      } else if (pontosMaquina > pontosJogador){
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
      } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>' 
      }  
    } else {
      document.getElementById('btnProximaRodada').disabled = false
    }
  
    divResultado.innerHTML = htmlResultado
    document.getElementById('btnJogar').disabled = true
    
    
    atualizaPlacar()
    exibeCartaMaquina()
    atualizaQuantidadeDecartas()
}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        console.log(atributo)
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status --spacing'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function proximaRodada() {
  var divCartas = document.getElementById('cartas')
  
  divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`
  document.getElementById('btnSortear').disabled = false
  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnProximaRodada').disabled = true
  
  var divResultado = document.getElementById('resultado')
  divResultado.innerHTML = ""
}
