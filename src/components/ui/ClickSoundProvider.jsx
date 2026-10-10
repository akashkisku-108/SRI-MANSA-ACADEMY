import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playClickSound, unlockAudioContext, preloadClickSound, CLICK_SOUND_VOLUME } from '../../utils/clickAudio';

// Selector for elements that represent valid user controls
const CLICKABLE_TARGET_SELECTOR = [
  'button',
  'a[href]',
  '[role="button"]',
  '[role="tab"]',
  '[role="switch"]',
  'summary',
  'input[type="submit"]',
  'input[type="button"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
  '[data-click-sound]',
].join(', ');

const MAX_TAP_DURATION_MS = 600;
const MAX_TAP_MOVEMENT_PX = 10;
const THROTTLE_CLICK_MS = 50;

export function ClickSoundProvider() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem('srimanasa_click_sound');
      return stored !== null ? stored === 'true' : true;
    } catch {
      return true;
    }
  });

  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  const lastSoundTimeRef = useRef(0);
  const pointerStateRef = useRef(null);

  // Preload sound on component mount
  useEffect(() => {
    preloadClickSound();
  }, []);

  const triggerSound = useCallback(() => {
    if (!soundEnabledRef.current) return;

    const now = performance.now();
    if (now - lastSoundTimeRef.current < THROTTLE_CLICK_MS) {
      return;
    }
    lastSoundTimeRef.current = now;

    unlockAudioContext();
    playClickSound(CLICK_SOUND_VOLUME);

    // Optional light haptic on mobile devices, only for valid button activations
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(5);
      } catch {}
    }
  }, []);

  const toggleSound = useCallback((e) => {
    e.stopPropagation();
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('srimanasa_click_sound', String(next));
      } catch {}
      if (next) {
        unlockAudioContext();
        playClickSound(CLICK_SOUND_VOLUME);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    // 1. Pointerdown: Record start coordinates and time
    const handlePointerDown = (e) => {
      pointerStateRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startTime: performance.now(),
        pointerId: e.pointerId,
        cancelled: false,
      };
    };

    // 2. Pointermove: Check if distance exceeded movement threshold (e.g. dragging / swiping)
    const handlePointerMove = (e) => {
      if (!pointerStateRef.current) return;
      if (pointerStateRef.current.pointerId !== e.pointerId) return;

      const dx = Math.abs(e.clientX - pointerStateRef.current.startX);
      const dy = Math.abs(e.clientY - pointerStateRef.current.startY);

      if (dx > MAX_TAP_MOVEMENT_PX || dy > MAX_TAP_MOVEMENT_PX) {
        pointerStateRef.current.cancelled = true;
      }
    };

    // 3. Pointercancel or Scroll: Cancel tap state immediately
    const handlePointerCancel = () => {
      if (pointerStateRef.current) {
        pointerStateRef.current.cancelled = true;
      }
    };

    const handleScroll = () => {
      if (pointerStateRef.current) {
        pointerStateRef.current.cancelled = true;
      }
    };

    // 4. Click event: Delegated listener for activated controls (mouse clicks, touch taps, keyboard Enter/Space)
    const handleClick = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // Do not play if typing in text inputs or textareas
      if (
        target instanceof HTMLInputElement &&
        ['text', 'email', 'tel', 'password', 'search', 'number', 'url'].includes(target.type)
      ) {
        return;
      }
      if (target instanceof HTMLTextAreaElement || target.isContentEditable) {
        return;
      }

      // Ignore sound toggle button itself (toggle handles its own feedback)
      if (target.closest('[data-sound-toggle="true"]')) {
        return;
      }

      // Ignore admin panel or elements with data-no-click-sound
      if (
        target.closest('[data-no-click-sound="true"]') ||
        target.closest('#admin-panel') ||
        target.closest('.admin-portal')
      ) {
        return;
      }

      // Check if clicked element or an ancestor is a clickable control
      const clickableControl = target.closest(CLICKABLE_TARGET_SELECTOR);
      if (!clickableControl) {
        // Empty space, plain text, headings, non-clickable cards/images -> DO NOT PLAY
        return;
      }

      // Check disabled state (native disabled or aria-disabled)
      if (
        clickableControl.hasAttribute('disabled') ||
        clickableControl.getAttribute('aria-disabled') === 'true' ||
        clickableControl.classList.contains('disabled') ||
        clickableControl.classList.contains('cursor-not-allowed')
      ) {
        return;
      }

      // If pointer interaction occurred, verify movement and duration
      if (pointerStateRef.current && pointerStateRef.current.pointerId !== undefined) {
        const { startTime, cancelled } = pointerStateRef.current;
        const duration = performance.now() - startTime;

        // Cancel if dragging/scrolling or held too long
        if (cancelled || duration > MAX_TAP_DURATION_MS) {
          pointerStateRef.current = null;
          return;
        }
      }

      pointerStateRef.current = null;
      triggerSound();
    };

    document.addEventListener('pointerdown', handlePointerDown, { passive: true, capture: true });
    document.addEventListener('pointermove', handlePointerMove, { passive: true, capture: true });
    document.addEventListener('pointercancel', handlePointerCancel, { passive: true, capture: true });
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('click', handleClick, { passive: true, capture: true });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      document.removeEventListener('pointermove', handlePointerMove, { capture: true });
      document.removeEventListener('pointercancel', handlePointerCancel, { capture: true });
      window.removeEventListener('scroll', handleScroll, { capture: true });
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [triggerSound]);

  return (
    <button
      type="button"
      data-sound-toggle="true"
      onClick={toggleSound}
      className="fixed bottom-5 left-5 z-50 flex items-center gap-1.5 px-3 py-2 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-full shadow-card border border-neutral-200/90 dark:border-neutral-700/80 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:text-primary-950 dark:hover:text-white hover:border-terracotta-400 transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500"
      title={soundEnabled ? 'Mute click sound' : 'Enable click sound'}
      aria-label={
        soundEnabled
          ? 'Click sound effect is currently on. Click to turn off.'
          : 'Click sound effect is currently off. Click to turn on.'
      }
    >
      {soundEnabled ? (
        <>
          <Volume2 className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" aria-hidden="true" />
          <span className="hidden sm:inline text-[11px] text-neutral-600 dark:text-neutral-300">
            Click Sound: <strong className="text-terracotta-700 dark:text-terracotta-400 font-semibold">ON</strong>
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-neutral-400" aria-hidden="true" />
          <span className="hidden sm:inline text-[11px] text-neutral-500 dark:text-neutral-400">
            Click Sound: <strong>OFF</strong>
          </span>
        </>
      )}
    </button>
  );
}
