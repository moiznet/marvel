(function() {


    //my key
    var KEY = "588714d2b75a25d74cbb37bec8ed775d";
    var results = {};
    var search = {};
    var favoriteList = {};
    favoriteList.items = [];

    favoriteList.addComic = function(id, title, img) {
        var tohtml = "",

            drawfavourite = function(idx, titlex, imgx) {

                tohtml = "<article id='" + idx + "' > <figure > <div class='close erase'  id='" + idx + "'></div> <img src='" + imgx + "'>  </figure><figcaption><h3>" + titlex + "</h3></figcaption>		</article>";
                $(".results").append(tohtml);
                $('.erase').on('click', function(e) {
                    var idg = jQuery(this).attr('id');
                    favoriteList.removeComic(idg);
                });

            };

        var found = false;
        if (favoriteList.items !== null && favoriteList.items.length !== 0) {


            for (var i = 0; i < favoriteList.items.length; i++) {
                if (favoriteList.items[i].id == id) {
                    found = true;
                    break;
                }
            }

        }

        if (!found) {

            var item = { id: id, title: title, image: img };

            favoriteList.items.push(item);
            drawfavourite(id, title, img);
        } else { console.log("Comic alredy favourite"); }


        localStorage.setItem("favoriteList", JSON.stringify(favoriteList.items));
        $('[data-popup-close]').click();
    };
    favoriteList.removeComic = function(id) {

        var found = false;
        for (var i = 0; i < favoriteList.items.length; i++) {
            if (favoriteList.items[i].id == id) {
                found = true;
                favoriteList.items.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("favoriteList", JSON.stringify(favoriteList.items));


        favoriteList.refresh();

    };
    favoriteList.refresh = function() {

    	console.log("refresh:");
    	console.log(localStorage.getItem("favoriteList"));
    	if(localStorage.getItem("favoriteList") != null){


    		  if (localStorage.getItem("favoriteList") != "") {


            favoriteList.items = JSON.parse(localStorage.getItem("favoriteList"));
            $(".results").html('');
            $.each(favoriteList.items, function(index, value) {

                tohtml = "<article id='" + value.id + "' > <figure > <div class='close erase'  id='" + value.id + "'></div> <img src='" + value.image + "'>  </figure><figcaption><h3>" + value.title + "</h3></figcaption>		</article>";

                $(".results").append(tohtml);
                $('.erase').on('click', function(e) {
                    var id = jQuery(this).attr('id');
                    favoriteList.removeComic(id);
             		   });

           		 });

       		 }





    	}

      

    }

    search.getCHaractersbychar = function(namestr, offset) {


            var charactersBychar = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + namestr + "&limit=10&offset=" + offset + "&orderBy=name&apikey=" + KEY;


            var fnpopup = function() {
                //----- OPEN
                $('[data-popup-open]').on('click', function(e) {

                    var targeted_popup_class = jQuery(this).attr('data-popup-open');
                    var comic_id = jQuery(this).attr('id');
                    var comicByid = "http://gateway.marvel.com/v1/public/comics/" + comic_id + "?apikey=588714d2b75a25d74cbb37bec8ed775d";
                    $.get(comicByid, function(data) {

                        if (data.code == 200) {

                            $(".pop-image").html("<img src='" + data.data.results[0].thumbnail.path + "/portrait_uncanny." + data.data.results[0].thumbnail.extension + "' alt=''>");
                            $(".pop-title").html(data.data.results[0].title);
                            $(".pop-description").html(data.data.results[0].description);
                            $(".pop-price").html(data.data.results[0].prices[0].price);

                            $('[data-popup="' + targeted_popup_class + '"]').fadeIn(250);

                            $('.popup-inner footer').html("<div class='adtofavoritesbtn' id='add_" + data.data.results[0].id + "'><h3>	adde to favourites</h3>	</div> <div class='buyforbtn'>	<h3>	buy for <div class='pop-price'>	</div>	</h3></div>");

                            $('#add_' + data.data.results[0].id).click(
                                function() {
                                    favoriteList.addComic(data.data.results[0].id, data.data.results[0].title, data.data.results[0].thumbnail.path + "/portrait_uncanny." + data.data.results[0].thumbnail.extension)

                                });
                            $("header,main").addClass("blur");
                        } else {
                            console.log("error");
                        } //if( data.code == 200
                    }, "json"); // $.get( charactersBychar
                    e.preventDefault();
                });

             
                $('[data-popup-close]').on('click', function(e) {
                    var targeted_popup_class = jQuery(this).attr('data-popup-close');
                    $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
                    $("header,main").removeClass("blur");

                    e.preventDefault();
                });

            };


            var drawpaginator = function(total, current) {

                if (total > 10) {

                    var left = 10 - (total % 10);
                    if (left > 0) {
                        var numPage = (total / 10) + parseFloat("0." + left);
                    } else { numPage = 1; }

                    var actualPage = current / 10;

                    // $(".paginador").html("<div class='prev'>" + (actualPage - 1) + "</div> <div class='current'>" + actualPage + "</div> <div class='next'>" + (actualPage + 1) + "</div> ");

                    for (var i = 0; i <= numPage; i++) {

                    }
                } else {}
                //console.log("total" + total + " current: " + current)
            };

            var drawResults = function(results) {
                var inHTML = "";
                $.each(results.results, function(index, value) {

                    if (value.comics.available > 0) {

                        var tohtml = "";
                        $.each(value.comics.items, function(index2, value2) {

                            if (index2 < 4) {
                                var id = value2.resourceURI.split('/');
                                tohtml = tohtml + "<div class='item' data-popup-open='popup-1' id='" + id[id.length - 1] + "'>" + value2.name + "</div>";
                            } else {

                            }


                        });


                    } else {

                        tohtml = "No comics";
                    }


                    inHTML = inHTML + "<article id=' " + value.id + "'><figure class='characterimg'><img src='" + value.thumbnail.path + "/portrait_fantastic." + value.thumbnail.extension + "' alt='MArvel image'></figure>                    <title>" + value.name + "</title><div class='description'> " + value.description + "<br> <button  class='btn' href='#' >VIEW MORE</button></div>  <div class='related_comics'>  <div class='title'>Related comics</div>          " + tohtml + "                             </div>                </article>";


                });
                drawpaginator(results.total, results.offset)
                $("#content").html(inHTML);
                $(".loader").fadeOut();
                fnpopup();
            };


            $.get(charactersBychar, function(data) {

                if (data.code == 200) {

                    drawResults(data.data);
                } else {
                    console.log("error");
                } //if( data.code == 200
            }, "json"); // $.get( charactersBychar

        } //search.getCHaractersbychar = function
    $("#target").val("a");


    search.getCHaractersbychar($("#target").val());

    $("#target").keyup(function() {
        $(".loader").fadeIn();
        search.getCHaractersbychar($(this).val(), '0');
    });

  favoriteList.refresh();
}());
