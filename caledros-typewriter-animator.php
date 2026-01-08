<?php

/**
 * Plugin Name: Caledros Typewriter Animator
 * Plugin URI: https://caledrosforge.com/
 * Description: Add a custom typewriter animation block to the WordPress Gutenberg editor. 
 * Version: 1.0.0
 * Requires at least: 6.9
 * Requires PHP: 8.3
 * Author: David Arnado
 * Author URI: https://caledrosforge.com/about/
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain: caledros-typewriter-animator
 * Domain Path: /languages
 * 
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

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Define base folder
define('CALEDROS_TYPEWRITER_ANIMATOR_BASE_FOLDER', plugin_dir_path(__FILE__));

// Load core files
require_once(CALEDROS_TYPEWRITER_ANIMATOR_BASE_FOLDER . 'core/loaders/block-category-loader.php');
require_once(CALEDROS_TYPEWRITER_ANIMATOR_BASE_FOLDER . 'core/loaders/block-loader.php');
require_once(CALEDROS_TYPEWRITER_ANIMATOR_BASE_FOLDER . 'core/loaders/css-styles-loader.php');

// Load render callback
require_once(CALEDROS_TYPEWRITER_ANIMATOR_BASE_FOLDER . 'src/blocks/caledros-typewriter-animator/render-callback.php');

// Load translations
require_once(CALEDROS_TYPEWRITER_ANIMATOR_BASE_FOLDER . 'core/loaders/load-translations.php');
