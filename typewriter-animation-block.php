<?php
/**
 * Plugin Name: Typewriter Animation Block
 * Plugin URI: https://caledrosforge.com/
 * Description: It adds a custom typewriter animation block to the WordPress Gutenberg editor. 
 * Version: 1.0.0
 * Requires at least: 6.8
 * Requires PHP: 8.3
 * Author: David Arnado
 * Author URI: https://caledrosforge.com/about/
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain: typewriter-animation-block
 * Domain Path: /languages
 * 
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

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Define base folder
define('TYPEWRITER_ANIMATION_BLOCK_BASE_FOLDER', plugin_dir_path(__FILE__));

// Load core files
require_once(TYPEWRITER_ANIMATION_BLOCK_BASE_FOLDER . 'core/block-category-loader.php');
require_once(TYPEWRITER_ANIMATION_BLOCK_BASE_FOLDER . 'core/block-loader.php');

// Load render callback
require_once(TYPEWRITER_ANIMATION_BLOCK_BASE_FOLDER . 'src/blocks/typewriter-animation/render-callback.php');
