import React from 'react';

export const ComponentThumbnail3D: React.FC<{ typeId: string; className?: string }> = ({
  typeId,
  className = 'w-full h-full',
}) => {
  // 1. Resistor (Vertical axial tan body with color bands)
  if (typeId === 'resistor') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 40 60" className="h-full overflow-visible">
          <line x1="20" y1="5" x2="20" y2="18" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="42" x2="20" y2="55" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
          <rect x="14" y="18" width="12" height="24" rx="3" fill="#E2C9A0" stroke="#C4A47C" strokeWidth="0.8" />
          <rect x="14" y="22" width="12" height="2.5" fill="#D32F2F" />
          <rect x="14" y="27" width="12" height="2.5" fill="#D32F2F" />
          <rect x="14" y="32" width="12" height="2.5" fill="#795548" />
          <rect x="14" y="37" width="12" height="2.5" fill="#FFD700" />
        </svg>
      </div>
    );
  }

  // 2. Ceramic Capacitor (Blue disc)
  if (typeId === 'capacitor') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 60" className="h-full overflow-visible">
          <line x1="20" y1="40" x2="20" y2="55" stroke="#90A4AE" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="40" x2="30" y2="55" stroke="#90A4AE" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 12,24 C 12,12 38,12 38,24 C 38,36 32,42 25,42 C 18,42 12,36 12,24 Z" fill="#1565C0" stroke="#0D47A1" strokeWidth="1" />
          <path d="M 16,18 C 16,14 24,12 28,13" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
    );
  }

  // 3. Polarized Capacitor (Black cylindrical can with silver top & negative stripe)
  if (typeId === 'capacitor-polarized') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 60" className="h-full overflow-visible">
          <line x1="20" y1="45" x2="20" y2="55" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="45" x2="30" y2="55" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="25" cy="18" rx="14" ry="5" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
          <path d="M 11,18 L 11,44 C 11,48 39,48 39,44 L 39,18 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="0.8" />
          <path d="M 11,18 L 11,44 C 11,47 18,47 18,44 L 18,18 Z" fill="#64748B" />
          <line x1="14" y1="26" x2="16" y2="26" stroke="#FFFFFF" strokeWidth="1.2" />
          <line x1="14" y1="36" x2="16" y2="36" stroke="#FFFFFF" strokeWidth="1.2" />
        </svg>
      </div>
    );
  }

  // 4. Diode (Black cylinder with silver cathode band)
  if (typeId === 'diode' || typeId === 'diode-zener') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 40 60" className="h-full overflow-visible">
          <line x1="20" y1="5" x2="20" y2="18" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="42" x2="20" y2="55" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
          <rect x="14" y="18" width="12" height="24" rx="2" fill="#212121" stroke="#000" strokeWidth="0.8" />
          <rect x="14" y="36" width="12" height="4" fill="#CBD5E1" />
        </svg>
      </div>
    );
  }

  // 5. Inductor (Copper coil)
  if (typeId === 'inductor') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 70 30" className="h-full overflow-visible">
          <line x1="5" y1="15" x2="15" y2="15" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
          <line x1="55" y1="15" x2="65" y2="15" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
          <rect x="15" y="8" width="40" height="14" rx="2" fill="#78350F" />
          {[...Array(9)].map((_, i) => (
            <ellipse key={i} cx={18 + i * 4.2} cy="15" rx="2.5" ry="7" fill="none" stroke="#F59E0B" strokeWidth="1.8" />
          ))}
        </svg>
      </div>
    );
  }

  // 6. Pushbutton (Square metal switch)
  if (typeId === 'pushbutton') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 50" className="h-full overflow-visible">
          <line x1="12" y1="8" x2="12" y2="14" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="8" x2="38" y2="14" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="36" x2="12" y2="42" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="36" x2="38" y2="42" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <rect x="10" y="12" width="30" height="26" rx="3" fill="#B0BEC5" stroke="#78909C" strokeWidth="1" />
          <circle cx="14" cy="16" r="1.5" fill="#37474F" />
          <circle cx="36" cy="16" r="1.5" fill="#37474F" />
          <circle cx="14" cy="34" r="1.5" fill="#37474F" />
          <circle cx="36" cy="34" r="1.5" fill="#37474F" />
          <circle cx="25" cy="25" r="7" fill="#18181B" />
        </svg>
      </div>
    );
  }

  // 7. Potentiometer (Blue dial face with pointer)
  if (typeId === 'potentiometer') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 50" className="h-full overflow-visible">
          <line x1="18" y1="36" x2="18" y2="46" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="36" x2="25" y2="46" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="32" y1="36" x2="32" y2="46" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="25" cy="20" r="15" fill="#0288D1" stroke="#01579B" strokeWidth="1.2" />
          <circle cx="25" cy="20" r="11" fill="#1E293B" />
          <line x1="25" y1="20" x2="20" y2="13" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 8. Slideswitch (Black rectangular body with top actuator)
  if (typeId === 'slideswitch') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 50" className="h-full overflow-visible">
          <line x1="17" y1="32" x2="17" y2="42" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="32" x2="25" y2="42" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="33" y1="32" x2="33" y2="42" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <rect x="10" y="16" width="30" height="16" rx="2" fill="#212121" stroke="#000000" strokeWidth="1" />
          <rect x="13" y="18" width="10" height="12" rx="1" fill="#94A3B8" />
          <line x1="15" y1="20" x2="15" y2="28" stroke="#475569" strokeWidth="0.8" />
          <line x1="18" y1="20" x2="18" y2="28" stroke="#475569" strokeWidth="0.8" />
          <line x1="21" y1="20" x2="21" y2="28" stroke="#475569" strokeWidth="0.8" />
        </svg>
      </div>
    );
  }

  // 9. Photoresistor / LDR (Orange serpentine track)
  if (typeId === 'ldr-sensor') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 50" className="h-full overflow-visible">
          <line x1="20" y1="32" x2="20" y2="45" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="32" x2="30" y2="45" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="25" cy="18" r="14" fill="#FDE68A" stroke="#B45309" strokeWidth="1.2" />
          <path d="M 16,13 L 34,13 L 34,16 L 16,16 L 16,19 L 34,19 L 34,22 L 16,22 L 16,25 L 34,25" fill="none" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 10. Ultrasonic Distance Sensor HC-SR04
  if (typeId === 'ultrasonic-hcsr04') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 65 45" className="h-full overflow-visible">
          <rect x="5" y="8" width="55" height="30" rx="3" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
          <circle cx="20" cy="23" r="10" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
          <circle cx="20" cy="23" r="6" fill="#FACC15" />
          <circle cx="45" cy="23" r="10" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
          <circle cx="45" cy="23" r="6" fill="#FACC15" />
          <rect x="25" y="34" width="15" height="3" fill="#94A3B8" />
        </svg>
      </div>
    );
  }

  // 11. PIR Motion Sensor (White dome lens on green PCB)
  if (typeId === 'pir-motion') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 55 50" className="h-full overflow-visible">
          <rect x="5" y="6" width="45" height="34" rx="2" fill="#15803D" stroke="#166534" strokeWidth="1" />
          <circle cx="27.5" cy="23" r="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="27.5" cy="23" r="8" fill="#F1F5F9" />
          <line x1="22" y1="40" x2="22" y2="47" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="27.5" y1="40" x2="27.5" y2="47" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="33" y1="40" x2="33" y2="47" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // 12. Soil Moisture Sensor (Red fork module)
  if (typeId === 'soil-moisture') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 45 60" className="h-full overflow-visible">
          <rect x="12" y="5" width="21" height="15" rx="1.5" fill="#DC2626" />
          <rect x="15" y="20" width="4.5" height="36" rx="2" fill="#CBD5E1" />
          <rect x="25.5" y="20" width="4.5" height="36" rx="2" fill="#CBD5E1" />
        </svg>
      </div>
    );
  }

  // 13. Tilt Sensor (Green SW-200D)
  if (typeId === 'tilt-sensor') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 65 30" className="h-full overflow-visible">
          <line x1="5" y1="15" x2="15" y2="15" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="15" x2="60" y2="15" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
          <rect x="15" y="6" width="35" height="18" rx="3" fill="#16A34A" stroke="#15803D" strokeWidth="1" />
          <text x="32.5" y="18" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" textAnchor="middle">SW 200D</text>
        </svg>
      </div>
    );
  }

  // 14. Temperature Sensor TMP36 (Black TO-92)
  if (typeId === 'temp-sensor-tmp36') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 45 55" className="h-full overflow-visible">
          <path d="M 12,32 L 12,48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <path d="M 22.5,32 L 22.5,48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <path d="M 33,32 L 33,48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <path d="M 10,12 C 10,8 35,8 35,12 L 35,30 C 35,32 10,32 10,30 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
          <text x="22.5" y="24" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">TMP</text>
        </svg>
      </div>
    );
  }

  // 15. Gas Sensor MQ-2
  if (typeId === 'mq2-gas-sensor') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 50" className="h-full overflow-visible">
          <circle cx="25" cy="22" r="16" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
          <circle cx="25" cy="22" r="12" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" strokeDasharray="1 1" />
          <circle cx="25" cy="22" r="6" fill="#94A3B8" />
          <line x1="16" y1="38" x2="16" y2="46" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="22" y1="38" x2="22" y2="46" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="28" y1="38" x2="28" y2="46" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="34" y1="38" x2="34" y2="46" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // 16. Keypad 4x4
  if (typeId === 'keypad-4x4') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 55" className="h-full overflow-visible">
          <rect x="8" y="6" width="34" height="36" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="1" />
          {[...Array(4)].map((_, row) =>
            [...Array(4)].map((_, col) => (
              <rect key={`${row}-${col}`} x={11 + col * 7.5} y={9 + row * 7.5} width="5.5" height="5.5" rx="1" fill={col === 3 ? '#DC2626' : '#0284C7'} />
            ))
          )}
          <rect x="20" y="42" width="10" height="8" fill="#CBD5E1" />
        </svg>
      </div>
    );
  }

  // 17. LED (5mm Red dome with bent lead)
  if (typeId === 'led') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 40 60" className="h-full overflow-visible">
          <path d="M 16,36 L 16,52" stroke="#90A4AE" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 24,36 L 24,44 L 27,48 L 27,55" stroke="#90A4AE" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 12,20 C 12,8 28,8 28,20 L 28,34 C 28,35 30,36 30,37 L 10,37 C 10,36 12,35 12,34 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1" />
          <path d="M 15,16 C 15,12 21,11 25,12" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
    );
  }

  // 18. RGB LED (Clear dome with 4 splayed leads)
  if (typeId === 'rgb-led') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 60" className="h-full overflow-visible">
          <path d="M 16,36 L 12,55" stroke="#90A4AE" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 22,36 L 20,58" stroke="#90A4AE" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 28,36 L 30,55" stroke="#90A4AE" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 34,36 L 38,55" stroke="#90A4AE" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 17,20 C 17,8 33,8 33,20 L 33,34 C 33,35 35,36 35,37 L 15,37 C 15,36 17,35 17,34 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
        </svg>
      </div>
    );
  }

  // 19. Light Bulb (Incandescent bulb with filament)
  if (typeId === 'light-bulb') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 45 60" className="h-full overflow-visible">
          <circle cx="22.5" cy="22" r="14" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
          <path d="M 15,30 L 17,42 L 28,42 L 30,30" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          <path d="M 18,22 L 22.5,14 L 27,22" fill="none" stroke="#CA8A04" strokeWidth="1.2" />
          <rect x="18" y="42" width="9" height="6" fill="#475569" rx="1" />
        </svg>
      </div>
    );
  }

  // 20. NeoPixel Ring
  if (typeId.includes('neopixel')) {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 50" className="h-full overflow-visible">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#18181B" strokeWidth="7" />
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const x = 25 + 20 * Math.cos(angle);
            const y = 25 + 20 * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="2" fill="#FFFFFF" />;
          })}
        </svg>
      </div>
    );
  }

  // 21. Micro Servo SG90 (Blue with white horn)
  if (typeId === 'servo') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 45 60" className="h-full overflow-visible">
          <rect x="12" y="18" width="21" height="32" rx="2" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
          <circle cx="22.5" cy="18" r="6" fill="#0284C7" />
          <circle cx="22.5" cy="18" r="3" fill="#FFFFFF" />
          <rect x="20.5" y="6" width="4" height="24" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.8" />
        </svg>
      </div>
    );
  }

  // 22. DC Motor
  if (typeId === 'dc-motor') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 50" className="h-full overflow-visible">
          <rect x="10" y="14" width="30" height="24" rx="4" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.2" />
          <circle cx="25" cy="26" r="6" fill="#FACC15" />
          <line x1="16" y1="38" x2="16" y2="44" stroke="#DC2626" strokeWidth="2" />
          <line x1="34" y1="38" x2="34" y2="44" stroke="#1E293B" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  // 23. Hobby Gearmotor (Yellow TT motor)
  if (typeId === 'gearmotor') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 45 60" className="h-full overflow-visible">
          <rect x="12" y="10" width="21" height="38" rx="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
          <rect x="18" y="2" width="9" height="8" rx="1" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
          <line x1="16" y1="48" x2="16" y2="54" stroke="#DC2626" strokeWidth="1.5" />
          <line x1="29" y1="48" x2="29" y2="54" stroke="#1E293B" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // 24. Piezo Buzzer (Black disc with brass hole)
  if (typeId === 'buzzer') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 50" className="h-full overflow-visible">
          <line x1="18" y1="38" x2="18" y2="46" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="32" y1="38" x2="32" y2="46" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="25" cy="22" r="18" fill="#18181B" stroke="#27272A" strokeWidth="1.2" />
          <circle cx="25" cy="22" r="4.5" fill="#CA8A04" />
        </svg>
      </div>
    );
  }

  // 25. 7 Segment Display
  if (typeId === 'seven-segment') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 45 55" className="h-full overflow-visible">
          <rect x="8" y="5" width="29" height="45" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
          <text x="22.5" y="38" fill="#EF4444" fontSize="32" fontWeight="bold" fontFamily="monospace" textAnchor="middle">8</text>
        </svg>
      </div>
    );
  }

  // 26. LCD 16x2 Display
  if (typeId.includes('lcd')) {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 75 45" className="h-full overflow-visible">
          <rect x="5" y="6" width="65" height="33" rx="2" fill="#047857" stroke="#065F46" strokeWidth="1" />
          <rect x="10" y="11" width="55" height="23" rx="1.5" fill="#1D4ED8" />
          <rect x="12" y="8" width="51" height="2" fill="#CBD5E1" />
        </svg>
      </div>
    );
  }

  // 27. 9V Battery
  if (typeId === 'battery-9v') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 65 45" className="h-full overflow-visible">
          <rect x="6" y="16" width="5" height="5" fill="#94A3B8" />
          <rect x="6" y="24" width="5" height="5" fill="#94A3B8" />
          <rect x="11" y="10" width="10" height="25" fill="#D97706" />
          <rect x="21" y="10" width="38" height="25" rx="2" fill="#1E293B" />
          <text x="40" y="26" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 40 26)">9V</text>
        </svg>
      </div>
    );
  }

  // 28. 1.5V Battery AA
  if (typeId === 'battery-1_5v') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 40 60" className="h-full overflow-visible">
          <rect x="18" y="6" width="4" height="3" rx="0.5" fill="#CBD5E1" />
          <rect x="14" y="9" width="12" height="42" rx="1" fill="#0D9488" stroke="#0F766E" strokeWidth="1" />
          <text x="20" y="32" fill="#FFFFFF" fontSize="5" fontWeight="bold" textAnchor="middle" transform="rotate(-90 20 32)">AA 1.5V</text>
        </svg>
      </div>
    );
  }

  // 29. Coin Cell 3V Battery
  if (typeId === 'battery-coin') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 50" className="h-full overflow-visible">
          <circle cx="25" cy="25" r="16" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.2" />
          <text x="25" y="24" fill="#334155" fontSize="4.5" fontWeight="bold" textAnchor="middle">CR 2032</text>
          <text x="25" y="30" fill="#334155" fontSize="4.5" fontWeight="bold" textAnchor="middle">3.0V</text>
        </svg>
      </div>
    );
  }

  // 30. Solar Cell
  if (typeId === 'solar-cell') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 50" className="h-full overflow-visible">
          <rect x="8" y="8" width="34" height="34" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
          {[...Array(5)].map((_, i) => (
            <line key={i} x1={14 + i * 5.5} y1="10" x2={14 + i * 5.5} y2="40" stroke="#2563EB" strokeWidth="1.5" />
          ))}
        </svg>
      </div>
    );
  }

  // 31. Potato Battery
  if (typeId === 'potato-battery') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 55 45" className="h-full overflow-visible">
          <path d="M 10,24 C 8,14 22,8 38,10 C 50,12 52,26 44,34 C 36,40 18,38 10,24 Z" fill="#854D0E" stroke="#713F12" strokeWidth="1" />
          <line x1="20" y1="8" x2="24" y2="16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="14" r="3" fill="#D97706" />
        </svg>
      </div>
    );
  }

  // 32. Lemon Battery
  if (typeId === 'lemon-battery') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 55 45" className="h-full overflow-visible">
          <path d="M 8,22 C 10,12 24,8 38,10 C 50,12 52,26 44,34 C 34,42 16,36 8,22 Z" fill="#FACC15" stroke="#EAB308" strokeWidth="1" />
          <line x1="18" y1="8" x2="22" y2="16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="14" r="3" fill="#D97706" />
        </svg>
      </div>
    );
  }

  // 33. Breadboards (Full, Small, Mini)
  if (typeId.includes('breadboard')) {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 70 45" className="h-full overflow-visible">
          <rect x="5" y="5" width="60" height="35" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
          <line x1="8" y1="10" x2="62" y2="10" stroke="#EF4444" strokeWidth="0.8" strokeDasharray="1 1" />
          <line x1="8" y1="35" x2="62" y2="35" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="1 1" />
          <rect x="12" y="16" width="46" height="13" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.6" strokeDasharray="2 2" />
        </svg>
      </div>
    );
  }

  // 34. micro:bit (Black board with red corner, 5x5 LED matrix, A/B buttons, gold edge)
  if (typeId === 'board-microbit') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 70 55" className="h-full overflow-visible">
          {/* PCB Base */}
          <rect x="5" y="5" width="60" height="45" rx="5" fill="#18181B" stroke="#09090B" strokeWidth="1" />
          {/* Red Corner Markings */}
          <path d="M 5,15 L 5,5 L 18,5 Z" fill="#DC2626" />
          <path d="M 65,15 L 65,5 L 52,5 Z" fill="#DC2626" />
          {/* Logo */}
          <ellipse cx="35" cy="11" rx="5" ry="3" fill="none" stroke="#DC2626" strokeWidth="1.2" />
          {/* 5x5 LED Matrix */}
          {[...Array(5)].map((_, r) =>
            [...Array(5)].map((_, c) => (
              <circle key={`${r}-${c}`} cx={25 + c * 5} cy={18 + r * 4.5} r="1.2" fill="#E4E4E7" />
            ))
          )}
          {/* Button A & B */}
          <circle cx="12" cy="27" r="3.5" fill="#27272A" stroke="#71717A" strokeWidth="0.8" />
          <circle cx="58" cy="27" r="3.5" fill="#27272A" stroke="#71717A" strokeWidth="0.8" />
          {/* Gold Edge Connector Tabs */}
          <rect x="5" y="42" width="60" height="8" rx="1" fill="#CA8A04" />
          <circle cx="12" cy="46" r="2.5" fill="#18181B" />
          <circle cx="27" cy="46" r="2.5" fill="#18181B" />
          <circle cx="43" cy="46" r="2.5" fill="#18181B" />
          <circle cx="58" cy="46" r="2.5" fill="#18181B" />
        </svg>
      </div>
    );
  }

  // 35. micro:bit with Breakout
  if (typeId === 'board-microbit-breakout') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 70 60" className="h-full overflow-visible">
          {/* Breakout Base Board */}
          <rect x="2" y="22" width="66" height="34" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="8" y="24" width="54" height="10" rx="1" fill="#18181B" />
          {/* Inserted micro:bit */}
          <rect x="12" y="2" width="46" height="28" rx="3" fill="#18181B" />
          <path d="M 12,9 L 12,2 L 20,2 Z" fill="#059669" />
          <path d="M 58,9 L 58,2 L 50,2 Z" fill="#059669" />
          <ellipse cx="35" cy="6" rx="4" ry="2" fill="none" stroke="#059669" strokeWidth="1" />
          {[...Array(5)].map((_, r) =>
            [...Array(5)].map((_, c) => (
              <circle key={`${r}-${c}`} cx={27 + c * 4} cy={10 + r * 3} r="0.8" fill="#E4E4E7" />
            ))
          )}
          {/* Breakout Header Pins */}
          {[...Array(14)].map((_, i) => (
            <line key={i} x1={10 + i * 3.8} y1="38" x2={10 + i * 3.8} y2="52" stroke="#94A3B8" strokeWidth="1.2" />
          ))}
        </svg>
      </div>
    );
  }

  // 36. Arduino Uno R3 (Blue board with USB and DC jack)
  if (typeId === 'board-arduino-uno') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 75 55" className="h-full overflow-visible">
          <rect x="5" y="5" width="65" height="45" rx="3" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
          {/* USB Type-B Port */}
          <rect x="2" y="10" width="14" height="12" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
          <rect x="4" y="12" width="10" height="8" rx="0.5" fill="#1E293B" />
          {/* Barrel Jack */}
          <rect x="2" y="32" width="15" height="12" rx="1.5" fill="#1E293B" stroke="#0F172A" strokeWidth="0.8" />
          {/* ATmega328P Chip */}
          <rect x="26" y="24" width="38" height="10" rx="1" fill="#18181B" />
          {/* Pin Headers */}
          <rect x="22" y="6" width="44" height="4" rx="0.5" fill="#1E293B" />
          <rect x="28" y="45" width="38" height="4" rx="0.5" fill="#1E293B" />
          {/* Arduino Infinity Logo */}
          <ellipse cx="45" cy="14" rx="3.5" ry="2.2" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
          <ellipse cx="50" cy="14" rx="3.5" ry="2.2" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
        </svg>
      </div>
    );
  }

  // 37. ATtiny (8-pin DIP IC package)
  if (typeId === 'board-attiny85' || typeId === 'attiny') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 60 50" className="h-full overflow-visible">
          {/* 8 DIP Lead Pins */}
          <rect x="12" y="6" width="4" height="7" fill="#94A3B8" />
          <rect x="22" y="6" width="4" height="7" fill="#94A3B8" />
          <rect x="32" y="6" width="4" height="7" fill="#94A3B8" />
          <rect x="42" y="6" width="4" height="7" fill="#94A3B8" />
          <rect x="12" y="37" width="4" height="7" fill="#94A3B8" />
          <rect x="22" y="37" width="4" height="7" fill="#94A3B8" />
          <rect x="32" y="37" width="4" height="7" fill="#94A3B8" />
          <rect x="42" y="37" width="4" height="7" fill="#94A3B8" />

          {/* Black Epoxy IC Body */}
          <rect x="8" y="11" width="44" height="28" rx="2" fill="#27272A" stroke="#18181B" strokeWidth="1" />
          {/* Pin 1 Dot */}
          <circle cx="14" cy="33" r="2" fill="#71717A" />
          {/* Top Notch */}
          <path d="M 6,21 C 9,21 9,29 6,29 Z" fill="#18181B" />
          <text x="31" y="27" fill="#FFFFFF" fontSize="6.5" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            ATTINY
          </text>
        </svg>
      </div>
    );
  }

  // 37B. Arduino Nano
  if (typeId === 'board-arduino-nano') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 55 60" className="h-full overflow-visible">
          {/* Blue PCB */}
          <rect x="10" y="4" width="35" height="52" rx="2" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
          {/* Mini-USB Port at top */}
          <rect x="20" y="2" width="15" height="8" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
          {/* ATmega328 SMD Chip */}
          <rect x="21" y="22" width="13" height="13" rx="1" fill="#18181B" transform="rotate(45 27.5 28.5)" />
          {/* Side Pin Headers */}
          {[...Array(8)].map((_, i) => (
            <React.Fragment key={i}>
              <circle cx="13" cy="14 + i * 5" r="1.2" fill="#CBD5E1" />
              <circle cx="42" cy="14 + i * 5" r="1.2" fill="#CBD5E1" />
            </React.Fragment>
          ))}
          {/* Reset Button */}
          <circle cx="27.5" cy="45" r="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.5" />
        </svg>
      </div>
    );
  }

  // 37C. Arduino Mega 2560
  if (typeId === 'board-arduino-mega') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 85 55" className="h-full overflow-visible">
          {/* Long Blue PCB */}
          <rect x="5" y="5" width="75" height="45" rx="3" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
          {/* USB and DC Jack */}
          <rect x="2" y="10" width="12" height="11" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
          <rect x="2" y="32" width="14" height="11" rx="1.5" fill="#1E293B" />
          {/* Square ATmega2560 Chip */}
          <rect x="28" y="20" width="15" height="15" rx="1" fill="#18181B" transform="rotate(45 35.5 27.5)" />
          {/* Extended Headers on Right */}
          <rect x="20" y="6" width="55" height="4" rx="0.5" fill="#1E293B" />
          <rect x="24" y="45" width="55" height="4" rx="0.5" fill="#1E293B" />
          <rect x="74" y="14" width="4" height="28" rx="0.5" fill="#1E293B" />
        </svg>
      </div>
    );
  }

  // 37D. ESP32 DevKit V1
  if (typeId === 'board-esp32') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 55 60" className="h-full overflow-visible">
          {/* Black PCB */}
          <rect x="8" y="4" width="39" height="52" rx="2" fill="#18181B" stroke="#09090B" strokeWidth="1" />
          {/* Silver ESP-WROOM-32 Shield */}
          <rect x="14" y="14" width="27" height="26" rx="1" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.8" />
          {/* Top PCB Antenna Meander */}
          <rect x="16" y="8" width="23" height="5" fill="#27272A" />
          <path d="M 17,9 L 21,9 L 21,12 L 25,12 L 25,9 L 29,9 L 29,12 L 33,12 L 33,9 L 37,9" stroke="#EAB308" strokeWidth="0.8" fill="none" />
          {/* Micro-USB Port at bottom */}
          <rect x="21" y="52" width="13" height="6" rx="1" fill="#94A3B8" />
          {/* Side Header Pins */}
          {[...Array(9)].map((_, i) => (
            <React.Fragment key={i}>
              <circle cx="10.5" cy="10 + i * 4.8" r="1.2" fill="#CA8A04" />
              <circle cx="44.5" cy="10 + i * 4.8" r="1.2" fill="#CA8A04" />
            </React.Fragment>
          ))}
          {/* EN & BOOT Buttons */}
          <rect x="12" y="44" width="3.5" height="4.5" rx="0.5" fill="#E2E8F0" />
          <rect x="39.5" y="44" width="3.5" height="4.5" rx="0.5" fill="#E2E8F0" />
        </svg>
      </div>
    );
  }

  // 37E. Raspberry Pi Pico (RP2040)
  if (typeId === 'board-raspberry-pi-pico') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 55 60" className="h-full overflow-visible">
          {/* Green PCB */}
          <rect x="10" y="4" width="35" height="52" rx="2" fill="#15803D" stroke="#166534" strokeWidth="1" />
          {/* Micro-USB Port */}
          <rect x="21" y="2" width="13" height="7" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
          {/* RP2040 Chip in center */}
          <rect x="22.5" y="24" width="10" height="10" rx="1" fill="#18181B" />
          {/* BOOTSEL Button */}
          <circle cx="27.5" cy="15" r="2.5" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.5" />
          {/* Raspberry Pi Logo Silkscreen */}
          <circle cx="27.5" cy="44" r="3" fill="#BE123C" />
          {/* Gold Castellated Edge Pads */}
          {[...Array(9)].map((_, i) => (
            <React.Fragment key={i}>
              <rect x="10" y="10 + i * 4.6" width="3" height="2" fill="#CA8A04" />
              <rect x="42" y="10 + i * 4.6" width="3" height="2" fill="#CA8A04" />
            </React.Fragment>
          ))}
        </svg>
      </div>
    );
  }

  // 37F. STM32 BluePill (STM32F103C8T6)
  if (typeId === 'board-stm32-bluepill') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 55 60" className="h-full overflow-visible">
          {/* Blue PCB */}
          <rect x="10" y="4" width="35" height="52" rx="2" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1" />
          {/* Micro-USB Port at top */}
          <rect x="21" y="2" width="13" height="7" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
          {/* Square STM32 Chip */}
          <rect x="22" y="25" width="11" height="11" rx="1" fill="#18181B" transform="rotate(45 27.5 30.5)" />
          {/* Yellow Jumpers at top */}
          <rect x="22" y="12" width="4" height="6" rx="0.5" fill="#EAB308" />
          <rect x="29" y="12" width="4" height="6" rx="0.5" fill="#EAB308" />
          {/* Side Pin Headers */}
          {[...Array(9)].map((_, i) => (
            <React.Fragment key={i}>
              <circle cx="12.5" cy="10 + i * 4.6" r="1.2" fill="#CBD5E1" />
              <circle cx="42.5" cy="10 + i * 4.6" r="1.2" fill="#CBD5E1" />
            </React.Fragment>
          ))}
          {/* Red Reset Button */}
          <circle cx="27.5" cy="46" r="2.5" fill="#DC2626" />
        </svg>
      </div>
    );
  }

  // 38. Multimeter (Yellow handheld body, LCD display, rotary dial, leads)
  if (typeId === 'multimeter') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 75 50" className="h-full overflow-visible">
          {/* Yellow Rubber Holster */}
          <rect x="5" y="10" width="65" height="30" rx="3" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.2" />
          {/* LCD Display */}
          <rect x="9" y="14" width="40" height="22" rx="1.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.8" />
          <text x="29" y="29" fill="#0F172A" fontSize="7" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            125.0 mA
          </text>
          {/* Rotary Dial */}
          <circle cx="59" cy="25" r="7" fill="#CA8A04" stroke="#A16207" strokeWidth="0.8" />
          <circle cx="59" cy="25" r="4.5" fill="#18181B" />
          {/* Bottom Lead Sockets */}
          <line x1="28" y1="40" x2="28" y2="47" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="40" x2="36" y2="47" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 39. Power Supply (Benchtop lab DC supply with 30.0V and 2.0A digital displays)
  if (typeId === 'power-supply') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 65 60" className="h-full overflow-visible">
          {/* Main Enclosure */}
          <rect x="5" y="6" width="55" height="48" rx="2" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.2" />
          {/* Voltage Display */}
          <rect x="8" y="10" width="30" height="12" rx="1" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.6" />
          <text x="23" y="19" fill="#1E293B" fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">30.0 V</text>
          <circle cx="48" cy="16" r="6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
          {/* Current Display */}
          <rect x="8" y="26" width="30" height="12" rx="1" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.6" />
          <text x="23" y="35" fill="#1E293B" fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">2.0 A</text>
          <circle cx="48" cy="32" r="6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
          {/* Power Switch & Binding Posts */}
          <rect x="9" y="43" width="10" height="6" rx="1" fill="#1E293B" />
          <circle cx="30" cy="46" r="3" fill="#DC2626" />
          <circle cx="40" cy="46" r="3" fill="#1E293B" />
        </svg>
      </div>
    );
  }

  // 40. Function Generator (Frequency, Amplitude, Offset, Waveform selector buttons)
  if (typeId === 'function-generator') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 75 60" className="h-full overflow-visible">
          <rect x="5" y="6" width="65" height="48" rx="2" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.2" />
          {/* Frequency LCD */}
          <rect x="8" y="9" width="22" height="9" rx="0.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.5" />
          <text x="19" y="16" fill="#1E293B" fontSize="4.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">1.00 kHz</text>
          <circle cx="36" cy="13.5" r="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
          {/* Amplitude LCD */}
          <rect x="8" y="21" width="22" height="9" rx="0.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.5" />
          <text x="19" y="28" fill="#1E293B" fontSize="4.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">5.00 V</text>
          <circle cx="36" cy="25.5" r="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
          {/* DC Offset LCD */}
          <rect x="8" y="33" width="22" height="9" rx="0.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.5" />
          <text x="19" y="40" fill="#1E293B" fontSize="4.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">2.50 V</text>
          <circle cx="36" cy="37.5" r="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
          {/* Waveform Selector Buttons */}
          <rect x="44" y="9" width="8" height="8" rx="1" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" />
          <rect x="54" y="9" width="8" height="8" rx="1" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" />
          <rect x="64" y="9" width="8" height="8" rx="1" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" />
          {/* Sine Wave Curve */}
          <path d="M 46,30 Q 55,20 64,30 T 72,30" fill="none" stroke="#94A3B8" strokeWidth="1" />
          {/* Output Ports */}
          <circle cx="50" cy="46" r="2.5" fill="#DC2626" />
          <circle cx="60" cy="46" r="2.5" fill="#1E293B" />
        </svg>
      </div>
    );
  }

  // 41. Oscilloscope (Yellow chassis with cyan waveform grid screen)
  if (typeId === 'oscilloscope') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 65 60" className="h-full overflow-visible">
          {/* Yellow Body */}
          <rect x="6" y="6" width="53" height="48" rx="3" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.2" />
          {/* Graticule Grid Screen */}
          <rect x="10" y="10" width="45" height="38" rx="1.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="0.8" />
          {/* Grid Lines */}
          {[...Array(4)].map((_, i) => (
            <line key={`h-${i}`} x1="10" y1={18 + i * 8} x2="55" y2={18 + i * 8} stroke="#BAE6FD" strokeWidth="0.5" />
          ))}
          {[...Array(5)].map((_, i) => (
            <line key={`v-${i}`} x1={18 + i * 8} y1="10" x2={18 + i * 8} y2="48" stroke="#BAE6FD" strokeWidth="0.5" />
          ))}
          {/* Damped Sinusoid Waveform Trace */}
          <path
            d="M 12,32 Q 13,14 15,32 T 18,32 T 22,22 T 26,32 T 32,28 T 38,32 L 53,32"
            fill="none"
            stroke="#0284C7"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Channel Terminals */}
          <circle cx="28" cy="51" r="2" fill="#DC2626" />
          <circle cx="36" cy="51" r="2" fill="#18181B" />
        </svg>
      </div>
    );
  }

  // 42. 555 Timer (DIP-8 with "555")
  if (typeId === 'ic-timer-555') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 60 50" className="h-full overflow-visible">
          {[12, 22, 32, 42].map((x) => (
            <React.Fragment key={x}>
              <rect x={x} y="6" width="4" height="7" fill="#94A3B8" />
              <rect x={x} y="37" width="4" height="7" fill="#94A3B8" />
            </React.Fragment>
          ))}
          <rect x="8" y="11" width="44" height="28" rx="2" fill="#27272A" stroke="#18181B" strokeWidth="1" />
          <circle cx="14" cy="33" r="2" fill="#71717A" />
          <text x="30" y="27" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="900" textAnchor="middle">555</text>
        </svg>
      </div>
    );
  }

  // 43. 556 Dual Timer (DIP-14 with "556")
  if (typeId === 'ic-timer-556') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 75 45" className="h-full overflow-visible">
          {[10, 18, 26, 34, 42, 50, 58].map((x) => (
            <React.Fragment key={x}>
              <rect x={x} y="4" width="3.5" height="6" fill="#94A3B8" />
              <rect x={x} y="35" width="3.5" height="6" fill="#94A3B8" />
            </React.Fragment>
          ))}
          <rect x="7" y="8" width="61" height="29" rx="2" fill="#27272A" stroke="#18181B" strokeWidth="1" />
          <circle cx="12" cy="31" r="1.8" fill="#71717A" />
          <text x="37" y="25" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="900" textAnchor="middle">556</text>
        </svg>
      </div>
    );
  }

  // 44. 741 Operational Amplifier (DIP-8 with "opAmp")
  if (typeId === 'ic-opamp-741') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 60 50" className="h-full overflow-visible">
          {[12, 22, 32, 42].map((x) => (
            <React.Fragment key={x}>
              <rect x={x} y="6" width="4" height="7" fill="#94A3B8" />
              <rect x={x} y="37" width="4" height="7" fill="#94A3B8" />
            </React.Fragment>
          ))}
          <rect x="8" y="11" width="44" height="28" rx="2" fill="#27272A" stroke="#18181B" strokeWidth="1" />
          <circle cx="14" cy="33" r="2" fill="#71717A" />
          <text x="30" y="27" fill="#FFFFFF" fontSize="6.5" fontFamily="monospace" fontWeight="900" textAnchor="middle">opAmp</text>
        </svg>
      </div>
    );
  }

  // 45. LM339 Quad Comparator (DIP-14 with "LM339")
  if (typeId === 'ic-comparator-lm339') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 75 45" className="h-full overflow-visible">
          {[10, 18, 26, 34, 42, 50, 58].map((x) => (
            <React.Fragment key={x}>
              <rect x={x} y="4" width="3.5" height="6" fill="#94A3B8" />
              <rect x={x} y="35" width="3.5" height="6" fill="#94A3B8" />
            </React.Fragment>
          ))}
          <rect x="7" y="8" width="61" height="29" rx="2" fill="#27272A" stroke="#18181B" strokeWidth="1" />
          <circle cx="12" cy="31" r="1.8" fill="#71717A" />
          <text x="37" y="25" fill="#FFFFFF" fontSize="6" fontFamily="monospace" fontWeight="900" textAnchor="middle">LM339</text>
        </svg>
      </div>
    );
  }

  // 46. LM393 Dual Comparator (DIP-8 with "LM393")
  if (typeId === 'ic-comparator-lm393') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 60 50" className="h-full overflow-visible">
          {[12, 22, 32, 42].map((x) => (
            <React.Fragment key={x}>
              <rect x={x} y="6" width="4" height="7" fill="#94A3B8" />
              <rect x={x} y="37" width="4" height="7" fill="#94A3B8" />
            </React.Fragment>
          ))}
          <rect x="8" y="11" width="44" height="28" rx="2" fill="#27272A" stroke="#18181B" strokeWidth="1" />
          <circle cx="14" cy="33" r="2" fill="#71717A" />
          <text x="30" y="27" fill="#FFFFFF" fontSize="6" fontFamily="monospace" fontWeight="900" textAnchor="middle">LM393</text>
        </svg>
      </div>
    );
  }

  // 47. 4N35 Optocoupler (DIP-6 with "4N35")
  if (typeId === 'ic-optocoupler-4n35') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 55 50" className="h-full overflow-visible">
          {[13, 25, 37].map((x) => (
            <React.Fragment key={x}>
              <rect x={x} y="6" width="4" height="7" fill="#94A3B8" />
              <rect x={x} y="37" width="4" height="7" fill="#94A3B8" />
            </React.Fragment>
          ))}
          <rect x="8" y="11" width="38" height="28" rx="2" fill="#27272A" stroke="#18181B" strokeWidth="1" />
          <circle cx="14" cy="33" r="2" fill="#71717A" />
          <text x="27" y="27" fill="#FFFFFF" fontSize="6.5" fontFamily="monospace" fontWeight="900" textAnchor="middle">4N35</text>
        </svg>
      </div>
    );
  }

  // 48. Transistors (TO-92 packages: NPN, PNP, Small Signal nMOS, Small Signal pMOS)
  if (typeId.startsWith('transistor-') && (typeId.includes('npn') || typeId.includes('pnp') || typeId.includes('signal'))) {
    const isNpn = typeId.includes('npn');
    const isPnp = typeId.includes('pnp');
    const isNmos = typeId.includes('nmos');
    const label = isNpn ? 'N' : isPnp ? 'P' : isNmos ? 'NMOS' : 'PMOS';
    const sub = isNpn ? 'C B E' : isPnp ? 'E B C' : isNmos ? 'D G S' : 'S G D';

    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 45 55" className="h-full overflow-visible">
          <line x1="14" y1="36" x2="14" y2="48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="22.5" y1="36" x2="22.5" y2="48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="31" y1="36" x2="31" y2="48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <path d="M 10,14 C 10,8 35,8 35,14 L 35,34 C 35,36 10,36 10,34 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
          <text x="22.5" y="22" fill="#FFFFFF" fontSize={label.length > 2 ? '4.5' : '7'} fontWeight="bold" textAnchor="middle">{label}</text>
          <text x="22.5" y="30" fill="#94A3B8" fontSize="3.5" fontFamily="monospace" textAnchor="middle">{sub}</text>
        </svg>
      </div>
    );
  }

  // 49. Power Transistors / Regulators (TO-220 packages: nMOS power, pMOS power, TIP120, 7805, 3.3V)
  if (typeId.includes('power') || typeId.includes('tip120') || typeId.includes('voltage-regulator')) {
    const is5V = typeId.includes('5v');
    const is3V3 = typeId.includes('3v3');
    const isTip = typeId.includes('tip120');
    const isPmos = typeId.includes('pmos');
    const label = is5V ? '5V' : is3V3 ? '3.3V' : isTip ? 'TIP120' : isPmos ? 'PMOS' : 'NMOS';

    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 50 60" className="h-full overflow-visible">
          {/* Metal Heatsink Tab */}
          <rect x="15" y="6" width="20" height="14" rx="1.5" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
          <circle cx="25" cy="12" r="2.5" fill="#F1F5F9" stroke="#64748B" strokeWidth="0.6" />
          {/* Main Plastic Body */}
          <rect x="12" y="18" width="26" height="24" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
          <text x="25" y="32" fill="#FFFFFF" fontSize={label.length > 4 ? '4.5' : '5.5'} fontWeight="bold" textAnchor="middle">{label}</text>
          {/* 3 Lead Pins */}
          <line x1="17" y1="42" x2="17" y2="54" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="42" x2="25" y2="54" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="33" y1="42" x2="33" y2="54" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 50. Relays (SPDT in black, DPDT in yellow)
  if (typeId === 'relay-spdt' || typeId === 'relay-dpdt') {
    const isDpdt = typeId === 'relay-dpdt';
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 65 50" className="h-full overflow-visible">
          <rect x="5" y="8" width="55" height="34" rx="2" fill={isDpdt ? '#EAB308' : '#1E293B'} stroke={isDpdt ? '#CA8A04' : '#0F172A'} strokeWidth="1.2" />
          <text x="12" y="18" fill={isDpdt ? '#1E293B' : '#FFFFFF'} fontSize="5" fontWeight="bold">
            {isDpdt ? 'KS2E-M-DC5' : 'LU-5-R'}
          </text>
          <text x="12" y="26" fill={isDpdt ? '#334155' : '#94A3B8'} fontSize="4">
            3A/125V AC
          </text>
          {/* Schematic Diagram Graphic */}
          <path d="M 40,16 L 46,16 L 49,24 L 54,24" fill="none" stroke={isDpdt ? '#1E293B' : '#FFFFFF'} strokeWidth="0.8" />
        </svg>
      </div>
    );
  }

  // 51. H-Bridge Motor Driver L293D (DIP-16)
  if (typeId === 'ic-motor-driver-l293d') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 80 45" className="h-full overflow-visible">
          {[10, 17, 24, 31, 38, 45, 52, 59].map((x) => (
            <React.Fragment key={x}>
              <rect x={x} y="4" width="3.5" height="6" fill="#94A3B8" />
              <rect x={x} y="35" width="3.5" height="6" fill="#94A3B8" />
            </React.Fragment>
          ))}
          <rect x="7" y="8" width="66" height="29" rx="2" fill="#27272A" stroke="#18181B" strokeWidth="1" />
          <circle cx="12" cy="31" r="1.8" fill="#71717A" />
          <text x="40" y="25" fill="#FFFFFF" fontSize="6.5" fontFamily="monospace" fontWeight="900" textAnchor="middle">L293D</text>
        </svg>
      </div>
    );
  }

  // 52. 8 Pin Header (Vertical black connector strip)
  if (typeId === 'connector-header-8pin') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 30 65" className="h-full overflow-visible">
          <rect x="11" y="5" width="8" height="55" rx="1" fill="#18181B" stroke="#09090B" strokeWidth="1" />
          {[...Array(8)].map((_, i) => (
            <rect key={i} x="13" y={8 + i * 6.5} width="4" height="4" rx="0.5" fill="#3F3F46" />
          ))}
        </svg>
      </div>
    );
  }

  // 53. USB Standard A (USB-A connector with 4 stripped wires)
  if (typeId === 'connector-usb-a') {
    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox="0 0 75 45" className="h-full overflow-visible">
          {/* Metal USB Shield */}
          <rect x="5" y="14" width="18" height="17" rx="1.5" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
          <rect x="11" y="18" width="3" height="3" fill="#1E293B" />
          <rect x="11" y="24" width="3" height="3" fill="#1E293B" />
          {/* Black Overmold Grip */}
          <rect x="23" y="10" width="30" height="25" rx="2" fill="#18181B" stroke="#09090B" strokeWidth="1" />
          {/* USB Trident Icon */}
          <path d="M 33,22 L 43,22" stroke="#94A3B8" strokeWidth="1" />
          <circle cx="33" cy="22" r="1.5" fill="#94A3B8" />
          <line x1="43" y1="22" x2="40" y2="18" stroke="#94A3B8" strokeWidth="0.8" />
          <rect x="38" y="17" width="2" height="2" fill="#94A3B8" />
          <line x1="43" y1="22" x2="40" y2="26" stroke="#94A3B8" strokeWidth="0.8" />
          <circle cx="39" cy="26" r="1" fill="#94A3B8" />
          {/* Strain Relief Boot */}
          <rect x="53" y="17" width="8" height="11" rx="1" fill="#27272A" />
          {/* 4 Color Wires (Red, White, Green, Black) */}
          <line x1="61" y1="18" x2="70" y2="15" stroke="#DC2626" strokeWidth="1.2" />
          <line x1="61" y1="20" x2="70" y2="19" stroke="#E2E8F0" strokeWidth="1.2" />
          <line x1="61" y1="23" x2="70" y2="24" stroke="#16A34A" strokeWidth="1.2" />
          <line x1="61" y1="26" x2="70" y2="28" stroke="#18181B" strokeWidth="1.2" />
        </svg>
      </div>
    );
  }

  // 54. 74xx / CMOS Logic Gates & Digital ICs (DIP-14 / DIP-16)
  if (typeId.startsWith('logic-')) {
    const isDip16 = ['logic-74hc75', 'logic-74hc283', 'logic-74hc595', 'logic-74hc4017', 'logic-cd4511', 'logic-pcf8574'].includes(typeId);
    const chipCode = typeId === 'logic-cd4511' ? 'CD4511' : typeId === 'logic-pcf8574' ? 'PCF8574' : typeId.replace('logic-74hc', '74HC').toUpperCase();
    const pinOffsets = isDip16 ? [10, 17, 24, 31, 38, 45, 52, 59] : [10, 18, 26, 34, 42, 50, 58];
    const width = isDip16 ? 80 : 75;
    const bodyWidth = isDip16 ? 66 : 61;

    return (
      <div className={`${className} flex items-center justify-center p-0.5`}>
        <svg viewBox={`0 0 ${width} 45`} className="h-full overflow-visible">
          {pinOffsets.map((x) => (
            <React.Fragment key={x}>
              <rect x={x} y="4" width="3.5" height="6" fill="#94A3B8" />
              <rect x={x} y="35" width="3.5" height="6" fill="#94A3B8" />
            </React.Fragment>
          ))}
          <rect x="7" y="8" width={bodyWidth} height="29" rx="2" fill="#27272A" stroke="#18181B" strokeWidth="1" />
          <circle cx="12" cy="31" r="1.8" fill="#71717A" />
          <text x={width / 2} y="25" fill="#FFFFFF" fontSize="6.5" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            {chipCode}
          </text>
        </svg>
      </div>
    );
  }

  // Fallback
  return (
    <div className={`${className} flex items-center justify-center p-0.5`}>
      <svg viewBox="0 0 50 40" className="h-full overflow-visible">
        <rect x="5" y="5" width="40" height="30" rx="3" fill="#64748B" stroke="#334155" strokeWidth="1" />
        <circle cx="25" cy="20" r="6" fill="#94A3B8" />
      </svg>
    </div>
  );
};
