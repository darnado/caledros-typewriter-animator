<?php
if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Caledros Typewriter Animator - A WordPress plugin
 * Copyright (C) 2025 - 2026  David Arnado
 * 
 * This file is part of Caledros Typewriter Animator.
 * 
 * Caledros Typewriter Animator is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * Caledros Typewriter Animator is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along
 * with Caledros Typewriter Animator; if not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Loads the custom Caledros Typewriter Animator.
 * 
 * Adds the custom Caledros Typewriter Animator block to the 
 * WordPress Gutenberg editor.
 * 
 * @return void
 */

function ctwa_block_loader()
{
    $ctwa_blocks = [
        ['block_name' => 'caledros-typewriter-animator', 'block_options' => ['render_callback' => 'ctwa_render_cb']]
    ];

    foreach ($ctwa_blocks as $ctwa_block) {
        register_block_type(
            CALEDROS_TYPEWRITER_ANIMATOR_BASE_FOLDER . 'build/blocks/' . $ctwa_block['block_name'],
            isset($ctwa_block['block_options']) ? $ctwa_block['block_options'] : []
        );
    }
}

add_action('init', 'ctwa_block_loader');
