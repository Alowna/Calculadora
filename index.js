let Calculadora = {
    numbers: {
        receivedValue: 0,//document.getElementById("numOne").value,
        newValue: 0//document.getElementById("numTwo").value
    },
    refIds:{
        soma: document.getElementById('sum'),
        subtracao: document.getElementById('sub'),
        multiplicacao: document.getElementById('mult'),
        divisao: document.getElementById('div'),
        modulo: document.getElementById('modl'),
        raiz: document.getElementById('rootOf'),
        potenciaDois: document.getElementById('potTwo'),
        potencia: document.getElementById('potGeneral')
    },

    sum(receivedValue, newValue){
        receivedValue = document.getElementById("numOne").value
        newValue = document.getElementById("numTwo").value
        alert(Number(receivedValue) + Number(newValue))
    },
    subt(receivedValue, newValue){
        receivedValue = document.getElementById("numOne").value
        newValue = document.getElementById("numTwo").value
        alert(Number(receivedValue) - Number(newValue))
    },
    multi(receivedValue, newValue){
        receivedValue = document.getElementById("numOne").value
        newValue = document.getElementById("numTwo").value
        alert(Number(receivedValue) * Number(newValue))
    },
    divis(receivedValue, newValue){
        receivedValue = document.getElementById("numOne").value
        newValue = document.getElementById("numTwo").value
        alert(Number(receivedValue) / Number(newValue))
    },
    rootOf(receivedValue){
        receivedValue = document.getElementById("numOne").value
        newValue = document.getElementById("numTwo").value
        alert(Math.sqrt(Number(receivedValue)))
    },
    modul(receivedValue, newValue){
        receivedValue = document.getElementById("numOne").value
        newValue = document.getElementById("numTwo").value
        alert(Number(receivedValue) % Number(newValue))
    },
    potTwo(receivedValue){
        receivedValue = document.getElementById("numOne").value
        newValue = document.getElementById("numTwo").value
        alert(Number(receivedValue) ** 2)
    },
    generalPot(receivedValue, newValue){
        receivedValue = document.getElementById("numOne").value
        newValue = document.getElementById("numTwo").value
        alert(Number(receivedValue) ** Number(newValue))
    }
}



Calculadora.refIds.soma.addEventListener('click',Calculadora.sum)
Calculadora.refIds.subtracao.addEventListener("click",Calculadora.subt)
Calculadora.refIds.multiplicacao.addEventListener("click",Calculadora.multi)
Calculadora.refIds.divisao.addEventListener("click",Calculadora.divis)
Calculadora.refIds.modulo.addEventListener("click",Calculadora.modul)
Calculadora.refIds.raiz.addEventListener("click",Calculadora.rootOf)
Calculadora.refIds.potenciaDois.addEventListener("click",Calculadora.potTwo)
Calculadora.refIds.potencia.addEventListener("click",Calculadora.generalPot)

