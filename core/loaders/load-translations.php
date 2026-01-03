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

function twab_load_block_translations()
{
    $blocks = [
        "typewriter-animation-block-editor-script"
    ];

    foreach ($blocks as $block) {
        wp_set_script_translations($block, "typewriter-animation-block", TYPEWRITER_ANIMATION_BLOCK_BASE_FOLDER . "languages");
    }
}
add_action('enqueue_block_editor_assets', 'twab_load_block_translations');
