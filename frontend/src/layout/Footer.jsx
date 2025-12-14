import React from 'react';

const Footer = () => {
  const teamMembers = [
    { id: '23127069', name: 'Nguyễn Minh Khôi' },
    { id: '23127359', name: 'Võ Trần Quốc Duy' },
    { id: '23127455', name: 'Trương Công Thiên Phú' },
  ];

  return (
    <footer className="bg-slate-900  text-slate-300 w-screen h-fit">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Left Side: Project Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Fireguard</h3>
            <p className="text-sm text-slate-400">
              23CLC08 - Physics for Information Technology
            </p>
            <p className="text-xs mt-4 text-slate-500">
              &copy; {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>
          <ul className="flex flex-col gap-3 text-sm">
            {teamMembers.map((m) => (
              <div className="flex flex-row gap-2">
                <div>{m.id}</div>
                <div>-</div>
                <div>{m.name}</div>
              </div>
            ))}
          </ul>

        </div>
      </div>
    </footer>
  );
};

export default Footer;