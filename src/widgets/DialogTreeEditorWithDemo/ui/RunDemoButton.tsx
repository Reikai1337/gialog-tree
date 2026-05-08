import { Button } from "@shared/ui/button";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import {
  CurrentSpeechText,
  EditMetaButton,
  GoBackButton,
  OutcomesList,
  RestartButton,
  RuntimeStoreProvider,
} from "@features/dialog-tree-runtime";
import { useEditorStore } from "@features/dialog-tree-editor";
import { Card } from "@shared/ui/card";

export const RunDemoButton = () => {
  const nodes = useEditorStore((s) => s.nodes);
  const edges = useEditorStore((s) => s.edges);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon-sm">
          <Play />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-0 max-h-[80vh] overflow-y-auto md:max-w-md">
        <DialogHeader hidden>
          <DialogTitle>Dialog tree demo</DialogTitle>
        </DialogHeader>
        <RuntimeStoreProvider
          initState={{
            edges: edges,
            nodes: nodes,
          }}
        >
          <div className="grid grid-rows-[400px_auto_190px] grid-cols-1 gap-2">
            <CurrentSpeechText />
            <Card className="p-2 flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <GoBackButton />
                <EditMetaButton />
              </div>
              <RestartButton />
            </Card>
            <OutcomesList />
          </div>
        </RuntimeStoreProvider>
      </DialogContent>
    </Dialog>
  );
};
