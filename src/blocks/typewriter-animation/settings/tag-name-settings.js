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

import { SelectControl, PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function TagNameSettings({ attributes, setAttributes }) {
  const { tagName } = attributes;

  return (
    <PanelBody
      title={__("Tag name", "caledros-basic-blocks")}
      initialOpen={false}
    >
      <SelectControl
        __next40pxDefaultSize
        __nextHasNoMarginBottom
        value={tagName}
        help={__(
          "Choose the HTML tag for the typewriter animation.",
          "typewriter-animation-block"
        )}
        options={[
          {
            label: "H1",
            value: "h1",
          },
          {
            label: "H2",
            value: "h2",
          },
          {
            label: "H3",
            value: "h3",
          },
          {
            label: "H4",
            value: "h4",
          },
          {
            label: "H5",
            value: "h5",
          },
          {
            label: "H6",
            value: "h6",
          },
          {
            label: "Paragraph",
            value: "p",
          },
        ]}
        onChange={(newTag) => {
          setAttributes({
            tagName: newTag,
          });
        }}
      />
    </PanelBody>
  );
}
