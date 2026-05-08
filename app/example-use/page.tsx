import { PH_SC_IS } from "@features/dialog-tree-editor/IS";
import {
  CurrentSpeechText,
  OutcomesList,
  GoBackButton,
  RestartButton,
  RuntimeStoreProvider,
  EditMetaButton,
} from "@features/dialog-tree-runtime";
import { Card } from "@shared/ui/card";

const Page = () => {
  return (
    <RuntimeStoreProvider
      initState={{
        edges: PH_SC_IS.edges,
        nodes: PH_SC_IS.nodes,
      }}
    >
      <main className="p-2 flex-1 min-h-0 grid grid-rows-[1fr_auto_190px] grid-cols-1 gap-2">
        <CurrentSpeechText />
        <Card className="p-2 flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <GoBackButton />
            <EditMetaButton />
          </div>
          <RestartButton />
        </Card>
        <OutcomesList />
      </main>
    </RuntimeStoreProvider>
  );
};

export default Page;
