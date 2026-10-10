import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playClickSound, unlockAudioContext, preloadClickSound, CLICK_SOUND_VOLUME } from '../../utils/clickAudio';

const THROTTLE_CLICK_MS = 35;

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
  const lastClickTimeRef = useRef(0);

  // Preload sound on component mount
  useEffect(() => {
    preloadClickSound();
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
    const handlePointerDown = (e) => {
      const target = e.target;

      // Do not play click sound while typing in text inputs or textareas
      if (
        target instanceof HTMLInputElement &&
        ['text', 'email', 'tel', 'password', 'search', 'number', 'url'].includes(target.type)
      ) {
        return;
      }
      if (target instanceof HTMLTextAreaElement || target.isContentEditable) {
        return;
      }

      // Do not trigger for sound toggle button itself
      if (target.closest('[data-sound-toggle="true"]')) {
        return;
      }

      // Ignore admin panel
      if (
        target.closest('[data-no-click-sound="true"]') ||
        target.closest('#admin-panel') ||
        target.closest('.admin-portal')
      ) {
        return;
      }

      // Throttle rapid clicks
      const now = performance.now();
      if (now - lastClickTimeRef.current < THROTTLE_CLICK_MS) {
        return;
      }
      lastClickTimeRef.current = now;

      // Unlock audio context on interaction
      unlockAudioContext();

      // Play click sound if enabled
      if (soundEnabledRef.current) {
        playClickSound(CLICK_SOUND_VOLUME);
      }

      // Optional light haptic on supported mobile devices
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try {
          navigator.vibrate(5);
        } catch {}
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, { passive: true, capture: true });
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, { capture: true });
    };
  }, []);

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
