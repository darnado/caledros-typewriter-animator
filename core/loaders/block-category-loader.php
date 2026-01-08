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
 * Registers the custom Typewriter block category.
 * 
 * Adds a 'caledros-typewriter-animator' category to the top
 * of the categories list, so the block appears in its own section.
 * 
 * @param array $categories Existing block categories.
 * @return array Modified block categories including the custom category.
 */

function ctwa_register_block_category($categories)
{
    array_unshift($categories, [
        'slug'  => 'caledros-typewriter-animator',
        'title' => __('Caledros Typewriter Animator', 'caledros-typewriter-animator')
    ]);
    return $categories;
}

add_filter('block_categories_all', 'ctwa_register_block_category');
