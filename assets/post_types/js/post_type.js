/* Galleria
------------------------- */
function remove_img(value) {
	jQuery(function($) { 
		removeUrlImgGallery( $(value).parent().parent().find('.gallery_img_img').attr('src') );
	});
    var parent=jQuery(value).parent().parent();
    parent.remove();
}
var media_uploader = null;
function open_media_uploader_image(aaa){
	media_uploader = wp.media({
		frame:    "post", 
		state:    "insert", 
		multiple: false
	});
	media_uploader.on("insert", function(){
		var json = media_uploader.state().get("selection").first().toJSON();
		var image_url = json.url;
		image_url = image_url.replace("https://www.discotechemilano.it", "");
		var html = '<img class="gallery_img_img" src="'+ image_url +'" height="55" width="55" onclick="open_media_uploader_image_this(this)"/>';
		jQuery(aaa).append(html);
		pushUrlImg( image_url );	
	});
	media_uploader.open();
}
function open_media_uploader_image_this(aaa){
	media_uploader = wp.media({
		frame:    "post", 
		state:    "insert", 
		multiple: false
	});
	media_uploader.on("insert", function(){
		var json = media_uploader.state().get("selection").first().toJSON();
		var image_url = json.url;
		image_url = image_url.replace("https://www.discotechemilano.it", "");
		updateImgUrl( jQuery(aaa).attr('src'), image_url );
		jQuery(aaa).attr('src',image_url);
	});
	media_uploader.open();
}

function open_media_uploader_image_plus(){
	media_uploader = wp.media({
		frame:    "post", 
		state:    "insert", 
		multiple: true 
	});
	media_uploader.on("insert", function(){
		var length = media_uploader.state().get("selection").length;
		var images = media_uploader.state().get("selection").models
		for(var iii = 0; iii < length; iii++){
			var image_url = images[iii].changed.url;
			image_url = image_url.replace("https://www.discotechemilano.it", "");
			var box = jQuery('#main_box').html();
			jQuery(box).appendTo('#img_box_container');
			var element = jQuery('#img_box_container .gallery_single_row:last-child').find('.image_container');
			var html = '<img class="gallery_img_img" src="'+image_url+'" height="55" width="55" onclick="open_media_uploader_image_this(this)"/>';
			element.append(html);
			pushUrlImg( image_url );
		}
	});
	media_uploader.open();
}
function updateImgUrl( url, newUrl ) {
	jQuery(function($) { 
		var json = $('textarea#json-gallery').text();
		var new_gallery = [];
		if ( json.length > 0 ) {
			json = JSON.parse(json).images;
			var urls = '';
			for (var i = 0; i < json.length; i++) {
				if ( json[i] != url) 
					urls += '"'+ json[i] +'",'; 
				else 
					urls += '"'+ newUrl +'",'; 
			}
			new_gallery.push( urls.substring(0, urls.length-1) );

			var outputStr = '{ "images": [';
			for (var i = 0; i < new_gallery.length; i++) {
				outputStr += new_gallery[i];
			}
			outputStr += ']}';
			$('textarea#json-gallery').text( outputStr );
		} else {
			$('textarea#json-gallery').text( '{ "images": ["'+ url +'"] }' );
		}
	});
}

function removeUrlImgGallery( url ) {
	jQuery(function($) { 
		var json = $('textarea#json-gallery').text();
		var new_gallery = [];
		if ( json.length > 0 ) {
			json = JSON.parse(json).images;
			var urls = '';
			for (var i = 0; i < json.length; i++) {
				if ( json[i] != url) {
					urls += '"'+ json[i] +'",'; 
				}
			}
			new_gallery.push( urls.substring(0, urls.length-1) );

			var outputStr = '{ "images": [';
			for (var i = 0; i < new_gallery.length; i++) {
				outputStr += new_gallery[i];
			}
			outputStr += ']}';
			$('textarea#json-gallery').text( outputStr );
		} else {
			$('textarea#json-gallery').text( '{ "images": ["'+ url +'"] }' );
		}
	});
}

function pushUrlImg( url ) {
	jQuery(function($) { 
		var json = $('textarea#json-gallery').text();
		var new_gallery = [];
		if ( json.length > 0 ) {
			json = JSON.parse(json).images;
			for (var i = 0; i < json.length; i++) {
				new_gallery.push( '"'+ json[i] +'",' );
			}
			new_gallery.push( '"'+ url +'"' );

			var outputStr = '{ "images": [';
			for (var i = 0; i < new_gallery.length; i++) {
				outputStr += new_gallery[i];
			}
			outputStr += ']}';
			$('textarea#json-gallery').text( outputStr );
		} else {
			$('textarea#json-gallery').text( '{ "images": ["'+ url +'"] }' );
		}
	});
}