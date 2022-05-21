import { useRouter } from "vue-router";

export default function () {
  const router = useRouter();
  const customRouter = function (name: string) {
    router.push({
      name,
    });
  };

  return customRouter;
}
