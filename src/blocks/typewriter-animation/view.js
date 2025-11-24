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

import { store, getContext } from "@wordpress/interactivity";

store("typewriter-animation", {
  callbacks: {
    onInit: () => {
      const context = getContext();
      const uniqueIdElement = `${context.uniqueId}`;
      function waitAnimation(miliseconds) {
        return new Promise((resolve) => setTimeout(resolve, miliseconds));
      }
      const typewriterPhrases = [
        "incredible",
        "engaging",
        "unique",
        "surprising",
      ];
      const typewriterElement = document.getElementById(uniqueIdElement);

      let waitTime = 100;
      let currentPhraseIndex = 0;

      const typewriterLoop = async () => {
        while (true) {
          let currentWord = typewriterPhrases[currentPhraseIndex];
          for (let i = 0; i < currentWord.length; i++) {
            typewriterElement.innerText = currentWord.substring(0, i + 1);
            await waitAnimation(waitTime);
          }
          await waitAnimation(waitTime * 10);
          for (let i = currentWord.length; i > 0; i--) {
            typewriterElement.innerText = currentWord.substring(0, i - 1);
            await waitAnimation(waitTime);
          }
        }
      };
      typewriterLoop();
    },
  },
});
