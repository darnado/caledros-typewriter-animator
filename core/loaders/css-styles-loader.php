<?php
if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Typewriter Animation Block - A WordPress plugin
 * Copyright (C) 2025  David Arnado
 * 
 * This file is part of Typewriter Animation Block.
 * 
 * Typewriter Animation Block is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * Typewriter Animation Block is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along
 * with Typewriter Animation Block; if not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Loads custom CSS styles for the editor.
 * 
 * Loads the custom CSS styles for the block's inspector
 * controls in the Gutenberg editor.
 * 
 * @return void
 */

function twab_enqueue_editor_styles()
{
    if (is_admin()) {
        wp_enqueue_style('twab-editor-css', plugin_dir_url(dirname(__FILE__)) . 'styles/dist/editor-styles.min.css', array(), '1.0');
    }
}
add_action('enqueue_block_assets', 'twab_enqueue_editor_styles');
