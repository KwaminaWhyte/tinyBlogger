import React from "react";
import { withRef } from "@udecode/cn";
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  useMediaToolbarButton,
} from "@udecode/plate-media";

import { Icons } from "~/components/icons";

import { ToolbarButton } from "./toolbar";
import { FilmIcon } from "lucide-react";

export const MediaToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: typeof ELEMENT_IMAGE | typeof ELEMENT_MEDIA_EMBED;
  }
>(({ nodeType, ...rest }, ref) => {
  const { props } = useMediaToolbarButton({ nodeType });

  return (
    <ToolbarButton ref={ref} {...props} {...rest}>
      {nodeType === ELEMENT_MEDIA_EMBED ? <FilmIcon /> : <Icons.image />}
    </ToolbarButton>
  );
});
