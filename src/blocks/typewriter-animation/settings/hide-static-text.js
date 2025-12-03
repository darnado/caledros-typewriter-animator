/*
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

import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function HideStaticTextSettings({ attributes, setAttributes }) {
  const { hideStaticText } = attributes;

  return (
    <PanelBody
      title={__("Hide static text", "typewriter-animation-block")}
      initialOpen={false}
    >
      <ToggleControl
        __nextHasNoMarginBottom
        label={__("Hide static text", "typewriter-animation-block")}
        help={__(
          "Hides the static text of the typewriter block.",
          "typewriter-animation-block"
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
