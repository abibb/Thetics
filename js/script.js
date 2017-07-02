$(document).ready(function () {

    // Keys 
    const client_id = 'client_id=ae46ac6d37a4b48ce7481c1db899695e7d2896f495e40f476ea64f6dcfcdbde3';
    const API = 'https://api.unsplash.com/';


    // Random Photo Ajax Call

    let randomPhoto = API + 'photos/random/?' + client_id;
    var link;

    $("#newRB").click(function () {
        $.getJSON(randomPhoto, function (response) {

            let randomPhoto2 = response.urls.regular;
            // let randomTitle = response.location.title;
            let download = response.links.download + "?force=true";

            document.getElementById('preview').src = randomPhoto2;
            // document.getElementById('randomTitle').innerHTML = randomTitle;

            // Create a link to be clicked by the download button
            link = document.createElement('a');
            link.href = download;
            link.download = 'Download.jpg';   // The file name suggestion for the user.
            document.body.appendChild(link);

        })
    });

    $("#downloadRB").click(function () {
        link.click();
    });



    // Search for Photos

    $('form').submit(function (e) {
        e.preventDefault();
        var $searchField = $('#search');
        var $submitButton = $('#submit');

        // API Calls
        let input = document.getElementById("search").value;
        // let $submitButton = $('#submit');
        let searchPhoto = API + 'search/photos?' + client_id + '&page=1&query=' + input;
        $searchField.prop("disabled", true);
        $submitButton.attr("disabled", true).val("searching...");

        // Ajax part
        $.getJSON(searchPhoto, function (response) {

            // Create beginning of Bootstrap card
            let photoHTML = '<div class="col-12 col-sm-12">';

            if (response.total == 0) {
                photoHTML += '<div class="card card-outline-danger text-center" style="width: 20rem;">';
                photoHTML += '<div class="card-block">';
                photoHTML += '<blockquote class="card-blockquote"';
                photoHTML += '<p>Sorry, nothing came up. How about trying an actual word?</p>';
                photoHTML += '</blockquote>';
                photoHTML += '</div>';
                photoHTML += '</div>';
            } else {
                // Loop over each response photo, putting it into a unique card
                $.each(response.results, function (i, photo) {
                    // Card background
                    let photoBackground = photo.urls.regular;
                    // Download link
                    let download = photo.links.download + "?force=true";

                    // Create a link to be clicked by the download button
                    link = document.createElement('a');
                    link.href = download;
                    link.download = 'Download.jpg';   // The file name suggestion for the user.
                    document.body.appendChild(link);

                    // Add each card element 
                    photoHTML += '<article class="card indvDisplay text-center">';
                    photoHTML += '<img class="card-img-top img-responsive preview" src=' + photoBackground + '/>';
                    photoHTML += '<div class="card-block">';
                    photoHTML += '<h4 class="card-title" id="randomTitle"></h4>';
                    photoHTML += '<button type="button"  class="btn btn-outline-success common_class" name=' + download + ' id="div' + i + '">Download</button>'; // Create unique ID
                    photoHTML += '</article>';
                })
            }

            // End Card
            photoHTML += '</div>';

            // Put each card into a div
            $('#photoDisplay').html(photoHTML);
            // Disable search field
            $searchField.prop("disabled", false);
            $submitButton.attr("disabled", false).val("Search");

            $('.common_class').click(function (e) {
                link.href = e.target.name;
                link.click();
            });
        })
    })





}); /* End of Script */
