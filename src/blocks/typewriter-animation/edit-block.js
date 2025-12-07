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
import { __ } from "@wordpress/i18n";
import { useRef, useEffect } from "@wordpress/element";
import { TabPanel } from "@wordpress/components";
import StaticTextSettings from "./settings/static-text-settings";
import AnimatedPhrasesSettings from "./settings/animated-phrases-settings";
import HideStaticTextSettings from "./settings/hide-static-text";
import AnimationSpeedSettings from "./settings/animation-speed-settings";

// Global store used only at editor runtime (never saved in database)
let uniqueIds = [];

export default function EditBlock({ attributes, setAttributes }) {
  const {
    uniqueId,
    staticText,
    animatedPhrases,
    hideStaticText,
    animationSpeed,
  } = attributes;

  const rootBlockRef = useRef(null);

  // Function to generate a persistent ID
  const generateId = () =>
    `twab-${Math.random().toString(36).substring(2, 10)}`;

  // Assign a unique ID only if:
  // - Block is newly created (uniqueId is missing)
  // - Block was duplicated (uniqueId already exists in uniqueIds[])
  useEffect(() => {
    let id = uniqueId;

    if (!id || uniqueIds.includes(id)) {
      id = generateId();
      setAttributes({ uniqueId: id });
    }

    uniqueIds.push(id);
  }, []); // runs only once per block instance

  // Typewriter Animation effect
  useEffect(() => {
    if (!rootBlockRef.current || !uniqueId) return;

    const typewriterElement = rootBlockRef.current.querySelector(
      `h2.twab span#${uniqueId}`
    );

    let isCancelled = false;

    const wait = (ms) => new Promise((res) => setTimeout(res, ms));

    let index = 0;

    const loop = async () => {
      while (!isCancelled) {
        const word = animatedPhrases[index];

        // Type forward
        for (let i = 0; i < word.length && !isCancelled; i++) {
          typewriterElement.innerText = word.slice(0, i + 1);
          await wait(animationSpeed);
        }

        await wait(animationSpeed * 10);
        if (isCancelled) break;

        // Type backward
        for (let i = word.length; i > 0 && !isCancelled; i--) {
          typewriterElement.innerText = word.slice(0, i - 1);
          await wait(animationSpeed);
        }

        await wait(animationSpeed * 10);

        index = (index + 1) % animatedPhrases.length;
      }
    };

    loop();

    // Cleanup to stop old loop
    return () => {
      isCancelled = true;
    };
  }, [uniqueId, animatedPhrases, animationSpeed]);

  const blockProps = useBlockProps({ ref: rootBlockRef });

  return (
    <>
      <InspectorControls>
        <TabPanel
          activeClass="twab-active-tab"
          tabs={[
            {
              name: "content",
              title: "Content",
            },
            {
              name: "style",
              title: "Style",
            },
            {
              name: "additional",
              title: "Additional",
            },
          ]}
        >
          {(tab) => {
            if (tab.name === "content") {
              return (
                <>
                  <StaticTextSettings
                    attributes={attributes}
                    setAttributes={setAttributes}
                  ></StaticTextSettings>
                  <AnimatedPhrasesSettings
                    attributes={attributes}
                    setAttributes={setAttributes}
                  ></AnimatedPhrasesSettings>
                  <HideStaticTextSettings
                    attributes={attributes}
                    setAttributes={setAttributes}
                  ></HideStaticTextSettings>
                  <AnimationSpeedSettings
                    attributes={attributes}
                    setAttributes={setAttributes}
                  ></AnimationSpeedSettings>
                </>
              );
            }
            if (tab.name === "style") {
              return <></>;
            }
            if (tab.name === "additional") {
              return <></>;
            }
            return null;
          }}
        </TabPanel>
      </InspectorControls>
      <div {...blockProps}>
        <h2 className="twab">
          {!hideStaticText && (
            <span className="twab__static-text">{staticText} </span>
          )}
          <span id={uniqueId} className="twab__animation-text"></span>
          <span className="twab__cursor">|</span>
        </h2>
      </div>
    </>
  );
}
