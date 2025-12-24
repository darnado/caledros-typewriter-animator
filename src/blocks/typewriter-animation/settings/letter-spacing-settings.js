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

import {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";

export default function LetterSpacingSettings({ attributes, setAttributes }) {
  const { textLetterSpacing } = attributes;
  const [useNormalLetterSpacing, setUseNormalLetterSpacing] = useState(
    textLetterSpacing === "normal" ? true : false
  );

  // Recover the unit used in the letter spacing
  const unit = textLetterSpacing.replace(/[\d.]+/g, "") || "px";
  const letterSpacingUnit = ["px", "em", "rem"].includes(unit) ? unit : "px";

  // Recover the numeric value of the letter spacing
  const letterSpacingNumber = (unit) => {
    if (unit === "px") {
      return parseInt(textLetterSpacing) || 0;
    } else {
      return parseFloat(textLetterSpacing) || 0;
    }
  };

  // Enforce max value for pixels
  const enforceMaxValue = (unit, valueNumber) => {
    if (unit !== "px" && valueNumber > 10) {
      return 10;
    } else {
      return valueNumber;
    }
  };

  return (
    <PanelBody
      title={__("Letter spacing", "caledros-basic-blocks")}
      initialOpen={false}
    >
      <ToggleControl
        __nextHasNoMarginBottom
        label={__("Use normal letter spacing", "caledros-basic-blocks")}
        checked={useNormalLetterSpacing}
        onChange={() => {
          const temporalValue = useNormalLetterSpacing ? "0" : "normal";
          setUseNormalLetterSpacing((oldValue) => !oldValue);
          setAttributes({
            textLetterSpacing: `${temporalValue}${
              temporalValue === "normal" ? "" : letterSpacingUnit
            }`,
          });
        }}
      />
      {!useNormalLetterSpacing && (
        <div className="cbb-editor__grid">
          <RangeControl
            __next40pxDefaultSize
            __nextHasNoMarginBottom
            help={__(
              `Please select the custom letter spacing (${letterSpacingUnit}).`,
              "caledros-basic-blocks"
            )}
            value={parseFloat(textLetterSpacing) || 0}
            max={letterSpacingUnit === "px" ? 50 : 10}
            min={0}
            step={letterSpacingUnit === "px" ? 1 : 0.01}
            onChange={(newLetterSpacing) => {
              setAttributes({
                textLetterSpacing: `${enforceMaxValue(
                  letterSpacingUnit,
                  newLetterSpacing
                )}${letterSpacingUnit}`,
              });
            }}
          />
          <SelectControl
            __nextHasNoMarginBottom
            __next40pxDefaultSize
            value={letterSpacingUnit}
            options={[
              {
                label: "px",
                value: "px",
              },
              {
                label: "em",
                value: "em",
              },
              {
                label: "rem",
                value: "rem",
              },
            ]}
            onChange={(newUnit) => {
              setAttributes({
                textLetterSpacing: `${enforceMaxValue(
                  newUnit,
                  letterSpacingNumber(newUnit)
                )}${newUnit}`,
              });
            }}
          />
        </div>
      )}
    </PanelBody>
  );
}
