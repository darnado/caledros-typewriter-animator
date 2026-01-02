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
      const animatedPhrases = context.animatedPhrases;
      const animationSpeed = context.animationSpeed;

      const animatedTextElement = document.getElementById(uniqueIdElement);

      let currentPhraseIndex = 0;
      let cancelled = false;
      let timeoutId;

      if (
        !animatedPhrases ||
        animatedPhrases.length === 0 ||
        !animatedTextElement
      )
        return;

      // Disable typewriter for users who have disabled animations
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animatedTextElement.innerText = animatedPhrases[0] || "";
        return;
      }

      function waitAnimation(miliseconds) {
        return new Promise(
          (resolve) => (timeoutId = setTimeout(resolve, miliseconds))
        );
      }

      const typewriterLoop = async () => {
        let charIndex = 0;
        let direction = 1; // 1 = typing, -1 = deleting

        while (!cancelled) {
          const activePhrase = animatedPhrases[currentPhraseIndex];

          charIndex += direction;
          animatedTextElement.innerText = activePhrase.slice(0, charIndex);

          if (direction === 1 && charIndex === activePhrase.length) {
            await waitAnimation(animationSpeed * 10);
            direction = -1;
          } else if (direction === -1 && charIndex === 0) {
            await waitAnimation(animationSpeed * 10);
            direction = 1;
            currentPhraseIndex =
              currentPhraseIndex === animatedPhrases.length - 1
                ? 0
                : currentPhraseIndex + 1;
          }

          await waitAnimation(animationSpeed);
        }
      };

      // Observer
      const observer = new MutationObserver(() => {
        if (!document.body.contains(animatedTextElement)) {
          cancelled = true;
          observer.disconnect();
          if (timeoutId) clearTimeout(timeoutId);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      typewriterLoop();
    },
  },
});
