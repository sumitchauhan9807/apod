$(document).ready(()=>{
  getApod(new Date().toJSON())
  $('.datepicker').datepicker()
  .on('changeDate', function(ev){
    var timestamp = ev.date.valueOf()
      if(new Date(timestamp).toJSON() > new Date().toJSON()){
        alert('please selet a back date')
        return
      }
      var selectedDate = new Date(ev.date.valueOf()).toJSON()
      getApod(selectedDate)
  });
})



const getApod = (selectedDate) =>{
  $(".loading").css('display','block')
  fetch('/test',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({date:selectedDate})
  }).then((response)=>{
    response.json().then((data)=>{
        $(".loading").css('display','none')
        if(response.status == 200) {
          $('.error-message').css('display','none');
          populateData(data)
        }else{
          showError(data)
        }
    })
  })
}


const populateData = (data) =>{
  $(".nasa-info").css('display','block');
   $("#nasa-title").html(data.title)
    $("#nasa-exp").html(data.explanation) 
    // $("#nasa-image").html = data.title
    if(data.media_type == 'image'){
      $(".nasa-media").html(`<img id="nasa-image" src="/assets/nasa_pictures/${data.url}">`)
    }else{
      $(".nasa-media").html(`<iframe width="420" height="345" src="${data.url}">
      </iframe>`)
    }
}

  const showError = (error) =>{
    $(".error-text").html(error.message)
    $(".error-message").css("display","block")
  }