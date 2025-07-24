import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute md:left-7 top-2 hidden h-full w-72 overflow-hidden sm:block lg:left-10 lg:w-96 opacity-50">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 md:translate-y-[30rem] md:scale-150 lg:scale-125"
          />
        </div>
        <div className="relative">
          <img
            src="/img/logo.png"
            className="absolute left-1/2 -translate-x-1/2 -top-[5rem] w-32 h-auto  lg:top-[22rem] lg:w-40 object-cover "
            alt="contact decoration"
          />
        </div>

        <div className="absolute top-[27rem] left-5 w-80  md:block md:left-auto md:-right-[2rem] md:top-32 lg:top-10 lg:w-50 lg:right-[3rem] opacity-50">

          <ImageClipBox
            src="/img/contact-3.webp"
            clipClass="sword-man-clip-path lg:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join BMSCE ACM Student Chapter
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> co<b>m</b>puting t<b>o</b>gether"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
