function Intro(){
    return(
        <div className="flex flex-row justify-center bg-black">
            <img src="./images/jeff.jpg" className="rounded-full w-75 m-20 mt-10"></img>
            <div className="flex flex-col text-white place-content-center ">
                <h1 className="hover-red text-5xl pb-7">JEFFREY RITCHIE</h1>
                <h2 className="hover-red text-xl">Computer Science Student</h2>
                <h2 className="text-xl pt-2 transition-colors duration-300 hover:text-purple-500">NYU Shanghai</h2>
            </div>
        </div>
    );
}

export default Intro