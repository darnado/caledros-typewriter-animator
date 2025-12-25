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
 * Registers the custom Typewriter block category.
 * 
 * Adds a 'typewriter-animation-block' category to the top
 * of the categories list, so the block appears in its own section.
 * 
 * @param array $categories Existing block categories.
 * @return array Modified block categories including the custom category.
 */

function twab_register_block_category($categories)
{
    array_unshift($categories, [
        'slug'  => 'typewriter-animation-block',
        'title' => __('Typewriter Animation Block', 'typewriter-animation-block')
    ]);
    return $categories;
}

add_filter('block_categories_all', 'twab_register_block_category');
