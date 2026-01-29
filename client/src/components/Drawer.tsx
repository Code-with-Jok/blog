import { cn } from "@/utils";
import { LuSparkles, LuX } from "react-icons/lu";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Drawer = ({ isOpen, onClose, children, title }: DrawerProps) => {
  return (
    <div
      className={cn(
        `fixed top-[70px] right-0 z-40 h-[calc(100dvh-70px)] p-4 overflow-y-auto transition-transform bg-white w-full md:w-[35vw] shadow-2xl shadow-cyan-800/10 boder-r border-l-gray-800`,
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      tabIndex={-1}
      aria-labelledby="drawer-title-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-start gap-3">
          <span className="flex items-center gap-2 bg-cyan-100/60 px-2 py-1 text-xs font-medium  text-sky-500 rounded-full text-nowrap">
            <LuSparkles /> Summarize this post
          </span>
          <h5
            id="drawer-right-label"
            className="flex items-center gap-2 text-base font-semibold text-black "
          >
            {title}
          </h5>
        </div>

        <button
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-600 rounded-full p-2 size-8 inline-flex items-center justify-center cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <LuX className="text-lg" />
        </button>
      </div>

      <div className="text-sm mx-3 mb-6">{children}</div>
    </div>
  );
};

export default Drawer;
