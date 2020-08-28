var calculadora = {
	
	visor: document.getElementById("display"),
	valorVisor: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false,
	
	init: (function(){
		this.eventoFormatoBtn(".tecla");
		this.asignarEventos();
	}),
	
	//Eventos de formato de botones
	
	eventoFormatoBtn: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoReducirBtn;
			x[i].onmouseleave = this.eventoFormaOriginalBtn;
		};
	},

	eventoReducirBtn: function(event){
		calculadora.ReducirBtn(event.target);
	},

	eventoFormaOriginalBtn: function(event){
		calculadora.formaOriginalBtn(event.target);
	},
	
	//Formato de botones 
	
	ReducirBtn: function(valor){
		var x = valor.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			valor.style.width = "28%";
			valor.style.height = "62px";
		} else if(x=="mas") {
			valor.style.width = "88%";
			valor.style.height = "98%";
		} else {
			valor.style.width = "21%";
			valor.style.height = "62px";
		}
	},
	
	formaOriginalBtn: function(valor){
		var x = valor.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			valor.style.width = "29%";
			valor.style.height = "62.91px";
		} else if(x=="mas") {
			valor.style.width = "90%";
			valor.style.height = "100%";
		} else {
			valor.style.width = "22%";
			valor.style.height = "62.91px";
		}
	},
	
	asignarEventos: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.digitaNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.digitaNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.digitaNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.digitaNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.digitaNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.digitaNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.digitaNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.digitaNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.digitaNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.digitaNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.LimpiarVisor();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.mostrarResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.digitaOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.digitaOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.digitaOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.digitaOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.digitaOperacion("+");});
	},

	digitaNumero: function(valor){
		if (this.valorVisor.length < 8) {
			if (this.valorVisor=="0") {
				this.valorVisor = "";
				this.valorVisor = this.valorVisor + valor;
			} else {
				this.valorVisor = this.valorVisor + valor;
			}
		this.updateVisor();
		}
	},
	
	LimpiarVisor: function(){ 
	    this.valorVisor = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.updateVisor();
	},
	
	cambiarSigno: function(){
		if (this.valorVisor !="0") {
			var aux;
			if (this.valorVisor.charAt(0)=="-") {
				aux = this.valorVisor.slice(1);
			}	else {
				aux = "-" + this.valorVisor;
			}
		this.valorVisor = "";
		this.valorVisor = aux;
		this.updateVisor();
		}
	},
	
	ingresoDecimal: function(){
		if (this.valorVisor.indexOf(".")== -1) {
			if (this.valorVisor == ""){
				this.valorVisor = this.valorVisor + "0.";
			} else {
				this.valorVisor = this.valorVisor + ".";
			}
			this.updateVisor();
		}
	},
	
	mostrarResultado: function(){

		if(!this.auxTeclaIgual){ 
			this.segundoValor = parseFloat(this.valorVisor);
			this.ultimoValor = this.segundoValor;
			this.ejecutarOperacion(this.primerValor, this.segundoValor, this.operacion);
		
		} else {
			this.ejecutarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
	
		this.primerValor = this.resultado;
		this.valorVisor = "";
	
		if (this.resultado.toString().length < 9){
			this.valorVisor = this.resultado.toString();
		} else {
			this.valorVisor = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.auxTeclaIgual = true;		
		this.updateVisor();
	
	},
	
	digitaOperacion: function(oper){
		this.primerValor = parseFloat(this.valorVisor);
		this.valorVisor = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.updateVisor();
	},
	
	ejecutarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-": 
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*": 
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/": 
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},
	
	updateVisor: function(){
		this.visor.innerHTML = this.valorVisor;
	}
};

calculadora.init();