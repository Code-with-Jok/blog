import CustomPieChart from "../Charts/CustomPieChart";

interface TagInsightsProps {
  tagUsage: {
    tag: string;
    count: number;
  }[];
}

interface TagCloudProps {
  tags: {
    tag: string;
    count: number;
    name: string;
  }[];
}

const COLORS = [
  "#0096cc",
  "#00a9e6",
  "#00bcff",
  "#1ac3ff",
  "#33c9ff",
  "#4dd0ff",
  "#66d7ff",
];

const getRandomColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % COLORS.length);
  return COLORS[index];
};

const TagCloud = ({ tags }: TagCloudProps) => {
  const maxCount = Math.max(...tags.map((tag) => tag.count), 1);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const fontsize = 12 + (tag.count / maxCount) * 5;
        return (
          <div
            key={tag.name}
            className="font-medium text-sky-900/80 bg-sky-100 px-3 py-0.5 rounded-lg"
            style={{
              color: getRandomColor(tag.name),
              fontSize: `${fontsize}px`,
            }}
          >
            <span>#{tag.name}</span>
            <span className="text-xs">({tag.count})</span>
          </div>
        );
      })}
    </div>
  );
};

const TagInsights = ({ tagUsage }: TagInsightsProps) => {
  const processedData = (() => {
    if (!tagUsage) {
      return [];
    }

    const sorted = [...tagUsage].sort((a, b) => b.count - a.count);
    const topFour = sorted.slice(0, 4);
    const others = sorted.slice(4);
    const othersCount = others.reduce((acc, item) => acc + item.count, 0);

    const finalData = topFour.map((item) => ({
      ...item,
      name: item.tag ?? "",
    }));

    if (othersCount > 0) {
      finalData.push({
        tag: "Others",
        count: othersCount,
        name: "Others",
      });
    }

    return finalData;
  })();

  return (
    <div className="grid grid-cols-12 mt-4">
      <div className="col-span-12 md:col-span-7">
        <CustomPieChart colors={COLORS} data={processedData} />
      </div>

      <div className="col-span-12 md:col-span-5 mt-5 md:mt-0">
        <TagCloud
          tags={
            tagUsage.slice(0, 15).map((item) => ({
              ...item,
              name: item.tag ?? "",
            })) ?? []
          }
        />
      </div>
    </div>
  );
};

export default TagInsights;
