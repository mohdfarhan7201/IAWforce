function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(document).ready(function(){
    
    $('#fullname, #city').bind('keyup paste', function () {
        this.value = this.value.replace(/[^a-zA-Z ]/g, '');
    });
    
    $('#email').bind('keyup paste', function () {
        this.value = this.value.replace(/[^a-zA-Z0-9@_.]/g, '');
    });

    $('#mobile').bind('keyup paste', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
  $("#userstate").change(function(){
            var state = $("#userstate").val();
            console.log(state);
            $.ajax({
                type:'POST',
                data:{state:state},
                url:baseurl+'/getCity.php',
                success:function(response){
                    console.log(response);
                    var citydata = JSON.parse(response);
                    $("#city").html(citydata.html);
                }
            });
        });


    
    $("#requestbtn").click(function(){
         let fullname = $("#fullname").val();
    let email = $("#email").val();
    let mobile = $("#mobile").val();
    let city = $("#city").val();
            let state = $("#userstate").val();
        let flexCheckDefault = $("#flexCheckDefault:checked").val();
        //console.log(flexCheckDefault);
    if(fullname.trim() == ''){
        $("#resresult").html('<p style="color:red;text-align: center;">Please enter your fullname</p>');
        return false;
    }else if(email.trim() == ''){
          $("#resresult").html('<p style="color:red;text-align: center;">Please enter your email</p>');
        return false;
    }else if (!(IsEmail(email))) {
            $("#resresult").html('<p style="color:red;text-align: center;">Invalid Email Id</p>');
            return false;
    }else if(mobile.trim() == ''){
             $("#resresult").html('<p style="color:red;text-align: center;">Please enter your mobile number</p>');
            return false;
    }else if(mobile.length != 10){
             $("#resresult").html('<p style="color:red;text-align: center;">Mobile number should be in 10 digits</p>');
            return false;
    }else if(state.trim() == ''){
             $("#resresult").html('<p style="color:red;text-align: center;">Please select your state</p>');
            return false;
    }else if(city.trim() == ''){
             $("#resresult").html('<p style="color:red;text-align: center;">Please select youtr city</p>');
            return false;
    }/*else if(flexCheckDefault == undefined){
            $("#resresult").html('<p style="color:red;text-align: center;">Please accept terms and conditions.</p>');
            return false;
        }*/ else{
        let data = $("#requestform").serialize();
        $.ajax({
            type:'POST',
            data:data,
            url:baseurl+'/requestsubmit.php',
            success:function(res){
                //console.log(res);
                  var data = JSON.parse(res);
                    if(data['status'] == 'success'){
                        window.location.href="https://www.forcegurkha.co.in/thank-you-home/";
                        $("#resresult").html('<p style="color:green;text-align: center;">Thank you for your information.</p>');
                        $("#fullname").val('');
                        $("#email").val('');
                        $("#mobile").val('');
                         $("#userstate").val('');
                        $("#city").val('');
                       
                        setTimeout(function() { $(".formNew").css('display','none'); $("html").removeClass("formNew-open"); }, 2000);
                    } else if(data['status'] == 'error'){
                        var err = data['error'];
                         $("#resresult").html('<p style="color:red;text-align: center;">'+err+'</p>');
                    } else if(data['status']== 'not'){
                        $("#resresult").html('<p style="color:red;text-align: center;">Your information is not submitted successfuly. Please try again!</p>');
                    } else{
                        $("#resresult").html('<p style="color:red;text-align: center;">Something went wrong</p>');
                    }
            }
        });
    }
    });
   
});