console.log("JS Conectado");
var resultado_login;
var usuario;
miStorage = window.localStorage;

function Login(){
  var email = $.trim($("input[name='email']").val());
  var password = $.trim($("input[name='password']").val());

  if (email == "vendedor@kuo.com" && password == "Welcome1."){
      console.log("password correcto");
      window.location.href = "/bienvenido"
  } else {
    alert("Password o usuario incorrecto");
  };
}

// function Login(){
//   var email = $.trim($("input[name='email']").val());
//   var password = $.trim($("input[name='password']").val());

//     $.post( "/validarLogin",{email:email,pass:password}, function(result) {
//       try{
//       if(result.login == false){
//         alert("Wrong user or password");
//       } else {
//         usuario = result.user;
//         miStorage.user = JSON.stringify(usuario);
//         $( location ).attr("href", '/bienvenido');
//       }
//     } catch (e){
//       alert(e);
//     }
//     });
// }

