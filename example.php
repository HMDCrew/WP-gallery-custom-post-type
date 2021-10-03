<?php

add_action( 'init', function () {


	$post_type_script = 'cust_post_type';


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


	/* Gallery Meta Box 
	------------------------- */
	add_action( 'add_meta_boxes', function () {
		add_meta_box( 'addMetaBoxGallery', 'Gallery', function ($post) { 

			wp_nonce_field( basename(__FILE__), 'sample_nonce' );
			
			$gallery_data = get_post_meta( $post->ID, 'gallery_data', true ); ?>
			
			<div id="dynamic_cont">
			    <div id="img_box_container">
				    <?php if ($gallery_data) : ?>
					   	
					   	<?php $gallery_dataOBJ = json_decode( $gallery_data )->images; ?>

						<?php if ($gallery_dataOBJ != '') : ?>
						<?php for ($i=0; $i<count($gallery_dataOBJ); $i++) : ?>
							<div class="gallery_single_row dolu">
					        	<div class="gallery_area_div image_container ">
					            	<img class="gallery_img_img" src="<?php echo $gallery_dataOBJ[$i]; ?>" height="55" width="55" onclick="open_media_uploader_image_this(this)"/>
							  	</div>
					          	<div class="gallery_area_div">
					          		<button type="button" class="ml-2 mb-1 btn-remove dashicons dashicons-trash" onclick="remove_img(this)"></button>
					          	</div>
					          	<div class="clear" /></div> 
					    	</div>
						<?php endfor; ?>
						<?php endif; ?>

				    <?php endif; ?>
			    </div>
			    <div style="display:none" id="main_box">
					<div class="gallery_single_row">
						<div class="gallery_area_div image_container" onclick="open_media_uploader_image(this)"></div> 
						<div class="gallery_area_div"> 
							<button type="button" class="ml-2 mb-1 btn-remove dashicons dashicons-trash" onclick="remove_img(this)"></button>
						</div>
						<div class="clear"></div>
					</div>
			    </div>
			    <div id="add_gallery_single_row">
			    	<input class="button add" type="button" value="+" onclick="open_media_uploader_image_plus();" title="Add image"/>
			    </div>
			</div>
		    <textarea id="json-gallery" name="gallery_data" class="gallery_data w-100"><?php echo $gallery_data; ?></textarea>
			<?php
		}, $post_type_script, 'normal', 'low' );
	});



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

});

?>