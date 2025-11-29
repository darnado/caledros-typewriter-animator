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
import StaticTextSettings from "./settings/static-text-settings";
import { TabPanel } from "@wordpress/components";

// Global store used only at editor runtime (never saved in database)
let uniqueIds = [];

export default function EditBlock({ attributes, setAttributes }) {
  const { uniqueId } = attributes;

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
    if (rootBlockRef.current && uniqueId) {
      const typewriterElement = rootBlockRef.current.querySelector(
        `h2.twab span#${uniqueId}`
      );

      async function wait(ms) {
        return new Promise((res) => setTimeout(res, ms));
      }

      const phrases = ["incredible", "engaging", "unique", "surprising"];
      let time = 100;
      let index = 0;

      const loop = async () => {
        while (true) {
          const word = phrases[index];
          for (let i = 0; i < word.length; i++) {
            typewriterElement.innerText = word.slice(0, i + 1);
            await wait(time);
          }
          await wait(time * 10);
          for (let i = word.length; i > 0; i--) {
            typewriterElement.innerText = word.slice(0, i - 1);
            await wait(time);
          }
          await wait(time * 10);

          index = (index + 1) % phrases.length;
        }
      };

      loop();
    }
  }, [uniqueId]);

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
