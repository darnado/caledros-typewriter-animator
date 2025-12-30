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

import { PanelBody, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function AnimationSpeedSettings({ attributes, setAttributes }) {
  const { animationSpeed } = attributes;

  return (
    <PanelBody
      title={__("Animation speed", "typewriter-animation-block")}
      initialOpen={false}
    >
      <RangeControl
        __next40pxDefaultSize
        __nextHasNoMarginBottom
        help={__(
          "Adjust the animation speed in miliseconds",
          "typewriter-animation-block"
        )}
        initialPosition={animationSpeed}
        value={animationSpeed}
        max={3000}
        min={0}
        step={10}
        onChange={(newValue) => setAttributes({ animationSpeed: newValue })}
      />
    </PanelBody>
  );
}
