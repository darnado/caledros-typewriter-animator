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

function ctwa_load_block_translations()
{
    $blocks = [
        "caledros-typewriter-animator-editor-script"
    ];

    foreach ($blocks as $block) {
        wp_set_script_translations($block, "caledros-typewriter-animator", CALEDROS_TYPEWRITER_ANIMATOR_BASE_FOLDER . "languages");
    }
}
add_action('enqueue_block_editor_assets', 'ctwa_load_block_translations');
