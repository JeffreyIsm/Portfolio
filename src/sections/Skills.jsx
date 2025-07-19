import Dropdown from '../components/Dropdown.jsx';

export default function Skills() {
    const MachineLearning = [
        "TensorFlow",
        "scikit-learn",
    ];

    const ProgrammingLanguages = [
        "Python",
        "C",
        "HTML/CSS",
    ];

    const Frontend = [
        "React.js",
        "Tailwind CSS",
    ];

    const Backend = [
        "Django",
        "PostgreSQL",
        "FastAPI",
    ];

    const ToolsPlatforms = [
        "GitHub",
        "Vercel",
        "Railway",
    ];

  return (
    <div className='bg-black min-h-screen w-full pb-5'>
        <h1 className='font-michroma-regular text-white text-3xl md:text-5xl font-bold pb-8 md:pb-15 pt-4 md:pt-0 text-center'>
            Tech Skills
        </h1>
        <div className='flex flex-wrap justify-center gap-4 md:gap-10 px-4 md:px-0'>
            <Dropdown title="Programming Languages" items={ProgrammingLanguages} />
            <Dropdown title="Frontend" items={Frontend} />
            <Dropdown title="Backend" items={Backend} />
            <Dropdown title="Tools / Platforms" items={ToolsPlatforms} />
            <Dropdown title="Machine Learning" items={MachineLearning} />
        </div>
    </div>
  );
}
