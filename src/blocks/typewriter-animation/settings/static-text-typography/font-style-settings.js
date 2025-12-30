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

export default function FontStyleSettings({
  attributes,
  setAttributes,
  getAvailableFontStyles,
  getAvailableFontWeights,
  doesFontExist,
}) {
  const { staticTextFontFamily, staticTextFontStyle, staticTextFontWeight } =
    attributes;

  // Default font styles
  const defaultFontStyles = [
    { label: "Normal", value: "normal" },
    { label: "Italic", value: "italic" },
  ];

  // Create options array for the controller
  const fontStyleOptions = getAvailableFontStyles(staticTextFontFamily)?.map(
    (styleValue) => {
      return {
        label: `${styleValue[0].toUpperCase()}${styleValue.slice(1)}`,
        value: `${styleValue}`,
      };
    }
  );

  return (
    <SelectControl
      __next40pxDefaultSize
      __nextHasNoMarginBottom
      help={__("Select the font style.", "typewriter-animation-block")}
      value={staticTextFontStyle}
      options={
        fontStyleOptions.length === 0 ? defaultFontStyles : fontStyleOptions
      }
      onChange={(newFontStyle) => {
        const availableFontWeights = doesFontExist(staticTextFontFamily)
          ? getAvailableFontWeights(staticTextFontFamily, newFontStyle)
          : [];

        const newFontWeight = availableFontWeights.includes(
          staticTextFontWeight
        )
          ? staticTextFontWeight
          : availableFontWeights[0];

        setAttributes({
          staticTextFontStyle: newFontStyle,
          ...(doesFontExist(staticTextFontFamily) &&
            staticTextFontWeight !== newFontWeight && {
              staticTextFontWeight: newFontWeight,
            }),
        });
      }}
    />
  );
}
