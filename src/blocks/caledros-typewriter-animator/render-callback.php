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
 * Renders the Caledros Typewriter Animator on the frontend.
 *
 * Generates the HTML markup for the Caledros Typewriter Animator,
 * sanitizes block attributes, prepares the interactivity API,
 * and returns the buffered output for server-side rendering.
 *
 * @param array $attributes Block attributes passed from the editor.
 * @return string Rendered HTML markup for the block.
 */

function ctwa_render_cb($attributes)
{
    // Block attributes
    $uniqueId = sanitize_text_field($attributes['uniqueId'] ?? '');
    $staticText =  sanitize_text_field($attributes['staticText'] ?? '');
    $hideStaticText = filter_var($attributes['hideStaticText'] ?? false, FILTER_VALIDATE_BOOLEAN);
    $animatedPhrases = $attributes['animatedPhrases'] ?? [];
    $animationSpeed = intval($attributes['animationSpeed'] ?? 100);
    $staticTextColor = sanitize_text_field($attributes['staticTextColor'] ?? '#000000');
    $animatedTextColor = sanitize_text_field($attributes['animatedTextColor'] ?? '#000000');
    $animatedTextFontFamily = sanitize_text_field($attributes['animatedTextFontFamily'] ?? '');
    $animatedTextFontWeight = intval($attributes['animatedTextFontWeight'] ?? 400);
    $animatedTextFontStyle = sanitize_text_field($attributes['animatedTextFontStyle'] ?? 'normal');
    $staticTextFontFamily = sanitize_text_field($attributes['staticTextFontFamily'] ?? '');
    $staticTextFontWeight = intval($attributes['staticTextFontWeight'] ?? 400);
    $staticTextFontStyle = sanitize_text_field($attributes['staticTextFontStyle'] ?? 'normal');
    $textFontSize = sanitize_text_field($attributes['textFontSize'] ?? '50px');
    $textLetterSpacing = sanitize_text_field($attributes['textLetterSpacing'] ?? 'normal');
    $tagName = sanitize_text_field($attributes['tagName'] ?? 'h2');
    $pauseDuration = intval($attributes['pauseDuration'] ?? 1000);

    $allowed_tags = [
        'p',
        'span',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
    ];

    if (! in_array($tagName, $allowed_tags, true)) {
        $tagName = 'h2';
    }

    // Sanitize array 
    if (is_array($animatedPhrases)) {
        $animatedPhrases = array_map('sanitize_text_field', $animatedPhrases);
    }

    // Prepare the context JSON content
    $wp_context = [
        "uniqueId" => $uniqueId,
        "animatedPhrases" => $animatedPhrases,
        "animationSpeed" => $animationSpeed,
        "pauseDuration" => $pauseDuration
    ];

    $wp_context_json = htmlspecialchars(json_encode($wp_context), ENT_QUOTES, 'UTF-8');

    // BUFFERING
    // Start output buffering
    ob_start();
?>

    <div data-wp-interactive="caledros-typewriter-animator" data-wp-context='<?php echo esc_attr($wp_context_json); ?>' data-wp-init="callbacks.onInit">
        <<?php echo esc_html($tagName); ?> class="ctwa">
            <?php if (!$hideStaticText): ?>
                <span class="ctwa__static-text" style="color: <?php echo esc_attr($staticTextColor); ?>; font-weight: <?php echo esc_attr($staticTextFontWeight); ?>; font-style: <?php echo esc_attr($staticTextFontStyle); ?> <?php if (($staticTextFontFamily !== "")) echo '; font-family: var(--wp--preset--font-family--' . esc_attr($staticTextFontFamily) . ')' ?>; font-size: <?php echo esc_attr($textFontSize); ?>; letter-spacing: <?php echo esc_attr($textLetterSpacing); ?>">
                    <?php echo esc_html($staticText); ?>
                </span>
            <?php endif; ?>
            <span id="<?php echo esc_attr($uniqueId); ?>" class="ctwa__animation-text" style="color: <?php echo esc_attr($animatedTextColor); ?>; font-weight: <?php echo esc_attr($animatedTextFontWeight); ?>; font-style: <?php echo esc_attr($animatedTextFontStyle); ?> <?php if (($animatedTextFontFamily !== "")) echo '; font-family: var(--wp--preset--font-family--' . esc_attr($animatedTextFontFamily) . ')' ?>; font-size: <?php echo esc_attr($textFontSize); ?>; letter-spacing: <?php echo esc_attr($textLetterSpacing); ?>">
            </span><span class="ctwa__cursor" style="color: <?php echo esc_attr($animatedTextColor); ?>; font-weight: <?php echo esc_attr($animatedTextFontWeight); ?>; font-style: <?php echo esc_attr($animatedTextFontStyle); ?> <?php if (($animatedTextFontFamily !== "")) echo '; font-family: var(--wp--preset--font-family--' . esc_attr($animatedTextFontFamily) . ')' ?>; font-size: <?php echo esc_attr($textFontSize); ?>; letter-spacing: <?php echo esc_attr($textLetterSpacing); ?>">|</span>
        </<?php echo esc_html($tagName); ?>>
    </div>
<?php
    // Fetch the content of the output buffer
    $output = ob_get_contents();
    // Stop output buffering
    ob_end_clean();
    // Output the stored content
    return $output;
}
