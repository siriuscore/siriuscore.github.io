$(function () {
    var $content = $("#jsonContent");
    var data = {
        rss_url: "https://medium.com/feed/@SiriusProject"
    };
    $.get("https://api.rss2json.com/v1/api.json", data, function (response) {
        if (response.status == "ok") {
            var output = "";
            $.each(response.items, function (k, item) {
                output += '<div class="col-md-4">';
                output += '<div class="blog-item">';
                var tagIndex = item.description.indexOf("<img"); // Find where the img tag starts
                var srcIndex = item.description.substring(tagIndex).indexOf("src=") + tagIndex; // Find where the src attribute starts
                var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
                output += '<div class="blog-img"><a href="' + item.link + '" target="_blank"><figure><img class="img-fluid" src="' + src + '"></figure></a></div>';
                output += '<div class="blog-content">';
                output += '<div class="blog-author">By ' + item.author + "</div>";
                output += '<div class="blog-title"><h4><a href="' + item.link + '"  target="_blank">' + item.title + "</a></h4></div>";
                output += '<div class="blog-date">' + $.format.date(item.pubDate, "MMM dd,yyyy") + '</div>';
                var yourString = item.description.replace(/<img[^>]*>/g, ""); //replace with your string.
                var maxLength = 120; // maximum number of characters to extract
                //trim the string to the maximum length
                var trimmedString = yourString.substr(0, maxLength);
                //re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(
                    0,
                    Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
                );
                output += '<div class="blog-desc"><p>' + trimmedString + "...</p></div>";
                output += '<a class="btn btn-block btn-light" href="' + item.link + '"  data-i18n="btn.readmore" target="_blank"></a>';
                output += "</div></div></div>";
                return k < 2;
            });
            $content.html(output);
        }
    });
});
