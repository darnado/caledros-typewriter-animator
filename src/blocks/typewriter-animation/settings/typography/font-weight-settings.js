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

import { SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function FontWeightSettings({
  attributes,
  setAttributes,
  getAvailableFontWeights,
}) {
  const { fontFamily, fontWeight, fontStyle } = attributes;

  // Default font weights
  const defaultFontWeights = [
    { label: "100", value: 100 },
    { label: "200", value: 200 },
    { label: "300", value: 300 },
    { label: "400", value: 400 },
    { label: "500", value: 500 },
    { label: "600", value: 600 },
    { label: "700", value: 700 },
    { label: "800", value: 800 },
    { label: "900", value: 900 },
  ];

  // Define the font weight options for the controller
  const fontWeightOptions = getAvailableFontWeights(fontFamily, fontStyle)?.map(
    (weightValue) => {
      return { label: `${weightValue}`, value: weightValue };
    }
  );

  return (
    <SelectControl
      __next40pxDefaultSize
      __nextHasNoMarginBottom
      help={__("Select the font weight.", "typewriter-animation-block")}
      value={fontWeight}
      options={fontWeightOptions || defaultFontWeights}
      onChange={(newValue) => {
        setAttributes({
          fontWeight: parseInt(newValue),
        });
      }}
    />
  );
}
