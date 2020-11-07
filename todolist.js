$(function(){
  $('.write').on("keyup",function(event){
    if($(this).val()===""){
      return false
    }else{
      if(event.keyCode === 13){
        // alert('111')
        var local = getData();
        // console.log(local);
        local.push({title:$(this).val(),done:false})
        saveData(local);
        load();
        $(this).val("")
      }
    }
    
  })

  load()

  $('ol,ul').on('click',"a",function() {
    var data = getData();
    var index = $(this).attr("id");
    // console.log(index);
    data.splice(index,1);
    saveData(data);
    load()
  })

  $('ol,ul').on('click','input',function() {
    var data = getData();
    var index = $(this).siblings("a").attr('id');
    data[index].done = $(this).prop("checked");
    saveData(data);
    load()

  })

  function getData(){
    var data = localStorage.getItem('todolist')
    if(data !== null){
      return JSON.parse(data)
    }else{
      return [];
    }
  }

  function saveData(data){
    localStorage.setItem('todolist',JSON.stringify(data))
  }


  function load(){
    var data = getData();
    $('ol,ul').empty();
    var todocounter = 0;
    var donecounter = 0;
    $.each(data,function(i,n){
      if(n.done){
        donecounter++;
        $('ul').prepend("<li><input type='checkbox' checked>"+ n.title +"<a href='javascript:;' id="+i+">删除</a></li>")
      }else{
        todocounter++;
        $('ol').prepend("<li><input type='checkbox'>"+ n.title +"<a href='javascript:;' id="+i+">删除</a></li>")
      }
    })

    $('.todocount').text(todocounter);
    $('.donecount').text(donecounter);


  }

})

