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

import { PanelBody, TextControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function StaticTextSettings({ attributes, setAttributes }) {
  const { staticText } = attributes;

  return (
    <PanelBody
      title={__("Static text", "caledros-typewriter-animator")}
      initialOpen={false}
    >
      <TextControl
        __nextHasNoMarginBottom
        __next40pxDefaultSize
        help={__(
          "Type the content for the static text.",
          "caledros-typewriter-animator"
        )}
        value={staticText}
        onChange={(newValue) => {
          setAttributes({
            staticText: newValue,
          });
        }}
      />
    </PanelBody>
  );
}
