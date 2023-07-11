import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from './plant_loading_animation.json'; // Import the JSON animation file

export default function LoadingPlant() {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ 
    width: '30%', 
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   }}/>;
}
