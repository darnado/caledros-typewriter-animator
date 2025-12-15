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

export default function FontFamilySettings({
  attributes,
  setAttributes,
  registeredFonts,
  getAvailableFontStyles,
  getAvailableFontWeights,
  doesFontExist,
}) {
  const { fontFamily, fontWeight, fontStyle } = attributes;

  // Recover theme fonts and custom fonts
  const themeFonts =
    registeredFonts?.theme?.map((font) => {
      return { label: font.name, value: font.slug };
    }) || [];

  const customFonts =
    registeredFonts?.custom?.map((font) => {
      return { label: font?.name, value: font?.slug };
    }) || [];

  const fontOptions = [
    { label: "Default", value: "" },
    ...(themeFonts.length !== 0 ? themeFonts : []),
    ...(customFonts && customFonts?.length !== 0 ? customFonts : []),
  ];

  return (
    <SelectControl
      __next40pxDefaultSize
      __nextHasNoMarginBottom
      help={__("Select the font family.", "typewriter-animation-block")}
      value={fontFamily}
      options={fontOptions}
      onChange={(newFontFamily) => {
        // Get available font styles for the new font family and update if necessary
        const availableFontStyles = doesFontExist(newFontFamily)
          ? getAvailableFontStyles(newFontFamily)
          : [];

        const newFontStyle = availableFontStyles.includes(fontStyle)
          ? fontStyle
          : availableFontStyles[0];

        // Get available font weights for the new font family and update if necessary
        const availableFontWeights = doesFontExist(newFontFamily)
          ? getAvailableFontWeights(newFontFamily, newFontStyle)
          : [];

        const newFontWeight = availableFontWeights.includes(fontWeight)
          ? fontWeight
          : availableFontWeights[0];

        setAttributes({
          fontFamily: newFontFamily,
          ...(doesFontExist(newFontFamily) &&
            newFontStyle !== fontStyle && {
              fontStyle: newFontStyle,
            }),
          ...(doesFontExist(newFontFamily) &&
            newFontWeight !== fontWeight && {
              fontWeight: newFontWeight,
            }),
        });
      }}
    />
  );
}
