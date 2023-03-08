let listaDeCompras = []

const form = document.getElementById('form-itens')
const formInput = document.getElementById('receber-item')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    adicionarProduto(formInput.value)
    mostrarProduto()

    formInput.value = ''
    formInput.focus()
})




// Função responsavel por salvar um novo produto no array listaDeCompras
function adicionarProduto(produto){
    const produtoRepetido = listaDeCompras.some((produtoDaLista) => produto.toUpperCase() === produtoDaLista.valor.toUpperCase())
    
    if(produtoRepetido){
        alert(`${produto.toUpperCase()} já existe na lista de compras`)
    } else{
        listaDeCompras.push({
            valor: produto,
            comprado: false
        })
    }
}

// Função responsável por mostrar os produtos da listaDeCompras na tela
function mostrarProduto(){
    const ulCompras = document.getElementById('lista-de-itens')
    const ulComprados = document.getElementById('itens-comprados')

    ulCompras.innerHTML = ``
    ulComprados.innerHTML = ``

    listaDeCompras.forEach((item, index) => {
        if(!item.comprado){
            ulCompras.innerHTML += 
            `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${item.valor.toUpperCase()}"></input>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`
        } else{
            ulComprados.innerHTML += 
            `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${item.valor.toUpperCase()}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`
        }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')
    
    inputsCheck.forEach((checkbox) => {
        checkbox.addEventListener('click', (e) => {
            const produtoSelecionado = e.target.parentNode.parentNode.getAttribute('data-value')

            listaDeCompras[produtoSelecionado].comprado = e.target.checked
            mostrarProduto()
        })
    })

    const botoesDeletar = document.querySelectorAll('.deletar')

    botoesDeletar.forEach((botao) => {
        botao.addEventListener('click', (e) => {
            const produtoDeletado = e.target.parentNode.parentNode.getAttribute('data-value')
            listaDeCompras.splice(produtoDeletado, 1)
            mostrarProduto()
        })
    })
}