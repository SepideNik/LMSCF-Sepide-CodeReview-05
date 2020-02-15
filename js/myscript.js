var obj = Movies.Movie; 
$(document).ready(function () {       
    CreateContainer(obj);    
})
function AddLike(id) {

   var num= parseInt($("#"+id).text());
    num += 1;
    $("#"+id).html(num);
    
}
function DoSort() {
    //&#x25B2; and &#x25BC; 
    console.log($("#sortP").text());
    var sorttext = $("#sortP").text();
    var SortType = "";
    if (sorttext == "▼ Sort"){
        SortType = "asce";
        $("#sortP").text( "▲ Sort" );

    }else{
        $("#sortP").text( "▼ Sort" );
        SortType = "desc";

    }
    console.log(SortType);
    //$("#sortP").text();
     
    var arr = [];
    //get id and likes
   $('.numLike').each(function(){
       // console.log($(this).attr("id"));
        arr.push([$(this).attr("id"),$(this).text()]); 
             
   })
   //sort by likes
    arr.sort(function(a, b) {
        return a[1] - b[1];
    })
    var index, entry;
    var newArr= [];
    // sort ascending
    if(SortType == "desc"){
        for (index = 0; index < arr.length; ++index) {
            entry = arr[index];
             $.each(obj,function (i,item) {
                if(entry[0]== item.id){
                    //keep last number
                    item.Like = entry[1];
                    newArr.push(item);
                }
            })
         }
    }else{
        for (index = arr.length; index > 0; --index) {
            entry = arr[index-1];
             $.each(obj,function (i,item) {
                if(entry[0]== item.id){
                    //keep last number
                    item.Like = entry[1];
                    newArr.push(item);
                }
            })
         }
    }
        // sort descending

        //Create container again
        CreateContainer(newArr);
    
}
function CreateContainer(obj) {
    $('#divcontainer').html("");
    var divItems = '';
    $.each(obj,function (i,item) {
       divItems += `<div class="card mb-3 col-sm-12 col-lg-6 mr-5  ml-3 text-white divMovie">
                        <div class="row no-gutters">
                            <div class="col-4">
                                 <img src="` + item.image + `" class="card-img" alt="Movie">
                            </div>
                            <div class="col-8 divInfo">
                                <div class="card-body">
                                    <h5 class="card-title">` + item.name + `</h5>
                                    <p class="card-text">` + item.Genre + `</p>                                    
                                    <div class="divLike">
                                        <p class="card-text pYear"><small class="text-muted">` + item.Year + `</small></p>
                                        <i onclick="AddLike(` + item.id + `)" class="fa fa-thumbs-up">Like</i>
                                        <p id="` + item.id + `" class="numLike">` + item.Like + `</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        
    })
    $('#divcontainer').append(divItems);
    
}