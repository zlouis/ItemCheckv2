$(document).ready(function () {
            //first form submission
            $('#linksubmit').click(function () {
                var payload = {
                    link: $('#link').val()


                };
                console.log("This is working payload:" + payload)
               
                $.ajax({
                    url: "/submit",
                    type: "POST",
                    contentType: "application/json",
                    processData: false,
                    data: JSON.stringify(payload.link),
                    complete: function (data) {
                        $('#output').html(data.responseText);
                        console.log(data)
                    }
                });
            });
                //second form submission
                  $('#scrapesubmit').click( function() {
                var payload = {
                    link: $('#scrapelink').val(),
                    item: $('#scrapeItem').val(),
                };
                console.log("This is working secondData:" + payload.link +" " + payload.item)


                $.ajax({
                    url: "/scrape",
                    type: "POST",
                    contentType: "application/json",
                    processData: false,
                    data: JSON.stringify(payload),
                    complete: function (data) {
                        $('#secondOutPut').html(data.responseText);
                        console.log(data)
                    }
                });
                })
                  


        });


