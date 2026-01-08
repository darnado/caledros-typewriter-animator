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

import { PanelBody, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function PauseDurationSettings({ attributes, setAttributes }) {
  const { pauseDuration } = attributes;

  return (
    <PanelBody
      title={__("Pause duration", "caledros-typewriter-animator")}
      initialOpen={false}
    >
      <RangeControl
        __next40pxDefaultSize
        __nextHasNoMarginBottom
        help={__(
          "Adjust pause duration in milliseconds",
          "caledros-typewriter-animator"
        )}
        initialPosition={pauseDuration}
        value={pauseDuration}
        max={5000}
        min={0}
        step={10}
        onChange={(newValue) => setAttributes({ pauseDuration: newValue })}
      />
    </PanelBody>
  );
}
