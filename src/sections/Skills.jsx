import FlowingMenu from '../components/FlowingMenu.jsx';
import {
  CIcon, Css3Icon, DjangoIcon, DockerIcon, FastapiIcon, GithubIcon, Html5Icon,
  JavascriptIcon, LinuxIcon, MysqlIcon, PostgresqlIcon, PythonIcon, RailwayIcon,
  ReactIcon, ResendIcon, ScikitLearnIcon, SupabaseIcon, TailwindIcon,
  TensorflowIcon, VercelIcon,
} from '../components/BrandIcons';

// Each row shows its group name; hovering slides in a marquee of that group's
// icons. Add a skill by adding one { label, Icon } object.
const GROUPS = [
  {
    text: "Languages",
    icons: [
      { label: "Python", Icon: PythonIcon },
      { label: "JavaScript", Icon: JavascriptIcon },
      { label: "C", Icon: CIcon },
    ],
  },
  {
    text: "Frontend",
    icons: [
      { label: "React", Icon: ReactIcon },
      { label: "Tailwind CSS", Icon: TailwindIcon },
      { label: "HTML", Icon: Html5Icon },
      { label: "CSS", Icon: Css3Icon },
    ],
  },
  {
    text: "Backend & Data",
    icons: [
      { label: "Django", Icon: DjangoIcon },
      { label: "FastAPI", Icon: FastapiIcon },
      { label: "PostgreSQL", Icon: PostgresqlIcon },
      { label: "MySQL", Icon: MysqlIcon },
      { label: "Supabase", Icon: SupabaseIcon },
    ],
  },
  {
    text: "ML & AI",
    icons: [
      { label: "TensorFlow", Icon: TensorflowIcon },
      { label: "scikit-learn", Icon: ScikitLearnIcon },
    ],
  },
  {
    text: "Infrastructure & Tools",
    icons: [
      { label: "Docker", Icon: DockerIcon },
      { label: "Linux", Icon: LinuxIcon },
      { label: "GitHub", Icon: GithubIcon },
      { label: "Vercel", Icon: VercelIcon },
      { label: "Railway", Icon: RailwayIcon },
      { label: "Resend", Icon: ResendIcon },
    ],
  },
];

export default function Skills() {
  return (
    <div className='section-pad w-full min-h-screen'>
        <h1 className='font-michroma-regular text-white text-3xl md:text-5xl font-bold pb-2 md:pb-3 text-center'>
            Tech Skills
        </h1>
        <p className='text-center text-white/50 pb-8 md:pb-10'>(Hover or tap a category)</p>

        {/* FlowingMenu lays its rows out with flex-1, so the height has to come
            from here -- with no height the rows collapse to nothing. */}
        <div className='h-[60vh] md:h-[65vh] w-[90vw] md:w-[70vw] mx-auto rounded-3xl overflow-hidden border border-white/20'>
            <FlowingMenu
              items={GROUPS}
              bgColor="transparent"
              textColor="#fff"
              borderColor="rgba(255,255,255,0.2)"
              marqueeBgColor="#fff"
              marqueeTextColor="#120F17"
            />
        </div>
    </div>
  );
}
