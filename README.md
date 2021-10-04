# Gallery for custom post type (Wordpress)
*You can use this gallery in your wordpress theme*

## Post Type name:
* Override "cust_post_type" with your post type slug *
```php
$post_type_script = 'cust_post_type';
```
<br />
<br />

## Load backend assets:
* Edit the path of the folder with the path where you uploaded the files *
```php
/* Assets for backend
------------------------- */
add_action( 'admin_init', function () {
    global $pagenow;
		if ( ($pagenow == 'post.php' && isset($_GET['post']) && $_GET['action'] == 'edit') || ($pagenow == 'post-new.php' && $_GET['post_type'] == $post_type_script) ) {
			add_action( 'admin_enqueue_scripts', function () {
				wp_enqueue_style(  sprintf( '%s_css', $post_type_script), '/assets/post_types/css/post_type.css' );
				wp_enqueue_script( sprintf( '%s_js', $post_type_script),  '/assets/post_types/js/post_type.js', array( 'jquery' ), false, true  );
			});
		}
});
```
<br />
<br />

## You can view this html when edit your custom post:
```php
/* Gallery Meta Box 
	------------------------- */
add_action( 'add_meta_boxes', function () {
	add_meta_box( 'addMetaBoxGallery', 'Gallery', function ($post) { 

      wp_nonce_field( basename(__FILE__), 'sample_nonce' );
			
			$gallery_data = get_post_meta( $post->ID, 'gallery_data', true ); ?>
			
			<div id="dynamic_cont">
        ...
			</div>

      <textarea id="json-gallery" name="gallery_data" class="gallery_data w-100"><?php echo $gallery_data; ?></textarea>
			<?php
	}, $post_type_script, 'normal', 'low' );
});
```
<br />
<br />

## In the last step save the gallery on you publih the post or update it:
```php
/* Salvataggio Post
	-------------------------- */
	add_action( 'save_post', function ($post_ID, $post) {

		$post_type = get_post_type_object( $post->post_type );
	    if( $post_type->name == $post_type_script ) {

	    	// You don't need clear de $_POST array becouse only autorized user can save post 
  			if( isset($_POST['gallery_data']) )
	  			if(update_post_meta($post_ID, 'gallery_data', $_POST['gallery_data']) == false)
			        add_post_meta($post_ID,'gallery_data', $_POST['gallery_data'], true);
		}

	}, 11, 2 );
```
