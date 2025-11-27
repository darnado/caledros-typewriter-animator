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

import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { useInstanceId } from "@wordpress/compose";
import { __ } from "@wordpress/i18n";
import { useRef, useEffect } from "@wordpress/element";

export default function EditBlock({ attributes, setAttributes }) {
  // Get block attributes
  const { uniqueId, baseInstanceId } = attributes;

  // Create persistent pointer accross renders
  const rootBlockRef = useRef(null);

  // Generate new ID
  const instanceId = useInstanceId(EditBlock);

  // Check if block is duplicated
  const isDuplicate = baseInstanceId && baseInstanceId !== instanceId;

  // Set new ID if block is new or duplicated
  if (!uniqueId || isDuplicate) {
    const newUniqueId = `twab-${instanceId}`;
    setAttributes({ uniqueId: newUniqueId, baseInstanceId: instanceId });
  }

  // Run after render and access the DOM
  useEffect(() => {
    if (rootBlockRef.current) {
      const heading = rootBlockRef.current.querySelector("h2.twab");
      console.log("Heading:", heading);
    }
  });

  // Block props
  const blockProps = useBlockProps({ ref: rootBlockRef }); // Attach persistent pointer to the block
  return (
    <>
      <InspectorControls></InspectorControls>
      <div {...blockProps}>
        <h2 className="twab">
          Crafting something{" "}
          <span id={uniqueId} className="twab__animation-text">
            amazing
          </span>
          <span className="twab__cursor">|</span>
        </h2>
      </div>
    </>
  );
}
