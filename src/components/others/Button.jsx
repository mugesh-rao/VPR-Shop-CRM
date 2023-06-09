import { useState } from 'react';

export default function LoadButton({text}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    // Perform the button click action here, e.g. submit a form

    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second delay for demonstration purposes
  };

  return (
    <button
      className="rounded mb-40 p-2.5 font-extrabold px-8 focus:outline-none border-[#00ABB3] focus:ring-[#00ABB3] focus:border-[#00ABB3] focus:ring-2 text-white hover:text-white hover:bg-[#00aab3eb] bg-[#00ABB3]"
      onClick={handleClick}
      type="submit"
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0020 12h-4a7.962 7.962 0 01-2 5.291z"></path>
        </svg>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}
