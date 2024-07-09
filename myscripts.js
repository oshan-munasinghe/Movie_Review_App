
// Initialize Firestore through Firebase
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var Movie_name_instance_id
var db = firebase.firestore();
// Get a live data snapshot (i.e. auto-refresh) of our Reviews collection
const DB_Con = db.collection("movie-reviews");
DB_Con.onSnapshot((querySnapshot) => {
    // Empty HTML table
    $('#reviewList').empty();

    //Delete Button Function
    function deleteMovieReview(DB_Con, movId, row) {
        DB_Con.doc(movId).delete().then(() => {
            console.log("Deleted from Firestore");
            alert("Deleted ")
            console.log("Row deleted!");
            row.remove();
        });
    }

    querySnapshot.forEach((doc) => {
        // Create a new row
        var row = $('<tr>');

        // Add movie name cell
        var movieNameCell = $('<td>').text(doc.data().movie_name);
        row.append(movieNameCell);

        // Add movie rating cell
        var movieRatingCell = $('<td>').text(doc.data().movie_rating + '/5');
        row.append(movieRatingCell);
        // Add movie Director Name
        var directorNameCell = $('<td>').text(doc.data().director_name);
        row.append(directorNameCell);

        // Add movie release date
        var movieRatingCell = $('<td>').text(doc.data().releaseDate);
        row.append(movieRatingCell);

        // Add a delete button cell
        var deleteButtonCell = $('<td>');
        var deleteButton = $('<button>').text('Delete').addClass('btn btn-danger');

        var editButton = $('<button>').text('Edit').addClass('btn btn-outline-warning'); // New button for update
        deleteButton.icons = '<i class="far fa-link"></i>'

        // Set the onclick event handler for the delete button
        deleteButton.click(function () {
            const movId = doc.id
            deleteMovieReview(DB_Con, movId, row);
            $('#reviewHeader').empty();

        });
        // Set the onclick event handler for the edit button
        editButton.click(function () {
            $('#update-area-main').toggle();
            $("#UmovieName").val(doc.data().movie_name);
            $("#UmovieRating").val(doc.data().movie_rating);
            $("#UdirectorName").val(doc.data().director_name);
            $("#UreleaseDate").val(doc.data().releaseDate);

            Movie_name_instance_id = doc.id;
            //console.log(Movie_name_instance)
        });
        deleteButtonCell.append(deleteButton);
        deleteButtonCell.append(editButton);
        row.append(deleteButtonCell);

        // Append the row to the table
        $('#reviewList').append(row);



    });//query snapshot end


    // Table Header

    $('#reviewHeader').append('<tr>');
    $('#reviewHeader').append('<th scope="col" data-column="mName" data-order="desc">Movie_Name &#9650</th>')
    $('#reviewHeader').append('<th scope="col" data-column="mRating" data-order="desc">Rating &#9650</th>');
    $('#reviewHeader').append('<th scope="col" data-column="mDname" data-order="desc">Director Name &#9650</th>');
    $('#reviewHeader').append('<th scope="col" data-column="mRdate" data-order="desc">Release Date &#9650</th>');
    $('#reviewHeader').append('<th scope="col" disabled  >Action </th>');
    $('#reviewHeader').append('<th scope="col" disabled  ></th>');
    $('#reviewHeader').append('<tr>');

    //Sort Function
    function sortdata(columnName, order) {

        var dt = DB_Con.orderBy(columnName, order);
        dt.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var row = $('<tr>');
                var movieNameCell = $('<td>').text(doc.data().movie_name);
                row.append(movieNameCell);
                var movieRatingCell = $('<td>').text(doc.data().movie_rating + '/5');
                row.append(movieRatingCell);
                var directorNameCell = $('<td>').text(doc.data().director_name);
                row.append(directorNameCell);
                var movieRatingCell = $('<td>').text(doc.data().releaseDate);
                row.append(movieRatingCell);
                var deleteButtonCell = $('<td>');
                var deleteButton = $('<button>').text('Delete').addClass('btn btn-danger');
                var editButton = $('<button>').text('Edit').addClass('btn btn-outline-warning'); // New button for update
                deleteButton.click(function () {
                    const movId = doc.id
                    deleteMovieReview(DB_Con, movId, row);
                });
                editButton.click(function () {
                    $('#update-area-main').toggle();
                    $("#UmovieName").val(doc.data().movie_name);
                    $("#UmovieRating").val(doc.data().movie_rating);
                    $("#UdirectorName").val(doc.data().director_name);
                    $("#UreleaseDate").val(doc.data().releaseDate);
                    Movie_name_instance_id = doc.id;
                });
                deleteButtonCell.append(deleteButton);
                deleteButtonCell.append(editButton);
                row.append(deleteButtonCell);
                $('#reviewList').append(row);
                //});//query snapshot end
            });
        });
    }
    //table header button
    $('th').on('click', function () {
        $('#reviewList').empty();
        //theader();
        let myOrderplan
        var column = $(this).data('column')
        var order = $(this).data('order')
        console.log('column was cicked', column, order)
        var text = $(this).html()
        text = text.substring(0, text.length - 1)
        //movie name sort

        myif: if (column == 'mName' && order == 'desc') {
            $(this).data('order', 'asc')
            text += '&#9650'
            _columnName = 'movie_name';
            _order = 'desc'
            sortdata(_columnName, _order);
            break myif;

        }
        myif: if (column == 'mName' && order == 'asc') {
            $(this).data('order', 'desc')
            text += '&#9660'
            _columnName = 'movie_name';
            _order = 'asc'
            sortdata(_columnName, _order);
            break myif;
        }// end movie_name sort
        //rating sort 
        myif: if (column == 'mRating' && order == 'desc') {
            $(this).data('order', 'asc')
            text += '&#9650'
            _columnName = 'movie_rating';
            _order = 'desc'
            sortdata(_columnName, _order);
            break myif;
        }
        myif: if (column == 'mRating' && order == 'asc') {
            $(this).data('order', 'desc')
            text += '&#9660'
            _columnName = 'movie_rating';
            _order = 'asc'
            sortdata(_columnName, _order);
            break myif;
        }// end movie rating sort
        //derector name sort
        myif: if (column == 'mDname' && order == 'desc') {
            $(this).data('order', 'asc')
            text += '&#9650'
            _columnName = 'director_name';
            _order = 'desc'
            sortdata(_columnName, _order);
            break myif;
        }
        myif: if (column == 'mDname' && order == 'asc') {
            $(this).data('order', 'desc')
            text += '&#9660'
            _columnName = 'director_name';
            _order = 'asc'
            sortdata(_columnName, _order);
            break myif;
        }// end director name sort
        // release date srt
        myif: if (column == 'mRdate' && order == 'desc') {
            $(this).data('order', 'asc')
            text += '&#9650'
            _columnName = 'releaseDate';
            _order = 'desc'
            sortdata(_columnName, _order);
            break myif;
        }
        myif: if (column == 'mRdate' && order == 'asc') {
            $(this).data('order', 'desc')
            text += '&#9660'
            _columnName = 'releaseDate';
            _order = 'asc'
            sortdata(_columnName, _order);
            break myif;
        }//end release date sort
        $(this).html(text);
    })


    // Display review count
    $('#mainTitle').html(querySnapshot.size + " Movies reviews in the list");

});


$('#closeButton').click(function () {
    $('#update-area-main').toggle();
})
// Add button pressed
$("#addButton").click(function () {
    $('#reviewHeader').empty();
    // Add review to Firestore collection
    DB_Con.add({
        movie_name: $("#movieName").val(),
        movie_rating: parseInt($("#movieRating").val()),
        director_name: $("#directorName").val(),
        releaseDate: $("#releaseDate").val()
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            //console.log(new Date())
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    // Reset form
    $("#movieName").val('');
    $("#movieRating").val('1');
    $("#directorName").val('')
    $("#releaseDate").val('')

});

// Update Button
$('#uptButton').click(function () {
    DB_Con.doc(Movie_name_instance_id).set({
        movie_name: $("#UmovieName").val(),
        movie_rating: parseInt($("#UmovieRating").val()),
        director_name: $("#UdirectorName").val(),
        releaseDate: $("#UreleaseDate").val()

    }).then(() => {
        console.log(Movie_name_instance_id + " Movie Updated")
        $('#update-area-main').toggle();
    })
    $('#reviewHeader').empty();
});


