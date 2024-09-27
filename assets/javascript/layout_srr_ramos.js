
// ---------------------------------
// Diminuição suave quando a barra de menu sai do topo
// ---------------------------------
(function configurarAnimacaoDoHeader() {
    window.addEventListener(
        'scroll',
        function() {
            if (window.scrollY > 0) {
                document.querySelectorAll('header#cabecalho > #cabecalho_organizado')[0].style.padding = '1px 15px 1px 15px';
            } else if (window.scrollY < 1) {
                document.querySelectorAll('header#cabecalho > #cabecalho_organizado')[0].style.padding = '10px 15px 10px 15px';
            }
        },
        true
    );
})();

// ---------------------------------
// Redirecionar a página para o centro do conteudo pedido na url
// ---------------------------------
// Extrair o "id de redirecionamento" da URL
function pegarIdDeRedicionamentoDaURL() {
    /* 
        Exemplos de urls:
            http://localhost:8080/projetos/projeto_html - vai para ninguem
            http://localhost:8080/projetos/projeto_html#teste1 - vai para teste1
            http://localhost:8080/projetos/projeto_html#teste2?nome=teste - vai para teste2
            http://localhost:8080/projetos/projeto_html#teste2?nome=teste#teste3 - vai para teste2
            http://localhost:8080/projetos/projeto_html#teste4#teste2?nome=teste#teste3 - vai para teste2
    */

    let url = window.location.href;
    let redirecionamento = false;
    
    // Se tiver ? na url, corte a url antes do ?
    if ( url.indexOf('?') != -1 ) {
        url = url.slice(0, url.indexOf('?'));
    }
    
    // Se tiver # na url, corte a url após o último #
    if ( url.lastIndexOf('#') != -1 ) {
        redirecionamento = url.slice( url.lastIndexOf('#') + 1 );
    }

    return redirecionamento;
}
// Redirecionar o scroll para o elemento
function redirecionarCentroDaPaginaParaOId(id_do_elemento) {
    if (id_do_elemento !== false) {
        if (document.querySelector('#' + id_do_elemento) != undefined) {

            let elemento = document.querySelector('#' + id_do_elemento);
            let barra_superior = document.querySelector('#cabecalho');
            
            // Inicia a página no topo
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            // Redireciona a página para a [posição do elemento - o tamanho da barra_superior]
            window.scrollTo({
                top: elemento.offsetTop - barra_superior.clientHeight,
                behavior: "smooth"
            });                
        }
    }
}

window.addEventListener(
    'load',
    function() {
        redirecionarCentroDaPaginaParaOId(pegarIdDeRedicionamentoDaURL());
    },
    true
);

window.addEventListener(
    'hashchange',
    function() {
        redirecionarCentroDaPaginaParaOId(pegarIdDeRedicionamentoDaURL());
    },
    true
);

