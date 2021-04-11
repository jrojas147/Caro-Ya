var app = angular.module("formLanding", []);
var ingreso;
/* var resultado; */

    app.config(['$locationProvider', function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });  
    }]);

    app.controller("formController", function($scope, $location){

        $scope.resultado;
        $scope.mostrarEnriquecidos = false;
        var fuente = $location.search().fuente;
        if(fuente == 'enriquecido'){
            $scope.mostrarEnriquecidos = true;
        }

        if($location.search().utm_source){
            $scope.utmSource = $location.search().utm_source;
        }
        if($location.search().idc){
            $scope.idc = $location.search().idc;
        }
        if($location.search().idv){
            $scope.idv = $location.search().idv;
        }

        /* Reload Temporal */
        $scope.age = new Date().getFullYear();

        $scope.reload = function()
        {

        if (window.history.go(-1) !== undefined) {
            window.history.go(-1);
            } else {
              window.location.href = 'http://www.carroya.com';
            }
        }

        $scope.checkTyc = false;
        $scope.checkCyp = false;

        $scope.documentos = [
            {value:1, name:"Cédula de Ciudadania"},
            {value:2, name:"Cédula de Extranjería"},
            {value:3, name:"NIT"}
           ]

        $scope.ocupaciones = [
            {value:1, name:"Empleado"},
            {value:1, name:"Pensionado"},
            {value:2, name:"Independiente"}
           ]
        $scope.cuotas = [
            {value:48, name:"cuatroocho"},
            {value:60, name:"seiscero"},
            {value:72, name:"sietedos"},
            {value:84, name:"ochocuatro"}
           ]
        $scope.modelos = [
            {value:0, name:"Selecciona el modelo"},
            {value:4, name:"2008"},
            {value:5, name:"2009"},
            {value:6, name:"2010"},
            {value:7, name:"2011"},
            {value:8, name:"2012"},
            {value:9, name:"2013"},
            {value:10, name:"2014"},
            {value:11, name:"2015"},
            {value:12, name:"2016"},
            {value:13, name:"2017"},
            {value:14, name:"2018"},
            {value:15, name:"2019"},
            {value:16, name:"2020"},
            {value:17, name:"2021"},
            {value:18, name:"2022"}
           ]

        $scope.contact = {
            DatosBasicos:{
                TipoDocumento:"1",
                NumeroDocumento:""

            },
            DatosFinancieros:{
                ActividadEconomica: 0,
                ActividadIndependiente: 3
            },
            OtrosDatos:{
                AutorizaConsultaCentrales: false,
                AutorizaMareigua: false,
                InfoUno: "",
                ConcesionarioRadicacion: 0,
                IdentificacionVendedor: 0
            },
            DatosVehiculo: {
                Modelo: "0"
            }
        }
        /* Igualando desde los params */
        $scope.contact.OtrosDatos.InfoUno = $scope.utmSource;
        $scope.contact.OtrosDatos.IdentificacionVendedor = $scope.idv ? $scope.idv : 0;
        $scope.contact.OtrosDatos.ConcesionarioRadicacion = $scope.idc ? $scope.idc : 0;
        $scope.modal = false;
        $scope.modalDos = false;
        $scope.minVehiculo = 13000000;
        $scope.minFinanciar = 10000000;
        $scope.minv = 1200000;

        $scope.cuota = 0;
        $scope.tasa = 0.0115;

        $scope.loader = false;

        /* Credenciales */
        $scope.userpass = "YwBhAHIAcgBvAFkAYQA6AEMAQAByAHIAMABZAEAA";

        /* 2 - Token */
        var urlT= "https://api.premiercredit.co:11444/PremierServices_API_EXT/api/login/authenticateEncoded";
        // Test
        /* let urlT= "https://apitst.premiercredit.co:11445/PremierServices_api_ext/api/login/authenticate" */
        var headerT = {
                        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept': 'application/json, application/xml, text/plain, text/html, *.*' 
                    }
        
        /* 3 - Viable */
        var urlV = "https://api.premiercredit.co:11444/premierservices_api_ext/api/viabilizacion/getViabilizacionModular"
        /* var urlV = "https://api.premiercredit.co:11444/premierservices_api_ext/api/viabilizacion/getViabilizacion" */
        // Test
        /* let urlV = "https://apitst.premiercredit.co:11445/premierservices_api_ext/api/viabilizacion/getViabilizacion" */

        var bodyV = $scope.contact;

        function getResultado(value, mensaje){
            if($scope.mostrarEnriquecidos && (value == 4 || value == 3)){
                $scope.sendWhatsapp = true;
            }
            $scope.resultado = value;
            $scope.loader = false;
            arreglarResultadoPre(mensaje);
            $scope.$apply();
        };

        function arreglarResultadoPre(mensaje) {
            var r = mensaje.toLowerCase();
            r = r.replace(new RegExp("\\s", 'g'),"");
            r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
            r = r.replace(new RegExp("æ", 'g'),"ae");
            r = r.replace(new RegExp("ç", 'g'),"c");
            r = r.replace(new RegExp("[èéêë]", 'g'),"e");
            r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
            r = r.replace(new RegExp("ñ", 'g'),"n");                            
            r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
            r = r.replace(new RegExp("œ", 'g'),"oe");
            r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
            r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
            r = r.replace(new RegExp("\\W", 'g'),"");
            
            
            if(r.length > 12){
                if(r == 'preaprobadonosevalidoingresopormareiguanosevalidoingresoporincomeestimatorpreaprobadoporvalidacionreglasmotorcapacidaddepagoyobanconoaplicaparafasttrack'){
                    $scope.variantePreaprobado = 21;
                    $scope.sendMail = true;
                }
                if(r == 'preaprobadonosevalidoingresopormareiguanosevalidoingresoporincomeestimatorreglasmotorycapacidaddepagovalidoperopreaprobadoportipodeingreso'){
                    $scope.variantePreaprobado = 22;
                }
                if(r == 'preaprobadopreaprobadoporvalidacionreglasmotorcapacidaddepagoyobanconoaplicaparafasttrack'){
                    $scope.variantePreaprobado = 23;
                    if($scope.mostrarEnriquecidos){
                    $scope.sendWhatsapp = true;
                    }
                }
                if(r == 'preaprobadosevalidoenmareiguaperonocumpleconcontinuidadlaboralpreaprobadoporvalidacionreglasmotorcapacidaddepagoyobanconoaplicaparafasttrack'){
                    $scope.variantePreaprobado = 24;
                    if($scope.mostrarEnriquecidos){
                    $scope.sendMail = true;
                    }
                }
                if(r == 'preaprobadosevalidoenmareiguaperonocumpleconcontinuidadlaboralreglasmotorycapacidaddepagovalidoperopreaprobadoportipodeingreso'){
                    $scope.variantePreaprobado = 25;
                    if($scope.mostrarEnriquecidos){
                    $scope.sendMail = true;
                    }
                }
                if(r == 'preaprobadonosevalidocorreoelectroniconicelularporubica'){
                    $scope.variantePreaprobado = 26;
                    if($scope.mostrarEnriquecidos){
                    $scope.sendWhatsapp = true;
                    }
                }
            }else{
                $scope.variantePreaprobado = 2;
            }
        }

        $scope.makeCuotaInicial = function(value){
            $scope.contact.DatosBasicos.CuotaInicial = value * 0.1;
            $scope.calculaPorcentaje(value);
            $scope.makeValorTotal($scope.contact.DatosBasicos.ValorVehiculo, $scope.contact.DatosBasicos.CuotaInicial);

        }

        $scope.makeValorTotal = function(valorVehiculo, cuotaInicial){
            $scope.contact.OtrosDatos.ValorFinanciar = valorVehiculo - cuotaInicial;
            $scope.calculaPorcentaje(valorVehiculo);
        }

        $scope.calculaPorcentaje = function(value){/* 
            if($scope.contact.DatosBasicos.ValorVehiculo >= min){ */
            $scope.porcentaje = (($scope.contact.DatosBasicos.CuotaInicial * 100) / value);        
            /* }  */   
        }

        $scope.aniosMeses = function(value){
            var meses = Number(value);
            switch (meses) {
                case 48:
                    $scope.contact.DatosBasicos.Plazo = 4;
                    break;

                case 60:
                    $scope.contact.DatosBasicos.Plazo = 5;
                    break;

                case 72:
                    $scope.contact.DatosBasicos.Plazo = 6;
                    break;

                case 84:
                    $scope.contact.DatosBasicos.Plazo = 7;
                    break;
            
                default:
                    break;
            }
        }

        $scope.desabilitarBtnPrimerPaso = function(){
            return !$scope.contact.OtrosDatos.ValorFinanciar || 
            $scope.contact.OtrosDatos.ValorFinanciar < $scope.min ||
            !$scope.contact.DatosBasicos.ValorVehiculo ||
            $scope.contact.DatosBasicos.ValorVehiculo < $scope.min ||
            !$scope.cuotas ||
            !$scope.cuota ||
            $scope.cuota == 0 || 
            $scope.contact.DatosVehiculo.Modelo == '0';
        }

        $scope.submitForm = function(){
            $scope.loader = true;            
            $scope.contact.DatosBasicos.TipoDocumento = Number($scope.contact.DatosBasicos.TipoDocumento);
            $scope.contact.DatosFinancieros.ActividadEconomica = Number($scope.contact.DatosFinancieros.ActividadEconomica);
            $scope.contact.DatosVehiculo.TipoVehiculo = 2;
            $scope.contact.OtrosDatos.InfoTres = document.referrer;

            var urlencoded = new URLSearchParams();
            urlencoded.append("UserPass", $scope.userpass);

            fetch(urlT, {
                method: 'POST',
                body: urlencoded,
                headers: headerT
                })
                .then(
                    function (response) {                      
                        return response.json();
                    })
                  .then(function(result){
                    var token = result.Token;                  

                   var headerVi = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                   }           

                   fetch(urlV, {
                    method: 'POST',               
                    body: JSON.stringify(bodyV),
                    headers: headerVi
                    })
                      
                      .then(function (response) {
                          return response.json()
                            })
                      .then(function (result) {
                          return getResultado(Number(result.IdResultado), result.Resultado);
                        })
                      .catch(function (error) {console.log('error', error)});               
                        
                  })
                  
        }
        $scope.calculoCta = function(val) {  

                 
                var valorFinanciarCop = $scope.contact.OtrosDatos.ValorFinanciar
                          
                /* let nmv = Math.pow((1 + $scope.tasa), (1 / 12)) - 1; */
                var nmv = 0.0115;
                var seguroCuota = (1220 / 1000000) * valorFinanciarCop;
                var cuota = Number(val);

                var seguroTotal = Math.round(seguroCuota * cuota);
                var vlrActual = Math.round(valorFinanciarCop);
                var vlrPartuno = vlrActual * nmv;
                var vlrPartdos = Math.pow((1 + nmv), - cuota)
                vlrPartdos = 1 - vlrPartdos;
                $scope.cuota = Math.round(vlrPartuno / vlrPartdos);
                              
                
                /* Seguro de la cuota */
                var vlrPartunoSeg = seguroTotal * nmv;
                var vlrPartdosSeg = Math.pow((1 + nmv), - cuota)
                vlrPartdosSeg = 1 - vlrPartdosSeg;
                var seguroCta = (Math.round(vlrPartunoSeg) / vlrPartdosSeg);
                seguroCuota = seguroCta;
                seguroCta = Math.round(seguroCta);

                $scope.cuota += seguroCta;
        }

        $scope.reinicioCuota = function(val) {
            
            if(val < $scope.min){
                $scope.cuota = 0;
                $scope.cuota = undefined;
            }
        }

        $scope.mostrarForm = function(){
            return ($scope.modal == true || $scope.modalDos == false) && ($scope.modal == false || $scope.modalDos == true);
        }
    })

    .directive('currencyInput', function($filter, $browser) {
        return {
            require: 'ngModel',
            link: function($scope, $element, $attrs, ngModelCtrl) {
                var listener = function() {
                    var value = $element.val().replace(/,/g, '')
                    $element.val($filter('number')(value, false))
                }
                
                // This runs when we update the text field
                ngModelCtrl.$parsers.push(function(viewValue) {
                    return parseInt(viewValue.replace(/,/g, ''), 10);
                })
                
                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function() {
                    $element.val($filter('number')(ngModelCtrl.$viewValue, false))
                }
                
                $element.bind('change', listener)
                $element.bind('keydown', function(event) {
                    var key = event.keyCode
                    // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                    // This lets us support copy and paste too
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) 
                        return 
                    $browser.defer(listener) // Have to do this or changes don't get picked up properly
                })
                
                $element.bind('paste cut', function() {
                    $browser.defer(listener)
    
                })
            }
            
        }
    })
    .directive('replace', function() {
        return {
          require: 'ngModel',
          scope: {
            regex: '@replace',
            with: '@with'
          }, 
          link: function(scope, element, attrs, model) {
            model.$parsers.push(function(val) {
              if (!val) { return; }
              var regex = new RegExp(scope.regex);
              var replaced = val.replace(regex, scope.with); 
              if (replaced !== val) {
                model.$setViewValue(replaced);
                model.$render();
              }         
              return replaced;         
            });
          }
        };
      })
      

