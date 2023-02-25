async function buscaEndereco(cep){

    const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";

    try{
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCepConvertida = await consultaCep.json();
        if(consultaCepConvertida.erro){
            throw Error('CEP inválido')
        }

        const cidade = document.getElementById('cidade');
        const logradouro = document.getElementById('endereco');
        const bairro = document.getElementById('bairro');
        const estado = document.getElementById('estado'); 

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        bairro.value = consultaCepConvertida.bairro;
        estado.value = consultaCepConvertida.uf;

        console.log(consultaCepConvertida);
        return consultaCepConvertida;
    } catch(erro){
        mensagemErro.innerHTML = `<P>CEP inválido. Tente novamente!</P>`
        console.log(erro);
    }

}

const cep = document.getElementById('cep');

cep.addEventListener("focusout", () => buscaEndereco(cep.value))