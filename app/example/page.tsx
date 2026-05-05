import { PH_SC_IS } from "@features/dialog-tree-editor/IS";
import {
  CurrentSpeechText,
  OutcomesList,
  Actions,
} from "@features/dialog-tree-runtime";
import { RuntimeStoreProvider } from "@features/dialog-tree-runtime/providers/RuntimeStoreProvider";

const Page = () => {
  return (
    <RuntimeStoreProvider
      initState={{
        activeSpeechId: null,
        edges: PH_SC_IS.edges,
        nodes: PH_SC_IS.nodes,
        history: [],
      }}
    >
      <main className="p-1 flex-1 min-h-0 grid grid-rows-[50px_1fr_190px] grid-cols-1 gap-2">
        <Actions />
        <CurrentSpeechText />
        <OutcomesList />
      </main>
    </RuntimeStoreProvider>
  );
};

export default Page;
