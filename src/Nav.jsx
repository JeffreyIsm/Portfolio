import { useState } from "react"

function Nav(){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="font-michroma-regular text-white bg-black pt-7 p-10">
            <div className="flex flex-row justify-between items-center">
                <div className="hover-red cursor-pointer">
                    <p>JR</p>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex flex-row space-x-6">
                    <p className="hover-red cursor-pointer">experiences</p>
                    <p className="hover-red cursor-pointer">projects</p>
                    <p className="hover-red cursor-pointer">certificates</p>
                    <p className="hover-red cursor-pointer">skills</p>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="hover-red cursor-pointer text-white focus:outline-none"
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12" 
                                />
                            ) : (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16" 
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 space-y-4">
                    <p className="hover-red cursor-pointer">experience</p>
                    <p className="hover-red cursor-pointer">certifications</p>
                    <p className="hover-red cursor-pointer">projects</p>
                    <p className="hover-red cursor-pointer">skills</p>
                </div>
            )}
        </div>
    );
}

export default Nav