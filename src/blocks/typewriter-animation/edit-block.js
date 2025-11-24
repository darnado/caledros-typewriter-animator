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

export default function EditBlock({ attributes, setAttributes }) {
  const { uniqueId, baseInstanceId } = attributes;
  const instanceId = useInstanceId(EditBlock);

  const isDuplicate = baseInstanceId && baseInstanceId !== instanceId;

  if (!uniqueId || isDuplicate) {
    const newUniqueId = `twab-${instanceId}`;
    setAttributes({ uniqueId: newUniqueId, baseInstanceId: instanceId });
  }

  // Block props
  const blockProps = useBlockProps();

  return (
    <>
      <InspectorControls></InspectorControls>
      <div id={attributes.uniqueId} {...blockProps}>
        Typewriter animation block
      </div>
    </>
  );
}
