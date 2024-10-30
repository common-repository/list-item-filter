=== List Item Filter ===
Contributors: zachwtx
Tags: list, filter, search, shortcode, javascript
Requires at least: 2.5
Tested up to: 4.6
Stable tag: 1.4

Filter out list items with a shortcode-generated search field.

== Description ==

This plugin provides a shortcode that generates a text input field, which filters out list items that do not contain that field's text. Any sibling elements of the shortcode, or children of those siblings, that are "li" elements will be searched by the text field it generates. As you type, each word in the text field is matched against the readable text of the list items (and optionally their title attributes). Any list items which don't match that text are hidden.

Example: `[list_item_filter placeholder="Filter this list by terms" searchtitles="true"]`

Shortcode parameters:

* **label** (string): Define the search field's label text. *Default value: Filter list items:*
* **showlabel** (boolean): Determine whether or not the search field's label is visible. *Default value: true*
* **placeholder** (string): Define the search field's placeholder text. *Default value: Search*
* **noresultsmsg** (string): Define the message shown when no list items are found. Provide an empty string to disable this feature. *Default value: no results*
* **searchtitles** (bool): Expand text matching to include the first title attribute of the list item's HTML. *Default value: false*
* **formclass** (string): Define one or more class names for the form. *Default value: search-form*
* **inputclass** (string): Define one or more class names for the search field. *Default value: search-field*

If you like this plugin or have a request, let me know!

== Installation ==

Upload the plugin to your blog, activate it, then use the shortcode in a page or post!

== Changelog ==

= Version 1.4 =

* Add label parameter for defining label text
* Show search field label
* Add showlabel parameter to allow users to hide the search field label
* Add magnifying glass icon to search box to improve accessibility
* Add aria-describedby text to search box to improve accessibility, informing screen reader users of what will happen to the page's content when they type in the box

= Version 1.3 =

* Fix text input case matching issue

= Version 1.2 =

* Add label to search field to improve accessibility
* Add notes to Javascript
* Improve readability of documentation
* Add tags

= Version 1.1 =

* Add message informing users that no items were found that matched their text
* Add noresultsmsg parameter so users can customize the text displayed when no matching items are found
* Rename data attribute for searchtitles parameter
* Add class names to items for show and hide states
* Change visibility manipulation to remove inline styling in favor of a stylesheet

= Version 1.0 =

* Provide shortcode parameters for class names, placeholder text, and searching title attributes
* Refactor Javascript to allow multiple instances per page
* Ensure Javascript file is only added to page when shortcode is in use
* Add support for IE9 placeholder attribute
