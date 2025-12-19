import { siGithub, siDocker, siPostgresql, siRedis, siMongodb } from "simple-icons";

function BrandIcon ({ icon, color }: { icon: any, color: string }) {
  return (
    <span
      className="w-6 h-6"
      dangerouslySetInnerHTML={{
        __html: icon.svg.replace(
          "svg",
          `<svg fill="${color}" width="24" height="24"`
        ),
      }}
    />
  );
}

export default function LeftRail() {
  return (
    <div className="w-14 min-w-[56px] bg-black border-r border-gray-800 flex flex-col items-center py-4 gap-6 z-10">
      <BrandIcon icon={siGithub} color="#ffffff" />
      <BrandIcon icon={siRedis} color="#DC382D" />
      <BrandIcon icon={siPostgresql} color="#336791" />
      <BrandIcon icon={siMongodb} color="#47A248" />
      <BrandIcon icon={siDocker} color="#2496ED" />
    </div>
  );
}