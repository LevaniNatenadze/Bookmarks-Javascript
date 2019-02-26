//submit

document.getElementById("myForm").addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById("siteName").value;
    var urlSite = document.getElementById("urlSite").value;


    if (!validationForm(siteName, urlSite)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: urlSite
    };

    if (localStorage.getItem('bookmarks')===null) {
        var bookmarks = [];
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
       var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
       bookmarks.push(bookmark);
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    document.getElementById('myForm').reset();

    fetchBookmark();

    e.preventDefault();
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (i=0; i<bookmarks.length;i++){
        if (bookmarks[i].url == url) {
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmark();
}

function fetchBookmark() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';

    for (i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="wall">' +
            '<h3>' + name +
            '<a class="btn" target="_blank" href="'+url+'">View</a>' +
            '<a onclick="deleteBookmark(\''+url+'\')" class="btn-delete" href="#">Delete</a>'
            '</h3>' + '</div>';
    }

}

function validationForm (siteName, urlSite) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!urlSite.match(regex)) {
        alert("please use valid URL");
        return false;
    }

    if (!siteName || !urlSite) {
        alert("please fill in the form");
        return false;
    }
    return true;

}
