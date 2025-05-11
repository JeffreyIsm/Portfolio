function Nav(){
    return(
        <div className="text-white bg-black flex flex-row pt-7 p-10  ">
            <div className="hover-red cursor-pointer">
                <p>Home</p>
            </div>
            <div className="flex flex-row space-x-6 ml-auto">
                <p className="hover-red cursor-pointer">experience</p>
                <p className="hover-red cursor-pointer">certifications</p>
                <p className="hover-red cursor-pointer">projects</p>
                <p className="hover-red cursor-pointer">skills</p>
            </div>
        </div>
    );
}
export default Nav