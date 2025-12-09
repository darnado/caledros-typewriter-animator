<?php
if ( ! defined( 'ABSPATH' ) ) {
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

?>

<?php

function twab_render_cb($attributes){
    // Block attributes
    $uniqueId = sanitize_text_field($attributes['uniqueId'] ?? '');  
    $staticText =  sanitize_text_field($attributes['staticText'] ?? '');      
    $hideStaticText = filter_var($attributes['hideStaticText'] ?? false, FILTER_VALIDATE_BOOLEAN);
    $animatedPhrases = $attributes['animatedPhrases'] ?? [];
    $animationSpeed = intval($attributes['animationSpeed'] ?? 100);
    $textColor = sanitize_text_field($attributes['textColor'] ?? '#000000');  

    // Sanitize array 
    if ( is_array( $animatedPhrases ) ) {
        $animatedPhrases = array_map( 'sanitize_text_field', $animatedPhrases );
    }

    // Prepare the context JSON content
    $wp_context = [    
        "uniqueId" => $uniqueId,
        "animatedPhrases" => $animatedPhrases,
        "animationSpeed" => $animationSpeed        
    ];

    $wp_context_json = htmlspecialchars(json_encode($wp_context), ENT_QUOTES, 'UTF-8');
    
    // BUFFERING
    // Start output buffering
    ob_start(); 
    ?>  
    
    <div data-wp-interactive="typewriter-animation" data-wp-context='<?php echo esc_attr($wp_context_json);?>' data-wp-init="callbacks.onInit">
        <h2 class="twab">
            <?php if( !$hideStaticText ): ?>
                <span class="twab__static-text" style="color: <?php echo esc_attr($textColor); ?>">
                    <?php echo esc_html( $staticText ); ?>
                </span>
            <?php endif; ?>    
            <span id="<?php echo esc_attr($uniqueId); ?>" class="twab__animation-text" style="color: <?php echo esc_attr($textColor); ?>"></span><span class="twab__cursor" style="color: <?php echo esc_attr($textColor); ?>>|</span>
        </h2>
    </div>
    <?php 
    // Fetch the content of the output buffer
    $output = ob_get_contents();
    // Stop output buffering
    ob_end_clean();
    // Output the stored content
    return $output; 
}
