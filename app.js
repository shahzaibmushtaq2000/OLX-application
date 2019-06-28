var config = {
    apiKey: "AIzaSyAjKtPxi-cIvr9UTaR5-JXpDqUCGll6fds",
    authDomain: "signinfree-639c1.firebaseapp.com",
    databaseURL: "https://signinfree-639c1.firebaseio.com",
    projectId: "signinfree-639c1",
    storageBucket: "signinfree-639c1.appspot.com",
    messagingSenderId: "153595575487"
};
firebase.initializeApp(config);

window.addEventListener('load', async e => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./pwabuilder-sw.js')
        .then(() => {
                console.log('service worker')
            })
    }
})
  function signup(){
      let name = document.getElementById("name").value
      // let fname = document.getElementById("fname").value
      let email = document.getElementById("email").value
      let password = document.getElementById("password").value
    
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(result){
           console.log(result)
           window.location.assign("signin.html")
           
        }
    )
      .catch(function(error) {
          // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
    });
    }
    
    
    
    
    function signin() {
        // let name = document.getElementById("name").value
        // let fname = document.getElementById("fname").value
        let signinemail = document.getElementById('signinemail').value;
        let signinpassword = document.getElementById('signinpassword').value;
        firebase.auth().signInWithEmailAndPassword(signinemail, signinpassword)
        .then(function(results){
            console.log(results)
            window.location.assign("./index.html")
        })
        .catch(function(error) {
           // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            
          });
        }
        

        function logOut() {
        firebase.auth().signOut()
        .then(() => {
            localStorage.setItem("userAuth", JSON.stringify({ user: "null" }))
            setTimeout(function(){
                
                location.replace ('../index.html');
                
            }, 2000);
              swal({
                  title: "Successfuly Logout",
                  // text: "Successfuly Logout",
                  type: "success",
                  button: "Ok",
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                  
                })
       
            }).catch((error) => {
                let message = error.message;
                swal({
                    title: "Error",
                    text: errorMessage,
                    type: "error",
                    
                });
            });
        }
        

    
                                                     function sold() {
                                                         alert("hi")
                                        
                                                    var category = document.getElementById('category').value;
                                                    var price = document.getElementById('price').value;
                                                   var description = document.getElementById('description').value;
                                                   console.log(category,description,price)
                                           
                                                    let userId = firebase.auth().currentUser.uid;
                                                    let img = document.querySelector('#img').files[0];
                                                
                                                            let storageRef = firebase.storage().ref().child(`userimages/${img.name}`)
                                                            storageRef.put(img)
                                                            .then((snapshot) => {
                                                                    snapshot.ref.getDownloadURL()
                                                                    .then((sanpUrl) => {
                                                                        let userObj = {
                                                                            userId,
                                                                            price,
                                                                            description,
                                                                            category,
                                                                            img,
                                                                         createTime: firebase.database.ServerValue.TIMESTAMP
                                                                        }
                                                                        userObj.img = sanpUrl
                                                                        console.log(userObj)
                                                                        firebase.database().ref('/categories').child(category).push(userObj)
                                                                            // console.log(userObj)
                                                                            .catch((error) => {
                                                                                // document.getElementById("loaders").style.display = "none"
                                                                                swal({
                                                                                    title: "Plug In",
                                                                                    text: error.message,
                                                                                    icon: "warning",
                                                                                    button: "OK",
                                                                                });
                                                                            })
                                                                        })
                                                
                                                                    swal("Good job!", "you have enter a category!", "success")
                                                                })
                                
                                                            document.getElementById('category').value="";
                                                        document.getElementById('price').value="";
                                                        document.getElementById('description').value="";
                                            
                                                    }





                                                            var len=[];
                                                            var count=0;
                                                            // getdata()
                                                            function getdata(a) {
                                                     var questions = [];
                                     
                                                                var a = a;
                                                                alert(a);
                                                                document.getElementById("main").innerHTML = "";
                                                                firebase.database().ref('/categories').child(a).on('child_added', (data) => {
                                                                    console.log(data.val());
                                                                    questions.push(data.val())
                                                                    len=questions.length;
                                                                    console.log(questions)
                                     
                                     
                                     
                                     
                                    })
                                    
                                    
                                    
                                    for(var key in questions){
                                    
                                       document.getElementById("main").innerHTML += "<div class='card' 'width='1' id='dele'>"+ 
                                       "<img src='" + questions[key].img+"'>" + 
                                                                                        "<h4>" + questions[key].category + "</h4>" + 
                                                                                        "<p>" + questions[key].description + "</p>" + 
                                                                                        "<p class='price'>"+ questions[key].price + "</td>" + 
                                                                                        "<br>" + "<button type='button' id='"+ questions[key].userId +"' onclick='chat(id)' class='btn btn-warning'> buy</button>" + 
                                                                                         "<button type='button' id='"+ questions[key].userId +"' onclick='chat(id)' class='btn btn-success'>chat</button>" + "</div>"
                                    
                                                                                         
                                                                                        }
                                    
                                }
                                
                                function searc() {
                                    document.getElementById("main").innerHTML="";
                                      // var a = a;
                                      // alert(a);
                          var unknow = document.getElementById("look").value;
                          // var unknow2 = unknow.toLowerCase();
                          firebase.database().ref('/categories').on('child_added', (data) => {
                              for(var k in data.val()){
                                          for(var k1 in data.val()[k]){
                                              // console.log(data.val()[k][k1]);
                                          if(data.val()[k][k1] == unknow){
                                              console.log(data.val()[k]);
                                              
                                            alert("hi");
                                            document.getElementById("main").innerHTML += "<div class= 'card' id='dele'>"+ 
                                                                           "<img src='" + data.val()[k].img+"'>" + 
                                                                           "<h4>" + data.val()[k].category + "</h4>" + 
                                                                           "<p>" + data.val()[k].description + "</p>" + 
                                                                              "<p class='price'>"+ data.val()[k].price + "</td>" + 
                                                                              "<br>" + "<button type='button' id='"+ data.val()[k].userId +"' onclick='chat(id)' class='btn btn-warning'> buy</button>" + 
                                                                               "<button type='button' id='"+ data.val()[k].userId +"' onclick='chat(id)' class='btn btn-success'>chat</button>" + "</div>"
                                                                               
                          
                                                                            }
                          
                                        }
                                        
                          
                                                         
                                    
                                    }   }  )}               
                                    function display(){
                                        document.getElementById("main").innerHTML="";
                      
                            firebase.database().ref('/categories').on('child_added', (data) => {
                                for(var k in data.val()){
                                            for(var k1 in data.val()[k]){
                                                console.log(data.val()[k][k1]);
                                   
                                            {
                                            
                                                
                                              alert("hi");
                                              document.getElementById("main").innerHTML += "<div class= 'card' id='dele'>"+ 
                                                                             "<img src='" + data.val()[k].img+"'>" + 
                                                                             "<h4>" + data.val()[k].category + "</h4>" + 
                                                                             "<p>" + data.val()[k].description + "</p>" + 
                                                                                "<p class='price'>"+ data.val()[k].price + "</td>" + 
                                                                                "<br>" + "<button type='button' id='"+ data.val()[k].userId +"' onclick='chat(id)' class='btn btn-warning'> buy</button>" + 
                                                                                 "<button type='button' id='"+ data.val()[k].userId +"' onclick='chat(id)' class='btn btn-success'>chat</button>" + "</div>"
                                                                                 
                            
                                                                              }
                            
                                          }
                                          
                            
                                                           
                                      
                                      }   }  )}    
                                    display()