import { useEffect } from "react";
import { useRootNavigationState, useRouter } from "expo-router";

export default function SsoCallback() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    router.replace("/(tabs)");
  }, [rootNavigationState?.key, router]);

  return null;
}