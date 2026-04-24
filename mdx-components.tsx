import type { MDXComponents } from "mdx/types";
import { rabbitHoleComponents } from "@/app/rabbit-hole/_components/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...rabbitHoleComponents,
    ...components,
  };
}
