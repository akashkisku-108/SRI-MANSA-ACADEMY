/**
 * Click sound player for /sounds/click.mp3
 * (Universfield - Computer Mouse Click 02, Pixabay ID 383961)
 */

export const CLICK_SOUND_VOLUME = 0.45;
const SOUND_URL = '/sounds/click.mp3';

let audioCtx = null;
let audioBuffer = null;
let isAudioAvailable = true;
let loadPromise = null;

// Pool of HTML5 Audio elements as instant fallback
const POOL_SIZE = 5;
let audioPool = [];
let poolIndex = 0;

function initAudioPool() {
  if (typeof window === 'undefined' || audioPool.length > 0) return;
  try {
    for (let i = 0; i < POOL_SIZE; i++) {
      const a = new Audio(SOUND_URL);
      a.volume = CLICK_SOUND_VOLUME;
      a.preload = 'auto';
      audioPool.push(a);
    }
  } catch (err) {
    // Fail silently
  }
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

/**
 * Preload and decode /sounds/click.mp3
 */
export async function preloadClickSound() {
  if (typeof window === 'undefined' || !isAudioAvailable) return null;
  if (audioBuffer) return audioBuffer;
  if (loadPromise) return loadPromise;

  initAudioPool();

  loadPromise = (async () => {
    try {
      const ctx = getAudioContext();
      const response = await fetch(SOUND_URL);

      if (!response.ok) {
        console.warn(`[ClickSound] Audio file not found at ${SOUND_URL} (status: ${response.status})`);
        isAudioAvailable = false;
        return null;
      }

      const arrayBuffer = await response.arrayBuffer();
      if (!ctx) return null;

      // Promise-based decodeAudioData with callback fallback for older Safari
      const decoded = await new Promise((resolve, reject) => {
        const res = ctx.decodeAudioData(arrayBuffer, resolve, reject);
        if (res && typeof res.then === 'function') {
          res.then(resolve).catch(reject);
        }
      });

      audioBuffer = decoded;
      return audioBuffer;
    } catch (err) {
      console.warn(`[ClickSound] Failed to decode audio file at ${SOUND_URL}:`, err.message || err);
      // Even if Web Audio decode fails, keep HTMLAudioElement pool available
      return null;
    } finally {
      loadPromise = null;
    }
  })();

  return loadPromise;
}

/**
 * Play click sound with low latency and overlapping support.
 * First click will resume AudioContext and ensure playback.
 */
export async function playClickSound(volume = CLICK_SOUND_VOLUME) {
  if (typeof window === 'undefined' || !isAudioAvailable) return;

  try {
    const ctx = getAudioContext();

    // Ensure AudioContext is resumed on user gesture
    if (ctx && ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch (e) {}
    }

    // 1. Web Audio API playback (primary, instantaneous, overlapping)
    if (ctx && audioBuffer) {
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start(0);
      return;
    }

    // 2. If buffer is not ready yet, trigger preload now
    if (!audioBuffer) {
      preloadClickSound().then((buf) => {
        if (buf && ctx) {
          // Play immediately once loaded if called during gesture
          try {
            const s = ctx.createBufferSource();
            s.buffer = buf;
            const g = ctx.createGain();
            g.gain.setValueAtTime(volume, ctx.currentTime);
            s.connect(g);
            g.connect(ctx.destination);
            s.start(0);
          } catch (e) {}
        }
      });
    }

    // 3. Fallback: play from HTML5 Audio pool while Web Audio buffer is loading
    initAudioPool();
    if (audioPool.length > 0) {
      const audioElem = audioPool[poolIndex];
      poolIndex = (poolIndex + 1) % audioPool.length;
      audioElem.volume = volume;
      audioElem.currentTime = 0;
      const playPromise = audioElem.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  } catch (err) {
    // Fail silently
  }
}

/**
 * Unlock AudioContext on initial user gesture and start preloading
 */
export function unlockAudioContext() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  preloadClickSound();
}
