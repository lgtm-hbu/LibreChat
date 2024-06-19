import React, { useState } from 'react';

const SocialButton = ({ id, enabled, serverDomain, oauthPath, label }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  if (!enabled) {
    return null;
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isPressed) {
      setIsPressed(false);
    }
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    setActiveButton(id);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <div className="mt-2 flex items-center justify-center gap-x-2">
      <a
        aria-label={`${label}`}
        className="flex w-3/4 select-none items-center justify-center space-x-3 rounded-md bg-rippl-yellow-cta px-5 py-3 font-lato font-medium text-navy-blue shadow-lg transition-colors"
        href={`${serverDomain}/oauth/${oauthPath}`}
        data-testid={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <p>Login with Microsoft</p>
      </a>
    </div>
  );
};

export default SocialButton;
