const SectionTitle = ({
  title,
  colorWord,
  subtitle,
}: {
  title: string;
  colorWord: string;
  subtitle: string;
}) => {
  return (
    <div className="my-5 space-y-1">
      <h1 className="text-3xl text-center font-bold">
        {title} <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{colorWord}</span>
      </h1>
      <p className="text-center text-gray-400 w-4/5 md:w-2/5 mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle;
