// app/index.tsx
import { ModeType } from "@/src/components/ui/gluestack-ui-provider";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/src/components/ui/radio";
import { CircleIcon } from "@/src/components/ui/icon";
import { useTheme } from "@/src/components/ui/gluestack-ui-provider/ThemeProvider/ThemeProvider";

export default function App() {
  const {theme, preference, setNewTheme} = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <RadioGroup
        value={preference}
        onChange={(val) => setNewTheme(val as ModeType)}
      >
        <Radio value="system" size="md">
          <RadioLabel>Automatic (System)</RadioLabel>
          <RadioIndicator size="sm">
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
        </Radio>
        <Radio value="light" size="md">
          <RadioLabel>Light</RadioLabel>
          <RadioIndicator size="sm">
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
        </Radio>
        <Radio value="dark" size="md">
          <RadioLabel>Dark</RadioLabel>
          <RadioIndicator size="sm">
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
        </Radio>
      </RadioGroup>
    </SafeAreaView>
  );
}
