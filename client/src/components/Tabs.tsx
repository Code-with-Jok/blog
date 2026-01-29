import type { Tab } from "@/hooks/useAdminBlogPosts";
import { cn } from "@/utils";

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="my-2">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            className={cn(
              `relative px-3 md:px-4 py-2 text-sm font-medium cursor-pointer`,
              activeTab === tab.label
                ? "text-black"
                : "text-gray-500 hover:text-gray-700"
            )}
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
          >
            <div className="flex items-center">
              <span className="text-sm">{tab.label}</span>
              <span
                className={cn(
                  `text-xs font-medium ml-2 px-2 py-0.5 rounded-full`,
                  activeTab === tab.label
                    ? "text-white bg-black"
                    : "bg-gray-200/70 text-gray-600"
                )}
              >
                {tab.count}
              </span>
            </div>
            {activeTab === tab.label && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
