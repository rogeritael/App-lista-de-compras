//inputs
let inputNome = document.querySelector('input[name=nome-produto]');
let inputPreco = document.querySelector('input[name=preco-produto]');
let inputQtd = document.querySelector('input[name=quantidade-produto]');
let btnAdicionar = document.querySelector('.sessao-cadastro input[type=button]');

//array dos itens
let itensCadastrados = JSON.parse(localStorage.getItem('lista')) || []


//infos
let itensTotais = document.querySelector('header div.informacoes div.numero-itens p')
let totalCompras = document.querySelector('header div.informacoes div.valor-total p')

let Lista = document.querySelector('#lista .lista-body')


//tela
let tamanhoTela = window.screen.width


//Funções
function renderizarTela(){
    Lista.innerHTML = ''
    itensTotais.innerHTML = itensCadastrados.length

    let btnId = 0
    let valTotalItens= 0

    itensCadastrados.map((val)=>{
        let total = val.preco * val.quantidade

        let divPrincipal = document.createElement('div')
            divPrincipal.setAttribute('class', 'item-lista')
        
        let divItem = document.createElement('div')
            divItem.setAttribute('class', 'item-lista-info')
        
        let divNome = document.createElement('div')
            let pNome = document.createElement('p')
            divNome.setAttribute('class', 'nome-item')
            pNome.innerHTML = val.nome
            divNome.appendChild(pNome)
        
        let divPreco = document.createElement('div')
            let pPreco = document.createElement('p')
            divPreco.setAttribute('class', 'preco-item')
            pPreco.innerHTML = `R$ ${val.preco}`
            divPreco.appendChild(pPreco)
        
        let divTotal = document.createElement('div')
            let pTotal = document.createElement('p')
            divTotal.setAttribute('class', 'total-item')
            pTotal.innerHTML = `R$ ${total}`
            divTotal.appendChild(pTotal)
        
        let divQtd = document.createElement('div')
            divQtd.setAttribute('class', 'quantidade-item')
            let pQtd = document.createElement('p')
            pQtd.setAttribute('class', 'p-quantidade')
            pQtd.innerHTML = val.quantidade
            divQtd.appendChild(pQtd)
        
        let btnExcluir = document.createElement('input')
            btnExcluir.setAttribute('type', 'button')
            
            if(tamanhoTela <= 768){
                btnExcluir.setAttribute('value', 'X')
            } else {
                btnExcluir.setAttribute('value', 'Excluir')
            }
            btnExcluir.setAttribute('id', btnId)
            btnExcluir.onclick = function(){
                removerItem(this)
            }
        
        divItem.appendChild(divNome)
        divItem.appendChild(divPreco)
        divItem.appendChild(divTotal)
        divItem.appendChild(divQtd)
        divItem.appendChild(btnExcluir)
        divPrincipal.appendChild(divItem)
        Lista.appendChild(divPrincipal)

        valTotalItens += total 
        

        btnId++
    })
    totalCompras.innerHTML = `R$ ${parseFloat(valTotalItens).toFixed(2)}`
    salvarLocalStorage(itensCadastrados)
}

function cadastrarItem(){
    let spanAlert = document.createElement('h2')
    spanAlert.innerHTML = 'Os campos precisam ser preenchidos corretamente!'
        spanAlert.setAttribute('class', 'span-alert')
    let divSpan = document.querySelector('div.span-de-alerta')
    let span = document.querySelector('div.span-de-alerta h2.span-alert')

    //condições e verificações de input
    if(inputNome.value == ''  || inputPreco.value == '' || inputQtd.value == ''){
        
        //verifica se o span já existe, se não existe, cria
        if(divSpan.contains(span)){ 
            divSpan.removeChild(span)
            divSpan.appendChild(spanAlert)
        } else { 
            divSpan.appendChild(spanAlert)
        }
        
        
    } else {
        //verifica se valores setados estão abaixo de 0
        if(inputQtd.value < 1 || inputPreco.value < 0){
            if(divSpan.contains(span)){
                divSpan.removeChild(span)
                spanAlert.innerHTML = 'valores abaixo de 0 não são permitidos'
                divSpan.appendChild(spanAlert)
            } else {
                spanAlert.innerHTML = 'esse valor não é permitido'
                divSpan.appendChild(spanAlert)
            }
        } else{
            
            if(divSpan.contains(span)) {
                divSpan.removeChild(span)    
            }
            
            //cadastrar itens
            itensCadastrados.push({
                nome: inputNome.value,
                preco: inputPreco.value,
                quantidade: inputQtd.value
            })

            inputNome.value = ''
            inputPreco.value = ''
            inputQtd.value = ''

            spanAlert.innerHTML = ''
        }
    }
}

function removerItem(indice){
    itensCadastrados.splice(indice.id, 1)
    renderizarTela()
}

function salvarLocalStorage(e){
    localStorage.setItem('lista', JSON.stringify(e))
}


//ao iniciar
renderizarTela()

//interação com botão de cadastro
btnAdicionar.onclick = function(){
    cadastrarItem()
    renderizarTela()
}







//if tela >= 768px Quantidade vira Qtd e flex = 0.5

if (tamanhoTela <= 768){
    let pQuantidade = document.querySelector('#lista-cabecalho p.qtd')
    pQuantidade.innerHTML = 'Qtd'
    pQuantidade.style.flex = 0.5
}
