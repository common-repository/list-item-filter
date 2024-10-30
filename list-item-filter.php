<?php
/**
 * Plugin Name: List Item Filter
 * Description: Filter out list items with a shortcode-generated search field.
 * Version: 1.4
 * Author: Zach Watkins
 * Author URI: http://zachwatkins.info
 * Author Email: watkinza@gmail.com
 * License: GPL2+
**/

// If this file is called directly, abort.
defined( 'ABSPATH' ) or die( 'access denied' );

function list_item_filter_addscript(){

  wp_register_script( 'list_item_filter_wp_plugin',
    plugin_dir_url( __FILE__ ) . 'js/main.js',
    false,
    true
  );

}

add_action( 'wp_enqueue_scripts', 'list_item_filter_addscript' );

function list_item_filter_shortcode( $atts ){

  global $wp;

  wp_enqueue_script( 'list_item_filter_wp_plugin' );

  $defaults = array(
    'formclass' => 'search-form',
    'inputclass' => 'search-field',
    'label' => 'Filter list items:',
    'showlabel' => 'true',
    'placeholder' => 'Search',
    'searchtitles' => 'false',
    'noresultsmsg' => 'no results'
  );

  // Ensure attributes are not misused
  foreach($atts as $key=>$value){
    $atts[$key] = str_replace('"', '', $value);
  }

  // Overwrite defaults with user-defined attributes
  $atts = array_merge($defaults, $atts);

  $placeholder = $atts['placeholder'];
  if(!empty($placeholder)){
    $placeholder = ' placeholder="' . $placeholder . '"';
  }

  $formclass = $atts['formclass'];
  if($atts['showlabel'] === 'false'){
    $formclass .= ' list-item-filter-plugin-hidelabel';
  }

  $output = sprintf( '<form class="%s list-item-filter-plugin" action="%s" method="GET" data-lifp-search-titles="%s" data-lifp-no-results-msg="%s"><label for="list-item-filter-searchbox">%s </label><input id="list-item-filter-searchbox" class="%s"%s autocomplete="off" name="filter" type="search" aria-describedby="list-item-filter-description" /><span id="list-item-filter-description">Remove items from the following list that don\'t use the text you provided</span></form>',
    $formclass,
    home_url(add_query_arg(array(),$wp->request)),
    $atts['searchtitles'],
    $atts['noresultsmsg'],
    $atts['label'],
    $atts['inputclass'],
    $placeholder
  );

  $output .= '
  <style type="text/css">
    .lifp-hide {
      display: none;
    }
    form.list-item-filter-plugin-hidelabel label {
      display: block;
      width: 0;
      height: 0;
      overflow: hidden;
      white-space: nowrap;
      text-indent: 110em;
    }
    form.list-item-filter-plugin input[type="search"] {
      background-image: url("' . plugin_dir_url( __FILE__ ) . 'img/search.png");
      background-repeat: no-repeat;
      background-position: 100% 50%;
    }
    form.list-item-filter-plugin input:focus {
      background-image: none;
    }
    form.list-item-filter-plugin #list-item-filter-description {
      display: none;
    }
  </style>';

  return $output;

}

add_shortcode( 'list_item_filter', 'list_item_filter_shortcode' );

?>
