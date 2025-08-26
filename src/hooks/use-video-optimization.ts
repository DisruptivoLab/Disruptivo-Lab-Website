/**
 * Hook para optimización inteligente de videos
 * Implementa lazy loading, preload estratégico y gestión de memoria
 */

/// <reference lib="dom" />
import { useState, useEffect, useCallback, useRef } from 'react';

interface NetworkInformation extends EventTarget {
  readonly downlink: number;
  readonly downlinkMax: number;
  readonly effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
  readonly rtt: number;
  readonly saveData: boolean;
  readonly type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'other' | 'unknown' | 'wifi' | 'wimax';
  onchange: ((this: NetworkInformation, ev: Event) => unknown) | null;
}

interface VideoOptimizationConfig {
  currentSlide: number;
  totalSlides: number;
  prefersReducedMotion: boolean;
}

interface VideoState {
  loaded: boolean;
  error: boolean;
  shouldLoad: boolean;
  preloaded: boolean;
}

export function useVideoOptimization({ 
  currentSlide, 
  totalSlides, 
  prefersReducedMotion 
}: VideoOptimizationConfig) {
  const [videoStates, setVideoStates] = useState<VideoState[]>(
    Array.from({ length: totalSlides }, () => ({
      loaded: false,
      error: false,
      shouldLoad: false,
      preloaded: false
    }))
  );

  const videoRefs = useRef<(HTMLVideoElement | null)[]>(
    new Array(totalSlides).fill(null)
  );

  // Determinar qué videos deben cargarse
  const updateVideoLoadingStrategy = useCallback(() => {
    setVideoStates(prevStates => {
      const newStates = [...prevStates];
      
      for (let i = 0; i < totalSlides; i++) {
        const isCurrentSlide = i === currentSlide;
        const isNextSlide = i === (currentSlide + 1) % totalSlides;
        const isPrevSlide = i === (currentSlide - 1 + totalSlides) % totalSlides;
        
        // Estrategia de carga:
        // 1. Slide actual: siempre cargar
        // 2. Slide siguiente: precargar
        // 3. Slide anterior: mantener si ya está cargado
        // 4. Otros slides: descargar para liberar memoria
        
        newStates[i] = {
          ...newStates[i],
          shouldLoad: isCurrentSlide || isNextSlide || (isPrevSlide && newStates[i].loaded)
        };
      }
      
      return newStates;
    });
  }, [currentSlide, totalSlides]);

  // Actualizar estrategia cuando cambia el slide
  useEffect(() => {
    updateVideoLoadingStrategy();
  }, [updateVideoLoadingStrategy]);

  // Manejar carga de video
  const handleVideoLoad = useCallback((slideIndex: number) => {
    setVideoStates(prevStates => {
      const newStates = [...prevStates];
      newStates[slideIndex] = {
        ...newStates[slideIndex],
        loaded: true,
        error: false
      };
      return newStates;
    });
  }, []);

  // Manejar error de video
  const handleVideoError = useCallback((slideIndex: number) => {
    setVideoStates(prevStates => {
      const newStates = [...prevStates];
      newStates[slideIndex] = {
        ...newStates[slideIndex],
        error: true,
        loaded: false
      };
      return newStates;
    });
  }, []);

  // Registrar referencia de video
  const registerVideoRef = useCallback((slideIndex: number, ref: HTMLVideoElement | null) => {
    videoRefs.current[slideIndex] = ref;
  }, []);

  // Limpiar videos no necesarios para liberar memoria
  useEffect(() => {
    videoStates.forEach((state, index) => {
      const videoElement = videoRefs.current[index];
      if (videoElement && !state.shouldLoad && state.loaded) {
        // Pausar y limpiar video para liberar memoria
        videoElement.pause();
        videoElement.currentTime = 0;
        // Opcional: remover src para liberar completamente
        // videoElement.removeAttribute('src');
      }
    });
  }, [videoStates]);

  // Detectar conexión lenta para ajustar calidad
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as typeof navigator & { connection?: NetworkInformation }).connection;
      const checkConnection = () => {
        if (connection) {
          setIsSlowConnection(
            connection.effectiveType === '2g' || 
            connection.effectiveType === 'slow-2g' ||
            (connection.effectiveType === '3g' && connection.downlink < 1.5)
          );
        }
      };
      
      checkConnection();
      connection?.addEventListener('change', checkConnection);
      
      return () => {
        connection?.removeEventListener('change', checkConnection);
      };
    }
  }, []);

  // Configuración de preload basada en conexión
  const getPreloadStrategy = useCallback((slideIndex: number) => {
    const isCurrentSlide = slideIndex === currentSlide;
    const isNextSlide = slideIndex === (currentSlide + 1) % totalSlides;
    
    if (prefersReducedMotion) return 'none';
    if (isSlowConnection) return isCurrentSlide ? 'metadata' : 'none';
    if (isCurrentSlide) return 'auto';
    if (isNextSlide) return 'metadata';
    return 'none';
  }, [currentSlide, totalSlides, prefersReducedMotion, isSlowConnection]);

  return {
    videoStates,
    handleVideoLoad,
    handleVideoError,
    registerVideoRef,
    getPreloadStrategy,
    isSlowConnection
  };
}