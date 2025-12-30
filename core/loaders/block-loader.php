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
 * Loads the custom Typewriter Animation Block.
 * 
 * Adds the custom Typewriter Animation Block to the 
 * WordPress Gutenberg editor.
 * 
 * @return void
 */

function twab_block_loader()
{
    $twab_blocks = [
        ['block_name' => 'typewriter-animation', 'block_options' => ['render_callback' => 'twab_render_cb']]
    ];

    foreach ($twab_blocks as $twab_block) {
        register_block_type(
            TYPEWRITER_ANIMATION_BLOCK_BASE_FOLDER . 'build/blocks/' . $twab_block['block_name'],
            isset($twab_block['block_options']) ? $twab_block['block_options'] : []
        );
    }
}

add_action('init', 'twab_block_loader');
