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

import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl, Button } from "@wordpress/components";
import { sprintf } from "@wordpress/i18n";

export default function AnimatedPhrasesSettings({ attributes, setAttributes }) {
  const { animatedPhrases } = attributes;

  const updatePhrase = (index, value) => {
    const updated = [...animatedPhrases];
    updated[index] = value;
    setAttributes({ animatedPhrases: updated });
  };

  const removePhrase = (index) => {
    const updated = animatedPhrases.filter((_, i) => i !== index);
    setAttributes({ animatedPhrases: updated });
  };

  const addPhrase = () => {
    setAttributes({ animatedPhrases: [...animatedPhrases, ""] });
  };

  return (
    <PanelBody
      title={__("Animated phrases", "caledros-typewriter-animator")}
      initialOpen={false}
    >
      {animatedPhrases.map((phrase, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "12px",
            alignItems: "center",
          }}
        >
          <TextControl
            __nextHasNoMarginBottom
            __next40pxDefaultSize
            label={sprintf(
              __("Phrase %d", "caledros-typewriter-animator"),
              index + 1
            )}
            value={phrase}
            onChange={(value) => updatePhrase(index, value)}
          />

          <Button
            isDestructive
            variant="secondary"
            onClick={() => removePhrase(index)}
          >
            {__("Remove", "caledros-typewriter-animator")}
          </Button>
        </div>
      ))}

      <Button variant="primary" onClick={addPhrase}>
        {__("Add phrase", "caledros-typewriter-animator")}
      </Button>
    </PanelBody>
  );
}
