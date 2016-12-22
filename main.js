(function() {


    //my key
    var KEY = "588714d2b75a25d74cbb37bec8ed775d";
    var results = {};
    var search = {};
    search.getCHaractersbychar = function(namestr, offset) {

            var charactersBychar = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + namestr + "&limit=10&offset=" + offset + "&orderBy=name&apikey=" + KEY;


            var drawpaginator = function(total, current) {



                if (total > 10) {





                } else {



                }


                console.log("total" + total + " current: " + current)
            };

            var drawResults = function(results) {
                var inHTML = "";
                $.each(results.results, function(index, value) {





                    if (value.comics.available > 0) {

                        var tohtml = "";
                        $.each(value.comics.items, function(index2, value2) {

                            if(index2 < 4){
                            	tohtml = tohtml + "<div class='item'>" + value2.name + "</div>";
                            }
                            else{

                            }


                        });







                    } else {

                        tohtml = "No comics";
                    }


                    inHTML = inHTML + "<article id=' " + value.id + "'><figure class='characterimg'><img src='" + value.thumbnail.path + "/portrait_fantastic." + value.thumbnail.extension + "' alt='MArvel image'></figure>                    <title>" + value.name + "</title><div class='description'> " + value.description + "<br> <button>VIEW MORE</button></div>  <div class='related_comics'>  <div class='title'>Related comics</div>          " + tohtml + "                             </div>                </article>";


                });
                drawpaginator(results.total, results.offset)
                $("#content").html(inHTML);
                $(".loader").fadeOut();
            };


            $.get(charactersBychar, function(data) {
                console.log(data);
                if (data.code == 200) {
                    console.log("succes rest get");
                    drawResults(data.data);
                } else {
                    console.log("error");
                } //if( data.code == 200
            }, "json"); // $.get( charactersBychar

        } //search.getCHaractersbychar = function



    console.log("hola");


    $("#target").val("a");

    search.getCHaractersbychar($("#target").val());

    $("#target").keyup(function() {
        $(".loader").fadeIn();
        search.getCHaractersbychar($(this).val(), 0);
    });

    $(".close").click(function() {
        alert("se cierra");
    });



}());
