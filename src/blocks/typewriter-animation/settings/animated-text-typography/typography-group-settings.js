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

import { PanelBody } from "@wordpress/components";
import { useSettings } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import FontFamilySettings from "./font-family-settings";
import FontWeightSettings from "./font-weight-settings";
import FontStyleSettings from "./font-style-settings";

export default function AnimatedTextTypographyGroupSettings({
  attributes,
  setAttributes,
}) {
  const [registeredFonts] = useSettings("typography.fontFamilies");
  const { theme = [], custom = [] } = registeredFonts || {};
  const allFonts = [...theme, ...custom];

  const doesFontExist = (fontFamily) => {
    return allFonts.some((font) => font?.slug === fontFamily);
  };

  const getAvailableFontStyles = (fontFamily) => {
    const fontFamilyData = allFonts.find((font) => font?.slug === fontFamily);
    const fontStyles =
      fontFamilyData?.fontFace?.map((fontFace) => fontFace?.fontStyle) || [];

    return [...new Set(fontStyles)];
  };

  const getAvailableFontWeights = (fontFamily, fontStyle) => {
    const fontFamilyData = allFonts.find((font) => font?.slug === fontFamily);
    const fontStyles = fontFamilyData?.fontFace?.filter((fontFace) => {
      return fontFace?.fontStyle === fontStyle;
    });
    const fontWeights = fontStyles
      ?.map((fontStyle) => {
        if (fontStyle?.fontWeight?.includes(" ")) {
          const [start, end] = fontStyle?.fontWeight
            .split(" ")
            .map((value) => parseInt(value));
          const range = [];
          for (let i = start; i <= end; i += 100) {
            range.push(i);
          }
          return range;
        }
        return parseInt(fontStyle?.fontWeight);
      })
      .flat()
      .sort((a, b) => a - b);

    return fontWeights;
  };

  return (
    <PanelBody
      title={__("Animated text typography", "typewriter-animation-block")}
      initialOpen={false}
    >
      <FontFamilySettings
        attributes={attributes}
        setAttributes={setAttributes}
        registeredFonts={registeredFonts}
        getAvailableFontStyles={getAvailableFontStyles}
        getAvailableFontWeights={getAvailableFontWeights}
        doesFontExist={doesFontExist}
      ></FontFamilySettings>
      <FontStyleSettings
        attributes={attributes}
        setAttributes={setAttributes}
        getAvailableFontStyles={getAvailableFontStyles}
        getAvailableFontWeights={getAvailableFontWeights}
        doesFontExist={doesFontExist}
      ></FontStyleSettings>
      <FontWeightSettings
        attributes={attributes}
        setAttributes={setAttributes}
        getAvailableFontWeights={getAvailableFontWeights}
      ></FontWeightSettings>
    </PanelBody>
  );
}
