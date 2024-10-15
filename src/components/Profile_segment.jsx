import { useState } from 'react';

const Segment = () => {
  const [activeSegment, setActiveSegment] = useState(1);

  const segments = [
    { id: 1, label: 'รอยืนยัน' },
    { id: 2, label: 'กำลังมาถึง' },
    { id: 3, label: 'ผ่านมาแล้ว' },
    { id: 4, label: 'ปฏิเสธแล้ว' }
  ];

  return (
    <div className="flex justify-around  text-white py-2 rounded-lg">
      {segments.map(segment => (
        <div
          key={segment.id}
          onClick={() => setActiveSegment(segment.id)}
          className={`flex-1 text-center cursor-pointer py-2 transition-all duration-300 ${
            activeSegment === segment.id ? 'border-b-2 border-white' : ''
          }`}
        >
          <span>{segment.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Segment;
