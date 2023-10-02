

export default function serviceworker() {
    const swURL = './public/sw';

  if ("serviceworker" in navigator) {
        window.addEventListener('load', function(){
            navigator.serviceWorker.register(swURL)
            .then(function(registration){
                console.log('worker registration is succesful', registration.scope)
            },function(err){
                console.log('Failed')
            })
            .catch(function(err){
                console.log(err)
            })
        } )
  } else {
    console.log("service worker is not supported");
  }
}
