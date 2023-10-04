import React, { useEffect, useRef } from 'react';
import { GroupType, User } from '../Context';

interface SliceData {
  username: string | null;
  image: string | null;
  populated: boolean;
}
  
interface KiwiProps {
  group: GroupType | null,
  sliceData: SliceData[];
}
  
const Kiwi: React.FunctionComponent<KiwiProps> = ({ group, sliceData }) => {
  const numSlices = sliceData.length;
  const outlineRadius = 145;
  const centerRadius = 25;
  const center = { x: 220, y: 210 };
  const sliceDegree = 360 / numSlices;
  const sliceSpacing = 5;
  const sliceWidth = sliceDegree - sliceSpacing;
  const initialRotation = -90; 
  const allPopulated = sliceData.every(slice => slice.populated);

  const groupRef = useRef<GroupType | null>(null);

  useEffect(() => {
    groupRef.current = group;
  }, [group]);
  
  const path = (startAngle: number, endAngle: number): string => {
    const cornerRadius = -3; 
    const baseOffset = 10; 
    const tipRadius = 20;

    const x1 = center.x + (outlineRadius - baseOffset) * Math.cos((Math.PI * startAngle) / 180);
    const y1 = center.y + (outlineRadius - baseOffset) * Math.sin((Math.PI * startAngle) / 180);

    const x2 = center.x + (outlineRadius - baseOffset) * Math.cos((Math.PI * endAngle) / 180);
    const y2 = center.y + (outlineRadius - baseOffset) * Math.sin((Math.PI * endAngle) / 180);

    const cornerCtrl1X = center.x + (outlineRadius - cornerRadius) * Math.cos((Math.PI * (startAngle + 1)) / 180);
    const cornerCtrl1Y = center.y + (outlineRadius - cornerRadius) * Math.sin((Math.PI * (startAngle + 1)) / 180);

    const cornerCtrl2X = center.x + (outlineRadius - cornerRadius) * Math.cos((Math.PI * (endAngle - 1)) / 180);
    const cornerCtrl2Y = center.y + (outlineRadius - cornerRadius) * Math.sin((Math.PI * (endAngle - 1)) / 180);

    const tipX = center.x + centerRadius * Math.cos((Math.PI * (startAngle + endAngle) / 2) / 180);
    const tipY = center.y + centerRadius * Math.sin((Math.PI * (startAngle + endAngle) / 2) / 180);

    const tipCtrlX = center.x + (centerRadius - tipRadius) * Math.cos((Math.PI * (startAngle + endAngle) / 2) / 180);
    const tipCtrlY = center.y + (centerRadius - tipRadius) * Math.sin((Math.PI * (startAngle + endAngle) / 2) / 180);
  
    return `
      M ${x1} ${y1}
      C ${cornerCtrl1X} ${cornerCtrl1Y}, ${tipCtrlX} ${tipCtrlY}, ${tipX} ${tipY}
      C ${tipCtrlX} ${tipCtrlY}, ${cornerCtrl2X} ${cornerCtrl2Y}, ${x2} ${y2}
      C ${cornerCtrl2X} ${cornerCtrl2Y}, ${cornerCtrl1X} ${cornerCtrl1Y}, ${x1} ${y1}
      Z
    `;
  };

  const blend = (color1: string, color2: string, ratio: number): string => {
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
  
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
  
    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const getSliceColor = (slice: SliceData, index: number): string => {
    if (slice.populated) {
      return '#C7FF7C';
    }
    return '#F0F0F0';
  };

  return (
    <>
        <div className="kiwi-container" style={{transform: 'translate(-25%, -15%)'}}>
            <svg width="440" height="425">
            <defs>
              <linearGradient id="kiwiGradient" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#ffd1d1"/>
                <stop offset="14%" stopColor={blend('#ffd1d1', '#ffd7a0', 0.14)}/> 
                <stop offset="28%" stopColor="#ffd7a0"/>
                <stop offset="42%" stopColor={blend('#ffd7a0', '#fff5b2', 0.42)}/>
                <stop offset="56%" stopColor="#fff5b2"/>
                <stop offset="70%" stopColor={blend('#fff5b2', '#f2ffd6', 0.7)}/>  
                <stop offset="84%" stopColor="#f2ffd6"/>
                <stop offset="98%" stopColor={blend('#f2ffd6', '#ccffef', 0.98)}/>
                <stop offset="100%" stopColor="#ccffef"/>
              </linearGradient>
            </defs>

                <circle
                cx="220"
                cy="210"
                r="155"
                stroke={allPopulated ? "#C7FF7C" : "url(#kiwiGradient)"}
                strokeWidth="10"
                fill="none"
                />
                {/* slices */}
                {sliceData.map((slice, i) => (
                    <path
                    key={i}
                    d={path(
                        i * sliceDegree + initialRotation,
                        i * sliceDegree + sliceWidth + initialRotation
                    )}              
                    fill={getSliceColor(slice, i)}
                    />
                ))}
                {/* profile pictures */}

                <svg>
                  <defs>
                    {sliceData.map((slice, i) => (
                      <pattern key={i} id={`image-${i}`} x="0%" y="0%" height="100%" width="100%">
                        <image x="0%" y="0%" width="40" height="40" href={slice.image!}></image>
                      </pattern>
                    ))}
                  </defs>
                  {sliceData.map((slice, i) => {
                    if (!slice.populated) return null;

                    const angle = i * sliceDegree + sliceWidth / 2 + initialRotation;
                    const imgX = center.x + (outlineRadius - 40) * Math.cos((Math.PI * angle) / 180);
                    const imgY = center.y + (outlineRadius - 40) * Math.sin((Math.PI * angle) / 180);
                    
                    return (
                      <circle 
                        key={i} 
                        cx={imgX} 
                        cy={imgY} 
                        r="20" 
                        fill={`url(#image-${i})`}
                      />
                    );
                  })}
                </svg>
                <circle 
                    cx={center.x} 
                    cy={center.y} 
                    r={15} 
                    fill='#C7FF7C' 
                />
            </svg>
        </div>
    </>
  );
};

export default Kiwi;
