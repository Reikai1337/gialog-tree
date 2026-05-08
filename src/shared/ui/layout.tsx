import { cn } from "@shared/lib/utils/cn";

type Props = {
  children?: React.ReactNode;
  renderHeader?: React.ReactNode;
  renderFooter?: React.ReactNode;
  headerClassName?: string;
};

export const Layout: React.FC<Props> = ({
  children,
  renderHeader,
  headerClassName,
  renderFooter,
}) => {
  return (
    <div
      data-slot="layout"
      className="relative z-10 flex h-svh min-w-full flex-col"
    >
      <header className="sticky top-0 z-50 w-full bg-background">
        <div
          className={cn(
            "flex h-(--header-height) items-center px-2 py-1 sm:px-5 sm:py-2",
            headerClassName,
          )}
        >
          {renderHeader}
        </div>
      </header>
      {children}
      {renderFooter && <footer>{renderFooter}</footer>}
    </div>
  );
};
