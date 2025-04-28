import { useState, useRef, useEffect } from 'react';

const InteractivePriceSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState(50);
  const [maxValue, setMaxValue] = useState(1200);
  const [dragging, setDragging] = useState(null); // 'min' or 'max'

 
  const startDrag = (handle: any) => (e: any) => {
    e.preventDefault();
    setDragging(handle);
  };

  
  const onMouseMove = (e: any) => {
    if (!dragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
   
    const percentage = Math.min(Math.max(x / rect.width, 0), 1);
    
    const value = Math.round(50 + percentage * (1200 - 50));
  // If dragging the min handle, ensure the min value is less than the max value
    if (dragging === 'min' && value < maxValue) {
      setMinValue(value);
    } else if (dragging === 'max' && value > minValue) {
      setMaxValue(value);
    }
  };

 
  const onMouseUp = () => {
    setDragging(null);
  };

 
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  
  const sliderWidth = sliderRef.current ? sliderRef.current.clientWidth : 0;
  const minPos = (sliderWidth * (minValue - 50)) / (1200 - 50);
  const maxPos = (sliderWidth * (maxValue - 50)) / (1200 - 50);

  return (
    <div className="w-full mt-4">
      <div ref={sliderRef} className="relative h-8">
        
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#121]" />
       
        <div
          className="absolute top-0 w-6 h-6 bg-[#8DB1D3] rounded-full cursor-pointer"
          style={{ left: minPos - 3 }}
          onMouseDown={startDrag('min')}
        />
        
        <div
          className="absolute top-0 w-6 h-6 bg-[#8DB1D3] rounded-full cursor-pointer"
          style={{ left: maxPos - 3 }}
          onMouseDown={startDrag('max')}
        />
      </div>
      
      <div className="flex justify-between text-xs text-[#121] font-medium whitespace-nowrap mt-2">
        <div>${minValue}</div>
        <div>${maxValue}</div>
      </div>
    </div>
  );
};

export default InteractivePriceSlider;