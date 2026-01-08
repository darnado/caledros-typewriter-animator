/*
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

import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function HideStaticTextSettings({ attributes, setAttributes }) {
  const { hideStaticText } = attributes;

  return (
    <PanelBody
      title={__("Hide static text", "caledros-typewriter-animator")}
      initialOpen={false}
    >
      <ToggleControl
        __nextHasNoMarginBottom
        label={__("Hide static text", "caledros-typewriter-animator")}
        help={__(
          "Hides the static text of the typewriter block.",
          "caledros-typewriter-animator"
        )}
        checked={hideStaticText}
        onChange={(newValue) => {
          setAttributes({
            hideStaticText: newValue,
          });
        }}
      />
    </PanelBody>
  );
}
